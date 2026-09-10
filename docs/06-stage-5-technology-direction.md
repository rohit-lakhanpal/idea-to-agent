# Stage 5 — Technology direction

*[← Stage 4](05-stage-4-assurance.md) · [Stage 6 →](07-stage-6-prove-it.md)*

> **CAF source:** [Technology plan](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) · [Single agent or multiple agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents)

---

**Read assurance before category.**

This is the ordering that is easiest to get backwards. Branch on category first and you get rows that are correctly rated *Full assurance* at Stage 4 and then described as *"a flow with an AI action"* at Stage 5. The assurance column says the right thing while the direction column says something trivially small.

> **If the tier is Controlled pilot or Full assurance, the direction escalates regardless of category, and the row must not be described as a simple flow.**

## Level 1 — The order of preference

**Prefer the lowest rung that works.**

| Rung | When | What it looks like |
| --- | --- | --- |
| **1 · Not AI** | Fixed rules, or forecasting and matching | Automation platform · data science / classic ML |
| **2 · Ready-made** | A published agent covers the function | Adopt and configure |
| **3 · Low-code** | Governed connectors, built-in responsible AI | Can call out to stronger models for harder reasoning |
| **4 · Pro-code** | Deep integration, custom logic, mandatory evaluations | Managed runtime, model choice, memory |
| **5 · Infrastructure** | Sovereignty, custom model hosting, bespoke compliance | Full stack control |

### CAF's published comparison

| Platform tier | Approach | Agent types supported | Best for |
| --- | --- | --- | --- |
| Ready-made SaaS agents | Ready-to-use (SaaS) | Retrieval, Task | Personal productivity |
| Low-code | Low/no-code (SaaS) | Retrieval, Task, **Autonomous** | Process transformation |
| Pro-code platform | Pro-code and low/no-code (PaaS) | Retrieval, Task, Autonomous | Strategic transformation |
| GPUs and containers | Pro-code (PaaS or IaaS) | Retrieval, Task, Autonomous | Compliance-sensitive or highly customised |

> **The correction worth making explicitly, because it is a common and expensive mistake.**
>
> **Low-code supports autonomous agents.** Only the ready-made tier is capped at retrieval and task. Teams routinely jump to pro-code to get adaptive behaviour they could have had a rung lower, and they pay for it in build cost and time.

## Level 2 — Select by the verb

CAF's ladder tells you which *rung*. It does not tell you which *option on the rung*, and rungs 2 and 3 now hold several.

**Select by the verb** — what the person actually wants done. That verb is already determined by the Stage 3 answers.

| The verb | Selected by | Lands on |
| --- | --- | --- |
| **Assist** me while I work | Q1 person already working · Q2 inside the tool they have open · Q8a read only | In-flow assistant |
| **Delegate** a whole outcome | Q1 person asks · Q6 act across several surfaces · returns a finished artefact | Tenant-side delegation |
| **Monitor** and tell me when something happens | **Q1 system event or schedule** · Q6 live system state · Q2 no interface | Operations agent |
| **Specialize** a reusable helper | Q1 person asks · Q6 static documents · Q3 team or function · stable scope | Declarative agent / agent builder |
| **Control** the conversation and workflow | Q8a writes to a system · consistency and branching matter · needs analytics | Low-code standard harness |
| **Adapt** to exceptions and changing paths | Reasoning-heavy · multi-tool · document-intensive · the path is not fixed | Low-code agentic harness |
| **Act locally** on my own machine | Q2 local files, shell or browser · Q5 data that should not leave the device | Desktop agent |
| **Build** a product or platform | Q3 tier 4–5 · Q5 regulated · Q8a real-world effect · needs evaluation, tracing, VNet | Pro-code platform |

> **Monitor is the only machine-initiated verb**, and it is the one most often missing from tool comparison charts — because those charts are written from the point of view of a person opening an app. Q1 says four of five triggers are *not* a person asking. Without Monitor, every one of those rows gets forced into a verb that assumes somebody starts it.

See [**Appendix A — the verb card**](appendix-a-verb-card.md) for the workshop version, with the sentence a business owner would actually say and the eight characteristic traps.

## The axis the ladder does not have

CAF's ladder sorts by **how much you build**. But rung 2 alone now contains options that behave nothing like each other, and what separates them is a different question: **how much of the loop do you stay in, and where does the work happen?**

| | You stay in the loop | You leave and come back to a result |
| --- | --- | --- |
| **Work happens in your apps** | In-flow assistant | Tenant-side delegation |
| **Work happens on your machine** | In-app assistance | Desktop agent |
| **Work happens for other people** | Low-code standard | Agentic harness · pro-code platform |

Two of those cells were empty a year ago, which is why the ladder alone no longer selects cleanly.

- **Tenant-side delegation** — you state an outcome; it plans and executes across mail, calendar, chat, files and documents, and returns a finished artefact. The defining property is that it keeps working while your device is closed. Its natural competition is not another agent — it is the human hours currently spent stitching those surfaces together by hand.
- **Desktop agent** — the same delegation, on the machine instead of in the tenant. Local files, shell, browser automation. Selected by the work being *local*: files that never leave the machine, builds and tests, browser tasks against systems with no API. A power-user and developer tool, not a frontline one.

