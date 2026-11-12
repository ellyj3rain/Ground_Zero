# The working method

This guide applies the [Constitution](../constitutional/CONSTITUTION.md) and the Bill's [scope](../constitutional/BILL_OF_STANDARDS.md#standard-1-scope-and-delegation) and [coherent-work](../constitutional/BILL_OF_STANDARDS.md#standard-14-coherent-responsibilities-and-work) provisions. Those sources own the rule; the guide explains how to use it in a project.

The unit of work is an intended outcome. A task, commit, session or agent assignment advances that outcome and keeps its relationship to the whole.

## Make the purpose concrete

Before a material change, recover the current objective, relevant decisions, source and known behavior. State what the person using the result should be able to do. Name the source that owns it and the path by which the change reaches that person.

A useful specification explains one subject at three connected levels:

| Level | Question it answers |
|---|---|
| Purpose | Why does this exist, and what promise does it make? |
| Architecture | What does it own, depend on and supply to others? |
| Implementation | Which file, function, command or operative record realizes it? |

The explanation should let a reader move between the levels. When implementation differs from the stated architecture, record the difference and resolve the responsible boundary. A name or diagram does not establish implemented behavior.

The person directing the work should be able to understand the decisions that matter to them and inspect deeper detail when useful. Faster output is valuable when it expands what they can accomplish and understand together. A fluent explanation still needs a real source behind it.

For a consequential invariant, identify the promise, the decision behind it, the failure it prevents and the observation that would show it holds. Trace how a failure would reach a consumer. This turns a broad intention such as “preserve user data” into a checkable contract at the actual write boundary.

## Find the existing responsibility

Inspect the system before adding another component, role or process. Determine whether the problem is missing capability, a broken mechanism or failure to use an existing one. Repair the current responsibility when it can meet the need. A new responsibility needs a clear purpose, owner and boundary.

For a recurring discipline, connect the promise, the procedure that maintains it and the owner responsible for its judgment. A written rule can drift when nobody owns its application. A check can also pass while the selected rule no longer serves the project. Keep those relationships inspectable and revise the responsible part when the evidence changes.

Separate identity from convenience. A repository stores source; a project has a purpose; a session is one period of work; an agent is a participant; a model supplies inference. Changing a session or model should not silently change the project's owner, scope or decisions.

The [component template](../templates/component.md) is useful when the relationships are substantial enough to require their own record.

## Delegate a bounded contribution

A delegation carries the outcome, source, allowed changes, constraints, dependencies and expected return. The receiving contributor needs to know what counts as success and which decisions remain with someone else.

For shared source, contact its owner before a material integration. Agree on the selected revision, interface, writer boundary and known gaps. An old handoff or unanswered request is useful evidence of context, but it does not establish a current source handover. Hold the affected operation while continuing independent authorized work.

The coordinating owner rejoins the contribution. A worker's passing check does not automatically satisfy the application's contract or close the parent outcome.

## Develop, observe and correct

Build a coherent useful behavior with its necessary dependencies. Check the changed boundary, apply it through the intended receiving path, and compare the result with the original purpose. Retain both useful results and contrary evidence.

When something fails, distinguish its cause and effect. A failed tool call, an invalid implementation and a successful change that never reached the running application need different corrections. Fix the responsible boundary; do not substitute a nearby artifact because it is easier to verify.

Uncertain effects keep their original operation identity until reconciled. A timeout does not establish that a write or remote action never happened. Determine what occurred before retrying an action that could duplicate it.

## Return to the whole outcome

Before declaring completion or choosing the next action, compare the current state with the accepted parent scope. Identify what changed, who received it, what evidence applies and what remains. Preserve the original priority order unless the responsible person changes it.

A maintenance repair that blocks delivery belongs with the affected dependency and its return to delivery. An independent improvement keeps its own priority and owner. A useful side discovery should not make the original objective disappear.

The record should make the next action easier. If a field or document merely repeats information without improving a decision, source relationship or continuation, remove the repetition and point to the owning record.
