# Task Outcome Record — TASK-013

Per-project telemetry for SIGNIFICANT tasks only. Location:
`.opencode/telemetry/tasks/`. Never contains secrets (ENV_VAR_NAME only).

## Task

Paket motion (atas permintaan user: "semakin seperti website profesional
yang banyak animasi 3D smooth memanjakan mata"): 6 item gerak yang kaya
namun disiplin — (1) entrance hero berjenjang, (2) tilt kartu testimoni,
(3) zoom foto menu saat hover/fokus, (4) scroll-spy chip kategori
(aria-current), (5) pita marquee divider, (6) parallax halus media hero.
Prinsip: hanya transform/opacity/translate; semua di bawah
`html.anim`/`html.js.anim` (mati saat reduce/tanpa JS); pointer-halus
untuk tilt/zoom/parallax; tanpa dependensi baru.

## Category

UI motion, UX delight, accessibility (gating), performance-aware.

## Agents Used

- (tidak ada subagent — dikerjakan + diverifikasi langsung orkestrator
  dengan konteks penuh; pola delegasi terbukti rapuh sesi ini.)
- orchestrator — desain paket, implementasi HTML/CSS/JS, verifikasi CDP
  mendalam, sinkronisasi brain + telemetry. (SUKSES)

## Skills Used

orchestration, telemetry; motion/interaction design; a11y gating.

## Files Changed

- `index.html` (996→1007) — `.ribbon` (aria-hidden) antara hero & cerita.
- `css/style.css` (2195→2291) — keyframes hero-rise/hero-media-in +
  8 aturan entrance; tilt testimoni; zoom menu; chip `[aria-current]`;
  `.ribbon*` + ribbon-scroll 32s; parallax consume (`translate`);
  kill-switch: `.menu-nav__link` (reduce) + `.ribbon` (print).
- `js/animations.js` (381→501) — `playHeroEnter()` + wiring dismiss/
  early-return/fallback 2600ms; `setupTestiTilt()`; `setupMenuSpy()`;
  `setupHeroParallax()` (rAF, cap 60px); semua via `safe()`. File ini
  pemilik perilaku animasi (pengecualian konvensi frozen, dicatat).
- Brain: CHANGE_HISTORY, CURRENT_STATE, ARCHITECTURE, INDEX.
- Telemetry: file ini.

## Validation

- CDP: `.hero--play` + 7× hero-rise + opacity akhir 1; ribbon loop
  mulus (paruh 814=814px); spy menandai chip benar (#menu-addon:true);
  reduce (tanpa anim/hero tampil/pita statis/transisi 0s); no-JS
  (tampil semua/pita statis/tanpa spy); print (pita hidden); mobile
  320/390 (entrance jalan, pita tanpa overflow, testimoni 1 kol);
  overflowX 0; console/network 0 error.
- Pointer-halus tak ada di headless (limitasi lingkungan, sama seperti
  tilt menu lama): tilt/zoom/parallax diverifikasi via parse aturan +
  injeksi ungated (matrix3d/scale terbukti pada elemen asli) +
  kesamaan pola dengan tilt menu yang sudah lolos QA.
- `node --check` OK; brace CSS balanced.

## Tests

- Harness CDP sementara /tmp/opencode/: motion.js, motion2.js,
  motion3.js, mq.js, mq2.js, mob.js. Screenshot tidak diambil
  (geometri/computed cukup; smoothness butuh mata manusia).

## Failures

- Temuan verifikasi awal (hero--play false dkk.) = cache disk CDP basi
  (profil dipakai ulang) — BUKAN bug produk; diatasi dengan
  `Network.clearBrowserCache` + `setCacheDisabled` di harness.
- Sintesis PointerEvent tanpa char TIDAK mengaktifkan tombol (butuh
  keyDown+char+keyUp) — pelajaran harness, didokumentasikan di TASK-008.

## Retries

- Tidak ada (verifikasi ulang pasca-cache-clear langsung hijau).

## Security Findings

- Tidak ada CRITICAL/HIGH/MEDIUM. 0 sekret, 0 dependensi, 0 input baru;
  marquee aria-hidden (tanpa noise SR); spy hanya set/removeAttribute.

## Final Result

DONE — terverifikasi maksimal di headless. Sisa WAJIB mata manusia:
sign-off KEHALUSAN (timing/easing/rasa) di Brave + perangkat HP
(pointer/sentuh), karena model tanpa vision tak bisa menilai smoothness.

## Lessons

- Animasi entrance aman dengan pola "default tampil + class pemicu +
  fill backwards" — kegagalan JS tak pernah menyembunyikan konten.
- Properti CSS individual (`translate`) memisahkan concern dari
  `transform` (tilt/entrance/float) — komposisi tanpa konflik.
- Untuk loop marquee mulus: dua paruh identik (termasuk separator
  akhir) + translateX(-50%) + tanpa gap flex.
- Elemen `position:sticky` + transform reveal = artefak ukur ≤500ms;
  baku ukur ≥1500ms (pelajaran berulang — jadikan SOP harness).
- "Banyak animasi" harus diterjemahkan menjadi "sedikit pola yang
  dipakai konsisten" — profesionalisme = restraint, bukan kuantitas.

## Rules

- Create for significant tasks only; trivial edits get an event row.
- Do not store passwords, keys, tokens, or credentials.
- Quality check before writing: no-secret scan → bersih.
