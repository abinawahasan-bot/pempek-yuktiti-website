# STACK

> Project Brain file · Bases knowledge on ACTUAL project files — do not guess. Confidence: CONFIRMED (seen in files), INFERRED, UNKNOWN.
> NEVER store credentials. Secrets belong in SECURITY.md as ENV_VAR_NAME placeholders.

## Frontend

- HTML5 statis (semantic), CSS3, JavaScript vanilla — tanpa framework, tanpa library pihak ketiga. (CONFIRMED — keputusan produk #1; terimplementasi 2026-10-08)
- Font: Poppins (600/700) + Inter (400/500) dari Google Fonts CDN — satu-satunya CDN. (CONFIRMED — index.html baris 33)
- Konten: bahasa Indonesia. (CONFIRMED)

## Backend

- Tidak ada. Website murni statis. (CONFIRMED)

## Mobile

- Tidak ada aplikasi mobile; responsive web mobile-first. (CONFIRMED)

## Database

- Tidak ada. (CONFIRMED)

## AI / ML

- UNKNOWN (tidak ada kebutuhan yang dinyatakan)

## Infrastructure

- Target hosting: Netlify / GitHub Pages (gratis) atau shared hosting cPanel. (CONFIRMED)
- Belum dipilih — lihat DEPLOYMENT.md. (UNKNOWN mana yang final)

## CI / CD

- UNKNOWN / belum ada.

## Build / tooling

- Tanpa build step, tanpa package manager, tanpa bundler. File HTML/CSS/JS dijalankan langsung. (CONFIRMED)
- Linting/formatting: UNKNOWN (belum ditetapkan).

## Verification sources

- Terverifikasi dari file repo 2026-10-08: `index.html`, `css/style.css`, `js/main.js`, `README.md`, `docs/DESIGN_BRIEF.md` — baris di atas sesuai kode, bukan hanya keputusan user. (CONFIRMED)
- Setelah perubahan struktur/dependensi, sinkronkan kembali dengan file aktual.

## Change log

| Date | Change | Evidence |
|------|--------|----------|
| 2026-10-08 | Inisialisasi stack: HTML/CSS/JS statis, no framework, no build | Keputusan user (task brain-init) |
| 2026-10-08 | Verifikasi implementasi: struktur + Google Fonts CDN (Poppins/Inter) sesuai rencana | index.html, css/style.css, js/main.js (wc -l, grep) |
