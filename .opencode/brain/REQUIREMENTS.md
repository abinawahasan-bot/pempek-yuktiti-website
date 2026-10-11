# REQUIREMENTS

> Project Brain file · Functional AND non-functional requirements and constraints. Confidence: CONFIRMED (from user/spec/code), INFERRED, UNKNOWN.

## Functional Requirements

- FR-1: Satu halaman (landing page) berisi section: Hero, Cerita singkat, Menu, Lokasi, Kontak, Galeri placeholder. (CONFIRMED — keputusan produk #2)
- FR-2: Menampilkan menu lengkap beserta harga (data 2026) dan disclaimer "harga dapat berubah, konfirmasi via WhatsApp". (CONFIRMED — keputusan produk #3a)
- FR-3: Embed Google Maps untuk lokasi + menampilkan alamat & jam buka. (CONFIRMED — keputusan produk #2)
- FR-4: Tombol WhatsApp yang membuka chat ke +628814105501 (https://wa.me/628814105501). (CONFIRMED)
- FR-5: Link ke Instagram https://www.instagram.com/pempek_yuktiti/. (CONFIRMED)
- FR-6: Galeri foto (saat ini placeholder; foto asli dari IG belum tersedia — lihat KNOWN_ISSUES). (CONFIRMED)
- FR-7: SEO lokal: meta title/description, heading terstruktur, structured data sederhana (opsional), hreflang/bahasa Indonesia. (INFERRED — tujuan "SEO lokal" CONFIRMED, implementasi spesifik belum ditetapkan)

### Menu & harga (CONFIRMED — menukuliner.net update 2026 sebagai sumber primer; disilang dengan olshopin & grubbio)

Sikoan @pcs (Lenjer, Telor, Kulit, Adaan, Sosis, Keju, Belah, Krispi): Rp 3.500
Kapal Selam Besar: Rp 13.500 · Lenggang: Rp 12.000 · Rujak Mie: Rp 13.500 · Tekwan: Rp 13.000 · Model Tahu: Rp 13.000 · Paket Otentik (Lenjer+Telor+Kulit+Adaan): Rp 12.000

Add-on: Mie Kuning 3.000 · Bihun 3.000 · Ekstra Cuko 50ml 3.000 · Cuko 250ml 15.000 · Ebi 3.000 · Sambel ekstra pedas 3.000

Minuman: Teh Manis 4.000 · Teh Tawar 4.000 · Fresh Orange 4.000 · Lemon Tea 5.000 · Fresh Lime 5.500 · Lychee Tea 6.500 · Tebs Teh Soda 4.500 · Fruit Tea 4.500 · Air Mineral 3.500 · Kopi Lampung Tubruk 15.000

> Data harga 2023 (sikoan Rp 5.500 dll) DITOLAK sebagai basi — jangan masukkan. (CONFIRMED)
> Rentang silang-grubbio Rp 1–25.000; minor selisih antar sumber → pakai menukuliner sebagai primer. (CONFIRMED)

## Non-Functional Requirements

- Performance: halaman statis ringan; tanpa framework/build → beban awal kecil. Target spesifik (LCP dll): UNKNOWN.
- Security: tidak ada input pengguna, tidak ada backend, tidak ada kredensial → risiko rendah; lihat SECURITY.md.
- Accessibility: alt text wajib pada gambar; semantic HTML5. (CONFIRMED — CONVENTIONS)
- Scalability: tidak relevan (situs statis satu halaman). (CONFIRMED)
- Reliability: bergantung pada hosting statis; embed GMaps & link keluar adalah titik gagal eksternal. (INFERRED)
- Maintainability: konten dalam satu berkas mudah diedit; tanpa toolchain. (INFERRED)

## Constraints

- Supported platforms: Web browser desktop & mobile. (CONFIRMED)
- Package restrictions: tanpa framework, tanpa database, tanpa build step. (CONFIRMED)
- Compatibility requirements: UNKNOWN (browser target minimum belum ditetapkan).
- Infrastructure limits: harus bisa di-hosting gratis (Netlify/GitHub Pages) ATAU shared hosting cPanel. (CONFIRMED)
- Legal / regulatory: UNKNOWN.

## Origin

- FR-1..FR-6: keputusan produk yang sudah di-approve user (CONFIRMED).
- Data bisnis & menu: user + Google Maps + menukuliner.net/olshopin/grubbio (CONFIRMED, sumber disebut).
- Jam buka hari = INFERRED "setiap hari" (user hanya memberi jam).

## Change rules

- Update when requirements change, and cross-ref DECISIONS.md and CURRENT_STATE.md when decisions affect requirements.
