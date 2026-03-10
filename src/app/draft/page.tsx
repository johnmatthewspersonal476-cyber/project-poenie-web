"use client";

import { useState, useCallback } from "react";
import { FileEdit, ArrowLeft, Download, Save, Loader2 } from "lucide-react";

const templates = [
  { id: "heads-of-argument", name: "Heads of Argument", desc: "Written legal submissions to the court" },
  { id: "legal-opinion", name: "Legal Opinion", desc: "Formal legal advice on a specific question of law" },
  { id: "affidavit", name: "Affidavit", desc: "Sworn statement of facts for court proceedings" },
  { id: "notice-of-motion", name: "Notice of Motion", desc: "Application to court setting out relief sought" },
  { id: "plea", name: "Plea", desc: "Defendant's formal response to particulars of claim" },
  { id: "contract", name: "Contract", desc: "General commercial agreement between parties" },
  { id: "demand-letter", name: "Demand Letter", desc: "Formal letter demanding compliance or payment" },
  { id: "settlement-agreement", name: "Settlement Agreement", desc: "Agreement to resolve a dispute" },
  { id: "power-of-attorney", name: "Power of Attorney", desc: "Authority granted to an agent" },
];

type Stage = "templates" | "form" | "document";

export default function DraftPage() {
  const [stage, setStage] = useState<Stage>("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [fields, setFields] = useState({ clientName: "", matter: "", keyFacts: "", legalIssues: "", parties: "" });
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!selectedTemplate) return;
    setLoading(true);
    try {
      const res = await fetch("/api/draft", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ template: selectedTemplate.id, fields }) });
      const data = await res.json();
      if (data.content) { setGeneratedDoc(data.content); setStage("document"); }
    } catch {
      setGeneratedDoc("# " + selectedTemplate.name + "\n\nSample generated document content. Connect your AI backend for real generation.\n\n## Parties\n\n" + (fields.clientName || "Client") + " and " + (fields.parties || "Counterparty") + "\n\n## Matter\n\n" + (fields.matter || "Legal matter reference") + "\n\n## Key Facts\n\n" + (fields.keyFacts || "Facts to be provided") + "\n\n## Legal Issues\n\n" + (fields.legalIssues || "Issues to be addressed"));
      setStage("document");
    } finally { setLoading(false); }
  }, [selectedTemplate, fields]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          {stage !== "templates" && (
            <button onClick={() => stage === "document" ? setStage("form") : setStage("templates")} className="text-neutral-500 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
          <h1 className="text-3xl font-semibold text-white">Document Drafting</h1>
        </div>
        <p className="text-neutral-500 text-sm">
          {stage === "templates" && "Select a template to begin"}
          {stage === "form" && `Preparing: ${selectedTemplate?.name}`}
          {stage === "document" && `${selectedTemplate?.name} — Edit and export`}
        </p>
      </div>

      {stage === "templates" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up-delay-1">
          {templates.map((t) => (
            <button key={t.id} onClick={() => { setSelectedTemplate(t); setStage("form"); setFields({ clientName: "", matter: "", keyFacts: "", legalIssues: "", parties: "" }); setGeneratedDoc(""); }} className="text-left p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group">
              <FileEdit className="h-5 w-5 text-[#d4a574] mb-3" strokeWidth={1.5} />
              <h3 className="text-white font-semibold text-sm group-hover:text-[#d4a574] transition-colors">{t.name}</h3>
              <p className="text-neutral-500 text-xs mt-1.5">{t.desc}</p>
            </button>
          ))}
        </div>
      )}

      {stage === "form" && (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up-delay-1">
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-5">
            {[
              { label: "Client / Party Name", key: "clientName", placeholder: "e.g., Mthembu Trading (Pty) Ltd" },
              { label: "Matter / Reference", key: "matter", placeholder: "e.g., 12345/2026" },
              { label: "Opposing / Other Parties", key: "parties", placeholder: "e.g., National Credit Regulator" },
            ].map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-xs text-neutral-500">{f.label}</label>
                <input type="text" value={fields[f.key as keyof typeof fields]} onChange={(e) => setFields((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full h-11 px-4 bg-white/[0.05] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-500 text-sm outline-none focus:border-[#d4a574]/40 transition-all" />
              </div>
            ))}
            {[
              { label: "Key Facts", key: "keyFacts", placeholder: "Summarise the relevant facts..." },
              { label: "Legal Issues / Relief Sought", key: "legalIssues", placeholder: "What legal questions need to be addressed?" },
            ].map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-xs text-neutral-500">{f.label}</label>
                <textarea value={fields[f.key as keyof typeof fields]} onChange={(e) => setFields((p) => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={3} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-500 text-sm outline-none focus:border-[#d4a574]/40 transition-all resize-none" />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={handleGenerate} disabled={loading} className="px-5 py-2.5 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black text-sm font-medium disabled:opacity-50 transition-colors flex items-center gap-2">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : "Generate Draft"}
              </button>
              <button onClick={() => setStage("templates")} className="px-5 py-2.5 rounded-xl border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.03] text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {stage === "document" && (
        <div className="animate-fade-in-up-delay-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs rounded-lg bg-[#d4a574]/10 text-[#d4a574] border border-[#d4a574]/20">{selectedTemplate?.name}</span>
              <span className="text-xs text-neutral-600">{generatedDoc.split(/\s+/).length} words</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-white/[0.06] text-neutral-400 hover:text-white text-xs transition-colors flex items-center gap-1.5"><Save className="h-3.5 w-3.5" strokeWidth={1.5} /> Save</button>
              <button className="px-3 py-1.5 rounded-lg border border-white/[0.06] text-neutral-400 hover:text-white text-xs transition-colors flex items-center gap-1.5"><Download className="h-3.5 w-3.5" strokeWidth={1.5} /> Export</button>
            </div>
          </div>
          <textarea className="w-full min-h-[65vh] p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl text-neutral-300 text-sm font-mono leading-relaxed outline-none focus:border-[#d4a574]/30 resize-none" value={generatedDoc} onChange={(e) => setGeneratedDoc(e.target.value)} />
        </div>
      )}
    </div>
  );
}
