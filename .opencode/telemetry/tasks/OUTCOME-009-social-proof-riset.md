# Task Outcome Record — TASK-009

Per-project telemetry for SIGNIFICANT tasks only. Location:
`.opencode/telemetry/tasks/`. Never contains secrets (ENV_VAR_NAME only).

## Task

Social proof dari riset (user mendelegasikan riset, bukan data internal):
(1) rating Google warung via referensi Google Maps; (2) 3 item best
seller via riset popularitas menu. Terapkan sebagai: tautan rating hero
"★ 4,9/5 · 139 ulasan Google" → pencarian Google Maps live +
`aggregateRating` JSON-LD + badge "Terlaris" pada 3 kartu menu.
Prinsip: riset boleh, fabrikasi tidak — semua basis didokumentasikan,
angka mudah diubah, tautan selalu live.

## Category

Trust/conversion (social proof), content jujur, SEO terstruktur.

## Agents Used

- (tidak ada subagent — perubahan kecil deterministik dikerjakan +
  diverifikasi langsung orkestrator; andal setelah abort TASK-008)
- websearch + webfetch — riset rating & popularitas (lihat Evidence).
- orchestrator — implementasi 5 edit HTML + 2 blok CSS, verifikasi CDP
  penuh (light/dark/320–1440/JSON/kontras), sinkronisasi brain +
  telemetry. (SUKSES)

## Skills Used

orchestration, telemetry; web research; contrast/a11y verification.

## Files Changed

- `index.html` (953→973) — badge "Terlaris" (sikoan, kapal-selam;
  paket-otentik via wadah `.card-menu__badges` berisi Terlaris + Isi 4
  pempek); `.hero__rating` + komentar verifikasi-wajib; `aggregateRating`
  JSON-LD (4.9/139). `js/*` tidak disentuh; kontrak cart utuh.
- `css/style.css` (2090→2119) — `.card-menu__badges` + `.hero__rating*`
  (semua token, tanpa warna/dependensi baru).
- Brain: CHANGE_HISTORY, CURRENT_STATE, ARCHITECTURE, INDEX,
  KNOWN_ISSUES (ISSUE-005 OPEN).
- Telemetry: file ini.

## Validation

- Struktur: 3× Terlaris + 1× Isi 4 pempek; JSON-LD parse valid;
  cart (24 price / 46 action) utuh; brace CSS 365/365.
- Render CDP: 4 badge tampil; wrapper berdampingan (≥390) & membungkus
  rapi (320, gap 4px, tanpa overlap/overflow); rating tampil + href
  Maps + target/rel benar; hero 716→722px (+6, proporsional).
- Kontras: light badge 4,99 / rating 6,71; dark badge 5,94 / rating 7,8
  — semua ≥ 4,5:1. overflowX 0 (320/390/768/1440). console/network 0.
- Regresi: 23 harga + 23 deskripsi + total cart Rp 7.000 (harness Paket B).

## Evidence (riset — ringkas, sumber di bawah)

- Rating: direktori mirror listing Google Maps `pempek-yuk-titi-uii-
  jakal.grubbio.com` (diakses 2026-10-10): "4.9 out of 5.0", "139
  reviews", alamat Kaliurang KM 14 cocok, jam cocok; ulasan menyebut
  pempek kenyal-krispi & cuko asam-tidak-pedes. Rincian bintang sumber
  (137/2/2/0/1 = 142) inkonsisten vs total 139 → sumber agak ceroboh
  (dicatat di ISSUE-005). Google Maps langsung tak dapat diverifikasi
  (butuh JS).
- Best seller umum: Kapal Selam = "paling populer/digemari/raja pempek"
  (masakanku, foodspot, rasanusantara, detik); Lenjer = "original/paling
  dikenal/ibu pempek"; Adaan = "favorit semua orang"; paket = "Paket 3"
  sebagai Signature Picks + Popular on the Menu di direktori mirror
  warung ini. Pilihan akhir: Kapal Selam Besar + Paket Otentik + Sikoan
  (memuat Lenjer+Adean; ulasan menyebut pembelian rutin "pempek telur
  kecil"; harga terendah Rp 3.500).

## Tests

- Harness CDP sementara /tmp/opencode/: social.js (badge/rating/
  kontras/overflow), wrap.js (badge 320px), theme-probe.js,
  dark-cmd.json. Screenshot tidak diambil (geometri/computed cukup).
- Metodologi: profil CDP menyimpan `data-theme=dark` (localStorage)
  dari sesi sebelumnya → pengukuran "light" awal keliru gelap;
  diperbaiki dengan `Storage.clearDataForOrigin` + emulasi terang
  eksplisit (terdokumentasi agar tak terulang).

## Failures

- Tidak ada kegagalan produk. Satu temuan metodologi (di atas), sudah
  dikoreksi dalam sesi yang sama.

## Retries

- Tidak ada (sekali jalan, verifikasi hijau).

## Security Findings

- Tidak ada CRITICAL/HIGH/MEDIUM. Tautan eksternal memakai pola aman
  proyek (`target=_blank rel="noopener noreferrer"` + sr-only).
  0 sekret, 0 dependensi, 0 JS baru.

## Final Result

DONE — terverifikasi render penuh. Sisa: pemilik memverifikasi angka
rating & pilihan badge (ISSUE-005 OPEN) + sign-off visual; angka rating
dipantau berkala vs Maps.

## Lessons

- Angka pihak ketiga (rating/ulasan) boleh ditampilkan HANYA dengan
  tautan live + komentar kedaluwarsa + issue pelacakan — jangan pernah
  tampilkan angka agregator seolah data sendiri tanpa jejak sumber.
- Badge klaim ("Terlaris") berbasis riset umum harus transparan basisnya
  di laporan + brain; pemilik sebagai otoritas akhir dapat memveto.
- Selalu curigai konsistensi internal data agregator (137+2+2+0+1 ≠ 139)
  sebelum mengutipnya.

## Rules

- Create for significant tasks only; trivial edits get an event row.
- Do not store passwords, keys, tokens, or credentials.
- Quality check before writing: no-secret scan → bersih.
