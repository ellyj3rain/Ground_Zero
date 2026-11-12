# Applying delivery and versioning

[Standard 13](../constitutional/BILL_OF_STANDARDS.md#standard-13-odometer-and-once-only-credit) owns the credit and arithmetic rules. [Standard 14](../constitutional/BILL_OF_STANDARDS.md#standard-14-coherent-responsibilities-and-work) owns the parent/child and development-posture rules. This guide applies them to an actual delivery decision.

## Follow one complete outcome

The [worked importer example](../examples/document-import/WORK.md) has a parser, preview and library writer. Each has its own responsibility. The parent is the usable importer, including the required receiving and preservation behavior.

| Illustrative delivered change | Scope assessment |
|---|---|
| A useful parser increment while preview and writing remain unfinished | Coherent progress toward the feature; assess kohai under the disclosed odometer. |
| A correction to an already delivered writer's collision refusal | An in-place correction; assess patch. |
| The complete importer reaches its required consumers and acceptance | Assess feature completion against the whole agreed scope and its evidence. |
| A later summary gathers those same results | Preserve the delivery lineage; do not credit the same work again. |

These are illustrative judgments, not recorded releases. A real work record names the accepted scope, source, receiving evidence and credit owner.

## Choose useful development and delivery boundaries

A tightly coupled change to parsing, preview and writing may need to be developed and reviewed together. Focused tests can still isolate each contract. If a child can deliver useful behavior independently, it can close through the project's established path while the parent retains everything unfinished.

Granular, Emmetropic and Beacon help describe the actual working posture at the appropriate scope. Use the [Bill's definitions](../constitutional/BILL_OF_STANDARDS.md#standard-14-coherent-responsibilities-and-work) in context. They are not size quotas, task categories or permissions. A broad plan can retain focused children without requiring every subdivision to become a separate PR.

When changing the grouping, record the reason, affected units, retained goals, dependencies, evidence and remaining acceptance. Preserve published identities and historical order. A more convenient grouping does not change the amount already delivered.

## Calculate only after the judgment

The optional calculator implements the disclosed Ground Zero policy. Its four coordinates are not Semantic Versioning; a project that uses another compatibility scheme states the relationship explicitly. Choosing to adopt the odometer and choosing an initial baseline remain project decisions.

```sh
node scripts/odometer.mjs 2.3.4.5-alpha kohai
# 2.3.5.0-alpha

node scripts/odometer.mjs 2.12.16.24-alpha patch --explain
# 3.0.0.0-alpha
# Mechanical carry; the selected tier was still patch.
```

These are arithmetic examples. The helper preserves an existing suffix and changes no file. It does not classify a diff, choose a release, declare compatibility or confer maturity. The hard caps and carry semantics have one canonical definition in [Standard 13](../constitutional/BILL_OF_STANDARDS.md#standard-13-odometer-and-once-only-credit).

When recording a real delivery, keep the designated version source and its displayed copies consistent. Retain the scope, previous value, evidenced tier, computed result and applicable proof. A mechanical carry leaves the underlying delivery judgment unchanged.
