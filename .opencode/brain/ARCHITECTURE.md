# ARCHITECTURE

> Project Brain file · Document the ACTUAL architecture. If the code contradicts this file, the code wins — update this file. Confidence markers apply per diagram and section.

> Status: **TERIMPLEMENTASI** — struktur di bawah diverifikasi langsung dari kode 2026-10-08 (CONFIRMED).

## Conceptual layers (top → bottom)

```
index.html (satu halaman, section per fitur)
→ css/ (styling, mobile-first, design tokens di :root)
→ js/ (interaksi ringan: nav, class .js — progressive enhancement)
→ (assets/ — RENCANA awal, belum dibuat; galeri pakai SVG inline)
```

Tanpa layer server/backend. (CONFIRMED — website statis)

## Actual folder structure (diverifikasi 2026-10-08)

| Path | Isi | Confidence |
|------|-----|------------|
| index.html | Satu halaman, 1007 baris: meta SEO + JSON-LD (+aggregateRating), 7 `<section>` + pita marquee, header/nav, footer, FAB WA, cart bar/panel, `<dialog id="lightbox">`, badge Terlaris, strip testimoni (data 2026-10-10) | CONFIRMED (wc -l, grep) |
| css/style.css | 2291 baris; custom properties di `:root` + `--header-h` terukur, mobile-first, blok motion (entrance/tilt/zoom/spy/pita/parallax) | CONFIRMED (2026-10-10) |
| js/main.js | 80 baris, `<script defer>`; menambahkan class `.js` ke `<html>` | CONFIRMED |
| js/lightbox.js | 168 baris (BARU 2026-10-10), `<script defer>`; pratinjau galeri progressive enhancement (tanpa JS: 0 tombol, galeri statis) | CONFIRMED |
| js/header.js | 66 baris, `<script defer>`; toggle class `header-compact` + ResizeObserver menulis `--header-h` terukur (tanpa JS: penuh + fallback statis) | CONFIRMED (2026-10-10) |
| docs/DESIGN_BRIEF.md | Brief desain ("Hangat Palembang, Hangat Kampus") | CONFIRMED |
| README.md | Cara menjalankan/men-deploy | CONFIRMED |
| assets/ | HADIR — foto stok + foto asli (`assets/img/*.jpg`, `assets/img/menu/*.jpg`, `LISENSI.md`) | CONFIRMED |

## Page sections (urutan konten — aktual)

| Blok | Elemen | Confidence |
|------|--------|------------|
| Header/nav | `<header>` sticky + nav list (toggle, class `.js`) | CONFIRMED |
| Hero | `<section id="hero">` — judul, tagline, CTA WA | CONFIRMED |
| Cerita singkat | `<section id="cerita">` | CONFIRMED |
| Menu | `<section id="menu">` — `.menu-nav` chip kategori sticky (4 tautan → 4 `.menu-group[id]`) + 4 grup, 23 kartu harga (tiap kartu: media + nama + harga + deskripsi + stepper; **kompak di mobile**, besar ≥768px) + disclaimer-box | CONFIRMED (2026-10-10) |
| Lokasi | `<section id="lokasi">` — alamat, jam, link Maps, iframe embed | CONFIRMED |
| Galeri | `<section id="galeri">` — 4 foto stok (grid 2×2) + strip testimoni 3 kutipan; klik foto → lightbox `<dialog>` (`js/lightbox.js`) | CONFIRMED (2026-10-10) |
| Kontak | `<section id="kontak">` — tombol WA + link IG | CONFIRMED |
| Footer | `<footer>` — link WA/IG, teks hak cipta | CONFIRMED |
| FAB | `<a class="fab-wa">` tombol WhatsApp melayang | CONFIRMED |

## Styling & responsiveness

- Mobile-first; breakpoint `min-width: 768px` dan `min-width: 1024px` (+ `prefers-reduced-motion` gate untuk animasi). Kartu menu: base kompak (thumbnail 92px + teks) → layout besar dipulihkan di `min-width: 768px`. (CONFIRMED — css/style.css)
- Design tokens di `:root`: `--color-primary #8B3E2F`, `--color-accent #3A7C59`, `--color-surface #F7F3EB`, `--color-text #1F1B18`, `--color-header-bg`, `--nav-h`, `--menu-nav-h 61px`, dll; kontras AA dicatat sebagai komentar. (CONFIRMED — style.css)
- `html { scroll-padding-top: calc(var(--header-h, var(--nav-h)) + --space-2) }` + `.menu-nav { top: var(--header-h, var(--nav-h)) }` — offset mengikuti tinggi header TERUKUR; `.menu-group[id] { scroll-margin-top: var(--menu-nav-h) }` (aditif, tinggi chip konstan) — blok magic 768–967px dihapus 2026-10-10. (CONFIRMED — style.css, diukur CDP)

## Dependencies between modules

- JS hanya progressive enhancement di atas HTML; halaman tetap terbaca tanpa JS (script `defer`, class `.js` ditambahkan oleh main.js). (CONFIRMED — js/main.js baris 79)
- Tidak ada dependensi antar file selain CSS/JS yang di-link dari index.html. (CONFIRMED — sifat statis)

## External services & integration points

| Service | Purpose | Interface | Confidence |
|---------|---------|-----------|------------|
| Google Fonts | Poppins (600/700) + Inter (400/500) | CDN `<link>` fonts.googleapis.com | CONFIRMED (index.html baris 33) |
| Google Maps | Embed peta lokasi | iframe embed + link pencarian | CONFIRMED |
| WhatsApp | Tombol kontak (header/hero/kontak/FAB) | deep link https://wa.me/628814105501 | CONFIRMED |
| Instagram | Link profil (JSON-LD `sameAs`, kontak, footer) | https://www.instagram.com/pempek_yuktiti/ | CONFIRMED |

Tidak ada API key yang dibutuhkan untuk integrasi di atas. (CONFIRMED)

## SEO / structured data (aktual)

- `meta description`, Open Graph (og:title/desc/type/image placeholder), JSON-LD `Restaurant` dengan `priceRange: "Rp 3.000–15.000"`. (CONFIRMED — index.html)
- TODO menunggu domain: `canonical`, `og:url`, `og:image` final, JSON-LD `url` + `hasMenu` (placeholder "GANTI-DOMAIN-ANDA"). (CONFIRMED — komentar TODO) → KNOWN_ISSUES ISSUE-003

## API flow / Database flow / Authentication flow

- Tidak ada — website statis tanpa backend, tanpa database, tanpa autentikasi. (CONFIRMED)

## Drift watch

- Divergensi kecil dari rencana awal: folder `assets/` tidak dibuat (tidak ada gambar aset); seluruh struktur lain sesuai rencana. (CONFIRMED — tidak cukup berarti untuk laporan drift terpisah)
- Jika kode berubah lagi (mis. pemisahan file, penambahan aset gambar), verifikasi ulang tabel di atas dan catat perubahan berarti di ARCHITECTURE_DRIFT.md.
