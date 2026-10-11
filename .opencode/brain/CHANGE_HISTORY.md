# CHANGE_HISTORY

> Project Brain file · Concise log of significant engineering changes. NOT an exhaustive commit log.

## Changelog

### 2026-10-11 (github init + CHANGELOG + audit performa)

#### Added
- `.gitignore` (minimal — situs statis, tanpa build step) + `.git/` (repo baru).
- `CHANGELOG.md` (Keep a Changelog, Bahasa Indonesia): `[Unreleased]` (dark mode, keranjang, polish, motion, a11y stepper) + `[1.0.0] - 2026-10-08` (v1).
- `docs/PERFORMANCE_AUDIT.md` — laporan audit performa terukur (Playwright + CDP, 2 skenario).

#### Changed
- Inisialisasi Git: `git init` (branch `master`, mengikuti `init.defaultBranch` global user), commit awal `2c07bb3` (84 berkas). Identitas **lokal repo**: `corvusjet <283604278+abinawahasan-bot@users.noreply.github.com>` — config global TIDAK diubah.

#### Tests
- Audit performa (Playwright 1.63 + Chromium 151, 390×844, cache off, server lokal tanpa gzip):
  - Baseline: FCP/LCP 456ms, CLS 0,091 (1 shift, font swap t≈729ms), longtask 119ms, muat awal 13 req/563KB/4 img, muat penuh 38 req/**2,64MB**/28 img.
  - Slow-4G + CPU 4×: FCP 2052ms, **LCP 3136ms** (target <2500), CLS 0,105, load 3579ms. Elemen LCP = `IMG` hero.
  - gzip total kode 179,3KB → **43,5KB (−76%)**; thumbnail menu 800px → 92px (×8,7) di 23 gambar; 0 WebP/AVIF/srcset.
- Secret scan repo (sebelum commit): bersih (hanya placeholder `ENV_VAR_NAME`).

#### Terkait
- Temuan ditambahkan ke `TECHNICAL_DEBT.md` (TD-PERF-01..07). Rekomendasi menunggu approval user.

### 2026-10-11 (a11y: target sentuh tombol stepper 38→44px)

#### Changed
- `css/style.css` (`.card-menu__step`): `width/height` 38px → **44px** + komentar alasan (WCAG 2.2 Target Size / Material 48dp / Apple 44pt). Tidak ada perubahan `index.html`/`js/*` (kontrak keranjang utuh).

#### Tests
- Orkestrator (Playwright + Chromium sistem): `44×44` terukur di 7 lebar (320/360/390/414/768/1024/1280); `overflowX 0` semua lebar; tinggi kartu kompak 205→211px (+6px, wajar); interaksi keranjang OK (3× Sikoan + 1× Kapal = count 4, total Rp 24.000); brace CSS balanced (411/411); console/network **0 error** (1 `ERR_SOCKET_NOT_CONNECTED` transien saat uji paralel — hilang pada rerun). Verifikasi preview Brave: `style.css` tersaji 200 (bukan cache) memuat nilai 44px.

#### Terkait
- Menutup follow-up a11y QA 2026-10-10 (stepper 38px < rekomendasi 44px); sebelumnya hanya tercatat sebagai "Known limitation".

### 2026-10-10 (paket motion: entrance hero, tilt testimoni, zoom menu, spy chip, pita, parallax)

#### Added
- `index.html` (996→1007): pita marquee `.ribbon` (aria-hidden, fakta hero) antara hero & cerita.
- `css/style.css` (2195→2291): keyframes hero-rise/hero-media-in + 8 aturan entrance berjenjang (`.hero--play`); tilt `.testimoni__item` 3° (pola kartu menu); zoom `.card-menu__media img` hover/fokus; chip `[aria-current]`; `.ribbon*` + ribbon-scroll 32s; parallax consume (`translate` terpisah dari `transform`); kill-switch: `.menu-nav__link` + `.ribbon` (print).
- `js/animations.js` (381→501): `playHeroEnter()` (dipicu dismiss splash + semua early-return + fallback 2600ms; konten default tampil); `setupTestiTilt()`; `setupMenuSpy()` (IO rootMargin, tanpa IO = link biasa); `setupHeroParallax()` (rAF, cap 60px, hapus var saat reduce). Semua dibungkus `safe()`; file ini pemilik perilaku animasi (pengecualian konvensi frozen, dicatat).

