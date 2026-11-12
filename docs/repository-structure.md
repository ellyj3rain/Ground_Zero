# Structure that explains the project

This guide applies the Bill's [source authority](../constitutional/BILL_OF_STANDARDS.md#standard-12-repository-and-source-authority), [coherent responsibilities](../constitutional/BILL_OF_STANDARDS.md#standard-14-coherent-responsibilities-and-work) and [independent release](../constitutional/BILL_OF_STANDARDS.md#standard-17-independent-release-and-adoption) provisions.

A repository should tell a person what the project is, what its parts do, how they relate and where to work. Organize those responsibilities rather than the output of successive sessions.

Give related parts a meaningful module home. If many folders belong to one component, make that relationship visible. Add subdirectories when the content warrants them. A small component can remain small; hierarchy is useful when it explains a real relationship.

## Give each surface a job

| Surface | Treatment |
|---|---|
| Current source | Maintained implementation, contracts, instructions and explanations. |
| Current work | Owners, active outcomes, dependencies, evidence and next actions. |
| Historical evidence | Earlier decisions, source cuts and results needed to understand or reproduce work. |
| Generated output | Artifacts produced from source for a particular use. Retain what that use requires. |
| Local state | Credentials, machine settings, sessions, caches and private operational data. Keep outside the publishable source boundary. |
| Independent project | Its own purpose, source, history, owners and release responsibilities. Integrate through an explicit receiving contract. |

A directory's presence does not make it the current source owner. A nested Git repository is a real boundary, and a clean parent status says little about its dirty child. Check the actual repository roots and selected working source before moving or publishing anything.

## Move the complete relationship

A source move may affect imports, build inputs, generated paths, loaders, tests, documentation and external consumers. Identify these before the move. Preserve exact historical source cuts; record the mapping to the new current location. Verify the receiving path after the change.

Avoid two independently editable copies claiming to be current. When a separate derivative is intentional, name its upstream source, selected revision, permitted differences, receiving owner and update path. Its history and obligations remain distinguishable from the source project.

## Prune by value and dependency

Ask what a file contributes: current behavior, a useful explanation, reproduction, provenance or recovery. Retain the material with that purpose and place it accordingly. Remove redundant exports and copies when their source and necessary history remain recoverable. Check real consumers, dynamic paths and restoration tools before deleting something that looks unused.

Keep publication cleanup separate from rewriting private history. An original record can remain privately preserved while the public project receives an intentionally curated source set. Review the published tree, package contents and reachable Git history; removing a file from the latest tree does not remove its earlier public objects.

## Adapt the project

Start from the smallest set of records that supports the actual work. The [templates](../README.md#start-with-work-you-actually-have) are editable source. Preserve their useful relationships and change their form to fit the project.

A contributor should be able to tell where a change belongs, who receives it, how to verify it and what remains open. When the structure cannot answer those questions, correct the source organization instead of adding another summary over it.
