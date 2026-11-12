# Ground Zero

I want a project to remain understandable as it grows. Someone should be able to open the repository, see what it is for, understand how its parts relate, and continue the work without reconstructing months of conversations. That applies to people and to the agents working with them.

Ground Zero is a development system and constitutional framework for AI-governed software. It joins intent, ownership, source, decisions, evidence and delivery in the repository itself. The point is to make larger work possible over time: preserve the purpose, build coherent parts, find mistakes, and carry what was learned into the next action.

The [Bill of Standards](constitutional/BILL_OF_STANDARDS.md) states the promises. The [Constitution](constitutional/CONSTITUTION.md) defines their authority, adoption and amendment, including the feedback loop through which development data changes subsequent work. The [mechanism map](constitutional/MECHANISMS.md) connects those promises to actual tools, responsibilities and independent engine implementations.

A pile of completed tasks is not a completed system. A passing check does not prove that the intended application received the change. A good handoff does more than recount the last session. These distinctions matter when a project spans many sessions, contributors and repositories.

## Start with work you actually have

Choose one active outcome. Put its purpose, owner, boundaries and acceptance conditions in a [project record](templates/project.md). Use a [work record](templates/work.md) to connect the next useful delivery to that outcome. Record consequential choices with the [decision template](templates/decision.md), and link the evidence that supports a completion claim.

Keep the records near the source they explain. Use the project's existing files when they already serve the purpose. A small project can begin with one work file and a short decision log. Separate records when separate responsibilities make them useful.

| Read | What it helps you do |
|---|---|
| [Constitution and Bill](constitutional/CONSTITUTION.md) | Establish the adopted promises, authority, amendment and operative feedback relationships. |
| [Mechanisms and implementation correspondence](constitutional/MECHANISMS.md) | Distinguish a normative rule, source identity, actual enforcement and observed behavior. |
| [The working method](docs/working-method.md) | Carry intent through ownership, implementation and integration. |
| [Records and continuity](docs/records-and-continuity.md) | Keep present state clear while preserving decisions, corrections and unfinished work. |
| [Verification](docs/verification.md) | Match evidence to the claim, reuse what still applies, and check the receiving path. |
| [Delivery and version credit](docs/delivery-and-versioning.md) | Organize coherent parent and child outcomes and account for progress once. |
| [Repository structure](docs/repository-structure.md) | Give a module a meaningful home and keep source, history and local state distinct. |
| [Lessons from use](docs/lessons-from-use.md) | See concrete failures that changed the method. |
| [Worked example](examples/document-import/README.md) | Follow a synthetic document-import change across scope, decisions and evidence. |

## What makes the method useful

The relationships do the work. A decision explains a constraint in the implementation. A component has an owner and named consumers. A child delivery advances a larger outcome without erasing the rest. A verification record names the inputs and behavior it actually checked. A successor can find the next eligible action and the reason it is next.

These connections reduce the amount that has to be rediscovered after an interruption. They also make a contradiction visible: the architecture can say one thing while a loader, build or running application does another. The response is to correct the responsible source and receiving path, then update the account.

The repository contains the developed constitutional core, methods, templates and portable checks. Ground Zero and Illuci are separate projects: Ground Zero supplies the framework under MIT; Illuci supplies an independently developed engine under GPLv3. The framework shaped the engine, and engine development produced evidence and mechanisms that refine the framework. Their source, contributions, versions and releases remain independent.

Using Ground Zero does not require an engine, model subscription or access to the original development environment. An engine can adopt the exact public policy source through its own declared contract. The examples are explicitly illustrative. The historical lessons explain particular observed failures; they are not a benchmark or a claim that a prescribed amount of process makes every project faster.

## Use it, adapt it, contribute

The documentation and templates work as plain Markdown. The optional tools require Node.js 20 or later and have no package dependencies.

```sh
npm run check
npm test
node scripts/odometer.mjs 2.3.4.5-alpha kohai
node scripts/policy-source.mjs --check
```

The odometer command is an arithmetic example. It prints a proposed next coordinate and changes no file. A project chooses and records its own version policy and current baseline. The policy-source command verifies the exact constitutional source identity; it does not make an adoption or authority decision.

When adopting Ground Zero, name the selected policy source, provisions, mechanisms, owners and evidence in the project's [adoption record](templates/adoption.md). Keep your project's purpose and terminology. A rule earns its place through the failure it prevents or the work it makes possible; amend it through the responsible authority when evidence shows it needs to change.

Fork this project, adapt the templates, or contribute a correction with a concrete use case. [CONTRIBUTING.md](CONTRIBUTING.md) explains the contribution path. The original development history is preserved separately; this public source has a deliberately selected publication boundary described in [ORIGIN.md](ORIGIN.md).

Licensed under the [MIT License](LICENSE).
