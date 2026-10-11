# Pempek Yuk Titi — UII Jakal

Landing page **statis satu halaman** untuk UMKM pempek "Pempek Yuk Titi — UII Jakal" (Kaliurang KM 14, Sleman). Dibangun dengan **HTML, CSS, dan JavaScript murni — tanpa framework, tanpa build step, tanpa dependensi** (hanya Google Fonts dari CDN).

Isi halaman (satu berkas `index.html`, urut dari atas): Nav sticky → Hero (foto) → Cerita Singkat → Menu & Harga → Lokasi & Jam Buka (embed Google Maps) → Galeri (5 foto stok + 1 slot asli) → Kontak/CTA → Footer, plus tombol FAB WhatsApp melayang di layar kecil.

Fokus halaman: SEO lokal, tombol WhatsApp (`wa.me`), link Instagram, dan harga menu yang selalu disertai disclaimer.

---

## Struktur folder

```
pempek-yuktiti-website/
├── index.html            # Seluruh konten halaman + meta SEO + JSON-LD
├── favicon.svg           # Ikon tab/browser (SVG, tanpa dependensi)
├── css/
│   └── style.css         # Semua gaya (mobile-first, design tokens di :root)
├── js/
│   ├── main.js           # Hanya toggle nav mobile (progressive enhancement)
│   ├── animations.js     # Animasi 3D ringan + intro splash (reduced-motion-aware)
│   ├── theme.js          # Toggle dark mode + ARIA + sinkron lintas tab
│   ├── cart.js           # Keranjang belanja + kalkulator total + checkout WhatsApp
│   ├── lightbox.js       # Pratinjau foto galeri (native dialog; tanpa JS galeri statis)
│   └── header.js         # Header meramping saat gulir + ukur tinggi header (tanpa JS selalu penuh)
├── assets/
│   └── img/              # Foto stok (Pexels) + foto menu per item (assets/img/menu/)
│       └── menu/         # 23 foto menu + LISENSI.md (sumber & lisensi tiap file)
├── docs/
│   └── DESIGN_BRIEF.md   # Brief desain: palet, tipografi, wireframe, checklist
└── .opencode/
    └── brain/            # Catatan memori proyek (PROJECT, STACK, DECISIONS, dll.)
```

- `index.html` — satu-satunya berkas HTML. Semua teks, harga, jam buka, alamat, dan link ada di sini.
- `css/style.css` — gaya seluruh halaman; warna/ukuran diatur sebagai custom property di blok `:root`.
- `js/main.js` — sangat kecil & opsional: hanya membuka/menutup menu nav di layar kecil. **Halaman tetap berfungsi penuh tanpa JavaScript.**
- `docs/DESIGN_BRIEF.md` — acuan desain (palet warna, tipografi, struktur section, aturan a11y/SEO).
- `.opencode/brain/` — catatan internal proyek untuk keperluan agen AI, **bukan bagian dari situs**; biasanya dikecualikan dari repo/deploy publik.

---

## Menjalankan secara lokal

Tidak ada instalasi apa pun. Dari folder proyek:

```bash
python3 -m http.server 8000
```

Lalu buka **http://localhost:8000** di browser.

Alternatif (pilih salah satu):

```bash
npx serve .          # Node.js
php -S localhost:8000 # PHP
```

Cara paling sederhana: buka `index.html` langsung di browser (double-click) — seluruh isi halaman tetap terbaca. Untuk pratinjau yang paling mirip dengan kondisi online (embed peta, font, link), gunakan server lokal di atas.

---

## Panduan mengubah data (untuk pemilik / editor)

Semua perubahan dilakukan di **`index.html`**. Simpan berkas, muat ulang browser (Ctrl+R / Cmd+R), selesai. Gunakan **Ctrl+F** untuk mencari teks di bawah agar cepat ketemu.

### 1. Harga menu

- Lokasi: bagian `<section id="menu">` (judul "Menu & Harga").
- Harga ada di **setiap kartu item**, yaitu baris berbentuk:

  ```html
  <p class="card-menu__price">Rp 3.500</p>
  ```