#### Prinsip dijaga
- Semua gerak di bawah `html.anim`/`html.js.anim` (absen saat reduce/tanpa JS); hanya transform/opacity/translate; pointer-halus untuk tilt/zoom/parallax; tanpa dependensi baru.

#### Tests
- Orkestrator (CDP): `.hero--play` + 7 animasi hero-rise + opacity akhir 1; ribbon loop mulus (2 paruh 814=814px); spy menandai chip benar; parallax/tilt/zoom: gate pointer headless=false (limitasi lingkungan, sama seperti tilt menu lama) → diverifikasi via parse aturan + injeksi ungated (matrix3d/scale terbukti pada elemen asli); reduce (tanpa anim, hero tampil, pita statis, transisi 0s); no-JS (tampil semua, pita statis); print (pita hidden); mobile 320/390 (entrance jalan, pita tanpa overflow); overflowX 0; console/network 0 error.

### 2026-10-10 (robustness: offset header dinamis M2 + bersih-bersih + README)

#### Changed
- `js/header.js` (47→66): tambah ResizeObserver — ukur `.site-header` tiap berubah (wrap tablet, compact ponsel, font susulan) → tulis `--header-h` di `<html>`; guard tanpa RO/rAF.
- `css/style.css` (2203→2195): `scroll-padding-top` + `.menu-nav top` kini `var(--header-h, var(--nav-h))` (fallback = perilaku lama tanpa JS); **blok kompensasi manual 768–967px (+31px) DIHAPUS**; komentar diperbarui.
- `js/lightbox.js` (168→167): hapus array `triggers` mati (L2 review).
- `README.md`: struktur folder + pola JS baru (`lightbox.js`, `header.js`).

#### Tests
- Orkestrator (CDP): `--header-h` terukur benar di semua lebar (61/97/97/67/73 + 51 compact); sticky chip flush (navTop == headerBottom setelah settle); landing 4 grup × 7 lebar = +8px konsisten; no-JS fallback statis; lightbox regresi (1/4); cart regresi; overflowX 0; 0 error.
- Artefak harness (bukan bug): ukur ≤400ms pasca-scroll menangkap transisi reveal (~8px sisa) — ukur ≥1500ms untuk nilai final; didokumentasikan.

### 2026-10-10 (testimoni pelanggan + galeri 2×2)

#### Added
- `index.html` (966→996): strip `.testimoni` ("Kata pelanggan") di bawah grid galeri — 3 kartu `<blockquote>` + nama/tanggal + tombol "Lihat semua ulasan di Google Maps" (pola link aman proyek); tanpa link nav baru, tanpa JS.
- Kutipan (ejaan dirapikan tanpa ubah makna; sumber: direktori mirror ulasan Google Maps, diakses 2026-10-10): Lutfi Nuraini Nov 2025 ("murah tapi rasanya premium"); Shanks D Ace Nov 2025 ("Mantap Joss…"); Yuli Puji Rahayu Sep 2025 ("jam 8 udah habis-habis"). WAJIB verifikasi pemilik (catatan di kode + ISSUE-005).
- `css/style.css` (2156→2203): `.testimoni*` (kartu surface-2, 1 kolom → 3 kolom ≥768px; semua token) + `.gallery-grid` ≥768px 3 kolom → **2 kolom** (4 foto = 2×2 seimbang).

#### Tests
- Orkestrator (CDP): 3 kartu tampil di 390/768/1440; galeri 2 kolom + testimoni 1→3 kolom; kontras dark quote 14,55 / keterangan 8,0 (light ekuivalen token terverifikasi QA: 13,95/6,19); href/target benar; galeri tetap 4 item; overflowX 0; 0 error. no-JS aman (HTML statis; reveal hanya aktif dengan `.js`).

### 2026-10-10 (galeri: hapus 2 foto pemilik atas permintaan pemilik)

