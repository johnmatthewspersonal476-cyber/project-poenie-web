import { Scale, ArrowRight, Shield, Globe, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pipelineSteps = [
  { step: "1", title: "Scrape", description: "Automated collection from SAFLII, Government Gazette archives, PMG, and other public legal sources." },
  { step: "2", title: "Extract", description: "PDF and HTML parsing to extract clean text, metadata (court, date, parties, citation), and document structure." },
  { step: "3", title: "Chunk", description: "Intelligent document splitting into semantically meaningful chunks optimized for embedding and retrieval." },
  { step: "4", title: "NER", description: "Named Entity Recognition to identify judges, parties, legislation references, case citations, and legal concepts." },
  { step: "5", title: "Embed", description: "Dense vector embeddings generated on Trooper GPU infrastructure using legal-domain-optimized models." },
  { step: "6", title: "Store", description: "Vectors indexed in Qdrant for fast approximate nearest neighbor search with metadata filtering." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <div className="text-center mb-8 sm:mb-12">
        <Scale className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-[hsl(43,74%,49%)] mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">About Project Poenie</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          An AI-powered legal research platform making South African law accessible through semantic search and retrieval-augmented generation.
        </p>
      </div>

      {/* What it is */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader><CardTitle>What is Project Poenie?</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>Project Poenie is a Retrieval-Augmented Generation (RAG) pipeline purpose-built for South African legal documents. It combines modern NLP techniques with a comprehensive corpus of judgments, legislation, and government publications to enable semantic legal search.</p>
          <p>Unlike keyword-based search, Poenie understands legal concepts. Search for &quot;right to housing&quot; and find relevant cases about eviction, land reform, and socio-economic rights — even if those exact words don&apos;t appear in the judgment.</p>
          <p>The project is built by Freedom Technologies as an open research initiative to improve access to South African law.</p>
        </CardContent>
      </Card>

      {/* Pipeline */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">The Pipeline</h2>
      <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
        {pipelineSteps.map((s, i) => (
          <div key={s.step} className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[hsl(220,60%,20%)] text-white flex items-center justify-center font-bold text-xs sm:text-sm">
              {s.step}
            </div>
            <div className="flex-1 pb-3 sm:pb-4 border-b last:border-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-foreground">{s.title}</h3>
                {i < pipelineSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Technology</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <Cpu className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-3" />
            <h3 className="font-semibold">Trooper GPU</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Embedding generation on dedicated GPU infrastructure</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Globe className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-3" />
            <h3 className="font-semibold">Qdrant</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">High-performance vector database for semantic search</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Shield className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-3" />
            <h3 className="font-semibold">FastAPI</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Backend API for search queries and document retrieval</p>
          </CardContent>
        </Card>
      </div>

      {/* Data licensing */}
      <Card>
        <CardHeader><CardTitle>Data & Licensing</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>South African court judgments are public documents and may be freely reproduced. Project Poenie sources its judgment corpus primarily from SAFLII (Southern African Legal Information Institute), which provides free access to legal information.</p>
          <p>Government Gazettes are published by the Government Printing Works and are public records. Parliamentary materials are sourced from the Parliamentary Monitoring Group (PMG).</p>
          <p>This platform is intended for legal research and education. It does not constitute legal advice. Always consult a qualified legal practitioner for legal matters.</p>
        </CardContent>
      </Card>
    </div>
  );
}