- Ada 4 kelompok menu: **Pempek Sikoan**, **Pempek Spesial & Paket**, **Add-on**, **Minuman**.
- **Format penulisan wajib:** `Rp` + spasi + angka dengan **titik** sebagai pemisah ribuan — mis. `Rp 3.500`, `Rp 13.500`, `Rp 15.000` (bukan `Rp3500` atau `Rp 3,500`). Format ini juga dibaca otomatis oleh **keranjang** (`js/cart.js`) — harga hanya boleh ditulis di sini, jangan diedit di file lain.
- ⚠️ **Setelah mengubah harga, pastikan kotak disclaimer di bawah daftar menu masih ada** (cari `disclaimer-box`). Jangan pernah menghapusnya — teksnya:

  > **Catatan harga:** Harga dapat berubah, konfirmasi via WhatsApp.

  Disclaimer ini wajib tampil karena harga sifatnya bisa berubah sewaktu-waktu (lihat bagian "Catatan data" di bawah).

### 2. Jam buka

Jam buka muncul di **4 tempat** di HTML — ubah semuanya agar konsisten (cari `15.00` atau `15:00`):

| # | Lokasi | Teks |
|---|---|---|
| 1 | Hero (`.hero__meta`) | `Setiap hari 15.00–22.30` |
| 2 | Section Lokasi, info-card "Jam Buka" | `Setiap hari <time datetime="15:00">15.00</time>–<time ...>22.30</time>` |
| 3 | Section Kontak (`.kontak-note`) | `... · Setiap hari 15.00–22.30` |
| 4 | Footer (`.footer__text`) | `Setiap hari <time ...>15.00</time>–<time ...>22.30</time>` |

- Dua tempat memakai elemen `<time>` (masing-masing dua tag: jam mulai & jam tutup) — ikuti juga atribut `datetime="15:00"` / `datetime="22:30"` (format 24 jam `HH:MM`), karena itu yang dibaca mesin pencari.
- **Satu tempat lagi di blok JSON-LD** (deklarasi schema di `<head>`): `"openingHours": ["Mo-Su 15:00-22:30"]`. Ubah juga jika jam berubah.

### 3. Alamat

Alamat muncul di beberapa tempat — paling mudah cari teks `Kaliurang St No.Km 14`:

- Section **Lokasi**, info-card "Alamat": elemen `<address>...</address>`.
- Tombol **"Buka di Google Maps"**: `href` berisi query alamat.
- **Embed peta (iframe)**: `src` berisi `q=...` (lihat poin 6).
- Hero (`.hero__meta`): versi singkat `Kaliurang KM 14, Sleman`.
- `.kontak-note` di section Kontak, dan `<address>` di **footer**.
- Blok **JSON-LD** di `<head>`: field `streetAddress`, `addressLocality`, `addressRegion`, `postalCode`.
- Meta `<meta name="description">` di `<head>` (juga memuat alamat).

### 4. Nomor WhatsApp

Nomor WA dipakai di **6 tempat statis** di `index.html` (cari `wa.me/628814105501`):

1. Tombol "Chat via WhatsApp" di Hero.
2. Tombol "Pesan via WhatsApp" di bawah daftar menu (fallback **tanpa JavaScript**).
3. Tombol "Chat via WhatsApp" di section Kontak.
4. Link "WhatsApp" di footer.
5. Tombol FAB bulat WhatsApp (pojok kanan bawah, tampil di layar kecil–sedang).
6. **1 tombol CTA di section "Cara Pesan"** — prefill umum "Saya mau bertanya/memesan".

> **Selain itu**, tombol **Checkout keranjang** membangun link `wa.me/628814105501?text=…` **secara otomatis saat runtime** oleh `js/cart.js` (berisi rincian item + total) — nomornya ada **satu** di file `js/cart.js`. Jadi jika nomor WA berubah: update ke-6 tempat statis di `index.html` **dan** konstanta nomor di `js/cart.js`.
>
> Nomor yang sama juga ada **1 kali di blok JSON-LD**: `"telephone": "+628814105501"` (format `+62`, tanpa `0` di depan, tanpa spasi) — ubah juga agar data terstruktur cocok dengan link.

### 5. Link Instagram

URL `instagram.com/pempek_yuktiti/` muncul **3 kali** (cari `instagram.com/pempek_yuktiti`):

