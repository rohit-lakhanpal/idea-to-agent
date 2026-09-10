/* AI Use Case Decision Workbook - v5
   Reverse-engineered from "Turning an idea list into working agents - v5.pptx"
   and FRAMEWORK-v5.md. One row per use case (or phase); row N is the same use
   case on every sheet.
   Build:  node build-xlsx-v5.js "AI Use Case Decision Workbook - v5.xlsx"
*/
const ExcelJS = require("exceljs");

const NAVY = "FF243A5E", BLUE = "FF0078D4", TEAL = "FF008575", GREY = "FF737373";
const WHITE = "FFFFFFFF", PAPER = "FFF5F8FC", LINE = "FFDCE6F2", AMBER = "FF8A5300";
const RED = "FFA4262C", PURPLE = "FF5C2E91", INPUT = "FFFFFDF0", CALC = "FFEFF4FA";
const FONT = "Segoe UI";
const FIRST = 3, LAST = 52;
const OUT = process.argv[2] || "AI Use Case Decision Workbook - v5.xlsx";
/* Optional sample dataset:  node build-xlsx-v5.js out.xlsx ./sample-data.js
   Shape: { title, subtitle, sheets: { "<sheet name>": { <row>: { <col>: value } } } } */
const DATA = process.argv[3] ? require(process.argv[3]) : null;
const SEED = (DATA && DATA.sheets) || {};

const wb = new ExcelJS.Workbook();
wb.creator = "Microsoft";
wb.lastModifiedBy = "Microsoft";
wb.created = new Date();

const thin = { style: "thin", color: { argb: LINE } };
const box = { top: thin, left: thin, bottom: thin, right: thin };

function colLetter(n) {
  let s = "";
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = (n - m - 1) / 26; }
  return s;
}

function buildSheet(name, tabColour, groups, opts) {
  opts = opts || {};
  const ws = wb.addWorksheet(name, {
    properties: { tabColor: { argb: tabColour } },
    views: [{ state: "frozen", xSplit: opts.freezeCols || 2, ySplit: 2 }],
  });
  const flat = [];
  groups.forEach(g => g.cols.forEach(c => flat.push(c)));

  let i = 1;
  groups.forEach(g => {
    const from = i, to = i + g.cols.length - 1;
    ws.mergeCells(1, from, 1, to);
    const c = ws.getCell(1, from);
    c.value = g.band;
    c.font = { name: FONT, size: 9, bold: true, color: { argb: WHITE } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: g.colour } };
    c.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
    i = to + 1;
  });
  ws.getRow(1).height = 20;

  flat.forEach((c, idx) => {
    const cell = ws.getCell(2, idx + 1);
    cell.value = c.h;
    cell.font = { name: FONT, size: 9, bold: true, color: { argb: NAVY } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PAPER } };
    cell.alignment = { vertical: "bottom", wrapText: true };
    cell.border = box;
    if (c.note) cell.note = c.note;
    ws.getColumn(idx + 1).width = c.w || 18;
  });
  ws.getRow(2).height = 48;

  for (let r = FIRST; r <= LAST; r++) {
    const seedRow = (SEED[name] && SEED[name][r]) || null;
    flat.forEach((c, idx) => {
      const cell = ws.getCell(r, idx + 1);
      cell.font = { name: FONT, size: 9, color: { argb: "FF1F1F1F" } };
      cell.border = box;
      cell.alignment = { vertical: "top", wrapText: true };
      if (c.f) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CALC } };
        cell.font = { name: FONT, size: 9, italic: true, color: { argb: NAVY } };
        cell.value = { formula: c.f(r) };
      } else {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INPUT } };
        if (seedRow && seedRow[idx + 1] !== undefined) cell.value = seedRow[idx + 1];
      }
      if (c.num) cell.numFmt = c.num;
      if (c.list) cell.dataValidation = { type: "list", allowBlank: true, formulae: [c.list], showErrorMessage: false };
    });
    ws.getRow(r).height = 30;
  }
  ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: LAST, column: flat.length } };
  return ws;
}

const idCols = () => ([
  { h: "ID", w: 9, f: r => `IF(Register!A${r}="","",Register!A${r})` },
  { h: "Use case", w: 32, f: r => `IF(Register!C${r}="","",Register!C${r})` },
]);

/* Effective values: a confirmed answer wins, but until one is typed the
   suggestion flows straight through, so no downstream column ever stalls. */
const CAT = r => `IF(Register!U${r}="",Register!T${r},Register!U${r})`;
const RUNG = r => `IF('Technology direction'!D${r}="",'Technology direction'!C${r},'Technology direction'!D${r})`;
const VERB_LOCAL = r => `IF(G${r}="",F${r},G${r})`;
const RUNG_LOCAL = r => `IF(D${r}="",C${r},D${r})`;

/* =========================================================================
   LISTS
   ========================================================================= */
const sL = wb.addWorksheet("Lists", { properties: { tabColor: { argb: GREY } } });
const LISTS = [
  ["Status", ["Not started", "In discovery", "Contract agreed", "Scored", "Approved", "Building", "Piloting", "Released", "Parked", "Rejected"]],
  ["Stage 1 category", ["Automation", "Predictive or optimisation", "Retrieval", "LLM-augmented workflow", "Agent"]],
  ["Q1 What starts it", ["A person asks", "A person is already working", "A system event", "A schedule", "Another agent"]],
  ["Q2 Where it lands", ["No interface", "Inside the tool they have open", "Collaboration surface", "Embedded in a line of business app", "Frontline device", "External channel"]],
  ["Q2b Connectivity", ["Always connected", "Intermittent", "Must work offline", "Not applicable"]],
  ["Q3 Reach", ["1 Me", "2 My team", "3 Function", "4 Enterprise", "5 External"]],
  ["Q4 Permissions", ["Acts as the user", "Acts as itself (service identity)"]],
  ["Q5 Data class", ["Public", "Internal", "Confidential", "Regulated"]],
  ["Q6 Know or do", ["Nothing", "Static documents", "Analytical data", "Live system state", "Take an action"]],
  ["Q7 Connection", ["Yes, in production", "Yes, but not to this system", "No"]],
  ["Q8a Wrong answer", ["Read only", "Writes to a system", "Real-world effect"]],
  ["Q8b Silent failure", ["Nothing", "Work is delayed", "A person is affected"]],
  ["Yes / No", ["Yes", "No", "Unknown"]],
  ["Assurance tier", ["Light touch", "Owner approves", "Controlled pilot", "Full assurance"]],
  ["Verb", ["Assist", "Delegate", "Monitor", "Specialize", "Control", "Adapt", "Act locally", "Build"]],
  ["Benefit type", ["Time or cost released", "Error and rework reduction", "Speed and responsiveness", "Risk and compliance avoided", "Capacity redirected to the mission", "Experience and retention"]],
  ["Hard or soft", ["Hard", "Soft", "Hard or soft"]],
  ["Gate status", ["Not met", "In progress", "Met", "Not applicable"]],
  ["Ladder rung", ["1 Not AI", "2 Ready-made", "3 Low-code", "4 Pro-code", "5 Infrastructure"]],
  ["Owning team", ["Platform team", "Workload team", "AI Centre of Excellence", "Partner"]],
  ["Phase", ["a Interim", "b Target", "Single"]],
  ["Agent shape", ["Single agent", "Multi-agent: compliance boundary", "Multi-agent: multiple teams", "Multi-agent: planned growth"]],
];
sL.getCell("A1").value = "Dropdown lists and lookup tables. Formulas on other sheets point at these ranges - do not reorder or insert rows.";
sL.getCell("A1").font = { name: FONT, size: 10, bold: true, color: { argb: NAVY } };
LISTS.forEach((L, i) => {
  const col = i + 1;
  sL.getColumn(col).width = 24;
  const h = sL.getCell(2, col);
  h.value = L[0];
  h.font = { name: FONT, size: 9, bold: true, color: { argb: WHITE } };
  h.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  h.alignment = { wrapText: true, vertical: "bottom" };
  L[1].forEach((v, j) => {
    const c = sL.getCell(3 + j, col);
    c.value = v;
    c.font = { name: FONT, size: 9 };
    c.border = box;
  });
});
sL.getRow(2).height = 30;

const R = {};
LISTS.forEach((L, i) => {
  const c = colLetter(i + 1);
  R[L[0]] = `Lists!$${c}$3:$${c}$${2 + L[1].length}`;
});

