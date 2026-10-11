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
- **Consequences:** Tidak boleh ada fitur yang butuh runtime server. Pilihan final antar tiga opsi masih UNKNOWN. (CONFIRMED)
- **Date:** 2026-10-08
- **Confidence:** CONFIRMED

> Belum ada ADR di docs/adr/ — jika dibuat, tautkan di sini, jangan duplikasi.

## Maintenance

- Add entries whenever a decision affects future work (state management, DB choice, auth model, architecture style, deployment).
- Update an existing entry when the decision changes (preserve history).
- See Change History: CHANGE_HISTORY.md
