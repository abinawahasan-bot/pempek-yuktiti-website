# EVENT — preview lokal di Brave

- **Date:** 2026-10-10 15:18 (+08)
- **Mode:** QUICK (tanpa agent; orkestrator langsung)
- **Request:** "coba live di browser brave saya" — menjalankan situs secara lokal di browser Brave milik user.
- **Action:**
  - HTTP server statis: `python3 -m http.server 8010 --bind 127.0.0.1` di root proyek, dijalankan sebagai transient systemd user unit `yuktiti-preview.service` (agar tidak mati saat sesi tool berakhir; percobaan pertama dengan `nohup &` ikut ter-kill saat timeout).
  - Buka `http://127.0.0.1:8010/` via `brave-origin` (forward ke sesi Brave yang sudah berjalan: "Opening in existing browser session").
- **Validation:** Semua aset HTTP 200/304 di akses log server — index.html, css/style.css, js/{main,animations,theme,cart}.js, favicon.svg, hero-pempek.jpg, 23 foto `assets/img/menu/*.jpg`, 6 foto galeri (`pempek-*`, `yuk-titi*`). Tidak ada 404.
- **Files changed:** tidak ada kode proyek diubah. Hanya file telemetry ini.
- **Server control:** `systemctl --user stop yuktiti-preview.service` (atau `systemctl --user status yuktiti-preview.service`).
- **Status:** DONE (preview lokal). Deploy publik tetap belum dilakukan — menunggu keputusan hosting/domain.
