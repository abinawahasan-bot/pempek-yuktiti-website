# PROJECT

> Project Brain file · Confidence markers: CONFIRMED = verified from repo/user, INFERRED = reasonably inferred, UNKNOWN = not established.
> NEVER store passwords, API keys, tokens, or private credentials. Use placeholders such as ENV_VAR_NAME.

## Identity

- **Project name:** Pempek Yuk Titi — Website Profil (CONFIRMED)
- **Purpose:** Website profil statis satu halaman (landing page) untuk UMKM restoran pempek "Pempek Yuk Titi - UII Jakal". Menampilkan profil bisnis, menu + harga, lokasi (embed Google Maps), jam buka, tombol WhatsApp, dan link Instagram. Target: SEO lokal dan dapat di-hosting gratis (Netlify / GitHub Pages) atau shared hosting cPanel. (CONFIRMED — dari user)
- **Target users:** Calon pelanggan yang mencari pempek di Sleman / area UII–Jalan Kaliurang (INFERRED — dari tujuan SEO lokal)
- **Repository path:** /home/corvusjet/pempek-yuktiti-website (CONFIRMED)
- **Last updated:** 2026-10-08

## Primary objectives

1. Profil bisnis + menu + lokasi + tombol WhatsApp + link Instagram dalam satu halaman. (CONFIRMED)
2. SEO lokal (muncul di pencarian lokal untuk pempek di Sleman). (CONFIRMED)
3. Bisa di-hosting gratis (Netlify / GitHub Pages) atau shared hosting cPanel. (CONFIRMED)

## Current status

- Implementasi v1 selesai 2026-10-08 (index.html + css/ + js/ + README); QA PASS_WITH_NOTES; **belum di-deploy** dan belum ada git repo. (CONFIRMED — lihat CURRENT_STATE.md)

## Major features

- Hero, Cerita singkat, Menu (harga + disclaimer), Lokasi (embed GMaps) + jam buka, Kontak (tombol WA, link IG), galeri placeholder. (CONFIRMED — keputusan produk #2, sudah di-approve user)

## Project constraints

- Platform / compatibility constraints: website statis, harus jalan tanpa server-side; mobile-first. (CONFIRMED)
- Package / dependency restrictions: tanpa framework, tanpa build step, tanpa npm dependency. (CONFIRMED)
- Infrastructure limitations: tanpa database. (CONFIRMED)
- Business rules: harga wajib disertai disclaimer "harga dapat berubah, konfirmasi via WhatsApp". (CONFIRMED — keputusan produk #3a)

## Supported platforms

- Web (desktop + mobile browser) — CONFIRMED

## Business reference (Pempek Yuk Titi - UII Jakal)

Semua CONFIRMED dari user + Google Maps kecuali ditandai lain.

- **Alamat:** Kaliurang St No.Km 14, Tj. Manding, Umbulmartani, Ngemplak, Sleman Regency, DIY 55584, Indonesia
- **Jam buka:** 15.00–22.30 · hari = INFERRED "setiap hari" (user hanya memberi jam, hari belum dikonfirmasi)
- **Telp/WA:** +628814105501 → https://wa.me/628814105501
- **Instagram:** https://www.instagram.com/pempek_yuktiti/
- **Deskripsi GMaps:** eatery lokal di Sleman, spesialis pempek Palembang; signature cuko tebal manis-pedas; Pempek Adaan juara; menu kreatif Lenggang & Tekwan; casual & welcoming.
- **Rating/review:** 139 ulasan — INFERRED masih berlaku.
- Menu & harga: lihat REQUIREMENTS.md.

## References

- Full stack: STACK.md · Architecture: ARCHITECTURE.md · Requirements: REQUIREMENTS.md
- Index: INDEX.md