function lookupBlock(startRow, heading, rows) {
  const t = sL.getCell(startRow, 1);
  t.value = heading;
  t.font = { name: FONT, size: 10, bold: true, color: { argb: NAVY } };
  rows.forEach((row, ri) => {
    row.forEach((v, ci) => {
      const c = sL.getCell(startRow + 1 + ri, ci + 1);
      c.value = v;
      c.font = { name: FONT, size: 9, bold: ri === 0 };
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ri === 0 ? PAPER : WHITE } };
      c.border = box;
      c.alignment = { wrapText: true, vertical: "top" };
    });
  });
}
// heading at startRow, header at startRow+1, data from startRow+2
lookupBlock(30, "Stage 4 - assurance tier matrix (consequence x reach). Header row 31, data rows 32-34.", [
  ["Q8a consequence", "1-2", "3", "4-5"],
  ["Read only", "Light touch", "Owner approves", "Controlled pilot"],
  ["Writes to a system", "Owner approves", "Controlled pilot", "Full assurance"],
  ["Real-world effect", "Controlled pilot", "Full assurance", "Full assurance"],
]);
lookupBlock(35, "Tier ordinals. Data rows 37-40.", [
  ["Tier", "Ordinal", "What it means"],
  ["Light touch", 1, "Ship it. Standard guardrails only."],
  ["Owner approves", 2, "Named owner signs off. Spot-checked, not gated."],
  ["Controlled pilot", 3, "Measured pilot, defined success criteria, a decision gate."],
  ["Full assurance", 4, "Evaluations, human in the loop, monitoring, a route to a person."],
]);
lookupBlock(41, "Stage 5 level 2 - the eight verbs. Data rows 43-50.", [
  ["Verb", "Lands on", "Selected by"],
  ["Assist", "Microsoft 365 Copilot", "Q1 person already working - Q2 inside the tool they have open - Q8a read only"],
  ["Delegate", "Copilot Cowork", "Q1 person asks - Q6 take an action across several M365 surfaces - returns a finished artefact"],
  ["Monitor", "Fabric operations agent", "Q1 system event or schedule - Q6 live system state - Q2 no interface, output arrives in Teams"],
  ["Specialize", "Declarative agent / Agent Builder", "Q1 person asks - Q6 static documents - Q3 team or function - stable scope"],
  ["Control", "Copilot Studio, standard harness", "Q8a writes to a system - consistency and branching matter - analytics and channel publishing"],
  ["Adapt", "Copilot Studio, GitHub Copilot harness", "Reasoning-heavy - multi-tool - document-intensive - the path is not fixed"],
  ["Act locally", "Microsoft Scout", "Q2 local files, shell or browser - Q5 data that should not leave the device"],
  ["Build", "Microsoft Foundry (+ Foundry Local)", "Q3 tier 4-5 - Q5 regulated - Q8a real-world effect - needs evaluation, tracing, VNet"],
]);
lookupBlock(51, "Q5 - what each data class forces. Data rows 53-56.", [
  ["Answer", "What it forces"],
  ["Public", "Must not touch internal sources. Separate environment from internal agents."],
  ["Internal", "Standard M365 or Foundry standard setup, public networking. Labels honoured."],
  ["Confidential", "Foundry standard with private networking, or Copilot Studio with data location set. Explicit DLP policy. Named retention period."],
  ["Regulated", "All of the above, plus consent and residency answered before build, plus retention and deletion mechanisms, plus a named accountable human."],
]);
lookupBlock(57, "Stage 4 - release gate, the three tests behind each check.", [
  ["Check", "Test 1", "Test 2", "Test 3"],
  ["1. Accountable", "Named business owner", "Named technical owner", "Intended users and purpose recorded"],
  ["2. Identifiable", "Agent entered in the organisational registry", "One distinct identity", "Ownership and lifecycle status visible"],
  ["3. Constrained", "Only required data and tools allowed", "User-delegated or service identity explicitly chosen", "External connections approved"],
  ["4. Tested", "Success and failure criteria defined", "Security and adversarial testing completed", "Human intervention defined where required"],
  ["5. Observable", "Activity, quality, access and cost monitored", "Logs retained according to policy", "Alerts routed to the appropriate operational team"],
  ["6. Recoverable", "Kill switch or disable path", "Incident owner and escalation path", "Rollback, evidence preservation and review process"],
]);
lookupBlock(65, "Stage 2 - benefit types.", [
  ["Benefit type", "Typically", "Example"],
  ["Time or cost released", "Hard", "Hours returned to a team"],
  ["Error and rework reduction", "Hard", "Fewer corrections, fewer escalations"],
  ["Speed and responsiveness", "Hard or soft", "Days to hours in a process"],
  ["Risk and compliance avoided", "Soft, sometimes very large", "Audit readiness, a missed obligation avoided"],
  ["Capacity redirected to the mission", "Soft", "More time with clients rather than fewer staff"],
  ["Experience and retention", "Soft", "Reduced administrative burden on frontline staff"],
]);
lookupBlock(73, "Is your human in the loop real?", [
  ["Real", "Theatre"],
  ["A specific condition triggers review, not 'sometimes'", "Everything gets flagged, so reviewers stopped reading"],
  ["The reviewer sees the reasoning", "The reviewer only sees the final output"],
  ["Rejecting has actually been exercised", "Nobody has ever clicked reject"],
  ["The decision and its reason are logged", "No record of who approved what"],
]);
lookupBlock(79, "Stage 1 - four outcomes, and only one is an agent.", [
  ["Outcome", "Test", "Goes to", "AI governance?"],
  ["Automation", "Steps are clear, repeatable, follow strict rules", "Power Automate, Logic Apps, code", "No"],
  ["Predictive or optimisation", "Forecasting, scoring, matching or pattern-finding rather than language", "Fabric data science, Azure ML, prebuilt Foundry models", "Model governance, not agent governance"],
  ["Retrieval", "Static question and answer, or summarising a fixed set of documents", "SharePoint agent, Copilot Studio retrieval agent, classic RAG", "Light"],
  ["LLM-augmented workflow", "A fixed flow with exactly one intelligent step: summarise, classify, extract, draft", "A flow with an AI action, or a scheduled prompt", "Proportional to consequence"],
  ["Agent", "Decides its own next step, picks its own tools, copes with messy input", "Continue to Stage 2", "Yes, full"],
]);

/* =========================================================================
   START HERE
   ========================================================================= */
const s0 = wb.addWorksheet("Start here", { properties: { tabColor: { argb: NAVY } } });
s0.getColumn(1).width = 3; s0.getColumn(2).width = 32; s0.getColumn(3).width = 104;
let r0 = 2;
const s0title = t => { const c = s0.getCell(r0, 2); c.value = t; c.font = { name: FONT, size: 20, bold: true, color: { argb: NAVY } }; s0.getRow(r0).height = 28; r0++; };
const s0sub = t => { const c = s0.getCell(r0, 2); c.value = t; c.font = { name: FONT, size: 10, color: { argb: GREY } }; c.alignment = { wrapText: true, vertical: "top" }; s0.mergeCells(r0, 2, r0, 3); s0.getRow(r0).height = 44; r0 += 2; };
const s0h = t => { const c = s0.getCell(r0, 2); c.value = t; c.font = { name: FONT, size: 11, bold: true, color: { argb: WHITE } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } }; c.alignment = { indent: 1, vertical: "middle" }; s0.mergeCells(r0, 2, r0, 3); s0.getRow(r0).height = 22; r0++; };
const s0row = (a, b) => {
  const ca = s0.getCell(r0, 2), cb = s0.getCell(r0, 3);
  ca.value = a; cb.value = b;
  ca.font = { name: FONT, size: 9, bold: true, color: { argb: NAVY } };
  cb.font = { name: FONT, size: 9 };
  ca.alignment = { vertical: "top", wrapText: true }; cb.alignment = { vertical: "top", wrapText: true };
  ca.border = box; cb.border = box;
  s0.getRow(r0).height = Math.max(16, Math.ceil(String(b).length / 100) * 13 + 6);
  r0++;
};

s0title(DATA && DATA.title ? DATA.title : "AI use case decision workbook");
s0sub(DATA && DATA.subtitle ? DATA.subtitle : "The tracking companion to \"Turning an idea list into working agents - v5\". Eight stages that turn a list of ideas into a prioritised set of projects, where the technology falls out of the answers rather than being the starting assumption. Grounded in the Microsoft Cloud Adoption Framework for AI agents.");

s0h("How to use it");
s0row("One row per job", "Row 3 on every sheet is the same use case as row 3 on every other sheet. Split vague labels into jobs before you start: one label often covers three or four jobs, each with a different risk profile and a different owner. Phase a use case with a shared ID and the Phase column - UC-06a interim, UC-06b target - and score each phase separately.");
s0row("Cream cells are yours", "Cream cells are inputs. Blue-grey italic cells are calculated - do not type in them.");
s0row("Work left to right", "Register, then Outcome contract, then Eight questions. Assurance and gate, Technology direction and Answers out then fill themselves in.");
s0row("Blanks are the deliverable", "The value baseline and owner cells are usually the emptiest in the workbook and only the customer can fill them. A named, specific list of what is missing is a more useful deliverable than a set of confident guesses. The last column of Answers out builds that list per row automatically.");
r0++;

s0h("The eight stages");
[["Stage 0 - Business plan for AI agents", "Frame the list. Desirability, feasibility, viability, responsibility. Split vague labels into jobs, deduplicate, allow phasing."],
["Stage 1 - Is this AI at all?", "Four outcomes and only one is an agent: automation, predictive, LLM-augmented, agent, with retrieval alongside as the light case. The highest-value gate in the framework for saving money."],
["Stage 2 - The outcome contract", "The result, the owner, the boundary, the gates, the value baseline. Five things, all before anyone opens a product page."],
["Stage 3 - The eight questions", "None of them names a product. Answer them and the platform, retrieval pattern, identity model, network topology and assurance bar are already determined."],
["Stage 4 - Assurance tier and release gate", "Consequence by reach sets the tier. Q8b lifts it. Regulated data floors it. Then six checks: accountable, identifiable, constrained, tested, observable, recoverable."],
["Stage 5 - Technology direction", "Prefer the lowest rung that works, and read assurance before category. Low-code supports autonomous agents - do not climb a rung you do not need."],
["Stage 6 - Prove it", "Prototype time-boxed, pilot the hardest step, evaluate against the Stage 2 measure, red team, release only once the control has run for real."],
["Stage 7 - Operate", "Monitor the outcome measure not uptime, re-evaluate on a schedule, keep the control staffed, name the back-to-design triggers, audit the estate."]].forEach(x => s0row(x[0], x[1]));
r0++;

