# Why idea lists stall

*[← Back to the guide](../README.md) · [Stage 0 →](01-stage-0-frame-the-list.md)*

---

Every organisation arrives at AI the same way: a list of ideas, and a question about which product to buy.

The list is usually genuine. Someone went and asked around, collected the frustrations, and wrote them down. That is real work and it deserves better than what usually happens next, which is that the list gets sorted into "quick wins" and "hard ones" on the basis of how simple each one *sounds*, and then a platform gets chosen for all of them at once.

Six months later there are two or three pilots that technically work and nobody opens.

## The four failure modes

They are individually survivable. Together they are why the list stalls.

### 1. Vague scope

One label covers three or four different jobs.

*"Build an HR assistant"* is not one build. It is:

| The job | Consequence if wrong | Who owns it |
| --- | --- | --- |
| **Explain a policy** | Someone is briefly misinformed | HR operations |
| **Look up my leave balance** | Personal data shown to the wrong person | HR systems |
| **Submit a leave request** | **A payroll correction** | Payroll |
| **Escalate a grievance** | Should never be automated at all | HR business partner |

Four jobs. Four risk profiles. Four owners. Possibly four different answers to *"is this even AI?"*

**Scored as one row, whatever you decide is wrong for at least three of them.** Set the bar for the payroll write and the policy lookup will never ship. Set it for the policy lookup and you have an unreviewed agent writing to payroll.

### 2. Product first

Name a tool before you understand the process and every idea becomes a chatbot, because chat is what people have seen.

Watch it happen to the leave balance. It is a number the system already knows and could put straight into a pre-filled field, or push as a notification. Decide *"it's a chatbot"* first and now it is something the employee has to open a window and ask for — you have added a step to a process that could have lost one.

**This is the most expensive of the four, because it is invisible.** Nothing goes obviously wrong. You get a perfectly good chat interface for a problem that never needed one, and the reason nobody uses it is not a quality problem you can fix with a better model.

### 3. No named owner

Ask *"who decides this is working?"* and see whether you get a person or a department.

A steering committee is not an owner. **An owner is one person who can say *"this is working"* — or pull it back.** Two names, ideally: one to carry the build, one to carry it after go-live. The second is the one people avoid, because it is a commitment measured in years rather than weeks.

There is a useful side effect here. A use case nobody will put their name against is a use case nobody is accountable for — and that tells you something about its priority before you have spent a day on it.

### 4. No cost of failure

Nobody defined what a wrong answer costs, so nobody can say when it is finished, or whether it is safe to ship.

Compare two failures of the *same* HR assistant. It states the wrong notice period: awkward, corrected in a conversation, no lasting damage. It submits leave against the wrong entitlement: now it is a payroll correction, possibly a pay run, possibly a conversation with a union.

Same system. Same wrong answer, roughly. **Completely different bar — and nobody set one.**

> This is why a pilot built in an afternoon is not enterprise ready. The reason is almost never build quality. It is that nobody defined the cost of a wrong answer, so nobody can define *done*.

## Why they compound

Each one makes the next harder to see. Follow the HR assistant through all four:

1. **Vague scope hides the differences.** While it is one row called "an HR assistant", nobody notices that one part of it writes to payroll. The risky quarter of the job is invisible inside the label.
2. **So nobody can set a bar.** You cannot say *"this needs a human check"* about a thing that is four things. Any bar you set is either too heavy for the policy lookup or too light for the payroll write.
3. **So nobody owns it.** Owners accept accountability against a standard. With no standard, being the owner means signing up for unlimited liability on something undefined — so people offer a department name instead of their own.
4. **So the decision defaults to the demo.** With no scope boundary, no bar and no owner, the only remaining basis for choosing is which option looked best in a room. Which is product-first, which is where you started.

The loop closes, and it closes quietly. Nothing in that sequence feels like a mistake while it is happening.

## The fix is sequencing

Not more governance. Not a better platform. **Order.**

Describe the work first — what starts it, where the answer lands, how far it reaches, whose permissions, what data, what it must know, whether the connection exists, what happens when it is wrong — and the technology becomes a *consequence* of those answers rather than an assumption you started with.

That is the whole idea. Eight questions, none of which names a product, that between them determine the platform, the retrieval pattern, the identity model, the network topology and the assurance bar.

> The point is not that product choice does not matter. It is that product choice is *derivable*, and arguing about it before you have the inputs is how organisations spend a quarter to arrive at a chatbot.

## What this framework will and will not do

**It will:**

- Sort a list of any length into what ships now, what needs work, and what is programme work wearing a quick-win label
- Tell you which ideas are not AI at all — usually a surprising share, and they ship faster and carry no AI governance burden
- Set a proportionate governance bar per idea, so that low-risk things actually ship
- Assemble every term you need for a cost-benefit, one per stage
- Name precisely what is still missing, per row

**It will not:**

- Price anything. Rates, licences, discounts and entitlements are customer-specific and move quarterly. Put them in a framework and it is wrong within a quarter, in front of a customer. The framework assembles the terms; you do the arithmetic elsewhere, dated, and only when a decision turns on it.
- Choose between two options that are genuinely equivalent. Some rows are a judgement call, and the framework's job there is to make it *obvious* that it is a judgement call rather than hiding it in a score.
- Survive product renames. See [the note on product names](../README.md#a-note-on-product-names).

---

*Next: [Stage 0 — Frame the list](01-stage-0-frame-the-list.md)*

---

> **Disclaimer.** This page reflects the author's own recommendations, not Microsoft's official guidance. Microsoft source material is linked at the top and remains authoritative where the two differ. Nothing here is legal, regulatory or professional advice. See [DISCLAIMER.md](../DISCLAIMER.md).
