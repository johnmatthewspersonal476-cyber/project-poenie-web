import { NextRequest, NextResponse } from "next/server";

interface CaseResult {
  id: string;
  name: string;
  citation: string;
  court: string;
  date: string;
  year: number;
  judge: string;
  relevance: number;
  excerpt: string;
  fullText: string;
  topics: string[];
  statutes: string[];
  similarCases: string[];
}

const mockCases: CaseResult[] = [
  {
    id: "1",
    name: "S v Makwanyane and Another",
    citation: "1995 (3) SA 391 (CC)",
    court: "Constitutional Court",
    date: "1995-06-06",
    year: 1995,
    judge: "Chaskalson P",
    relevance: 98,
    excerpt: "The right to life is the most fundamental of all human rights. The death penalty constitutes cruel, inhuman or degrading treatment or punishment and is therefore unconstitutional.",
    fullText: "The Constitutional Court unanimously held that the death penalty, as provided for in section 277(1)(a) of the Criminal Procedure Act 51 of 1977, was inconsistent with the interim Constitution. Chaskalson P, writing for the majority, conducted an extensive analysis of international and comparative law, concluding that the death penalty violated the right to life (section 9), the right to dignity (section 10), and the prohibition of cruel, inhuman or degrading treatment or punishment (section 11(2)). Each of the eleven justices wrote separate concurring opinions, creating a rich tapestry of constitutional reasoning that has influenced courts worldwide. The judgment is particularly notable for its engagement with ubuntu as a constitutional value and its rejection of public opinion as a justification for rights violations.",
    topics: ["death penalty", "right to life", "human dignity", "cruel punishment", "constitutional rights"],
    statutes: ["Constitution of RSA 1996 s9", "Constitution of RSA 1996 s10", "Criminal Procedure Act 51 of 1977 s277"],
    similarCases: ["S v Williams 1995 (3) SA 632 (CC)", "Mohamed v President of RSA 2001 (3) SA 893 (CC)"],
  },
  {
    id: "2",
    name: "Minister of Home Affairs v Fourie",
    citation: "2006 (1) SA 524 (CC)",
    court: "Constitutional Court",
    date: "2005-12-01",
    year: 2005,
    judge: "Sachs J",
    relevance: 95,
    excerpt: "The exclusion of same-sex couples from marriage constitutes unfair discrimination on the grounds of sexual orientation and is inconsistent with the Constitution.",
    fullText: "In a unanimous judgment delivered by Sachs J, the Constitutional Court declared the common-law definition of marriage and section 30(1) of the Marriage Act 25 of 1961 unconstitutional to the extent that they failed to provide same-sex couples with the same status, benefits, and responsibilities as heterosexual married couples. The Court suspended the declaration of invalidity for one year to allow Parliament to remedy the defect, resulting in the Civil Union Act 17 of 2006. The judgment is celebrated for its eloquent articulation of the relationship between dignity, equality, and freedom, and its recognition that the Constitution protects the right of all persons to establish families and intimate relationships of their choosing.",
    topics: ["equality", "same-sex marriage", "unfair discrimination", "sexual orientation", "dignity"],
    statutes: ["Constitution of RSA 1996 s9", "Constitution of RSA 1996 s10", "Marriage Act 25 of 1961 s30(1)", "Civil Union Act 17 of 2006"],
    similarCases: ["National Coalition for Gay and Lesbian Equality v Minister of Justice 1999 (1) SA 6 (CC)", "Satchwell v President of RSA 2002 (6) SA 1 (CC)"],
  },
  {
    id: "3",
    name: "Carmichele v Minister of Safety and Security",
    citation: "2001 (4) SA 938 (CC)",
    court: "Constitutional Court",
    date: "2001-08-16",
    year: 2001,
    judge: "Ackermann J and Goldstone J",
    relevance: 92,
    excerpt: "The state has a positive constitutional duty to protect individuals from violence. The common law of delict must be developed in accordance with the Bill of Rights.",
    fullText: "The applicant was attacked by Coetzee, who had been released without opposition from the prosecutor or police despite a history of sexual violence. The Constitutional Court held that the High Court and Supreme Court of Appeal had erred in dismissing her claim. The Court found that the common law of delict must be developed to give proper effect to the state's positive duty under section 7(2) of the Constitution to protect fundamental rights. The boni mores test for wrongfulness must be infused with constitutional values, particularly the rights to life, dignity, freedom from violence (section 12), and the state's duty to protect these rights. This case fundamentally transformed the law of delictual liability in South Africa.",
    topics: ["negligence", "state liability", "gender-based violence", "delict", "positive duties", "wrongfulness"],
    statutes: ["Constitution of RSA 1996 s7(2)", "Constitution of RSA 1996 s12", "South African Police Service Act 68 of 1995"],
    similarCases: ["K v Minister of Safety and Security 2005 (6) SA 419 (CC)", "Van Eeden v Minister of Safety and Security 2003 (1) SA 389 (SCA)"],
  },
  {
    id: "4",
    name: "Government of RSA v Grootboom",
    citation: "2001 (1) SA 46 (CC)",
    court: "Constitutional Court",
    date: "2000-10-04",
    year: 2000,
    judge: "Yacoob J",
    relevance: 90,
    excerpt: "The state must take reasonable legislative and other measures to progressively realise the right of access to adequate housing, with particular attention to those in desperate need.",
    fullText: "Irene Grootboom and other respondents had been evicted from informal settlements and left homeless. The Constitutional Court held that section 26 of the Constitution required the state to devise and implement a coherent housing programme that included measures providing relief for people in desperate need. Yacoob J developed the concept of 'reasonableness review' for socio-economic rights, holding that while the state is not obliged to go beyond available resources, its programme must be balanced and flexible, making appropriate provision for those whose needs are most urgent. The judgment established the framework for adjudicating all socio-economic rights under the Constitution.",
    topics: ["housing", "socio-economic rights", "reasonableness review", "progressive realisation", "homelessness"],
    statutes: ["Constitution of RSA 1996 s26", "Constitution of RSA 1996 s28", "Housing Act 107 of 1997"],
    similarCases: ["Minister of Health v Treatment Action Campaign 2002 (5) SA 721 (CC)", "Occupiers of 51 Olivia Road v City of Johannesburg 2008 (3) SA 208 (CC)"],
  },
  {
    id: "5",
    name: "Minister of Health v Treatment Action Campaign",
    citation: "2002 (5) SA 721 (CC)",
    court: "Constitutional Court",
    date: "2002-07-05",
    year: 2002,
    judge: "The Court",
    relevance: 88,
    excerpt: "The government's failure to provide Nevirapine to HIV-positive mothers beyond pilot sites was unreasonable and violated the right of access to health care services under section 27.",
    fullText: "The Treatment Action Campaign challenged the government's policy of restricting the provision of Nevirapine (an antiretroviral drug that prevents mother-to-child transmission of HIV) to designated pilot sites. The Constitutional Court, delivering a unanimous judgment attributed to 'the Court', held that the restriction was unreasonable under section 27 of the Constitution. The Court ordered the government to make Nevirapine available at all public hospitals and clinics where it was medically indicated, and to take reasonable measures to extend testing and counselling facilities throughout the public health sector. This case is regarded as one of the most significant victories for the right to health globally.",
    topics: ["health rights", "HIV/AIDS", "socio-economic rights", "reasonableness", "positive obligations"],
    statutes: ["Constitution of RSA 1996 s27", "National Health Act 61 of 2003"],
    similarCases: ["Government of RSA v Grootboom 2001 (1) SA 46 (CC)", "Soobramoney v Minister of Health 1998 (1) SA 765 (CC)"],
  },
  {
    id: "6",
    name: "Certification of the Constitution of RSA",
    citation: "1996 (4) SA 744 (CC)",
    court: "Constitutional Court",
    date: "1996-09-06",
    year: 1996,
    judge: "Chaskalson P",
    relevance: 85,
    excerpt: "The Constitutional Court exercised its unique certification jurisdiction to assess whether the final Constitution complied with the 34 Constitutional Principles agreed upon during negotiations.",
    fullText: "In a process unique in constitutional history, the Constitutional Court was tasked with certifying that the final Constitution adopted by the Constitutional Assembly complied with the Constitutional Principles (CPs) set out in Schedule 4 of the interim Constitution. The Court declined to certify the text in several respects, including inadequate protection of the right to collective bargaining and insufficient provision for the independence of the Public Protector and Auditor-General. The Constitutional Assembly subsequently amended the text, which was certified in the Second Certification Judgment (1997 (2) SA 97 (CC)). This process gave the Constitution unique democratic and judicial legitimacy.",
    topics: ["certification", "constitutional principles", "separation of powers", "constitutional drafting"],
    statutes: ["Interim Constitution Act 200 of 1993 Schedule 4", "Constitution of RSA 1996"],
    similarCases: ["Certification of the Amended Text of the Constitution 1997 (2) SA 97 (CC)", "Executive Council of the Western Cape v President of RSA 1995 (4) SA 877 (CC)"],
  },
  {
    id: "7",
    name: "Barkhuizen v Napier",
    citation: "2007 (5) SA 323 (CC)",
    court: "Constitutional Court",
    date: "2007-04-04",
    year: 2007,
    judge: "Ngcobo J",
    relevance: 82,
    excerpt: "Time limitation clauses in contracts are subject to constitutional scrutiny. Public policy, infused by constitutional values, is the appropriate standard for testing contractual fairness.",
    fullText: "The applicant's short-term insurance claim was rejected because he had failed to institute proceedings within 90 days of the insurer's repudiation, as required by the policy. The Constitutional Court held that the proper approach to contractual terms is to determine whether they are contrary to public policy as informed by the Constitution. Ngcobo J held that while parties are generally free to contract as they wish, contractual terms that are unreasonable or contrary to constitutional values may be struck down. The 90-day clause was held not to be contrary to public policy in the abstract, but could be challenged if its enforcement in specific circumstances would be unfair.",
    topics: ["contract law", "public policy", "time limitations", "constitutional values", "freedom of contract"],
    statutes: ["Constitution of RSA 1996 s34", "Short-term Insurance Act 53 of 1998"],
    similarCases: ["Brisley v Drotsky 2002 (4) SA 1 (SCA)", "Napier v Barkhuizen 2006 (4) SA 1 (SCA)"],
  },
  {
    id: "8",
    name: "President of RSA v Hugo",
    citation: "1997 (4) SA 1 (CC)",
    court: "Constitutional Court",
    date: "1997-04-18",
    year: 1997,
    judge: "Goldstone J",
    relevance: 80,
    excerpt: "The Presidential Act pardoning mothers of young children but not fathers did not constitute unfair discrimination, given the reality that mothers are disproportionately primary caregivers.",
    fullText: "President Mandela exercised his power under section 82(1)(k) of the interim Constitution to grant a special remission of sentence to all mothers in prison with minor children under the age of twelve. Hugo, an imprisoned father, challenged the exclusion of fathers as unfair discrimination on the ground of sex. The Constitutional Court, in a majority judgment by Goldstone J, held that while the Presidential Act did discriminate on the ground of sex, it was not unfair in the circumstances, given the social reality that women bear a disproportionate share of child-rearing responsibilities. The dissent by Kriegler J argued powerfully that reliance on gender stereotypes perpetuates inequality.",
    topics: ["equality", "gender discrimination", "presidential pardon", "child welfare", "stereotyping"],
    statutes: ["Interim Constitution Act 200 of 1993 s82(1)(k)", "Constitution of RSA 1996 s9"],
    similarCases: ["Harksen v Lane NO 1998 (1) SA 300 (CC)", "Prinsloo v Van der Linde 1997 (3) SA 1012 (CC)"],
  },
  {
    id: "9",
    name: "Investigating Directorate: SERO v Hyundai Motor Distributors",
    citation: "2001 (1) SA 545 (CC)",
    court: "Constitutional Court",
    date: "2000-08-25",
    year: 2000,
    judge: "Langa DP",
    relevance: 78,
    excerpt: "All statutes must be interpreted through the prism of the Bill of Rights. Courts must prefer any reasonable interpretation that avoids a finding of unconstitutionality.",
    fullText: "The case concerned the validity of provisions in the National Prosecuting Authority Act allowing search and seizure without a warrant. Langa DP held that section 39(2) of the Constitution creates a general interpretive obligation requiring courts to promote the spirit, purport, and objects of the Bill of Rights when interpreting any legislation. The 'reading down' principle requires courts to prefer any reasonable interpretation of a statute that is consistent with the Constitution over one that is not. This case established the interpretive methodology that permeates all subsequent constitutional adjudication in South Africa.",
    topics: ["statutory interpretation", "reading down", "search and seizure", "Bill of Rights", "constitutional interpretation"],
    statutes: ["Constitution of RSA 1996 s39(2)", "National Prosecuting Authority Act 32 of 1998"],
    similarCases: ["S v Zuma 1995 (2) SA 642 (CC)", "De Beer v North-Central and South-Central Councils 2002 (1) SA 429 (CC)"],
  },
  {
    id: "10",
    name: "Alexkor Ltd v Richtersveld Community",
    citation: "2004 (5) SA 460 (CC)",
    court: "Constitutional Court",
    date: "2003-10-14",
    year: 2003,
    judge: "The Court",
    relevance: 75,
    excerpt: "Indigenous law ownership rights, including rights to minerals and precious stones, survived annexation by the British Crown and were protected under the Restitution of Land Rights Act.",
    fullText: "The Richtersveld Community, a Nama community, claimed restitution of mineral-rich land in Namaqualand that had been dispossessed under racially discriminatory laws. The Constitutional Court held that the community's indigenous law rights of ownership, including mineral rights, constituted 'rights in land' for purposes of the Restitution of Land Rights Act 22 of 1994. The Court rejected the argument that indigenous ownership rights were extinguished by British annexation, holding that such rights survived and were cognisable under South African law. This landmark decision affirmed the constitutional recognition of indigenous law as an independent source of rights.",
    topics: ["land restitution", "indigenous law", "mineral rights", "dispossession", "historical injustice"],
    statutes: ["Restitution of Land Rights Act 22 of 1994", "Constitution of RSA 1996 s25", "Minerals Act 50 of 1991"],
    similarCases: ["Department of Land Affairs v Goedgelegen Tropical Fruits 2007 (6) SA 199 (CC)", "Tongoane v National Minister for Agriculture 2010 (6) SA 214 (CC)"],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";
  const court = searchParams.get("court") || "";
  const judge = searchParams.get("judge")?.toLowerCase() || "";
  const dateFrom = searchParams.get("dateFrom") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const topic = searchParams.get("topic")?.toLowerCase() || "";

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

  let results = [...mockCases];

  if (q) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.citation.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.fullText.toLowerCase().includes(q) ||
        c.topics.some((t) => t.includes(q))
    );
  }

  if (court) {
    results = results.filter((c) => c.court === court);
  }

  if (judge) {
    results = results.filter((c) => c.judge.toLowerCase().includes(judge));
  }

  if (dateFrom) {
    results = results.filter((c) => c.date >= dateFrom);
  }

  if (dateTo) {
    results = results.filter((c) => c.date <= dateTo);
  }

  if (topic) {
    results = results.filter((c) => c.topics.some((t) => t.includes(topic)));
  }

  // Adjust relevance based on query match quality
  if (q) {
    results = results.map((c) => {
      let relevance = c.relevance;
      if (c.name.toLowerCase().includes(q)) relevance = Math.min(99, relevance + 5);
      if (c.excerpt.toLowerCase().includes(q)) relevance = Math.min(99, relevance + 3);
      return { ...c, relevance };
    });
  }

  results.sort((a, b) => b.relevance - a.relevance);

  return NextResponse.json({ results, total: results.length });
}
