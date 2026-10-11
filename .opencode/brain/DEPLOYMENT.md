# DEPLOYMENT

> Project Brain file · ACTUAL deployment architecture. NEVER store deployment credentials. Confidence markers apply.

## Environments

| Environment | Purpose | URL/domain | Confidence |
|-------------|---------|-----------|------------|
| dev / staging / prod | | | CONFIRMED |

## Build process

- (build commands, artifacts, container build — CONFIRMED)

## Containers / runtime

- (image base, exposed ports, healthcheck — CONFIRMED)

## Servers & reverse proxy

- (hosts, Nginx/config, TLS — CONFIRMED)

## CI / CD

- (pipeline stages, artifact registry, deploy stages — CONFIRMED)

## Monitoring & logging

- (metrics, logs, alerts, dashboards — CONFIRMED/UNKNOWN)

## Rollback strategy

- (how a bad release is reverted — CONFIRMED/INFERRED)

## Deploy runbook

- (step-by-step safe deploy/rollback — CONFIRMED)

## Secrets in deployment

- (which ENV_VAR_NAMES the deploy needs; never values)

## Release snapshots

- Pointers to release snapshots: snapshots/ (see RELEASE entries)