/* Worked sample data for the AI use case decision workbook v5.
   Two contrasting rows. Every name, number and system is invented.

   UC-01  Policy and procedure assistant  - what a genuine quick win looks like
   UC-02  Clinical visit scribe           - what one does not, and why, column by column

   Column numbers match the built sheets. Only input columns are set;
   every calculated column works itself out when Excel opens the file.

   Build:  node build-xlsx-v5.js "SAMPLE - AI Use Case Decision Workbook - v5.xlsx" ./sample-data.js
*/
const D = s => new Date(s + "T00:00:00");

module.exports = {
  title: "AI use case decision workbook  -  WORKED SAMPLE",
  subtitle:
    "Two illustrative rows, filled in end to end, so the method can be read without a customer in the room. Every name, number and system is invented. UC-01 is what a genuine quick win looks like. UC-02 is what one does not, and the workbook says why in each column rather than just asserting it. Delete both rows to use this as a live workbook.",

  sheets: {
    /* ---------------------------------------------------------------
       REGISTER
       1 ID  2 Phase  3 Use case  4 What it does  5 Area  6 Requested by
       7 Status  8 Date  9 Duplicate  13 Responsibility
       15-19 Stage 1 tests  21 Category confirmed
       --------------------------------------------------------------- */
    "Register": {
      3: {
        1: "UC-01",
        2: "Single",
        3: "Policy and procedure assistant",
        4: "Answers staff questions about internal policy by searching the approved policy library on SharePoint, and quotes the source document in every answer.",
        5: "People and Culture",
        6: "A. Whitfield, Head of HR Operations",
        7: "Approved",
        8: D("2026-09-04"),
        9: "",
        13: 5,
        15: "Yes", 16: "No", 17: "No", 18: "No", 19: "No",
        21: "Retrieval",
      },
      4: {
        1: "UC-02",
        2: "Single",
        3: "Clinical visit scribe",
        4: "A care worker speaks a summary at the end of a home visit; the agent drafts the clinical progress note, files it against the client record, and flags anything a clinician needs to review.",
        5: "Clinical Services",
        6: "Dr M. Ferreira, Clinical Director",
        7: "In discovery",
        8: D("2026-09-09"),
        9: "Related to UC-01 only in that both were labelled \"an AI assistant\" on the original list. Split at Stage 0.",
        13: 3,
        15: "Yes", 16: "No", 17: "Yes", 18: "Yes", 19: "Yes",
        21: "Agent",
      },
    },

    /* ---------------------------------------------------------------
       OUTCOME CONTRACT
       3 result 4 metric 5 baseline 6 target 7 owner-build 8 owner-after
       9 boundary 10-12 gates 13-17 V1-V4b 19 V6 20 benefit 21 hard/soft
       --------------------------------------------------------------- */
    "Outcome contract": {
      3: {
        3: "Cut policy questions reaching the HR inbox from 240 a month to under 100, within one quarter of release.",
        4: "Policy questions reaching the HR shared inbox each month",
        5: "240 a month",
        6: "Under 100 a month",
        7: "A. Whitfield",
        8: "D. Okonjo, HR Systems Lead",
        9: "Will not interpret an individual employment contract, will not comment on a live grievance, and will not answer anything the policy library does not cover. Says so and names the person to ask.",
        10: "Answers 20 seeded questions with the correct source document cited.",
        11: "30 staff over 4 weeks. At least 70 per cent rate the answer useful, and no incorrect citation.",
        12: "Inbox volume down 30 per cent, and the monthly spot check clean two months running.",
        13: 480,
        14: 6,
        15: 12,
        16: 0.08,
        17: 35,
        19: "Returned to HR advisers as casework time. Two advisers move off inbox triage onto the case backlog, which is the constraint the team actually feels.",
        20: "Time or cost released",
        21: "Hard",
      },
      4: {
        3: "Cut after-hours documentation from 45 minutes a shift to under 15, without the clinical note audit score falling.",
        4: "Documentation minutes per care worker per shift, and the monthly clinical note audit score",
        5: "45 minutes a shift. Audit score 82 per cent.",
        6: "Under 15 minutes, with the audit score no lower than 82 per cent",
        7: "Dr M. Ferreira",
        8: "",
        9: "Will not make a clinical assessment, will not change a care plan, will not record a medication administration, and will not file any note the care worker has not confirmed on screen.",
        10: "Transcribes 30 recorded visits with no clinical terminology errors in a clinician review.",
        11: "12 care workers, 4 weeks, across two regions including one with poor mobile coverage. Notes audited weekly.",
        12: "Audit score held, consent position signed off by Privacy, and zero notes filed without confirmation.",
        13: 620,
        14: 210,
        15: 45,
        16: 0.12,
        17: 60,
        19: "Returned to direct client contact. Measured against the board target of two extra client-facing hours per care worker per fortnight, not against headcount.",
        20: "Capacity redirected to the mission",
        21: "Soft",
      },
    },

    /* ---------------------------------------------------------------
       EIGHT QUESTIONS
       3 Q1  4 Q2  5 Q2b  6 Q3-intended  7 Q3-pilot  8 Q4  9 identity
       10 Q5  12 Q6  13 Q7  14 sources  15 Q8a  16 Q8b
       17 ready-made 18 licences 19 memory 20 growth 21 change-freq 22 record
       --------------------------------------------------------------- */
    "Eight questions": {
      3: {
        3: "A person asks",
        4: "Collaboration surface",
        5: "Always connected",
        6: "2 My team",
        7: "2 My team",
        8: "Acts as the user",
        9: "Entra Agent ID  agent-policy-assistant-prod",
        10: "Internal",
        12: "Static documents",
        13: "Yes, in production",
        14: "SharePoint Online, Policy Library site. No other source.",
        15: "Read only",
        16: "Nothing",
        17: "Yes", 18: "Yes", 19: "No", 20: "No",
        21: "Policies are reviewed annually. Roughly six documents change a quarter.",
        22: "Policy documents: retrieval over the governed SharePoint index, inheriting the document permissions that already exist. No tool calls and no write scope, so there is nothing else to record.",
      },
      4: {
        3: "A person is already working",
        4: "Frontline device",
        5: "Must work offline",
        6: "4 Enterprise",
        7: "2 My team",
        8: "Acts as the user",
        9: "Entra Agent ID  agent-clinical-scribe-nonprod. The production identity has not been issued.",
        10: "Regulated",
        12: "Take an action",
        13: "No",
        14: "AlayaCare client record system, and the mobile visit app. There is no write API to AlayaCare today.",
        15: "Writes to a system",
        16: "A person is affected",
        17: "No", 18: "No", 19: "No", 20: "Yes",
        21: "The client record changes continuously through the day.",
        22: "Clinical notes: MCP call to AlayaCare, write scope, care worker confirmation required before the write. No index of clinical content is created. Terminology list: retrieval over a governed index.",
      },
    },

    /* ---------------------------------------------------------------
       ASSURANCE AND GATE
       13 approver 14 HITL 15 reject-exercised 16-21 gate 22 evidence
       24 registry 25 cost-tag 26 observability 27 disclosure 28 owner-leaves
       --------------------------------------------------------------- */
    "Assurance and gate": {
      3: {
        13: "A. Whitfield",
        14: "Ten answers a month are spot checked against the source document. Any answer citing a superseded policy goes straight to the HR Systems Lead.",
        15: "Yes",
        16: "Met", 17: "Met", 18: "Met", 19: "Met", 20: "Met", 21: "Met",
        22: "Governance register entry GOV-2026-114",
        24: "Yes", 25: "Yes", 26: "Yes", 27: "Yes",
        28: "Ownership sits with the HR Operations Manager role, not the individual. Recorded on the registry entry.",
      },
      4: {
        13: "Clinical Governance Committee, chaired by Dr M. Ferreira",
        14: "Every note is confirmed on screen by the care worker before it is filed. Any note the agent flags as uncertain, and every note for a client on a restrictive practice plan, is queued for a clinician first.",
        15: "No",
        16: "Met", 17: "In progress", 18: "In progress", 19: "Not met", 20: "Not met", 21: "In progress",
        22: "Draft charter CG-2026-31. The privacy impact assessment has not started.",
        24: "No", 25: "Yes", 26: "No", 27: "Yes",
        28: "Not answered. On the agenda for the September clinical governance meeting.",
      },
    },

    /* ---------------------------------------------------------------
       TECHNOLOGY DIRECTION
       4 rung-confirmed 7 verb-confirmed 10 product 11 date-checked
       16 shape 17 model 19 owning-team
       --------------------------------------------------------------- */
    "Technology direction": {
      3: {
        4: "2 Ready-made",
        7: "Specialize",
        10: "Microsoft 365 Copilot declarative agent, grounded on the Policy Library SharePoint site",
        11: D("2026-09-08"),
        16: "Single agent",
        17: "Default model. Retrieval and citation only, with no complex reasoning, so there is no case for a premium model.",
        19: "Workload team",
      },
      4: {
        4: "4 Pro-code",
        7: "Build",
        10: "Microsoft Foundry, with Foundry Local under evaluation for on-device transcription where there is no signal. Both to be reconfirmed before any rollout decision.",
        11: D("2026-09-09"),
        16: "Single agent",
        17: "A premium model for the drafting step and a small model for the terminology check. Premium rate limits still to be tested against the 5pm shift-end peak, which is when nearly all of the load lands.",
        19: "Platform team",
      },
    },

    /* ---------------------------------------------------------------
       PROVE AND OPERATE
       3 proto-start 4 proto-end 7 hardest 8 piloted 9 evaluated 10 redteam
       11 control-run 12 release 15 current 16 as-at 17 cadence 18 last-eval
       19 staffed 20 triggers 21 audit 22 in-use 23 keep 24 consumption
       --------------------------------------------------------------- */
    "Prove and operate": {
      3: {
        3: D("2026-07-20"),
        4: D("2026-07-31"),
        7: "Questions that span two policies where the more recent one has to win. Not the single-policy lookups, which always demo well and prove nothing.",
        8: "Yes",
        9: "Yes",
        10: D("2026-08-14"),
        11: "Yes",
        12: D("2026-08-25"),
        15: "186 a month",
        16: D("2026-09-01"),
        17: "Quarterly, and after any restructure of the policy library",
        18: D("2026-09-01"),
        19: "D. Okonjo, HR Systems Lead",
        20: "A confidently wrong citation reaching a manager. The reach tier moving beyond HR. The policy library being restructured. Any change to the retention policy on the site.",
        21: D("2026-09-01"),
        22: "Yes",
        23: "Keep",
        24: "Well inside the seeded credit allocation. Nothing to review this month.",
      },
      4: {
        3: D("2026-09-14"),
        4: D("2026-09-25"),
        7: "Offline capture and later sync from a client home with no mobile signal. Not transcription accuracy, which already works on a desk and is not the risk.",
        8: "No",
        9: "No",
        11: "No",
        17: "Monthly once released, and after any model change",
        19: "Not yet staffed. This is the open item at the pilot gate.",
        20: "Any note filed without confirmation. A clinical terminology error reaching a client record. A change in the consent position. Extension beyond the two pilot regions. Any change to the data residency position.",
        22: "Yes",
      },
    },

    /* ---------------------------------------------------------------
       SCORING   3-5 impact   6-8 feasibility   9-11 desirability
       --------------------------------------------------------------- */
    "Scoring": {
      3: { 3: 4, 4: 4, 5: 5, 6: 5, 7: 5, 8: 5, 9: 4, 10: 4, 11: 5 },
      4: { 3: 5, 4: 5, 5: 2, 6: 2, 7: 2, 8: 1, 9: 4, 10: 5, 11: 3 },
    },
  },
};