#### Removed
- `index.html`: 2 `<figure class="gallery-item">` (`yuk-titi.jpg` 600×900, `yuk-titi-1.jpg` 857×900) dihapus dari `#galeri` → galeri kini 4 foto stok Pexels; lead text disesuaikan ("Ilustrasi pilihan menu…"); counter fallback lightbox "1 / 6" → "1 / 4" (counter runtime menyesuaikan otomatis).
- File `assets/img/yuk-titi.jpg` + `assets/img/yuk-titi-1.jpg` dihapus permanen (atas persetujuan pemilik).
- `README.md` §7 disinkronkan (galeri = 4 stok; saran foto pengganti landscape).

#### Alasan
- Konten dinilai tidak cocok oleh pemilik ("ilustrasi perempuan") + crop teknis parah: foto #5 portrait 2:3 hanya tampil ~50% di bingkai 4:3 (wajah/badan kepotong), #6 tampil ~71%.

#### Dampak
- ISSUE-002 kembali ke status tanpa-foto-asli (galeri 0 foto asli; hero/menu tetap stok). Counter/wrap lightbox (n/4) terverifikasi; grid 2×2 rapi.

#### Tests
- Orkestrator (CDP): 4 item/img/zoom, srcs hanya 4 stok, 0 broken, lead benar, lightbox 1/4→4/4→wrap 1/4 + tutup, galeri 461px, overflowX 0, 0 URL 4xx, 0 console/network error.
- `index.html` 974→966; `css/style.css` & `js/*` tidak disentuh.

### 2026-10-10 (UX polish "Paket C": header compact + fallback Maps/galeri)

#### Added
- `js/header.js` (BARU, 47 baris) — toggle class `header-compact` di `<html>` saat gulir >120px (lepas <40px, histeresis); listener passive + rAF; sinkronisasi state awal; guard tanpa rAF. Tanpa JS: class tak pernah ada → header selalu penuh.
- `index.html` (973→974): `<script defer src="js/header.js">`. `js/*` lama tidak disentuh.
- `css/style.css` (2119→2156): `@media (max-width:767px) { html.header-compact { --nav-h: 50px } + brand 0.95rem }` — token menyusut sehingga sticky `.menu-nav` + `scroll-padding-top` anchor mengikuti otomatis; transisi min-height/font-size HANYA di `prefers-reduced-motion: no-preference`; `.map-wrapper::before` ("Memuat peta…", tertutup iframe opaque); `.gallery-item` flex-center + teks muted (alt rapi bila img gagal).
- C3 (reveal-3d): DIASESMEN → DIPERTAHANKAN. 19 elemen reveal berbasis IntersectionObserver (murah), ter-gate no-preference, tercakup kill-switch reduce + rescue `:focus-within`; menghapus tanpa bukti visual berisiko merusak efek yang disukai.

#### Tests
- Orkestrator (verifikasi langsung CDP): atas = penuh (60px/61px, tanpa class); gulir = ramping (50px/51px, class ada); histeresis (tetap di 80px, lepas di 0); lompatan chip tetap +8px (offset ikut token); 320 compact / 768+ tidak terpengaruh (66/72px); no-JS penuh; reduce transisi 0s; Maps ::before tampil; cart regresi (qty 2, Rp 7.000); overflowX 0; console/network 0 error.

### 2026-10-10 (social proof: rating Google + badge "Terlaris" dari riset)

#### Added
- `index.html`: `.hero__rating` — tautan "★ 4,9/5 · 139 ulasan Google" ke pencarian Google Maps live (`target=_blank rel=noopener`, pola sr-only "(buka di tab baru)"); `aggregateRating` (4.9 / 139) di JSON-LD; badge `<span class="badge">Terlaris</span>` pada Sikoan & Kapal Selam Besar; paket-otentik memakai wadah `.card-menu__badges` ("Terlaris" + "Isi 4 pempek" berdampingan/membungkus).
- `css/style.css` (2090→2119): `.card-menu__badges` (grid-area badge + flex wrap) + `.hero__rating*` (token semua, tanpa warna baru).
- `index.html` 953→973. `js/*` tidak disentuh.

