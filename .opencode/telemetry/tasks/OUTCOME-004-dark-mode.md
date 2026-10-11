# Task Outcome Record — TASK-004

Per-project telemetry for SIGNIFICANT tasks only. Location:
`.opencode/telemetry/tasks/`. Never contains secrets (ENV_VAR_NAME only).

## Task

Tambahkan fitur DARK MODE pada landing page UMKM: default mengikuti
`prefers-color-scheme` sistem (tanpa JS), toggle manual aksesibel
(ikon + aria-pressed + localStorage `pyt_theme`) dengan anti-FOUC via
skrip inline di head, eksplisit menang atas sistem, print selalu terang,
palet hangat (bukan hitam pekat), kontras AA diverifikasi — tetap
zero-dependency, `js/main.js` tidak tersentuh.

## Category

feature (UX/UI), accessibility, maintenance (ketahanan degradasi)

## Agents Used

- frontend-developer — implementasi: meta color-scheme + theme-color split
  media, anti-FOUC inline (index.html 37–39 sebelum css), `.nav__actions` +
  `.theme-toggle` (95–116), token dark 2 blok identik (a) `:root[data-theme=
  "dark"]` + (b) `@media (prefers-color-scheme: dark) :root:not([data-theme=
  "light"])` (23 deklarasi, diff mekanis identik), konversi shade/glow/blob
  hardcoded → token, print override terang, `js/theme.js` baru; probe
  40/40 + hdr-compare delta 0 + kontras 34 pasangan. (SUKSES)
- qa-engineer — QA independen 10 skenario: **240 PASS / 0 GAGAL**, verdict
  PASS_WITH_NOTES; F-LOW-01 (tidak ada sinkron lintas tab) & F-LOW-02
  (tombol inert bila theme.js gagal = LOW). (SUKSES)
- frontend-developer (ronde 2) — fix F-LOW-01 (listener `storage` →
  setAttribute/removeAttribute + syncAria, try/catch) & F-LOW-02
  (class `theme-ok` statement terakhir IIFE; visibilitas tombol jadi
  `.js.theme-ok .theme-toggle`); probe 27/27 + ulang qa-dm-08 & qa-dm-10
  exit 0. (SUKSES)
- code-reviewer — APPROVE_WITH_NITS: 0 CRITICAL/HIGH/MEDIUM; LOW-1 (ARIA
  basi saat OS ganti skema di tengah sesi tanpa preferensi eksplisit) +
  NIT (dead `readStored()`, komentar header, mirror komentar kontras blok
  (b), angka secondary 2.82). (SUKSES)
- frontend-developer (ronde 3) — fix LOW-1 (listener matchMedia change →
  `syncAria()` saja, pola `onMediaChange` dual addEventListener/addListener
  + try/catch, tanpa tulis storage/attr → tanpa lingkaran) + NIT cleanup;
  theme-color ikut tema eksplisit DILEWATI (perlu ≥7 baris restrukturisasi,
  di luar izin; keputusan sadar). Probe 20/20 + ulang qa-dm-08/10 exit 0.
  (SUKSES)
- orchestrator — dispatch, sinkronisasi README/brain/telemetry.

## Skills Used

orchestration, telemetry. Frontend: css-expert / frontend-engineering /
accessibility / contrast-WCAG via developer, QA, reviewer.

## Files Changed

- `index.html` (474 baris, +19) — meta `color-scheme` + `theme-color`
  split media light/dark; skrip inline anti-FOUC SEBELUM stylesheet
  (hidrasi `data-theme` dari `localStorage.pyt_theme` hanya jika nilai
  dark|light; tanpa nilai → ikut sistem via CSS media); `.nav__actions`
  membungkus `.theme-toggle` + hamburger; `<script src="js/theme.js" defer>`.
- `css/style.css` (1356 baris, +178) — `:root` token pendukung baru
  (nilai light = lama), dua blok dark sinkron + `color-scheme`, konversi
  warna hardcoded → token (10× primary→primary-text, badge on-accent,
  footer-text, 9 shadow→`--shadow-rgb` alpha, 3 glow, sheen, 6 alfa
  bg-decor/splash → `--blob-alpha`/`--pattern-opacity`), `.theme-toggle`
  tampil hanya `.js.theme-ok`, hide `.nav__brand-sub` ≤372px, print
  override terang dua selector, komentar pengecualian kontras
  (border 1.43:1 dekoratif; secondary light 2.82:1 / dark 6.90:1).
- `js/theme.js` (BARU, 109 baris) — toggle + ARIA + persist;
  init TIDAK baca/tulis storage (hidrasi di head); efektif()
  system-aware; `storage` lintas tab; matchMedia change → syncAria only;
  `theme-ok` statement terakhir (gagal init → tombol hidden).
- `js/main.js` (80 baris) & `js/animations.js` (381 baris) — TIDAK disentuh
  (mtime & ukuran sama).
- `README.md`, `.opencode/brain/**` — disinkronkan.

## Validation

