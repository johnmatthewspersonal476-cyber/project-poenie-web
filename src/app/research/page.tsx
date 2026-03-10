"use client";

import { useState } from "react";
import { Search, Filter, BookOpen, Clock, Star } from "lucide-react";

const courts = ["All Courts", "Constitutional Court", "Supreme Court of Appeal", "High Court", "Labour Court"];
const topics = ["All Topics", "Constitutional", "Criminal", "Labour", "Commercial", "Family", "Property"];

const sampleResults = [
  { name: "S v Makwanyane", citation: "1995 (3) SA 391 (CC)", court: "Constitutional Court", year: "1995", excerpt: "The right to life is the most fundamental of all human rights. Capital punishment constitutes cruel, inhuman and degrading punishment...", score: 98 },
  { name: "Bernstein v Bester", citation: "1996 (2) SA 751 (CC)", court: "Constitutional Court", year: "1996", excerpt: "The right to privacy is not absolute and must be balanced against other rights and interests in a democratic society...", score: 87 },
  { name: "Carmichele v Minister of Safety", citation: "2001 (4) SA 938 (CC)", court: "Constitutional Court", year: "2001", excerpt: "The state has a positive duty to protect individuals from violent crime, including an obligation to establish effective laws...", score: 82 },
  { name: "Barkhuizen v Napier", citation: "2007 (5) SA 323 (CC)", court: "Constitutional Court", year: "2007", excerpt: "Time-limitation clauses in contracts must be assessed against the values underpinning the Constitution, including public policy...", score: 76 },
];

const recentSearches = ["right to equality section 9", "eviction PIE Act", "unfair dismissal CCMA", "POPIA compliance"];

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("All Courts");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [results, setResults] = useState(sampleResults);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, court: selectedCourt, topic: selectedTopic }),
      });
      const data = await res.json();
      if (data.results) setResults(data.results);
    } catch {}
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl font-semibold text-white mb-2">Legal Research</h1>
          <p className="text-neutral-500 text-sm">Search across South African judgments, statutes, and legal databases</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-4 animate-fade-in-up-delay-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search cases, statutes, legal principles..."
            className="w-full h-13 pl-12 pr-4 bg-white/[0.05] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-500 text-sm outline-none focus:border-[#d4a574]/40 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up-delay-2">
          {courts.map((c) => (
            <button key={c} onClick={() => setSelectedCourt(c)} className={`px-3 py-1.5 text-xs rounded-full border transition-all ${selectedCourt === c ? "border-[#d4a574]/40 bg-[#d4a574]/10 text-[#d4a574]" : "border-white/[0.06] text-neutral-500 hover:text-neutral-300 hover:border-white/[0.1]"}`}>
              {c}
            </button>
          ))}
          <div className="w-px h-6 bg-white/[0.06] self-center mx-1" />
          {topics.map((t) => (
            <button key={t} onClick={() => setSelectedTopic(t)} className={`px-3 py-1.5 text-xs rounded-full border transition-all ${selectedTopic === t ? "border-[#d4a574]/40 bg-[#d4a574]/10 text-[#d4a574]" : "border-white/[0.06] text-neutral-500 hover:text-neutral-300 hover:border-white/[0.1]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3 animate-fade-in-up-delay-3">
          {results.map((r, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold group-hover:text-[#d4a574] transition-colors">{r.name}</h3>
                  <p className="text-neutral-400 text-sm mt-0.5">{r.citation}</p>
                  <p className="text-neutral-500 text-sm mt-2 leading-relaxed">{r.excerpt}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs text-neutral-600">{r.court}</span>
                    <span className="text-xs text-neutral-600">•</span>
                    <span className="text-xs text-neutral-600">{r.year}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-[#d4a574]/10 text-[#d4a574] text-xs font-medium">
                  {r.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden xl:block w-64 border-l border-white/[0.06] p-6">
        <div className="mb-8">
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Recent Searches</h3>
          <div className="space-y-1">
            {recentSearches.map((s) => (
              <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-colors">
                <Clock className="h-3.5 w-3.5 text-neutral-600" strokeWidth={1.5} />
                <span className="truncate">{s}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">Saved Research</h3>
          <div className="space-y-1">
            {["Constitutional Rights", "Labour Disputes", "Property Law"].map((s) => (
              <button key={s} className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-colors">
                <Star className="h-3.5 w-3.5 text-neutral-600" strokeWidth={1.5} />
                <span className="truncate">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
