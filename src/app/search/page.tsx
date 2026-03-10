"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Calendar, Building2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResult {
  id: string;
  case_name: string;
  citation: string;
  court: string;
  year: number;
  relevance: number;
  excerpt: string;
  topics: string[];
  url?: string;
  source?: string;
}

const courts = ["All Courts", "Constitutional Court", "Supreme Court of Appeal", "Gauteng High Court (Johannesburg)", "Gauteng High Court (Pretoria)", "Western Cape High Court"];
const yearRanges = ["All Years", "2020-2026", "2010-2019", "2000-2009", "1994-1999"];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState("All Courts");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [error, setError] = useState<string | null>(null);

  const doSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q, limit: "20" });
      if (selectedCourt !== "All Courts") params.set("court", selectedCourt);
      if (selectedYear !== "All Years") params.set("year", selectedYear);
      
      const resp = await fetch(`/api/search?${params}`);
      if (!resp.ok) throw new Error(`Search failed: ${resp.status}`);
      const data = await resp.json();
      setResults(data.results || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (initialQuery) doSearch(initialQuery); }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doSearch(query); };

  const filtered = results.filter((r) => {
    if (selectedCourt !== "All Courts" && r.court !== selectedCourt) return false;
    if (selectedYear !== "All Years") { const [start, end] = selectedYear.split("-").map(Number); if (r.year < start || r.year > end) return false; }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Legal Search</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search judgments, statutes, gazettes…" className="pl-10 h-11 w-full" />
        </div>
        <Button type="submit" className="h-11 w-full sm:w-auto px-6 bg-[hsl(220,60%,20%)] hover:bg-[hsl(220,60%,28%)]">Search</Button>
      </form>

      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select value={selectedCourt} onChange={(e) => setSelectedCourt(e.target.value)} className="text-sm border border-border bg-card text-foreground rounded-md px-2 py-1.5 w-full sm:w-auto">
            {courts.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="text-sm border border-border bg-card text-foreground rounded-md px-2 py-1.5 w-full sm:w-auto">
            {yearRanges.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="bg-red-950/50 border border-red-800 rounded-md p-3 mb-4 text-sm text-red-400">{error}</div>}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}><CardContent className="pt-6"><Skeleton className="h-6 w-3/4 mb-3" /><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-16 w-full" /></CardContent></Card>
          ))}
        </div>
      )}

      {!loading && searched && (
        <>
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} results for &quot;{query}&quot;</p>
          <div className="space-y-4">
            {filtered.map((r) => (
              <Card key={r.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-base sm:text-lg text-foreground">{r.case_name}</CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {r.citation} · {r.court} · {r.year}
                        {r.url && (
                          <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2 text-blue-400 hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" />SAFLII
                          </a>
                        )}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-[hsl(43,74%,49%)]/20 text-[hsl(43,74%,49%)] shrink-0 self-start">
                      {(r.relevance * 100).toFixed(0)}% match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.excerpt}</p>
                  {r.topics && r.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {r.topics.map((t, i) => <Badge key={i} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!loading && !searched && (
        <div className="text-center py-12 sm:py-20 text-muted-foreground">
          <Search className="mx-auto h-12 w-12 mb-4 opacity-30" />
          <p className="text-base sm:text-lg">Enter a query to search South African legal documents</p>
          <p className="text-sm mt-2">Search across Constitutional Court judgments, statutes, and government gazettes</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8"><Skeleton className="h-10 w-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
