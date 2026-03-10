"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, Calendar, Building2 } from "lucide-react";
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
}

const MOCK_RESULTS: SearchResult[] = [
  { id: "1", case_name: "Minister of Home Affairs v Fourie", citation: "[2005] ZACC 19", court: "Constitutional Court", year: 2005, relevance: 0.96, excerpt: "The <mark>right to equality</mark> under section 9 of the Constitution demands that same-sex couples be afforded the same status, entitlements and responsibilities as heterosexual couples…", topics: ["Equality", "Marriage", "Constitutional Rights"] },
  { id: "2", case_name: "Barkhuizen v Napier", citation: "[2007] ZACC 5", court: "Constitutional Court", year: 2007, relevance: 0.91, excerpt: "The principle of <mark>pacta sunt servanda</mark> is not absolute and must yield to constitutional values including <mark>equality</mark> and fairness in contractual relationships…", topics: ["Contract Law", "Constitutional Values", "Fairness"] },
  { id: "3", case_name: "Government of RSA v Grootboom", citation: "[2000] ZACC 19", court: "Constitutional Court", year: 2000, relevance: 0.89, excerpt: "Section 26 of the Constitution obliges the state to take reasonable legislative and other measures within its available resources to achieve the progressive realisation of the <mark>right</mark> of access to adequate housing…", topics: ["Housing", "Socio-economic Rights", "State Obligations"] },
  { id: "4", case_name: "S v Makwanyane", citation: "[1995] ZACC 3", court: "Constitutional Court", year: 1995, relevance: 0.87, excerpt: "The <mark>right</mark> to life is the most fundamental of all human rights. The death penalty destroys the <mark>right</mark> to life and constitutes cruel, inhuman or degrading punishment…", topics: ["Right to Life", "Death Penalty", "Human Dignity"] },
  { id: "5", case_name: "Investigating Directorate v Hyundai Motor", citation: "[2000] ZACC 12", court: "Constitutional Court", year: 2000, relevance: 0.84, excerpt: "The <mark>right</mark> to privacy under section 14 must be balanced against the legitimate needs of the state to investigate and prosecute crime effectively…", topics: ["Privacy", "Search and Seizure", "Criminal Procedure"] },
];

const courts = ["All Courts", "Constitutional Court", "Supreme Court of Appeal", "High Court"];
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

  const doSearch = (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    setTimeout(() => { setResults(MOCK_RESULTS); setLoading(false); }, 800);
  };

  useEffect(() => { if (initialQuery) doSearch(initialQuery); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doSearch(query); };

  const filtered = results.filter((r) => {
    if (selectedCourt !== "All Courts" && r.court !== selectedCourt) return false;
    if (selectedYear !== "All Years") { const [start, end] = selectedYear.split("-").map(Number); if (r.year < start || r.year > end) return false; }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(220,60%,20%)] mb-4 sm:mb-6">Legal Search</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search judgments, statutes, gazettes…" className="pl-10 h-11 w-full" />
        </div>
        <Button type="submit" className="h-11 w-full sm:w-auto px-6 bg-[hsl(220,60%,20%)] hover:bg-[hsl(220,60%,28%)]">Search</Button>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select value={selectedCourt} onChange={(e) => setSelectedCourt(e.target.value)} className="text-sm border rounded-md px-2 py-1.5 w-full sm:w-auto">
            {courts.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="text-sm border rounded-md px-2 py-1.5 w-full sm:w-auto">
            {yearRanges.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select className="text-sm border rounded-md px-2 py-1.5 w-full sm:w-auto">
            <option>All Topics</option>
            <option>Constitutional Rights</option>
            <option>Criminal Law</option>
            <option>Contract Law</option>
            <option>Labour Law</option>
            <option>Property Law</option>
          </select>
        </div>
      </div>

      {/* Results */}
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
                      <CardTitle className="text-base sm:text-lg text-[hsl(220,60%,20%)]">{r.case_name}</CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{r.citation} · {r.court} · {r.year}</p>
                    </div>
                    <Badge variant="secondary" className="bg-[hsl(43,74%,49%)]/20 text-[hsl(43,74%,35%)] shrink-0 self-start">
                      {(r.relevance * 100).toFixed(0)}% match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {r.topics.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
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
