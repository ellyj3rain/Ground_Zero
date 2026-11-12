# Import decisions

Synthetic example; the identifiers and choices belong only to this example.

## DEC-001 — preserve the original and refuse replacement

Accepted for the example importer. Import creates a separate library item and leaves the selected source document unchanged. If the chosen destination already exists, the writer refuses replacement and reports the collision.

The application can retry with a different destination only after it has reconciled the original attempt. A timeout alone does not establish that nothing was written. The storage contributor owns this contract; the application maintainer receives its result through the ordinary import route.

Evidence must cover the real writer and subsequent library readback, including collision and interruption. The parser's in-memory result does not prove file preservation or write behavior.
