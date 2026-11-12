# Contributing

Contribute a change that makes Ground Zero clearer or more useful in actual work. Its [Constitution](constitutional/CONSTITUTION.md) and [Bill](constitutional/BILL_OF_STANDARDS.md) are the canonical policy sources; explanatory guides apply them. A small correction is welcome. For a material change, explain the problem, the affected responsibility and how the proposed result improves it.

Use a focused branch and pull request. Preserve existing source and other contributors' work. Keep changes coherent enough to review together; splitting every edit into a separate proposal can obscure the behavior being delivered.

| Contribution | Helpful evidence |
|---|---|
| Wording or navigation | The specific ambiguity or broken path and the corrected reading. |
| Method or template | A concrete work situation, the failure or friction observed, and how the change affects the next action. |
| Tool | Its changed behavior, focused cases and any compatibility consequences. |
| Example or lesson | Clear attribution and permission, accurate evidence boundaries, and synthetic or appropriately disclosed data. |

A constitutional or standards amendment identifies the current provision, source observation, proposed semantic change, responsible decision and affected consumers. Reconcile the explanatory and mechanism surfaces it actually changes. Run `node scripts/policy-source.mjs --write` after the selected policy edit to regenerate its source identity, and review that generated diff with the source. An updated manifest does not establish another project's adoption.

Ground Zero and Illuci retain independent contribution and release paths. A runtime counterexample can motivate a Ground Zero amendment; a Ground Zero refinement can motivate an engine change. Attribute and receive each contribution at its actual boundary rather than copying an entire project into the other.

Before submitting, run `npm run check`. Run `npm test` for changes to tool behavior. Broaden verification when the affected contract calls for it. State any check that could not run and why. A new document need not create a new framework, rule or tool.

Keep the public project independent of private accounts, machines, runtimes and sources. Remove personal information, credentials and private operational details from the change and its proposed history. Do not include abusive or discriminatory material, private conversation dumps or undisclosed future designs. A scanner can help find mechanical patterns; it cannot make the disclosure or relevance judgment for you.

Keep criticism about the work and make the correction actionable. Preserve attribution and third-party notices when adapting material. Confirm that you have the right to contribute the content under the project's [MIT License](LICENSE); a source link alone is not permission to relicense someone else's work.

If reporting a security issue, do not put credentials or sensitive exploit details into a public issue. Use an available private reporting channel for the repository, or ask maintainers for one without posting those details.