> **The clean distinction, if you only remember one thing.** If the work touches local files, a shell or a browser, it is the desktop. If it touches mail, calendar, chat and documents, it is the tenant.

## Two agents that are not interchangeable

Where a platform offers both a **data agent** and an **operations agent**, the distinction is exactly Q1 — which makes it easy to get right:

| | Data agent | Operations agent |
| --- | --- | --- |
| **Q1 trigger** | A person asks | Continuous — evaluates on a schedule |
| **What it does** | Answers questions over data | Watches for a condition, then recommends and can act |
| **Q2 surface** | Chat | No interface — a message or channel post |
| **Actions** | None. It answers. | Messages a person; can run a job or trigger a flow |

Operations agents typically have three properties that matter, and they are **built in rather than bolted on**: a dedicated agent identity per agent, a real approval step (the action only runs when the recipient approves), and a distinction between *state* and *transition* conditions — *is above* fires continuously while a value stays over a threshold; *crosses above* fires once, at the moment it moves. Choosing wrongly produces either alert fatigue or a missed event, which is the Q8b failure mode in miniature.

> **A Q4 trap worth naming.** Operations agents commonly run in **delegated mode using the creator's permissions**, not the approver's. A recipient with narrow access can approve an action that then executes with the broader access of whoever built it. Record the creator as the identity of record, and re-check when that person changes role.

## Level 3 — Where it runs

Not in CAF's comparison table and not one of the eight questions, but a hard constraint that falls out of **Q2** and **Q5** together. Record it, or you will discover it during a pilot.

| Constraint | Comes from | Rules out |
| --- | --- | --- |
| Must work with no connectivity | Q2 frontline device | Anything cloud-only. Points to on-device or offline-capable |
| Must run while nobody is present | Q1 schedule or system event | Anything needing an interactive session |
| Data must not leave the device or region | Q5 regulated or confidential | Cloud-default configurations. Points to private networking, data location, or local inference |
| Must extend well beyond launch | Q3 intended reach above pilot reach | Low-extensibility options you will outgrow |

The first row is the one that bites hardest, because it is invisible in every demo. A visit scribe demonstrated in an office works perfectly. The same scribe in a client's home with no mobile signal does not work at all — and that is the only place it was ever meant to be used. **No amount of model quality fixes an assumption about connectivity.**

## Single agent or multi-agent

**Start multi-agent only if one of these three is true:**

1. You cross a security or compliance boundary
2. Multiple teams own separate knowledge areas
3. Known future growth beyond three to five distinct functions

Otherwise **test a single agent first**. CAF is explicit that multi-agent is often chosen on untested assumptions, and the trade-offs are concrete rather than theoretical: **latency accumulates at every handoff**, so a four-agent chain feels slower than a single call even when each hop is fast; **each agent re-processes context**, so cost multiplies rather than divides; and every additional agent is another identity, another credential and another point where data moves.

The usual reason teams reach for multi-agent is that the problem *feels* big. That is not one of the three criteria.

## Two more decisions CAF asks for

**Model selection.** Match model capability to task complexity. Smaller models for summarisation and routine work; reserve premium models for complex reasoning. Premium models also carry stricter rate limits that interrupt service at peak — worth testing against your actual peak, not an average.

**The retrieval decision record.** Per data domain, write down how the agent gets its information and why:

> Policy documents: search over a governed index
> Client status: tool call to the record system
> Create a case: tool call, write scope, human approval required

**This is what makes an audit answerable later.**

## Worked example

| | **UC-01** Policy assistant | **UC-02** Clinical visit scribe |
| --- | --- | --- |
| Stage 1 category | Retrieval | Agent |
| Stage 4 tier | Light touch | Full assurance |
| **Rung** | **2 Ready-made** | **4 Pro-code** — *escalated by assurance, not by category* |
| **Verb** | **Specialize** | **Build** |
| Lands on | Declarative agent | Pro-code platform |
| Offline? | No | **Yes — rules out anything cloud-only** |
| Data locality? | No | **Yes — private networking or local inference** |
| Extends beyond launch? | No | **Yes — intended reach exceeds pilot reach** |

## A caution on naming products at all

Everything at Level 2 and Level 3 is **more volatile** than everything above it. Three rules:

1. **The framework names capabilities. The workbook names products.** Keep Levels 2 and 3 out of the methodology and in the dated, versioned workbook, so the method stays accurate when product names move.
2. **Never recommend a preview product to a regulated customer as the plan.** Name it as an option to watch, with the general availability position stated.
3. **Date every product claim**, and attach an instruction to confirm before rollout.

## In the workbook

**Technology direction** sheet. The suggested rung and suggested verb calculate from Stages 1, 3 and 4; both have a confirmed column that overrides. The Level 3 constraints calculate from Q1, Q2b, Q3 and Q5. Product name and date-checked are free text, deliberately.

---

*Next: [Stage 6 — Prove it](07-stage-6-prove-it.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
