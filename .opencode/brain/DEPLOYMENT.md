# DEPLOYMENT

> Project Brain file · ACTUAL deployment architecture. NEVER store deployment credentials. Confidence markers apply.
> Status: **belum pernah di-deploy**; hosting final **belum dipilih**. Kit deportime sudah disiapkan (2026-10-11).

## Environments

| Environment | Purpose | URL/domain | Confidence |
|-------------|---------|-----------|------------|
| dev (lokal) | Pratinjau di mesin sendiri (`python3 -m http.server`) | http://127.0.0.1:8011/ | CONFIRMED |
| prod | Situs publik | **UNKNOWN** (hosting/domain belum dipilih — DECISIONS #4, ISSUE-003) | UNKNOWN |

## Target hosting (kandidat)

Sesuai DECISIONS #4, tiga kandidat (pilihan final UNKNOWN): **Netlify** / **GitHub Pages** / **cPanel shared hosting**.

## Build process

- **Tidak ada build step** (DECISIONS #1: "deploy = unggah berkas langsung"). Sumber = artefak.
- Optimasi deportime disiapkan sebagai **berkas config server** (bukan build): `deploy/.htaccess` (Apache/cPanel), `deploy/_headers` (Netlify/Cloudflare Pages). Lihat `deploy/README.md`.

## Containers / runtime

- Tidak ada (statis murni). Tidak ada container, tidak ada runtime server. (CONFIRMED)

## Servers & reverse proxy

- Hosting statis/CDN. TLS via penyedia (Let's Encrypt di cPanel). Belum dikonfigurasi (belum dipilih host). (UNKNOWN)

## CI / CD

- Tidak ada CI/CD. Deploy manual: unggah folder (Netlify Drop / Git push ke GitHub Pages / File Manager cPanel). (CONFIRMED — README §Deploy)

## Kompresi & caching (deportime)

- **Berkas:** `deploy/.htaccess`, `deploy/_headers`; panduan `deploy/README.md`. (CONFIRMED 2026-10-11)
- **Terukur pada kode asli:** 188 KB → **41 KB (gzip −78%)** / **35 KB (brotli −82%)**.
- Netlify/GitHub Pages: kompresi otomatis di CDN; cPanel: `.htaccess` mengaktifkan brotli/gzip + MIME `.woff2`/`.webp` + caching + header keamanan. Caching CSS/JS sengaja `max-age=86400, must-revalidate` (nama berkas **tanpa hash** → hindari `immutable` 1 tahun).
- **Minify + CSS kritis (TD-PERF-03 sisa, TD-PERF-06) TIDAK dipasang**: butuh build step → bertentangan DECISIONS #1; menunggu keputusan user.

## Monitoring & logging

- Tidak ada (situs statis). Analitik/uptime belum dipasang. (UNKNOWN)

## Rollback strategy

- Situs statis: rollback = unggah ulang versi sebelumnya (simpan rilis sebagai snapshot/tag git). Belum ada mekanisme otomatis. (INFERRED)

## Deploy runbook

1. Salin `deploy/<config>` yang relevan ke root situs (`_headers` → root Netlify/CF; `.htaccess` → `public_html/`).
2. Pastikan `index.html` ada di tingkat teratas root yang di-deploy.
3. Kecualikan folder `.opencode/` dari unggahan publik.
4. Isi canonical/OG/JSON-LD `url` dengan domain final (ISSUE-003) sebelum/segera setelah live.
5. Verifikasi: `curl -sI https://DOMAIN/css/style.css` → cari `content-encoding: br|gzip`; muat sekali di HP.

## Secrets in deployment

- Tidak ada. Situs statis tanpa kredensial. Nomor WhatsApp bersifat publik (di kode). (CONFIRMED)

## Release snapshots

- `snapshots/snapshot-2026-10-08-v1-implementation.md` (milestone v1+QA). Belum ada snapshot rilis deploy (belum deploy).