1. Tombol "Instagram @pempek_yuktiti" di section Kontak.
2. Link "Instagram" di footer.
3. Blok JSON-LD: `"sameAs": ["https://www.instagram.com/pempek_yuktiti/"]`.

### 6. Embed peta (Google Maps)

Di section Lokasi, ada `<iframe>` dengan `src` berbentuk:

```html
src="https://www.google.com/maps?q=KALIURANG+ST+...+55584&amp;output=embed"
```

Cara mengubahnya: buka Google Maps di browser → cari lokasi → **Bagikan → Sisipkan peta** → salin bagian URL di dalam `src="..."` (pastikan tetap ada `&output=embed`). Pertahankan juga atribut `title="..."` di dalam iframe (deskripsi untuk pembaca layar), dan ubah isinya agar sesuai lokasi baru.

### 7. Foto galeri & hero

**Status sekarang:** hero memakai `assets/img/hero-pempek.jpg` dan galeri terisi **4 foto** stok dari Pexels (`pempek-saus.jpg`, `pempek-closeup.jpg`, `pempek-topview.jpg`, `pempek-adaon.jpg`). 2 foto pemilik (`yuk-titi.jpg`, `yuk-titi-1.jpg`) **dihapus 2026-10-10** atas permintaan pemilik (konten dinilai tidak cocok untuk galeri + crop portrait parah di bingkai 4:3). Foto stok bersifat **sementara** — ganti dengan foto asli lain bila tersedia (sarankan foto makanan/warung **landscape** agar pas di bingkai galeri).

> Catatan: foto asli yang baru ditambahkan adalah hasil optimasi dari file PNG milik pemilik (disimpan lokal sebagai JPEG, panjang sisi maks. 900px). Versi resolusi penuh tetap ada di folder milik pemilik.

**Foto per item menu:** setiap kartu menu (23 item) memiliki fotonya sendiri di `assets/img/menu/<slug>.jpg` (Pexels, bebas lisensi). Daftar sumber & lisensi per file ada di `assets/img/menu/LISENSI.md`. Foto menu memakai atribut `loading="lazy"` + `width`/`height` (reservasi ruang agar tidak lompat). Semua aturan di bawah juga berlaku untuk foto menu.

Mengganti foto (paling mudah — tanpa sentuh HTML): **timpa file di `assets/img/` dengan nama yang sama** (rasio disarankan 4:3 atau 1:1 untuk galeri; hero 16:9), lalu muat ulang browser. Cara lain: ganti blok `<figure class="gallery-item">...` di `index.html`:

```html
<figure class="gallery-item">
  <img class="gallery-item__img" src="assets/img/pempek-andalan.jpg" alt="Pempek kapal selam tersaji, disiram cuko" width="800" height="600" loading="lazy" decoding="async">
</figure>
```

Aturan wajib:

1. **File disimpan lokal** di `assets/img/` — **jangan hotlink** (jangan tautkan langsung URL gambar orang lain / hasil scrape Instagram).
2. **Selalu isi `alt`** dengan deskripsi nyata isi foto (bukan "gambar1"). Foto bisa ditambah atribut `width`/`height` sesuai dimensi asli agar tidak lompat saat dimuat.
3. **Jangan menambah figcaption** — `figcaption` saat ini sengaja tidak dipakai di galeri (menghindari duplikat teks untuk pembaca layar).
4. Foto hero memakai atribut `fetchpriority="high"`; foto galeri memakai `loading="lazy"` — pertahankan pola ini.
5. Slot placeholder galeri sudah tidak ada; tambahkan foto asli lain dengan pola `<figure>` yang sama bila pemilik mengirim foto baru.

### 8. Keranjang belanja, tombol "Pesan" & section "Cara Pesan"

**Fiturnya (tanpa backend, tanpa dependensi):** setiap kartu menu punya **stepper jumlah** (− / jumlah / +). Item yang dipilih masuk ke **keranjang** (bar sticky bawah) dengan **kalkulator total otomatis** (subtotal per item → total). Tombol **Checkout** membuka WhatsApp dengan pesan rincian lengkap (`2x Pempek Sikoan (Rp 3.500) = Rp 7.000` … `Total: Rp …`). Ini adalah **satu-satunya tombol pesan** yang tampil saat keranjang aktif.