s0h("The sheets");
[["Register", "Identity, Stage 0 scores, Stage 1 category, and the rollup of every calculated answer."],
["Outcome contract", "Stage 2. The five contract items and the six value baseline measurements."],
["Eight questions", "Stage 3. Q1 to Q8b, plus intended versus pilot reach and the connectivity assumption."],
["Assurance and gate", "Stage 4. Calculated tier with the working shown, then the six-point release gate."],
["Technology direction", "Stage 5. Calculated ladder rung, suggested verb, landing product, run-location constraints."],
["Prove and operate", "Stages 6 and 7. Prototype, evaluation, red team, release, then the run obligations."],
["Answers out", "The eight columns the customer asked for, produced from the stages above."],
["Scoring", "The Cloud Adoption Framework's nine sub-criteria, three axes, 1 to 5."],
["Lists", "Dropdown lists and lookup tables. Formulas point at these ranges - do not reorder."],
["Decision logic", "How every calculated column is derived, in words."],
["Platform reference", "The seven surfaces, what they run on, what they are best for."],
["References", "Cloud Adoption Framework sources, per stage."]].forEach(x => s0row(x[0], x[1]));
r0++;

s0h("Version and status");
s0row("What this is", "An independent decision framework and the author's own professional recommendations. It builds on publicly available Microsoft Cloud Adoption Framework guidance, which is linked at each stage. It is NOT official Microsoft guidance, NOT a Microsoft product, and NOT supported by Microsoft.");
s0row("Not professional advice", "Nothing here is legal, regulatory, clinical, privacy or financial advice. The assurance tiers and governance positions are the author's recommendations, not a compliance standard. Validate against your own obligations and take professional advice where those obligations apply.");
s0row("No commercial terms", "This workbook deliberately carries no licensing, pricing or entitlement information. Those are customer-specific, move quarterly, and are not this framework's to state. Confirm licensing, preview status and regional availability with Microsoft before any recommendation.");
s0row("Product claims", "The framework names capabilities. Where the workbook names a product, treat it as current-as-checked and confirm before rollout.");
s0row("No warranty", "Provided as is, without warranty of any kind. You are responsible for decisions made using it.");
s0row("Generated", new Date().toISOString().slice(0, 10));

/* =========================================================================
   REGISTER
   A ID  B Phase  C Use case  D What it does  E Area  F Requested by  G Status
   H Date  I Duplicate  J Desirability  K Feasibility  L Viability
   M Responsibility  N Stage0 total  O..S Stage1 tests  T Suggested  U Confirmed
   V Route  W Tier  X Rung  Y Lands on  Z Time  AA Quick win  AB Contract %
   ========================================================================= */
const sReg = buildSheet("Register", NAVY, [
  {
    band: "IDENTITY", colour: NAVY, cols: [
      { h: "ID", w: 9 },
      { h: "Phase", w: 10, list: R["Phase"] },
      { h: "Use case (one job, one owner, one risk profile)", w: 32 },
      { h: "What it actually does, in one sentence", w: 40 },
      { h: "Business area", w: 16 },
      { h: "Requested by", w: 14 },
      { h: "Status", w: 14, list: R["Status"] },
      { h: "Date reviewed", w: 12, num: "dd mmm yyyy" },
      { h: "Duplicate of / related to", w: 14, note: "Stage 0: deduplicate and complete the list before classifying anything." },
    ]
  },
  {
    band: "STAGE 0  BUSINESS PLAN (1-5 each)", colour: PURPLE, cols: [
      { h: "Desirability", w: 11, num: "0.0", f: r => `IF(Scoring!N${r}="","",ROUND(Scoring!N${r}/3,1))`, note: "The user desirability axis from the Scoring sheet, rescaled from its 3-15 range to 1-5 so all four Stage 0 lenses are comparable." },
      { h: "Feasibility", w: 11, num: "0.0", f: r => `IF(Scoring!M${r}="","",ROUND(Scoring!M${r}/3,1))`, note: "The technical feasibility axis from the Scoring sheet, rescaled from its 3-15 range to 1-5." },
      { h: "Viability", w: 11, num: "0.0", f: r => `IF(Scoring!L${r}="","",ROUND(Scoring!L${r}/3,1))`, note: "The business impact axis from the Scoring sheet, rescaled from its 3-15 range to 1-5." },
      { h: "Responsibility (1-5)", w: 12, num: "0", note: "Can we do this responsibly: safeguards, consent, disclosure, fairness. Scored here because CAF's nine sub-criteria do not cover it." },
      { h: "Stage 0 total (of 20)", w: 11, num: "0.0", f: r => `IF(COUNT(J${r}:M${r})<4,"",SUM(J${r}:M${r}))` },
    ]
  },
  {
    band: "STAGE 1  IS THIS AI AT ALL?", colour: BLUE, cols: [
      { h: "Language or judgement needed?", w: 13, list: R["Yes / No"] },
      { h: "Forecasting, scoring or matching?", w: 13, list: R["Yes / No"] },
      { h: "Multi-step decisions?", w: 12, list: R["Yes / No"], note: "CAF positive test 1: reads, evaluates, decides, checks its own work." },
      { h: "Many tools or systems?", w: 12, list: R["Yes / No"], note: "CAF positive test 2: chooses which API, when, and how to combine results." },
      { h: "Adaptive to messy input?", w: 12, list: R["Yes / No"], note: "CAF positive test 3: interprets intent from incomplete or unclear input." },
      {
        h: "Suggested category", w: 18,
        f: r => `IF(COUNTBLANK(O${r}:S${r})>0,"",IF(P${r}="Yes","Predictive or optimisation",IF(O${r}="No","Automation",IF(AND(Q${r}="Yes",R${r}="Yes",S${r}="Yes"),"Agent",IF(AND(Q${r}="No",R${r}="No"),"Retrieval","LLM-augmented workflow")))))`
      },
      { h: "Category (confirmed)", w: 18, list: R["Stage 1 category"], note: "Leave blank to accept the suggestion. Anything typed here overrides it, and Stage 5 and Answers out follow the override." },
      {
        h: "Route if it is not an agent", w: 30,
        f: r => `IF(U${r}="","",IF(U${r}="Automation","Power Automate, Logic Apps or code. No AI governance.",IF(U${r}="Predictive or optimisation","Fabric data science, Azure ML or a prebuilt Foundry model. Model governance, not agent governance.",IF(U${r}="Retrieval","SharePoint agent, Copilot Studio retrieval agent or classic RAG. Light governance.",IF(U${r}="LLM-augmented workflow","A flow with one AI action, or a scheduled prompt. Governance proportional to consequence.","Agent. Continue to Stage 2.")))))`
      },
    ]
  },
  {
    band: "ROLLUP (calculated)", colour: "FF3F3F3F", cols: [
      { h: "Assurance tier", w: 15, f: r => `IF('Assurance and gate'!K${r}="","",'Assurance and gate'!K${r})` },
      { h: "Ladder rung", w: 15, f: r => `IF(${RUNG(r)}="","",${RUNG(r)})` },
      { h: "Lands on", w: 26, f: r => `IF('Technology direction'!H${r}="","",'Technology direction'!H${r})` },
      { h: "Time estimate", w: 20, f: r => `IF('Answers out'!K${r}="","",'Answers out'!K${r})` },
      { h: "Quick win?", w: 11, f: r => `IF('Answers out'!C${r}="","",'Answers out'!C${r})` },
      { h: "Contract complete", w: 12, num: "0%", f: r => `IF('Answers out'!N${r}="","",'Answers out'!N${r})` },
    ]
  },
], { freezeCols: 3 });
for (let r = FIRST; r <= LAST; r++) {
  const seeded = SEED["Register"] && SEED["Register"][r] && SEED["Register"][r][1];
  if (seeded !== undefined) continue;                       // dataset supplied its own ID
  if (DATA && SEED["Register"] && !SEED["Register"][r]) continue;  // sample: leave spare rows empty
  sReg.getCell(r, 1).value = "UC-" + String(r - FIRST + 1).padStart(2, "0");
}

/* =========================================================================
   OUTCOME CONTRACT  (Stage 2)
   A ID B Use case C result D metric E baseline F target G owner-build
   H owner-after I boundary J gate-proto K gate-pilot L gate-release
   M V1 N V2 O V3 P V4a Q V4b R V5 S V6 T benefit-type U hard/soft
   V hours W error-cost X captured% Y note
   ========================================================================= */
buildSheet("Outcome contract", TEAL, [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "THE CONTRACT  -  five things, all before anyone opens a product page", colour: TEAL, cols: [
      { h: "1 The result: an outcome with a number, not a feature", w: 36, note: "\"Fewer escalations reach HR\" is an outcome. \"A chatbot\" is not." },
      { h: "Metric that moves", w: 20 },
      { h: "Baseline today", w: 13, note: "Record today's baseline where the process already exists; estimate and refine where it does not." },
      { h: "Target", w: 13 },
      { h: "2 Owner: build", w: 16, note: "One accountable name, not a steering committee." },
      { h: "2 Owner: after go-live", w: 16, note: "Someone who can say it is working, or pull it back." },
      { h: "3 The boundary: what it will explicitly refuse to do", w: 34, note: "This becomes the agent charter: system responsibilities, agent roles, prohibited actions. Without it, agents evolve beyond their intended scope." },
      { h: "4 Gate: prototype", w: 20, note: "Business metrics as decision gates. Go or no-go on the data, not optimism." },
      { h: "4 Gate: pilot", w: 20 },
      { h: "4 Gate: release", w: 20 },
    ]
  },
  {
    band: "5 THE VALUE BASELINE  -  six measurements of the process as it runs today", colour: BLUE, cols: [
      { h: "V1 People doing this work today", w: 12, num: "#,##0", note: "The population term in any benefit calculation." },
      { h: "V2 Times per person per year", w: 12, num: "#,##0", note: "The frequency term, and the best predictor of whether this is worth doing at all." },
      { h: "V3 Minutes each time", w: 12, num: "#,##0.0", note: "Converts volume into hours." },
      { h: "V4a How often it goes wrong", w: 12, num: "0%", note: "The most commonly omitted benefit, and often the largest." },
      { h: "V4b Cost each time it goes wrong", w: 13, num: "#,##0.00", note: "Rework, escalation, delay, a complaint. Use the customer's own unit." },
      { h: "V5 Metric today", w: 16, f: r => `IF(E${r}="","",E${r})`, note: "Mirrors the baseline recorded in the contract. Without a starting number you cannot prove improvement." },
      { h: "V6 What happens to the time saved", w: 26, note: "The question finance will ask. Hours nobody can point to as redeployed capacity are a slide, not a benefit." },
      { h: "Benefit type", w: 20, list: R["Benefit type"] },
      { h: "Hard or soft", w: 11, list: R["Hard or soft"], note: "A case built only on soft benefits will be challenged. A case that ignores them will undersell the work. Name both." },
    ]
  },
  {
    band: "CALCULATED", colour: "FF3F3F3F", cols: [
      { h: "Annual hours in the process today", w: 14, num: "#,##0", f: r => `IF(COUNT(M${r}:O${r})<3,"",M${r}*N${r}*O${r}/60)` },
      { h: "Annual cost of getting it wrong", w: 14, num: "#,##0", f: r => `IF(COUNT(M${r},N${r},P${r},Q${r})<4,"",M${r}*N${r}*P${r}*Q${r})` },
      { h: "Value baseline captured", w: 12, num: "0%", f: r => `IF(B${r}="","",(6-COUNTBLANK(M${r})-COUNTBLANK(N${r})-COUNTBLANK(O${r})-COUNTBLANK(P${r})-COUNTBLANK(Q${r})-COUNTBLANK(S${r}))/6)` },
      { h: "Note", w: 34, note: "The framework assembles the numbers. It does not price them. Rates, licences and discounts are customer-specific and move quarterly - do the arithmetic elsewhere, dated, and only when a decision turns on it." },
    ]
  },
]);

