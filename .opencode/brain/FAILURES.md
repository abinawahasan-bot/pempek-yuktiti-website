# FAILURES

> Project Brain file · Reusable lessons from RECURRING or expensive failures. NOT for trivial one-time mistakes. Confidence markers apply.

## Failure template

### <failure title>

- **Problem:** (what went wrong — CONFIRMED)
- **Cause:** (root cause — CONFIRMED/INFERRED)
- **Solution:** (how it was fixed — CONFIRMED)
- **Lesson:** (the reusable rule — CONFIRMED)
- **Scope:** (where this rule applies)
- **First seen:** YYYY-MM-DD

## Failure log

### Token permukaan dipakai untuk warna teks di atas latar berwarna

- **Problem:** Teks footer (`.footer__text`, `.footer__copy`) nyaris tak terbaca di mode gelap — kontras 3,47:1 (gagal WCAG AA). Lolos audit dark mode 2026-10-09. (CONFIRMED)
- **Cause:** Selector memakai token permukaan `--color-surface-2` (gelap `#201A16`) sebagai `color`, bukan token teks. Audit sebelumnya "lulus" karena hanya menguji selector tetangga (`.footer__brand`/`.footer__label`/link) yang memakai `--color-on-primary`. Uji a11y yang menyampel sebagian selector memberi rasa aman palsu. (CONFIRMED)
- **Solution:** Ganti ke `--color-footer-text` (`#FFFFFF`/`#EFE7DC`); verifikasi kontras runtime di kedua tema (4,95:1 / 6,06:1); Lighthouse A11y 96→100. (CONFIRMED — 2026-10-12, ISSUE-007)
- **Lesson:** Warna teks harus memakai token **teks/on-\*** (mis. `--color-on-primary`, `--color-footer-text`), tidak pernah token **permukaan** (`--color-surface-*`) atau abstraksi lain. Audit kontras harus menyapu **semua** selector teks berwarna, bukan sebagian. (CONFIRMED)
- **Scope:** seluruh `css/style.css`, kedua tema; berlaku umum untuk komponen di atas latar berwarna.
- **First seen:** 2026-10-12

## Learning rules

- Ask before recording: "Is this a reusable project-specific lesson?" If no — do not record.
- When a fix becomes a pattern, also add a PATTERNS.md entry and a regression test.
- Anti-patterns discovered here must not be reintroduced by future agents (regression awareness).