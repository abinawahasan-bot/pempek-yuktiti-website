# DESIGN BRIEF - Pempek Yuk Titi (UII Jakal)

> Hasil berbasis Project Brain: INDEX, PROJECT, REQUIREMENTS, CONVENTIONS, DECISIONS, CURRENT_STATE, KNOWN_ISSUES. Dibuat untuk implementasi HTML/CSS/JS murni, mobile-first, satu halaman.

## 1. Design Direction

### Konsep utama: "Hangat Palembang, Hangat Kampus"
**Rasional:** Mengangkat citra pempek Palembang yang kasual, hangat dan menggugah selera; ramah anak kuliahan UII dan warga lokal. Fokus pada kehangatan melalui warna krem hangat, aksen cuko yang berani, tipografi yang kuat & mudah dibaca tanpa ketergantungan foto.

**Vibe:** 
- Kuliner Indonesia hangat & menggugah selera (bukan korporat steri)
- Kasual, ramah, merakyat (Rp 3.500–15.000)
- Signature: cuko tebal manis-pedas
- Terasa spesifik pempek Palembang

### Alternatif singkat (ditolak)
**Alternatif:** Minimalis netral (monokrom + 1 warna) — ditolak karena terlalu "template generik" dan kurang membangkitkan selera khas pempek/cuko.

## 2. Color Palette & Design Tokens

Semua token didefinisikan via `CSS custom properties` (`:root`) dengan peran jelas. Target kontras **WCAG AA** minimum untuk teks.

| Token | HEX | Kegunaan | Catatan Kontras (target) |
|---|---|---|---|
| `--color-primary` | `#8B3E2F` | Tombol/CTA, heading penting, link interaktif | Terakota gelap — kontras tinggi thd krem/surface terang |
| `--color-secondary` | `#D97757` | Aksen hangat (hover/focus accent) | Gunakan hati-hati untuk teks kecil; lebih cocok untuk border/accent |
| `--color-accent` | `#3A7C59` | Aksen segar (badge, highlight) | Teal-hijau untuk kontras & kontras cukup vs surface |
| `--color-surface` | `#F7F3EB` | Latar halaman (krem hangat) | Latar netral hangat, tidak menusuk mata |
| `--color-surface-2` | `#EFE7DC` | Kartu/menu/info | Varian krem lebih dalam untuk membedakan blok |
| `--color-text` | `#1F1B18` | Teks utama | **Kontras ≥ 4.5:1** vs `--color-surface` (sangat aman) |
| `--color-text-muted` | `#5C524D` | Teks sekunder | **Kontras ≥ 4.5:1** vs `--color-surface` (aman) |
| `--color-border` | `#D7CCC2` | Border, pemisah | Subtle, tidak mengurangi kontras teks |
| `--color-warning` | `#B45309` | Box disclaimer | Kontras cukup vs `--color-surface` untuk teks; gunakan untuk peringatan |
| `--color-wa` | `#25D366` | Tombol WhatsApp (FAB & CTA) | Tetap gunakan teks/icon kontras (putih) di atasnya |

**Rekomendasi arah:** Nuansa "cuko/kaning" — terakota/merah-bata gelap sebagai primary, krem hangat sebagai surface, hijau/teal segar sebagai accent. Sesuai vibe tanpa berlebihan.

## 3. Tipografi

Gunakan **Google Fonts** (link resmi). 2 keluarga: heading + body.

| Role | Font (Google Fonts) | Weight | Notes |
|---|---|---|---|
| Heading (`h1–h6`) | `Poppins` | 600–700 | Kuat, modern, terbaca, cocok untuk "signature" hangat tanpa serif berlebihan |
| Body (`p, li, a, small`) | `Inter` | 400–500 (reg/medium) | Sangat terbaca, kontras tinggi, ideal mobile-first |

### Skala ukuran (fluid/clamp)
Fokus mobile-first dengan clamp untuk skalabilitas. Hindari px fixed berlebihan.

