# Task Outcome Record — TASK-016

Per-project telemetry. Location: `.opencode/telemetry/tasks/`. Never contains secrets.

## Task

Permintaan user: pilih **Opsi A — Optimasi Performa** untuk situs "Pempek Yuk Titi":
turunkan LCP < 2500 ms (Slow-4G), CLS < 0,1, kurangi berat halaman, lalu dokumentasikan + commit.

## Category

Performance / optimasi aset (gambar + font), dokumentasi, DevOps (commit).

## Agents Used

- orchestrator — analisis, implementasi aset WebP + `<picture>`, font self-host, pengukuran, sinkronisasi docs/brain/telemetry, commit. (SUKSES)
- qa-engineer (subagent) — verifikasi independen A–H, 0 regresi. (SUKSES)
- code-reviewer (subagent) — review diff; 1 HIGH + 1 MEDIUM. (SUKSES)

## Skills Used

orchestration, performance, frontend-engineering, image-processing, changelog, git-workflow, project-brain, telemetry.

## Files Changed

- `index.html` — head: 3 `<link>` Google Fonts → preload 2 woff2 kritis + `css/fonts.css`; hero `<picture>` (WebP + JPEG fallback; `width/height` 1600×1063 → 1600×900); 23 kartu menu `<picture>` (WebP srcset/sizes). 24 `<picture>` total.
- `css/style.css` — aturan `picture` untuk `.hero__media` & `.card-menu__media`; fix HIGH: `html.anim .hero__media img` → `transform: perspective(900px) …`.
- `css/fonts.css` (BARU) — 3 `@font-face` (swap, unicode-range Latin).
- `assets/fonts/` (BARU) — `inter-latin.woff2`, `poppins-latin-600.woff2`, `poppins-latin-700.woff2`, `OFL-INTER.txt`, `OFL-POPPINS.txt`.
- `assets/img/` — `hero-pempek-{400,800,1600}.webp`; `assets/img/menu/<slug>-{200,400,800}.webp` (69 berkas).
- `README.md`, `CHANGELOG.md`, `docs/PERFORMANCE_AUDIT.md` (§8 before/after).
- Brain: CURRENT_STATE, CHANGE_HISTORY, TECHNICAL_DEBT, PROJECT_HEALTH, INDEX.
- Telemetry: OUTCOME-016 (ini) + event `2026-10-11-optimasi-performa-webp-font.md`.

## Validation

- Harness **Python + aiohttp via CDP** (Playwright tak tersedia; Node global `WebSocket` gagal handshake) — `/tmp/opencode/yk_measure.py` + `run.sh`, 390×844, cache off, `slow4g` (150 ms/200 000 B/s/CPU 4×). Baseline diukur ulang agar apple-to-apple.
- **Slow-4G:** LCP 2356–3456 → **1856–2056 ms** (<2500 ✅); CLS 0,0013 → **0** ✅; elemen LCP `hero-pempek.jpg` (192 KB) → `hero-pempek-400.webp` (13 KB).
- **Muat awal:** 576 073 B/13 req → **222 634 B/16 req (−61%)**. **Muat penuh:** 2 707 179 B/38 req/29 img → **698 426 B/41 req/29 img (−74%)**.
- Font self-host termuat (inter 48,5 KB; poppins700 8,1 KB; poppins600 8,3 KB).
- QA independen (qa-engineer): **PASS A–H** — 113 URL aset (112×200), 0 request gagal/error konsol, WebP terpilih (`currentSrc` `.webp`), 24 fallback JPEG ada, galeri/lightbox utuh, layout 390/768/1230 OK, dark mode + stepper keranjang OK.
- Code review (code-reviewer): temuan HIGH `perspective` tilt hero **DIPERBAIKI** → diukur ulang hijau (LCP 1856 ms, CLS 0, 222 634 B); MEDIUM `sizes` dense → INFO (tidak mengubah varian terpilih pada langkah 200/400/800).
- Secret scan pra-commit → bersih.

## Tests

- Harness: `/tmp/opencode/yk_measure.py`, `run.sh`, `gen_assets.sh`, `menu_picture.py`; hasil `res_*.json`. Tidak ada automated test in-repo (situs statis, tanpa build step).

## Failures

- Harness awal berbasis Node `.cjs` gagal konek CDP (global `WebSocket` handshake gagal) → diganti harness Python/aiohttp. Bug satuan `asyncio.sleep(3500)` (ms dianggap detik) diperbaiki → `3.5`.
- Shell tool menggantung bila harness tak ter-detach → wajib `setsid … & disown` + poll file hasil.

## Retries

- Pengukuran "after" diulang setelah fix HIGH (satu putaran ulang) → konfirmasi tanpa regresi.

## Security Findings

- Tidak ada. Aset statis lokal; 0 sekret; 0 dependensi baru (font menjadi lokal → berkurang, bukan bertambah, permukaan pihak ketiga).

## Final Result

DONE — target performa tercapai (LCP <2500, CLS 0, −61% muat awal, −74% muat penuh). QA PASS, review HIGH diperbaiki. Dokumentasi (README/CHANGELOG/audit) + brain + telemetry tersinkron. TD-PERF-01/02/04/05 ADDRESSED; 03/06 tetap OPEN (deploy-time). Sisa: commit aset (74 berkas untracked) + sign-off visual user.