#### Riset (bukan fabrikasi)
- Rating: direktori mirror listing Google Maps (grubbio.com, diakses 2026-10-10): 4,9/5 dari 139 ulasan, alamat & jam cocok; rincian bintang sumber (137/2/2/0/1=142) inkonsisten → ditandai di ISSUE-005. Google Maps langsung tak dapat diakses (butuh JS).
- Best seller: Kapal Selam = "paling populer/digemari/raja pempek" di semua sumber umum; "Paket 3" = Signature Picks + Popular on the Menu di direktori mirror warung ini; Sikoan memuat Lenjer+Adean (varian paling dikenal/favorit) + ulasan pembelian rutin "pempek telur kecil".
- Mitigasi kejujuran: tautan ke Maps live, komentar verifikasi-wajib di kode, badge satu-span (mudah diganti), ISSUE-005 OPEN.

#### Tests
- Orkestrator (verifikasi langsung CDP, tanpa agen — perubahan kecil): 4 badge tampil (3 Terlaris + Isi 4 pempek), wrapper berdampingan di ≥390 & membungkus rapi di 320 (tanpa tumpang-tindih/overflow); rating tampil + href/target/rel benar; kontras light (badge 4,99 / rating 6,71) & dark (badge 5,94 / rating 7,8) semua ≥ 4,5; hero +6px (722) proporsional; overflowX 0 di 320/390/768/1440; cart utuh (23 harga, total Rp 7.000 — regresi via harness Paket B); JSON-LD valid; brace CSS balanced; console/network 0 error. Catatan metodologi: localStorage profil CDP menyimpan `data-theme=dark` dari sesi uji sebelumnya sehingga emulasi terang perlu `Storage.clearDataForOrigin` dulu.

### 2026-10-10 (UX polish "Paket B": lightbox galeri + trust chips hero)

#### Added
- `js/lightbox.js` (BARU, 168 baris) — pratinjau foto galeri progressive enhancement: membungkus 6 `.gallery-item__img` ke `<button class="gallery-item__zoom" aria-label="Perbesar foto: …">` (dibuat JS saja → tanpa JS galeri tetap 6 img statis); native `<dialog id="lightbox">` via `showModal()` (focus trap + Esc + focus return gratis); counter "n / 6" (aria-live) + caption aria-hidden (hindari duplikat alt); prev/next wrap-around; klik backdrop menutup; ArrowLeft/Right; kunci gulir `html.lightbox-open` + kompensasi `--lightbox-scrollbar`; tanpa preloading (src diisi saat dibuka).
- `index.html` (908→953): satu `<dialog class="lightbox">` (frame/stage/img/close/prev/next + meta) + 3 `.hero__chip` faktual di bawah CTA hero ("23 Menu Varian", "Harga Rp 3.000–15.000", "Buka 15.00–22.30" — tanpa "setiap hari" yang belum terkonfirmasi); figcaption "Foto ilustrasi — foto asli warung akan menyusul." SENGAJA dipertahankan (hero/menu masih foto stok).
- `css/style.css` (1808→2090): `.hero__chips/.hero__chip`, `.gallery-item__zoom` + badge pembesar + cincin fokus inset, `.lightbox*` (::backdrop, frame/stage/img, tombol 44px, meta), `html.lightbox-open`, aturan print (dialog hidden) & reduced-motion (transisi none).

#### Fixed (pasca code review — oleh orkestrator)
- M1: baris meta lightbox bisa terklip di viewport pendek (landscape 640×360) → `.lightbox__img { max-height: min(82vh, calc(92vh - 110px)) }` (terverifikasi metaBottom ≤ dlgBottom).
- M2: guard `if (!dialog.open)` sebelum `showModal()` (cegah InvalidStateError).
- L1: lewati img yang sudah terbungkus (`source.closest(".gallery-item__zoom")`) — cegah tombol yatim bila skrip dievaluasi ulang.
- L3: `font-size: 0` (sembunyikan alt pre-src) dibatasi ke `.lightbox__img:not([src])`.
- L4: perbaiki typo/komentar basi ("dipraktek"→"dipindah", "disusut flex"→"disusut", "+28px"→generik, catatan `:focus-within` kini mencakup tombol zoom).
- L6: counter diinisialisasi dari JS (`"1 / " + total`) agar sinkron bila galeri berubah.

