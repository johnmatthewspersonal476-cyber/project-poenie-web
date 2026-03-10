import { NextRequest, NextResponse } from "next/server";

const EMBEDDING_URL = "http://connect02.trooper.ai:31803";
const QDRANT_URL = "http://localhost:6333";
const COLLECTION = "sa_legal_docs_v2";
const QUERY_INSTRUCTION = "Represent this query for retrieving relevant South African legal documents";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const court = request.nextUrl.searchParams.get("court");
  const year = request.nextUrl.searchParams.get("year");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "20");

  if (!q) {
    return NextResponse.json({ error: "Missing query parameter 'q'" }, { status: 400 });
  }

  try {
    // 1. Embed query via Trooper
    const embedResp = await fetch(`${EMBEDDING_URL}/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: [`${QUERY_INSTRUCTION}: ${q}`],
        normalize: true,
      }),
    });

    if (!embedResp.ok) {
      throw new Error(`Embedding service error: ${embedResp.status}`);
    }

    const embedData = await embedResp.json();
    const queryVector = embedData.embeddings[0];

    // 2. Build Qdrant filter
    const must: any[] = [];
    if (court && court !== "All Courts") {
      must.push({ key: "court", match: { value: court } });
    }
    if (year && year !== "All Years") {
      // Parse year range like "2020-2026"
      const [startYear, endYear] = year.split("-");
      if (startYear && endYear) {
        // Filter by year field (stored as string)
        const years = [];
        for (let y = parseInt(startYear); y <= parseInt(endYear); y++) {
          years.push(y.toString());
        }
        must.push({ key: "year", match: { any: years } });
      }
    }

    const searchBody: any = {
      vector: queryVector,
      limit,
      with_payload: true,
    };
    if (must.length > 0) {
      searchBody.filter = { must };
    }

    // 3. Search Qdrant
    const qdrantResp = await fetch(`${QDRANT_URL}/collections/${COLLECTION}/points/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchBody),
    });

    if (!qdrantResp.ok) {
      throw new Error(`Qdrant error: ${qdrantResp.status}`);
    }

    const qdrantData = await qdrantResp.json();
    const results = (qdrantData.result || []).map((hit: any) => {
      const p = hit.payload || {};
      return {
        id: hit.id,
        score: hit.score,
        chunk_text: p.chunk_text || "",
        citation: p.citation || "",
        court: p.court || "",
        court_code: p.court_code || "",
        year: p.year || "",
        source: p.source || "",
        source_file: p.source_file || "",
        url: p.url || "",
        doc_type: p.doc_type || "",
        chunk_index: p.chunk_index || 0,
        entities: p.entities || {},
        case_number: p.case_number || "",
      };
    });

    // 4. Group by document (source_file) and pick best chunk per doc
    const docMap = new Map<string, any>();
    for (const r of results) {
      const key = r.source_file || r.id;
      if (!docMap.has(key) || r.score > docMap.get(key).score) {
        docMap.set(key, r);
      }
    }

    const grouped = Array.from(docMap.values())
      .sort((a: any, b: any) => b.score - a.score)
      .map((r: any) => ({
        id: r.id,
        case_name: r.case_number || r.citation || r.source_file?.split("/").pop()?.replace(".html", "") || "Unknown",
        citation: r.citation,
        court: r.court,
        year: parseInt(r.year) || 0,
        relevance: Math.round(r.score * 100) / 100,
        excerpt: r.chunk_text?.substring(0, 400) || "",
        topics: Object.values(r.entities || {}).flat().slice(0, 5) as string[],
        url: r.url,
        source: r.source,
      }));

    return NextResponse.json({
      query: q,
      total: grouped.length,
      results: grouped,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
