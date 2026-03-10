import { NextRequest } from "next/server";

const mockResponses: Record<string, string> = {
  death_penalty: `The death penalty in South Africa was abolished by the Constitutional Court in the landmark case of **S v Makwanyane 1995 (3) SA 391 (CC)**.

In this seminal judgment, Chaskalson P (as he then was) held that the death penalty constituted "cruel, inhuman or degrading treatment or punishment" under section 11(2) of the interim Constitution. The Court found that the right to life, enshrined in section 9, is the most fundamental of all human rights, and that no constitutional framework premised on human dignity can countenance the deliberate taking of life by the state.

The Court considered international and comparative jurisprudence extensively, including decisions from the United States Supreme Court (*Furman v Georgia* 408 US 238 (1972)), the European Court of Human Rights (*Soering v United Kingdom* (1989) 11 EHRR 439), and the Hungarian Constitutional Court.

Justice O'Regan, in a concurring judgment, emphasised that the death penalty is incompatible with a culture of human rights because it "annihilates" the person and "treats the convicted person as an object to be eliminated by the State."

**Key citations:**
- [S v Makwanyane 1995 (3) SA 391 (CC)](http://www.saflii.org/za/cases/ZACC/1995/3.html)
- Section 9 (right to life) and Section 11(2) (cruel punishment) of the interim Constitution
- Section 12(1)(d)-(e) of the Constitution of the Republic of South Africa, 1996`,

  equality: `South African equality jurisprudence is among the most progressive globally, rooted in section 9 of the Constitution which guarantees the right to equality and prohibits unfair discrimination.

The foundational case is **Harksen v Lane NO 1998 (1) SA 300 (CC)**, which established the two-stage test for unfair discrimination: (1) does the provision differentiate between people? (2) if so, does it amount to unfair discrimination? The Court held that discrimination is unfair if it impairs the fundamental dignity of persons as human beings, or affects them adversely in a comparably serious manner.

In **Minister of Home Affairs v Fourie 2006 (1) SA 524 (CC)**, the Constitutional Court extended the common-law definition of marriage to include same-sex couples, holding that the exclusion constituted unfair discrimination on the grounds of sexual orientation. Sachs J delivered the unanimous judgment, declaring that "the exclusion of same-sex couples from the benefits and responsibilities of marriage is not a small and tangential inconvenience... it represents a harsh statement by the law that same-sex couples are outsiders."

The Promotion of Equality and Prevention of Unfair Discrimination Act 4 of 2000 (PEPUDA) gives legislative effect to section 9, creating equality courts with jurisdiction to hear discrimination complaints.

**Key citations:**
- [Harksen v Lane NO 1998 (1) SA 300 (CC)](http://www.saflii.org/za/cases/ZACC/1997/12.html)
- [Minister of Home Affairs v Fourie 2006 (1) SA 524 (CC)](http://www.saflii.org/za/cases/ZACC/2005/19.html)
- Promotion of Equality and Prevention of Unfair Discrimination Act 4 of 2000`,

  negligence: `The law of delictual liability for negligence in South Africa underwent a significant transformation following the Constitutional Court's decision in **Carmichele v Minister of Safety and Security 2001 (4) SA 938 (CC)**.

In *Carmichele*, the applicant was brutally attacked by a person who had been released on bail despite a history of sexual violence. The Constitutional Court held that the common law of delict must be developed in accordance with the spirit, purport, and objects of the Bill of Rights. Ackermann J and Goldstone J (writing for the majority) stated that "where the common law deviates from the spirit, purport and objects of the Bill of Rights, the courts have an obligation to develop it."

This case established that the state owes a positive duty to protect individuals from violence, particularly gender-based violence, and that a negligent failure to fulfil this duty can ground delictual liability. The *boni mores* or legal convictions of the community must now be informed by constitutional values.

The subsequent case of **K v Minister of Safety and Security 2005 (6) SA 419 (CC)** extended this principle, holding the state vicariously liable for the rape of a woman by off-duty police officers who had offered her a lift home.

**Key citations:**
- [Carmichele v Minister of Safety and Security 2001 (4) SA 938 (CC)](http://www.saflii.org/za/cases/ZACC/2001/22.html)
- [K v Minister of Safety and Security 2005 (6) SA 419 (CC)](http://www.saflii.org/za/cases/ZACC/2005/8.html)
- Section 7(2) of the Constitution (state duty to protect rights)`,

  default: `This is an important area of South African law that has been shaped by several Constitutional Court decisions.

The Constitution of the Republic of South Africa, 1996, is the supreme law of the land. Section 2 provides that "law or conduct inconsistent with it is invalid, and the obligations imposed by it must be fulfilled." The Constitutional Court, established under Chapter 8, is the highest court in all constitutional matters.

South African courts follow a rich tradition of purposive constitutional interpretation, as established in **S v Zuma 1995 (2) SA 642 (CC)**, where Kentridge AJ held that the Constitution must be construed "generously" and "purposively" to give expression to the underlying values of human rights, democracy, and open and accountable governance.

In **Investigating Directorate: Serious Economic Offences v Hyundai Motor Distributors 2001 (1) SA 545 (CC)**, the Court reaffirmed that all legislation must be interpreted through the prism of the Bill of Rights, and that courts must prefer interpretations that promote the spirit, purport, and objects of the Constitution.

I recommend consulting the following resources for a more detailed analysis of your specific query:
- The South African Legal Information Institute (SAFLII): [www.saflii.org](http://www.saflii.org)
- Juta's Statutes and Case Law databases
- Butterworths/LexisNexis South Africa

**Key citations:**
- [S v Zuma 1995 (2) SA 642 (CC)](http://www.saflii.org/za/cases/ZACC/1995/1.html)
- [Investigating Directorate v Hyundai 2001 (1) SA 545 (CC)](http://www.saflii.org/za/cases/ZACC/2000/12.html)
- Constitution of the Republic of South Africa, 1996`,
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("death") || lower.includes("penalty") || lower.includes("makwanyane") || lower.includes("capital punishment"))
    return mockResponses.death_penalty;
  if (lower.includes("equal") || lower.includes("discrim") || lower.includes("fourie") || lower.includes("marriage") || lower.includes("same-sex") || lower.includes("lgb"))
    return mockResponses.equality;
  if (lower.includes("negligen") || lower.includes("carmichele") || lower.includes("delict") || lower.includes("liability") || lower.includes("duty of care"))
    return mockResponses.negligence;
  return mockResponses.default;
}