#### Tests
- Orkestrator (verifikasi independen CDP): klik buka (src+alt+counter benar), next/prev/wrap dua arah, Esc/tombol-tutup/backdrop menutup, kunci gulir dilepas; Enter membuka (dengan char event), Tab terperangkap (native), fokus kembali ke pemicu; no-JS (0 tombol, 6 img); dark (bg opaque); print (dialog none); reduce (transisi 0s); 320/390/768/1440 gambar fit + overflowX 0; 640×360 meta visible; regresi keranjang (total Rp 7.000); brace CSS balanced; console/network 0 error.
- qa-engineer independen: **PASS with 1 WARN** — WARN Tab-trap terbukti artefak harness CDP (dialog minimal polos lolos identik di harness yang sama); struktur/fungsional/keyboard/states/kontras (light 6.85 / dark 8.43)/regresi semua PASS.
- code-reviewer: **APPROVE_WITH_NITS** (0 CRIT/HIGH) — M1/M2/L1–L4/L6 diperbaiki; L5/L7 diterima apa adanya; klaim fakta hero chips terverifikasi (23 kartu, min Rp 3.000, max Rp 15.000).

### 2026-10-10 (UX polish "Paket A": kartu menu kompak + chip kategori + deskripsi)

#### Added
- `index.html`: nav chip kategori sticky `.menu-nav` (4 tautan → `#menu-sikoan/#menu-spesial/#menu-addon/#menu-minuman`, masing-masing `.menu-group` diberi `id` + `h3.menu-group__title`); 21 `.card-menu__desc` baru (total **23**, satu per kartu, teks netral/singkat, editable).
- `css/style.css`: token `--menu-nav-h: 61px`; override `html { scroll-padding-top }` pada rentang 768–967px untuk mengoreksi header yang membungkus jadi 2 baris (97px).

#### Changed
- `css/style.css` (1678→1808): `.card-menu` base diubah jadi **mobile-first kompak** — `grid-template-areas` dengan thumbnail persegi 92px di kiri, nama+harga+deskripsi bertumpuk di kanan, stepper `+/-` melintang penuh di bawah; blok `@media (min-width:768px)` memulihkan tampilan besar (foto 4:3 lebar penuh, nama kiri/harga kanan baseline). `.menu-nav` sticky (`top: var(--nav-h)`, `z-index:100` < header 200), overflow-x auto (scrollbar disembunyikan), tautan min-height 44px; print menyembunyikan `.menu-nav`.
- `index.html` (877→908). Tidak ada perubahan pada `js/*` (md5 frozen utuh) maupun kontrak keranjang.

#### Fixed
- Offset lompatan anchor: `html { scroll-padding-top }` dan `.menu-group[id] { scroll-margin-top }` sebelumnya bersifat **aditif** (`nav-h+56px`), membuat judul mendarat ~63px di bawah baris chip di mobile. Kini `scroll-margin-top: var(--menu-nav-h)` → mendarat konsisten **+8px** di bawah baris chip di 390/768/967/968/1024/1440 (terukur CDP).
- Dead code: menghapus `box-shadow: var(--shadow-1)` pada `.card-menu` base (selalu tertimpa aturan adaptif `rgb(var(--shadow-rgb)…)` di blok Animasi) + memperbaiki dua komentar basi (baris shadow & `.card-menu:hover`).
- LOW (review): `.menu-nav` diberi `overscroll-behavior-inline: contain` (affordance scroll chip).

#### Tests
- frontend-developer: probe struktural (23 desc/price/stepper, 4 id ↔ 4 href), screenshot 390/768/1440, `problems: []`.
- Orkestrator (verifikasi independen CDP): tinggi halaman mobile 12.972→**8.707px (−33%)**, tinggi `#menu` 9.061→**4.718px (−48%)**, tinggi kartu 410→**164–181px**; landing 4 grup × 6 lebar = **+8px** konsisten; `stickyNavTop == headerBottom` (60/97/97/66/72/72); `overflowX 0`; box-shadow kartu = aturan adaptif; keranjang total **Rp 7.000**; brace CSS balanced (317/317); console/network **0 error**.
- qa-engineer independen: **PASS (ship-quality)** — struktur, responsif 320–1440, keranjang, a11y, states (no-JS/print/reduce/dark), kontras ≥4.5:1, regresi; 2 temuan minor (stepper ± 38px pre-existing; kartu 320/360 naik ~205px karena deskripsi panjang).
- code-reviewer: **APPROVE_WITH_NITS** (0 CRIT/HIGH) — M1 (offset aditif), M2 (magic offset `+31px`/`+56px` → saran ResizeObserver), M3 (shadow duplikat), L1 (scrollbar tersembunyi). M1 + M3 + L1 diperbaiki orkestrator; M2 = follow-up.

