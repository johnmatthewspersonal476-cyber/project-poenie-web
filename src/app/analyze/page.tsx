"use client";

import { useState, useCallback } from "react";
import { Upload, FileSearch, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ summary: string; risks: string[]; clauses: string[] } | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ summary: "Analysis complete. This is a sample result — connect your AI backend for real analysis.", risks: ["No indemnity clause found", "Limitation of liability may be too broad", "Jurisdiction clause favours counterparty"], clauses: ["Confidentiality — Section 4", "Termination — Section 8", "Force Majeure — Section 12", "Governing Law — Section 15"] });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-semibold text-white mb-2">Document Analysis</h1>
        <p className="text-neutral-500 text-sm">Upload contracts and legal documents for AI-powered analysis</p>
      </div>

      {!result ? (
        <div className="animate-fade-in-up-delay-1">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-white/[0.06] rounded-2xl p-12 text-center hover:border-[#d4a574]/30 transition-colors cursor-pointer"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input id="file-input" type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
            <Upload className="h-8 w-8 text-neutral-500 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-neutral-400 text-sm mb-1">
              {file ? file.name : "Drop a document here, or click to browse"}
            </p>
            <p className="text-neutral-600 text-xs">PDF, Word, or text files up to 10MB</p>
          </div>

          {file && (
            <div className="mt-6 flex justify-center">
              <button onClick={handleAnalyze} disabled={analyzing} className="px-6 py-2.5 rounded-xl bg-[#d4a574] hover:bg-[#c4955a] text-black text-sm font-medium disabled:opacity-50 transition-colors flex items-center gap-2">
                {analyzing ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing...</> : <><FileSearch className="h-4 w-4" /> Analyze Document</>}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in-up">
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h2 className="text-white font-semibold mb-3">Summary</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">{result.summary}</p>
          </div>

          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#d4a574]" strokeWidth={1.5} /> Risk Flags
            </h2>
            <div className="space-y-2">
              {result.risks.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                  <span className="text-[#d4a574] mt-0.5">•</span> {r}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#d4a574]" strokeWidth={1.5} /> Key Clauses
            </h2>
            <div className="space-y-2">
              {result.clauses.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                  <span className="text-neutral-600 mt-0.5">•</span> {c}
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setResult(null); setFile(null); }} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
            ← Analyze another document
          </button>
        </div>
      )}
    </div>
  );
}