- **Mode normal (dengan JS aktif):** stepper tampil di kartu; CTA statis di bawah daftar menu disembunyikan; keranjang yang muncul di bawah halaman menampilkan badge jumlah + total berjalan; tombol Checkout = satu tombol pesan.
- **Tanpa JavaScript:** stepper & keranjang disembunyikan; yang tampil adalah **CTA statis "Pesan via WhatsApp"** di bawah daftar menu (prefill umum). Pengunjung tetap bisa memesan — tanpa kalkulator total.
- **State keranjang** disimpan di `sessionStorage` (`pyt_cart`) — bertahan saat reload tab yang sama, hilang saat tab ditutup (sengaja: pesanan sifatnya segera).
- **Checkout** membangun URL `https://wa.me/628814105501?text=<encoded>` berisi daftar item + total; URL-encode ditangani `js/cart.js` (jangan diketik manual).

**Mengubah harga item** (lihat juga bagian "1. Harga menu"): cukup ubah `.card-menu__price` di kartu — **harga hanya ada di satu tempat** dan dibaca otomatis oleh keranjang (`js/cart.js` mem-parse teksnya). ⚠️ Jaga komentar penanda sinkron di atas daftar menu (`index.html`, sekitar baris ~186) dan format harga tetap `Rp 3.500` (titik ribuan) agar parser keranjang tidak gagal.

**Section "Cara Pesan"** (antara Menu dan Lokasi, ada juga di nav): 3 langkah bernomor + tombol CTA "Chat WhatsApp" (prefill umum). Langkah 2 kini disesuaikan dengan alur keranjang ("pilih jumlah → buka keranjang → Checkout WA"); teks bisa diedit bebas.

**Kunci teknis:** semua perilaku cart ada di `js/cart.js` (IIFE, zero-dependency), markup keranjang di akhir `index.html` (`.cart-bar`, `.cart-backdrop`, `.cart-panel`), gaya di blok "Keranjang belanja & checkout" di `css/style.css`. Jangan menambah library untuk fitur ini.

### 9. Favicon (ikon tab browser)

- File `favicon.svg` di root (vektor brand: rounded-square terakota + ikan putih). Ditautkan dari `<head>` via `<link rel="icon" type="image/svg+xml" href="favicon.svg">`.
- Mengganti: cukup timpa `favicon.svg` (SVG dengan `viewBox` ≥ 32×32, tajam di semua ukuran). Tidak perlu dependensi.

---

## SEO setelah domain resmi ada (PENTING)

Beberapa tag SEO **sengaja masih dikomentari/dikosongkan** di `index.html` karena situs ini belum punya domain resmi. Mengisi URL domain yang mengarang justru merugikan (mesin pencari diarahkan ke alamat yang tidak ada, dan share kartu sosial media rusak).

Saat domain resmi (mis. `https://pempekyuktiti.id/`) sudah aktif, buka `index.html` lalu:

| # | Yang diaktifkan | Lokasi di `index.html` |
|---|---|---|
| 1 | `<link rel="canonical" href="...">` | Komentar `TODO: canonical` di `<head>` — hapus tanda komentar `<!-- -->` dan isi URL absolut |
| 2 | `<meta property="og:url" ...>` | Komentar `TODO: og:url & og:image` di `<head>` |
| 3 | `<meta property="og:image" ...>` | Komentar yang sama — isi URL **file gambar milik sendiri** (mis. `https://DOMAIN/assets/og-image.jpg`), jangan hotlink |
| 4 | Field `"url"` dan `"hasMenu"` di JSON-LD | Komentar `TODO SEO` tepat di atas blok `<script type="application/ld+json">` — tambahkan `"url": "https://DOMAIN/"` dan `"hasMenu": "https://DOMAIN/#menu"` ke objek Restaurant |

**Kenapa belum aktif:** canonical/og:url ke domain yang belum ada = sinyal salah ke Google & platform sosial. `og:image` memerlukan **URL absolut** (domain) — aset siap dipakai: `assets/img/hero-pempek.jpg`. Setelah diisi, validasi ulang dengan Google Rich Results Test.

