# Stage 0 — Frame the list

*[← Why idea lists stall](00-why-idea-lists-stall.md) · [Stage 1 →](02-stage-1-is-this-ai.md)*

> **CAF source:** [Business plan for AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan)

---

Before anything is classified, the list itself has to be trustworthy. Almost no list arrives that way, and the failures are predictable enough to check for directly.

Three moves, and a scoring pass.

## 1. Split vague labels into jobs

The single highest-value move in the entire framework, and it costs twenty minutes.

*"Build an HR assistant"* is four jobs:

| Job | Reach | Consequence | Owner |
| --- | --- | --- | --- |
| Explain policy | Broad | Read only | HR Operations |
| Retrieve my entitlement | Per user | Read only, personal data | HR Systems |
| Draft and submit a request | Per user | **Writes to a system** | Payroll |
| Route exceptions | Function | Never resolved by the agent | HR Business Partner |

Four risk profiles, four owners, and — critically — four different answers to *"is this even AI?"*

**The test:** a row is properly scoped when it has *one* owner, *one* risk profile and *one* answer to each of the eight questions. If a row needs "it depends" for any of the eight, it is still more than one job.

**The tell:** labels that are a *noun describing a tool* rather than a *verb describing work*.

| Sounds like a thing → splits | Sounds like a job → probably fine |
| --- | --- |
| *"An HR assistant"* | *"Answer policy questions"* |
| *"A knowledge bot"* | *"Summarise incoming complaints"* |
| *"An onboarding portal"* | *"Check a new starter's paperwork is complete"* |

Anything phrased as a **thing** is almost always several jobs wearing one name.

## 2. Deduplicate and complete

Lists assembled by canvassing have two characteristic defects, and both are worth checking mechanically:

- **The same idea appears twice** under different wording, usually because two teams described the same frustration differently.
- **The numbering has gaps** — a list numbered 1 to 17 that contains 16 rows means something was dropped, and what was dropped is often the thing someone demonstrated in a meeting and never wrote down.

Confirm both with the customer rather than silently patching. *"Rows 12 and 15 look like the same job — are they?"* is a cheap question that also tells you who actually owns each one.

## 3. Allow phasing

A use case may have a legitimate interim answer *and* a legitimate target answer, and they can be wildly different pieces of work.

Take *"help us cover shifts when someone calls in sick"*:

- **a** — a spreadsheet of who is available and qualified, with an assistant that drafts the callout messages. **Two weeks. Light touch.**
- **b** — an agent watching the rostering system that proposes and books replacements automatically. **Multi-month integration. Controlled pilot.**

Forced into one row, the answer is either understated (you cost the interim and promise the target) or overstated (you cost the target and lose the quick win that would have shipped this month).

**Split it.** Share the ID, add a phase: `UC-06a` and `UC-06b`. Score, approve and cost each phase separately. The workbook has a `Phase` column for exactly this.

> Phasing is also the honest way to handle *"can't we just do a simple version first?"* — a question that is usually right, and which the framework should be able to answer with a row rather than a shrug.

## 4. Score the four lenses

Once the list is trustworthy, score each row on four lenses. This is the Cloud Adoption Framework's business-plan framing:

| Lens | The question | Source |
| --- | --- | --- |
| **Desirability** | Do the users actually want this, and will they change how they work? | CAF user desirability axis |
| **Feasibility** | Can we build it with what we have, and can we name the risks? | CAF technical feasibility axis |
| **Viability** | Does it support the strategy, and is the value real? | CAF business impact axis |
| **Responsibility** | Can we do this *responsibly* — safeguards, consent, disclosure, fairness? | Not in CAF's nine sub-criteria |

The first three decompose into CAF's nine sub-criteria (three each) and are scored on the workbook's **Scoring** sheet. **Responsibility is scored directly**, because none of CAF's nine sub-criteria covers it, and on a list containing anything clinical, financial or personal it is the lens that most often changes the answer.

> **A gap worth knowing about.** None of CAF's nine sub-criteria is *cost*. Business value measures benefit, not what the benefit costs to obtain, so two ideas can both score 12 out of 15 and be wildly different propositions. **CAF scores desirability. It does not score affordability.** The [Stage 2 value baseline](03-stage-2-outcome-contract.md#the-value-baseline) is what lets you separate them.

## Checklist

- [ ] Every label decomposed into jobs that each have one owner and one risk profile
- [ ] Duplicates removed and gaps confirmed with the customer, not silently patched
- [ ] Phased items split with a shared ID and a phase marker
- [ ] All four lenses scored, or explicitly marked as unknown
- [ ] Every row phrased as a job, not as a tool

## In the workbook

**Register** sheet, columns A–N. The four lenses pull from the **Scoring** sheet and are rescaled to 1–5 so they carry equal weight; Responsibility is typed directly. The Stage 0 total is out of 20.

---

*Next: [Stage 1 — Is this AI at all?](02-stage-1-is-this-ai.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
