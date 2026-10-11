# TECHNICAL_DEBT

> Project Brain file · Tracked debt only; capture each item with impact and a recommended solution. Confidence markers apply.

## Debt item template

### <short title>
- **Description:** (CONFIRMED)
- **Impact:** (what it costs — INFERRED/CONFIRMED)
- **Priority:** HIGH / MEDIUM / LOW
- **Estimated complexity:** S / M / L / XL
- **Recommended solution:** (CONFIRMED/INFERRED)
- **Status:** OPEN / SCHEDULED / ADDRESSED

## Debt items

### TD-PERF-01 · Thumbnail menu oversized (800px → 92px tampil)
- **Description:** 23 foto menu disimpan 800px JPEG namun ditampilkan 92×92px di mobile (×8,7 linear). Tidak ada `srcset`/WebP. (CONFIRMED — audit performa 2026-10-11)
- **Impact:** ± 1,4–1,6 MB terbuang pada muat penuh; memperlambat mobile. (CONFIRMED)
- **Priority:** HIGH
- **Estimated complexity:** M
- **Recommended solution:** WebP ~200px + `srcset`/`sizes` (pertahankan `loading="lazy"`). (CONFIRMED)
- **Status:** ADDRESSED (2026-10-11) — 69 varian WebP (`<slug>-{200,400,800}.webp`) + `<picture>`/`srcset`/`sizes` di 23 kartu menu; JPEG tetap fallback. Muat penuh 2,71 MB → 0,70 MB (−74%). Lihat CHANGE_HISTORY 2026-10-11.

### TD-PERF-02 · Hero image 1600px/188KB untuk mobile (elemen LCP)
- **Description:** `hero-pempek.jpg` 1600×1063, 188KB JPEG, ditampilkan ±390px di mobile. (CONFIRMED)
- **Impact:** LCP 3,1 dtk pada Slow-4G (target <2,5). (CONFIRMED)
- **Priority:** HIGH
- **Estimated complexity:** S
- **Recommended solution:** `srcset` 800/1600 + WebP, pertahankan `fetchpriority="high"`; pertimbangkan `<link rel="preload">`. (CONFIRMED)
- **Status:** ADDRESSED (2026-10-11) — hero `<picture>` WebP `{400,800,1600}.webp` (crop 16:9, 13/32/80 KB) + `fetchpriority="high"` dipertahankan; elemen LCP kini WebP 400w. LCP Slow-4G 2356–3456 → **1856–2056 ms**. Lihat CHANGE_HISTORY 2026-10-11.

### TD-PERF-03 · Kode dikirim tanpa kompresi/minify
- **Description:** 179,3KB kode mentah (HTML/CSS/JS). Server lokal tanpa gzip. (CONFIRMED)
- **Impact:** Beban jaringan lebih besar saat deploy; gzip memangkas 76% (→43,5KB). (CONFIRMED)
- **Priority:** HIGH
- **Estimated complexity:** S (di sisi hosting)
- **Recommended solution:** Aktifkan gzip/brotli di hosting + minify HTML/CSS/JS saat deploy. (CONFIRMED)
- **Status:** OPEN (deploy-time) — membutuhkan hosting + langkah build; di luar lingkup optimasi klien 2026-10-11. Tetap berlaku sampai hosting dipilih.

### TD-PERF-04 · CLS ambang batas (font swap)
- **Description:** CLS 0,091 (baseline) / 0,105 (Slow-4G); satu pergeseran tunggal dari font swap (t≈729ms) pada teks nav/brand. (CONFIRMED)
- **Impact:** Nyaris menembus ambang <0,1 "baik"; berisiko di perangkat lambat. (INFERRED)
- **Priority:** MEDIUM
- **Estimated complexity:** S–M
- **Recommended solution:** Preload file font, atau `size-adjust` metrik fallback, atau `font-display: optional` untuk font non-kritis. (INFERRED)
- **Status:** ADDRESSED (2026-10-11) — font self-host + preload 2 `woff2` kritis; CLS terukur **0** (Slow-4G, cache off). Lihat CHANGE_HISTORY 2026-10-11.

### TD-PERF-05 · Font eksternal render-blocking 73KB
- **Description:** Google Fonts (Inter + Poppins), 2 permintaan, render-blocking. Sudah ada preconnect + display=swap. (CONFIRMED)
- **Impact:** Tambahan 73KB + RTT sebelum teks final. (INFERRED)
- **Priority:** LOW
- **Estimated complexity:** M
- **Recommended solution:** Subset/self-host (glyph Latin saja) atau kurangi jumlah berat font. (INFERRED)
- **Status:** ADDRESSED (2026-10-11) — font di-host sendiri (`assets/fonts/`, subset Latin, `woff2`): Inter variable 48,5 KB + Poppins 600/700 8,0/7,8 KB (total ±64 KB, vs ±73 KB CDN) + tanpa RTT cross-origin & tanpa render-blocking stylesheet eksternal. Lihat CHANGE_HISTORY 2026-10-11.

### TD-PERF-06 · `style.css` 72KB mentah render-blocking
- **Description:** Satu berkas CSS 71,7KB tanpa pemisahan kritis. (CONFIRMED)
- **Impact:** Menunda render awal; gzip menurunkan ke ±18KB. (INFERRED)
- **Priority:** LOW
- **Estimated complexity:** M
- **Recommended solution:** Purge/pecah CSS kritis vs non-kritis saat build. (INFERRED)
- **Status:** OPEN (deploy-time) — butuh langkah build; di luar lingkup optimasi klien 2026-10-11.

## Examples worth tracking

- duplicated code
- outdated dependencies
- temporary workarounds (marked TODO in code)
- missing tests on critical paths
- architectural compromises
- known performance problems

## Maintenance

- Prune items that are no longer valid. Do not delete history silently — mark ADDRESSED with a pointer to the change.