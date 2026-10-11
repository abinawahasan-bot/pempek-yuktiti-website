/**
 * Tema gelap/terang — progressive enhancement, pola .js / .anim.
 * - Hidrasi data-theme dilakukan skrip inline di <head> (anti-FOUC);
 *   file ini: toggle klik + ARIA + sinkronisasi lintas tab (event storage).
 *   Init TIDAK membaca/menulis localStorage.
 * - Klik: preferensi eksplisit disimpan di localStorage ("dark"/"light"),
 *   berlaku sampai user menekan tombol lagi (eksplisit menang selamanya).
 * - Tanpa pilihan eksplisit: visual ikut sistem via CSS media; listener
 *   matchMedia di sini HANYA menyinkronkan ARIA saat sistem ganti skema
 *   (tanpa menulis storage / data-theme → tanpa lingkaran).
 * - Tidak menyentuh class "js" (milik js/main.js) atau "anim" (milik js/animations.js).
 */
(function () {
  "use strict";

  var STORAGE_KEY = "pyt_theme";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  function systemDark() {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  }

  /** Efektif: data-theme eksplisit menang; selain itu ikut sistem. */
  function effective() {
    var attr = root.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return systemDark() ? "dark" : "light";
  }

  /** Sinkronkan aria-label (aksi) + aria-pressed (state) dengan tema efektif. */
  function syncAria() {
    var dark = effective() === "dark";
    toggle.setAttribute("aria-label", dark ? "Mode terang" : "Mode gelap");
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  /* Pola sama dgn animations.js (dual addEventListener/addListener + try/catch):
     pasang listener "change" pada MediaQueryList; fallback browser lama. */
  function onMediaChange(mq, cb) {
    try {
      if (!mq) return;
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", cb);
      } else if (typeof mq.addListener === "function") {
        mq.addListener(cb); /* fallback browser lama */
      }
    } catch (e) {
      /* diam — ARIA menyusul pada init/klik/storage event berikutnya */
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage penuh/blokir — tema tetap berlaku untuk sesi ini */
    }
    syncAria();
  }

  toggle.addEventListener("click", function () {
    setTheme(effective() === "dark" ? "light" : "dark");
  });

  /* F-LOW-01 — sinkron lintas tab: event "storage" hanya terpicu di TAB
     LAIN (tab pengubah tidak menerimanya sendiri) → tidak perlu cegah-diri.
     Nilai tidak valid / null (dihapus) → lepas data-theme (ikut sistem). */
  window.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY) return;
    try {
      if (event.newValue === "dark" || event.newValue === "light") {
        root.setAttribute("data-theme", event.newValue);
      } else {
        root.removeAttribute("data-theme");
      }
      syncAria();
    } catch (e) {
      /* storage event rusak/aneh → abaikan; atribut tetap pada state terakhir */
    }
  });

  /* LOW-1 — ARIA mengikuti sistem saat skema ganti di tengah sesi (attr null).
     CSS blok (b) sudah meng-update warna live; di sini hanya label/pressed.
     HANYA syncAria(): tidak menulis localStorage, tidak menyentuh data-theme
     (visual & state sudah ditangani CSS/attr) → tanpa lingkaran. */
  try {
    onMediaChange(window.matchMedia("(prefers-color-scheme: dark)"), syncAria);
  } catch (e) {
    /* browser tanpa matchMedia — systemDark() pun sudah ber-guard */
  }

  syncAria();

  /* F-LOW-02 — penanda theme.js HIDUP & inisialisasi dasar SELESAI.
     CSS hanya menampilkan tombol bila class ini ada
     (.js.theme-ok .theme-toggle). Ditempatkan paling akhir: bila ada error
     apa pun di atas, class tidak terpasang → tombol tetap tersembunyi
     (degradasi tanpa tombol, bukan tombol mati).
     classList.add SAJA — tidak menyentuh "js" (milik main.js) /
     "anim" (milik animations.js) dan tidak menimpa class elemen lain. */
  document.documentElement.classList.add("theme-ok");
})();