| Element | Mobile (≈360) | Tablet (≈768) | Desktop (≥1024) | Line-height |
|---|---|---|---|---|
| `h1` | `clamp(1.8rem, 4vw, 2.8rem)` | `clamp(2.2rem, 4vw, 3.2rem)` | `clamp(2.6rem, 3.5vw, 4rem)` | 1.15–1.25 |
| `h2` | `clamp(1.4rem, 3vw, 2rem)` | `clamp(1.6rem, 3vw, 2.2rem)` | `clamp(1.8rem, 2.5vw, 2.6rem)` | 1.2 |
| `h3` | `clamp(1.2rem, 2.5vw, 1.6rem)` | `clamp(1.25rem, 2.5vw, 1.7rem)` | `clamp(1.3rem, 2vw, 1.8rem)` | 1.25 |
| Body `p` | `clamp(0.95rem, 1vw, 1rem)` | `clamp(1rem, 1vw, 1.05rem)` | `clamp(1rem, 0.9vw, 1.08rem)` | 1.7 |
| Small/text-muted | `clamp(0.875rem, 0.9vw, 0.95rem)` | `clamp(0.9rem, 0.9vw, 0.95rem)` | `clamp(0.9rem, 0.8vw, 0.95rem)` | 1.6 |

### Import Google Fonts
Link resmi (preconnect + stylesheet):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

## 4. Layout, IA & Per Section

Urutan section **wajib** sesuai DECISIONS #2: `Nav (sticky) → Hero → Cerita singkat → Menu (dengan harga + disclaimer wajib) → Lokasi (embed Google Maps) + jam buka → Galeri (PLACEHOLDER) → Kontak/CTA (WA + IG) → Footer`

| Section | Urutan | Isi kunci | Hierarki | CTA utama | Desain notes |
|---|---|---|---|---|---|
| **Nav (sticky)** | 1 | Logo/nama "Pempek Yuk Titi - UII Jakal", link anchor ke: `#hero`, `#cerita`, `#menu`, `#lokasi`, `#galeri`, `#kontak`. | `nav` semantic | Scroll ke menu/lokasi (opsional) | Sticky di atas; mobile: bisa collapse sederhana (tanpa JS kompleks) atau horizontal scroll links — mobile-first. Fokus state jelas. |
| **Hero** | 2 | H1: "Pempek Yuk Titi - UII Jakal". Subheading: "Pempek Palembang di Kaliurang KM 14 Sleman. Cuko tebal, manis-pedas, merakyat." CTA: "Lihat Menu" (anchor `#menu`) + "Chat via WA" (link `wa.me/628814105501`). | H1 + p + actions | `#menu` & WA | Tanpa foto hero. Gunakan tipografi kuat + pola/ornamen SVG minimal (garis melengkung/gelombang ringan) atau blok warna terakota tipis. Fokus pada pesan. |
| **Cerita singkat** | 3 | Teks ringkas: "Pempek khas Palembang, ramah anak kuliahan & warga lokal. Signature cuko tebal manis-pedas." (bisa 2–4 baris) | H2 + p | — | Blok ringan (`--color-surface-2` atau surface). Tanpa ilustrasi berlebihan. |
| **Menu (dengan harga + disclaimer wajib)** | 4 | Grup berdasarkan kategori: Sikoan @pcs, Kapal Selam/Lenggang/Rujak Mie/Tekwan/Model Tahu/Paket Otentik, Add-on, Minuman. Tiap item: Nama + Harga (Rp XX.XXX). **Disclaimer wajib:** *"Harga dapat berubah, konfirmasi via WhatsApp."* (teks jelas, bukan sekedar kecil tanpa makna). | H2 + cards | CTA "Pesan via WA" (link WA) | Kartu menu reusable. Harga rata kanan/terlihat jelas. Badge "Best seller" opsional untuk item menonjol (mis. Kapal Selam/Paket Otentik). **WAJIB** menampilkan disclaimer (FR-2). |
| **Lokasi (embed Google Maps) + jam buka** | 5 | Alamat lengkap (Kaliurang St No.Km 14, Tj. Manding, Umbulmartani, Ngemplak, Sleman Regency, DIY 55584). Embed Google Maps (responsive wrapper). Jam buka: **15.00–22.30**. Hari: *"setiap hari"* (INFERRED — tampilkan dengan catatan ringan jika perlu, tapi aman pakai teks "Setiap hari 15.00–22.30"). | H2 + address + map + time | "Buka di Google Maps" (link maps opsional) | Wrapper `iframe` responsif (16:9). Hindari fixed height px. Pastikan `iframe` punya `title` deskriptif. |
| **Galeri (PLACEHOLDER)** | 6 | Grid placeholder (3–4 kolom desktop, 1–2 mobile). Setiap slot: panel bertenaga dengan teks **"Foto segera hadir"** + subteks ringan. **BUKAN** gambar lorem/stock dari internet, **TIDAK** hotlink. | H2 + grid | — | Lihat bagian 8 (Aset placeholder). Desain menarik TANPA foto: pola SVG abstrak ringan, border, tipografi kuat. Bisa gunakan `aria-label="Slot foto galeri — menunggu aset dari pemilik"`. |
| **Kontak/CTA (tombol WhatsApp wa.me/628814105501, link Instagram pempek_yuktiti)** | 7 | H2: "Hubungi & Pesan". 2 aksi jelas: Tombol WA primer (`https://wa.me/628814105501`) + link IG sekunder (`https://www.instagram.com/pempek_yuktiti/`). Bisa tambah alamat singkat. | H2 + actions | **WA** (primer) | WA sebagai CTA dominan. Link IG dengan fokus state jelas. |
| **Footer** | 8 | Nama usaha, alamat singkat, jam buka, link WA/IG, copyright `© 2026 Pempek Yuk Titi - UII Jakal`. | footer semantic | — | Minimal, kontras cukup thd background. |

