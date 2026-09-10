# Stage 7 — Operate

*[← Stage 6](07-stage-6-prove-it.md) · [Running it over a list →](09-running-it-over-a-list.md)*

> **CAF source:** [Integrate, manage and operate AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/integrate-manage-operate)

---

**Released is a milestone, not a finish line.**

Four obligations that start at release and do not stop, plus four estate-level obligations that operate across the whole portfolio rather than per agent.

## 1. Monitor the outcome measure, not uptime

**Uptime tells you the lights are on. It does not tell you the number from Stage 2 actually moved.**

This is the single most common Stage 7 failure, and it happens for an understandable reason: monitoring gets built by whoever builds the system, so it monitors what systems people know how to monitor. Availability. Latency. Error rates. Token spend. All genuinely useful, and **none of them can tell you the thing is working.**

An agent can be up 99.99% of the time, answering in 400ms, with no errors logged — while the inbox it was built to relieve receives exactly as many questions as it did before. Every dashboard is green. Nothing happened.

The Stage 2 metric was chosen precisely because it answers that. Put it on the same dashboard as the green lights.

**Worked example (UC-01):** baseline was 240 policy questions a month reaching the inbox. Current value one week after release: **186**. That is the number that matters, and it is a business number, not a systems one.

## 2. Re-run the evaluation on a schedule

**And after any material change.**

A system that passed in March has told you nothing about April. Models change underneath you, data drifts, the source content gets restructured, and the population of users broadens.

Set a cadence at release. Monthly for anything at Full assurance; quarterly is usually enough at lower tiers. Then treat any material change — a model swap, a new data source, a scope extension — as a trigger regardless of where you are in the cycle.

## 3. Keep the human control staffed

**Not just designed.**

Controls decay quietly. The reviewer changes role, the queue stops being watched, the alerts route to a distribution list nobody reads any more. Nothing breaks visibly, because a control that is not running looks exactly like a control that is running and finding no problems.

**A control with nobody watching it is a diagram.** Name the person, not the team, and re-check when they move.

## 4. Name the back-to-design triggers in advance

Decide what sends this back to design **before** you need it, not while arguing about an incident.

Typical triggers:

- A near miss
- A change in reach tier — it grew beyond the group it was designed for
- A new data source, especially one at a higher sensitivity class
- A policy or regulatory change
- Any failure of the Q8b kind — it silently did nothing and somebody noticed late

This matters most for governance stakeholders, and it is a much easier conversation in the calm than in the aftermath.

## The estate-level obligations

These operate across the portfolio, not per agent, and they are the ones that get skipped because nobody owns "all the agents".

| Obligation | Cadence | Why |
| --- | --- | --- |
| **Estate audit** | Quarterly | Retire agents that are deployed but unused. **Dormant agents consume quota and expand the attack surface.** |
| **Consumption review** | Monthly | Find agents using premium models for simple tasks |
| **Continuous compliance** | Automated | Scan for configuration drift. Route agent security alerts into the SOC and treat jailbreak attempts with the same urgency as any other threat. |
| **Availability alignment** | At release | Not every agent needs redundancy. Match availability to criticality. |

> The estate audit is the one that pays for itself fastest. Every organisation that has been doing this for eighteen months has agents nobody uses, still holding credentials and still consuming quota.

## The Q8b obligation survives the Stage 1 gate

Worth stating explicitly, because it is easy to lose.

If a row was classified as **automation** at Stage 1 — not AI, no AI governance — but its Q8b answer was *"a person is affected"*, then the silent-failure risk did not go away. A scheduled flow that quietly stops still means a notification nobody receives.

**Monitoring the monitor is a real requirement**, and it belongs in the Stage 7 obligations for that row even though the row is not an agent and carries no AI governance at all.

## Worked example

| | **UC-01** Policy assistant |
| --- | --- |
| Outcome measure monitored | Policy questions reaching the HR inbox each month |
| Current value | 186 a month *(baseline 240, target <100)* |
| Re-evaluation cadence | Quarterly, and after any policy library restructure |
| Control staffed by | Named individual, HR Systems Lead |
| Back-to-design triggers | A confidently wrong citation reaching a manager · reach moving beyond HR · library restructure · retention policy change |
| Last estate audit | 1 Sep · still in use · **Keep** |
| Consumption | Well inside the seeded allocation |

## In the workbook

**Prove and operate** sheet, columns N–X. The outcome measure pulls automatically from the Stage 2 contract, so what you monitor is what you promised. The estate audit columns drive the quarterly keep-or-retire decision.

---

*Next: [Running it over a list](09-running-it-over-a-list.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
