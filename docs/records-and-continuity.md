# Records and continuity

The governing source is [Standard 11](../constitutional/BILL_OF_STANDARDS.md#standard-11-memory-and-continuity), together with the Constitution's [persistence and continuity](../constitutional/CONSTITUTION.md#5-persistence-and-continuity) provisions. This guide organizes the records that make that contract usable.

Current state and history answer different questions. Keep each clear enough to use.

| Record | Responsibility | How it changes |
|---|---|---|
| [Project and architecture](../templates/project.md) | Present purpose, responsibilities, sources and relationships. | Update when the actual project changes. |
| [Work](../templates/work.md) | Current outcome, owner, dependencies, acceptance, evidence and next action. | Update the current view; retain material changes and their reasons. |
| [Decision](../templates/decision.md) | A consequential choice, its source, alternatives considered where useful, and effective scope. | Append a new decision to amend or supersede an earlier one. |
| [Evidence](../templates/evidence.md) | The input, method, observation and limited claim a result supports. | Preserve the observation; add a later result or correction separately. |
| [Finding](../templates/finding.md) | A discovered failure or useful lesson and the change it calls for. | Retain the finding and record its disposition. |
| [Handoff](../templates/handoff.md) | The state another person or session needs to continue. | Refresh at transition, with links to the owning records and unresolved effects. |

## Correct history without losing it

An accepted historical entry remains unchanged. A correction is a new entry naming the earlier record, what changed and why. The current view points to the effective decision so a reader does not have to traverse the entire history to act.

For example, `DEC-014` might select a storage format. Later evidence can justify `DEC-021`, which supersedes it for new writes and states how existing records migrate. Both decisions remain attributable. Editing the old choice to look like the new one would erase the reason the migration exists.

Keep identifiers within their owning context. Two projects can both have a decision numbered `DEC-014`; references across them must identify the project and record, not only the short number. A renamed repository or squashed commit can also preserve the same delivered work. Preserve the correspondence without counting the delivery again.

## Record enough to change the next action

Preserve the original intent and useful qualifications. Distinguish a settled choice, an exploratory suggestion, an observation and an inference. Repetition does not turn a proposal into an adopted decision.

Link the source rather than pasting the same account into every file. A work summary should name its decision and evidence records. An architecture page should identify the responsible implementation. A handoff should point to the current work and explain what needs attention.

Check that an important record actually landed. Read the saved diff or relevant bytes before reporting that a decision, handoff or delivery was recorded. Tool success alone is weaker evidence than the saved result.

## Continue after an interruption

A useful handoff retains the complete objective, current owner, accepted decisions, source revisions, working changes, active contributions, evidence, outstanding dependencies and next eligible action. Name uncertain effects and active processes that require reconciliation. Keep private operational coordinates in the project's private state.

The successor reads those sources and checks what changed since the handoff. It continues the same mandate unless the responsible person changes it. A child that finishes during the transition retains its parent relationship; unfinished siblings and separate project obligations remain visible.

Use the [handoff template](../templates/handoff.md). It is a transfer of working context, not a replacement authority, a new project or a reason to reproduce every completed check.

## Keep records proportionate

One current source document per subject is usually enough. Markdown remains editable, diffable and linkable. Produce another format when its actual use warrants it. Generated exports, raw traces and local caches have separate purposes and need not become the project's primary documentation.

Retain history that explains a decision, reproduces a result or supports recovery. Index it where needed. Routine noise can be pruned under the owning retention policy once its dependencies and value are understood.