### 2026-10-09 (foto asli galeri YUK TITI)

#### Added
- `assets/img/yuk-titi.jpg` (600×900, 35KB) dan `assets/img/yuk-titi-1.jpg` (857×900, 119KB) — 2 dokumentasi asli warung dari pemilik, dioptimasi dari PNG (1.4–1.9MB) via ImageMagick (JPEG q84, sisi ≤900px), disimpan lokal (tidak hotlink).

#### Changed
- `index.html` #galeri: `yuk-titi-1.jpg` menggantikan slot placeholder #6 ("Foto asli warung segera hadir"); `yuk-titi.jpg` menggantikan stok `kuliner-jalanan.jpg`; lead text diperbarui ("Dokumentasi dari warung Pempek Yuk Titi…"); alt text deskriptif + width/height sesuai dimensi asli.
- `css/style.css` 1702→1678: blok `.gallery-placeholder*` dihapus (dead code — markup tidak ada lagi); `index.html` 884→877.
- `assets/img/kuliner-jalanan.jpg` dihapus (stok tidak lagi direferensikan).
- README §7 sinkron: galeri = 2 asli + 4 stok, placeholder tidak ada, catatan optimasi foto asli.

#### Fixed
- ISSUE-002 → PARTIALLY_RESOLVED: 2 foto asli pemilik masuk galeri; slot placeholder = 0. Sisa: foto asli lain (opsional) + foto menu masih ilustrasi Pexels.

#### Tests
- Verifikasi CDP (harness `/tmp/opencode/yuktiti-shots/shot-galeri.mjs`): 6 `.gallery-item__img` termuat semua (naturalWidth>0, dimensi benar), placeholder 0, overflow-x 0 di desktop 1280/mobile 390 × light/dark; screenshot galeri dikomposisi ke `/tmp/opencode/yuktiti-shots/gallery.html` untuk sign-off visual user.

### 2026-10-09 (P1 keranjang & foto menu)

#### Added
- `js/cart.js` (371 baris, BARU) — keranjang belanja tanpa dependensi: stepper qty per kartu, cart bar sticky + badge + total berjalan (kalkulator), panel keranjang (role=dialog, focus trap, Escape, backdrop), state `sessionStorage.pyt_cart`, checkout WA `wa.me/628814105501?text=` itemized + Total + "Terima kasih!".
- 23 foto menu Pexels di `assets/img/menu/*.jpg` (800px, lazy, width/height) + `LISENSI.md` (sumber & lisensi per file).
- CSS kartu/keranjang: `.card-menu__media`, `.card-menu__stepper`, `.cart-bar`, `.cart-panel`, `.cart-backdrop`; `body.cart-open{overflow:hidden}`; z-index backdrop 400 / panel 410 (di atas skip-link 300 & header 200); compaction 479px; print & reduce menyembunyikan elemen keranjang + stepper.
- `index.html` 650→884, `css/style.css` 1423→1702.

#### Changed
- 23 tombol `card-menu__order` per kartu **dihapus** → stepper jumlah; CTA statis `.menu-cta-static` menjadi fallback no-JS (satu-satunya tombol pesan tampil saat tanpa JS); langkah 2 section `#cara-pesan` disesuaikan alur keranjang.
- README sinkron: struktur folder (cart.js, assets/img/menu/LISENSI.md), nomor WA 29→**6 statis** + 1 konstanta runtime di `js/cart.js`, panduan keranjang/checkout, foto menu, lisensi.
- CURRENT_STATE sinkron (baris kode, fitur keranjang/foto, wa.me 6, ISSUE-004 → FIXED).

#### Fixed
- LOW-1 review: z-index modal cart (backdrop 60/panel 70) di bawah header 200/skip-link 300 → **400/410**.
- LOW-2: `body.cart-open { overflow: hidden; }` (scroll lock saat panel terbuka).
- LOW-3: `@media print` kini menyembunyikan `.card-menu__stepper` (sebelumnya stepper + qty ikut tercetak).
- NIT: `aria-live` tunggal (`p[data-cart-live]`); count span dilepas aria-live (pengumuman ganda SR).

