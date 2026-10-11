# Event · 2026-10-11 · git init + CHANGELOG + audit performa

- **Type:** tooling / fondasi repo + audit
- **Files:** `.gitignore`, `CHANGELOG.md`, `docs/PERFORMANCE_AUDIT.md`, `.git/`
- **Commit:** `2c07bb3 chore: initial commit — situs Pempek Yuk Titi (v1 + brain + changelog)` (84 berkas)
- **Perf ringkas:** baseline FCP/LCP 456ms, CLS 0,091; Slow-4G LCP 3136ms; muat penuh 2,64MB/28 img; gzip kode 179→43,5KB.
- **Follow-up:** TD-PERF-01..06 OPEN — menunggu keputusan user (WebP+srcset, gzip hosting, fix CLS font).
- **Logs/harness:** /tmp/opencode/ (yuktiti-perf.cjs, yuktiti-imgsize.cjs, yuktiti-cls.cjs, perf.json)