# Stage 3 — The eight questions

*[← Stage 2](03-stage-2-outcome-contract.md) · [Stage 4 →](05-stage-4-assurance.md)*

> **CAF source:** [Technology plan](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) · [Data architecture](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/data-architecture-plan) · [Govern and secure](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization)

---

**This is the core of the method.**

Eight questions. **None of them names a product.** That is the point: answer these eight and the platform, the retrieval pattern, the identity model, the network topology and the assurance bar are already determined.

The test each question has to pass:

> **One question, one closed answer, one decision it settles.**

If a question does not change what you build, it is a research note, not a decision question.

## The eight at a glance

| # | Question | What it settles |
| --- | --- | --- |
| **Q1** | What starts it? | Chat or no chat. Whether you need an event or schedule runtime. Which agent type. |
| **Q2** | Where does the answer land? | Adoption cost. Licence surface. Frontline constraints. |
| **Q3** | How far does it reach? | Assurance tier (with Q8). Who approves. Whether multiple teams force multi-agent. |
| **Q4** | Whose permissions does it use? | Retrieval auth model. Whether unattended running is possible. Audit scope. |
| **Q5** | What class of data does it touch? | Network topology. Data location. DLP, labels, retention. |
| **Q6** | What must it know or do? | Retrieval pattern: index, tool call, or nothing. Timeline order of magnitude. |
| **Q7** | Does that connection already exist? | Weeks or months. Whether this is integration-led programme work. |
| **Q8** | What happens when it goes wrong? | Evaluations mandatory or not. Human in the loop or not. Assurance tier (with Q3). |

---

# Q1 — What starts it?

`A person asks` · `A person is already working` · `A system event` · `A schedule` · `Another agent`

> **Grounding.** CAF defines an agent as software that interprets inputs *"such as system events, user messages, or other agent messages"* — that taxonomy is the answer list.

**Four of those five are not a chat experience.**

This is the question most often skipped, and skipping it is why every idea defaults to a chat window.

Consider *"tell the care team when a client is admitted to hospital"*. Answer Q1 as **a system event** and you build a notification that arrives in Teams the moment the status changes. Skip Q1, assume *a person asks*, and you build a chat window where someone can enquire whether any of their clients have been admitted — which requires them to already suspect the thing you were supposed to tell them. It technically satisfies the requirement. It solves nothing.

**Get Q1 wrong and everything downstream is wrong, expensively.** The surface is wrong, the verb is wrong, the platform is wrong, and the adoption problem you spend the next two quarters on is one you created here.

---

# Q2 — Where does the answer land?

`No interface` · `Inside the tool they already have open` · `Collaboration surface` · `Embedded in a line of business app` · `Frontline device` · `External channel`

> **Grounding.** CAF, near verbatim: *"Position agents within the applications and communication channels employees already use... Requiring users to switch contexts to access an agent increases friction and reduces adoption."*

**Argue for the top of the list.** If the output can arrive as a pre-filled field, a written email, or a notification that reaches the right person, **there is nothing to adopt and no adoption curve**. That is not a compromise, it is the best available outcome.

External channel is a different governance conversation entirely — public-facing agents must not access internal business data.

### Frontline device carries a second answer

**What is the connectivity assumption?** `Always connected` · `Intermittent` · `Must work offline`

Assume no desktop, often no licence, and sometimes English as a second language. This answer feeds the operating-location constraint at Stage 5, and it is the one most often discovered *during* a pilot rather than before it.

> If a tool needs signal and the work happens in a client's home with none, the use case fails in exactly the setting it was built for — and no amount of model quality fixes that.

---

# Q3 — How far does it reach?

`1 Me` · `2 My team` · `3 Function` · `4 Enterprise` · `5 External`

> **Grounding.** CAF makes governance explicitly scope-dependent: *"If agent usage is limited, existing governance forums might be sufficient. If agents are used across multiple business units, revisit governance and formalize AI agent accountability with defined authority."* Tier 5 is the boundary CAF draws hardest: *"Public-facing agents must not access internal business data."*
> *The five rungs are this framework's packaging. That obligation changes with scope is Microsoft's.*

**Not a slider. Five rungs**, each crossing a boundary that changes who approves it and what it must have before it ships.

