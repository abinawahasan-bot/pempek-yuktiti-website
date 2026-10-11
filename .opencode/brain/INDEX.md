# INDEX

> Project Brain file · Map of all Project Brain knowledge. Keep this up to date — it is the entry point for retrieval.
> Confidence markers: CONFIRMED / INFERRED / UNKNOWN per file di bawah. Init: 2026-10-08 · Last sync: 2026-10-12 (uji menyeluruh desktop/mobile + Lighthouse + 2 fix: kontras footer dark, header print).

## Project snapshot (CONFIRMED kecuali ditandai)

- **Apa ini:** Landing page statis satu halaman untuk UMKM "Pempek Yuk Titi - UII Jakal" (Sleman, DIY).
- **Stack:** HTML/CSS/JS murni — no framework, no database, no build step.
- **Status:** Implementasi v1 SELESAI + QA + review; **dark mode + P0 konversi + P1 keranjang + foto galeri + polish A/B/C + social proof (TERVERIFIKASI pemilik) + optimasi performa (WebP + font self-host) + uji menyeluruh desktop/mobile (Lighthouse Desktop 100/100/100/100 · Mobile 91/100/100/100) SELESAI**; **belum di-deploy**; git repo ada (branch `master`, commit `2c07bb3`), tanpa remote.
- **Lokasi:** /home/corvusjet/pempek-yuktiti-website

## Brain map

```
PROJECT*              identitas, tujuan, data bisnis Pempek Yuk Titi
├── STACK*            HTML/CSS/JS statis, Google Fonts CDN, hosting target
├── ARCHITECTURE*     struktur & section AKTUAL (TERIMPLEMENTASI, diverifikasi kode)
├── CONVENTIONS*      semantic HTML5, mobile-first, custom props, alt text, bahasa ID
├── REQUIREMENTS*     fitur FR-1..FR-7 + menu & harga 2026
├── DECISIONS*        #1 statis · #2 satu halaman · #3 harga 2026+disclaimer · #4 hosting
├── CURRENT_STATE*    7+ fitur HADIR (termasuk chip kategori + kartu menu kompak), QA PASS; uji menyeluruh 2026-10-12 PASS; deploy & git belum
└── KNOWN_ISSUES*     ISSUE-001 harga aggregator · ISSUE-002 foto asli (OPEN — 2 foto pemilik dihapus 2026-10-10) · ISSUE-003 canonical/OG (OPEN) · ISSUE-005 rating/badge (VERIFIED pemilik) · ISSUE-006 publikasi .opencode (OPEN, gate deploy); ISSUE-004 favicon 404 FIXED; ISSUE-007 kontras footer dark + ISSUE-008 header print FIXED 2026-10-12; RV-01..07 FIXED
├── TECHNICAL_DEBT*    TD-PERF-01..06; 01/02/04/05 ADDRESSED (WebP+font self-host, 2026-10-11); 03/06 OPEN (deploy-time)
├── SECURITY           (template — statis, tanpa kredensial)
├── TESTING            (template — belum ada automated tooling; QA manual via laporan)
├── DEPLOYMENT*        hosting belum dipilih (UNKNOWN; rekomendasi Netlify Drop); kit deportime di root (.htaccess, _headers) + DEPLOY.md; kompresi 188→35 KB brotli
├── DEPENDENCIES       (template — tanpa dependensi)
├── CHANGE_HISTORY*    init + implementasi v1 2026-10-08 … polish A/B/C + social proof + testimoni 2026-10-10
├── FAILURES           (template — belum ada)
├── PATTERNS           (template — belum ada)
├── PROJECT_HEALTH*    dinilai 2026-10-08 — skor GREEN/YELLOW, overall YELLOW; Performance YELLOW→GREEN 2026-10-11
├── ARCHITECTURE_DRIFT (kosong — divergensi kecil assets/ dicatat di ARCHITECTURE)
└── BRAIN_AUDIT*       log audit (1 entri: update post-implementation)
tasks/                 task records (TASK-NNN.md) — masih template
snapshots/             snapshot-2026-10-08-v1-implementation.md (milestone v1+QA)
```

