# ARCHITECTURE_DRIFT

> Project Brain file · Created ONLY when meaningful drift between documented architecture and actual code is detected. Confidence: CONFIRMED (verified against code).

## Drift report template

### <area/title>

- **Documented:** (what ARCHITECTURE.md / DECISIONS.md claims — CONFIRMED)
- **Actual:** (what code shows — CONFIRMED, with file evidence)
- **Detected:** YYYY-MM-DD
- **Severity:** HIGH / MEDIUM / LOW
- **Action:** (update docs, fix code, or accept-and-record)
- **Status:** OPEN / RESOLVED

## Detected drift

- (entries)

## Detector checklist (run during audits)

- Undocumented modules (code exists, DOC: no)
- Obsolete modules (DOC: yes, code: gone/unused)
- Unexpected dependencies (code imports not in DEPENDENCIES.md)
- Circular dependencies (module A ↔ B)
- Duplicated architecture (two modules doing the same job)
- Outdated decisions (code violates a DECISIONS entry or ADR)

## Rules

- Only log drift verified against actual source; never guess.
- Resolution always updates the source of truth (code or brain), never both silently.
- After resolution, update ARCHITECTURE.md / DECISIONS.md and mark the entry RESOLVED.