### Sketsa ASCII wireframe (ringkas)

**Mobile (360–767) — mobile-first**

```
[Sticky Nav: Logo | Menu links (wrap/scroll)]
[Hero: H1 + subtext + (CTA Menu + CTA WA)]
[Cerita: H2 + p]
[Menu: H2 + (kartu x N) + disclaimer box]
[Lokasi+Jam: H2 + alamat + (map 16:9) + jam buka]
[Galeri: H2 + grid 1–2 kolom placeholder]
[Kontak: H2 + (WA btn) + (IG link)]
[Footer: info + copyright]
```

**Desktop (≥1024)**

```
[Sticky Nav: Logo | links horizontal spasi rapi]
[Hero: 2-kolom ringan? atau center stack; teks dominan (no image)]
[Cerita: center/max-width]
[Menu: H2 + grid 2–3 kolom kartu]
[Lokasi+Jam: 2-kolom (info kiri, map kanan)]
[Galeri: grid 3–4 kolom placeholder]
[Kontak: center + actions inline]
[Footer: 3-kolom minimal]
```

## 5. Komponen Reusable

Semua komponen harus reuseable (class-based, tanpa framework). Hindari inline style.

| Komponen | Kegunaan | States | Notes |
|---|---|---|---|
| **`.nav`** | Sticky nav | `:hover`, `:focus-visible`, `:active` | Semantic `<nav>`. Link anchor smooth-scroll (opsional via CSS `scroll-behavior` atau JS minimal). Fokus state wajib terlihat. |
| **`.btn`** | Tombol generik | `:hover`, `:focus-visible`, `:disabled` (jika ada) | Base class + variants. |
| **`.btn--primary`** | CTA utama (non-WA) | hover/focus | Gunakan `--color-primary`. Kontras teks putih. |
| **`.btn--ghost`** | Aksi sekunder | hover/focus | Outline/text style. |
| **`.btn--wa`** | WhatsApp (CTA & FAB) | hover/focus | Background `--color-wa`, teks/icon putih. Jelas & terbedakan. |
| **`.fab-wa`** | **Floating Action Button** mobile | hover/focus-visible | Muncul di mobile (bottom-right). Fixed/absolute aman. Ukuran ≥44px. `aria-label="Chat WhatsApp Pempek Yuk Titi"`. Link `wa.me`. |
| **`.card-menu`** | Kartu menu (nama + harga + deskripsi singkat) | hover ringan | Struktur: `.card-menu__name`, `.card-menu__price`, `.card-menu__desc`. Harga tegas (font-weight 600/700). |
| **`.badge`** | "Best seller" dll | — | Gunakan `--color-accent` dengan teks kontras. Jangan hanya warna. |
| **`.disclaimer-box`** | Kotak disclaimer harga | — | Background `--color-surface-2`/warning ringan. Teks `--color-warning` atau `--color-text-muted` dengan kontras aman. **Wajib tampil** di section Menu. |
| **`.info-card`** | Kartu info (jam/alamat/telepon) | — | Untuk blok Lokasi+Jam. Baca jelas. |
| **`.map-wrapper`** | Embed Google Maps responsif | — | Wrapper dengan `aspect-ratio: 16/9` atau padding-bottom trick. `iframe { width:100%; height:100%; border:0; }` + `title`. |
| **`.gallery-grid`** | Grid galeri placeholder | — | Grid responsif. Item `.gallery-item--placeholder`. |
| **`.gallery-placeholder`** | Panel placeholder (tanpa foto) | — | Ornamen SVG inline minimal atau pola CSS. Teks "Foto segera hadir". Aksesibel (bisa aria-label). |
| **`.skip-link`** | Skip to main content | `:focus-visible` | **Wajib** untuk aksesibilitas keyboard. Tersembunyi sampai fokus. |

