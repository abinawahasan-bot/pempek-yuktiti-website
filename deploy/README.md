# Deploy kit — kompresi, caching, header keamanan

Situs ini **statis tanpa build step** (DECISIONS #1: "deploy = unggah berkas
langsung"). Kit ini menambahkan optimasi **di sisi server/CDN** tanpa mengubah
sumber dan tanpa menambah dependensi.

## Kenapa perlu?

Kode dikirim mentah berukuran ±188 KB. Terkompresi (terukur pada berkas asli):

| | Mentah | gzip −9 | brotli −q11 |
|---|---|---|---|
| total kode (HTML+CSS+JS) | 188 KB | **41 KB (−78%)** | **35 KB (−82%)** |

Kompresi memangkas ±78–82% bobot kode — perbaikan terbesar untuk transfer
pertama (lihat `docs/PERFORMANCE_AUDIT.md` §8 dan `TECHNICAL_DEBT` TD-PERF-03).

## Berkas di folder ini

| Berkas | Untuk hosting | Cara pakai |
|---|---|---|
| `_headers` | **Netlify**, **Cloudflare Pages** | Salin ke **root** situs (nama harus `_headers`). Kompresi otomatis di CDN; berkas ini mengatur caching + header keamanan. |
| `.htaccess` | **Apache / cPanel** | Salin ke **root** situs: `public_html/.htaccess`. Mengaktifkan brotli (bila ada) atau gzip + caching + MIME + header keamanan. |
| (tidak perlu berkas) | **GitHub Pages** | CDN GitHub sudah kompres (gzip) + caching otomatis. Cukup unggah biasa. |

> Catatan: berkas-berkas ini **tidak** mengubah situs dan aman diabaikan oleh
> host yang tidak mengenalinya. Root situs = folder yang memuat `index.html`.

## Yang dilakukan kit ini

1. **Kompresi** respons teks (HTML/CSS/JS/SVG/JSON) — brotli lalu gzip.
2. **MIME** untuk `.woff2` / `.webp` (mencegah font/gambar gagal decode di Apache).
3. **Caching**: HTML `no-cache`; CSS/JS `max-age=86400, must-revalidate`
   (nama berkas **tanpa hash**, jadi tidak memakai `immutable` 1 tahun agar update tetap sampai);
   gambar/font `max-age=2592000` (30 hari).
4. **Header keamanan dasar**: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`.

## Sengaja BELUM dilakukan (butuh keputusan/ langkah lanjutan)

- **Minify** HTML/CSS/JS dan **pemisahan CSS kritis** (TD-PERF-03 sisa, TD-PERF-06):
  keduanya butuh **langkah build**, yang bertentangan dengan DECISIONS #1
  ("tanpa build step"). Menunggu keputusan user. Alternatif tanpa build: andalkan
  kompresi (sudah memberi −78–82%) — ini sudah menutup sebagian besar manfaat.
- **CSP** penuh: situs memakai skrip/gaya inline; CSP yang benar butuh nonce/hash.
- **Preload/push** HTTP: tidak diperlukan untuk situs sekecil ini.

## Verifikasi setelah deploy

- Cek header: `curl -sI https://DOMAIN/css/style.css` → cari `content-encoding: br|gzip`.
- Ukur ulang dengan harness: `docs/PERFORMANCE_AUDIT.md` §6 (metode) / `/tmp/opencode/yk_measure.py`.