/* =========================================================================
   EIGHT QUESTIONS  (Stage 3)
   A ID B Use case C Q1 D Q2 E Q2b F Q3-intended G Q3-pilot H Q4 I Q4-identity
   J Q5 K Q5-forces L Q6 M Q7 N Q7-sources O Q8a P Q8b
   Q ready-made R licences S memory T growth U source-change V retrieval-record
   ========================================================================= */
buildSheet("Eight questions", BLUE, [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "Q1-Q4  SHAPE, REACH AND IDENTITY", colour: BLUE, cols: [
      { h: "Q1 What starts it?", w: 20, list: R["Q1 What starts it"], note: "Four of the five are not a chat experience. Get Q1 wrong and everything downstream is wrong, expensively." },
      { h: "Q2 Where does the answer land?", w: 22, list: R["Q2 Where it lands"], note: "Argue for the top of the list. If the output arrives as a pre-filled field or a notification, there is nothing to adopt and no adoption curve." },
      { h: "Q2b Connectivity assumption", w: 14, list: R["Q2b Connectivity"], note: "Only meaningful for a frontline device. A tool that needs signal fails in a client's home - and that is the setting it was built for." },
      { h: "Q3 Intended reach", w: 14, list: R["Q3 Reach"], note: "Design for the destination. Tier 1 needs nothing from governance. Tier 3 is the first real boundary. Tier 5 brings risk and legal into the room." },
      { h: "Q3 Pilot reach", w: 14, list: R["Q3 Reach"], note: "Deploy at the pilot. Record intended and pilot reach separately." },
      { h: "Q4 Whose permissions?", w: 18, list: R["Q4 Permissions"], note: "An agent inherits the permissions that already exist. It does not repair them. Point one at a loose content estate and you have built a very efficient discovery engine for a problem you already had." },
      { h: "Q4 Identity of record", w: 16, note: "Every agent gets one identity, whatever its tier. For a Fabric operations agent this is the creator, not the approver - re-check it when that person changes role." },
    ]
  },
  {
    band: "Q5-Q8  DATA, CONNECTION AND CONSEQUENCE", colour: TEAL, cols: [
      { h: "Q5 What class of data?", w: 16, list: R["Q5 Data class"], note: "The only question that decides private networking, data location and retention." },
      { h: "Q5 What that forces", w: 34, f: r => `IF(J${r}="","",INDEX(Lists!$B$53:$B$56,MATCH(J${r},Lists!$A$53:$A$56,0)))` },
      { h: "Q6 What must it know or do?", w: 18, list: R["Q6 Know or do"], note: "Freshness is the discriminator, and it predicts your timeline. Static documents means weeks. Live system state means months." },
      { h: "Q7 Does the connection exist?", w: 18, list: R["Q7 Connection"], note: "If no, the row is integration-led. Have the integration conversation before the AI conversation." },
      { h: "Q7 Source systems", w: 20 },
      { h: "Q8a If it gives a wrong answer", w: 16, list: R["Q8a Wrong answer"], note: "Sets whether evaluations are mandatory, whether a human stays in the loop, and the minimum platform tier." },
      { h: "Q8b If it silently does nothing", w: 16, list: R["Q8b Silent failure"], note: "A missing alert is not a read-only risk. Where a silent failure affects a person, the tier lifts by one." },
    ]
  },
  {
    band: "RECORDED, BUT NOT QUESTIONS", colour: GREY, cols: [
      { h: "Ready-made agent available?", w: 13, list: R["Yes / No"] },
      { h: "Do these users have the licences?", w: 13, list: R["Yes / No"] },
      { h: "Needs memory between uses?", w: 13, list: R["Yes / No"], note: "Ephemeral session memory for transactional agents; persistent memory only for advisory ones." },
      { h: "Will it grow beyond 3-5 functions?", w: 13, list: R["Yes / No"], note: "The third of CAF's three multi-agent criteria. The other two come from Q3 and Q5." },
      { h: "How often the source changes", w: 16 },
      { h: "Retrieval decision record", w: 34, note: "Per data domain: how the agent gets its information and why. Policy documents: search over a governed index. Client status: MCP call. This is what makes an audit answerable later." },
    ]
  },
]);

/* =========================================================================
   ASSURANCE AND GATE  (Stage 4)
   A ID B Use case C Q8a D reach E band F base-tier G lift H floor I base-ord
   J final-ord K tier L meaning M approver N HITL-trigger O reject-exercised
   P..U gate1-6 V evidence W gate-status X registry Y cost-tag Z observability
   AA disclosure AB owner-leaves
   ========================================================================= */
const Q = "'Eight questions'!";
buildSheet("Assurance and gate", "FF005A9E", [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "THE TIER, WITH THE WORKING SHOWN", colour: "FF005A9E", cols: [
      { h: "Q8a consequence", w: 15, f: r => `IF(${Q}O${r}="","",${Q}O${r})` },
      { h: "Q3 intended reach", w: 12, f: r => `IF(${Q}F${r}="","",${Q}F${r})` },
      { h: "Reach band", w: 10, f: r => `IF(D${r}="","",IF(VALUE(LEFT(D${r},1))<=2,"1-2",IF(VALUE(LEFT(D${r},1))=3,"3","4-5")))` },
      { h: "Base tier from the matrix", w: 15, f: r => `IF(OR(C${r}="",E${r}=""),"",INDEX(Lists!$B$32:$D$34,MATCH(C${r},Lists!$A$32:$A$34,0),MATCH(E${r},Lists!$B$31:$D$31,0)))` },
      { h: "Q8b lift", w: 8, num: "0", f: r => `IF(F${r}="","",IF(${Q}P${r}="A person is affected",1,0))`, note: "Where a silent failure affects a person, lift the tier by one regardless of the read or write classification." },
      { h: "Q5 floor", w: 8, num: "0", f: r => `IF(F${r}="","",IF(${Q}J${r}="Regulated",3,1))`, note: "Regulated data never sits below Controlled pilot, whatever the reach." },
      { h: "Base ordinal", w: 9, num: "0", f: r => `IF(F${r}="","",MATCH(F${r},Lists!$A$37:$A$40,0))` },
      { h: "Final ordinal", w: 9, num: "0", f: r => `IF(I${r}="","",MIN(4,MAX(I${r}+G${r},H${r})))` },
      { h: "ASSURANCE TIER", w: 16, f: r => `IF(J${r}="","",INDEX(Lists!$A$37:$A$40,J${r}))` },
      { h: "What that means", w: 40, f: r => `IF(J${r}="","",INDEX(Lists!$C$37:$C$40,J${r}))` },
      { h: "Named approver", w: 16 },
      { h: "Human in the loop: the trigger condition", w: 30, note: "A specific condition triggers review, not 'sometimes'. The reviewer must see the reasoning, not just the final output." },
      { h: "Has reject ever been exercised?", w: 12, list: R["Yes / No"], note: "If your control has never once said no, it may not be a control." },
    ]
  },
  {
    band: "RELEASE GATE  -  no agent moves forward without passing", colour: AMBER, cols: [
      { h: "1 Accountable", w: 12, list: R["Gate status"], note: "Named business owner - named technical owner - intended users and purpose recorded" },
      { h: "2 Identifiable", w: 12, list: R["Gate status"], note: "In the organisational registry - one distinct identity - ownership and lifecycle status visible" },
      { h: "3 Constrained", w: 12, list: R["Gate status"], note: "Only required data and tools allowed - user-delegated or service identity explicitly chosen - external connections approved" },
      { h: "4 Tested", w: 12, list: R["Gate status"], note: "Success and failure criteria defined - security and adversarial testing completed - human intervention defined where required" },
      { h: "5 Observable", w: 12, list: R["Gate status"], note: "Activity, quality, access and cost monitored - logs retained according to policy - alerts routed to the appropriate operational team" },
      { h: "6 Recoverable", w: 12, list: R["Gate status"], note: "Kill switch or disable path - incident owner and escalation path - rollback, evidence preservation and review process" },
      { h: "Evidence / link", w: 24, note: "Turn governance policy into evidence that can be checked." },
      { h: "GATE STATUS", w: 14, f: r => `IF(COUNTA(P${r}:U${r})=0,"",IF(COUNTIF(P${r}:U${r},"Not met")>0,"Blocked",IF(COUNTIF(P${r}:U${r},"In progress")>0,"In progress",IF(COUNTA(P${r}:U${r})<6,"Incomplete","Passed"))))` },
    ]
  },
  {
    band: "CONTROL PLANE BASELINE  -  applies at every tier, including tier 1", colour: GREY, cols: [
      { h: "Registry entry", w: 11, list: R["Yes / No"], note: "You cannot govern agents you do not know exist." },
      { h: "Cost tag", w: 11, list: R["Yes / No"], note: "So token and compute spend can be allocated by department." },
      { h: "Observability", w: 11, list: R["Yes / No"], note: "So drift and emerging risk are visible." },
      { h: "AI involvement disclosed", w: 11, list: R["Yes / No"] },
      { h: "What happens when the owner leaves", w: 22 },
    ]
  },
]);

