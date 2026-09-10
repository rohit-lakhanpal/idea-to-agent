# Workbook generator

Generates the AI Use Case Decision Workbook. The workbook is **generated, not hand-maintained**, so all the decision logic lives in one reviewable place.

## Usage

```bash
npm install

npm run build          # blank template  -> ../assets/
npm run build:sample   # two worked rows -> ../assets/
npm run build:all      # both
```

## Your own data

```bash
node build-xlsx-v5.js "My Workbook.xlsx" ./my-data.js
```

Copy [`sample-data.js`](sample-data.js) as a starting point. The shape is **row number → column number → value**:

```js
module.exports = {
  title: "...",
  subtitle: "...",
  sheets: {
    "Register": {
      3: { 1: "UC-01", 3: "Policy assistant", 15: "Yes", 21: "Retrieval" },
    },
    "Outcome contract": {
      3: { 3: "Cut policy questions from 240 a month to under 100.", 13: 480 },
    },
  },
};
```

Only **input** columns need setting. Every calculated column works itself out when Excel opens the file. Rows you do not supply are left blank.

## Files

| File | What it is |
| --- | --- |
| `build-xlsx-v5.js` | The generator. All sheet definitions, formulas and formatting. |
| `sample-data.js` | The two worked example rows. All values invented. |

## Notes

- **Formulas are written without cached values.** ExcelJS does not evaluate, so values appear when Excel first opens the file. Previewers that do not calculate will show blanks — expected, not a corrupt file.
- **Row range is `FIRST = 3` to `LAST = 52`.** To extend, change `LAST` and rebuild rather than dragging rows, because conditional formatting ranges are generated too.
- **The `Lists` sheet is load-bearing.** Lookup tables sit at fixed rows and formulas point at them by absolute reference. Do not reorder it.

See [Appendix B](../docs/appendix-b-workbook.md) for the column-by-column guide.

MIT licensed — see [LICENSE](../LICENSE).
