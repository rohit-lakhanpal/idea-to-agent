# Stage 2 — The outcome contract

*[← Stage 1](02-stage-1-is-this-ai.md) · [Stage 3 →](04-stage-3-eight-questions.md)*

> **CAF source:** [Define success metrics](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan) · [Define the agent charter](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/build-secure-process)

---

**Five things, all before anyone opens a product page.**

CAF is explicit that these come *before* development begins. In practice they are the stage most often skipped, and skipping them is what makes a build unfalsifiable — there is no number it has to move, so it can never be shown to have failed, and it can never be shown to have worked either.

## 1. The result

**Stated as an outcome with a number, not a feature.**

> *"Fewer escalations reach HR"* is an outcome.
> *"A chatbot"* is not.

Record today's baseline where the process already exists; estimate and refine where it does not. A result without a baseline is an aspiration.

**Worked example (UC-01):** *"Cut policy questions reaching the HR inbox from 240 a month to under 100, within one quarter of release."* Metric, baseline, target, timeframe. You can tell whether that happened.

## 2. The owner

**One accountable name for the build, and one for after go-live.** Not a steering committee.

Someone who can say *"it is working"* — or pull it back.

The two are often different people, and the second one matters more. A build owner sees it through launch; a run owner carries it for years. Leaving the second blank is the single most common gap on a real list, and it is a *decision* gap rather than an information gap. Nobody has agreed to carry it yet.

> **The cheapest prioritisation signal available.** A use case nobody will nominate an owner for is a use case nobody is accountable for. That is worth knowing before you cost it, not after.

## 3. The boundary

**What this explicitly will *not* do, decided before the build starts.**

This becomes the **agent charter**: system responsibilities, agent roles, and prohibited actions. Without it, agents evolve beyond their intended scope — not through malice, but because each individual extension sounds reasonable.

**Worked example (UC-01):** *"Will not interpret an individual employment contract, will not comment on a live grievance, and will not answer anything the policy library does not cover. Says so and names the person to ask."*

Note the last clause. A good boundary says what happens *instead*, otherwise the refusal is just a dead end.

## 4. The decision gates

CAF: *use business metrics as decision gates at each stage, and make go or no-go choices based on the data, not optimism.*

Name the gate at **prototype**, at **pilot** and at **release** — now, not when you get there. A gate written after you have seen the results is not a gate.

| Gate | A good one looks like |
| --- | --- |
| Prototype | *"Answers 20 seeded questions with the correct source document cited."* |
| Pilot | *"30 staff over 4 weeks. At least 70 per cent rate the answer useful, and no incorrect citation."* |
| Release | *"Inbox volume down 30 per cent, and the monthly spot check clean two months running."* |

## 5. The value baseline

Six measurements of the process **as it runs today**.

### Why here, and not later

Every one of these is a fact about the *current* process. **None of them mentions AI, a platform or a price.** They can all be answered before a single technology conversation, and they stay true whichever direction you eventually take.

Capture them once, here, and a cost-benefit becomes possible later **if anyone asks for one**. Skip them and you will be reconstructing them under pressure, in front of a finance stakeholder, with the build already chosen.

| # | Capture | Why it matters later |
| --- | --- | --- |
| **V1** | How many people do this work today? | The population term in any benefit calculation |
| **V2** | How often does it happen? | The frequency term. Also the single best predictor of whether an idea is worth doing at all |
| **V3** | How long does it take each time? | Converts volume into hours |
| **V4** | How often does it go wrong today, and what does that cost? | The most commonly omitted benefit, and often the largest. Rework, escalation, delay, a complaint |
| **V5** | What is the metric, and what is it today? | Without a starting number there is no way to prove improvement |
| **V6** | What happens to the time that is saved? | The question finance will ask. Hours nobody can point to as redeployed capacity are a slide, not a benefit |

Filled in, for the policy assistant, they look like this:

> **V1** 480 staff · **V2** 6 times a year each · **V3** 12 minutes · **V4** wrong 8% of the time, costing ~$35 to put right · **V5** 240 questions a month reaching the inbox today · **V6** two advisers move off inbox triage onto the case backlog

That is **576 hours a year** in the process, and about **$8,000 a year** in getting it wrong. Neither number required a decision about technology, and both stay true whichever direction you take.

**V4 and V6 earn their place on their own.** V4 is the benefit everyone forgets and is frequently the biggest — notice it is a *third* the size of the time benefit here, and it would have been invisible. V6 is the one finance always asks and teams rarely answer: *"we'll save 576 hours"* means nothing until somebody says what those hours become.

### Classify the benefit, hard or soft

Not all value is time saved. In care, clinical and frontline settings, time saved is frequently the *least* important benefit available.

| Benefit type | Typically | Example |
| --- | --- | --- |
| Time or cost released | Hard | Hours returned to a team |
| Error and rework reduction | Hard | Fewer corrections, fewer escalations |
| Speed and responsiveness | Hard or soft | Days to hours in a process |
| Risk and compliance avoided | Soft, sometimes very large | Audit readiness, a missed obligation avoided |
| Capacity redirected to the mission | Soft | More time with clients rather than fewer staff |
| Experience and retention | Soft | Reduced administrative burden on frontline staff |

> A business case built **only** on soft benefits will be challenged. A business case that **ignores** soft benefits will undersell the work. Name both, mark which is which, and let the reader weigh them.

## The framework assembles the numbers. It does not price them.

Nobody costs a use case at a single moment. **Each stage contributes one term**, and by the time you reach the technology decision you are holding everything except the rate card:

| Stage | Contributes |
| --- | --- |
| **Stage 2** | The benefit — volume, frequency, duration, error cost, benefit type |
| **Stage 4** | The recurring cost of the human control, which repeats every time the process runs |
| **Stage 5** | Build and integration effort, and whether the connection exists yet |
| **Stage 6** | Evaluation effort, and its cadence |
| **Stage 7** | Run, monitor, re-evaluate, retire |

The only thing deliberately missing is **price**, because rates, licences, discounts and entitlements are customer-specific and move quarterly. Put them in the framework and it is wrong within a quarter, in front of a customer.

### The value equation

Most AI business cases are written as pure upside. That is half an equation.

> **Value = benefit to the outcome − (review time + integration + support + evaluation + change management)**

- **Review** is the Stage 4 human-control time, and it recurs *every time the process runs*
- **Integration** is Stage 5 — connecting safely, and keeping the connection alive
- **Support** is whoever answers when someone says the agent got it wrong
- **Evaluation** is a schedule, not a launch-day event
- **Change management** includes actually retiring the workaround. Skip it and the old process quietly survives alongside the new one

A business case showing only the left-hand side has not been finished.

## Checklist

- [ ] Which number moves, and what is it today
- [ ] Who signs the go or no-go, by name — for build *and* for run
- [ ] What the system must refuse to do, even when asked
- [ ] Gate criteria written for prototype, pilot and release
- [ ] All six value baseline measurements captured, or explicitly marked unknown
- [ ] Benefit type named, and marked hard or soft
- [ ] An answer to what happens to the capacity released

## A practical note on blanks

On a real list, the value baseline cells are usually the emptiest in the whole workbook, and **only the customer can fill them**.

That is not a failure of analysis. A named, specific list of what is missing is a more useful deliverable than a set of confident guesses, and it is the fastest way to find out which ideas anybody actually cares about.

**The rows that come back filled in are the rows with a real owner.**

## In the workbook

**Outcome contract** sheet. Columns C–L are the five contract items; M–U are the value baseline. Three calculated columns show annual hours in the process today, the annual cost of getting it wrong, and what percentage of the baseline you have captured.

The **Answers out** sheet turns every blank here into a named line item in *"Additional information required from the customer"*.

---

*Next: [Stage 3 — The eight questions](04-stage-3-eight-questions.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
