# EVENT 2026-10-10 — Hapus 2 foto pemilik dari galeri

- **Date:** 2026-10-10 (+08)
- **Request:** user menilai foto galeri no. 5 & 6 ("ilustrasi perempuan") tidak cocok → minta analisa → user: "ya, hapus saja".
- **Analisa (pra-hapus):** 6 foto galeri (4 stok landscape + 2 milik portrait); bingkai 4:3 `cover` memotong foto #5 (~50% tampil) & #6 (~71%) — terukur via dimensi file (model tanpa vision, konten dinilai pemilik).
- **Action:**
  - `index.html` 974→966: 2 `<figure>` dihapus; lead → "Ilustrasi pilihan menu…"; counter fallback "1 / 6" → "1 / 4" (runtime menyesuaikan otomatis).
  - File `assets/img/yuk-titi.jpg` + `yuk-titi-1.jpg` dihapus permanen (atas persetujuan eksplisit).
  - `README.md` §7 disinkronkan. `css/js` tidak disentuh.
- **Validation (CDP):** 4 item/img/zoom, srcs hanya 4 stok, 0 broken, lightbox 1/4→4/4→wrap→tutup, galeri 461px, overflowX 0, 0 URL 4xx, 0 console/network error.
- **Brain:** CHANGE_HISTORY + CURRENT_STATE + ARCHITECTURE + INDEX + KNOWN_ISSUES (ISSUE-002 → OPEN, 0 foto asli).
- **Status:** DONE. Tindak lanjut: foto asli pengganti (makanan/warung, landscape) dari pemilik bila ada.
