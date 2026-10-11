/* =============================================================
   Pempek Yuk Titi - UII Jakal — js/cart.js
   Keranjang menu (stepper qty → sticky bar → sheet → checkout WA).

   Aturan arsitektur:
   - TANPA dependensi eksternal (IIFE, vanilla).
   - Progresif: hanya aktif bila <html> punya class .js (ditambahkan
     main.js setelah guard null lolos). Tanpa JS: stepper tersembunyi
     via CSS, CTA statis menu tetap tampil, keranjang tak pernah muncul.
   - Harga bersumber SATU tempat: teks .card-menu__price pada kartu
     (single source — jangan menambah data-price). Nama dari atribut
     data-item-name di <article class="card-menu">.
   - State disimpan di sessionStorage kunci `pyt_cart` (JSON array):
     [{ id, name, price, qty }]; qty 1..99; qty 0 = hapus; semua akses
     storage dibungkus try/catch (mode privat tetap jalan di memori).
   - Seluruh render memakai textContent (bukan innerHTML) — anti-XSS.
   - URL checkout dibuat saat klik dan dibuka lewat anchor sintetis
     (target=_blank + rel=noopener noreferrer) ala tombol WA lainnya.
   ============================================================= */
(function () {
  "use strict";

  var KEY = "pyt_cart";
  var WA_NUMBER = "628814105501";
  var MAX_QTY = 99;

  var state = [];

  /* ---------- Util ---------- */
  function fmt(n) {
    return "Rp " + n.toLocaleString("id-ID");
  }

  function parsePrice(text) {
    // "Rp 3.500" → 3500
    var digits = String(text || "").replace(/\D/g, "");
    return parseInt(digits, 10);
  }

  function loadState() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      var valid = [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        if (
          it &&
          typeof it.id === "string" &&
          typeof it.name === "string" &&
          Number.isFinite(it.price) &&
          Number.isFinite(it.qty) &&
          it.qty > 0 &&
          it.qty <= MAX_QTY
        ) {
          valid.push({
            id: it.id,
            name: it.name,
            price: Math.round(it.price),
            qty: Math.round(it.qty)
          });
        }
      }
      return valid;
    } catch (err) {
      return [];
    }
  }

  function saveState() {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {
      // Kuota / mode privat: keranjang tetap hidup di memori sesi ini.
    }
  }

  function countItems() {
    var n = 0;
    for (var i = 0; i < state.length; i++) n += state[i].qty;
    return n;
  }

  function totalPrice() {
    var t = 0;
    for (var i = 0; i < state.length; i++) t += state[i].price * state[i].qty;
    return t;
  }

  function setLive(msg) {
    var box = document.querySelector("[data-cart-live]");
    if (box) box.textContent = msg;
  }

  /* ---------- State ops ---------- */
  // delta: +1 / -1; qty 0 otomatis menghapus item.
  function changeQty(id, delta) {
    if (!id) return;
    var card = document.querySelector('.card-menu[data-item-id="' + id + '"]');
    if (!card) return;
    var priceEl = card.querySelector(".card-menu__price");
    if (!priceEl) return;
    var price = parsePrice(priceEl.textContent);
    if (!Number.isFinite(price)) return;
    var name = card.getAttribute("data-item-name") || "";

    var item = null;
    for (var i = 0; i < state.length; i++) {
      if (state[i].id === id) { item = state[i]; break; }
    }
    if (!item) {
      if (delta <= 0) return;
      item = { id: id, name: name, price: price, qty: 0 };
      state.push(item);
    }
    item.qty = Math.min(MAX_QTY, Math.max(0, item.qty + delta));
    var removed = item.qty === 0;
    if (removed) {
      state = state.filter(function (x) { return x.id !== id; });
    }

    saveState();
    render();

    var count = countItems();
    if (delta > 0) {
      setLive(name + " ditambahkan. Total " + count + " item.");
    } else if (removed) {
      setLive(count === 0 ? "Keranjang kosong." : name + " dihapus dari keranjang.");
    } else {
      setLive(name + " dikurangi. Total " + count + " item.");
    }
  }

  // Hapus item dari sheet keranjang (qty → 0).
  function removeItem(id) {
    if (!id) return;
    var item = null;
    for (var i = 0; i < state.length; i++) {
      if (state[i].id === id) { item = state[i]; break; }
    }
    if (!item) return;
    var name = item.name;
    state = state.filter(function (x) { return x.id !== id; });
    saveState();
    render();
    var count = countItems();
    setLive(count === 0 ? "Keranjang kosong." : name + " dihapus dari keranjang.");
  }

  /* ---------- Render ---------- */
  function render() {
    var has = countItems() > 0;

    // Stepper qty di tiap kartu.
    var qtyEls = document.querySelectorAll("[data-cart-qty]");
    for (var i = 0; i < qtyEls.length; i++) {
      var qid = qtyEls[i].getAttribute("data-cart-qty");
      var qty = 0;
      for (var j = 0; j < state.length; j++) {
        if (state[j].id === qid) { qty = state[j].qty; break; }
      }
      qtyEls[i].textContent = String(qty);
    }

    // Hitung & total (bar + panel).
    var counts = document.querySelectorAll("[data-cart-count]");
    for (var k = 0; k < counts.length; k++) counts[k].textContent = String(countItems());
    var totals = document.querySelectorAll("[data-cart-total]");
    for (var m = 0; m < totals.length; m++) totals[m].textContent = fmt(totalPrice());

    // Bar + FAB (display dikendalikan CSS body.has-cart).
    document.body.classList.toggle("has-cart", has);
    if (bar) bar.setAttribute("aria-hidden", has ? "false" : "true");
    for (var c = 0; c < checkoutBtns.length; c++) checkoutBtns[c].disabled = !has;

    renderItems();

    // Bar kosong saat panel terbuka → tutup panel agar tak "nyangkut".
    if (!has && panel && panel.classList.contains("is-open")) {
      closePanel();
    }
  }

  function renderItems() {
    if (!itemsList) return;
    itemsList.textContent = "";

    for (var i = 0; i < state.length; i++) {
      var it = state[i];
      var li = document.createElement("li");
      li.className = "cart-item";

      var name = document.createElement("span");
      name.className = "cart-item__name";
      name.textContent = it.name;

      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "cart-item__remove";
      remove.setAttribute("data-cart-remove", it.id);
      remove.setAttribute("aria-label", "Hapus " + it.name + " dari keranjang");
      remove.textContent = "\u00D7"; // ×

      var meta = document.createElement("span");
      meta.className = "cart-item__meta";
      meta.textContent = it.qty + " \u00D7 " + fmt(it.price);

      var sub = document.createElement("strong");
      sub.className = "cart-item__subtotal";
      sub.textContent = fmt(it.qty * it.price);

      li.appendChild(name);
      li.appendChild(remove);
      li.appendChild(meta);
      li.appendChild(sub);
      itemsList.appendChild(li);
    }

    if (panel) panel.classList.toggle("has-items", state.length > 0);
  }

  /* ---------- Panel (sheet) ---------- */
  var lastFocused = null;

  function openPanel() {
    if (!document.body.classList.contains("has-cart")) return;
    lastFocused = document.activeElement;
    panel.classList.add("is-open");
    backdrop.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    if (summaryBtn) summaryBtn.setAttribute("aria-expanded", "true");
    if (panelCloseBtn) panelCloseBtn.focus();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
    if (summaryBtn) summaryBtn.setAttribute("aria-expanded", "false");
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  function trapFocus(e) {
    var focusables = Array.prototype.slice.call(
      panel.querySelectorAll("button:not([disabled]), [href]")
    ).filter(function (el) {
      return el.getClientRects().length > 0;
    });
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ---------- Checkout WhatsApp ---------- */
  function buildMessage() {
    var lines = state.map(function (it) {
      return "\u2022 " + it.qty + "x " + it.name + " (" + fmt(it.price) + ") = " + fmt(it.qty * it.price);
    });
    return (
      "Halo Pempek Yuk Titi! Saya mau pesan:\n" +
      lines.join("\n") + "\n" +
      "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014" + "\n" +
      "Total: " + fmt(totalPrice()) + "\n" +
      "Terima kasih!"
    );
  }

  function doCheckout() {
    if (state.length === 0) return;
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMessage());
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* ---------- Events ---------- */
  function onDocumentClick(e) {
    var target = e.target;
    if (!target || typeof target.closest !== "function") return;

    var step = target.closest("[data-cart-action]");
    if (step) {
      e.preventDefault();
      changeQty(
        step.getAttribute("data-item-id"),
        step.getAttribute("data-cart-action") === "inc" ? 1 : -1
      );
      return;
    }

    var remove = target.closest("[data-cart-remove]");
    if (remove) {
      e.preventDefault();
      removeItem(remove.getAttribute("data-cart-remove"));
      return;
    }

    var open = target.closest("[data-cart-open]");
    if (open) {
      e.preventDefault();
      openPanel();
      return;
    }

    var close = target.closest("[data-cart-close]");
    if (close) {
      e.preventDefault();
      closePanel();
      return;
    }

    var checkout = target.closest("[data-cart-checkout]");
    if (checkout) {
      e.preventDefault();
      doCheckout();
    }
  }

  function onDocumentKeydown(e) {
    if (!panel.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closePanel();
      return;
    }
    if (e.key === "Tab") trapFocus(e);
  }

  /* ---------- Ref DOM ---------- */
  var bar = document.getElementById("cart-bar");
  var panel = document.getElementById("cart-panel");
  var backdrop = document.querySelector(".cart-backdrop");
  var summaryBtn = document.querySelector("[data-cart-open]");
  var panelCloseBtn = document.querySelector(".cart-panel__close");
  var itemsList = document.querySelector("[data-cart-items]");
  var checkoutBtns = Array.prototype.slice.call(
    document.querySelectorAll("[data-cart-checkout]")
  );

  function init() {
    // Hanya aktif bila main.js berhasil: class .js ada di <html>.
    if (!document.documentElement.classList.contains("js")) return;
    if (!panel || !bar || !summaryBtn || !panelCloseBtn || !itemsList || !backdrop) return;

    state = loadState();
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();