import { Database, HardDrive, FileText, Check, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sources = [
  { name: "SAFLII Judgments", files: "95,000+", size: "~50 GB", status: "partial", ingested: 63, total: 95000, description: "Southern African Legal Information Institute — comprehensive judgment database covering all SA courts." },
  { name: "Government Gazettes", files: "64,292", size: "221 GB", status: "pending", ingested: 0, total: 64292, description: "National and provincial government gazettes including legislation, regulations, and proclamations." },
  { name: "PMG (Parliamentary Monitoring Group)", files: "9,718", size: "11 GB", status: "pending", ingested: 0, total: 9718, description: "Committee reports, hansards, bills, and parliamentary question papers." },
  { name: "SARS", files: "2,951", size: "1.2 GB", status: "pending", ingested: 0, total: 2951, description: "Tax court judgments, binding rulings, interpretation notes, and guides." },
  { name: "SAHRC (SA Human Rights Commission)", files: "450+", size: "800 MB", status: "pending", ingested: 0, total: 450, description: "Investigation reports, research papers, and annual reports on human rights in South Africa." },
  { name: "SALRC (SA Law Reform Commission)", files: "380+", size: "600 MB", status: "pending", ingested: 0, total: 380, description: "Discussion papers, issue papers, and reports on law reform initiatives." },
  { name: "AGSA (Auditor-General)", files: "1,200+", size: "3 GB", status: "pending", ingested: 0, total: 1200, description: "Audit reports on national and provincial government departments and entities." },
  { name: "Public Protector", files: "320+", size: "500 MB", status: "pending", ingested: 0, total: 320, description: "Investigation reports including state capture and maladministration findings." },
  { name: "De Rebus", files: "2,400+", size: "1.5 GB", status: "pending", ingested: 0, total: 2400, description: "SA Attorneys' Journal — legal articles, case notes, and practice management content." },
];

function ProgressBar({ ingested, total }: { ingested: number; total: number }) {
  const pct = total > 0 ? Math.min((ingested / total) * 100, 100) : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{ingested.toLocaleString()} / {total.toLocaleString()} files</span>
        <span>{pct.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-[hsl(43,74%,49%)] rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "complete") return <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" />Complete</Badge>;
  if (status === "partial") return <Badge className="bg-amber-100 text-amber-800"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
  return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
}

export default function CorpusPage() {
  const totalFiles = sources.reduce((a, s) => a + s.total, 0);
  const totalIngested = sources.reduce((a, s) => a + s.ingested, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Corpus Overview</h1>
      <p className="text-muted-foreground mb-6 sm:mb-8">Data sources feeding the Project Poenie RAG pipeline.</p>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <Database className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-2" />
            <p className="text-3xl font-bold text-foreground">{sources.length}</p>
            <p className="text-sm text-muted-foreground">Data Sources</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-2" />
            <p className="text-3xl font-bold text-foreground">{totalFiles.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <HardDrive className="mx-auto h-8 w-8 text-[hsl(43,74%,49%)] mb-2" />
            <p className="text-3xl font-bold text-foreground">~290 GB</p>
            <p className="text-sm text-muted-foreground">Total Data Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall progress */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader><CardTitle className="text-base sm:text-lg">Overall Ingestion Progress</CardTitle></CardHeader>
        <CardContent><ProgressBar ingested={totalIngested} total={totalFiles} /></CardContent>
      </Card>

      {/* Per-source */}
      <div className="space-y-3 sm:space-y-4">
        {sources.map((s) => (
          <Card key={s.name}>
            <CardContent className="py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">{s.name}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.description}</p>
                </div>
                <div className="flex gap-3 text-sm sm:text-right shrink-0">
                  <p className="font-medium">{s.files} files</p>
                  <p className="text-muted-foreground">{s.size}</p>
                </div>
              </div>
              <ProgressBar ingested={s.ingested} total={s.total} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
