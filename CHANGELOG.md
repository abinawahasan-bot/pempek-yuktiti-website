# Changelog

Semua perubahan penting pada proyek **Pempek Yuk Titi (UII Jakal)** didokumentasikan di berkas ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
dan proyek ini menganut [Semantic Versioning](https://semver.org/lang/id/).

> **Catatan status:** situs ini **belum di-deploy publik** (lihat `README.md`).
> Versi `1.0.0` menandai milestone implementasi v1 (2026‑10‑08). Semua perubahan
> setelahnya masih berada di bagian `[Unreleased]` sampai rilis/deploy pertama.
> Jenis perubahan: `Added` · `Changed` · `Deprecated` · `Removed` · `Fixed` · `Security`.

## [Unreleased]

### Added

- **Mode gelap (dark mode)** — tombol toggle di navigasi; default mengikuti preferensi
  sistem, pilihan eksplisit disimpan (`localStorage.pyt_theme`); anti‑FOUC; sinkron
  antar‑tab; gate berlapis agar tetap terang tanpa JS. (2026‑10‑09)
- **Section "Cara Pesan"** (`#cara-pesan`) berisi 3 langkah + CTA WhatsApp. (2026‑10‑09)
- **`favicon.svg`** di root — menghilangkan 404 `favicon.ico`. (2026‑10‑09)
- **Keranjang belanja + checkout WhatsApp** — stepper jumlah per kartu, bilah keranjang
  sticky (badge + total berjalan), panel keranjang (`role=dialog`, Esc, focus trap,
  backdrop), state `sessionStorage.pyt_cart`, pesan WhatsApp ter‑itemisasi + total. (2026‑10‑09)
- **23 foto menu** (Pexels, ≤800px, `loading="lazy"`, `width`/`height`) di
  `assets/img/menu/` + `assets/img/menu/LISENSI.md` (sumber & lisensi per berkas). (2026‑10‑09)
- **Trust chips hero** + **rating Google** (★ 4,9/5 · 139 ulasan, tautan ke Maps) +
  badge **"Terlaris"**. (2026‑10‑10)
- **Lightbox galeri** berbasis `<dialog>` native (progressive enhancement; tanpa JS galeri
  tetap gambar statis). (2026‑10‑10)
- **Navigasi chip kategori sticky** (`#menu-nav`) + **kartu menu kompak** mobile‑first +
  **23 deskripsi menu**. (2026‑10‑10)
- **Section testimoni pelanggan** (3 kutipan) + galeri dirapikan menjadi grid 2×2. (2026‑10‑10)
- **Header compact saat menggulir** (`js/header.js`). (2026‑10‑10)
- **Paket motion**: pita marquee, entrance hero berjenjang, parallax halus, zoom foto menu,
  scroll‑spy chip kategori. (2026‑10‑10)
- Fallback "Memuat peta…" untuk embed Maps & fallback teks galeri. (2026‑10‑10)
- **Aset gambar WebP berukuran ganda** — hero (`hero-pempek-{400,800,1600}.webp`, crop 16:9) +
  69 varian menu (`<slug>-{200,400,800}.webp`, 23 item) di `assets/img/`; JPEG asli tetap ada
  sebagai fallback `<picture>`. (2026‑10‑11)
- **Font self‑host** — Inter (variable 400–500) + Poppins 600/700 (subset Latin, `woff2`) di
  `assets/fonts/` + `css/fonts.css` (`@font-face`, `font-display: swap`, `unicode-range` Latin);
  menggantikan Google Fonts CDN; lisensi OFL disertakan. (2026‑10‑11)
- **Kit deportime (kompresi + caching)** — `deploy/.htaccess` (Apache/cPanel: brotli/gzip + MIME
  `.woff2`/`.webp` + caching + header keamanan), `deploy/_headers` (Netlify/Cloudflare Pages),
  `deploy/README.md` (panduan); README §D. **Tanpa build step** (sesuai DECISIONS #1). Kompresi
  terukur pada kode asli: **188 KB → 41 KB gzip (−78%) / 35 KB brotli (−82%)**. (2026‑10‑11)

### Changed

- **Optimasi performa (gambar + font)** — hero & 23 kartu menu kini `<picture>` (WebP via
  `srcset`/`sizes`, JPEG fallback; hero `width/height` 1600×1063 → 1600×900 crop 16:9); 3 `<link>`
  Google Fonts diganti **preload** 2 `woff2` kritis (Inter, Poppins 700) + `css/fonts.css` lokal.
  Hasil terukur (Slow‑4G, cache off): **LCP 2056→1856 ms**, **CLS 0**, muat awal **576→223 KB (−61%)**,
  muat penuh **2,71→0,70 MB (−74%)**. (2026‑10‑11)
- **Target sentuh tombol stepper `+/-`** dinaikkan `38px → 44px` (memenuhi rekomendasi
  WCAG 2.2 Target Size). (2026‑10‑11)
- **Offset header dinamis** via `ResizeObserver` (`--header-h`) menggantikan nilai manual
  `+31px`/`+56px`. (2026‑10‑10)
- 23 tombol "Pesan" per kartu **digantikan stepper keranjang**; CTA statis menjadi fallback
  tanpa‑JS. (2026‑10‑09)
- Nomor WhatsApp disatukan (6 statis + 1 konstanta runtime di `js/cart.js`).
- Koreksi rentang harga SEO di kode: Rp 3.500–15.000 → **Rp 3.000–15.000**.

### Fixed

- **favicon.ico 404** → ditambahkan `favicon.svg`. (2026‑10‑09)
- Temuan review v1 **RV‑01..07**.
- **Dark mode**: sinkron antar‑tab (F‑LOW‑01), tombol inert saat skrip gagal (F‑LOW‑02),
  ARIA basi saat OS berganti skema (LOW‑1). (2026‑10‑09)
- **Keranjang**: z‑index panel di bawah header (LOW‑1), kunci gulir saat panel terbuka
  (LOW‑2), stepper ikut tercetak (LOW‑3), `aria-live` ganda (NIT). (2026‑10‑09)
- **Lightbox**: meta terklip di viewport pendek (M1), guard `showModal()` (M2), tombol
  yatim bila skrip dievaluasi ulang (L1), dll. (2026‑10‑10)
- **Offset anchor** aditif (~+63px) → mendarat konsisten **+8px** di bawah baris chip. (2026‑10‑10)

### Removed

- **2 foto asli galeri** (`yuk-titi.jpg`, `yuk-titi-1.jpg`) atas permintaan pemilik
  (konten dinilai tidak cocok + crop parah). (2026‑10‑10)
- 23 tombol `card-menu__order` (digantikan stepper). (2026‑10‑09)
- Dead code: blok `.gallery-placeholder*`, blok kompensasi offset manual 768–967px,
  array `triggers` mati di `js/lightbox.js`.

### Security

- Tidak ada temuan CRITICAL/HIGH. 0 sekret di repo, 0 dependensi pihak ketiga (plug‑in
  CDN hanya Google Fonts & embed Maps). Semua tautan eksternal memakai
  `rel="noopener"`. Referensi rahasia di dokumentasi memakai placeholder `ENV_VAR_NAME`.

## [1.0.0] - 2026-10-08

Rilis awal — situs statis satu halaman (HTML/CSS/JS murni, tanpa build step).

### Added

- **Struktur situs** `index.html`: hero, cerita/kisah warung, menu + harga (23 varian
  pempek beserta disclaimer harga), lokasi (embed Google Maps), kontak (WhatsApp + Instagram).
- **Foto stok** (Pexels) untuk hero dan galeri, disimpan lokal (tidak hotlink).
- **Animasi 3D** (`js/animations.js`): reveal saat gulir, tilt hero/menu, hover lift,
  FAB pulse — semuanya berbasis `transform`/`opacity` dengan gate aksesibilitas.
- **Latar dekoratif** (gradien + motif songket halus + blob brand) dan **intro splash**
  sekali per sesi (`sessionStorage.pyt_splash`).
- **Desain mobile‑first** dengan design token (palet terakota/hijau/krem; font
  Poppins + Inter) di `css/style.css`.
- **SEO dasar**: `lang="id"`, `<title>`/meta description, JSON‑LD `Restaurant`,
  struktur heading semantik.
- **Struktur proyek**: `css/`, `js/`, `assets/`, `docs/DESIGN_BRIEF.md`, `README.md`.
- **Project Brain** (memori proyek) di `.opencode/brain/`.

[Unreleased]: https://example.com/pempek-yuktiti-website/compare/v1.0.0...HEAD
[1.0.0]: https://example.com/pempek-yuktiti-website/releases/tag/v1.0.0
