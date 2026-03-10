"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Scale, BookOpen, FileText, Database, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { icon: Scale, label: "ConCourt Judgments", value: "63", sub: "Indexed with embeddings" },
  { icon: BookOpen, label: "SAFLII Judgments", value: "95,000+", sub: "Available for ingestion" },
  { icon: FileText, label: "Government Gazettes", value: "64,292", sub: "221 GB of documents" },
  { icon: Database, label: "Data Sources", value: "9+", sub: "PMG, SARS, SAHRC & more" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[hsl(220,60%,15%)] to-[hsl(220,50%,22%)] text-white py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[hsl(43,74%,49%)]/20 p-4">
              <Scale className="h-10 w-10 sm:h-12 sm:w-12 text-[hsl(43,74%,49%)]" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Project Poenie
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-white/70">
            South African Legal AI — Search across judgments, statutes, and gazettes
          </p>
          <form onSubmit={handleSearch} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search South African law…"
                className="pl-10 h-12 w-full bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[hsl(43,74%,49%)]"
              />
            </div>
            <Button type="submit" className="h-12 w-full sm:w-auto px-8 bg-[hsl(43,74%,49%)] text-[hsl(220,60%,12%)] hover:bg-[hsl(43,74%,59%)] font-semibold">
              Search
            </Button>
          </form>
          <p className="mt-4 text-xs sm:text-sm text-white/40">
            Try: &quot;right to equality&quot;, &quot;eviction constitutional court&quot;, &quot;freedom of expression&quot;
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <Card key={s.label} className="text-center">
              <CardContent className="pt-6">
                <s.icon className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-3" />
                <p className="text-3xl font-bold text-[hsl(220,60%,20%)]">{s.value}</p>
                <p className="font-medium mt-1">{s.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Courts */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[hsl(220,60%,20%)] mb-6 sm:mb-8">Courts Covered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {["Constitutional Court", "Supreme Court of Appeal", "High Court — Gauteng", "High Court — Western Cape", "High Court — KwaZulu-Natal", "Labour Court", "Land Claims Court", "Competition Appeal Court"].map((c) => (
              <div key={c} className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm border">
                <Building2 className="h-4 w-4 shrink-0 text-[hsl(220,60%,20%)]" />
                <span className="text-sm font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
