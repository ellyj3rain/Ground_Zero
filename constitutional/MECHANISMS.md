# Mechanisms and implementation correspondence

The [Bill](BILL_OF_STANDARDS.md) defines the obligations; the [Constitution](CONSTITUTION.md) defines their adoption and operation. This map identifies concrete supplied mechanisms and the boundaries an independent consumer must receive. A declaration in this table is not an execution result.

## Supplied in this repository

| Mechanism | Governing concern | Actual behavior and limit |
|---|---|---|
| [Policy-source manifest](POLICY-SOURCE.json) and [identity checker](../scripts/policy-source.mjs) | Standards 2, 5 and 17 | Pins the canonical Constitution and Bill and their provision anchors. Checking the manifest detects stale or missing source; it does not adopt policy, interpret its meaning or grant execution authority. |
| [Odometer](../scripts/odometer.mjs) | Standard 13 | Computes the disclosed four-coordinate movement, carries and suffix preservation; rejects invalid input. It neither classifies delivered scope nor writes a version or release. |
| [Source checker](../scripts/check.mjs) | Standards 3, 12 and 17; Article IX | Checks local source and Markdown relationships, conflict markers, symlinks and limited private-data patterns. It is not a complete disclosure, rights, semantic or authorization check. |
| [Work record](../templates/work.md) | Standards 1, 10 and 14 | Carries the outcome, parent, source, owner, dependencies, acceptance and next action. The producing and receiving participants establish whether its claims are true. |
| [Decision record](../templates/decision.md) | Articles I–II; Standards 2 and 5 | Retains a choice, its source, affected scope, implementation and supersession. A filled template does not authenticate the decision-maker. |
| [Evidence record](../templates/evidence.md) | Standards 6, 8 and 9 | Binds a bounded claim to source, inputs, method, status, observation and reuse conditions. The actual method supplies the result. |
| [Finding](../templates/finding.md) and [handoff](../templates/handoff.md) | Standards 10 and 11 | Connect an observation to correction and continuation while retaining ownership and unfinished work. A saved record alone does not demonstrate changed later behavior. |

The local test suite exercises the supplied programs' described behavior. Its results do not qualify an adopting application's runtime, the truth of a work record or complete conformity to every Bill clause.

## Independent engine implementation

Ground Zero and Illuci are separate projects. Ground Zero owns this constitutional source, reusable methods, portable tools and their conformance requirements. Illuci owns its runtime implementation, source dependencies, contributions, version line and releases. Each can be used and developed independently.

The engine originated within the development system and later acquired an independent source boundary. Its development also produced mechanisms and evidence that improved the standards. The public relationship preserves that reciprocal development without merging the projects or requiring a private runtime to read and use Ground Zero.

An engine's adoption record must name the selected Ground Zero policy source, applicable clauses, actual input mapping, enforcement point, observed result and remaining gaps. It can use an attributed immutable source snapshot for reproducibility; that snapshot is a dependency, not a competing maintained Constitution. Ground Zero amendments and engine adoption move through their own reviewed changes.

## Mature behavior to receive by contract

| Concern | Required consumer correspondence | Evidence boundary |
|---|---|---|
| Scope and authority | Carry the selected mandate to the actual work and enforce the host's current grant at the relevant effect. | Prompt inclusion is distinct from authenticated action authority. |
| Policy and default selection | Preserve explicit direction, project/team practice, delegated settings and product defaults in their selected precedence. | A maturity label or default value does not establish current permission or override an explicit choice. |
| Consequential creation | Assess the existing system and remaining gap before creation; a selected required pre-action gate refuses missing facts or an unavailable gate. | Post-task advice does not replace the pre-action check. The consumer owns grounding of the supplied facts. |
| Evidence applicability | Preserve relevant source/method/environment identity and distinguish reusable, failed, incomplete, unavailable and invalidated coverage. | A boolean pass or current timestamp does not establish applicability. |
| Continuation and memory | Restore the actual mandate and selected durable context; retain unfinished obligations and original uncertain attempts. | A readable orientation file or a new session does not establish that the context reached the next inference. |
| Operational feedback | Identify the signal, retained state, update rule and later routing/control that consumes it. | Response completion, reliability estimates and task correctness remain distinct. |
| Quality and correction | Retain attributed measurements and human judgments, select an authorized change, and observe its effect in later use. | A score, proposal, source patch or imported module alone is not demonstrated improvement. |