Meta dasar yang **sudah aktif sekarang**: `<title>`, `meta description`, `robots index,follow`, Open Graph (`og:title/description/type/locale/site_name`), Twitter card, dan JSON-LD `Restaurant` (alamat, telepon, jam buka, `priceRange`, `sameAs` Instagram).

---

## Deploy (3 opsi, semuanya gratis)

Situs ini murni statis — **semua opsi di bawah hanya butuh mengunggah file**, tanpa build.

### A. Netlify Drop (paling cepat, ~1 menit)

1. Buka **https://app.netlify.com/drop** (perlu akun gratis Netlify).
2. Seret (drag & drop) seluruh isi folder proyek ke halaman itu.
3. Netlify langsung memberi URL publik (mis. `nama-acak.netlify.app`) — bisa diganti nama & di-custom domain nanti.

### B. GitHub Pages

1. Buat repository baru di GitHub, lalu unggah isi folder: `git init && git add . && git commit -m "inisial" && git branch -M main && git push` (hubungkan ke remote repo dulu).
2. Di repo: **Settings → Pages**.
3. *Source*: **Deploy from a branch** → branch **`main`**, folder **`/ (root)`** → **Save**.
4. Tunggu 1–2 menit; situs live di `https://USERNAME.github.io/NAMA-REPO/`.
5. Opsional: tambahkan file `.gitignore` berisi `.opencode/` agar catatan internal tidak ikut terpublikasi.

### C. cPanel shared hosting

1. Login cPanel → **File Manager** → masuk ke **`public_html/`**.
2. Unggah `index.html`, folder `css/`, `js/`, `docs/` (dan `assets/` bila ada).
3. Pastikan `index.html` ada di tingkat teratas `public_html/` (bukan tersembunyi di subfolder).
4. Buka nama domain → halaman langsung tampil. HTTPS umumnya aktif via **Let's Encrypt** di cPanel.

> **Catatan:** kecualikan folder `.opencode/` dari unggahan/publikasi — isinya catatan internal proyek, bukan bagian situs.

---

## Catatan data: harga & sumbernya

- **Sumber harga:** data 2026 diambil dari **menukuliner.net** (sumber primer) dan disilang dengan **olshopin** (juga grubbio). Harga **bukan** dari daftar resmi pemilik, sehingga ada kemungkinan selisih atau sudah berubah.
- **Disclaimer di halaman:** teks *"Catatan harga: Harga dapat berubah, konfirmasi via WhatsApp."* **sudah ada** di section Menu (class `disclaimer-box`) dan **wajib dipertahankan** setiap kali harga diedit.
- **Jika harga berubah:** update angka di `index.html`, lalu konfirmasi ulang ke pemilik lewat WhatsApp (`wa.me/628814105501`) — pengunjung juga diarahkan ke WA untuk konfirmasi.
- Harga lama tahun 2023 (mis. sikoan Rp 5.500) sudah dianggap basi dan **tidak** dipakai.

---

## Accessibility (sudah diterapkan)

- **Skip link**: `<a class="skip-link" href="#main">` ("Lewati ke konten utama") muncul saat di-Tab — langsung ke konten utama.
- **Focus visible**: cincin fokus `:focus-visible` 3px warna terakota, kontras tinggi, berlaku untuk semua link/tombol.
- **Kontras AA**: pasangan warna diperiksa — teks putih vs primary `#8B3E2F` ≈ 7,44:1 dan teks gelap vs hijau WA `#25D366` ≈ 8,60:1 (keduanya jauh di atas syarat AA). Jangan mengganti warna token secara acak tanpa cek ulang kontras.
- **Tanpa JavaScript tetap jalan**: nav tampil penuh (tanpa hamburger), navigasi anchor memakai bawaan browser, dan smooth scroll ditangani CSS. Class `.js` baru ditambahkan oleh `js/main.js` **setelah** semua listener terpasang — jika file JS gagal dimuat, nav tidak pernah "rusak".
- **`prefers-reduced-motion`**: `scroll-behavior: smooth` hanya aktif di dalam `@media (prefers-reduced-motion: no-preference)` — pengguna yang mematikan animasi di sistemnya otomatis tidak mendapat smooth scroll.
- Lainnya: HTML semantik (`header/nav/main/section/footer/address/time`), target sentuh ≥44px, `title` pada iframe peta, `aria-label` pada tombol hamburger & FAB, teks "(buka di tab baru)" untuk screen reader pada link eksternal, hierarki heading H1 tunggal → H2 per section.

