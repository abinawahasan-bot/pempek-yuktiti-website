/* =============================================================
   Pempek Yuk Titi - UII Jakal — js/header.js
   Progressive enhancement: header meramping saat halaman digulir
   (khusus ponsel) agar area baca lega. Tanpa file ini / tanpa JS
   class tak pernah ada → header selalu penuh (aman).

   Prinsip (wajib):
   1. Hanya menambah/melepas SATU class di <html> ("header-compact").
      Semua visual diatur CSS via token --nav-h, sehingga sticky
      .menu-nav + scroll-padding anchor mengikuti OTOMATIS.
   2. Listener passive + rAF (satu hitung per frame, tak pernah
      preventDefault). Histeresis ON/OFF agar tak berkedip di batas.
   3. Sinkronkan state awal (reload di tengah halaman harus langsung
      ramping bila sudah jauh dari atas).
   ============================================================= */
(function () {
  "use strict";

  if (!window.requestAnimationFrame) {
    return;
  }

  var doc = document.documentElement;
  var ON = 120;  /* tambah class bila gulir lewat sini (px) */
  var OFF = 40;  /* lepas class bila kembali di atas sini (histeresis) */
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;
    if (y > ON) {
      doc.classList.add("header-compact");
    } else if (y < OFF) {
      doc.classList.remove("header-compact");
    }
  }

  function request() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", request, { passive: true });
  update();

  /* ---------- 2 · Tinggi header terukur → --header-h (ganti offset magic) ----------
     ResizeObserver mengukur .site-header setiap kali tingginya berubah
     (wrap 2 baris di tablet, ramping compact di ponsel, font susulan) dan
     menulisnya ke var --header-h di <html>. CSS memakai
     var(--header-h, var(--nav-h)): tanpa JS / browser lawas → fallback
     token statis (perilaku lama, tetap benar). */
  if (window.ResizeObserver) {
    var header = document.querySelector(".site-header");
    if (header) {
      var ro = new window.ResizeObserver(function () {
        var h = Math.ceil(header.getBoundingClientRect().height);
        if (h > 0) {
          doc.style.setProperty("--header-h", h + "px");
        }
      });
      ro.observe(header);
    }
  }
}());