| Rung | What changes |
| --- | --- |
| **1 Me** | Nothing from governance. **Get out of the way.** |
| **2 My team** | A named owner, and an answer to what happens when that person leaves |
| **3 Function** | **The first real boundary** — people the builder has never met now rely on it |
| **4 Enterprise** | Formal accountability with defined authority |
| **5 External** | Risk and legal in the room. No internal business data. |

**Tier 3 is where the character of the thing changes.** At tiers 1 and 2 the users know the builder; if it behaves oddly they walk over and say so, and that informal feedback loop is a real control. At tier 3 the builder has never met most of the users. Nobody tells them it is wrong — they just quietly stop using it, or worse, keep using it.

**Record intended reach and pilot reach separately.** Design for the destination, deploy at the pilot. The gap between the two is itself a Stage 5 input: it tells you whether you are about to outgrow a low-extensibility option.

---

# Q4 — Whose permissions does it use?

`Acts as the user` · `Acts as itself (service identity)`

> **Grounding.** CAF: *"When an agent accesses data on behalf of a user, ensure it inherits that user's permissions. Pass the user's identity or token securely."* CAF says *"prefer identity passthrough when user-level permissions must persist."*

**An agent inherits the permissions that already exist. It does not repair them.**

- **Acts as the user** means two people asking the same question correctly get different answers.
- **Acts as itself** is required for anything unattended or event-driven, and must be least privilege and fully audited.

> **The warning worth pausing on.** Point an agent at a content estate with loose permissions and you have not *created* an oversharing problem. You have built a very efficient discovery engine for one that already existed.

**Every agent gets one identity**, whatever its tier, so every action is attributable. This is not a tier-4 obligation. **It applies at tier 1.**

---

# Q5 — What class of data does it touch?

`Public` · `Internal` · `Confidential` · `Regulated (health, personal, financial)`

> **Grounding.** The most heavily specified area in the whole of CAF. *"Isolate confidential data."* · *"Apply DLP policies and sensitivity labels."* · *"Mandate data residency compliance... Identify the location of each data source, agent runtime, and output storage."* · *"Define data retention policies."*

**This is the question that picks your network topology, and nothing else does.**

| Answer | What it forces |
| --- | --- |
| **Public** | Must not touch internal sources. Separate environment from internal agents. |
| **Internal** | Standard setup, public networking. Labels honoured. |
| **Confidential** | Private networking, or an explicitly set data location. Explicit DLP policy. Named retention period. |
| **Regulated** | All of the above, plus consent and residency answered **before** build, plus retention and deletion mechanisms, plus a named accountable human. |

CAF also asks a **placement** question before a retrieval question: *"the decision isn't about retrieval mechanics, the decision is about placement."* Content that serves collaboration and organisational knowledge belongs where document permissions and retention already govern it. Regulated clinical content usually does not.

> Q5 is the question a single front door most needs. *"One place to ask anything"* will inevitably catch grievances, disciplinary matters and salary questions. Design that confidentiality boundary now, or discover it the first time someone reports a colleague through it.

---

# Q6 — What must it know or do?

`Nothing` · `Static documents` · `Analytical data` · `Live system state` · `Take an action`

> **Grounding.** CAF: *"Choose built-in tools when content changes frequently or requires consistent governance"* and *"Choose MCP when agents must take actions or access real-time data."*

**Freshness is the discriminator, and it predicts your timeline.**

- **Static content** → retrieval over a governed index → a build measured in **days or weeks**
- **Live state** → a tool call, not an index → a build measured in **months**, because you are now integrating with a system of record

CAF's ordering is commercially important: **prefer built-in retrieval before commissioning custom integration.** Built-in connections preserve identity, auditing and policy enforcement for free. A custom integration means maintaining all of that yourself, forever.

---

# Q7 — Does that connection already exist?

`Yes, in production` · `Yes, but not to this system` · `No`

> **Grounding.** CAF's technical feasibility criterion: *"Technology fit: check whether the agent works with existing systems and tools. Poor alignment increases complexity and risk."* And on MCP: *"Use available and built-in MCP servers... If they aren't available, you need to build them."*
> *CAF asks you to assess technology fit. Making it a binary the customer answers is this framework's packaging.*

