# DECISIONS

> Project Brain file · Significant architectural decisions ONLY (not every implementation detail). ADR-style entries.
> Confidence: CONFIRMED (decided/documented), INFERRED, UNKNOWN.

## Decision index

| Date | Decision summary | File/Section | Status |
|------|------------------|--------------|--------|
| 2026-10-08 | #1 Website statis HTML/CSS/JS, no framework | DECISIONS.md#1-static-site | Decided |
| 2026-10-08 | #2 Section satu halaman (Hero/Cerita/Menu/Lokasi/Kontak/Galeri) | DECISIONS.md#2-single-page-sections | Decided |
| 2026-10-08 | #3 Harga 2026 + disclaimer WA (sumber primer menukuliner) | DECISIONS.md#3-pricing-2026 | Decided |
| 2026-10-08 | #4 Hosting statis (Netlify/GitHub Pages/cPanel) | DECISIONS.md#4-hosting | Decided |
| 2026-10-11 | #5 Optimasi deportime tanpa build (config di root; minify/CSS-kritis tidak diadopsi) | DECISIONS.md#5-deploy-time-no-build | Decided |
| 2026-10-12 | #6 Hosting final (Netlify Drop) + domain pempekyuktiti.com | DECISIONS.md#6-hosting-domain | Decided |

## Decision entries

### #1 Website statis HTML/CSS/JS

- **Decision:** Bangun dengan HTML/CSS/JS murni — tanpa framework, tanpa database, tanpa build step.
- **Context:** Website profil satu halaman untuk UMKM restoran; tim kecil/perorangan.
- **Alternatives:** React/Next.js, Vue, Tailwind+build, CMS (WordPress).
- **Reason:** Sifat konten statis + syarat bisa di-hosting gratis/cPanel tanpa toolchain. (CONFIRMED — keputusan produk #1, user approve)
- **Consequences:** Semua konvensi melarang framework & build; deploy = upload file langsung. (CONFIRMED)
- **Date:** 2026-10-08
- **Confidence:** CONFIRMED

### #2 Section satu halaman

- **Decision:** Fitur disusun dalam satu halaman: Hero, Cerita singkat, Menu (harga + disclaimer), Lokasi (embed GMaps) + jam buka, Kontak (tombol WA, link IG), galeri placeholder.
- **Context:** Landing page profil bisnis.
- **Alternatives:** Multi-halaman, SPA dengan routing.
- **Reason:** Kebutuhan profil + SEO lokal terpenuhi satu halaman; murah di-maintain. (CONFIRMED — keputusan produk #2, user approve)
- **Consequences:** ARCHITECTURE.md section "Page sections" harus sesuai urutan ini. (CONFIRMED)
- **Date:** 2026-10-08
- **Confidence:** CONFIRMED

### #3 Harga 2026 + disclaimer WhatsApp

- **Decision:** Tampilkan harga dari data terbaru 2026 (sumber primer menukuliner.net, disilang olshopin/grubbio) dan selalu sertakan disclaimer "harga dapat berubah, konfirmasi via WhatsApp". Data harga 2023 ditolak sebagai basi.
- **Context:** Beberapa aggregator memberi harga berbeda; harga bisa berubah tanpa pemberitahuan.
- **Alternatives:** Hanya tampilkan harga tanpa disclaimer; atau tanpa harga sama sekali.
- **Reason:** User memilih opsi 3a; disclaimer menutup risiko harga basi (ISSUE-001). (CONFIRMED)
- **Consequences:** Menu di REQUIREMENTS.md adalah referensi tunggal; update harga = update REQUIREMENTS.md + kode. (CONFIRMED)
- **Date:** 2026-10-08
- **Confidence:** CONFIRMED

### #4 Target hosting

- **Decision:** Harus bisa di-hosting gratis (Netlify / GitHub Pages) atau shared hosting cPanel.
- **Context:** Biaya UMKM minimal.
- **Alternatives:** VPS berbayar, hosting Node.js.
- **Reason:** Sifat statis + syarat biaya rendah. (CONFIRMED)
- **Consequences:** Tidak boleh ada fitur yang butuh runtime server. **Pilihan final: Netlify Drop** — ditetapkan 2026-10-12 (lihat #6). (CONFIRMED)
- **Date:** 2026-10-08
- **Confidence:** CONFIRMED

### #5 Optimasi deportime tanpa build

- **Decision:** Optimasi saat deploy (kompresi + caching) dilakukan **murni via berkas konfigurasi server di root** (`_headers` untuk Netlify/Cloudflare Pages, `.htaccess` untuk Apache/cPanel). **Minify** HTML/CSS/JS dan **pemisahan CSS kritis** — yang butuh langkah build — **tidak diadopsi**.
- **Context:** TD-PERF-03/06; hosting final belum dipilih; DECISIONS #1 melarang build step; target LCP/berat sudah tercapai lewat aset WebP + font self-host.
- **Alternatives:** Menambah build step (esbuild/terser + critical CSS) — kompleksitas toolchain; atau tanpa optimasi deportime sama sekali.
- **Reason:** User menyetujui rekomendasi orkestrator 2026-10-11 ("eksekusi saja yang anda rekomendasikan"). Kompresi menutup **−78% gzip / −82% brotli** tanpa menambah toolchain/dependensi (188 KB → 41/35 KB). Konsisten dengan #1. (CONFIRMED)
- **Consequences:** Tidak ada toolchain; berkas config di root berlaku otomatis saat drag-and-drop; TD-PERF-03 → RESOLVED, TD-PERF-06 → NOT ADOPTED; dapat ditinjau ulang bila kelak mengadopsi build. Rekomendasi host: **Netlify Drop** (ditetapkan #6, 2026-10-12).
- **Date:** 2026-10-11
- **Confidence:** CONFIRMED

### #6 Hosting final & domain

- **Decision:** Hosting **Netlify Drop** (gratis, HTTPS otomatis, `_headers` di root langsung berlaku) + domain **`pempekyuktiti.com`**.
- **Context:** Menutup DECISIONS #4 (pilihan final antar tiga opsi) + ISSUE-003 (metadata SEO masih placeholder). User menyetujui rekomendasi orkestrator 2026-10-12 ("pakai rekomendasi anda").
- **Alternatives:** Cloudflare Pages, GitHub Pages, cPanel/shared hosting — tetap valid; `.htaccess` (Apache) & `_config.yml` (GitHub Pages) tetap disiapkan untuk opsi tersebut.
- **Reason:** Tercepat tanpa build, brotli/HTTPS otomatis, kit deportime sudah drag-and-drop-ready. (CONFIRMED — user approve)
- **Consequences:** Semua URL absolut memakai `https://pempekyuktiti.com/` (`canonical`, `og:url`, `og:image`+varian, `twitter:image`, JSON-LD `url`/`image`/`hasMenu`); ditambah `robots.txt` + `sitemap.xml` + `assets/og-image.jpg` (1200×630). Domain **belum dibeli** (langkah user) → verifikasi live (Rich Results/FB Debugger, `content-encoding`) menunggu domain aktif.
- **Date:** 2026-10-12
- **Confidence:** CONFIRMED

> Belum ada ADR di docs/adr/ — jika dibuat, tautkan di sini, jangan duplikasi.

## Maintenance

- Add entries whenever a decision affects future work (state management, DB choice, auth model, architecture style, deployment).
- Update an existing entry when the decision changes (preserve history).
- See Change History: CHANGE_HISTORY.md
