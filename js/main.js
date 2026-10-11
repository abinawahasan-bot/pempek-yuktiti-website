/* =============================================================
   Pempek Yuk Titi - UII Jakal — js/main.js
   Progressive enhancement MINIMAL. Halaman 100% jalan tanpa JS:
   - Smooth scroll: ditangani CSS (`scroll-behavior: smooth` di dalam
     `@media (prefers-reduced-motion: no-preference)`) sehingga otomatis
     menghormati prefers-reduced-motion dan tetap bekerja tanpa JS.
   - Nav mobile: tanpa JS, daftar link tampil penuh (wrap);
     dengan JS, link bisa dibuka/ditutup lewat tombol hamburger.
   - Class `.js` di <html> ditambahkan DI SINI (bukan inline di HTML)
     dan hanya setelah guard null lolos + semua listener terpasang:
     jika file ini gagal dimuat, nav mobile tetap tampil penuh. [RV-02]
   ============================================================= */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (!nav || !toggle) {
    return;
  }

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  // Buka / tutup menu navigasi mobile.
  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  // Setelah memilih anchor di dalam nav (link menu ATAU brand), tutup
  // panel agar konten tidak tertutup. [RV-03]
  nav.addEventListener("click", function (event) {
    var link = event.target && event.target.closest
      ? event.target.closest("a")
      : null;
    if (link && isOpen()) {
      setOpen(false);
    }
  });

  // Escape menutup panel dan mengembalikan fokus ke tombol.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Klik/ ketuk di luar nav menutup panel yang terbuka.
  document.addEventListener("click", function (event) {
    if (isOpen() && event.target && !nav.contains(event.target)) {
      setOpen(false);
    }
  });

  // Jika jendela melewati breakpoint md (768px), reset ke keadaan tertutup
  // agar keadaan panel tidak "nyangkut" saat rotate / resize.
  var mqDesktop = window.matchMedia("(min-width: 768px)");
  var onViewportChange = function (event) {
    if (event.matches) {
      setOpen(false);
    }
  };
  if (typeof mqDesktop.addEventListener === "function") {
    mqDesktop.addEventListener("change", onViewportChange);
  } else if (typeof mqDesktop.addListener === "function") {
    mqDesktop.addListener(onViewportChange); // fallback browser lama
  }

  // [RV-02] Aktifkan mode JS hanya setelah guard null lolos dan SELURUH
  // listener terpasang — kalau gagal di atas, class tidak pernah ditambahkan
  // dan CSS menampilkan nav penuh (tanpa hamburger yang mati).
  document.documentElement.classList.add("js");
})();