const followUps: Record<string, string[]> = {
  death_penalty: [
    "How does SA's position compare to other African nations?",
    "What was the political context of the Makwanyane decision?",
    "Has there been any attempt to reinstate the death penalty?",
  ],
  equality: [
    "How does PEPUDA work in practice?",
    "What are the listed grounds of discrimination under section 9(3)?",
    "How have equality courts functioned since their establishment?",
  ],
  negligence: [
    "How has vicarious liability evolved since Carmichele?",
    "What is the current test for wrongfulness in delict?",
    "How does the state's duty to protect apply to GBV cases?",
  ],
  default: [
    "What are the most important Constitutional Court cases?",
    "How does the Bill of Rights apply to private disputes?",
    "What is the role of ubuntu in South African law?",
  ],
};

function getCategory(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("death") || lower.includes("penalty") || lower.includes("makwanyane")) return "death_penalty";
  if (lower.includes("equal") || lower.includes("discrim") || lower.includes("fourie") || lower.includes("marriage")) return "equality";
  if (lower.includes("negligen") || lower.includes("carmichele") || lower.includes("delict")) return "negligence";
  return "default";
}

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  const response = getResponse(message);
  const category = getCategory(message);
  const suggestions = followUps[category];

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send response in chunks for typewriter effect
      const words = response.split(" ");
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "text", content: chunk })}\n\n`));
        await new Promise((r) => setTimeout(r, 15 + Math.random() * 25));
      }
      // Send follow-up suggestions
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "suggestions", content: suggestions })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
