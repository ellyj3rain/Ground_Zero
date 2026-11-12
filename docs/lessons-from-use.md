# Lessons from use

Ground Zero changed through failures in its own development. The examples here summarize established historical findings. Names and operational details are omitted; the mechanisms and lessons remain. These observations do not establish a general productivity percentage or prove that every project needs the same procedures.

## A recorded edit was not in the saved result

An edit operation reported success for a delivery record, but the expected entry was absent from the saved and staged file. A later check found the omission. The missing entry was restored through a forward correction so the historical record remained honest.

The useful change was small: read back the relevant diff or saved entry before claiming the record exists. This matters during a long project because a successor may rely on the record to determine what shipped. A polished handoff cannot recover a fact that was never actually retained.

The public [handoff](../templates/handoff.md) and [evidence](../templates/evidence.md) forms therefore name concrete source and result references. They do not treat a successful editing tool response as the final observation.

## An implementation outgrew its first repository

An implementation that began inside the standards repository developed into an independent project. It needed its own source, version line, release checks and continuing work. During the transition, a copy remained in the original tree. The current documentation and the filesystem no longer gave the same answer about where implementation belonged.

Several practices had to work together. The repository relationship named the independent source owner. Release records kept the new project's history and numbering distinct from the standards line. Verification checked the actual receiving and CI paths. A later source cleanup classified the embedded copy, experiments and debug outputs by their current value, then physically moved historical material out of the active source positions. Its index retained the original locations and the reasons for the move.

| Problem during the transition | Mechanism used | Observed change |
|---|---|---|
| An old in-repository copy looked current. | Explicit source ownership and physical archive placement. | The current source was identified in the independent project; the earlier copy remained available as historical evidence. |
| Shared standards and a project's release history could be confused. | Separate repository records, versions and receiving contracts. | Each line kept its own development and delivery identity while the standards relationship remained documented. |
| A check worked from one directory but failed in CI. | Follow the actual failure to the spawned command and resolve the tool relative to its source. | The corrected check passed from both recorded working directories. |
| A policy update left the old tree in place. | Compare the declared structure with the real files, then complete the move. | The active root and its indexes reflected the intended source-value boundaries. |

This is one way Ground Zero supported sustained work: the implementation could continue in its own repository without making every successor rediscover which copy was current or which project owned a release. The standards repository could evolve its practices without becoming another implementation mirror. Earlier source and decisions remained available to explain how the separation happened.

The relationship also worked in the other direction. A later comparison found a developed runtime checking consequential creation before the action, while the older standards registration described an advisory check afterward. The evidence policy had a reciprocal mismatch: the fuller current rule was not consistently reflected in the engine's shorter declarations. The public constitutional core receives the pre-action creation contract and complete evidence-applicability rule from that comparison. The engine retains responsibility for receiving and demonstrating its corresponding implementation. Neither side becomes correct merely by being newer.

The evidence supports that concrete reorganization, the recorded command-path repair and the later source-correspondence findings. It does not prove that every consumer was integrated, that all inherited work was finished, or that the change produced a measured speedup.

For a similar transition, identify the current source and owners first. Preserve the original history, establish the receiving relationship, update imports and tool paths, verify the actual consumer, and make the filesystem agree with the account. Keep unfinished obligations with their original projects. [Repository structure](repository-structure.md) describes the reusable boundary.

## A helper and its governing policy disagreed

A version helper once removed a pre-release suffix when computing the next value, while the corresponding check expected the suffix to survive. The documented operation and the validating mechanism disagreed. The helper was corrected and tested against suffix preservation.

The larger lesson is to inspect the relationship between a rule, its procedure and the owner responsible for it. Each can look plausible alone while the combination fails. Ground Zero's public calculator makes its arithmetic and limits explicit, preserves maturity suffixes and has no ability to decide that a feature is complete.

## What these lessons contribute to larger work

Over time, records help reconstruct why a boundary exists, what was checked, and which part still needs work. Source organization makes the current implementation findable. Clear receiving contracts keep changes connected across components. Reusable evidence avoids making every successor start verification again.

Those are mechanisms to apply and assess in the project. Keep the practice when it improves useful delivery. Correct it when its own outputs reveal drift, duplication or an unnecessary cost. A new rule earns its place by changing subsequent work.