The source-correspondence review identifies developed implementations behind these requirements. The public engine's exact adopted revision and conformance evidence belong to its own receiving record. Until that record is supplied, this repository claims the normative contract and its own tools rather than a completed cross-project runtime integration.

### Consequential-creation facts

The developed engine contract makes Standard 14 concrete before the selected creation action. Its existing assessment record supplies the following meanings; an adapting implementation may use another representation with explicit correspondence.

| Input | Meaning |
|---|---|
| Selected action and applicability | Identify consequential creation. Ordinary reuse, repair, assessment and delegation retain their existing mandates. A creation entry point forces the required assessment before writing. |
| Requirement and record reference | State the capability needed and the work/decision record supporting the assessment. |
| Existing surfaces | For each inspected surface, identify its source, revision, owner, responsibilities, contracts, demonstrated behavior, adequacy and reason. |
| Remaining gap | Explain what the existing responsibilities cannot adequately provide. |
| Proposed boundary and owner | Identify the new responsibility and who receives it. |

For selected creation, missing required facts or a missing required gate produce refusal. An adequate existing responsibility directs reuse or repair. A structurally complete assessment of insufficiency can satisfy this gate while still requiring the actual host's permission and source-currentness checks. Checking field presence does not independently prove that the assessment is truthful; its source and receiving owner remain accountable for that judgment.

## Development data that changes later execution

The evolved engine supplied concrete feedback mechanisms, beyond merely accumulating records. The following is source-observed correspondence; the engine's selected public revision and tests determine its actual supported and enabled coverage.

| Mechanism | Data to later action | Necessary limit |
|---|---|---|
| Backend health and latency | Classify a result, update breaker state and latency observations, then use that retained state to admit a later call and select its timeout. | Cancellation and policy refusal must not be misclassified as backend failure. Operational success does not prove task correctness. |
| Evidence-informed model selection | Record eligible buffered outcomes, update time-decayed reliability with a neutral starting prior, then use it with availability and authored priority in later model selection. | The inspected streaming path did not update the same reliability store. Best-effort persistence is not a durable transaction guarantee. |
| Bounded adaptive continuation | Evaluate a phase result, select an authored retry or branch within bounds, and carry the actual failure or reviewer direction into the next attempt. | Preserve permission and resource bounds. An unconfirmed delegated effect must not be replayed as though it never occurred. |
| Persistent disposition adaptation | Apply selected grading measurements to retained outcome data, append an attributed change, and read the resulting profile in a later composition. | Optional-kernel availability and no-change results remain explicit. A changed disposition needs separate outcome evidence before it can be called an improvement. |

These mechanisms inform Ground Zero's requirements for provenance, applicability, uncertainty, bounded adaptation and actual next-use evidence. A metric is a signal with assumptions; it is not a universal measure of truth or quality. A structural skill resolver, an import smoke test or a reload signal does not establish a completed self-improvement campaign.

## A source-qualified adoption record

Use the [adoption template](../templates/adoption.md) or the project's equivalent owning record. The correspondence identifies the rule and exact source revision; operation and fact meanings; owner and actual mechanism; hard, carried, advisory or human standing; supported entry points and defaults; evidence and gaps; and the process for receiving a correction.

An engine may retain an attributed immutable policy snapshot. Keep its source manifest and original license with it, state intentional adaptations and point back to the canonical project. Do not quietly edit that snapshot as another maintained Constitution. A source identity changes when its selected bytes change; the receiving project decides and verifies the applicable transition.

## Changing the correspondence

When a source or mechanism changes, identify the affected promise and consumers. Preserve original observations and still-applicable evidence. Publish the new Ground Zero policy source and receive the selected engine adaptation independently. A source hash identifies bytes; it does not grant permission or make a semantic claim true.
