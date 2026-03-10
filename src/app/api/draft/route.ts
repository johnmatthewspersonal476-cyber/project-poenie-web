import { NextRequest, NextResponse } from "next/server"

const templates: Record<string, (fields: Record<string, string>) => string> = {
  "heads-of-argument": (f) => `IN THE HIGH COURT OF SOUTH AFRICA
(GAUTENG DIVISION, PRETORIA)

CASE NO: ${f.matter || "________/2026"}

In the matter between:

${(f.clientName || "THE APPLICANT").toUpperCase()}                                                          Applicant

and

${(f.parties || "THE RESPONDENT").toUpperCase()}                                                          Respondent

________________________________________________________________________

HEADS OF ARGUMENT ON BEHALF OF THE APPLICANT

________________________________________________________________________

TABLE OF CONTENTS

1.  INTRODUCTION .................................................. 1
2.  FACTUAL BACKGROUND ............................................ 2
3.  THE LEGAL ISSUES .............................................. 3
4.  SUBMISSIONS ................................................... 4
5.  CONCLUSION AND PRAYER ......................................... 8

________________________________________________________________________

1.  INTRODUCTION

1.1  These heads of argument are filed on behalf of the Applicant in support of the application for ${f.legalIssues || "the relief sought in the notice of motion"}.

1.2  The Applicant submits that the facts and the law support the granting of the relief sought.

2.  FACTUAL BACKGROUND

2.1  ${f.keyFacts || "The relevant facts are set out in the founding affidavit and may be summarised as follows:"}

2.2  It is submitted that the above facts are either common cause or have been established on a balance of probabilities.

3.  THE LEGAL ISSUES

3.1  The legal issues for determination are:

    3.1.1  ${f.legalIssues || "Whether the applicant has established the requisite legal basis for the relief sought."}

    3.1.2  Whether the interests of justice favour the granting of the order.

4.  SUBMISSIONS

4.1  It is trite law that the applicant bears the onus of establishing the requirements for the relief sought. See: Plascon-Evans Paints Ltd v Van Riebeeck Paints (Pty) Ltd 1984 (3) SA 623 (A).

4.2  The Constitutional Court has confirmed in Minister of Home Affairs v Scalabrini Centre 2013 (6) SA 421 (SCA) that:

      "The court must be satisfied that the case made out by the applicant in the founding papers, together with any admissions made by the respondent, justifies the order sought."

4.3  Applying these principles to the present facts, it is submitted that the applicant has made out a proper case for the relief sought.

5.  CONCLUSION AND PRAYER

5.1  For the reasons set out above, the Applicant respectfully submits that the application should be granted with costs, including the costs of two counsel where so employed.


___________________________
COUNSEL FOR THE APPLICANT
Chambers, Sandton
${new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}`,

  "legal-opinion": (f) => `PRIVILEGED AND CONFIDENTIAL
LEGAL OPINION

________________________________________________________________________

PREPARED FOR:     ${f.clientName || "[Client Name]"}
MATTER:           ${f.matter || "[Matter Description]"}
DATE:             ${new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
OUR REFERENCE:    ${f.matter?.replace(/\s/g, "-").substring(0, 20) || "LO/2026/001"}

________________________________________________________________________

1.  INTRODUCTION AND MANDATE

1.1  We have been instructed to provide a legal opinion on the following matter:

     ${f.legalIssues || "[Description of the legal question(s)]"}

1.2  This opinion is based on the following facts and documents provided to us:

     ${f.keyFacts || "[Summary of key facts and documents reviewed]"}

2.  APPLICABLE LAW

2.1  The relevant legislative framework includes:
     - The Constitution of the Republic of South Africa, 1996
     - The relevant provisions of applicable legislation

2.2  The following judicial authorities are relevant to the issues under consideration.

3.  ANALYSIS

3.1  Having considered the facts, the applicable legislation, and the relevant case law, we provide the following analysis:

3.2  [Detailed legal analysis would follow based on the specific facts and legal questions posed.]

4.  OPINION

4.1  In our opinion, based on the facts presented and the applicable law:

     4.1.1  [Primary conclusion]
     4.1.2  [Secondary conclusion, if applicable]

4.2  We caution that this opinion is based on the facts as presented to us. Should any material facts differ, our opinion may change.

5.  RECOMMENDATION

5.1  We recommend that ${f.clientName || "the client"} consider the following course of action:

     [Recommended steps]

5.2  We remain available to discuss this opinion and to provide any further assistance that may be required.


___________________________
[Attorney Name]
[Firm Name]
${new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}`,

  "affidavit": (f) => `IN THE HIGH COURT OF SOUTH AFRICA
(GAUTENG DIVISION, PRETORIA)

CASE NO: ${f.matter || "________/2026"}

In the matter between:

${(f.clientName || "THE APPLICANT").toUpperCase()}                                                          Applicant

and

${(f.parties || "THE RESPONDENT").toUpperCase()}                                                          Respondent

________________________________________________________________________

FOUNDING AFFIDAVIT

________________________________________________________________________

I, the undersigned,

${(f.clientName || "[FULL NAME]").toUpperCase()}

do hereby make oath and state:

1.  I am the Applicant in this matter. The facts contained herein are within my personal knowledge and are, to the best of my belief, both true and correct.

2.  ${f.keyFacts || "[Set out the relevant facts in numbered paragraphs, each dealing with a single issue.]"}

3.  LEGAL BASIS

3.1  ${f.legalIssues || "[Set out the legal basis for the relief sought.]"}

4.  URGENCY (if applicable)

4.1  I submit that this matter is urgent for the following reasons: [reasons].

5.  PRAYER

5.1  In the premises, I respectfully request that this Honourable Court grant an order in the following terms:

    5.1.1  [Relief sought]
    5.1.2  Costs of the application on the attorney and client scale.
    5.1.3  Further and/or alternative relief.


___________________________
DEPONENT

I certify that the deponent has acknowledged that he/she knows and understands the contents of this affidavit and that it is true and correct. This affidavit was signed and sworn to before me at _____________ on this the ____ day of _____________ 2026, the regulations contained in Government Notice No R1258 of 21 July 1972 (as amended) having been complied with.


___________________________
COMMISSIONER OF OATHS`,

  "notice-of-motion": (f) => `IN THE HIGH COURT OF SOUTH AFRICA
(GAUTENG DIVISION, PRETORIA)

CASE NO: ${f.matter || "________/2026"}

In the matter between:

${(f.clientName || "THE APPLICANT").toUpperCase()}                                                          Applicant

and

${(f.parties || "THE RESPONDENT").toUpperCase()}                                                          Respondent

________________________________________________________________________

NOTICE OF MOTION

________________________________________________________________________

KINDLY TAKE NOTICE that ${f.clientName || "the Applicant"} intends to make application to this Honourable Court on ${new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })} at 10h00, or as soon thereafter as the matter may be heard, for an order in the following terms:

1.  ${f.legalIssues || "[Primary relief sought]"}

2.  That the Respondent pay the costs of this application.

3.  Further and/or alternative relief.

KINDLY TAKE NOTICE FURTHER that the accompanying affidavit of ${f.clientName || "[Deponent]"} will be used in support of this application.

KINDLY TAKE NOTICE FURTHER that if you intend to oppose this application, you are required to:

(a)  notify the Applicant's attorneys in writing of your intention to oppose within [five/fifteen] days of service of this notice upon you; and

(b)  file your answering affidavit, if any, within [fifteen/thirty] days of notifying the Applicant of your intention to oppose.


DATED at _________________ this ____ day of _____________ 2026.


___________________________
[ATTORNEYS FOR THE APPLICANT]
[Address]
[Tel / Ref]

TO:     THE REGISTRAR OF THE ABOVE HONOURABLE COURT
AND TO: ${(f.parties || "THE RESPONDENT").toUpperCase()}
        [Address for service]`,

  "plea": (f) => `IN THE HIGH COURT OF SOUTH AFRICA
(GAUTENG DIVISION, PRETORIA)

CASE NO: ${f.matter || "________/2026"}

In the matter between:

${(f.parties || "THE PLAINTIFF").toUpperCase()}                                                          Plaintiff

and

${(f.clientName || "THE DEFENDANT").toUpperCase()}                                                          Defendant

________________________________________________________________________

PLEA

________________________________________________________________________

The Defendant pleads as follows to the Plaintiff's Particulars of Claim:

AD PARAGRAPH 1

1.  The contents of this paragraph are admitted.

AD PARAGRAPH 2

2.  The contents of this paragraph are denied. The Defendant puts the Plaintiff to the proof thereof.

AD PARAGRAPHS 3–5

3.  ${f.keyFacts || "The Defendant denies each and every allegation contained in these paragraphs and puts the Plaintiff to the proof thereof."}

SPECIAL PLEA (if applicable)

4.  ${f.legalIssues || "The Defendant raises the following special plea: [prescription / lack of jurisdiction / etc.]"}

WHEREFORE the Defendant prays that the Plaintiff's claim be dismissed with costs, including the costs of two counsel where so employed.


DATED at _________________ this ____ day of _____________ 2026.


___________________________
[ATTORNEYS FOR THE DEFENDANT]`,

  "contract": (f) => `CONTRACT

________________________________________________________________________

entered into between

${(f.clientName || "[PARTY A]").toUpperCase()} ("the First Party")

and

${(f.parties || "[PARTY B]").toUpperCase()} ("the Second Party")

________________________________________________________________________

1.  DEFINITIONS AND INTERPRETATION

1.1  In this agreement, unless the context indicates otherwise:

     "Effective Date" means the date of signature by the last signing party;
     "Agreement" means this agreement and all annexures hereto;

2.  BACKGROUND

2.1  ${f.keyFacts || "[Background and context for the agreement]"}

3.  TERMS AND CONDITIONS

3.1  ${f.legalIssues || "[Principal terms of the agreement]"}

4.  DURATION

4.1  This agreement shall commence on the Effective Date and shall endure for a period of [12] months, whereafter it shall automatically renew for successive periods of [12] months unless terminated by either party on [30] days' written notice.

5.  PAYMENT

5.1  [Payment terms to be inserted]

6.  BREACH

6.1  Should either party commit a breach of any provision of this agreement and fail to remedy such breach within [14] business days of receipt of a written notice requiring it to do so, the aggrieved party shall be entitled, without prejudice to any other rights, to cancel this agreement and claim damages.

7.  GENERAL

7.1  This agreement constitutes the entire agreement between the parties.
7.2  No amendment or variation shall be of any force unless reduced to writing and signed by both parties.
7.3  This agreement shall be governed by the laws of the Republic of South Africa.
7.4  The parties consent to the jurisdiction of the High Court of South Africa, ${f.matter?.includes("Cape") ? "Western Cape Division" : "Gauteng Division, Pretoria"}.

SIGNED at _________________ on this ____ day of _____________ 2026.


___________________________
${(f.clientName || "FIRST PARTY").toUpperCase()}


___________________________
${(f.parties || "SECOND PARTY").toUpperCase()}`,

  "demand-letter": (f) => `[ON LETTERHEAD]

${new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}

WITHOUT PREJUDICE

BY REGISTERED POST AND EMAIL

${(f.parties || "[Recipient Name and Address]").toUpperCase()}

Dear Sir/Madam

RE: LETTER OF DEMAND — ${(f.matter || "[MATTER DESCRIPTION]").toUpperCase()}

________________________________________________________________________

1.  We act on behalf of ${f.clientName || "[our client]"} in the above matter.

2.  ${f.keyFacts || "We are instructed that [set out the factual basis for the claim]."}

3.  ${f.legalIssues || "In terms of [the relevant legal basis], our client is entitled to [the relief claimed]."}

4.  In the premises, we hereby demand that you:

    4.1  [Primary demand, e.g., payment of R_______ being the amount due and owing];
    4.2  [Secondary demand, if applicable]

    within [14] days of receipt of this letter, failing which our client will have no alternative but to institute legal proceedings against you without further notice, in which event we shall also claim:

    (a)  interest at the prescribed rate;
    (b)  costs of suit on the attorney and client scale; and
    (c)  collection commission.

5.  We trust that the matter can be resolved without recourse to litigation.

Yours faithfully


___________________________
[ATTORNEY NAME]
[FIRM NAME]
[Contact details]`,

  "settlement-agreement": (f) => `SETTLEMENT AGREEMENT AND RELEASE

________________________________________________________________________

entered into between

${(f.clientName || "[PARTY A]").toUpperCase()} ("the First Party")

and

${(f.parties || "[PARTY B]").toUpperCase()} ("the Second Party")

(collectively "the Parties")

________________________________________________________________________

WHEREAS:

A.  The Parties are involved in a dispute relating to ${f.matter || "[description of dispute]"}.

B.  ${f.keyFacts || "The relevant background facts are as follows: [summary]."}

C.  The Parties wish to settle the dispute on the terms and conditions set out herein.

NOW THEREFORE THE PARTIES AGREE AS FOLLOWS:

1.  SETTLEMENT TERMS

1.1  ${f.legalIssues || "[Set out the terms of settlement, e.g., payment amount, timeline, obligations]"}

1.2  The settlement amount shall be paid within [30] days of signature of this agreement into the following account: [banking details].

2.  RELEASE AND DISCHARGE

2.1  Upon fulfilment of the obligations set out in clause 1, the Parties hereby release and discharge each other from any and all claims, demands, and causes of action arising from or related to the subject matter of this agreement.

3.  CONFIDENTIALITY

3.1  The terms of this agreement shall be treated as strictly confidential by both Parties.

4.  COSTS

4.1  Each party shall bear its own costs in connection with this agreement and the underlying dispute.

5.  GENERAL

5.1  This agreement constitutes the entire agreement between the Parties.
5.2  This agreement may be made an order of court at the instance of either party.
5.3  This agreement shall be governed by the laws of the Republic of South Africa.

SIGNED at _________________ on this ____ day of _____________ 2026.


___________________________
${(f.clientName || "FIRST PARTY").toUpperCase()}


___________________________
${(f.parties || "SECOND PARTY").toUpperCase()}`,

  "power-of-attorney": (f) => `POWER OF ATTORNEY

________________________________________________________________________

I/We, the undersigned,

${(f.clientName || "[FULL NAME / COMPANY NAME]").toUpperCase()}
(Identity Number / Registration Number: _______________________________)

of ${f.keyFacts || "[physical address]"}

("the Principal")

do hereby appoint

${(f.parties || "[FULL NAME OF ATTORNEY/AGENT]").toUpperCase()}
(Identity Number: _______________________________)

("the Attorney/Agent")

as my/our lawful attorney and agent, with power and authority to:

1.  ${f.legalIssues || "[Specify the powers granted, e.g., sign documents, represent in legal proceedings, manage property, etc.]"}

2.  Do all things necessary and incidental to the exercise of the above powers.

3.  Appoint a substitute to act in his/her place. [Delete if not applicable]

This power of attorney:

(a)  shall remain in force until revoked in writing by the Principal;
(b)  [shall / shall not] survive the mental incapacity of the Principal;
(c)  is governed by the laws of the Republic of South Africa.

SIGNED at _________________ on this ____ day of _____________ 2026.

AS WITNESSES:

1. ___________________________     ___________________________
                                    ${(f.clientName || "PRINCIPAL").toUpperCase()}

2. ___________________________`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { template, fields } = body

    if (!template || !templates[template]) {
      return NextResponse.json(
        { error: "Invalid template type" },
        { status: 400 }
      )
    }

    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const document = templates[template](fields || {})

    return NextResponse.json({
      id: `draft-${Date.now()}`,
      template,
      content: document,
      generatedAt: new Date().toISOString(),
      wordCount: document.split(/\s+/).length,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to generate draft" },
      { status: 500 }
    )
  }
}
