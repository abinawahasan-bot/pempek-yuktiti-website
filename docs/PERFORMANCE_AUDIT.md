# Audit Performa — Pempek Yuk Titi

- **Tanggal:** 2026-10-11
- **Metode:** Playwright 1.63 + Chromium sistem (151), viewport 390×844, cache **dinonaktifkan**,
  dua skenario: **baseline** (localhost, tanpa throttle) dan **Slow-4G + CPU 4×** (estimasi mobile realistis).
- **Server uji:** `python3 -m http.server` lokal (**tanpa gzip/brotli**) → angka transfer adalah **kasus terburuk**.
- **Sumber angka:** Performance API (`navigation`, `paint`, `largest-contentful-paint`,
  `layout-shift`, `longtask`, `resource`) + pengukuran DOM. Bukan estimasi Lighthouse.

> Ringkas: bobot **gambar** mendominasi; kode CSS/HTML/JS kecil dan tinggal di-*compress* di hosting.
> LCP pada 4G ≈ **3,1 dtk** (perlu < 2,5 dtk) dan CLS **≈ 0,09–0,10** (ambang batas). Dua area ini
> adalah prioritas perbaikan.

## 1. Metrik utama

| Metrik | Baseline | Slow-4G + CPU 4× | Target | Status |
|---|---|---|---|---|
| FCP | 456 ms | 2 052 ms | < 1 800 ms | ⚠️ (4G) |
| **LCP** | 456 ms | **3 136 ms** | < 2 500 ms | ❌ (4G) |
| **CLS** | 0,091 | 0,105 | < 0,1 | ⚠️ batas |
| Long task (total) | 119 ms | 656 ms | minimize | — |
| TTFB | 6 ms | 6 ms | < 800 ms | ✅ |
| DOMContentLoaded | 514 ms | 2 714 ms | — | — |
| Load | 519 ms | 3 579 ms | — | — |
| Elemen LCP | `IMG` (hero) | `IMG` (hero) | — | — |

## 2. Bobot halaman

| | Permintaan | Transfer | Gambar |
|---|---|---|---|
| Muat awal (above-the-fold) | 13 | **563 KB** | 4 |
| Halaman penuh (semua gambar lazy) | **38** | **2 644 KB (≈ 2,6 MB)** | 28 |

**Per tipe (muat awal):** img 445 KB · fonts/other 73 KB · js 44 KB · other 0,6 KB.

Empat pembebanan terbesar: `hero-pempek.jpg` (188 KB), `lenggang.jpg` (108 KB),
`kapal-selam.jpg` (95 KB), `css/style.css` (72 KB).

## 3. Analisis aset

- **28 gambar, total 2,5 MB** — semuanya **JPEG**. **Tidak ada** `srcset`, `<picture>`, WebP, atau AVIF.
- **Oversizing besar** (natural vs ukuran tampil):
  - Thumbnail menu: **800 px natural → 92×92 px tampil di mobile** ≈ **×8,7 linear** (≈ 75× luas). Berlaku untuk **23 gambar menu**.
  - Hero: **1600×1063 natural → ± 390 px** di mobile (×4) dan 1020 px di desktop (×1,6).
  - Rata-rata oversizing mobile ≈ **×6,4**.
- **Kode sumber** (tanpa kompresi → gzip):

  | Berkas | Mentah | gzip | Turun |
  |---|---|---|---|
  | `index.html` | 65,1 KB | 10,3 KB | −84% |
  | `css/style.css` | 71,7 KB | 18,1 KB | −75% |
  | seluruh `js/*` (7 berkas) | 42,5 KB | 15,0 KB | −65% |
  | **Total kode** | **179,3 KB** | **43,5 KB** | **−76%** |

- **Font:** Google Fonts (Inter 400/500 + Poppins 600/700), 2 permintaan, ± 73 KB. Sudah ada
  `preconnect` + `display=swap`. **Render-blocking** (stylesheet eksternal).

## 4. Hal yang sudah baik ✅

- `preconnect` ke `fonts.googleapis.com`/`fonts.gstatic.com` + `display=swap`.
- Hero: **`fetchpriority="high"`** + `decoding="async"` + **tidak** lazy (benar).
- **28 dari 32** `<img>` memakai `loading="lazy"`; semua `<script>` pakai `defer`; CSS di `<head>`.
- Gambar lokal (tidak hotlink), `width`/`height` diset, JSON-LD, desain mobile-first.

## 5. Temuan & rekomendasi (berurut dampak)

| # | Prioritas | Temuan | Bukti | Rekomendasi |
|---|---|---|---|---|
| 1 | **HIGH** | Thumbnail menu 800 px disajikan ke kotak 92 px (mobile) | ×8,7, 23 gambar | Ganti ke **WebP ~200 px** + `srcset`/`sizes`; `loading="lazy"` tetap. Perkiraan hemat ± 1,4–1,6 MB pada muat penuh |
| 2 | **HIGH** | Hero JPEG 188 KB (1600 px) di-HP | elemen LCP = hero IMG | **`srcset` 800/1600 + WebP**, pertahankan `fetchpriority="high"`; pertimbangkan `<link rel="preload">` |
| 3 | **HIGH** | Kode dikirim mentah (server lokal tanpa kompresi) | 179 KB → 43,5 KB gzip | Aktifkan **gzip/brotli** di hosting + **minify** HTML/CSS/JS saat deploy |
| 4 | **MEDIUM** | **LCP 3,1 dtk** pada Slow-4G | target < 2,5 dtk | Perbaiki #2 (hero) menjadi tuas utama; preload hero |
| 5 | **MEDIUM** | **CLS 0,091–0,105** — satu pergeseran tunggal dari **font swap** | `layout-shift` t≈729 ms pada teks nav/brand | **Preload file font** atau `size-adjust` metrik fallback, atau `font-display: optional` untuk font non-kritis |
| 6 | **LOW** | Font eksternal 73 KB, render-blocking | 2 permintaan | Subset/self-host font (mis. hanya glyph Latin), atau turunkan jumlah berat |
| 7 | **LOW** | `style.css` 72 KB mentah mengangkut 1 render-blocking | — | Purge/pecah CSS saat build; gzip sudah sangat membantu |

## 6. Catatan metodologi

- Angka transfer **tanpa kompresi** (server dev). Di hosting nyata dengan gzip/brotli, beban kode turun ±76%.
- `transferSize` lintas-origin (Google Fonts) bisa terbaca 0 tanpa Timing-Allow-Origin; 73 KB adalah
  penjumlahan `decodedBodySize` dari 2 berkas font.
- Gambar lightbox galeri mengisi `src` **hanya saat dibuka**, jadi tidak ikut muat awal (perilaku yang benar).
- Skenario "Slow-4G" = 1,6 Mbps unduh / 750 kbps unggah / RTT 150 ms + CPU 4× (parameter ala Lighthouse mobile).
- `longtask` = total durasi tugas > 50 ms sebagai pendekatan kasar TBT (bukan InP).

## 7. Langkah berikut (usulan, menunggu persetujuan)

1. **Tercepat & berdampak besar:** aktifkan kompresi di hosting saat deploy (#3) — nol perubahan kode.
2. **Konversi gambar ke WebP** + `srcset` untuk hero & thumbnail menu (#1, #2) — hemat terbesar di jaringan seluler.
3. **Atasi CLS font** (#5) agar aman di bawah 0,1 di semua perangkat.

> Semua perubahan gambar bersifat optimasi non-visual (kualitas dipertahankan) dan dapat diuji
> ulang dengan harness yang sama untuk membandingkan sebelum/sesudah.
