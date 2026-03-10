"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, BookOpen, FileEdit, FileSearch, ArrowRight, Send } from "lucide-react";

const features = [
  { href: "/chat", icon: MessageSquare, title: "Chat", desc: "Ask any legal question in natural language" },
  { href: "/research", icon: BookOpen, title: "Research", desc: "Search across SA judgments and statutes" },
  { href: "/draft", icon: FileEdit, title: "Draft", desc: "AI-assisted legal document drafting" },
  { href: "/analyze", icon: FileSearch, title: "Analyze", desc: "Upload and analyze contracts and documents" },
];

const prompts = [
  "Is the death penalty constitutional in South Africa?",
  "What are the requirements for a valid contract?",
  "Explain section 9 of the Constitution",
  "What is the PIE Act eviction process?",
  "How does POPIA affect businesses?",
  "What are grounds for unfair dismissal?",
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (text?: string) => {
    const q = text || query.trim();
    if (!q) return;
    router.push(`/chat?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full max-w-3xl mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight animate-fade-in-up">
          Legal AI for South Africa
        </h1>
        <p className="mt-4 text-neutral-400 text-lg animate-fade-in-up-delay-1">
          Research, draft, and analyze — powered by AI trained on South African law.
        </p>

        {/* Big centered input */}
        <div className="mt-10 animate-fade-in-up-delay-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask any legal question..."
              className="w-full h-14 pl-5 pr-14 bg-white/[0.05] border border-white/[0.06] rounded-2xl text-white placeholder:text-neutral-500 text-base outline-none focus:border-[#d4a574]/40 focus:ring-1 focus:ring-[#d4a574]/20 transition-all"
            />
            <button
              onClick={() => handleSubmit()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up-delay-3">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSubmit(p)}
              className="px-3.5 py-1.5 text-xs text-neutral-400 border border-white/[0.06] rounded-full hover:bg-white/[0.03] hover:text-neutral-300 hover:border-white/[0.1] transition-all"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <button
              key={f.href}
              onClick={() => router.push(f.href)}
              className="group text-left p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <f.icon className="h-5 w-5 text-[#d4a574] mb-4" strokeWidth={1.5} />
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                {f.title}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#d4a574]" />
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-t border-white/[0.06] py-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-12 sm:gap-16">
          {[
            { label: "Cases Indexed", value: "63+" },
            { label: "Documents Drafted", value: "47" },
            { label: "Analyses Completed", value: "23" },
            { label: "Research Sessions", value: "156" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-semibold text-white">{s.value}</p>
              <p className="mt-1 text-xs text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
