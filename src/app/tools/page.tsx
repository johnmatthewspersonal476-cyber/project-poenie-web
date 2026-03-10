"use client";

import { Calculator, FileText, Scale, Search, Clock, Gavel } from "lucide-react";

const tools = [
  { icon: Calculator, title: "Interest Calculator", desc: "Calculate mora interest, prescribed rates, and contractual interest", status: "Available" },
  { icon: Scale, title: "Court Fee Calculator", desc: "Estimate filing fees for High Court and Magistrate's Court matters", status: "Available" },
  { icon: Clock, title: "Prescription Calculator", desc: "Check prescription periods under the Prescription Act 68 of 1969", status: "Available" },
  { icon: FileText, title: "Citation Generator", desc: "Generate proper South African legal citations in standard format", status: "Available" },
  { icon: Search, title: "Case Comparator", desc: "Compare two or more cases side-by-side for analysis", status: "Coming Soon" },
  { icon: Gavel, title: "Jurisdiction Finder", desc: "Determine the correct court and jurisdiction for your matter", status: "Coming Soon" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-semibold text-white mb-2">Tools</h1>
        <p className="text-neutral-500 text-sm">Legal calculators, generators, and utilities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up-delay-1">
        {tools.map((t) => (
          <div key={t.title} className={`p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer ${t.status === "Coming Soon" ? "opacity-50" : ""}`}>
            <t.icon className="h-5 w-5 text-[#d4a574] mb-4" strokeWidth={1.5} />
            <h3 className="text-white font-semibold text-sm">{t.title}</h3>
            <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">{t.desc}</p>
            {t.status === "Coming Soon" && (
              <span className="inline-block mt-3 text-[10px] text-neutral-600 border border-white/[0.06] rounded-full px-2 py-0.5">Coming Soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
