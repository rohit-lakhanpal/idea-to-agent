# Stage 4 — Assurance tier and release gate

*[← Stage 3](04-stage-3-eight-questions.md) · [Stage 5 →](06-stage-5-technology-direction.md)*

> **CAF source:** [Govern and secure AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization) · [Responsible AI policies](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/responsible-ai-policies)

---

**Consequence alone is not enough, and neither is reach.**

A wrong policy answer given to one person is an irritation. The same wrong answer given to five thousand people and later quoted in an audit is a systemic failure. Same technology, completely different bar.

## The matrix

**Q8a consequence × Q3 intended reach:**

| Consequence \ Reach | 1–2 Me / My team | 3 Function | 4–5 Enterprise / External |
| --- | --- | --- | --- |
| **Real-world effect** | Controlled pilot | Full assurance | Full assurance |
| **Writes to a system** | Owner approves | Controlled pilot | Full assurance |
| **Read only** | **Light touch** | Owner approves | Controlled pilot |

Read one cell out loud to see why both axes are needed. *Read only × my team* is the bottom-left corner: if it gets something wrong, one person reads a wrong answer and a colleague corrects them. That genuinely does not need a governance forum. Move the **same read-only system** to the top-right — five thousand people, external — and it is now quoted in emails, screenshotted, and eventually cited back to you in an audit. Nothing about the technology changed. The bar has to.

Then two adjustments, in order:

1. **Apply Q8b.** If a silent failure affects a person, **move up one tier**.
2. **Apply Q5.** **Regulated data never sits below Controlled pilot**, whatever the reach. A read-only clinical assistant used by one person is not a Light touch item.

Both adjustments only ever move *up*. There is no combination of answers that talks you down a tier.

## The four tiers

| Tier | What it means |
| --- | --- |
| **Light touch** | Ship it. Standard guardrails only. |
| **Owner approves** | Named owner signs off. Spot-checked, not gated. |
| **Controlled pilot** | Measured pilot, defined success criteria, a decision gate. |
| **Full assurance** | Evaluations, human in the loop, monitoring, a route to a person. |

> **Governance that is silent where risk is low is what buys you credibility when you need to be strict.**
>
> If a personal read-only assistant has to clear the same bar as a customer-facing system, nothing ships and people go back to consumer tools on their own devices. A governance process that blocks everything equally has not reduced risk — it has moved it somewhere you cannot see.

## The baseline that applies at every tier

CAF's control-plane obligations are **not** tier-dependent. All of these apply to a tier-1 personal assistant:

- **Registry entry.** You cannot govern agents you do not know exist.
- **One identity per agent**, so every action is attributable.
- **A named owner**, and an answer to what happens when they leave.
- **A cost tag**, so token and compute spend can be allocated by department.
- **Observability**, so drift and emerging risk are visible.
- **Disclosure.** Disclose AI involvement clearly in the interface.

## The release gate

**No agent moves forward without passing.** Six checks, three tests behind each. The purpose is to turn governance policy into **evidence that can be checked**.

| Check | Test 1 | Test 2 | Test 3 |
| --- | --- | --- | --- |
| **1. Accountable** | Named business owner | Named technical owner | Intended users and purpose recorded |
| **2. Identifiable** | Entered in the organisational registry | One distinct identity | Ownership and lifecycle status visible |
| **3. Constrained** | Only required data and tools allowed | User-delegated or service identity explicitly chosen | External connections approved |
| **4. Tested** | Success and failure criteria defined | Security and adversarial testing completed | Human intervention defined where required |
| **5. Observable** | Activity, quality, access and cost monitored | Logs retained according to policy | Alerts routed to the right operational team |
| **6. Recoverable** | Kill switch or disable path | Incident owner and escalation path | Rollback, evidence preservation and review |

## Is your human in the loop real?

Every programme claims one. Few have one.

| Real | Theatre |
| --- | --- |
| A specific condition triggers review, not *"sometimes"* | Everything gets flagged, so reviewers stopped reading |
| The reviewer sees the reasoning | The reviewer only sees the final output |
| Rejecting has actually been exercised | Nobody has ever clicked reject |
| The decision and its reason are logged | No record of who approved what |

> **If your control has never once said no, it may not be a control.**

The right-hand column is uncomfortable because most people in the room will recognise a process they currently run. The second row is the one worth dwelling on: a reviewer shown only the *output* can check whether it reads plausibly, which is not the same as checking whether it is right. If the agent produces a confident, well-written, wrong answer, output-only review passes it every time.

This is worth reading out in a governance conversation and then not saying anything for a few seconds.

### The cost nobody books

A human control is **recurring cost**. It repeats every single time the process runs, forever. That is a Stage 2 value-equation term, and it is the one most often left out of a business case that otherwise looks compelling.

Do the arithmetic once: if the control is *"a clinician reviews every flagged note"*, and 20% get flagged, and review takes four minutes, then at 500 notes a day that is **six and a half clinician hours a day, permanently**. Against a benefit measured in care-worker hours saved, that may still be strongly positive — or it may quietly invert the whole business case.

**Either answer is fine. Not knowing which is not.** And Stage 4 is much the cheaper place to find out.

## Worked example

| | **UC-01** Policy assistant | **UC-02** Clinical visit scribe |
| --- | --- | --- |
| Q8a consequence | Read only | Writes to a system |
| Q3 intended reach | 2 My team | 4 Enterprise |
| **Base tier from matrix** | Light touch | Full assurance |
| Q8b lift | 0 | +1 |
| Q5 floor | 1 | 3 (regulated) |
| **Final tier** | **Light touch** | **Full assurance** |
| Release gate | **Passed** | **Blocked** — tested and observable not met |
| Reject ever exercised? | Yes | No |

UC-02 is already at the ceiling from the matrix alone, so the Q8b lift and the Q5 floor do not change the outcome — but both are recorded, because if the reach were later reduced to a single team, the floor is what stops it dropping to Light touch.

## In the workbook

**Assurance and gate** sheet. Columns C–J show the working — base tier, Q8b lift, Q5 floor, base ordinal, final ordinal — so the tier is never a black box and can be argued with.

Columns P–U are the six gate checks. The gate status calculates: any *Not met* gives **Blocked**; all six *Met* gives **Passed**; anything unanswered gives **Incomplete**.

Columns X–AB are the control-plane baseline, which applies regardless of tier.

---

*Next: [Stage 5 — Technology direction](06-stage-5-technology-direction.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
