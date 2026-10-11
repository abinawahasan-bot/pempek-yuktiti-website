# Event · 2026-10-11 · optimasi performa — WebP + font self-host

- **Type:** performance / aset gambar & font
- **Files:** `index.html`, `css/style.css`, `css/fonts.css` (BARU), `assets/fonts/` (3 woff2 + 2 OFL), `assets/img/hero-pempek-{400,800,1600}.webp` + `assets/img/menu/<slug>-{200,400,800}.webp` (69), `README.md`, `CHANGELOG.md`, `docs/PERFORMANCE_AUDIT.md`, `.opencode/brain/*`
- **Commit:** (belum — 74 berkas untracked; menyusul di sesi ini)
- **Perf ringkas (Slow-4G + CPU 4×, cache off):** LCP 2356–3456 → **1856–2056 ms**; CLS 0,0013 → **0**; muat awal 576 KB/13 req → **222 KB/16 req (−61%)**; muat penuh 2 707 179 B → **698 426 B (−74%)**. Elemen LCP = WebP hero 400w (13 KB). Font self-host termuat (inter 48,5 KB; poppins 600/700 8,0/7,8 KB).
- **QA/review:** QA independen **PASS** (A–H, 0 regresi, 0 error konsol); code review **APPROVE(-WITH-NITS)** — 1 HIGH (efek tilt hero kehilangan `perspective` karena `<picture>`) **DIPERBAIKI**; 1 MEDIUM (`sizes` dense) → INFO.
- **Follow-up:** TD-PERF-03/06 (deploy-time, menunggu hosting); commit aset WebP + font; sign-off visual user.
- **Logs/harness:** `/tmp/opencode/` (`yk_measure.py`, `run.sh`, `gen_assets.sh`, `menu_picture.py`, `gf.css`, `res_*.json`)
