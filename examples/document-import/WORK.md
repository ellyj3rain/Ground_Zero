# Import documents into the library

Synthetic example; no implementation or execution is represented as real.

The person selects a supported document, previews its contents and imports it into a library. The original document remains unchanged. The application reports what happened and preserves enough information to recover from interruption.

| Work | Owner | Current example state | Remaining acceptance |
|---|---|---|---|
| Parent: usable import | Application maintainer | Active | Integrated preview, write, failure handling and representative user workflow. |
| Parser and model | Parser contributor | A bounded source/model check is recorded in [EVIDENCE.md](EVIDENCE.md). | Actual parser input/output needs receiving in the application. |
| Preview | UI contributor | Selected parsed model contract; implementation pending. | Render useful content and clearly identify unsupported input. |
| Library write | Storage contributor | Preservation rule accepted in [DECISIONS.md](DECISIONS.md). | Non-replacing write, interrupted-write recovery and actual library readback. |

The parser change belongs to this parent, even if it is delivered independently. It does not earn feature-completion credit for the importer. The storage repair needed for non-replacing output is a direct dependency; an unrelated library search improvement keeps its own work and priority.

Next action: join one supported parsed document to the preview and the actual library writer. Exercise the receiving path with a destination collision and an interrupted write. Reuse unchanged parser coverage with its original input/source references. The complete importer remains active afterward until its remaining acceptance is satisfied.
