# DEPLOY — kompresi, caching, header keamanan

Situs ini **statis tanpa build step** (DECISIONS #1: "deploy = unggah berkas
langsung"). Berkas konfigurasi di bawah bekerja **otomatis saat di-drag & drop**
karena berada di root situs — tidak perlu menyalin ke mana pun.

## Domain & hosting — DIPUTUSKAN (2026-10-12)

- **Hosting:** Netlify Drop (gratis, HTTPS otomatis) — DECISIONS #4.
- **Domain:** `pempekyuktiti.com` — **belum dibeli** (langkah Anda; lihat "Cara deploy").
- Semua URL absolut situs memakai `https://pempekyuktiti.com/`: `canonical`,
  `og:url`, `og:image`, `twitter:image`, dan JSON-LD `url`/`image`/`hasMenu`.
- `robots.txt` + `sitemap.xml` ditambahkan (menutup ISSUE-003).

## Kenapa perlu?

Kode dikirim mentah berukuran ±188 KB. Terkompresi (terukur pada berkas asli):

| | Mentah | gzip −9 | brotli −q11 |
|---|---|---|---|
| total kode (HTML+CSS+JS) | 188 KB | **41 KB (−78%)** | **35 KB (−82%)** |

Kompresi memangkas ±78–82% bobot kode — perbaikan terbesar untuk transfer
pertama (lihat `docs/PERFORMANCE_AUDIT.md` §8 dan `TECHNICAL_DEBT` TD-PERF-03).

## Berkas konfigurasi (sudah di root)

| Berkas | Untuk hosting | Perilaku |
|---|---|---|
| `_headers` | **Netlify**, **Cloudflare Pages** | Otomatis dibaca (tidak disajikan publik). Kompresi otomatis di CDN; berkas ini mengatur caching + header keamanan. |
| `.htaccess` | **Apache / cPanel** | Otomatis aktif bila berkas diunggah ke `public_html/`. Mengaktifkan brotli (bila ada) atau gzip + caching + MIME + header keamanan. |
| (tidak perlu berkas) | **GitHub Pages** | CDN GitHub sudah kompres (gzip) + caching otomatis. |

> Aman: host yang tidak mengenali suatu berkas akan mengabaikannya.

## Cara deploy (Netlify Drop + domain sendiri)

1. **Beli domain** `pempekyuktiti.com` di registrar pilihan (mis. Cloudflare
   Registrar, Namecheap, Niagahoster, Rumahweb). Catat akses DNS-nya.
2. Buka **https://app.netlify.com/drop** (akun gratis). Seret isi folder proyek →
   Netlify memberi URL `*.netlify.app`. `_headers` langsung berlaku.
3. Di Netlify: **Site settings → Domain management → Add custom domain** →
   masukkan `pempekyuktiti.com` (dan `www`). Netlify menampilkan target DNS.
4. **DNS** (di registrar): arahkan ke Netlify sesuai yang diminta —
   - apex `pempekyuktiti.com` → **A** `75.2.60.5` (atau ALIAS/ANAME ke `*.netlify.app` bila didukung);
   - `www` → **CNAME** ke `<nama-situs>.netlify.app`.
   Netlify menyediakan Let's Encrypt (HTTPS) otomatis setelah DNS propagasi.
5. **Jangan sertakan** folder `.opencode/` (lihat di bawah). Unggah hanya berkas situs.

## Jangan publikasikan catatan internal

Folder `.opencode/` (Project Brain + telemetry, 48 berkas) **sengaja dilacak git** — memori proyek. Hati-hati agar tidak ikut terbit:

- **Netlify Drop / cPanel:** unggah hanya berkas situs (`index.html`, `css/`, `js/`, `assets/`, `favicon.svg`, `_headers`, `.htaccess`, `DEPLOY.md`, `robots.txt`, `sitemap.xml`) — **jangan** `.opencode/`.
- **GitHub Pages:** Pages menyajikan **seluruh isi branch**. Tambahkan `_config.yml` di root:
  ```yaml
  exclude:
    - .opencode
  ```
  `.gitignore` **tidak** menolong untuk berkas yang sudah terlacak.

Tidak ada rahasia di `.opencode/` (secret scan bersih), tetapi isinya catatan internal — sebaiknya tidak publik. Terlacak sebagai **ISSUE-006 (LOW)**.

## Yang dilakukan kit ini

1. **Kompresi** respons teks (HTML/CSS/JS/SVG/JSON) — brotli lalu gzip.
2. **MIME** untuk `.woff2` / `.webp` (mencegah font/gambar gagal decode di Apache).
3. **Caching**: HTML `no-cache`; CSS/JS `max-age=86400, must-revalidate`
   (nama berkas **tanpa hash**, jadi tidak memakai `immutable` 1 tahun agar update tetap sampai);
   gambar/font `max-age=2592000` (30 hari).
4. **Header keamanan dasar**: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`.

## Sengaja BELUM dilakukan (butuh keputusan / langkah lanjutan)

- **Minify** HTML/CSS/JS dan **pemisahan CSS kritis** (TD-PERF-03 sisa, TD-PERF-06):
  keduanya butuh **langkah build**, yang bertentangan dengan DECISIONS #1
  ("tanpa build step"). **Tidak diadopsi** — kompresi (sudah −78–82%) menutup
  sebagian besar manfaatnya. Dapat ditinjau ulang bila user menghendaki build.
- **CSP** penuh: situs memakai skrip/gaya inline; CSP yang benar butuh nonce/hash.
- **Preload/push** HTTP: tidak diperlukan untuk situs sekecil ini.

## Verifikasi setelah deploy

- Header: `curl -sI https://pempekyuktiti.com/css/style.css` → cari `content-encoding: br|gzip`.
- Pastikan `.opencode/` tidak dapat diakses (harus 404).
- Cek `https://pempekyuktiti.com/robots.txt` & `/sitemap.xml` ter-serve.
- Validasi SEO: Google Rich Results Test (JSON-LD) + Facebook Sharing Debugger (og:image).
- Ukur ulang dengan harness: `docs/PERFORMANCE_AUDIT.md` §6 / `/tmp/opencode/yk_measure.py`.
