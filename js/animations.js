/* =============================================================
   Pempek Yuk Titi - UII Jakal — js/animations.js
   Progressive enhancement animasi 3D. Halaman tetap 100% jalan
   tanpa file ini, tanpa JS, dan dengan prefers-reduced-motion.

   Tugas:
   1. Class `.js` DIMILIKI OLEH main.js saja (guard RV-02: listener nav
      terpasang dulu, class belakangan). File ini TIDAK PERNAH menyentuh
      class `js` — kalau main.js gagal, `.js` tak pernah ada → nav tampil
      penuh dan tak ada hamburger mati; reveal-3d juga tak pernah
      tersembunyi (semua bergantung `html.js.anim`).
   2. Tambah class `.anim` HANYA bila prefers-reduced-motion:
      no-preference. CSS menyembunyikan konten hanya di bawah
      `html.js.anim` → tanpa JS / reduced-motion: semua tampil.
   3. Tilt 3D hero + kartu menu (hanya hover:hover & pointer:fine).
   4. Scroll-reveal 3D via satu IntersectionObserver, unobserve
      setelah reveal, fallback .is-in serentak tanpa IO.

   Semua bagian dibungkus try/catch ringan: satu kegagalan tidak
   mematikan bagian lain, tanpa console spam.
   ============================================================= */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var MOTION_OK = "(prefers-reduced-motion: no-preference)";
  var FINE_POINTER = "(hover: hover) and (pointer: fine)";

  /* Jalankan fn; bila gagal, jalankan fallback (opsional) tanpa log. */
  function safe(fn, fallback) {
    try {
      fn();
    } catch (err) {
      if (fallback) {
        try {
          fallback();
        } catch (err2) {
          /* diam — jangan spam console */
        }
      }
    }
  }

  /* ---------- (1) Class `anim` sesuai preferensi gerak ----------
     Class `js` sengaja TIDAK disentuh di sini (lihat header file). */
  var motionMq = null;

  function applyMotionClass() {
    if (motionMq && motionMq.matches) {
      docEl.classList.add("anim");
    } else {
      docEl.classList.remove("anim");
    }
  }

  safe(function () {
    if (typeof window.matchMedia !== "function") {
      return; /* browser sangat lama: tanpa `anim`, konten tetap tampil */
    }
    motionMq = window.matchMedia(MOTION_OK);
    applyMotionClass();
  });

  /* ---------- Util tilt ---------- */
  function isFinePointer() {
    try {
      return (
        typeof window.matchMedia === "function" &&
        window.matchMedia(FINE_POINTER).matches
      );
    } catch (err) {
      return false;
    }
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  /* Pasang tilt pada `listenEl` (penerima event) yang menyetel var
     --rx / --ry di `varEl` (pemilik transform), maksimal ±maxDeg.
     rAF-throttle supaya pointermove tidak membanjiri style recalc.
     PENTING: pemanggil WAJIB sudah meng-gate lewat isFinePointer()
     sekali di depan (lihat setupHeroTilt / setupMenuTilt) — agar
     matchMedia tidak dievaluasi berkali-kali saat init. */
  function attachTilt(listenEl, varEl, maxDeg, extras) {
    if (!listenEl || !varEl) {
      return;
    }

    var rafId = 0;
    var point = null;
    var canRaf = typeof window.requestAnimationFrame === "function";

    function apply() {
      rafId = 0;
      if (!point) {
        return;
      }
      var rect = varEl.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      var px = clamp((point.x - rect.left) / rect.width, 0, 1);
      var py = clamp((point.y - rect.top) / rect.height, 0, 1);
      /* rx mengikuti sumbu Y secara terbalik (tilt menjauh dari kursor). */
      var rx = (0.5 - py) * 2 * maxDeg;
      var ry = (px - 0.5) * 2 * maxDeg;
      varEl.style.setProperty("--rx", rx.toFixed(2) + "deg");
      varEl.style.setProperty("--ry", ry.toFixed(2) + "deg");
      if (extras && extras.move) {
        extras.move(px, py);
      }
    }

    function schedule() {
      if (rafId) {
        return;
      }
      if (canRaf) {
        rafId = window.requestAnimationFrame(apply);
      } else {
        apply();
      }
    }

    function reset() {
      point = null;
      if (rafId && typeof window.cancelAnimationFrame === "function") {
        window.cancelAnimationFrame(rafId);
      }
      rafId = 0;
      varEl.style.setProperty("--rx", "0deg");
      varEl.style.setProperty("--ry", "0deg");
      if (extras && extras.leave) {
        extras.leave();
      }
    }

    listenEl.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") {
        return; /* sentuh: tanpa sticky-hover, biarkan hover CSS apa adanya */
      }
      point = { x: event.clientX, y: event.clientY };
      schedule();
    });
    listenEl.addEventListener("pointerleave", reset);
    listenEl.addEventListener("pointercancel", reset);
  }

  /* ---------- (3a) Tilt hero: kartu + glare ---------- */
  function setupHeroTilt() {
    if (!isFinePointer()) {
      return;
    }
    var figure = document.querySelector(".hero__media");
    if (!figure) {
      return;
    }
    var img = figure.querySelector("img");
    attachTilt(figure, img, 4, {
      /* Glare mengikuti kursor di atas bidang gambar (bukan caption). */
      move: function (px, py) {
        figure.style.setProperty("--glare-x", (px * 100).toFixed(1) + "%");
        figure.style.setProperty("--glare-y", (py * 100).toFixed(1) + "%");
      },
      leave: function () {
        figure.style.setProperty("--glare-x", "50%");
        figure.style.setProperty("--glare-y", "35%");
      }
    });
  }

  /* ---------- (3b) Tilt kartu menu (desktop saja) ---------- */
  function setupMenuTilt() {
    /* Diangkat ke depan loop: cukup SATU kali matchMedia, bukan 1×/kartu. */
    if (!isFinePointer()) {
      return;
    }
    var cards = document.querySelectorAll(".card-menu");
    for (var i = 0; i < cards.length; i++) {
      attachTilt(cards[i], cards[i], 5, null);
    }
  }

  /* ---------- (4) Scroll-reveal 3D ---------- */
  function revealEl(el) {
    try {
      el.style.willChange = "opacity, transform";
    } catch (err) {
      /* diam */
    }
    el.classList.add("is-in");

    var done = false;
    function clean() {
      if (done) {
        return;
      }
      done = true;
      try {
        el.style.willChange = "";
      } catch (err) {
        /* diam */
      }
    }
    /* transitionend dari Dalam (mis. .btn di .kontak-actions) tidak boleh
       mengakhiri will-change elemen induk → cek target. */
    el.addEventListener("transitionend", function onEnd(event) {
      if (event.target !== el) {
        return;
      }
      el.removeEventListener("transitionend", onEnd);
      clean();
    });
    /* jaring pengaman bila transitionend tidak pernah datang */
    window.setTimeout(clean, 1400);
  }

  function revealAll() {
    var all = document.querySelectorAll(".reveal-3d");
    for (var i = 0; i < all.length; i++) {
      all[i].classList.add("is-in");
    }
  }

  function setupReveal() {
    var els = document.querySelectorAll(".reveal-3d");
    if (!els.length) {
      return;
    }

    /* Stagger per grup (anak dari parent yang sama), 90ms per indeks.
       querySelectorAll mengembalikan urut dokumen → saudara selalu
       berurutan. */
    var prevParent = null;
    var idx = 0;
    for (var i = 0; i < els.length; i++) {
      if (els[i].parentElement !== prevParent) {
        prevParent = els[i].parentElement;
        idx = 0;
      }
      els[i].style.setProperty("--stagger", idx * 90 + "ms");
      idx++;
    }

    /* Tanpa IntersectionObserver: tampilkan semuanya sekarang juga. */
    if (typeof window.IntersectionObserver !== "function") {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            observer.unobserve(entries[j].target);
            revealEl(entries[j].target);
          }
        }
      },
      { threshold: 0.15 }
    );

    for (var k = 0; k < els.length; k++) {
      observer.observe(els[k]);
    }
  }

  /* ---------- (2b) Entrance hero berjenjang ----------
     Pola aman: konten hero VISIBEL secara default; class `hero--play`
     HANYA menjalankan keyframes (fill backwards) — tanpa class (tanpa JS /
     reduce / gagal) tak ada yang tersembunyi. Idempoten. Dipanggil dari
     dismiss() splash, semua early-return setupSplash, + fallback timer. */
  function playHeroEnter() {
    try {
      var hero = document.querySelector(".hero");
      if (hero) {
        hero.classList.add("hero--play");
      }
    } catch (err) {
      /* diam */
    }
  }

  /* ---------- (2c) Intro splash — sekali per sesi, hanya bila `anim` ----------
     Aturan keras:
     - Tanpa class `anim` → splash TIDAK PERNAH tampil (return di awal).
     - Sekali per sesi browser (sessionStorage `pyt_splash`); reload sesi sama
       tidak menampilkan lagi.
     - Selalu dibuang dari DOM: auto-dismiss ≤ 1.6s sejak tampil, skip manual
       (click/keydown), failsafe timer, dan try/catch apa pun → remove segera.
     - Tanpa kunci scroll, tanpa elemen focusable, aria-hidden → fokus tidak
       pernah berpindah. Class `js` tidak disentuh. */
  function removeSplashNode() {
    try {
      var node = document.getElementById("splash");
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    } catch (err) {
      /* diam — splash tidak boleh menghalangi konten, bukan sebaliknya */
    }
  }

  function setupSplash() {
    var splash = document.getElementById("splash");
    if (!splash) {
      playHeroEnter();
      return; /* node tidak ada → tidak ada yang perlu dilakukan */
    }
    /* Guard gerak: tanpa `anim`, biarkan splash tersembunyi (display:none). */
    if (!docEl.classList.contains("anim")) {
      playHeroEnter();
      return;
    }
    /* Guard sesi: gagal membaca/menulis storage (mode privat) → jangan tampil. */
    var stored = null;
    try {
      stored = window.sessionStorage.getItem("pyt_splash");
      window.sessionStorage.setItem("pyt_splash", "1");
    } catch (err) {
      removeSplashNode();
      playHeroEnter();
      return;
    }
    if (stored) {
      playHeroEnter();
      return; /* sudah tampil di sesi ini → splash tetap display:none */
    }

    var removed = false;
    var timers = [];
    function later(fn, ms) {
      timers.push(window.setTimeout(fn, ms));
    }
    function kill() {
      if (removed) {
        return;
      }
      removed = true;
      for (var i = 0; i < timers.length; i++) {
        window.clearTimeout(timers[i]);
      }
      removeSplashNode();
    }
    function dismiss() {
      if (removed) {
        return;
      }
      playHeroEnter(); /* entrance hero mulai saat splash memudar */
      splash.classList.add("splash--done"); /* fade 450ms via CSS */
      later(kill, 460); /* setelah transisi opacity */
      later(kill, 1500); /* jaring pengaman bila transisi tak berjalan */
    }

    /* Tampilkan pada frame berikutnya agar transisi masuk berjalan mulus. */
    var raf =
      typeof window.requestAnimationFrame === "function"
        ? function (cb) { window.requestAnimationFrame(cb); }
        : function (cb) { window.setTimeout(cb, 0); };
    raf(function () {
      if (removed) {
        return;
      }
      splash.classList.add("splash--show");
      /* Masuk ≤ 980ms + dwell singkat → auto-dismiss pada 1.6s sejak tampil. */
      later(dismiss, 1600);
      /* Failsafe keras: node dihapus walau apa pun terjadi. */
      later(kill, 4000);
    });

    /* Skip manual: satu klik / satu tekan tombol apa pun → tutup cepat.
       Listener keyboard dipasang di document (fokus ada di body saat
       splash tampil — event tidak akan sampai ke #splash).
       Tidak ada elemen focusable & aria-hidden → aman untuk AT. */
    splash.addEventListener("click", dismiss);
    document.addEventListener("keydown", dismiss, { passive: true });
  }

  /* ---------- (5) Tilt kartu testimoni (desktop saja, pola kartu menu) ---------- */
  function setupTestiTilt() {
    if (!isFinePointer()) {
      return;
    }
    var items = document.querySelectorAll(".testimoni__item");
    for (var i = 0; i < items.length; i++) {
      attachTilt(items[i], items[i], 3, null);
    }
  }

  /* ---------- (6) Scroll-spy chip kategori ----------
     Menandai chip grup menu yang sedang dibaca (aria-current) — murni
     penanda status tanpa gerak (aman untuk reduced-motion; transisinya
     dimatikan kill-switch). Tanpa IO: tautan chip tetap berfungsi normal. */
  function setupMenuSpy() {
    var links = document.querySelectorAll(".menu-nav__link");
    var groups = document.querySelectorAll(".menu-group[id]");
    if (!links.length || !groups.length) {
      return;
    }
    function setCurrent(id) {
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === "#" + id) {
          links[i].setAttribute("aria-current", "true");
        } else {
          links[i].removeAttribute("aria-current");
        }
      }
    }
    if (typeof window.IntersectionObserver !== "function") {
      return;
    }
    var spy = new IntersectionObserver(
      function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            setCurrent(entries[j].target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (var k = 0; k < groups.length; k++) {
      spy.observe(groups[k]);
    }
  }

  /* ---------- (7) Parallax halus media hero (desktop saja) ----------
     Menggeser figure hero mengikuti gulir via properti `translate`
     (TERPISAH dari `transform` milik tilt/entrance/float → tak konflik).
     Hanya: pointer halus + class `anim` masih ada; rAF-throttle; diam
     saat hero keluar viewport. Browser lawas mengabaikan `translate`. */
  function setupHeroParallax() {
    if (!isFinePointer()) {
      return;
    }
    var media = document.querySelector(".hero__media");
    var hero = document.querySelector(".hero");
    if (!media || !hero) {
      return;
    }
    var ticking = false;
    function update() {
      ticking = false;
      if (!docEl.classList.contains("anim")) {
        media.style.removeProperty("--hero-py");
        return;
      }
      var y = window.scrollY || window.pageYOffset || 0;
      var h = hero.offsetHeight || 1;
      if (y < 0 || y > h) {
        return; /* hero tak terlihat → diam, hemat */
      }
      var shift = Math.min(y * 0.1, 60);
      media.style.setProperty("--hero-py", shift.toFixed(1) + "px");
    }
    function request() {
      if (!ticking) {
        ticking = true;
        if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(update);
        } else {
          update();
        }
      }
    }
    window.addEventListener("scroll", request, { passive: true });
    update();
  }

  /* ---------- Pasang semuanya ---------- */
  safe(setupHeroTilt);
  safe(setupMenuTilt);
  safe(setupTestiTilt);
  safe(setupMenuSpy);
  safe(setupHeroParallax);
  /* Bila reveal gagal di tengah jalan, paksa semua tampil:
     konten tak terlihat permanen lebih buruk daripada tanpa animasi. */
  safe(setupReveal, revealAll);
  /* Jaring pengaman entrance hero bila jalur splash terlewat;
     idempoten (classList.add ganda tak masalah). */
  safe(function () {
    window.setTimeout(playHeroEnter, 2600);
  });
  /* Bila splash gagal, buang node-nya segera — splash tidak boleh
     menghalangi konten. */
  safe(setupSplash, removeSplashNode);

  /* Pengguna boleh mengubah prefers-reduced-motion kapan saja. */
  safe(function () {
    if (!motionMq) {
      return;
    }
    if (typeof motionMq.addEventListener === "function") {
      motionMq.addEventListener("change", applyMotionClass);
    } else if (typeof motionMq.addListener === "function") {
      motionMq.addListener(applyMotionClass); /* fallback browser lama */
    }
  });
})();
