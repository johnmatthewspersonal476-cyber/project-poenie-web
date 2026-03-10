

import { Building2, Tag, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courtData = [
  { name: "Constitutional Court", count: 63, description: "Highest court — final arbiter of constitutional matters", years: "1995–2024" },
  { name: "Supreme Court of Appeal", count: 0, description: "Highest court of appeal in non-constitutional matters", years: "Coming soon" },
  { name: "High Court — Gauteng", count: 0, description: "Gauteng Division, Pretoria and Johannesburg", years: "Coming soon" },
  { name: "High Court — Western Cape", count: 0, description: "Western Cape Division, Cape Town", years: "Coming soon" },
  { name: "High Court — KwaZulu-Natal", count: 0, description: "KwaZulu-Natal Division, Pietermaritzburg and Durban", years: "Coming soon" },
  { name: "Labour Court", count: 0, description: "Specialist court for labour disputes", years: "Coming soon" },
  { name: "Land Claims Court", count: 0, description: "Adjudicates land restitution claims", years: "Coming soon" },
  { name: "Competition Appeal Court", count: 0, description: "Appeals from the Competition Tribunal", years: "Coming soon" },
];

const topics = [
  { name: "Constitutional Rights", count: 28, color: "bg-blue-100 text-blue-800" },
  { name: "Equality & Discrimination", count: 15, color: "bg-purple-100 text-purple-800" },
  { name: "Criminal Law & Procedure", count: 12, color: "bg-red-100 text-red-800" },
  { name: "Socio-economic Rights", count: 11, color: "bg-green-100 text-green-800" },
  { name: "Administrative Law", count: 9, color: "bg-yellow-100 text-yellow-800" },
  { name: "Property & Land", count: 8, color: "bg-amber-100 text-amber-800" },
  { name: "Labour Law", count: 7, color: "bg-orange-100 text-orange-800" },
  { name: "Freedom of Expression", count: 6, color: "bg-cyan-100 text-cyan-800" },
  { name: "Privacy & Dignity", count: 5, color: "bg-indigo-100 text-indigo-800" },
  { name: "Contract & Commercial", count: 4, color: "bg-teal-100 text-teal-800" },
];

const years = Array.from({ length: 30 }, (_, i) => {
  const y = 2024 - i;
  const count = y >= 2020 ? Math.floor(Math.random() * 4) + 1 : y >= 2010 ? Math.floor(Math.random() * 3) + 1 : y >= 1995 ? Math.floor(Math.random() * 3) : 0;
  return { year: y, count };
}).filter((y) => y.year >= 1995);

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[hsl(220,60%,20%)] mb-2">Browse the Corpus</h1>
      <p className="text-muted-foreground mb-8">Explore indexed legal documents by court, topic, or year.</p>

      <Tabs defaultValue="court">
        <TabsList className="mb-6">
          <TabsTrigger value="court" className="gap-2"><Building2 className="h-4 w-4" />By Court</TabsTrigger>
          <TabsTrigger value="topic" className="gap-2"><Tag className="h-4 w-4" />By Topic</TabsTrigger>
          <TabsTrigger value="year" className="gap-2"><Calendar className="h-4 w-4" />By Year</TabsTrigger>
        </TabsList>

        <TabsContent value="court">
          <div className="grid gap-4">
            {courtData.map((c) => (
              <Card key={c.name} className={`hover:shadow-md transition-shadow ${c.count === 0 ? "opacity-60" : "cursor-pointer"}`}>
                <CardContent className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-4">
                    <Building2 className="h-8 w-8 text-[hsl(220,60%,20%)]" />
                    <div>
                      <p className="font-semibold text-[hsl(220,60%,20%)]">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xl font-bold text-[hsl(220,60%,20%)]">{c.count > 0 ? c.count : "—"}</p>
                      <p className="text-xs text-muted-foreground">{c.years}</p>
                    </div>
                    {c.count > 0 && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topic">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-3">
                    <Badge className={t.color}>{t.count}</Badge>
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="year">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {years.map((y) => (
              <Card key={y.year} className={`text-center ${y.count === 0 ? "opacity-40" : "hover:shadow-md cursor-pointer"}`}>
                <CardContent className="py-4">
                  <p className="text-xl font-bold text-[hsl(220,60%,20%)]">{y.year}</p>
                  <p className="text-sm text-muted-foreground">{y.count} judgment{y.count !== 1 ? "s" : ""}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