## 6. Breakpoints & Responsif

Mobile-first. Minimal: **360 / 768 / 1024+**

| Breakpoint | Range | Tujuan | Notes |
|---|---|---|---|
| `sm` | 360px–767px | Mobile | Default styles. FAB-WA aktif. Nav link bisa wrap/scroll. Grid galeri 1–2 kolom. |
| `md` | 768px–1023px | Tablet | Naikkan padding/container. Grid menu 2 kolom. Grid galeri 2–3 kolom. Lokasi+Jam bisa 1–2 kolom. |
| `lg` | ≥1024px | Desktop | Container max-width (mis. 1100–1200px). Grid menu 2–3 kolom. Lokasi+Jam **2-kolom** (info kiri, map kanan). Galeri 3–4 kolom. FAB-WA bisa tetap tampil atau disembunyikan (opsional) — tapi mobile harus ada. |

**Aturan responsif:**
- Gunakan `min-width` media queries (mobile-first). Hindari `max-width` dominan.
- Container: `width: min(90vw, 1100px); margin-inline: auto;` atau `clamp()`.
- Touch targets **≥44px** untuk semua interaktif (link, button, FAB).
- Hover hanya enhancement; interaksi utama harus berfungsi via tap/fokus.
- Gambar/embed selalu responsif (`max-width:100%; height:auto`).
- Essential content **tidak** disembunyikan di mobile.

## 7. A11y & SEO On-Page

