# Appendix B — The workbook

*[← Appendix A](appendix-a-verb-card.md) · [Appendix C →](appendix-c-facilitation.md)*

---

The framework is only useful if it runs over a list. The workbook is the instrument.

| File | What it is |
| --- | --- |
| [`AI Use Case Decision Workbook - v5.xlsx`](../assets/AI%20Use%20Case%20Decision%20Workbook%20-%20v5.xlsx) | Blank template, 50 rows |
| [`SAMPLE - AI Use Case Decision Workbook - v5.xlsx`](../assets/SAMPLE%20-%20AI%20Use%20Case%20Decision%20Workbook%20-%20v5.xlsx) | Two worked rows |

## The three rules

1. **Row *N* is the same use case on every sheet.** Row 3 on *Register* is row 3 on *Answers out*. Never sort one sheet independently — filter instead.
2. **Cream cells are yours. Blue-grey italic cells calculate.** Do not type in the blue-grey ones.
3. **Work left to right.** Register → Outcome contract → Eight questions. Assurance, Technology direction and Answers out then fill themselves in.

## The thirteen sheets

| Sheet | Stage | What it holds |
| --- | --- | --- |
| **Start here** | — | Orientation, the eight stages, how to use it |
| **Register** | 0 + 1 | Identity, the four lenses, the Stage 1 gate, and a rollup of every calculated answer |
| **Outcome contract** | 2 | The five contract items and the six value baseline measurements |
| **Eight questions** | 3 | Q1 to Q8b, plus intended vs pilot reach and connectivity |
| **Assurance and gate** | 4 | Calculated tier *with the working shown*, then the six-point release gate |
| **Technology direction** | 5 | Ladder rung, verb, landing product, run-location constraints |
| **Prove and operate** | 6 + 7 | Prototype, evaluation, red team, release, then the run obligations |
| **Answers out** | — | **The eight columns the customer asked for** |
| **Scoring** | 0 | CAF's nine sub-criteria, three axes, 1 to 5 |
| **Lists** | — | Dropdown lists and lookup tables. **Formulas point here — do not reorder** |
| **Decision logic** | — | How every calculated column is derived, in words |
| **Platform reference** | 5 | The surfaces, what they run on, what they are best for |
| **References** | — | CAF sources, per stage |

## Suggested vs confirmed

Three columns come in pairs: the **Stage 1 category**, the **ladder rung** and the **verb**.

- Leave the *confirmed* cell **blank** and the suggestion flows straight through to every downstream column. Nothing stalls.
- Type anything into the *confirmed* cell and **the override wins everywhere**.

This is where human judgement enters the model. **The suggestion is a default, not a decision.**

## What calculates, and how

| Column | Derivation |
| --- | --- |
| **Suggested category** | Forecasting = Yes → Predictive. Else language/judgement = No → Automation. Else all three positive tests → Agent. Else multi-step and many-tools both No → Retrieval. Else LLM-augmented workflow. |
| **Stage 0 total** | The three CAF axes rescaled from 3–15 to 1–5 so all four lenses weigh equally, plus Responsibility. Out of 20. |
| **Annual hours** | V1 × V2 × V3 ÷ 60 |
| **Annual cost of error** | V1 × V2 × V4a × V4b |
| **Base tier** | Q8a consequence × Q3 reach band, from the matrix on *Lists* |
| **Assurance tier** | Base ordinal, **+1** if Q8b affects a person, then **floored at 3** if Q5 is regulated, capped at 4 |
| **Gate status** | All six *Met* → Passed · any *Not met* → **Blocked** · fewer than six answered → Incomplete |
| **Suggested rung** | Automation/predictive → rung 1. Else **assurance read before category**: regulated, real-world effect or full assurance → rung 4. Else ready-made + static source at tier ≤2 → rung 2. Else rung 3. |
| **Suggested verb** | System event/schedule/another agent → **Monitor**. Else enterprise/external reach, regulated or real-world effect → **Build**. Else already-working + in-tool + read-only → **Assist**. Else take an action → **Delegate**. Else writes → **Control**. Else static docs → **Specialize**. Else **Adapt**. |
| **Quick win?** | Not an agent · reach ≤2 · read only · public/internal · nothing or static source · connection in production |
| **Why not** | Names the **first failing test** of the six above |
| **Time estimate** | No connection → months, integration-led. Live state or take an action → months. Analytical → weeks to months. Else weeks. |
| **Information required** | Concatenates every blank Stage 2 contract cell, blank value baseline measurement, and blank Q1/Q5/Q7/Q8a |
| **Ready to release?** | Hardest step piloted **and** evaluated **and** control run for real **and** gate passed |

> **Act locally is never suggested automatically.** Select it manually when the work is local files, shell or browser — nothing in the eight questions distinguishes it reliably enough to automate.

## Rebuilding it

The workbook is generated, not hand-maintained, so the logic lives in one place and can be reviewed.

```bash
cd workbook
npm install
npm run build          # blank template
npm run build:sample   # with the two worked examples
```

To generate one pre-filled with your own rows, copy `sample-data.js`, replace the row objects, and:

```bash
node build-xlsx-v5.js "My Workbook.xlsx" ./my-data.js
```

The dataset shape is:

```js
module.exports = {
  title: "...",
  subtitle: "...",
  sheets: {
    "Register":        { 3: { 1: "UC-01", 3: "Use case name", /* col: value */ } },
    "Outcome contract":{ 3: { 3: "The result...", 13: 480 } },
    // ...
  },
};
```

Keys are **row number → column number → value**. Only input columns need setting; every calculated column works itself out when Excel opens the file.

## Two known constraints

- **Formulas are written, not evaluated.** ExcelJS writes formula strings without cached results, so values appear when Excel first opens the file. Some previewers that do not calculate will show blanks — that is expected, not a corrupt file.
- **50 rows.** Extending means changing `LAST` in the generator and rebuilding, rather than dragging rows down, because the conditional formatting ranges are generated too.

---

*Next: [Appendix C — Facilitation notes](appendix-c-facilitation.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
