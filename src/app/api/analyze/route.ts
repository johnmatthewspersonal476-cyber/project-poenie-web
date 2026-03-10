import { NextRequest, NextResponse } from "next/server"

const mockAnalysis = {
  summary: {
    documentType: "Commercial Lease Agreement",
    parties: [
      { name: "Sandton Properties (Pty) Ltd", role: "Landlord" },
      { name: "TechFlow Solutions (Pty) Ltd", role: "Tenant" },
    ],
    date: "15 January 2026",
    jurisdiction: "Republic of South Africa — Gauteng Division, Johannesburg",
    effectiveDate: "1 March 2026",
    expiryDate: "28 February 2031",
    value: "R 2,450,000.00 per annum (escalating at 8% annually)",
  },
  riskAssessment: {
    high: 3,
    medium: 5,
    low: 8,
    overall: "MEDIUM-HIGH",
  },
  clauses: [
    {
      id: 1,
      title: "Rental Escalation (Clause 4.2)",
      risk: "high",
      summary:
        "Annual escalation of 8% compounded — significantly above current CPI (5.2%). Over the 5-year term, the monthly rental will increase from R204,166 to R299,657.",
      recommendation:
        "Negotiate escalation to CPI + 1% or a fixed 6%. The current rate will result in cumulative overpayment of approximately R580,000 over the lease term.",
    },
    {
      id: 2,
      title: "Maintenance and Repairs (Clause 7)",
      risk: "high",
      summary:
        'Tenant bears responsibility for ALL maintenance including structural repairs. This is unusual — structural maintenance is typically the landlord\'s obligation. The clause uses broad language: "any and all repairs howsoever arising."',
      recommendation:
        "Limit tenant maintenance to internal, non-structural repairs. Structural, roof, and external wall maintenance should remain with the landlord. Add a cap on annual maintenance expenditure (e.g., 5% of annual rental).",
    },
    {
      id: 3,
      title: "Cancellation Clause (Clause 12.1)",
      risk: "high",
      summary:
        "Landlord may cancel on 7 days' notice for any breach. No cure period is provided. Tenant has no reciprocal right of cancellation except for material breach with 60-day cure period.",
      recommendation:
        "Insert a 14-business-day cure period for tenant breaches. Add reciprocal cancellation rights. Consider requiring material breach (not any breach) as threshold for cancellation.",
    },
    {
      id: 4,
      title: "Security Deposit (Clause 5)",
      risk: "medium",
      summary:
        "Deposit equivalent to 3 months' rental (R612,498). Interest accrues to the landlord, not the tenant. No provision for deposit review or return timeline.",
      recommendation:
        "Per the Rental Housing Act 50 of 1999 (s 5(3)(g)), interest on the deposit must accrue to the tenant. Amend to comply. Add 14-day return period after lease termination.",
    },
    {
      id: 5,
      title: "Assignment and Subletting (Clause 9)",
      risk: "medium",
      summary:
        'Absolute prohibition on assignment or subletting, including to group companies. Consent clause reads: "The Tenant shall not ... under any circumstances whatsoever."',
      recommendation:
        'Amend to permit assignment to group companies and subletting with landlord\'s prior written consent, which "shall not be unreasonably withheld." This is standard commercial practice.',
    },
    {
      id: 6,
      title: "Insurance Obligations (Clause 8)",
      risk: "medium",
      summary:
        "Tenant must maintain comprehensive insurance including R20M public liability. Landlord is not required to insure the building structure or provide proof of insurance.",
      recommendation:
        "Require landlord to maintain building insurance and provide annual proof. Verify that R20M public liability is appropriate for the business type — may be excessive for an office tenant.",
    },
    {
      id: 7,
      title: "Dispute Resolution (Clause 15)",
      risk: "medium",
      summary:
        'Disputes subject to arbitration under AFSA rules. No provision for urgent interim relief through the courts. Arbitration costs are "as determined by the arbitrator."',
      recommendation:
        "Add express carve-out permitting either party to approach the High Court for urgent interim relief. Include provision for costs to follow the result in arbitration.",
    },
    {
      id: 8,
      title: "Suretyship (Clause 16)",
      risk: "medium",
      summary:
        "Directors required to bind themselves as sureties and co-principal debtors. Unlimited personal liability with no time restriction.",
      recommendation:
        "Limit suretyship to the value of the lease (total rental over term). Include automatic release of surety upon lease expiry or renewal. Consider limiting to one director only.",
    },
    {
      id: 9,
      title: "Permitted Use (Clause 3)",
      risk: "low",
      summary:
        'Premises to be used as "general offices and related business purposes." Reasonably broad permitted use.',
      recommendation:
        "Acceptable. Consider adding explicit permission for server rooms and ancillary storage to avoid future disputes.",
    },
    {
      id: 10,
      title: "Operating Hours (Clause 6)",
      risk: "low",
      summary:
        "Building access Monday to Friday 07:00–19:00, Saturday 08:00–13:00. After-hours access available at additional cost.",
      recommendation:
        "Negotiate 24/7 access for key holders at no additional cost. Tech companies frequently require after-hours access for system maintenance.",
    },
    {
      id: 11,
      title: "Force Majeure (Clause 14)",
      risk: "low",
      summary:
        "Standard force majeure clause including pandemic, natural disaster, government action. Both parties' obligations suspended during force majeure event.",
      recommendation:
        "Clause is acceptable. Consider adding express reference to load-shedding (power outages) as a force majeure event given South African conditions.",
    },
    {
      id: 12,
      title: "Parking (Clause 6.3)",
      risk: "low",
      summary:
        "4 covered parking bays included at R1,500 per bay per month, escalating at same rate as rental (8%).",
      recommendation:
        "Parking allocation and rate are reasonable for Sandton. Confirm bays are designated (not first-come-first-served).",
    },
    {
      id: 13,
      title: "Signage (Clause 6.5)",
      risk: "low",
      summary:
        "Tenant entitled to building directory board listing and one external sign, subject to landlord approval and municipal regulations.",
      recommendation: "Acceptable. Standard provision for multi-tenant commercial building.",
    },
    {
      id: 14,
      title: "CPA Compliance (Clause 17)",
      risk: "low",
      summary:
        "Clause states that the Consumer Protection Act 68 of 2008 does not apply to this lease.",
      recommendation:
        "Correct — CPA does not apply to lease agreements between juristic persons where the tenant's asset value or annual turnover exceeds the threshold (currently R2M).",
    },
    {
      id: 15,
      title: "Holding Over (Clause 13)",
      risk: "low",
      summary:
        "Month-to-month tenancy at last applicable rental plus 15% premium if tenant remains after lease expiry without renewal.",
      recommendation:
        "15% premium is steep but within market range. Negotiate to 10% or match the escalation rate.",
    },
    {
      id: 16,
      title: "Governing Law (Clause 18)",
      risk: "low",
      summary:
        "Agreement governed by the laws of South Africa. Parties consent to jurisdiction of the High Court, Gauteng Division.",
      recommendation: "Standard and appropriate. No changes required.",
    },
  ],
  obligations: [
    {
      party: "Landlord",
      items: [
        "Deliver premises in tenantable condition by 1 March 2026",
        "Provide building access during operating hours",
        "Maintain common areas and building exterior",
        "Provide 4 designated parking bays",
      ],
    },
    {
      party: "Tenant",
      items: [
        "Pay monthly rental of R204,166 by the 1st of each month",
        "Pay security deposit of R612,498 on signature",
        "Maintain and repair the premises (including structural — disputed)",
        "Maintain comprehensive insurance including R20M public liability",
        "Use premises only for permitted purpose",
        "Not assign or sublet without consent",
        "Restore premises to original condition on termination",
      ],
    },
  ],
  timeline: [
    { date: "15 Jan 2026", event: "Agreement signed" },
    { date: "22 Jan 2026", event: "Security deposit due (R612,498)" },
    { date: "1 Mar 2026", event: "Lease commencement — occupation and first rental due" },
    { date: "1 Mar 2027", event: "First escalation (8%) — rental increases to R220,499/month" },
    { date: "1 Mar 2028", event: "Second escalation — R238,139/month" },
    { date: "1 Mar 2029", event: "Third escalation — R257,190/month" },
    { date: "1 Mar 2030", event: "Fourth escalation — R277,765/month" },
    { date: "1 Sep 2030", event: "Deadline to negotiate renewal (6 months before expiry)" },
    { date: "28 Feb 2031", event: "Lease expiry" },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      id: `analysis-${Date.now()}`,
      filename: file.name,
      fileSize: file.size,
      analyzedAt: new Date().toISOString(),
      ...mockAnalysis,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    )
  }
}
