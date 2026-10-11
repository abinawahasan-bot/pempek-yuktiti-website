/* =============================================================
   Pempek Yuk Titi - UII Jakal — js/lightbox.js
   Progressive enhancement: pratinjau foto besar (lightbox) untuk
   galeri. Halaman 100% tetap utuh tanpa file ini / tanpa JS.

   Prinsip (wajib):
   1. GUARD DI PALING ATAS. Hanya jalan bila <dialog> + showModal()
      tersedia. Browser lawas / JS mati → tidak ada satupun tombol
      yang dibuat, galeri tetap 6 <img> statis (tanpa tombol mati).
   2. Tombol zoom (.gallery-item__zoom) dibuat JS dengan memindahkan
      <img> yang sudah ada ke dalamnya — <img> tetap utuh (alt, width,
      height, loading="lazy", decoding="async") dan figur TIDAK pernah
      diberi <figcaption> (duplikat teks untuk pembaca layar).
   3. TIDAK ada preloading: <img> lightbox sengaja dibiarkan tanpa src
      di HTML; src baru diisi saat sebuah foto dibuka. Browser memakai
      cache thumbnail yang sama, jadi tidak ada unduhan ganda.
   4. A11y: showModal() memberi focus trap + Escape + pengembalian
      fokus ke pemicu secara gratis. Caption sengaja aria-hidden
      (sama dengan alt <img>), yang diumumkan pembaca layar hanyalah
      <img> (alt) + counter (aria-live) saat foto berpindah.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 0 · Guard: tanpa <dialog> tak ada tombol sama sekali ---------- */
  var dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }

  var imgEl = dialog.querySelector("[data-lightbox-img]");
  var counterEl = dialog.querySelector("[data-lightbox-counter]");
  var captionEl = dialog.querySelector("[data-lightbox-caption]");
  var closeBtn = dialog.querySelector("[data-lightbox-close]");
  var prevBtn = dialog.querySelector("[data-lightbox-prev]");
  var nextBtn = dialog.querySelector("[data-lightbox-next]");
  if (!imgEl || !counterEl) {
    return;
  }

  var figures = document.querySelectorAll(".gallery-item");
  if (!figures.length) {
    return;
  }

  /* ---------- 1 · Kumpulkan foto + pasang pemicu ---------- */
  var photos = [];

  function buildTrigger(figure, source, index) {
    var label = source.getAttribute("alt") || "Foto galeri";

    var button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-item__zoom";
    button.setAttribute("aria-label", "Perbesar foto: " + label);

    /* <button> masuk dulu sebagai anak terakhir figure, baru <img> yang
       sudah ada dipindahkan ke dalamnya. appendChild MEMINDAHKAN node
       (atribut ikut terbawa) — tidak ada img yang disalin/di-duplikasi,
       jadi loading="lazy" tetap berlaku persis seperti sebelumnya. */
    figure.appendChild(button);
    button.appendChild(source);

    button.addEventListener("click", function () {
      open(index);
    });
    return button;
  }

  for (var i = 0; i < figures.length; i++) {
    var source = figures[i].querySelector(".gallery-item__img");
    /* Lewati bila: tak ada img, tak ada src, ATAU img sudah terbungkus
       tombol (mis. skrip dievaluasi ulang) — mencegah tombol yatim. */
    if (!source || !source.getAttribute("src") ||
        source.closest(".gallery-item__zoom")) {
      continue;
    }
    photos.push({
      src: source.getAttribute("src"),
      alt: source.getAttribute("alt") || ""
    });
    buildTrigger(figures[i], source, photos.length - 1);
  }

  if (!photos.length) {
    return;
  }

  /* ---------- 2 · Tampil / pindah foto ---------- */
  var total = photos.length;
  var current = 0;

  /* Sinkronkan counter awal dengan jumlah foto nyata (markup memakai
     "1 / 6" sebagai fallback bila galeri berubah). Dialog tertutup
     (display:none) sehingga pembaca layar tak mengumumkannya. */
  counterEl.textContent = "1 / " + total;

  function show(index) {
    /* modulo negatif agar idx -1 melingkar ke foto terakhir */
    current = ((index % total) + total) % total;
    var photo = photos[current];
    imgEl.src = photo.src;
    imgEl.alt = photo.alt;
    if (captionEl) {
      captionEl.textContent = photo.alt;
    }
    counterEl.textContent = (current + 1) + " / " + total;
  }

  function open(index) {
    show(index);
    /* Guard: showModal() melempar InvalidStateError bila dialog sudah
       terbuka (saat ini tak terjangkau ganda, tapi aman untuk masa depan). */
    if (!dialog.open) {
      dialog.showModal();
    }
    /* Kunci gulir halaman di belakang dialog (tidak otomatis di semua
       browser). Lebar scrollbar dikompensasi supaya layout tidak bergeser
       saat gulir dikunci. Dilepas lagi di event `close`. */
    var gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) {
      document.documentElement.style.setProperty("--lightbox-scrollbar", gap + "px");
    }
    document.documentElement.classList.add("lightbox-open");
  }

  /* ---------- 3 · Kontrol ---------- */
  if (prevBtn) {
    prevBtn.addEventListener("click", function () { show(current - 1); });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () { show(current + 1); });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () { dialog.close(); });
  }

  /* Klik pada area backdrop (target === dialog, bukan anak-anaknya)
     menutup pratinjau. */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  /* Panah kiri/kanan memindah foto (pelengkap tombol prev/next —
     tombol tetap ada untuk navigasi non-keyboard & pembaca layar). */
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
  });

  /* Escape ditangani browser (event `cancel`) → tetap pakai `close`.
     Buka blokir gulir di sini juga (Escape tidak selalu memanggil
     `close` di browser lawas). */
  function releaseScroll() {
    document.documentElement.classList.remove("lightbox-open");
    document.documentElement.style.removeProperty("--lightbox-scrollbar");
  }
  dialog.addEventListener("close", releaseScroll);
  dialog.addEventListener("cancel", releaseScroll);
}());
