# Appendix D — Sources

*[← Appendix C](appendix-c-facilitation.md) · [Back to the guide](../README.md)*

---

## What is Microsoft's and what is this framework's

Worth stating plainly, because governance teams will ask.

### Microsoft's published guidance

All of the following are from the Cloud Adoption Framework or Microsoft Responsible AI, and are linked at the relevant stage:

- The **four phases** — plan, govern and secure, build, manage
- The **definition of an agent**, and the input taxonomy (system events, user messages, other agent messages) that Q1's answer list comes from
- **When not to use AI agents**, including the exit to non-generative options before reaching an agent platform
- That **governance obligation changes with scope**, and that public-facing agents must not access internal business data
- That **every agent needs a distinct identity** so actions are attributable
- The **data governance requirements** — isolate confidential data, apply DLP and sensitivity labels, mandate residency, define retention
- **Retrieval strategy** — built-in tools for governed content, tool calls for real-time data and actions; prefer built-in before custom
- That **agents should sit in the tools people already use**, because context switching reduces adoption
- **Human-in-the-loop confirmation** for high-impact actions, and sign-off for consequential decisions
- That **adversarial testing is mandatory**, not optional
- The **platform comparison**, including that low-code supports autonomous agents
- The **three multi-agent criteria**, and the trade-offs of choosing it prematurely
- **Success metrics before development**, and business metrics as decision gates
- The **nine scoring sub-criteria** across business impact, technical feasibility and user desirability
- The **organisational readiness model** — platform team, workload teams, centre of excellence
- The **operate obligations** — estate audits, consumption review, continuous compliance

### This framework's packaging

Ours, and clearly marked as such:

- **The eight questions as a set**, and the discipline that each must settle exactly one decision
- **The five reach rungs** (CAF says obligation changes with scope; the rungs are our granularity)
- **The assurance matrix** — consequence × reach, with the Q8b lift and the Q5 floor
- **Q8b, the omission test.** CAF does not phrase silent failure as a question. It is our derivation from the reliability and safety pillar
- **Q7 as a customer-answerable binary.** CAF asks you to assess technology fit; making it *"does the connection exist — yes, partly, no"* is ours
- **The eight verbs and the verb card**, including Monitor as the only machine-initiated verb
- **The loop/location axis** — how much of the loop you stay in, and where the work happens
- **The value baseline** — six technology-neutral measurements, and the rule that the framework assembles terms but never carries prices
- **The quick-win definition** as a conjunction of six testable conditions
- **The stage-by-stage cost assembly**, one term per stage

### Why the distinction matters

If you present this to a risk or audit function, they will want to know which parts are vendor guidance they can look up and which parts are a consultant's opinion. **Being able to answer that cleanly is what makes the opinionated parts credible.**

---

## Cloud Adoption Framework sources, by stage

| Stage | Page |
| --- | --- |
| Overall | [AI agents in the Cloud Adoption Framework](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/) |
| Stages 0, 1 and scoring | [Business plan for AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan) |
| Stages 2 and 6 | [Build and secure the process](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/build-secure-process) |
| Stage 3 — technology | [Technology plan](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) |
| Stage 3 — data | [Data architecture plan](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/data-architecture-plan) |
| Stage 4 | [Govern and secure AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization) |
| Stage 4 | [Responsible AI policies](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/responsible-ai-policies) |
| Stage 5 | [Single agent or multiple agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents) |
| Stage 7 | [Integrate, manage and operate](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/integrate-manage-operate) |
| Across every stage | [Organisational readiness](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organization-people-readiness-plan) |

---

## Version history

**v5** is the current version. It exists because earlier versions had two distinct problems worth recording, since both are easy to repeat.

### v1–v3 — the classifier

Built the right instrument: a gate plus a set of questions that, once answered, determine the technology without anyone naming a product. Its defining property is that **it runs over a list** — which is what makes it useful, because a list is what customers actually have.

Running it over a real list of sixteen initiatives exposed six defects:

| # | Defect | Fix |
| --- | --- | --- |
| 1 | **No route for predictive work.** Forecasting is statistical prediction, not generative AI, and was being sent to "automation platform" | Added the predictive branch at Stage 1 |
| 2 | **Direction ignored the assurance tier** for anything not classified as an agent, so rows rated Full assurance were still described as "a flow with an AI action" | **Read assurance before category** at Stage 5 |
| 3 | **Consequence measured the wrong failure** for notification use cases — the risk is a *missing* alert, not a wrong one | Added **Q8b**, and the rule that a silent failure affecting a person lifts the tier |
| 4 | **One row could not hold an interim and a target** solution | Added phasing with a shared ID |
| 5 | **Integration effort was invisible.** Nothing asked whether the connection existed | Added **Q7** |
| 6 | **The source list was unreliable** — duplicates and gaps | Made deduplication an explicit Stage 0 step |

### v4 — the narrative

Replaced the classifier with six phases carried through a single worked example. Three things went wrong:

1. **It threw away the instrument.** You cannot run six narrative phases over seventeen spreadsheet rows, so the one artefact customers actually ask for stopped being producible.
2. **It abandoned the evidence base.** A real list with real stress-test findings was replaced with an invented example.
3. **The phases were a restatement, not a decision.** Nothing in them forced a choice.

But v4 contributed three genuinely good things, all kept in v5:

- **The outcome contract** — result, owner, boundary, before anyone opens a product page
- **The real human-in-the-loop test** — *"if your control has never once said no, it may not be a control"*
- **The value equation** — benefit minus review, integration, support, evaluation and change management

### v5 — what it is

**v3's classifier, with the six defects fixed, wrapped in the CAF layers both earlier versions missed, and carrying v4's three good ideas.**

Two things were added after the first v5 draft, both because they change answers rather than add detail:

- **Q5, data sensitivity.** The most heavily specified area in CAF and absent from both earlier versions. It is the only question that picks your network topology, and it is answerable only by the customer.
- **The Stage 2 value baseline.** Six technology-neutral measurements, so a cost-benefit is always *possible* and never urgent.

> **The lesson worth keeping.** A framework that has never been run over a real list has not been tested. Every one of the six defects above was invisible in the abstract and obvious the moment it met sixteen real rows.

---

*[Back to the guide](../README.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