\* = terisi fakta CONFIRMED (bukan template kosong).

## Retrieval quick-reference

| Need | File(s) | Confidence saat ini |
|------|---------|----------------------|
| What does the project do? | PROJECT | CONFIRMED |
| Tech stack? | STACK, DEPENDENCIES | CONFIRMED (diverifikasi dari kode) |
| How is it structured? | ARCHITECTURE | CONFIRMED (TERIMPLEMENTASI, dicek 2026-10-08) |
| How do we write code here? | CONVENTIONS, PATTERNS | CONFIRMED / template |
| What must it do? | REQUIREMENTS | CONFIRMED |
| Harga menu berapa? | REQUIREMENTS (bagian menu) — 23 kartu di index.html | CONFIRMED dari aggregator — risiko basi, lihat ISSUE-001 |
| Navigasi & tata letak menu? | ARCHITECTURE (Menu), CURRENT_STATE (chip kategori + kartu kompak), CHANGE_HISTORY 2026-10-10 | CONFIRMED (terukur CDP 2026-10-10) |
| Pratinjau foto galeri? | ARCHITECTURE (Galeri), CURRENT_STATE (lightbox), js/lightbox.js, CHANGE_HISTORY 2026-10-10 | CONFIRMED (terverifikasi CDP 2026-10-10) |
| Kenapa segini rentangnya? | index.html (meta/JSON-LD "Rp 3.000–15.000") + ISSUE-001 | CONFIRMED (dikoreksi 2026-10-08) |
| Why decisions? | DECISIONS (dan docs/adr/) | CONFIRMED |
| What's broken? | KNOWN_ISSUES, FAILURES | CONFIRMED — 5 issue OPEN (001 MEDIUM, 002/003/005/006 LOW); ISSUE-004/007/008 + RV-01..07 FIXED |
| What's owed? | TECHNICAL_DEBT | TD-PERF-01..06 (01/02/04/05 ADDRESSED 2026-10-11; 03/06 OPEN deploy-time) |
| Security posture? | SECURITY | template (risiko rendah; situs statis) |
| Testing in place? | TESTING | QA manual — PASS_WITH_NOTES (2026-10-08) → uji menyeluruh **PASS** 2026-10-12 (9 breakpoint, emulasi HP, no-JS, reduced-motion, print, keranjang, lightbox, a11y) + Lighthouse; tanpa automated test |
| How to deploy? | DEPLOYMENT, README §Deploy, DEPLOY.md | CONFIRMED (tanpa build; config kompresi di root; hosting belum dipilih) |
| Latest state? | CURRENT_STATE, CHANGE_HISTORY, PROJECT_HEALTH | CONFIRMED |
| Sehat proyeknya? | PROJECT_HEALTH | CONFIRMED (dinilai 2026-10-08; Performance GREEN 2026-10-11; overall YELLOW — peluncuran) |
| Kenapa situsnya ringan? | docs/PERFORMANCE_AUDIT §8, TECHNICAL_DEBT, CURRENT_STATE | CONFIRMED (LCP 1856–2056 ms, CLS 0, −61%/−74%, 2026-10-11; **Lighthouse Desktop 100 · Mobile Perf 91, 2026-10-12**) |

## Maintenance

- Ensure every new/updated file is listed here with its retrieval purpose.
- When a file is archived to snapshots/, remove it from the live map and note the archive.
- Langkah berikut yang akan mengubah brain: pilih hosting/domain (→ DEPLOYMENT, DECISIONS #4, ISSUE-003), verifikasi harga ke pemilik (→ ISSUE-001), aset foto galeri (→ ISSUE-002), init git (→ CURRENT_STATE branch/version).