- QA independen: 240/240 PASS lintas 10 skenario (struktur/token, perilaku
  tema — sistem/eksplisit/reload/print/no-JS, kontras 34 pasangan token +
  piksel hero, visual piksel 13 section/luminansi + frame splash pertama
  mean 32.87 (anti-flash terbukti), mobile 320/360/375 (overflow 0, header
  61px), header-delta 0px, tilt/glare fungsional dark↔light, resiliensi
  blokir main/animations/theme + localStorage throws + 10 klik cepat,
  edge storage (bogus/null/JSON/5000 char → ikut sistem), reduced-motion,
  multi-tab persist).
- Kontras dark (contoh): body 15.3:1, link/primary-text 7.8:1, on-primary
  4.95:1, on-accent 5.94:1, harga 7.4:1, WA/FAB 8.62:1, footer 4.95:1,
  hero piksel 7.35–15.06:1.
- Fix loop: F-LOW-01/02 probe 27/27 (+ ulang qa-dm-08/10 exit 0);
  LOW-1 probe 20/20 (+ ulang qa-dm-08/10 exit 0) incl. live flip
  dark↔light tanpa reload → ARIA ikut, storage tetap 0.
- node --check ×4 OK; HTTP 200 css/js/foto; integritas wa.me 5, Rp 23,
  reveal 13, alt 6; grep readStored = 0.

## Tests

- Repo statis tanpa suite; harness CDP sementara di /tmp/opencode/:
  darkmode-probe.mjs (40), darkmode-qa-*.mjs (10 skrip, 240 cek),
  hdr-compare.mjs, contrast-dark.mjs, low1-nit-probe.mjs (20),
  f-low-fixes-probe.mjs (27), qa-dm-08/qa-dm-10 ulang exit 0.

## Failures

- F-LOW-01 (LOW, QA): tanpa listener `storage` → tab lain tidak ikut
  tema sampai reload. Fixed: handler storage (valid → setAttribute,
  null/bogus → removeAttribute, lalu syncAria; try/catch).
- F-LOW-02 (LOW, QA): bila theme.js gagal dimuat tombol tampil tapi
  inert. Fixed: `theme-ok` class statement terakhir IIFE + selector
  `.js.theme-ok .theme-toggle`.
- LOW-1 (LOW, review): ARIA/ikon basi saat OS ganti skema di tengah
  sesi tanpa preferensi eksplisit. Fixed: matchMedia change → syncAria
  (dual addEventListener/addListener; tanpa tulis).
- INFO sisa: favicon 404 pre-existing; kontras dekoratif border 1.43:1
  (disengaja, terdokumentasi); theme-color meta tetap mengikuti sistem
  (keputusan sadar, dilewati).

## Retries

- 2 ronde fix pasca-QA (F-LOW 1× , review LOW-1 cleanups 1×).
- 1x harness quirk: headless Chromium default prefers-color-scheme=dark
  & Enter via CDP butuh `text:"\r"` — probe diperbaiki dengan emulasi
  eksplisit (bukan bug produk).

## Security Findings

- Tidak ada CRITICAL/HIGH/MEDIUM. 0 script eksternal baru; 0 secret;
  inline anti-FOUC tanpa handler berbahaya (hanya baca localStorage +
  setAttribute); localStorage dipakai non-sensitif (`pyt_theme`);
  print tidak membocorkan tema pribadi (selalu light).

## Final Result

DONE — QA PASS_WITH_NOTES (240/240), F-LOW & LOW-1 FIXED + retest,
review APPROVE_WITH_NITS (sisa INFO/NIT non-blocking).
Sisa: sign-off visual user (palet dark, header dark di perangkat asli,
perilaku hamburger ponsel nyata dari TASK-003 tetap perlu cek manual).

## Lessons

- Anti-FOUC tema laman statis: hidrasi `data-theme` via skrip inline
  SEBELUM stylesheet + tanpa nilai → CSS media live. Terbukti piksel
  (frame splash pertama mean 32.87, bukan flash terang).
- Pola 2 blok dark sinkron (eksplisit + media dark) perlu guard
  sinkronisasi: diff mekanis strip-komentar di probe = pengawal murah.
- Printer/print emulation: forces warna light dari dua selector
  (0,2,0) — `data-theme=dark` tidak pernah menghasilkan cetak gelap.
- Kebasian ARIA (label/state) dan CSS (visual) adalah dua hal berbeda:
  listener matchMedia height untuk ARIA pun TANPA menulis storage/attr
  terbukti bebas lingkaran.
- Gagal-degradasi untuk tombol: class opt-in di statement terakhir
  IIFE (`theme-ok`) — script mati → tombol tak pernah muncul (bukan
  tombol mati), pola sama dengan `.js` main.js.
- Cross-tab sync cukup via event `storage` (hanya tab lain yang
  menerimanya) — tidak perlu BroadcastChannel.

## Rules

- Create for significant tasks only; trivial edits get an event row.
- Do not store passwords, keys, tokens, or credentials.
- Quality check before writing: no-secret scan → bersih (record ini tidak
  memuat kredensial/token/kunci).