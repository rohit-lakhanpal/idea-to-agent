# Stage 1 — Is this AI at all?

*[← Stage 0](01-stage-0-frame-the-list.md) · [Stage 2 →](03-stage-2-outcome-contract.md)*

> **CAF source:** [When not to use AI agents](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan). Microsoft's own decision tree exits to non-generative options before it ever reaches an agent platform.

---

**This is the highest-value gate in the framework for saving money.**

Four outcomes, and only one of them is an agent. A fifth — retrieval — sits alongside as the genuinely light case. Expect a surprising share of any real list to leave here, and to leave *faster*, because non-agents ship quicker and carry no AI governance burden.

## The five outcomes

Each row is a different kind of work. The tests are meant to be answerable in about ten seconds.

| Outcome | Test | Sounds like | Goes to | AI governance? |
| --- | --- | --- | --- | --- |
| **Automation** | Steps are clear, repeatable, strict rules | *"When a ticket is closed, email the requester"* | Power Automate, Logic Apps, code | **No** |
| **Predictive** | Forecasting, scoring, matching or pattern-finding rather than language | *"How many staff will we need in June?"* | Data science, classic ML | Model governance, not agent governance |
| **Retrieval** | Static Q&A, or summarising a fixed set of documents. No tools, no multi-step reasoning | *"What's our policy on carer's leave?"* | Ready-made agents, low-code retrieval, RAG | Light |
| **LLM-augmented workflow** | A fixed flow with exactly **one** intelligent step | *"Summarise each incoming complaint, then route it"* | A flow with an AI action | Proportional to consequence |
| **Agent** | Decides its own next step, picks its own tools, copes with messy input | *"Work out why this order is late and sort it out"* | Continue to Stage 2 | **Yes, full** |

Notice how different the last two are. *Summarise then route* always does the same two things in the same order — the intelligence sits in one step and the flow around it is fixed. *Work out why the order is late* might check stock, then a courier API, then decide to email a supplier, or might do none of those. **The path is not knowable in advance.** That is the actual dividing line.

## The three positive tests for an agent

CAF's definition, and all three should feel true. If you are talking yourself into one of them, it is not an agent.

1. **Multi-step decisions** — it reads, evaluates, decides, and checks its own work
2. **Many tools or systems** — it chooses *which* API, *when*, and how to combine the results
3. **Adaptive behaviour** — it interprets intent from incomplete or unclear input

An agent is software that interprets inputs *"such as system events, user messages, or other agent messages"* and decides what to do next. If the next step is always the same, it is a workflow with an AI action in it — which is a perfectly good thing to build, and a much cheaper one.

## Why the predictive branch matters

It is easy to collapse forecasting into "automation" because neither involves language. That is wrong, and it is expensive in *both* directions.

Take *"predict which clients are at risk of leaving"*:

- Routed to an **automation platform**, it gets built as hand-written rules — *flag anyone with two missed appointments* — which underperforms permanently and nobody can improve without rewriting the rules.
- Routed to an **agent platform**, it becomes a very expensive way to do logistic regression, with a language model asked to do arithmetic it is poorly suited to.

Demand forecasting, resource matching, risk scoring, anomaly detection and next-best-action are all **statistical prediction**. They belong to the data platform and classic ML, they carry *model* governance rather than *agent* governance, and they are frequently the highest-value items on a list.

> Keeping this branch visible is the difference between a framework that classifies AI work and one that classifies *all* work. Real lists contain both.

## Retrieval is not an agent

The most common over-classification. If the job is *"answer questions from this fixed set of documents, and cite the source"*, that is retrieval:

- no tool calls
- no multi-step reasoning
- no decisions about what to do next

It ships in weeks on a ready-made or low-code option, it inherits existing document permissions, and it does not need agent governance. **Retrieval rows are where most genuine quick wins live**, and calling them agents makes them look harder than they are.

## The trap: everything is a chatbot

The characteristic Stage 1 failure is that every idea gets classified as an agent because *agent* is the thing everyone came to talk about.

The counter-question that works in a room:

> *"Walk me through what happens the second time someone uses this. Is it the same steps?"*

If the answer is yes, it is a workflow. If the answer is *"it depends what they ask"*, ask what it depends **on** — because if that dependency is a fixed list of three branches, it is still a workflow.

## Worked examples

From the [sample workbook](../assets/SAMPLE%20-%20AI%20Use%20Case%20Decision%20Workbook%20-%20v5.xlsx):

| | Language or judgement? | Forecasting? | Multi-step? | Many tools? | Adaptive? | → |
| --- | --- | --- | --- | --- | --- | --- |
| **UC-01** Policy assistant | Yes | No | No | No | No | **Retrieval** |
| **UC-02** Clinical visit scribe | Yes | No | Yes | Yes | Yes | **Agent** |

UC-01 answers policy questions from a fixed library and cites the source. No tools, no reasoning about next steps. It is retrieval, it is a quick win, and calling it an agent would have added months of governance it does not need.

UC-02 has to interpret free speech, decide what is clinically relevant, write to a record system and know when to escalate to a human. All three positive tests are true.

## In the workbook

**Register** sheet, columns O–V. Answer the five yes/no tests and the suggested category calculates. The confirmed column is an override — leave it blank to accept the suggestion.

The logic, in order:

1. Forecasting/scoring/matching = Yes → **Predictive**
2. Otherwise language or judgement = No → **Automation**
3. Otherwise all three positive tests true → **Agent**
4. Otherwise multi-step and many-tools both No → **Retrieval**
5. Everything else → **LLM-augmented workflow**

The **Route if it is not an agent** column then tells you where non-agent rows go and what governance they carry.

---

*Next: [Stage 2 — The outcome contract](03-stage-2-outcome-contract.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