/* =========================================================================
   TECHNOLOGY DIRECTION  (Stage 5)
   A ID B Use case C suggested-rung D rung E why F suggested-verb G verb
   H lands-on I selected-by J product K date-checked
   L connectivity M unattended N locality O extensibility
   P shape Q model R memory S owning-team
   ========================================================================= */
const A = "'Assurance and gate'!";
buildSheet("Technology direction", TEAL, [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "LEVEL 1  THE LADDER  -  read assurance before category", colour: TEAL, cols: [
      {
        h: "Suggested rung", w: 16,
        f: r => `IF(${CAT(r)}="","",IF(OR(${CAT(r)}="Automation",${CAT(r)}="Predictive or optimisation"),"1 Not AI",IF(OR(${Q}J${r}="Regulated",${Q}O${r}="Real-world effect",${A}J${r}=4),"4 Pro-code",IF(AND(${Q}Q${r}="Yes",OR(${Q}L${r}="Nothing",${Q}L${r}="Static documents"),${A}J${r}<=2),"2 Ready-made","3 Low-code"))))`
      },
      { h: "Rung (confirmed)", w: 15, list: R["Ladder rung"], note: "Leave blank to accept the suggestion. Anything typed here overrides it, and every downstream column follows the override." },
      {
        h: "Why", w: 42,
        f: r => `IF(${RUNG_LOCAL(r)}="","",IF(${RUNG_LOCAL(r)}="1 Not AI","Not AI. Automation platform for fixed rules; Fabric data science or Azure ML for forecasting, scoring and matching.",IF(${RUNG_LOCAL(r)}="4 Pro-code","Assurance read before category: regulated data, a real-world effect or a full assurance tier escalates the direction regardless of how simple the category looked.",IF(${RUNG_LOCAL(r)}="2 Ready-made","A published agent covers the function. Adopt and configure. Capped at retrieval and task.",IF(${RUNG_LOCAL(r)}="3 Low-code","Low-code with governed connectors and built-in responsible AI. Low-code supports autonomous agents - do not climb a rung you do not need.","Full stack control. Only when compliance or customisation demands it.")))))`
      },
    ]
  },
  {
    band: "LEVEL 2  SELECT BY THE VERB", colour: BLUE, cols: [
      {
        h: "Suggested verb", w: 13,
        f: r => `IF(${Q}C${r}="","",IF(OR(${Q}C${r}="A system event",${Q}C${r}="A schedule",${Q}C${r}="Another agent"),"Monitor",IF(OR(${Q}F${r}="4 Enterprise",${Q}F${r}="5 External",${Q}J${r}="Regulated",${Q}O${r}="Real-world effect"),"Build",IF(AND(${Q}C${r}="A person is already working",${Q}D${r}="Inside the tool they have open",${Q}O${r}="Read only"),"Assist",IF(${Q}L${r}="Take an action","Delegate",IF(${Q}O${r}="Writes to a system","Control",IF(${Q}L${r}="Static documents","Specialize","Adapt")))))))`
      },
      { h: "Verb (confirmed)", w: 13, list: R["Verb"], note: "Leave blank to accept the suggestion. Monitor is the only machine-initiated verb, and the one most often missing from tool comparison charts. Act locally is never suggested automatically - select it when the work is local files, shell or browser." },
      { h: "Lands on", w: 26, f: r => `IF(${VERB_LOCAL(r)}="","",INDEX(Lists!$B$43:$B$50,MATCH(${VERB_LOCAL(r)},Lists!$A$43:$A$50,0)))` },
      { h: "Selected by", w: 40, f: r => `IF(${VERB_LOCAL(r)}="","",INDEX(Lists!$C$43:$C$50,MATCH(${VERB_LOCAL(r)},Lists!$A$43:$A$50,0)))` },
      { h: "Product (final)", w: 24, note: "Never recommend a preview product to a regulated customer as the plan. Name it as an option to watch, with the general availability position stated." },
      { h: "Date checked", w: 12, num: "dd mmm yyyy", note: "Date every product claim, and confirm before rollout." },
    ]
  },
  {
    band: "LEVEL 3  WHERE IT RUNS  -  hard constraints, or you discover them during a pilot", colour: PURPLE, cols: [
      { h: "Must work with no connectivity", w: 13, f: r => `IF(${Q}E${r}="","",IF(${Q}E${r}="Must work offline","Yes - rules out anything cloud-only",IF(${Q}E${r}="Intermittent","Partly - needs offline tolerance","No")))` },
      { h: "Must run while nobody is present", w: 13, f: r => `IF(${Q}C${r}="","",IF(OR(${Q}C${r}="A schedule",${Q}C${r}="A system event"),"Yes - rules out anything needing an interactive session","No"))` },
      { h: "Data must not leave the device or region", w: 14, f: r => `IF(${Q}J${r}="","",IF(OR(${Q}J${r}="Regulated",${Q}J${r}="Confidential"),"Yes - private networking, a stated data location, or local inference","No"))` },
      { h: "Must extend well beyond launch", w: 13, f: r => `IF(OR(${Q}F${r}="",${Q}G${r}=""),"",IF(VALUE(LEFT(${Q}F${r},1))>VALUE(LEFT(${Q}G${r},1)),"Yes - intended reach exceeds pilot reach","No"))` },
    ]
  },
  {
    band: "SHAPE OF THE BUILD", colour: GREY, cols: [
      { h: "Single or multi-agent", w: 22, list: R["Agent shape"], note: "Start multi-agent only if you cross a compliance boundary, multiple teams own separate domains, or growth beyond three to five functions is already planned. Otherwise test a single agent first: latency accumulates at every handoff and cost multiplies." },
      { h: "Model selection", w: 20, note: "Match model capability to task complexity. Smaller models for summarisation and routine work; reserve premium models for complex reasoning, which also carry stricter rate limits." },
      { h: "Memory", w: 18, f: r => `IF(${Q}S${r}="","",IF(${Q}S${r}="Yes","Persistent (advisory)","Ephemeral session (transactional)"))` },
      { h: "Owning team", w: 18, list: R["Owning team"], note: "Platform team owns the foundation and guardrails. Workload teams own the end-to-end lifecycle of specific agents. The AI Centre of Excellence advises and trains." },
    ]
  },
]);

/* =========================================================================
   PROVE AND OPERATE  (Stages 6 and 7)
   A ID B Use case C proto-start D proto-end E days F timebox G hardest-step
   H piloted I evaluated J redteam K control-run L release M ready
   N measure O current P as-at Q cadence R last-eval S staffed T triggers
   U last-audit V in-use W keep-retire X consumption
   ========================================================================= */
buildSheet("Prove and operate", PURPLE, [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "STAGE 6  BEFORE RELEASE", colour: PURPLE, cols: [
      { h: "1 Prototype start", w: 12, num: "dd mmm yyyy" },
      { h: "1 Prototype end", w: 12, num: "dd mmm yyyy", note: "Time-boxed to one or two weeks per candidate approach." },
      { h: "Days", w: 8, num: "0", f: r => `IF(COUNT(C${r}:D${r})<2,"",D${r}-C${r})` },
      { h: "Time-box respected?", w: 11, f: r => `IF(E${r}="","",IF(E${r}<=14,"Yes","No - over two weeks"))` },
      { h: "2 The hardest step (not the easiest)", w: 28, note: "Teams instinctively prototype the easiest step because it demos well, which proves nothing." },
      { h: "2 Hardest step piloted?", w: 11, list: R["Yes / No"] },
      { h: "3 Evaluated against the Stage 2 measure?", w: 12, list: R["Yes / No"], note: "Against the outcome measure, not a generic quality score. Store evaluations in a shared catalogue so every team applies the same standard." },
      { h: "4 Red team date", w: 12, num: "dd mmm yyyy", note: "Prompt injection, data leakage, jailbreak. Mandatory before production and after significant updates, not optional." },
      { h: "5 Has the control run for real?", w: 12, list: R["Yes / No"], note: "Release only once the Stage 4 control has run for real, not just in a test script." },
      { h: "Release date", w: 12, num: "dd mmm yyyy" },
      { h: "Ready to release?", w: 13, f: r => `IF(COUNTA(H${r},I${r},K${r})=0,"",IF(AND(H${r}="Yes",I${r}="Yes",K${r}="Yes",${A}W${r}="Passed"),"Yes","Not yet"))` },
    ]
  },
  {
    band: "STAGE 7  AFTER RELEASE", colour: TEAL, cols: [
      { h: "1 Outcome measure being monitored", w: 22, f: r => `IF('Outcome contract'!D${r}="","",'Outcome contract'!D${r})`, note: "Monitor the outcome measure, not uptime. Uptime tells you the lights are on, not that the number moved." },
      { h: "1 Current value", w: 12 },
      { h: "1 As at", w: 12, num: "dd mmm yyyy" },
      { h: "2 Re-evaluation cadence", w: 14, note: "On a schedule and after any material change. A system that passed in March has told you nothing about April." },
      { h: "2 Last re-evaluation", w: 12, num: "dd mmm yyyy" },
      { h: "3 Control staffed by", w: 16, note: "Keep the human control staffed, not just designed. A control with nobody watching it is a diagram." },
      { h: "4 Back-to-design triggers", w: 30, note: "A near miss, a change in reach tier, a new data source, a policy change. Decide these before they are needed, not while arguing about an incident." },
      { h: "5 Last estate audit", w: 12, num: "dd mmm yyyy", note: "Quarterly. Dormant agents consume quota and expand the attack surface." },
      { h: "5 Still in use?", w: 10, list: R["Yes / No"] },
      { h: "5 Keep or retire", w: 12 },
      { h: "Consumption review note", w: 20, note: "Monthly. Find agents using premium models for simple tasks." },
    ]
  },
]);

