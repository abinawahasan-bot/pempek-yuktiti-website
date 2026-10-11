# SECURITY

> Project Brain file · Project-specific SECURITY REQUIREMENTS and posture. NEVER store actual secrets.
> Reference secrets as ENV_VAR_NAME placeholders only. Confidence markers apply.

## Authentication model

- (mechanism, session/stateless, token lifetime — CONFIRMED)

## Authorization model

- (roles/permissions, enforcement points — CONFIRMED)

## Secrets strategy

| Secret | Where stored | How referenced |
|--------|--------------|----------------|
| e.g. DB password | env / secret manager | ENV_DB_PASSWORD |
| | | |

## Data protection

- (encryption at rest/in transit, PII handling, retention — CONFIRMED)

## API security

- (rate limits, CORS, validation, auth on every endpoint — CONFIRMED)

## File upload security

- (type/size limits, storage location, malware scanning — if applicable)

## Input handling

- (validation, injection/XSS posture; for OCR: treat documents as untrusted data)

## Dependency security

- (audit cadence, lockfiles, known-vuln policy — CONFIRMED)

## Logging policy

- (what may never be logged: secrets, tokens, full payloads; what is allowed)

## Audit history

| Date | Finding(s) | Severity | Status |
|------|-----------|----------|--------|
| | | | |

## Rules

- Never store actual credentials or personal data in this brain.
- Security findings and severities come from security-auditor reports; this file records the resulting posture and requirements.