#### Tests
- Dev probe cart-probe A–I semua PASS; QA independen **193 PASS / 0 FAIL / 21 INFO** (verdict PASS) — math, persistensi, checkout 23 item Rp 167.000, focus trap, no-JS, layout 7 lebar × 2 tema, kontras light 6.85/dark 4.95, regresi; review APPROVE_WITH_NITS; lowyx-fix + cart-probe retest semua PASS; harness CDP /tmp/opencode/ (cart-probe.mjs, lowyx-fix.mjs, qa-cart/, cart-shots/, qa-cart-shots/, lowyx-shots/).

### 2026-10-08

#### Added
- Inisialisasi Project Brain untuk project baru (folder masih kosong).
- PROJECT, STACK, ARCHITECTURE (rencana), REQUIREMENTS (termasuk menu & harga 2026), CURRENT_STATE, KNOWN_ISSUES (ISSUE-001 risiko harga basi, ISSUE-002 foto IG), CONVENTIONS, DECISIONS, INDEX.
- Implementasi v1 situs: index.html, css/style.css, js/main.js, docs/DESIGN_BRIEF.md, README.md; QA PASS_WITH_NOTES; review RV-01..07 diperbaiki.
- Upgrade visual 2026-10-08 (foto): 6 foto stok Pexels di `assets/img/`; hero + 5 slot galeri terpasang di index.html (1 slot asli tetap); CSS baru `.hero__media` & `.gallery-item__img`.
- Animasi 3D 2026-10-08: `js/animations.js` (288 baris) + blok "Animasi 3D" di akhir style.css (1003 baris) + 13 class `.reveal-3d`; tilt hero/menu, reveal scroll + stagger, hover lift, FAB pulse (::after, transform/opacity), depth statis; gating `html.js.anim` + media (hover/reduce/print); QA 94/94 PASS_WITH_NOTES; review APPROVE pasca-fix M-1/S-1/S-2/L-1.
- Background dekoratif + intro splash 2026-10-08: `.bg-decor` (fixed z-1, gradien + motif songket 0.04 + 3 blob brand α≤0.12, drift 28–34s saat `html.anim`, print none) dan `#splash` (sekali per sesi `sessionStorage.pyt_splash`, hanya `html.js.anim .splash--show`, auto-dismiss ±2.1s + node dihapus, skip klik/keydown <0.5s, no-JS/reduce tak tampil); `index.html` 455, `css/style.css` 1178, `js/animations.js` 379; QA PASS_WITH_NOTES (81P/1F/9I + 12/12 piksel), F1 keydown fix + retest 470ms, review APPROVE.
- Snapshot milestone: snapshots/snapshot-2026-10-08-v1-implementation.md.

#### Changed
- Brain update post-implementation: ARCHITECTURE rencana → TERIMPLEMENTASI; CURRENT_STATE fitur → HADIR; KNOWN_ISSUES + ISSUE-003 (canonical/OG menunggu domain), RV-01..07 → Fixed; PROJECT_HEALTH dinilai (overall YELLOW); STACK verification sources diperbaiki (tidak lagi "folder kosong"); INDEX sinkron.
- Koreksi rentang harga SEO di kode: Rp 3.500–15.000 → Rp 3.000–15.000 (meta description, JSON-LD priceRange, hero "Mulai Rp 3.000") — perbaikan oleh orchestrator di index.html.
- CURRENT_STATE, KNOWN_ISSUES (ISSUE-002), dan README disinkronkan setelah upgrade foto stok.
- README + CURRENT_STATE disinkronkan dengan fitur animasi 3D (gating, cara uji, cara menonaktifkan).
- README + CURRENT_STATE + CHANGE_HISTORY disinkronkan dengan fitur background dekoratif & intro splash (perilaku sekali-per-sesi, skip, gating, cara nonaktif).

#### Fixed
- Temuan review RV-01..07 (lihat KNOWN_ISSUES "Fixed / Verified").

#### Tests
- Belum ada automated test; QA manual PASS_WITH_NOTES + cek 23 kartu harga vs REQUIREMENTS (laporan QA).

