# Stage 6 — Prove it

*[← Stage 5](06-stage-5-technology-direction.md) · [Stage 7 →](08-stage-7-operate.md)*

> **CAF source:** [Validate technology choices](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) · [Agent observability](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/build-secure-process)

---

Five rules between a chosen direction and a released system.

| Step | Rule |
| --- | --- |
| **1 · Prototype** | One to two weeks per candidate approach. **Hardest step first.** |
| **2 · Pilot** | At the reach tier the job was designed for, not the eventual one |
| **3 · Evaluate** | Against the **Stage 2 outcome measure**, not a generic quality score |
| **4 · Red team** | Before production, and after significant updates |
| **5 · Release** | Only once the Stage 4 control has run **for real** |

## 1. Time-box the prototype

One to two weeks per candidate approach. The time-box is the point: a prototype that runs until it works is not a prototype, it is an unmanaged build.

Document the finding and take it to stakeholders rather than deciding inside the build.

## 2. Pilot the hardest step, not the easiest

**Teams instinctively prototype the easiest step because it demos well, which proves nothing.**

This is the most reliably ignored rule in the framework, and the most expensive one to ignore, because a successful easy-step prototype creates confidence that survives right up until the hard step arrives in production.

Concretely:

- Not "can it transcribe speech" but "can it transcribe speech **in a client's home with no signal and sync later**"
- Not "can it answer a policy question" but "can it answer a question **that spans two policies where the more recent one has to win**"
- Not "can it write to the system" but "can it write to the system **when the record is locked by someone else**"

**The test:** if the prototype succeeding would not change your mind about anything, you prototyped the wrong step.

## 3. Evaluate against the Stage 2 measure

Not a generic quality score. Not a vendor benchmark. **The number you wrote down at Stage 2.**

The distinction matters more than it sounds. A policy assistant can score well on any generic quality measure — fluent, relevant, correctly formatted answers — while the number of policy questions reaching the HR inbox does not move at all, because people never found it, or did not trust it, or asked it once and got an answer they could not verify. **The model was fine. The outcome did not happen.** Only the Stage 2 metric can tell you that.

Store evaluations in a shared catalogue so every team applies the same standard — otherwise each team invents its own bar, and *"it passed evaluation"* stops meaning anything across a portfolio.

> **Evaluation is a practice, not a vendor.** It runs the same way whether the build ended up on a low-code flow, a standard harness or a pro-code platform. **The method does not exist to funnel every use case toward one product family** — and being able to say that plainly is what makes the rest of it credible.

## 4. Red team before production

**Adversarial testing is mandatory, not optional.** Prompt injection, data leakage, jailbreak.

And **again after significant updates** — a model swap, a new data source, a new tool, an expanded scope. A system that passed adversarial testing in one configuration has told you nothing about the next one.

## 5. Release only once the control has run for real

Not just in a test script.

If the Stage 4 control is *"a clinician reviews every flagged note"*, then before release a clinician must have actually reviewed flagged notes, in the real workflow, at realistic volume — and ideally rejected at least one.

A control that has only ever been described is a diagram. See [the human-in-the-loop test](05-stage-4-assurance.md#is-your-human-in-the-loop-real).

## Worked example

| | **UC-01** Policy assistant | **UC-02** Clinical visit scribe |
| --- | --- | --- |
| Prototype | 20–31 Jul, 11 days ✅ within time-box | 14–25 Sep, planned |
| Hardest step | *Questions spanning two policies where the more recent wins* | *Offline capture and later sync with no mobile signal* |
| Hardest step piloted? | **Yes** | **No** |
| Evaluated vs Stage 2 measure? | **Yes** | **No** |
| Red team | 14 Aug | — |
| Control run for real? | **Yes** | **No** |
| Released | 25 Aug | — |
| **Ready to release?** | **Yes** | **Not yet** |

Note that both prototypes target the genuinely hard step. UC-02's is *not* transcription accuracy — that already works on a desk and is not the risk. The risk is a care worker in a house with no signal.

## In the workbook

**Prove and operate** sheet, columns C–M. Prototype dates calculate elapsed days and flag anything over two weeks. *Ready to release?* returns **Yes** only when the hardest step was piloted, an evaluation exists against the Stage 2 measure, the control has run for real, **and** the Stage 4 release gate has passed.

---

*Next: [Stage 7 — Operate](08-stage-7-operate.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