### Accessibility (WCAG AA target)
- **Semantic HTML5:** `header`, `nav`, `main`, `section`, `footer`, `address`, `time`.
- **Skip link:** `.skip-link` mengarah ke `#main`.
- **Focus state:** `:focus-visible` jelas (outline kontras, tidak `outline:none` tanpa fallback).
- **Keyboard support:** semua link/button/focusable bisa diakses keyboard. Urutan fokus sesuai visual/order logis.
- **Alt text:** gambar (jika ada nanti) wajib alt deskriptif; placeholder non-gambar tidak butuh alt semu — gunakan `aria-label`/teks.
- **Headings hierarchy:** H1 tunggal (Hero). H2 per section. Hindari skip level.
- **Color contrast:** penuhi AA untuk teks & interaktif (lihat palet). Jangan hanya warna untuk error/info.
- **Screen reader:** `aria-label` pada FAB-WA & elemen penting. `iframe` Google Maps wajib `title`.
- **Motion:** hormati `prefers-reduced-motion` (matikan `scroll-behavior` smooth atau animasi jika diaktifkan).
- **Touch targets:** ≥44px.

### SEO On-Page (Bahasa Indonesia)
**Meta dasar:**
```html
<title>Pempek Yuk Titi - UII Jakal | Pempek Palembang di Sleman</title>
<meta name="description" content="Pempek Yuk Titi - UII Jakal, Kaliurang KM 14 Sleman. Pempek Palembang dengan cuko tebal manis-pedas, harga merakyat Rp 3.500–15.000. Chat via WhatsApp.">
<meta name="robots" content="index,follow">
<meta name="language" content="id">
<link rel="canonical" href="https://[domain-anda]/">
```

**Open Graph (umum):**
```html
<meta property="og:title" content="Pempek Yuk Titi - UII Jakal | Pempek Palembang di Sleman">
<meta property="og:description" content="Pempek Palembang di Kaliurang KM 14 Sleman. Cuko tebal manis-pedas, harga merakyat. Pesan via WhatsApp.">
<meta property="og:type" content="website">
<meta property="og:locale" content="id_ID">
<meta property="og:image" content="https://[domain-anda]/assets/og-placeholder.jpg"> <!-- placeholder aman; ganti nanti -->
<meta property="og:url" content="https://[domain-anda]/">
```

**Twitter (opsional tapi aman):**
```html
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Pempek Yuk Titi - UII Jakal">
<meta name="twitter:description" content="Pempek Palembang di Kaliurang KM 14 Sleman. Pesan via WhatsApp.">
```

> Catatan OG image: kalau belum ada foto asli, bisa pakai gambar generik sederhana (inline SVG jadi data URI) atau lewati dulu — **jangan** hotlink dari luar. Domain placeholder `[domain-anda]` diganti saat deploy (Netlify/GitHub Pages/cPanel).

### Schema JSON-LD Restaurant
Tambahkan JSON-LD `Restaurant` (valid dasar) untuk SEO lokal.

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Pempek Yuk Titi - UII Jakal",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaliurang St No.Km 14, Tj. Manding, Umbulmartani",
    "addressLocality": "Ngemplak",
    "addressRegion": "Sleman Regency",
    "postalCode": "55584",
    "addressCountry": "ID"
  },
  "telephone": "+628814105501",
  "url": "https://[domain-anda]/",
  "servesCuisine": ["Palembang", "Indonesian"],
  "priceRange": "Rp 3.500–15.000",
  "openingHours": ["Mo-Su 15:00-22:30"],
  "sameAs": [
    "https://www.instagram.com/pempek_yuktiti/"
  ],
  "hasMenu": "https://[domain-anda]/#menu"
}
```

**Catatan schema:** `openingHours` "Mo-Su 15:00-22:30" aman (mewakili "setiap hari" sesuai jam terkonfirmasi). Bisa diperbarui jika ada pembatasan hari nanti.

## 8. Aset Placeholder (tanpa foto eksternal)

**Aturan keras:** Tanpa foto asli → **TIDAK** pakai lorem image URL, **TIDAK** hotlink. Semua slot foto = placeholder berbasis teks/pola.

### Dimensi & rasio slot galeri
Rekomendasi fleksibel, crop-friendly.

| Slot | Rasio | Ukuran referensi (px) | Kegunaan |
|---|---|---|---|
| Galeri item | 4:3 (landscape) | 800×600 / 1200×900 | Umum, aman crop |
| Galeri item (opsional) | 3:4 (portrait) | 600×800 | Varian grid nanti |
| Galeri item (opsional) | 1:1 | 800×800 | Kotak |

**Penandaan slot:** gunakan elemen dengan teks & pola SVG inline atau `background-image` SVG data URI. Contoh struktur:

```html
<figure class="gallery-item gallery-item--placeholder" aria-label="Slot foto galeri — menunggu aset dari pemilik usaha">
  <div class="gallery-placeholder">
    <svg aria-hidden="true" width="64" height="64" viewBox="0 0 24 24" ...>...</svg>
    <p class="gallery-placeholder__text">Foto segera hadir</p>
    <p class="gallery-placeholder__sub">Akan diunggah oleh pemilik</p>
  </div>
  <figcaption class="sr-only">Slot foto galeri (placeholder)</figcaption>
