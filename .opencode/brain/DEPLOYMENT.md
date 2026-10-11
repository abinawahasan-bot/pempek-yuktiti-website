# DEPLOYMENT

> Project Brain file · ACTUAL deployment architecture. NEVER store deployment credentials. Confidence markers apply.
> Status: **belum pernah di-deploy**; hosting **DIPILIH: Netlify Drop**; domain **`pempekyuktiti.com`** (belum dibeli) — DECISIONS #6 (2026-10-12). Kit deportime + aset SEO (og-image, robots, sitemap) siap di root.

## Environments

| Environment | Purpose | URL/domain | Confidence |
|-------------|---------|-----------|------------|
| dev (lokal) | Pratinjau di mesin sendiri (`python3 -m http.server`) | http://127.0.0.1:8011/ | CONFIRMED |
| prod | Situs publik | **https://pempekyuktiti.com/** (dipilih 2026-10-12 — DECISIONS #6; belum live: domain belum dibeli/deploy) | PENDING |

## Target hosting (kandidat)

**DIPUTUSKAN (2026-10-12): Netlify Drop** (DECISIONS #6) — tercepat, brotli/HTTPS otomatis, tanpa build; `_headers` di root langsung berlaku. Alternatif (Cloudflare Pages / GitHub Pages / cPanel) tetap didukung config yang sudah ada (`.htaccess`, `_config.yml`).

## Build process

- **Tidak ada build step** (DECISIONS #1: "deploy = unggah berkas langsung"). Sumber = artefak.
- Optimasi deportime disiapkan sebagai **berkas config server** (bukan build), ditempatkan di **root** agar berlaku otomatis saat drag-and-drop: `.htaccess` (Apache/cPanel), `_headers` (Netlify/Cloudflare Pages). Panduan `DEPLOY.md`.

## Containers / runtime

- Tidak ada (statis murni). Tidak ada container, tidak ada runtime server. (CONFIRMED)

## Servers & reverse proxy

- Hosting statis/CDN (Netlify Drop). TLS: Let's Encrypt otomatis di Netlify setelah DNS aktif. Belum dikonfigurasi (domain belum dibeli). (PENDING)

## CI / CD

- Tidak ada CI/CD. Deploy manual: unggah folder (Netlify Drop / Git push ke GitHub Pages / File Manager cPanel). (CONFIRMED — README §Deploy)

## Kompresi & caching (deportime)

- **Berkas:** `.htaccess`, `_headers` (keduanya di root); panduan `DEPLOY.md`. (CONFIRMED 2026-10-11)
- **Terukur pada kode asli:** 188 KB → **41 KB (gzip −78%)** / **35 KB (brotli −82%)**.
- Netlify/GitHub Pages: kompresi otomatis di CDN; cPanel: `.htaccess` mengaktifkan brotli/gzip + MIME `.woff2`/`.webp` + caching + header keamanan. Caching CSS/JS sengaja `max-age=86400, must-revalidate` (nama berkas **tanpa hash** → hindari `immutable` 1 tahun).
- **Minify + CSS kritis (TD-PERF-03 sisa, TD-PERF-06) TIDAK diadopsi**: butuh build step → bertentangan DECISIONS #1; user menyetujui rekomendasi tetap tanpa build (2026-10-11).

## Monitoring & logging

- Tidak ada (situs statis). Analitik/uptime belum dipasang. (UNKNOWN)

## Rollback strategy

- Situs statis: rollback = unggah ulang versi sebelumnya (simpan rilis sebagai snapshot/tag git). Belum ada mekanisme otomatis. (INFERRED)

## Deploy runbook

1. Drag & drop isi folder ke Netlify Drop (rekomendasi) — `.htaccess`/`_headers` di root otomatis berlaku. Untuk cPanel: unggah isi folder ke `public_html/`.
2. Pastikan `index.html` ada di tingkat teratas root yang di-deploy.
3. Kecualikan folder `.opencode/` dari unggahan publik (Netlify Drop/cPanel: jangan unggah; GitHub Pages: tambah `_config.yml` `exclude:` — `.gitignore` tidak menolong untuk berkas terlacak). Tidak ada rahasia di `.opencode/`, tetapi isinya catatan internal.
4. Isi canonical/OG/JSON-LD `url` dengan domain final — **SELESAI 2026-10-12**: diisi `https://pempekyuktiti.com/` (ISSUE-003 FIXED). Sisa: beli domain + arahkan DNS (`DEPLOY.md`).
5. Verifikasi: `curl -sI https://pempekyuktiti.com/css/style.css` → cari `content-encoding: br|gzip`; `/robots.txt` & `/sitemap.xml` ter-serve; Rich Results + FB Sharing Debugger untuk SEO/OG; muat sekali di HP.

## Secrets in deployment

- Tidak ada. Situs statis tanpa kredensial. Nomor WhatsApp bersifat publik (di kode). (CONFIRMED)

## Release snapshots

- `snapshots/snapshot-2026-10-08-v1-implementation.md` (milestone v1+QA). Belum ada snapshot rilis deploy (belum deploy).
