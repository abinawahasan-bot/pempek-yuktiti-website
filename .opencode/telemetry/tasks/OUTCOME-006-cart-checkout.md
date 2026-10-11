# Task Outcome Record — TASK-006

Per-project telemetry for SIGNIFICANT tasks only. Location:
`.opencode/telemetry/tasks/`. Never contains secrets (ENV_VAR_NAME only).

## Task

Upgrade bagian menu menjadi pengalaman belanja ala olshop tanpa backend:
(1) foto bebas lisensi di setiap kartu menu (23 item, Pexels, lokal +
`LISENSI.md`), (2) hapus 23 tombol "Pesan" per kartu → stepper jumlah
(+/-) per kartu, (3) keranjang belanja (cart bar sticky + panel sheet)
dengan **satu tombol pesan**, (4) kalkulator total otomatis
(subtotal per item → total), (5) checkout WhatsApp berisi rincian
item + total — semua zero-dependency, progressive enhancement,
konsisten gating proyek (dark/reduce/print/no-JS).

## Category

feature (e-commerce lite / conversion), UX, accessibility, security-hardening
(XSS textContent), performance-aware (lazy images, CLS aman)

## Agents Used

- frontend-developer — implementasi penuh: markup kartu (media +
  stepper), cart bar/panel/backdrop + aria, `js/cart.js` (371 baris;
  IIFE; harga di-parse dari `.card-menu__price` single source; nama
  dari `data-item-name`; state `sessionStorage.pyt_cart`; focus trap +
  Escape; checkout wa.me itemized + Total), unduh 23 foto Pexels ke
  `assets/img/menu/` + LISENSI.md; probe cart-probe A–I semua PASS +
  p0-probe 46/46 + regresi qa-dm-08/10. (SUKSES)
- qa-engineer — QA independen **193 PASS / 0 FAIL / 21 INFO, verdict
  PASS**: integritas 23 kartu/23 foto/1 CTA statis/wa.me statis 6;
  math qty cap 99; reload persist; storage korup aman; checkout 23
  item → total Rp 167.000 benar, URL 1821 ≤ 2500; focus trap
  Tab/Shift+Tab, Escape→fokus balik, backdrop, announcer; no-JS full;
  layout 320–1280 × light/dark overflow 0, body padding 72, panel ≤
  85vh; kontras light 6.85 / dark 4.95; regresi dark/splash/reveal/
  print/header 97/73; console 0 error. (SUKSES)
- code-reviewer — APPROVE_WITH_NITS (0 CRIT/HIGH/MED): 3 LOW + 4
  NIT/INFO. LOW-1 z-index modal di bawah header/skip-link; LOW-2
  scroll-lock hilang (`body.cart-open` tanpa rule); LOW-3 stepper ikut
  tercetak; NIT aria-live ganda. Positif terverifikasi: math 47.500
  tepat, XSS aman (bukti runtime storage korup → textContent),
  MAX_QTY anti-race 120 klik, trap lengkap, no-JS sempurna, reduce
  lengkap, CLS aspect-ratio, dark konsisten. Klarifikasi: `theme.js`
  91→109 = fix LOW-1 dark mode lama (bukan regresi baru).
  (SUKSES)
- frontend-developer (ronde 2) — fix 3 LOW + 1 NIT: z-index
  backdrop/panel → 400/410 (di atas skip-link 300, di bawah splash
  9998), `body.cart-open{overflow:hidden}`, print → stepper
  display:none, aria-live hanya di `data-cart-live`; lowyx-fix.mjs
  semua PASS + cart-probe regresi semua PASS; frozen JS md5 utuh.
  (SUKSES)
- orchestrator — dispatch, sinkronisasi README/brain/telemetry.

## Skills Used

orchestration, telemetry; security review via code-reviewer (XSS,
rel, z-index), a11y via QA (dialog/trap/announcer), perf-aware
lazy/CLS via dev probes.

## Files Changed

- `index.html` (650→884) — 23 `.card-menu__media` (img lazy +
  width/height + alt) + 23 `.card-menu__stepper` (+/−, data-cart-action/
  id/name, aria-label) menggantikan 23 `card-menu__order` (0 tersisa);
  cart markup sebelum </body> (`.cart-bar`, `.cart-backdrop`,
  `.cart-panel` role=dialog aria-modal aria-labelledby, `aria-live`
  `data-cart-live`); `<script defer src="js/cart.js">`; `.menu-cta-static`
  fallback no-JS; langkah 2 `#cara-pesan` disesuaikan alur keranjang.
- `css/style.css` (1423→1702) — media/stepper/cart styles; z-index
  backdrop 400/panel 410; `body.cart-open` scroll lock; compaction
  479px; print & reduce menyembunyikan bar/panel/backdrop/stepper;
  `body.has-cart .fab-wa{display:none}`.