**If the answer is no, the row is integration-led.**

Set the expectation in **months**, and have the integration conversation *before* the AI conversation.

This is the question nobody asks, and it is why "digitalise these forms" reads as a fortnight of work when the real constraint is that the two systems involved do not exchange data at all today. The AI part might genuinely be two weeks. It is sitting behind six months of integration.

---

# Q8 — What happens when it goes wrong?

**Two failure modes, two answers, one question.** Every serious risk framework treats commission and omission together.

### Q8a — If it gives the wrong answer

`Read only` · `Writes to a system` · `Real-world effect`

Sets three things: whether evaluations are mandatory, whether a human stays in the loop, and the minimum platform tier.

- **Read only** — it suggests and a person acts. Wrong answers are visible and cheap.
- **Writes to a system** — it changes a record of business truth.
- **Real-world effect** — it changes what happens to a person, a payment or a service.

### Q8b — If it silently does nothing

`Nothing` · `Work is delayed` · `A person is affected`

> **Grounding.** The relevant Microsoft Responsible AI pillar is **reliability and safety**. An agent that fails without anyone noticing fails that pillar even when every answer it *did* give was correct.
> *The omission test is this framework's derivation from that pillar. CAF does not phrase it as a question.*

**The rule: where a silent failure affects a person, lift the assurance tier by one** — regardless of the read or write classification.

This is the correction that most changes answers on a real list, and the clearest way to see it is the hospital notification again. Score it on Q8a alone and it is **read only** — the agent only sends a message, a human decides what to do. Low consequence, light touch, ship it.

But the risk was never a *wrong* alert. It is the alert that **never arrives**: a client is admitted, the flow silently stopped three weeks ago, and nobody visits. Q8a cannot see that failure, because on Q8a's terms nothing was written and nothing was wrong. Q8b is the only question that catches it.

> **Note that Q8b survives the Stage 1 gate.** That notification might be classified as plain automation — not AI, no AI governance. The silent-failure risk does not care. A scheduled flow that quietly stops still means a person nobody visits, so **monitoring the monitor** belongs in that row's Stage 7 obligations even though it is not an agent at all.

---

## Also recorded per row, but not questions

Facts to capture, not decisions to make. They feed Stage 5 rather than shaping the work.

- **Will this clearly grow beyond three to five distinct functions?** — the third of CAF's three multi-agent criteria (Q3 and Q5 give you the other two)
- Is there a ready-made agent for this?
- Do these users have the licences?
- Source systems, and how often the source changes
- **Does it need to remember between uses?** — CAF wants ephemeral session memory for transactional agents, persistent memory only for advisory ones
- **The retrieval decision record** — per data domain, how the agent gets its information and why. *This is what makes an audit answerable later.*

---

## Worked example

The two sample rows, side by side:

| | **UC-01** Policy assistant | **UC-02** Clinical visit scribe |
| --- | --- | --- |
| **Q1** starts it | A person asks | A person is already working |
| **Q2** lands | Collaboration surface | **Frontline device** |
| **Q2b** connectivity | Always connected | **Must work offline** |
| **Q3** intended / pilot | 2 My team / 2 My team | **4 Enterprise** / 2 My team |
| **Q4** permissions | Acts as the user | Acts as the user |
| **Q5** data | Internal | **Regulated** |
| **Q6** know or do | Static documents | **Take an action** |
| **Q7** connection | Yes, in production | **No** |
| **Q8a** wrong answer | Read only | **Writes to a system** |
| **Q8b** silent failure | Nothing | **A person is affected** |

Every bolded answer in the right-hand column is a cost, a constraint or a delay — and none of them is visible from the idea's *label*. Both were originally written down as *"an AI assistant"*.

## In the workbook

**Eight questions** sheet. Every answer is a dropdown. Q5 auto-fills what that data class forces. The "recorded but not questions" block sits on the right.

Everything downstream — the assurance tier, the ladder rung, the verb, the timeline, the quick-win test — is calculated from these answers plus Stage 1 and Stage 2.

---

*Next: [Stage 4 — Assurance tier and release gate](05-stage-4-assurance.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