/* =========================================================================
   ANSWERS OUT
   A ID B Use case C quick-win D why-not E tier F integration-led
   G tools H skills I dev J ops K time L support M info-required N contract%
   ========================================================================= */
const T = "'Technology direction'!";
const OC = "'Outcome contract'!";
buildSheet("Answers out", "FF3F3F3F", [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "1  QUICK WIN AND FEASIBILITY", colour: BLUE, cols: [
      {
        h: "Quick win?", w: 11,
        f: r => `IF(OR(${CAT(r)}="",${Q}F${r}="",${Q}J${r}="",${Q}L${r}="",${Q}M${r}="",${Q}O${r}=""),"",IF(AND(${CAT(r)}<>"Agent",VALUE(LEFT(${Q}F${r},1))<=2,${Q}O${r}="Read only",OR(${Q}J${r}="Public",${Q}J${r}="Internal"),OR(${Q}L${r}="Nothing",${Q}L${r}="Static documents"),${Q}M${r}="Yes, in production"),"Quick win","No"))`,
        note: "A quick win is: not an agent, reach tier 1-2, read only, internal-or-below data, a static source, and a connection that already exists."
      },
      {
        h: "Why not (the first failing test)", w: 32,
        f: r => `IF(C${r}<>"No","",IF(${CAT(r)}="Agent","It is an agent",IF(VALUE(LEFT(${Q}F${r},1))>2,"Reach is tier 3 or above",IF(${Q}O${r}<>"Read only","It is not read only - "&${Q}O${r},IF(OR(${Q}J${r}="Confidential",${Q}J${r}="Regulated"),"Data class is "&${Q}J${r},IF(OR(${Q}L${r}="Live system state",${Q}L${r}="Take an action",${Q}L${r}="Analytical data"),"The source is not static - "&${Q}L${r},IF(${Q}M${r}<>"Yes, in production","The connection does not exist in production","")))))))`
      },
      { h: "Assurance tier", w: 15, f: r => `IF(${A}K${r}="","",${A}K${r})` },
      { h: "Integration-led?", w: 13, f: r => `IF(${Q}M${r}="","",IF(${Q}M${r}="No","Yes - programme work, not a quick win","No"))` },
    ]
  },
  {
    band: "2-3  TOOLS AND SKILLS", colour: TEAL, cols: [
      {
        h: "Tools required", w: 36,
        f: r => `IF(${RUNG(r)}="","",${RUNG(r)}&IF(${T}H${r}=""," "," - "&${T}H${r})&IF(${Q}J${r}="Regulated"," - constrained by regulated data: a stated data location and private networking",IF(${Q}J${r}="Confidential"," - constrained by confidential data: an explicit DLP policy and a named retention period","")))`
      },
      {
        h: "Skills and roles required", w: 34,
        f: r => `IF(${RUNG(r)}="","",IF(${RUNG(r)}="1 Not AI","Automation or data platform team",IF(${RUNG(r)}="2 Ready-made","Workload team plus a Microsoft 365 administrator",IF(${RUNG(r)}="3 Low-code","Workload team, a Copilot Studio maker, and the Platform team for connectors and DLP","Platform team, pro-code engineers, AI security and evaluation")))&IF(${A}J${r}>=3," - plus AI Centre of Excellence review",""))`
      },
    ]
  },
  {
    band: "4-6  COST AND TIME", colour: AMBER, cols: [
      {
        h: "Development effort", w: 30,
        f: r => `IF(${RUNG(r)}="","",IF(${RUNG(r)}="1 Not AI","Configuration: days to weeks",IF(${RUNG(r)}="2 Ready-made","Configure and adopt: one to three weeks",IF(${RUNG(r)}="3 Low-code","Low-code build: three to eight weeks",IF(${RUNG(r)}="4 Pro-code","Pro-code build: two to six months","Platform build: six months or more"))))&IF(${Q}M${r}="No"," - integration-led, and the integration conversation comes first",""))`
      },
      {
        h: "Operations effort", w: 34,
        f: r => `IF(${A}J${r}="","",IF(${A}J${r}=1,"Standard guardrails only",IF(${A}J${r}=2,"Named owner spot-checks, plus platform monitoring",IF(${A}J${r}=3,"Measured pilot, scheduled re-evaluation and a decision gate","A staffed human control that recurs every time the process runs, monitoring, scheduled evaluation and a route to a person")))&" - plus licences, credits and the monthly consumption review")`
      },
      {
        h: "Time estimate", w: 22,
        f: r => `IF(OR(${Q}L${r}="",${Q}M${r}=""),"",IF(${Q}M${r}="No","Months - integration-led",IF(OR(${Q}L${r}="Live system state",${Q}L${r}="Take an action"),"Months",IF(${Q}L${r}="Analytical data","Weeks to months",IF(${A}J${r}=4,"Weeks, plus a full assurance cycle","Weeks")))))`,
        note: "Q6 freshness plus Q7 connection plus the Stage 4 tier. Static and an existing connection means weeks. Live state or no connection means months."
      },
    ]
  },
  {
    band: "7-8  SUPPORT, AND WHAT WE NEED BACK", colour: RED, cols: [
      {
        h: "Microsoft support", w: 30,
        f: r => `IF(${RUNG(r)}="","",IF(${RUNG(r)}="1 Not AI","Automation or Fabric guidance",IF(${RUNG(r)}="2 Ready-made","Ready-made agent enablement and an adoption workshop",IF(${RUNG(r)}="3 Low-code","Copilot Studio enablement, plus a partner for connectors","An architecture design session, plus a partner for the build")))&IF(${A}J${r}=4," - plus a responsible AI review",""))`
      },
      {
        h: "Additional information required from the customer", w: 56,
        f: r => `IF(B${r}="","",IF(${OC}C${r}="","The result, stated as an outcome with a number. ","")&IF(${OC}E${r}="","Baseline today. ","")&IF(${OC}F${r}="","Target. ","")&IF(${OC}G${r}="","Owner for the build. ","")&IF(${OC}H${r}="","Owner after go-live. ","")&IF(${OC}I${r}="","The boundary: what it will refuse to do. ","")&IF(COUNTBLANK(${OC}M${r})>0,"V1 how many people do this work today. ","")&IF(COUNTBLANK(${OC}N${r})>0,"V2 how often it happens. ","")&IF(COUNTBLANK(${OC}O${r})>0,"V3 how long it takes each time. ","")&IF(COUNTBLANK(${OC}P${r})>0,"V4 how often it goes wrong and what that costs. ","")&IF(${OC}S${r}="","V6 what happens to the time saved. ","")&IF(${Q}J${r}="","Data classification. ","")&IF(${Q}M${r}="","Whether the connection already exists. ","")&IF(${Q}O${r}="","What a wrong answer costs. ","")&IF(AND(${Q}J${r}="Regulated",${Q}I${r}=""),"Consent and residency position. ",""))`,
        note: "The blanks are not gaps in our analysis. They are the customer's half of the contract, and naming them precisely is more useful than filling them with assumptions. The rows that come back filled in are the rows with a real owner."
      },
      {
        h: "Contract complete", w: 12, num: "0%",
        f: r => `IF(B${r}="","",(15-(IF(${OC}C${r}="",1,0)+IF(${OC}E${r}="",1,0)+IF(${OC}F${r}="",1,0)+IF(${OC}G${r}="",1,0)+IF(${OC}H${r}="",1,0)+IF(${OC}I${r}="",1,0)+COUNTBLANK(${OC}M${r})+COUNTBLANK(${OC}N${r})+COUNTBLANK(${OC}O${r})+COUNTBLANK(${OC}P${r})+IF(${OC}S${r}="",1,0)+IF(${Q}J${r}="",1,0)+IF(${Q}M${r}="",1,0)+IF(${Q}O${r}="",1,0)+IF(${Q}C${r}="",1,0)))/15)`
      },
    ]
  },
]);

/* =========================================================================
   SCORING
   A ID B Use case C-E impact F-H feasibility I-K desirability
   L impact-sum M feas-sum N desir-sum O total P rank Q note
   ========================================================================= */
