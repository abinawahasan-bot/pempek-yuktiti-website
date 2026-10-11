# KNOWN_ISSUES

> Project Brain file · Known bugs and technical problems. Never mark FIXED without evidence. Confidence markers apply.

## Issue template

### ID: ISSUE-NNN
- **Title:**
- **Severity:** CRITICAL / HIGH / MEDIUM / LOW
- **Status:** OPEN / INVESTIGATING / FIXED / VERIFIED / WONTFIX
- **Description:** (CONFIRMED)
- **Reproduction:** (steps — CONFIRMED)
- **Root cause:** (reason — CONFIRMED/INFERRED)
- **Fix:** (what fixed it — CONFIRMED; must reference the change)
- **Regression test:** (test that would catch a reintroduction — CONFIRMED)

## Open issues

### ID: ISSUE-001
- **Title:** Harga menu berasal dari aggregator pihak ketiga — risiko basi
- **Severity:** MEDIUM
- **Status:** OPEN
- **Description:** Seluruh harga di REQUIREMENTS.md diambil dari menukuliner.net (primer), olshopin, dan grubbio — bukan dari pemilik usaha langsung. Ada minor selisih antar sumber; data 2023 yang sudah basi sempat beredar dan sudah ditolak. (CONFIRMED)
- **Reproduction:** Bandingkan harga di situs dengan struk/daftar harga asli di tempat.
- **Root cause:** Tidak ada kanal resmi berisi daftar harga terverifikasi. (CONFIRMED)
- **Fix:** Mitigasi sudah dipasang 2026-10-08: disclaimer-box "Harga dapat berubah, konfirmasi via WhatsApp" tampil di section menu (FR-2) — CONFIRMED index.html baris 256; rentang SEO dikoreksi ke Rp 3.000–15.000 (meta description, JSON-LD priceRange, hero "Mulai Rp 3.000"). Verifikasi langsung ke pemilik usaha masih BELUM dilakukan → issue tetap OPEN.
- **Regression test:** Pengecekan konten manual saat update menu; pastikan disclaimer tidak dihapus.

### ID: ISSUE-002
- **Title:** Foto galeri tidak bisa diambil dari Instagram
- **Severity:** LOW
- **Status:** OPEN (regresi 2026-10-10: kembali 0 foto asli — sebelumnya PARTIALLY_RESOLVED)
- **Description:** Foto dari akun IG pemilik usaha tidak dapat discrape; galeri section hanya berisi placeholder sampai aset diberikan. (CONFIRMED)
- **Reproduction:** —
- **Root cause:** Instagram membatasi akses/scraper; juga masalah hak cipta. (CONFIRMED)
- **Fix:** Mitigasi bertahap: (1) 2026-10-08 awal — 6 slot `<figure>` placeholder SVG tanpa hotlink; (2) upgrade visual 2026-10-08 — 5 foto stok Pexels dipasang di galeri + 1 foto hero (`assets/img/`), slot #6 tetap placeholder; (3) 2026-10-09 — 2 dokumentasi asli warung dari pemilik masuk (`yuk-titi.jpg` 600×900, `yuk-titi-1.jpg` 857×900; placeholder CSS dihapus; PNG dioptimasi ke JPEG lokal) — tidak hotlink; (4) **2026-10-10 — kedua foto asli DIHAPUS permanen atas permintaan pemilik** (konten dinilai tak cocok untuk galeri + crop portrait parah di bingkai 4:3: #5 hanya tampil ~50%). Galeri kini 4 stok; menunggu foto asli pengganti (makanan/warung, landscape) dari pemilik. (CONFIRMED — index.html #galeri, assets/img/, CHANGE_HISTORY)
- **Regression test:** Saat foto asli masuk: pastikan setiap slot terisi + punya alt text; hanya 1 slot placeholder yang tersisa (yang bertuliskan "Foto asli warung"). **Status 2026-10-09: slot placeholder = 0**, alt text semua 6 gambar ada — persyaratan lama terpenuhi; sisa verifikasi baru: kualitas/crop foto asli di kotak 4:3 secara visual oleh user, dan tambahan foto asli lain bila dibutuhkan.
- **Catatan:** Foto stok berlisensi Pexels (gratis komersial, tanpa atribusi). Foto asli warung berikutnya dapat ditambahkan dengan pola `<figure>` yang sama; versi PNG resolusi penuh tetap di folder milik pemilik.

