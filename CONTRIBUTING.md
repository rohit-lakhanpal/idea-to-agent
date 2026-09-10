# Contributing

Thanks for taking a look.

## The most useful contribution

**Places where the method gives a wrong answer on a real list.**

That is how v5 came about — running an earlier version over sixteen real initiatives exposed six defects that were all invisible in the abstract. If you run this over your own list and a row comes out wrong, that is the highest-value issue you can open.

A good report of that kind includes:

- What the row was (**de-identified** — see below)
- What the framework said
- What the right answer was
- Which question or rule produced the wrong result

## No customer content

**Do not include customer names, system names, internal project codes, or anything that identifies an organisation** in issues, pull requests or sample data.

De-identify before you post. *"A community health provider"* is fine. The provider's name, their record system, or their internal use-case IDs are not.

All examples in this repository are invented for illustration, and contributions must keep it that way.

## Other useful contributions

- **Corrections to Microsoft guidance references.** Cloud Adoption Framework pages move and change; if a quote or a link is stale, that is worth fixing.
- **Product reference updates.** Names, licensing and availability move quarterly. Product claims carry the date they were checked — updating them with a new date is welcome.
- **Clarity fixes.** If a stage reads as ambiguous in a workshop, say so.
- **Workbook bugs.** Formula errors, broken cross-sheet references, anything that miscalculates.

## What is likely to be declined

- **Adding more questions.** The eight questions each settle exactly one decision. A ninth needs to earn its place by changing an answer, not by adding detail.
- **Pricing or rate cards.** Deliberately out of scope — rates are customer-specific and move quarterly, and a framework carrying them is wrong within a quarter in front of a customer.
- **Product recommendations in the methodology docs.** The framework names capabilities; the workbook names products. That separation is load-bearing.

## Working on the workbook

The workbook is generated. **Edit [`workbook/build-xlsx-v5.js`](workbook/build-xlsx-v5.js), never the `.xlsx` files directly.**

```bash
cd workbook
npm install
npm run build:all
```

Then open both files in Excel and confirm the formulas resolve — ExcelJS writes formulas without cached values, so you cannot verify by reading the XML.

If you change a column position, check for cross-sheet references to it. Most sheets reference `Register`, `Eight questions`, `Assurance and gate` and `Technology direction` by absolute column letter.

## Licence

Documentation contributions are accepted under [CC BY 4.0](LICENSE-DOCS); code contributions under [MIT](LICENSE).
