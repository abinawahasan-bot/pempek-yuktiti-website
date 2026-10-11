# TESTING

> Project Brain file · What testing EXISTS so new tests don't duplicate or conflict. Confidence markers apply.

## Framework & tooling

- Unit: **none** — proyek statis tanpa build/dependensi (DECISIONS #1). Tidak ada test runner di repo. (CONFIRMED)
- Integration: **none** (CONFIRMED)
- E2E: **none** — verifikasi browser manual + harness ad-hoc Chrome DevTools Protocol (CDP) di `/tmp/opencode/` (ephemeral, di luar repo). (CONFIRMED)
- CI test stage: **none** (tidak ada CI). (CONFIRMED)
- Coverage tool: **none**. (CONFIRMED)

## Test structure & layout

- Tidak ada folder `test/`/`tests/`/`*.test.*` di repo. (CONFIRMED — 2026-10-12)
- QA dijalankan manual (laporan QA) + skrip inspeksi DOM/runtime via CDP (`/tmp/opencode/`, tidak dilacak). Setup 2026-10-12: Playwright MCP (Chromium) untuk sweep responsive, emulasi perangkat, no-JS, reduced-motion, print, interaksi keranjang/lightbox, dan Lighthouse. (CONFIRMED)

## Test pyramid reality

| Level | Approx count | Frameworks |
|-------|--------------|------------|
| Unit | 0 | — |
| Integration | 0 | — |
| E2E | 0 (manual) | — |

## Coverage goals

- Tidak ada target coverage terukur (tidak ada kode uji berbasis file). Prioritas verifikasi manual: jalur konversi (keranjang → checkout WA), stabilitas layout (overflow-x), progressive enhancement (no-JS, reduced-motion), dan aksesibilitas dasar. (CONFIRMED)

## Important regression tests

| Test | What it protects | Where |
|------|------------------|-------|
| Sweep 9 breakpoint → overflow-x `0`, 0 konten tersembunyi | Stabilitas layout responsif | manual/CDP 2026-10-12 |
| Keranjang: Sikoan 1× (Rp 3.500) + Kapal Selam 3× (Rp 13.500) → count 4 / Rp 44.000; dec→0 hapus baris | Aritmetika keranjang + hapus baris | manual 2026-10-12 |
| Checkout URL = `https://wa.me/628814105501?text=…` dgn pesan ter-itemisasi | Nomor WA + `buildMessage` | manual 2026-10-12 |
| Emulasi HP asli → tilt MATI (`--rx: none`), scroll-3D off | Gate `(hover:hover) and (pointer:fine)` | manual 2026-10-12 |
| Tanpa JS → 23 kartu tampil, stepper/cart-bar hidden, CTA statis `flex` | Progressive enhancement | manual 2026-10-12 |
| Reduced-motion → `.anim` off, `transform: none` | Gate `prefers-reduced-motion` | manual 2026-10-12 |
| Print → `.site-header` `position: static`; layar → `sticky` | ISSUE-008 regression | manual 2026-10-12 |
| Kontras `.footer__text`/`.footer__copy` ≥4,5:1 di kedua tema | ISSUE-007 regression | Lighthouse A11y 2026-10-12 |
| Konsol 0 error | Regression noise (mis. favicon 404) | manual 2026-10-12 |

## Current health

- **2026-10-12 — uji menyeluruh PASS.** Desktop + mobile: 9 breakpoint bersih, emulasi HP, no-JS, reduced-motion, print, keranjang, lightbox, menu-spy, dark mode, a11y, konsol 0 error. Lighthouse **Desktop 100/100/100/100 · Mobile 91/100/100/100** (run mobile ke-2 Perf 77 = noise CPU). (CONFIRMED)
- 2026-10-08 QA v1 = PASS_WITH_NOTES (temuan kanonik/OG dipindah ke ISSUE-003). 2026-10-11 audit performa = PASS (LCP turun, CLS 0, 0 regresi). (CONFIRMED)

## Rules

- Before writing tests, read this file: what already exists, with which tools, and which patterns.
- Update after adding/removing test types or after a major suite change.
- Biasakan perbarui tabel "Important regression tests" setiap kali bug baru diperbaiki (backstop regresi).