---

## Animasi 3D (ditambahkan 2026-10-08)

Situs memakai **animasi 3D ringan** (CSS `transform`/`perspective` + sedikit JS `js/animations.js`) — **tanpa library eksternal** (tanpa Three.js/GSAP/AOS):

- **Hero**: foto miring halus mengikuti kursor (±4°, desktop), kilau ikut kursor, float lembut; caption melayang di depan foto (`translateZ`).
- **Kartu menu**: tilt 3D + kilau menyapu saat hover (desktop), shadow membesar.
- **Reveal 3D saat scroll**: `section__head`, `info-card` (Lokasi), foto galeri, dan aksi kontak muncul dengan efek depth + stagger (IntersectionObserver).
- **Tombol**: lift halus saat hover (desktop); FAB WhatsApp memakai pulse ring (transform/opacity, bukan box-shadow — hemat baterai/performa).
- **Depth statis**: bayangan berlapis tetap terasa 3D walau tanpa gerak.

### Cara kerja gating (3 lapis)
1. **Tanpa JavaScript** → semua konten tampil polos (class `js` tidak pernah ada) — halaman tetap berfungsi penuh.
2. **`prefers-reduced-motion: reduce`** (setelan OS/browser) → semua animasi 3D mati, konten tampil seketika. Bisa di-toggle kapan pun, bahkan setelah halaman dimuat.
3. **Perangkat sentuh** (tanpa hover halus) → tilt/kilau tidak aktif, hanya depth statis (tidak ada efek hover menempel).

### Bagaimana menguji
- **Desktop (mouse)**: arahkan kursor ke foto hero / kartu menu / tombol — perhatikan tilt, kilau, dan lift. Scroll ke Galeri, Lokasi, Kontak — elemen muncul bertahap.
- **Reduced-motion**: DevTools → Rendering → *Emulate CSS media feature prefers-reduced-motion: reduce* → reload → semua diam & tampil.
- **No-JS**: DevTools → Settings → *Disable JavaScript* → reload → semua tampil, nav full tanpa hamburger.
- **Kunci file**: `js/animations.js` (JS efek) dan bagian `/* ---------- Animasi 3D ---------- */` di akhir `css/style.css`. Hapus `<script src="js/animations.js">` untuk menonaktifkan semua efek sekaligus (halaman tetap utuh).
- Catatan: style/reveal "muncul saat discroll" bisa terasa tertunda bila pengunjung lompat jauh dengan scrollbar — bukan bug; elemen tampil begitu section berada di layar (dan di cetak/print selalu tampil penuh).

---

## Background dekoratif & intro splash (ditambahkan 2026-10-08)

### Background dekoratif
- Lapisan `position:fixed` di belakang konten (`z-index:-1`, `pointer-events:none`): gradien hangat surface→surface-2, motif songket/batik halus (opacity 0.04), dan 3 blob warna brand (terakota/maroon/hijau, alpha ≤0.12, blur lembut) di sudut kanan-atas, kanan-bawah, kiri-bawah — **jauh dari teks hero** (kiri-atas) agar kontras AA tetap.
- Blob bermain sangat pelan (28–34s, transform saja) **hanya** saat `prefers-reduced-motion: no-preference` (`html.anim`); selain itu statis tapi tetap terlihat. Cetak (print) → dekor disembunyikan.

### Intro splash (sekali per sesi browser)
- Saat pertama kali situs dibuka dalam satu sesi browser: overlay singkat logo "Pempek Yuk Titi" + tagline muncul (±1s animasi), lalu menutup sendiri **±2,1s** dan node-nya dihapus dari DOM.
- **Sekali per sesi** (`sessionStorage.pyt_splash`) — reload tab yang sama tidak memunculkan lagi; tab baru mandiri akan memunculkannya.
- **Skip:** klik/tap atau tekan tombol apa pun (Escape/Enter, dsb.) → langsung tertutup (<0,5s).
- **Aman & aksesibel:** `aria-hidden`, tanpa elemen focusable (fokus tidak berpindah), tidak mengunci scroll, `display:none` default (anti-flash), failsafe menghapus node jika ada error, dan **tidak muncul sama sekali** saat no-JS atau `prefers-reduced-motion: reduce`.
- Kunci: HTML `#splash` (+ `.bg-decor`) di `index.html` baris ~64–80; CSS section "Background dekoratif & splash" (akhir style.css); JS `setupSplash()` di `js/animations.js`. Hapus `<div class="splash">` untuk menonaktifkan splash sepenuhnya.

