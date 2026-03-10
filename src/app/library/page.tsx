"use client";

import { useState } from "react";
import { Library as LibraryIcon, Search, BookOpen, FileText, Scale } from "lucide-react";

const categories = [
  { name: "Constitution", count: 12, icon: Scale },
  { name: "Statutes", count: 234, icon: FileText },
  { name: "Case Law", count: 1847, icon: BookOpen },
  { name: "Regulations", count: 89, icon: LibraryIcon },
];

const recentDocs = [
  { title: "Constitution of the Republic of South Africa, 1996", type: "Constitution", added: "Core document" },
  { title: "Protection of Personal Information Act 4 of 2013", type: "Statute", added: "Added 2 days ago" },
  { title: "Labour Relations Act 66 of 1995", type: "Statute", added: "Added 1 week ago" },
  { title: "Prevention of Illegal Eviction Act 19 of 1998", type: "Statute", added: "Added 1 week ago" },
  { title: "National Credit Act 34 of 2005", type: "Statute", added: "Added 2 weeks ago" },
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-semibold text-white mb-2">Library</h1>
        <p className="text-neutral-500 text-sm">Browse the South African legal corpus</p>
      </div>

      <div className="relative mb-8 animate-fade-in-up-delay-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" strokeWidth={1.5} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the library..." className="w-full h-11 pl-11 pr-4 bg-white/[0.05] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-500 text-sm outline-none focus:border-[#d4a574]/40 transition-all" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-fade-in-up-delay-2">
        {categories.map((c) => (
          <div key={c.name} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer text-center">
            <c.icon className="h-5 w-5 text-[#d4a574] mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-white font-semibold text-sm">{c.name}</p>
            <p className="text-neutral-500 text-xs mt-1">{c.count} documents</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Recent Documents</h2>
      <div className="space-y-2 animate-fade-in-up-delay-3">
        {recentDocs.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer">
            <div>
              <p className="text-white text-sm font-medium">{d.title}</p>
              <p className="text-neutral-600 text-xs mt-0.5">{d.type}</p>
            </div>
            <span className="text-xs text-neutral-600">{d.added}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