</figure>
```

**CSS pendekatan:** pola geometris ringan (dots/lines) + teks. Hindari dekorasi berat.

**Catatan ISSUE-002:** Foto IG tidak bisa discrape; tunggu aset dari pemilik. Desain harus tetap menarik TANPA foto.

## 9. Implementation Notes (dev)

- **Tanpa framework, tanpa build step:** hanya `index.html`, `css/`, `js/`, `assets/` (opsional). 
- **Mobile-first:** tulis base styles untuk 360px, naik via `min-width`.
- **Design tokens:** taruh semua di `:root` CSS custom props (sesuai palet).
- **Google Fonts:** link resmi seperti di atas.
- **Icons:** SVG inline seperlunya (mis. WA/IG) atau emoji minimal. **Tanpa** icon font library berat.
- **WA link:** `https://wa.me/628814105501` (tanpa `+`, sudah benar).
- **IG link:** `https://www.instagram.com/pempek_yuktiti/`.
- **Map:** responsive wrapper + `title` pada `iframe`.
- **Disclaimer:** **wajib** muncul di section Menu (teks jelas).
- **Skip link:** wajib.
- **Focus states:** wajib terlihat.
- **Harga 2026:** gunakan data dari REQUIREMENTS.md (primer menukuliner) — waspada ISSUE-001 (bisa basi, konfirmasi via WA).
- **Galeri placeholder:** jangan hotlink — hanya teks+pola.
- **Jam buka:** tampilkan "Setiap hari 15.00–22.30" (aman sesuai data).
- **Progressive enhancement:** JS minimal (mis. smooth scroll opsional). Halaman tetap usable tanpa JS.

## 10. Quick Validation Checklist

- [ ] Semua section DECISIONS #2 tercakup (Nav→Hero→Cerita→Menu→Lokasi+Jam→Galeri→Kontak/CTA→Footer)
- [ ] Setiap token warna punya HEX + kegunaan
- [ ] Kontras teks aman (WCAG AA) — terutama `--color-text` vs `--color-surface`
- [ ] Disclaimer wajib muncul di section Menu
- [ ] WA link & IG link benar
- [ ] Embed Maps responsif + `title`
- [ ] Galeri = placeholder TANPA foto eksternal/hotlink
- [ ] Skip link + focus-visible
- [ ] Touch targets ≥44px
- [ ] Mobile-first + breakpoints 360/768/1024+
- [ ] Google Fonts resmi
- [ ] Schema JSON-LD Restaurant ada
- [ ] Meta/OG bahasa Indonesia

## 11. Risks & Mitigations