#### Decisions touched
- DECISIONS.md #1–#4 (statis, satu halaman, harga+disclaimer, hosting) — tidak berubah; #4 masih UNKNOWN.

### 2026-10-09

#### Added
- Dark mode 2026-10-09: toggle `.theme-toggle` di nav (+ `.nav__actions`, hide `.nav__brand-sub` ≤372px), default ikut sistem via CSS media (live, no-JS), pilihan eksplisit `localStorage.pyt_theme` menang, anti-FOUC inline script di head sebelum stylesheet, sinkron lintas tab (`storage` event), listener matchMedia → ARIA only, `theme-ok` gate (degradasi tombol hidden), konversi warna hardcoded → token (primary-text, on-accent, footer-text, shadow-rgb, glow, sheen, blob/pattern alpha), print selalu terang; `index.html` 474, `css/style.css` 1356, `js/theme.js` 109 (baru); `main.js`/`animations.js` tidak disentuh; QA 240/240 + F-LOW-01/02 + LOW-1 fix; review APPROVE_WITH_NITS.
- Telemetry: OUTCOME-004-dark-mode.md.

#### Changed
- README + CURRENT_STATE disinkronkan dengan fitur dark mode (mekanisme, gating 3 lapis, cara uji, cara nonaktif).
- KNOWN_ISSUES + ISSUE-004 (favicon 404 INFO pre-existing) — dicatat setelah terlihat di log QA/review.

#### Fixed
- F-LOW-01 (tab lain tidak ikut tema) → listener `storage` di theme.js.
- F-LOW-02 (tombol inert bila theme.js gagal) → class `theme-ok` di statement terakhir IIFE + selector `.js.theme-ok .theme-toggle`.
- LOW-1 (ARIA basi saat OS ganti skema tanpa preferensi eksplisit) → matchMedia change → `syncAria()` (dual addEventListener/addListener, tanpa tulis).

#### Tests
- Belum ada automated test; QA 240/240 PASS_WITH_NOTES + harness CDP sementara di /tmp/opencode/ (qa-dm-*, hdr-compare, contrast-dark, low1-nit-probe, f-low-fixes-probe).

### 2026-10-09 (P0 konversi)

#### Added
- Tombol "Pesan" per kartu menu (23) → WhatsApp prefill nama item + harga (`wa.me/?text=` URL-encoded; anchor statis, no-JS; `target=_blank rel="noopener noreferrer"`; aria-label + "(buka di tab baru)").
- Section `#cara-pesan` (3 langkah `<ol class="steps">` + CTA WA) antara #menu dan #lokasi; link nav ke-7 "Cara Pesan"; separator 1px `.section--alt + .section--alt`.
- `favicon.svg` root + `<link rel="icon">` — favicon.ico 404 hilang.
- `index.html` 648→650, `css/style.css` 1417→1423.

#### Changed
- README sinkron: struktur folder (animations.js/theme.js/favicon), nomor WA 5→29 (5 lama + 23 + 1 CTA), panduan tombol Pesan & Cara Pesan (sinkron prefill ↔ kartu), favicon.
- CURRENT_STATE sinkron (fitur baru, hitungan, nav 7-link constraint).

#### Fixed
- LOW-1 review: kill-switch `prefers-reduced-motion` kini menonaktifkan `.card-menu__order` (transition/hover/active).
- LOW-2: 23 `aria-label` kartu menambah "(buka di tab baru)" (konsisten pola 8 link lama; total 31).
- LOW-3: dua `.section--alt` berurutan dipisah `border-top: 1px var(--color-border)`.
- NIT: komentar sinkron nama/harga↔prefill di index; angka kontras WA komentar (8.62/1.98).

#### Tests
- QA independen 115/115 PASS (verdict PASS); review APPROVE_WITH_NITS; retest 21/21 + p0-probe 46/46 + qa-dm-08 exit 0; harness CDP di /tmp/opencode/ (p0-probe, p0-layout, p0-r2-probe, qa-p0-*).

## Rules

- One block per meaningful work session; keep each entry short.
- Prefer linking to tasks/ task records for detail.
- Do not grow unboundedly — archive old sections into snapshots when large.
