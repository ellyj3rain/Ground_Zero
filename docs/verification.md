# Verification that follows the work

The canonical rule is [Standard 6: Verification and evidence applicability](../constitutional/BILL_OF_STANDARDS.md#standard-6-verification-and-evidence-applicability). This guide shows how to select and interpret evidence without creating another verification policy.

Start with the claim, the changed inputs and the uncertainty that matters. Choose evidence that can answer that question.

## Different observations establish different things

| Observation | What it can establish |
|---|---|
| Source inspection | The selected code or document contains a mechanism or statement. |
| Unit or contract check | The selected implementation satisfies the exercised cases and assumptions. |
| Build | The selected inputs produce an artifact in the recorded environment. |
| Installation or receiving | A particular consumer selected a particular artifact or source revision. |
| Applied use | The intended behavior occurred through the real receiving path. |
| User assessment | The result serves the person's practical or qualitative purpose. |

Choose the relevant layers for the change. A documentation correction can be verified by its exact diff and resolved references. A storage or concurrency change needs evidence at the affected operation boundary. A successful build alone does not establish that the installed application changed.

The [evidence template](../templates/evidence.md) names the source, inputs, environment, command or observation, result, claim and remaining limits. Keep failed, incomplete, skipped and unobservable results distinct.

## Reuse evidence with its provenance

A result remains useful while the inputs and assumptions that matter to it remain applicable. Identify which contracts and dependencies changed. Invalidate the affected coverage and keep the rest with its original source and method.

Suppose a UI label changes while the document-writing engine and its dependency versions remain byte-identical. Check the label and the route that renders it; the existing engine result can remain applicable. If the save format or writer changes, the earlier saved-file result does not prove the new path. Reuse is a reasoned correspondence, not a blanket exemption.

Run inexpensive checks early. Broaden to integration or full suites when changed interfaces, unresolved uncertainty, mandatory project policy or actual risk warrants them. A commit or publication event does not itself change the implementation under test. An equivalent active CI run should be followed to its result, rather than duplicated merely to produce another receipt.

## Make tests answer a real question

Test behavior and failure boundaries. Include detecting controls when they matter: remove or alter the mechanism and check that the case notices. A test that only restates the implementation can pass while the intended contract is absent.

Use representative applied cases before expanding synthetic combinations. Compiler, network, persistence and low-level execution work can justify deeper investigation. Test count is not a completion measure. The useful question is which material uncertainty the next check resolves.

After a correction, rerun the affected cases. Expand further when the failure reveals broader shared behavior. Keep the original failed observation and the corrected result; do not rewrite the earlier result into success.

## Review the receiving boundary

At integration, name the selected producer and consumer revisions. Update imports, build inputs, loaders, configuration and user navigation together where the change requires it. Verify that the consumer actually reaches the intended implementation.

A copied source file, renamed module, generated binary or receipt in another view does not prove adoption. Match the evidence to the actual application, process, route or artifact whose behavior the person asked to change.

Stop adding checks once sufficient evidence resolves the selected delivery question. Record the result and continue delivery or the parent's next obligation. The purpose of verification is confidence in useful work, not the accumulation of activity.
