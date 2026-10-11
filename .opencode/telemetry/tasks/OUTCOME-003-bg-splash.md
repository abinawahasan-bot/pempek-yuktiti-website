# Task Outcome Record — TASK-003

Per-project telemetry for SIGNIFICANT tasks only. Location:
`.opencode/telemetry/tasks/`. Never contains secrets (ENV_VAR_NAME only).

## Task

Upgrade visual: (A) lapisan background dekoratif hangat (gradien + motif
songket/batik halus + 3 blob warna brand) di belakang konten, dan (B) intro
splash "Pempek Yuk Titi" yang tampil sekali per sesi browser saat situs
pertama kali dibuka — tanpa dependensi eksternal, dengan gating aksesibilitas
lengkap (no-JS, prefers-reduced-motion, print, skip keyboard/klik).

## Category

feature (visual), accessibility-safety, performance-conscious

## Agents Used

- frontend-developer — implementasi `.bg-decor` (index 64–70, CSS section
  "Background dekoratif & splash" style.css 1008–1178, print rule 1003–1005)
  dan `setupSplash()` (js/animations.js 279–366). Probe 30/30 + 6/6 piksel.
  (SUKSES)
- qa-engineer — QA independen PASS_WITH_NOTES: 81 PASS / 1 FAIL / 9 INFO +
  12/12 piksel (noise floor 0). F1 LOW: keydown nyata tak menutup splash
  (listener di #splash, fokus di body) → direproduksi 1713ms.
- code-reviewer — APPROVE (MUST 0, SHOULD 0; NIT 1–4 kosmetik). Verifikasi
  tambahan: anti-basi, mobile 375 (blob 46vmax aman, scroll 0, once-per-sesi,
  0 exception), penanganan matchMedia change rapi.
- orchestrator — dispatch, perbaikan F1 1-baris (listener keydown →
  document), retest CDP (key-skip 470ms, auto-dismiss ±2.1s, reduce aman),
  sinkronisasi README/brain/telemetry.

## Skills Used

orchestration, telemetry. Frontend: css-expert / frontend-engineering /
accessibility via developer & reviewer.

## Files Changed

- `index.html` (455 baris, +17) — `.bg-decor` (wrapper, `__pattern`, 3
  `__blob`) + `#splash` (`__inner`, `__mark`, `__title`+bar, `__tag`), keduanya
  `aria-hidden="true"`.
- `css/style.css` (1178 baris, +175) — print rule (.bg-decor/.splash none) di
  blok print lama; section "Background dekoratif & splash": bg-decor fixed
  z-1, pattern songket opacity 0.04, 3 blob blur 52px alpha ≤0.12 (kanan-atas/
  kanan-bawah/kiri-bawah — jauh dari teks hero), drift 28–34s transform-only
  saat `html.anim`; splash display:none default → `html.js.anim
  .splash.splash--show`; animasi masuk 980ms; `splash--done` fade 450ms.
- `js/animations.js` (379 baris, +91) — `setupSplash()`: guard node/animation
  (`anim`), once-per-sesi (`sessionStorage.pyt_splash`), tampil via rAF,
  auto-dismiss 1600ms → done 460ms → remove node (failsafe 4000ms), skip
  click (#splash) + keydown (document, passive; F1 fix), try/catch → hapus
  node; tanpa sentuh class `js` / reveal / tilt / FAB.
- `README.md`, `.opencode/brain/**` — disinkronkan.

## Validation

- QA: baseline integrity (wa.me 5, ig 3, harga 23, reveal 13, alt 6), splash
  load-relam/skip/reduce/no-JS/print/overflow (360/375/768/1200)/console
  0 error (favicon 404 pre-existing), visual piksel (noise 0, kontras hero
  5.83:1 ON vs 5.81:1 OFF; zona overlap blob 12.48:1 tetap AAA), animasi
  transform/opacity only, request pihak-3 tidak bertambah (Google Fonts +
  iframe Maps lama).
- F1 retest (orchestrator): keydown nyata (Input.dispatchKeyEvent Escape) →
  splash dihapus 470ms <500ms; auto-dismiss ±2.1s; reduce → tanpa splash.
- node --check OK; HTTP 200 css/js/foto.

## Tests

- Repo murni statis tanpa suite otomatis; harness CDP sementara disimpan di
  /tmp/opencode/: bg-splash-probe.mjs (30/30), bg-decor-pixcheck.mjs (6/6),
  qa-bgsplash-* (81/1/9 + 12/12), retest-key-skip.cjs (470ms). Rekomendasi
  QA: adopsi smoke-test bila proyek dapat CI.

## Failures

- F1 (CODE, LOW — satu-satunya FAIL QA): listener `keydown` dipasang di
  `#splash`, padahal fokus aktif = body → event keyboard nyata tidak pernah
  sampai. Dampak: keyboard skip tidak bekerja (auto-dismiss tetap aman),
  tanpa focus trap (tidak ada elemen focusable). Fixed 1 baris: listener →
  `document` + komentar; retest 470ms PASS.

## Retries

- 1 ronde fix (orkestrator, F1). Probe retest: 1 retry karena ekstensi `.mjs`
  = ESM (require gagal) → rename `.cjs` → sukses. Query-impact: hasil konsisten
  deterministik 2× (dev & QA).

## Security Findings

- Tidak ada CRITICAL/HIGH/MEDIUM. 0 script eksternal baru; 0 secret; 0 inline
  handler; favicon 404 pre-existing (INFO); `aria-hidden` + tanpa focusable →
  splash tidak terjangkau AT secara keliru.

## Final Result

DONE (QA PASS_WITH_NOTES; F1 FIXED + retest; review APPROVE; tersisa:
sign-off visual user untuk intensitas blob/pola/timing splash).

## Lessons

- Splash sekali-per-sesi via `sessionStorage` = pola tepat untuk intro situs
  UMKM: terasa "perhatian" tanpa mengganggu reload/hash nav; tab baru mandiri
  tetap mendapatkannya.
- Event keyboard pada overlay harus dipasang di `document` (fokus user ada di
  body) — pola yang sama akan dipakai ulang untuk overlay apa pun.
- Dekor background berbasis blob dengan `filter: blur(52px)` + transform-only
  drift: kontras teks tetap AAA (blob α≤0.12, dijauhkan dari blok teks).
  Trade-off komposit kecil dicatat; skala intensitas bisa disetel dari satu
  tempat CSS.
- Anti-flash splash = `display:none` default + JS opt-in class: tidak ada
  frame splash sebelum JS berjalan, sekaligus no-JS/reduce aman tanpa kondisi
  tambahan.

## Rules

- Create for significant tasks only; trivial edits get an event row.
- Do not store passwords, keys, tokens, or credentials.
- Quality check before writing: no-secret scan → bersih (record ini tidak
  memuat kredensial/token/kunci).