---

## Dark mode (ditambahkan 2026-10-08)

Situs mendukung **tema terang & gelap** — tanpa dependensi eksternal, tanpa flash saat muat:

- **Default mengikuti sistem** (`prefers-color-scheme`): pengguna yang setelan OS-nya gelap otomatis melihat situs gelap — **bahkan tanpa JavaScript**. Pengguna yang belum pernah memilih tema sama sekali tidak akan mendapat flash terang-tiba-gelap.
- **Tombol toggle** di header (ikon bulan/matahari, `aria-pressed`, target ≥44px): klik untuk berpindah tema. Pilihan disimpan di `localStorage` (`pyt_theme`) dan **menang atas sistem** — klik sekali, tetap di tema itu sampai diubah.
- **Anti-flash**: skrip kecil inline di `<head>` (sebelum stylesheet) membaca pilihan tersimpan sebelum CSS pertama kali diterapkan, jadi tidak ada "blink" terang→gelap saat reload.
- **Sinkron antar tab**: mengubah tema di satu tab langsung memindahkan tab lain (event `storage`), tanpa reload.
- **Cetak selalu terang** (`@media print`): mencetak halaman dalam mode gelap tetap menghasilkan dokumen terang.
- **Palet gelap hangat** (bukan hitam pekat) yang selaras brand; kontras teks diuji ulang (induk: body/muted/link/harga/CTA/badge/FAB semua ≥4,5:1 — angka di laporan QA).
- **Degradasi aman**: tanpa JS atau jika `js/theme.js` gagal dimuat, tombol toggle disembunyikan dan halaman tetap mengikuti sistem; konten tidak pernah rusak.

### Cara kerja gating tema (3 lapis, konsisten dengan animasi)
1. Tanpa JavaScript / `theme.js` gagal → tombol tidak tampil; tema = sistem (CSS media).
2. Belum pernah memilih → ikut sistem secara **live** (ubah OS → situs ikut berubah tanpa reload).
3. Sudah memilih (dark/light eksplisit) → pilihan disimpan dan menang; OS yang berubah tidak menggesernya.

### Bagaimana menguji
- **Sistem gelap**: OS/browser ke mode gelap → buka situs → situs gelap tanpa klik. Atau DevTools → Rendering → *Emulate CSS media feature prefers-color-scheme: dark*.
- **Toggle**: klik tombol bulan/matahari di header → tema berpindah; muat ulang → tetap.
- **Antar tab**: buka 2 tab, ubah tema di salah satu → tab lain ikut berubah tanpa reload.
- **Print**: Ctrl+P dalam mode gelap → pratinjau cetak tetap terang.
- Aksesibilitas: Tab ke tombol tema, Enter/Space mengaktifkannya; `aria-label`/`aria-pressed` ikut tema.
- Kunci file: `js/theme.js` (toggle + ARIA + sync), skrip inline di `<head>` `index.html` (hidrasi anti-FOUC), blok token dark (`:root[data-theme="dark"]` + `@media (prefers-color-scheme: dark)`) di awal `css/style.css`.

---

## Lisensi & konten

Konten (nama usaha, menu, harga) milik Pempek Yuk Titi. **Foto di `assets/img/` (hero, galeri) dan `assets/img/menu/` (23 foto item) adalah foto stok dari Pexels** (lisensi Pexels — gratis untuk penggunaan komersial, tanpa atribusi wajib) dan dipakai **sementara** sebagai ilustrasi; ganti dengan foto asli warung secepatnya. Rincian sumber & lisensi per foto menu ada di `assets/img/menu/LISENSI.md`. Jangan menggunakan foto orang lain tanpa izin.