buildSheet("Scoring", "FF4C5B7A", [
  { band: "USE CASE", colour: NAVY, cols: idCols() },
  {
    band: "BUSINESS IMPACT (1-5 each)", colour: NAVY, cols: [
      { h: "Executive strategy alignment", w: 13, num: "0", note: "If a use case does not support strategy, pause it early." },
      { h: "Business value (the four value areas)", w: 13, num: "0", note: "Reshape business processes - enrich employee experiences - reinvent customer engagement - accelerate innovation." },
      { h: "Change management timeframe", w: 13, num: "0" },
    ]
  },
  {
    band: "TECHNICAL FEASIBILITY (1-5 each)", colour: BLUE, cols: [
      { h: "Implementation and operation risks", w: 13, num: "0", note: "If you cannot name the risks you cannot manage them." },
      { h: "Sufficient safeguards", w: 13, num: "0", note: "Never advance a use case with unclear safeguards." },
      { h: "Technology fit with existing systems", w: 13, num: "0", note: "Poor alignment increases complexity and risk." },
    ]
  },
  {
    band: "USER DESIRABILITY (1-5 each)", colour: TEAL, cols: [
      { h: "Key personas understood", w: 13, num: "0" },
      { h: "Value proposition to the user", w: 13, num: "0", note: "Choose early use cases with motivated users." },
      { h: "Change resistance", w: 13, num: "0" },
    ]
  },
  {
    band: "AXES", colour: "FF3F3F3F", cols: [
      { h: "Business impact (of 15)", w: 12, num: "0", f: r => `IF(COUNT(C${r}:E${r})<3,"",SUM(C${r}:E${r}))` },
      { h: "Technical feasibility (of 15)", w: 12, num: "0", f: r => `IF(COUNT(F${r}:H${r})<3,"",SUM(F${r}:H${r}))` },
      { h: "User desirability (of 15)", w: 12, num: "0", f: r => `IF(COUNT(I${r}:K${r})<3,"",SUM(I${r}:K${r}))` },
      { h: "Total (of 45)", w: 11, num: "0", f: r => `IF(COUNT(L${r}:N${r})<3,"",SUM(L${r}:N${r}))` },
      { h: "Rank", w: 8, num: "0", f: r => `IF(O${r}="","",RANK(O${r},$O$${FIRST}:$O$${LAST}))` },
      { h: "Note", w: 40, note: "None of CAF's nine sub-criteria is cost. Two ideas can both score 12 out of 15 and be wildly different propositions. CAF scores desirability. It does not score affordability - the Stage 2 value baseline is what lets you separate them." },
    ]
  },
]);

/* =========================================================================
   DECISION LOGIC
   ========================================================================= */
const sD = wb.addWorksheet("Decision logic", { properties: { tabColor: { argb: "FF3F3F3F" } } });
sD.getColumn(1).width = 3; sD.getColumn(2).width = 28; sD.getColumn(3).width = 22; sD.getColumn(4).width = 96;
let rd = 2;
const dHead = t => { const c = sD.getCell(rd, 2); c.value = t; c.font = { name: FONT, size: 14, bold: true, color: { argb: NAVY } }; sD.mergeCells(rd, 2, rd, 4); rd += 2; };
const dCols = () => { ["Calculated column", "Lives on", "How it is derived"].forEach((h, i) => { const c = sD.getCell(rd, 2 + i); c.value = h; c.font = { name: FONT, size: 9, bold: true, color: { argb: WHITE } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } }; c.border = box; }); rd++; };
const dRow = (a, b, c) => {
  [a, b, c].forEach((v, i) => { const cell = sD.getCell(rd, 2 + i); cell.value = v; cell.font = { name: FONT, size: 9, bold: i === 0, color: { argb: i === 0 ? NAVY : "FF1F1F1F" } }; cell.alignment = { wrapText: true, vertical: "top" }; cell.border = box; });
  sD.getRow(rd).height = Math.max(16, Math.ceil(String(c).length / 92) * 13 + 6);
  rd++;
};
dHead("How every calculated column is derived");
dCols();
dRow("Suggested category", "Register", "Forecasting, scoring or matching = Yes gives Predictive. Otherwise language or judgement = No gives Automation. Otherwise all three CAF positive tests true (multi-step, many tools, adaptive) gives Agent. Otherwise multi-step and many tools both No gives Retrieval. Everything else is an LLM-augmented workflow.");
dRow("Confirmed beats suggested", "Register, Technology direction", "Three columns come in suggested and confirmed pairs: the Stage 1 category, the ladder rung and the verb. Leave the confirmed cell blank and the suggestion flows straight through to every downstream column, so nothing stalls. Type anything into the confirmed cell and the override wins everywhere. This is where human judgement enters the model: the suggestion is a default, not a decision.");
dRow("Stage 0 lenses", "Register", "Desirability, feasibility and viability are pulled from the three CAF axes on the Scoring sheet and rescaled from their 3-15 range to 1-5, so all four lenses carry equal weight. Responsibility is scored directly on the Register, because none of CAF's nine sub-criteria covers it. The total is out of 20.");
dRow("Annual hours in the process today", "Outcome contract", "V1 people x V2 times per person per year x V3 minutes, divided by 60. Blank unless all three are present. This is a fact about the current process, not a benefit claim.");
dRow("Annual cost of getting it wrong", "Outcome contract", "V1 x V2 x V4a error rate x V4b cost each time. The most commonly omitted benefit, and frequently the largest.");
dRow("Q5 what that forces", "Eight questions", "A straight lookup of the data class against the Q5 table on Lists. Q5 is the only question that decides private networking, data location and retention.");
dRow("Base tier from the matrix", "Assurance and gate", "Q8a consequence against the reach band from Q3 intended reach. Read only gives light touch, owner approves, controlled pilot. Writes to a system gives owner approves, controlled pilot, full assurance. Real-world effect gives controlled pilot, full assurance, full assurance.");
dRow("Assurance tier", "Assurance and gate", "The base ordinal, plus one if Q8b says a silent failure affects a person, then floored at three (controlled pilot) if Q5 is regulated, then capped at four. A read-only clinical assistant used by one person is not a light touch item.");
dRow("Gate status", "Assurance and gate", "Passed only when all six release-gate checks are answered and none is Not met or In progress. Any Not met gives Blocked. Fewer than six answers gives Incomplete.");
dRow("Suggested rung", "Technology direction", "Automation or predictive gives rung 1. Then assurance is read before category: regulated data, a real-world effect or a full assurance tier escalates to rung 4 regardless of how simple the category looked. A ready-made agent plus a static or no-knowledge source at tier 1-2 gives rung 2. Everything else is rung 3, low-code, which does support autonomous agents.");
dRow("Suggested verb", "Technology direction", "A system event, a schedule or another agent gives Monitor, the only machine-initiated verb. Enterprise or external reach, regulated data or a real-world effect gives Build. A person already working, inside the tool they have open, read only gives Assist. Take an action gives Delegate. Writes to a system gives Control. Static documents gives Specialize. Everything else is Adapt. Act locally is never suggested automatically: select it manually when the work is local files, shell or browser.");
dRow("Lands on", "Technology direction", "A lookup of the confirmed verb against the eight-verb table on Lists. Product names are volatile, so record the final product and the date it was checked in the two columns beside it.");
dRow("Level 3 constraints", "Technology direction", "Connectivity from Q2b, unattended running from Q1, data locality from Q5, extensibility from intended reach exceeding pilot reach. These are hard constraints you will otherwise discover during a pilot.");
dRow("Ready to release?", "Prove and operate", "Yes only when the hardest step was piloted, an evaluation exists against the Stage 2 measure, the control has run for real, and the Stage 4 release gate has passed.");
dRow("Quick win?", "Answers out", "Not an agent, reach tier 1-2, read only, public or internal data, nothing or static documents as the source, and a connection that already exists in production. Any single failure disqualifies it, and the next column names the first failing test.");
dRow("Time estimate", "Answers out", "No connection gives months and the row is integration-led. Live system state or take an action gives months. Analytical data gives weeks to months. Otherwise weeks, extended by a full assurance cycle where the tier demands it.");
dRow("Additional information required", "Answers out", "Concatenates the name of every blank Stage 2 contract cell, every blank value baseline measurement, and any blank Q1, Q5, Q7 or Q8a answer. This column is the deliverable back to the customer.");
rd++;
dHead("Three rules that are easy to get backwards");
dCols();
dRow("Read assurance before category", "Stage 5", "Branching on category first is how a clinical scribe gets correctly rated full assurance and is then still described as 'a flow with an AI action'. If the tier is controlled pilot or full assurance, the direction escalates regardless of category, and the row must not be described as a simple flow.");
dRow("Q8b is a separate failure", "Stage 4", "Rating only what the system does when it is wrong misses what happens when it quietly does nothing. A notification agent scores read only. The real risk is the missing alert, not the wrong one.");
dRow("Low-code reaches autonomous", "Stage 5", "CAF's published comparison shows Copilot Studio supporting autonomous agents, not just retrieval and task. Only the ready-made tier is capped. Teams routinely jump to pro-code for adaptive behaviour they could have had a rung lower, and pay for it in build cost and time.");

/* =========================================================================
   PLATFORM REFERENCE
   ========================================================================= */