- `js/cart.js` (BARU, 371 baris) — satu-satunya pemilik perilaku cart;
  harga dari DOM `.card-menu__price`; pesan WA dibangun runtime.
- `assets/img/menu/` (BARU) — 23 jpg Pexels (800px, ≥20KB) +
  `LISENSI.md`.
- `README.md` — struktur, WA 29→6 statis (+1 runtime di cart.js),
  panduan keranjang/checkout + harga single-source, foto menu & lisensi.
- Brain: CURRENT_STATE, CHANGE_HISTORY, KNOWN_ISSUES (ISSUE-004 →
  FIXED), INDEX.
- `js/main.js`, `js/theme.js`, `js/animations.js` — TIDAK disentuh
  (md5 e2c4381b…/15663fcb…/1d0594a9…, sama pra-pasca; theme.js 109 =
  baseline sejak fix LOW-1 dark mode).

## Validation

- QA: 193 PASS / 0 FAIL / 21 INFO (integritas, math, persistensi,
  checkout, a11y trap, no-JS, layout 7×2, kontras, regresi,
  screenshot). Review: APPROVE_WITH_NITS + 3 LOW FIXED + retest
  lowyx-fix semua PASS + cart-probe regresi semua PASS; console
  0 error; frozen JS md5 utuh.

## Tests

- Harness CDP sementara /tmp/opencode/: cart-probe.mjs (A–I),
  lowyx-fix.mjs, p0-probe.mjs (46), p0-layout.mjs, p0-r2-probe.mjs,
  qa-cart/ (REPORT.md + skrip), qa-dm-08/10.
- Screenshot: /tmp/opencode/{cart-shots,qa-cart-shots,lowyx-shots}/.
- Klik WA nyata di HP user: BELUM (tab api.whatsapp.com + pesan
  terverifikasi headless; pengiriman butuh perangkat).

## Failures

- 3 LOW review (non-blocking, FIXED).
- QA:"13 kegagalan layout + 1 reveal" pada percobaan awal = race
  harness (pengukuran sebelum transisi 280ms / stagger selesai) —
  bukan bug produk; setelah harness menunggu transisi: 0 fail.
- List foto Pexels: satu URL 404 → diganti item lain (dokumentasi di
  LISENSI.md).
- Dev: headless compositor starvation dengan 23 foto (first-load)
  — artefak headless; device real (GPU) tidak terpengaruh; probe
  menambahkan settle/eager-decode kompensasi.

## Retries

- 1 ronde fix pasca-review (3 LOW + 1 NIT), semua retest hijau.

## Security Findings

- Tidak ada CRITICAL/HIGH/MEDIUM. XSS: seluruh render item pakai
  textContent (terbukti runtime dengan nama item injeksi dari storage
  korup). URL checkout hanya scheme `https://wa.me` dengan text=
  URL-encoded; `target=_blank rel=noopener noreferrer`. 0 sekret,
  0 dependensi baru, 0 eval/innerHTML dinamis. wa.me statis 6 + 1
  konstanta runtime = 1 nomor konsisten.

## Final Result

DONE — QA PASS (193/0/21), review APPROVE_WITH_NITS + 3 LOW FIXED +
retest hijau. Sisa: 1 klik WA sungguhan di HP user (pesan itemized +
total), sign-off visual user (panel/cart bar & foto menu), foto asli
warung menggantikan stok Pexels (ISSUE-002).

## Lessons

- Keranjang tanpa backend bisa dibangun murni client-side untuk UMKM:
  sessionStorage + WhatsApp deep link; kunci UX = harga single-source
  DOM (parser `.card-menu__price`) agar pengeditan cukup di 1 tempat.
- Progressive enhancement wajib direncanakan dari awal untuk fitur
  JS-berat: `.js` gating + CTA statis fallback menjaga "no-JS tetap
  bisa pesan" (prinsip proyek).
- Komponen overlay baru harus diperiksa z-index terhadap elemen global
  (header 200, skip-link 300, FAB 150, splash 9998) — review menangkap
  modal tertutup header (LOW-1).
- Scroll lock dialog: class-body + CSS `overflow:hidden` lebih
  portabel ke iOS Safari daripada pendekatan JS manual.
- Daftar elemen di kill-switch `prefers-reduced-motion` DAN di
  `@media print` wajib diperbarui tiap kontrol baru (gap muncul dua
  kali: .card-menu__order lalu .card-menu__stepper).
- 23 foto memberi beban kompositor pada headless; verifikasi gambar
  (naturalWidth, HTTP 200, dimensi, LISENSI) harus eksplisit di QA
  agar tidak ada gambar rusak di produksi.

## Rules

- Create for significant tasks only; trivial edits get an event row.
- Do not store passwords, keys, tokens, or credentials.
- Quality check before writing: no-secret scan → bersih (record ini
  tidak memuat kredensial/token/kunci).