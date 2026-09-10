# Appendix A — The verb card

*[← Running it over a list](09-running-it-over-a-list.md) · [Appendix B →](appendix-b-workbook.md)*

---

**A one-page reference card.** The fastest way to run [Stage 5 Level 2](06-stage-5-technology-direction.md#level-2--select-by-the-verb) in a room, and designed to be lifted out as a single slide or a printed card.

## How to use it in a workshop

**Do not ask a business owner which platform they want.**

Ask which **sentence** sounds most like what they are asking for. They will answer in about five seconds, and you will have done Stage 5 Level 2 without anyone naming a product.

## The card

| Verb | The sentence they would actually say | Selected by | Lands on |
| --- | --- | --- | --- |
| **— none —** | *"It's the same steps every time, no judgement needed."* | Stage 1 gate: deterministic or predictive | Automation platform · or data science for forecasting |
| **Assist** | *"Help me while I'm doing this."* | Q1 person already working · Q2 in the tool they have open · Q8a read only | In-flow assistant |
| **Delegate** | *"Go and do this, come back when it's done."* | Q1 person asks · Q6 act across several surfaces · returns a finished artefact | Tenant-side delegation |
| **Monitor** | *"Watch this and tell me when something happens."* | **Q1 system event or schedule** · Q6 live system state · Q2 no interface | Operations agent |
| **Specialize** | *"Make something my team can ask, over and over."* | Q1 person asks · Q6 static documents · Q3 team or function · scope stays stable | Declarative agent · data agent for data questions |
| **Control** | *"Every time this happens, follow these steps exactly."* | Q8a writes to a system · consistency matters · needs branching, analytics, publishing | Low-code standard harness |
| **Adapt** | *"Work it out. It's different every time."* | Reasoning-heavy · multi-tool · exceptions are normal · the path is not fixed | Low-code agentic harness |
| **Act locally** | *"Do it on my machine, with my files."* | Q2 local files, shell or browser · Q5 data that should not leave the device | Desktop agent |
| **Build** | *"Make this a product other people depend on."* | Q3 tier 4–5 · Q5 regulated · Q8a real-world effect · needs evaluation, tracing, VNet | Pro-code platform |

> **Seven of these nine rows assume a person starts the work.** Only **Monitor** and **— none —** are machine-initiated, and between them they will claim more of a real customer list than anyone expects.
>
> **Ask Q1 before reaching for this card.**

## The traps

Each verb has one characteristic way of being got wrong. Worth saying out loud, because every one of them appears somewhere on a real list.

| The trap | What it sounds like | What it actually is |
| --- | --- | --- |
| **Everything is a chatbot** | *"Build us an HR bot"* | Usually **Specialize**, sometimes four separate jobs, occasionally **— none —** |
| **Delegate mistaken for Assist** | *"It can already do that"* | If the person has to stay and drive each step, it is **Assist**, and the hours are not saved |
| **Control mistaken for Adapt** | *"It needs to be intelligent"* | If the steps are the same every time, **Control** is cheaper, faster and auditable. Reserve Adapt for genuine exceptions |
| **Adapt mistaken for Build** | *"That sounds like a pro-code job"* | Low-code supports autonomous agents. **Do not climb a rung you do not need** |
| **Act locally mistaken for Delegate** | *"Just have it do it in the background"* | If it touches local files, a shell or a browser, **the tenant cannot reach it** |
| **Build chosen first** | *"We should build it properly"* | Build is the destination, not the starting point. Time-box a prototype on the rung below first |
| **Monitor never considered** | *"Who's going to check that?"* | If the answer is *"someone remembers to look"*, the verb is **Monitor** and nobody has said so |
| **Monitor mistaken for a dashboard** | *"We'll put it on a report"* | A dashboard waits to be opened. **Monitor comes and finds you.** Q8b decides which you need |

## The two questions behind all of them

If the card is unavailable and you need to reason from first principles:

1. **How much of the loop does the person stay in?**
   Assist keeps them in every step. Delegate and Act locally let them leave and return to a result. Build does it for other people entirely.

2. **Where does the work happen?**
   In the app they have open · in the tenant · on their machine · in a product other people depend on.

Those two axes place every verb, and **they survive product renames.**

## The one caveat

**Verbs are stable. Product names are not.**

The left three columns of this card should outlive several rounds of renaming. The right-hand column will not.

In a customer deck, show **the verbs and the sentences**. Put the product column only in the dated workbook, with the date it was checked and an instruction to confirm licensing, preview terms and regional availability before rollout.

---

*Next: [Appendix B — The workbook](appendix-b-workbook.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
