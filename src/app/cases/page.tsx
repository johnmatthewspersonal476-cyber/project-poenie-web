"use client";

import { useState } from "react";
import { Briefcase, Plus, Search, Clock, Tag } from "lucide-react";

const sampleCases = [
  { id: "1", name: "Mthembu Trading v NCR", status: "Active", updated: "2 hours ago", tags: ["Commercial", "Regulatory"] },
  { id: "2", name: "Estate Khumalo — Succession", status: "Active", updated: "Yesterday", tags: ["Estate", "Family"] },
  { id: "3", name: "FutureTech v Mzansi Ltd — NDA Dispute", status: "Review", updated: "3 days ago", tags: ["Commercial", "IP"] },
  { id: "4", name: "Section 9 Constitutional Challenge", status: "Closed", updated: "1 week ago", tags: ["Constitutional"] },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Review: "bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/20",
  Closed: "bg-neutral-500/10 text-neutral-500 border-neutral-500/20",
};

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const filtered = sampleCases.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Cases</h1>
          <p className="text-neutral-500 text-sm">Manage your active matters and case files</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Case
        </button>
      </div>

      <div className="relative mb-6 animate-fade-in-up-delay-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" strokeWidth={1.5} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cases..." className="w-full h-11 pl-11 pr-4 bg-white/[0.05] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-500 text-sm outline-none focus:border-[#d4a574]/40 transition-all" />
      </div>

      <div className="space-y-3 animate-fade-in-up-delay-2">
        {filtered.map((c) => (
          <div key={c.id} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold group-hover:text-[#d4a574] transition-colors">{c.name}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${statusColors[c.status]}`}>{c.status}</span>
                  {c.tags.map((t) => (<span key={t} className="text-xs text-neutral-600">{t}</span>))}
                </div>
              </div>
              <span className="text-xs text-neutral-600 flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.5} />{c.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