| Risiko | Tingkat | Mitigasi |
|---|---|---|
| Desain terlalu "template generik" | MEDIUM | Gunakan ornamen SVG minimal, warna terakota+krem hangat, tipografi kuat (Poppins/Inter). Fokus pesan khas Palembang/cuko. |
| Kontras teks gagal AA | **HIGH** | Validasi `--color-text` (#1F1B18) vs `--color-surface` (#F7F3EB) — sangat aman. Hindari teks `--color-secondary` untuk body panjang. |
| Harga basi (ISSUE-001) | MEDIUM | Wajibkan disclaimer di Menu + arahkan ke WA konfirmasi. Update saat ada info resmi pemilik. |
| Galeri tanpa foto terasa kosong (ISSUE-002) | LOW | Panel placeholder bertenaga: pola + "Foto segera hadir" + subteks. Jangan paksakan gambar. |
| Embed Maps berat di mobile | LOW | Responsive wrapper; iframe lazy-load opsional (`loading="lazy"`) — tetap aman. |
| Smooth scroll mengganggu `prefers-reduced-motion` | LOW | Respect `prefers-reduced-motion`: nonaktifkan smooth scroll. |

## HANDOFF

**(a) Path file:** `/home/corvusjet/pempek-yuktiti-website/docs/DESIGN_BRIEF.md`

**(b) Ringkasan konsep desain (10 baris):**
1. Konsep: "Hangat Palembang, Hangat Kampus" — kasual & merakyat
2. Vibe: kuliner Indonesia hangat, menggugah selera (bukan korporat)
3. Primary: `#8B3E2F` (terakota gelap) · Accent: `#3A7C59` (teal segar)
4. Surface: `#F7F3EB` krem hangat · Text: `#1F1B18`
5. Heading: `Poppins` (600–700) · Body: `Inter` (400–500)
6. Mobile-first, breakpoints 360 / 768 / 1024+
7. Tanpa foto: placeholder kuat (teks+pola SVG), bukan hotlink
8. Fokus CTA: WhatsApp (`wa.me/628814105501`) + IG
9. A11y by default: skip link, focus-visible, semantic, kontras AA
10. SEO lokal: meta/OG + JSON-LD Restaurant

**(c) Daftar section + komponen persis untuk diimplementasikan dev:**

**Sections (urutan wajib):**
- Nav (sticky) — id/anchor links
- Hero — H1 + subtext + CTAs (#menu & WA)
- Cerita singkat — H2 + p
- Menu — H2 + kartu menu + **disclaimer wajib** ("harga dapat berubah, konfirmasi via WhatsApp")
- Lokasi (embed Google Maps) + jam buka — H2 + alamat + map (responsive, title) + "Setiap hari 15.00–22.30"
- Galeri (PLACEHOLDER) — H2 + grid placeholder (tanpa foto eksternal)
- Kontak/CTA — H2 + WA button + IG link
- Footer — info + copyright

**Komponen reusable (class-based):**
`.nav`, `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--wa`, `.fab-wa`, `.card-menu`, `.card-menu__name/.price/.desc`, `.badge`, `.disclaimer-box`, `.info-card`, `.map-wrapper`, `.gallery-grid`, `.gallery-item--placeholder`, `.gallery-placeholder`, `.skip-link`

**Token CSS:** semua warna + type scale + spacing dasar via `:root`.

**(d) Keputusan penting untuk dihormati dev:**
- HTML/CSS/JS murni, tanpa framework, tanpa build step (DECISIONS #1)
- Satu halaman dengan urutan persis di atas (DECISIONS #2)
- Harga 2026 + disclaimer WA wajib (DECISIONS #3; waspada ISSUE-001)
- Hosting: Netlify/GitHub Pages/cPanel (DECISIONS #4) — tetap statis
- Mobile-first, breakpoints 360/768/1024+
- Tanpa foto: galeri placeholder kuat, **jangan hotlink**
- A11y wajib: skip link, focus-visible, semantic HTML5, kontras AA, map iframe title
- SEO: meta/OG ID + JSON-LD Restaurant
- WA: `https://wa.me/628814105501`, IG: `https://www.instagram.com/pempek_yuktiti/`
- Icons: SVG inline / emoji seperlunya — tanpa icon font library berat
- Fonts: Google Fonts resmi (Poppins + Inter)
- Progressive enhancement: usable tanpa JS