const sP = wb.addWorksheet("Platform reference", { properties: { tabColor: { argb: TEAL } }, views: [{ state: "frozen", xSplit: 1, ySplit: 2 }] });
const PHEAD = ["Surface", "What it is for", "Runs", "Availability", "Extensibility", "Out of the box", "Best for"];
const PW = [28, 28, 18, 24, 28, 42, 40];
const PROWS = [
  ["Microsoft 365 Copilot", "Assist me in the flow of work", "Cloud", "Online", "Moderate. Extend through agents and connectors", "Work IQ, chat, and assistance in Word, Excel, PowerPoint, Outlook and Teams", "Quick Q&A, drafting, summarising, analysis, and in-app personal productivity"],
  ["Copilot Cowork", "Delegate outcomes across Microsoft 365", "Cloud", "Online; works while your device is closed", "High. Custom skills and plugins", "Plans and executes steps across email, calendar, Teams, files, Office artefacts, research and automations", "Long, multi-step cross-app work that should return a finished artefact or a completed action"],
  ["Declarative agent / Agent Builder", "Create a focused, reusable helper", "Cloud", "Online inside Microsoft 365 Copilot", "Low to moderate. Knowledge first; advanced actions need Studio or dev tools", "Fast no-code setup with instructions plus SharePoint, web and connector knowledge; easy internal sharing", "Onboarding, policy Q&A, coaching, and narrow domain assistants with a stable scope"],
  ["Copilot Studio - standard harness", "Control the conversation and workflow", "Cloud", "Online; multi-channel", "High. Topics, flows, connectors, APIs and MCP", "Knowledge, prompts, topics, branching, actions, analytics, governance and channel publishing", "Help desk, FAQ, guided support, and structured workflows where consistency matters"],
  ["Copilot Studio - agentic harness", "Automate adaptive business processes", "Cloud sandbox", "Online; internal or external", "Very high. Tools, skills, memory, agents and MCP", "Goal decomposition, recovery, native Office and PDF work, model choice, connected agents and monitoring", "Reasoning-heavy, document-intensive, multi-tool processes with exceptions and changing paths"],
  ["Microsoft Scout", "Let an agent work on my desktop", "Hybrid desktop and cloud", "Online required", "Very high. Local skills, shell, browser and subagents", "Local files, shell, browser automation, Microsoft 365 actions, Office artefacts, memory and automations", "Power-user or developer work needing local files, builds and tests, browser tasks, or background automation"],
  ["Microsoft Foundry + Foundry Local", "Build a custom agent product or platform", "Cloud or on-device", "Online, or offline with Foundry Local", "Maximum. Code, models, MCP, APIs and containers", "Prompt and hosted agents, model catalogue, toolboxes, identity, VNet, evaluation, tracing and observability", "Custom apps, production-scale agents, multi-agent systems, special protocols, or private offline use"],
];
const PN = PHEAD.length;
sP.mergeCells(1, 1, 1, PN);
const ph = sP.getCell(1, 1);
ph.value = "Capability comparison only. Licensing, cost and commercial terms are deliberately excluded - they are customer-specific, move quarterly, and are not this framework's to state. Confirm licensing, preview status and regional availability with Microsoft before any recommendation.";
ph.font = { name: FONT, size: 10, bold: true, color: { argb: WHITE } };
ph.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
ph.alignment = { indent: 1, vertical: "middle", wrapText: true };
sP.getRow(1).height = 30;
PHEAD.forEach((h, i) => {
  const c = sP.getCell(2, i + 1);
  c.value = h; c.font = { name: FONT, size: 9, bold: true, color: { argb: NAVY } };
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PAPER } };
  c.border = box; c.alignment = { wrapText: true, vertical: "bottom" };
  sP.getColumn(i + 1).width = PW[i];
});
sP.getRow(2).height = 30;
PROWS.forEach((row, ri) => {
  row.forEach((v, ci) => {
    const c = sP.getCell(3 + ri, ci + 1);
    c.value = v; c.font = { name: FONT, size: 9, bold: ci === 0, color: { argb: ci === 0 ? NAVY : "FF1F1F1F" } };
    c.border = box; c.alignment = { wrapText: true, vertical: "top" };
  });
  sP.getRow(3 + ri).height = 62;
});
[["Cowork and Scout do the same job in different places. Cowork is delegation to your tenant. Scout is delegation to your machine. If the work touches local files, a shell or a browser, it is Scout. If it touches your mail, calendar, Teams and documents, it is Cowork.", NAVY, 11],
["CAF's published comparison: ready-made SaaS agents support retrieval and task only. Copilot Studio supports retrieval, task and autonomous. Foundry and GPUs or containers support all three. Only the ready-made tier is capped - do not climb a rung to reach adaptive behaviour you could have had a rung lower.", TEAL, 13],
["Fabric has two agents and they are not interchangeable. The data agent answers questions a person asks, over lakehouse, warehouse, semantic model or KQL data, and takes no action. The operations agent evaluates continuously, watches an eventhouse or ontology for a condition, then messages a person in Teams with a recommended action that only runs when they approve it. The distinction is exactly Q1.", PURPLE, 15],
["Some surfaces listed here may be in preview or have limited regional availability. This table describes capability shape, not availability or entitlement. Treat every product name as current-as-checked and verify before relying on it.", GREY, 17]].forEach(x => {
  sP.mergeCells(x[2], 1, x[2], PN);
  const c = sP.getCell(x[2], 1);
  c.value = x[0];
  c.font = { name: FONT, size: 9, italic: true, color: { argb: x[1] } };
  c.alignment = { wrapText: true, vertical: "middle", indent: 1 };
  sP.getRow(x[2]).height = 34;
});

/* =========================================================================
   REFERENCES
   ========================================================================= */
const sRef = wb.addWorksheet("References", { properties: { tabColor: { argb: NAVY } } });
sRef.getColumn(1).width = 3; sRef.getColumn(2).width = 24; sRef.getColumn(3).width = 48; sRef.getColumn(4).width = 96;
sRef.getCell("B2").value = "Cloud Adoption Framework sources";
sRef.getCell("B2").font = { name: FONT, size: 14, bold: true, color: { argb: NAVY } };
const REFS = [
  ["Overall", "AI agents in the Cloud Adoption Framework", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/"],
  ["Stages 0, 1 and scoring", "Business plan for AI agents, and when not to use AI agents", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/business-strategy-plan"],
  ["Stage 2 and Stage 6", "Build and secure the process, define the agent charter, agent observability", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/build-secure-process"],
  ["Stage 3 - technology", "Technology plan", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy"],
  ["Stage 3 - data", "Data architecture plan, retrieval strategies and data placement", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/data-architecture-plan"],
  ["Stage 4", "Govern and secure AI agents across the organisation", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization"],
  ["Stage 4", "Responsible AI policies", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/responsible-ai-policies"],
  ["Stage 5", "Single agent or multiple agents", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents"],
  ["Stage 5 - Fabric", "Create and configure operations agents", "https://learn.microsoft.com/fabric/real-time-intelligence/operations-agent"],
  ["Stage 5 - Fabric", "Fabric data agent", "https://learn.microsoft.com/fabric/data-science/concept-data-agent"],
  ["Stage 7", "Integrate, manage and operate AI agents", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/integrate-manage-operate"],
  ["Across every stage", "Organisational readiness", "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organization-people-readiness-plan"],
];
["Stage", "Page", "Link"].forEach((h, i) => {
  const c = sRef.getCell(4, 2 + i);
  c.value = h; c.font = { name: FONT, size: 9, bold: true, color: { argb: WHITE } };
  c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } }; c.border = box;
});
REFS.forEach((row, ri) => {
  const r = 5 + ri;
  sRef.getCell(r, 2).value = row[0];
  sRef.getCell(r, 3).value = row[1];
  sRef.getCell(r, 4).value = { text: row[2], hyperlink: row[2] };
  [2, 3, 4].forEach(ci => {
    const c = sRef.getCell(r, ci);
    c.font = { name: FONT, size: 9, bold: ci === 2, color: { argb: ci === 4 ? BLUE : "FF1F1F1F" }, underline: ci === 4 };
    c.border = box; c.alignment = { wrapText: true, vertical: "top" };
  });
});
const rn = sRef.getCell(5 + REFS.length + 1, 2);
rn.value = "What is Microsoft's and what is ours. The eight questions, the five reach rungs, the assurance matrix, the eight verbs and the Q8b omission test are our packaging. That governance obligation changes with scope, that every agent needs a distinct identity, that adversarial testing is mandatory, that agents should sit in the tools people already use, and that low-code supports autonomous agents, are all Microsoft's published guidance.";
sRef.mergeCells(5 + REFS.length + 1, 2, 5 + REFS.length + 1, 4);
rn.font = { name: FONT, size: 9, italic: true, color: { argb: GREY } };
rn.alignment = { wrapText: true, vertical: "top" };
sRef.getRow(5 + REFS.length + 1).height = 46;

/* =========================================================================
   CONDITIONAL FORMATTING
   ========================================================================= */
function txtRule(text, argb, bg, priority) {
  return { type: "containsText", operator: "containsText", text: text, priority: priority || 1, style: { font: { color: { argb: argb }, bold: true }, fill: { type: "pattern", pattern: "solid", bgColor: { argb: bg } } } };
}
const GOOD = ["FF1E5B2E", "FFE6F4EA"], BAD = ["FF7A1E1E", "FFFBE4E4"], WARN = ["FF7A4A00", "FFFFF3E0"];
function cf(sheet, ref, rules) { wb.getWorksheet(sheet).addConditionalFormatting({ ref: ref, rules: rules }); }
cf("Register", `W${FIRST}:W${LAST}`, [txtRule("Full assurance", BAD[0], BAD[1], 1), txtRule("Light touch", GOOD[0], GOOD[1], 2)]);
cf("Register", `AA${FIRST}:AA${LAST}`, [txtRule("Quick win", GOOD[0], GOOD[1], 1)]);
cf("Assurance and gate", `K${FIRST}:K${LAST}`, [txtRule("Full assurance", BAD[0], BAD[1], 1), txtRule("Controlled pilot", WARN[0], WARN[1], 2), txtRule("Light touch", GOOD[0], GOOD[1], 3)]);
cf("Assurance and gate", `W${FIRST}:W${LAST}`, [txtRule("Blocked", BAD[0], BAD[1], 1), txtRule("Passed", GOOD[0], GOOD[1], 2), txtRule("In progress", WARN[0], WARN[1], 3)]);
cf("Answers out", `C${FIRST}:C${LAST}`, [txtRule("Quick win", GOOD[0], GOOD[1], 1)]);
cf("Answers out", `F${FIRST}:F${LAST}`, [txtRule("Yes - programme work", WARN[0], WARN[1], 1)]);
cf("Answers out", `K${FIRST}:K${LAST}`, [txtRule("Months", BAD[0], BAD[1], 1), txtRule("Weeks", GOOD[0], GOOD[1], 2)]);
cf("Prove and operate", `M${FIRST}:M${LAST}`, [txtRule("Not yet", WARN[0], WARN[1], 1), txtRule("Yes", GOOD[0], GOOD[1], 2)]);

wb.views = [{ activeTab: 1 }];
wb.xlsx.writeFile(OUT).then(() => console.log("Written: " + OUT));
