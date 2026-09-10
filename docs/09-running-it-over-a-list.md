# Running it over a list

*[← Stage 7](08-stage-7-operate.md) · [Appendix A →](appendix-a-verb-card.md)*

---

**The point of a classifier is that it scales.**

A narrative works for one use case. It does not work for seventeen, and seventeen is what actually lands on your desk.

The order below matters, because **each step is cheaper than the next**. Do them out of order and you will do detailed analysis on rows that a thirty-second filter would have removed.

Here is the shape of it on a hypothetical list of seventeen:

```
17 ideas on the list
 └─ 1. Sort by reach            →  9 are tier 1-2. Ship with light guardrails.
     └─ 8 need real attention
         └─ 2. Qualify out non-agents  →  3 are automation, predictive or retrieval.
             └─ 5 remain                  Faster to build, no AI governance.
                 └─ 3. Flag integration-led  →  2 have no connection today.
                     └─ 3 to score properly     Programme work, not quick wins.
```

**A frightening backlog becomes an afternoon of work plus three real conversations.** The numbers will differ on your list, but the shape rarely does.

## 1. Sort by reach

**The cheapest possible filter.**

Tier 1 and 2 release immediately with light guardrails. Only tier 3 and above need real attention, and that is usually a small fraction of the list.

A frightening backlog becomes an afternoon of work.

## 2. Qualify out the non-agents

Run [Stage 1](02-stage-1-is-this-ai.md) across everything that survived step 1.

Automation, predictive and retrieval rows leave here. **They ship faster anyway, and they carry no AI governance burden.** Expect a surprising share of any list to leave at this step — and expect at least one of them to be the highest-value row on the sheet.

## 3. Flag the integration-led rows

**Q7.** Anything where the connection does not exist is programme work, not a quick win, regardless of how simple the AI part looks.

Mark them, set the expectation in months, and take the integration conversation to whoever owns those systems. **Do not let them sit in the same bucket as configure-and-go rows** — that single misclassification is where credibility goes.

## 4. Score what remains

Only now is detailed scoring worth the time. CAF's model: 1 to 5 on three axes, nine sub-criteria.

| Business impact | Technical feasibility | User desirability |
| --- | --- | --- |
| Executive strategy alignment | Implementation and operation risks | Key personas understood |
| Business value (the four value areas) | Sufficient safeguards | Value proposition to the user |
| Change management timeframe | Technology fit with existing systems | Change resistance |

CAF's best practices attached to these:

- If a use case does not support strategy, **pause it early**
- If you cannot name the risks, you cannot manage them
- **Never advance a use case with unclear safeguards**
- Choose early use cases with **motivated users**

> **A gap worth knowing about.** None of CAF's nine sub-criteria is **cost**. Business value measures benefit, not what the benefit costs to obtain, so two ideas can both score 12 out of 15 and be wildly different propositions.
>
> **CAF scores desirability. It does not score affordability.** The [Stage 2 value baseline](03-stage-2-outcome-contract.md#the-value-baseline) is what lets you separate them, without turning this framework into a pricing tool.

## 5. Make promotion an event

Crossing a reach tier **triggers reassessment with a named approver**.

Nothing gets promoted to enterprise scale purely because it became popular. This is the control that stops a successful tier-2 pilot quietly becoming an ungoverned tier-4 dependency, which is the most common way an organisation ends up with a system it cannot explain to an auditor.

---

## What comes out the other end

Eight columns, and every one is an output of a stage rather than an opinion:

| Column | Produced by |
| --- | --- |
| **Quick win / feasibility** | Stage 1 category + Stage 4 tier + Q7 connection flag |
| **Tools required** | Stage 5 direction, in the order of preference, constrained by Q5 |
| **Skills / roles required** | Stage 5 + readiness — platform team, workload team, or CoE |
| **Development cost** | Stage 5 direction + Q7 + phasing |
| **Operations cost** | Stage 4 recurring review time + Stage 7 monitoring + licences |
| **Time estimate** | Q6 freshness + Q7 connection + Stage 4 tier |
| **Support required** | Stage 6 prototype support + readiness + Stage 5 |
| **Information still required** | Every blank Stage 2 and Stage 3 cell |

### A quick win, defined precisely

Rather than "it sounds easy":

> Not an agent · reach tier 1–2 · read only · public or internal data · nothing or static documents as the source · **and** the connection already exists in production.

Any single failure disqualifies it — and the workbook names **the first failing test**, so the conversation is about a specific reason rather than a vibe.

That precision is what makes the term survive contact with a steering committee. *"It's not a quick win"* invites an argument. *"It's not a quick win because there's no write API to that system today"* invites a different, more useful conversation — usually with the person who owns that system.

### The last column is the most valuable

**The blanks are not gaps in your analysis. They are the customer's half of the contract.**

Naming them precisely is more useful than filling them with assumptions, and it has a useful second property: **the rows that come back filled in are the rows with a real owner.** A use case nobody will spend twenty minutes measuring is a use case nobody is accountable for.

That is the cheapest prioritisation signal available and it costs nothing to collect.

---

## Organisational readiness

Running across every stage, and it answers the *skills and roles* column directly.

| Who | Owns |
| --- | --- |
| **Platform team** | The technical foundation and the guardrails. Audits and enforces governance standards. Prepares the environment. |
| **Workload teams** | End-to-end lifecycle of specific agents. Business requirements, domain data, integration into the process. They inherit the platform's controls. |
| **AI Centre of Excellence** | Advisory. Prevents fragmented adoption, embeds responsible AI into policy, provides expert guidance, leads training. |

**Skill areas to build:** prompt engineering · agent optimisation and evaluation · AI ethics and governance · data engineering for AI · AI security (prompt injection, jailbreak).

**Change management is not an afterthought.** Communicate early about what agents can and cannot do. Leadership has to reinforce that this is a priority, or managers treat it as optional.

---

*Next: [Appendix A — The verb card](appendix-a-verb-card.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