### ID: ISSUE-003
- **Title:** Metadata SEO menunggu domain resmi (canonical, og:url, og:image, JSON-LD url+hasMenu)
- **Severity:** LOW
- **Status:** OPEN
- **Description:** `canonical`, `og:url`, `og:image` final, dan properti JSON-LD `url` + `hasMenu` masih placeholder "https://GANTI-DOMAIN-ANDA/" beserta komentar TODO — sengaja ditunda sampai domain + aset OG tersedia. (CONFIRMED — index.html baris 12–24, 38)
- **Reproduction:** Cari komentar "TODO" di `index.html`.
- **Root cause:** Domain/hosting belum dipilih (DECISIONS #4 UNKNOWN). (CONFIRMED)
- **Fix:** Setelah domain resmi hidup: isi URL absolut, hapus komentar TODO, jangan hotlink gambar OG.
- **Regression test:** Validasi Rich Results / Facebook Sharing Debugger setelah peluncuran.
- **Catatan:** Sisa QA-02 / RV-11 dari review. Keputusan: koreksi rentang SEO (Rp 3.500–15.000 → Rp 3.000–15.000) sudah selesai di kode sehingga TIDAK dibuat issue terpisah untuk itu; risiko data harga basi tetap di ISSUE-001.

### ID: ISSUE-004
- **Title:** favicon.ico 404 — noise error konsol (pre-existing)
- **Severity:** INFO
- **Status:** FIXED (2026-10-09 — P0 konversi)
- **Description:** Browser meminta `/favicon.ico` yang tidak ada → 1 baris noise error di konsol DevTools (tidak berpengaruh visual, sudah ada sejak sebelum dark mode). (CONFIRMED — log QA 02-behavior, 09-edge-network; hadir di kedua tema)
- **Reproduction:** Buka DevTools → Console → muat ulang situs.
- **Root cause:** Tidak ada file favicon di repo dan tidak ada `<link rel="icon">`. (CONFIRMED)
- **Fix:** ditambahkan `favicon.svg` di root + `<link rel="icon" type="image/svg+xml" href="favicon.svg">` di `<head>` `index.html`. (CONFIRMED — QA P0: favicon 200, baris 404 favicon.ico hilang dari console)
- **Regression test:** Console bersih tanpa error 404 favicon setelah fix. (terbukti QA P0 & QA cart — console 0 error)

### ID: ISSUE-005
- **Title:** Rating Google, badge "Terlaris" & kutipan testimoni berbasis riset agregator — verifikasi pemilik
- **Severity:** LOW
- **Status:** OPEN (rating + badge VERIFIED pemilik 2026-10-10; 3 kutipan testimoni menunggu verifikasi)
- **Description:** Rating hero "4,9/5 · 139 ulasan Google" (+ `aggregateRating` JSON-LD) berasal dari direktori mirror listing Google Maps (grubbio.com, diakses 2026-10-10 via websearch) — BUKAN dari Google Maps langsung (halaman Maps butuh JS, tak dapat diverifikasi langsung). Rincian bintang sumber (137/2/2/0/1 = 142) tidak konsisten dengan total "139 ulasan" → data sumber agak ceroboh. Badge "Terlaris" pada Sikoan / Kapal Selam Besar / Paket Otentik berbasis riset popularitas umum (Kapal Selam = varian paling populer di semua sumber; "Paket 3" = Signature/Popular di direktori mirror; Sikoan memuat Lenjer+Adean + ada ulasan pembelian rutin) — BUKAN data penjualan internal warung. (CONFIRMED — riset 2026-10-10, CHANGE_HISTORY). Tambahan 2026-10-10: 3 kutipan testimoni (Lutfi Nuraini, Shanks D Ace, Yuli Puji Rahayu + tanggal; ejaan dirapikan, potongan konteks pribadi dibuang) dari halaman ulasan mirror yang sama — WAJIB verifikasi pemilik.
- **Reproduction:** Bandingkan angka rating/badge dengan listing Google Maps asli & data penjualan warung.
- **Root cause:** Tidak ada akses langsung ke Google Maps API/listing + tidak ada data penjualan internal. (CONFIRMED)
- **Fix:** Mitigasi sudah dipasang: (1) tautan rating & tombol testimoni mengarah ke pencarian Google Maps live (angka/kutipan tampil boleh basi, tautan selalu benar); (2) komentar HTML di kode menandai angka + kutipan sebagai verifikasi-wajib; (3) badge/kutipan mudah diganti (satu `<span>`/`<li>` per item). Rating + badge terverifikasi pemilik 2026-10-10; kutipan testimoni BELUM → issue tetap OPEN.
- **Regression test:** Cek berkala angka rating vs Maps; pastikan tautan Maps hidup.

### ID: ISSUE-006
- **Title:** Risiko publikasi catatan internal `.opencode/` saat deploy
- **Severity:** LOW
- **Status:** OPEN (deploy-time gate)
- **Description:** Folder `.opencode/` (Project Brain + telemetry, 48 berkas terlacak git) **sengaja** ada di version control, tetapi tidak boleh tersaji publik. Pada **GitHub Pages**, seluruh isi branch disajikan → `.opencode/` akan dapat diakses tanpa pengecualian. (CONFIRMED — `.gitignore` menyatakan .opencode sengaja dilacak; `git ls-files .opencode` = 48)
- **Root cause:** Deploy berbagi tree yang sama dengan memori proyek; GH Pages tidak punya mekanisme exclude selain Jekyll `_config.yml`. (CONFIRMED)
- **Fix:** Netlify Drop/cPanel → unggah hanya berkas situs (jangan `.opencode/`); GitHub Pages → tambahkan `_config.yml` `exclude: [.opencode]`. **Jangan** andalkan `.gitignore` (berkas terlacak tetap terbit). Panduan: `DEPLOY.md` §"Jangan publikasikan catatan internal". Tidak ada rahasia di `.opencode/` (secret scan bersih) → severity LOW.
- **Regression test:** Setelah deploy, `curl -sI https://DOMAIN/.opencode/brain/INDEX.md` harus **404**; pastikan tidak ada berkas `.opencode/**` yang dapat diakses.

## Fixed / Verified

### ID: RV-01..07 (temuan code review — diperbaiki 2026-10-08)
- **Status:** FIXED
- **Temuan & perbaikan:** scroll-padding-top untuk header sticky; class `.js` dipindah ke main.js; brand menutup panel nav; dead CSS dihapus; padding FAB ≥1024px; token `--color-header-bg` dibuat; figcaption ganda dihapus. (CONFIRMED via laporan review)
- **Verifikasi kode 2026-10-08:** `scroll-padding-top` ada (style.css baris 68) · `classList.add("js")` di js/main.js baris 79 · `--color-header-bg` di style.css baris 54 · jumlah `figcaption` = 0. (CONFIRMED)
- **Catatan:** QA menyatakan PASS_WITH_NOTES; sisa catatan (canonical/OG) pindah ke ISSUE-003.

## WONTFIX

- (belum ada)

## Rules

- Evidence over memory: verify against the repo before trusting any entry.
- Issue statuses are strictly OPEN / INVESTIGATING / FIXED / VERIFIED / WONTFIX.
- Recurring root causes should also be captured in FAILURES.md.
