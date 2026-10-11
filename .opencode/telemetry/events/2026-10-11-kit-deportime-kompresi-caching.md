# Event · 2026-10-11 · kit deportime — kompresi + caching host-agnostic

- **Type:** performance / deployment config (tanpa build step)
- **Files:** `deploy/.htaccess` (BARU), `deploy/_headers` (BARU), `deploy/README.md` (BARU), `README.md` (§D + perbaikan §B GitHub Pages), `.opencode/brain/DEPLOYMENT.md` (diisi), `.opencode/brain/{CURRENT_STATE,CHANGE_HISTORY,TECHNICAL_DEBT,KNOWN_ISSUES,INDEX}.md`, `CHANGELOG.md`
- **Safety:** ditambah `ISSUE-006` (LOW) — cegah `.opencode/` (48 berkas memori internal) terbit publik saat deploy; GH Pages butuh `_config.yml` `exclude:`, `.gitignore` tak menolong.
- **Perf ringkas:** kompresi kode terukur pada berkas asli via `gzip -9`/`brotli -q 11` — 192 723 B → **42 274 B gzip (−78%)** / **35 554 B brotli (−82%)**.
- **Keputusan penting:** sumber tetap **tanpa build step** (DECISIONS #1) — optimasi murni config server/CDN. Minify + CSS kritis (TD-PERF-03 sisa, TD-PERF-06) **tidak** dipasang (butuh build) → menunggu keputusan user.
- **Hosting:** tetap **UNKNOWN** (DECISIONS #4 / ISSUE-003); kit mencakup 3 kandidat (Netlify, GitHub Pages, cPanel).
- **Follow-up:** pilih hosting → salin `deploy/<config>` ke root → verifikasi `curl -sI` `content-encoding: br|gzip`.
- **Catatan:** tidak ada Apache/Netlify di environment → config ditinjau manual, belum bisa `configtest`.
