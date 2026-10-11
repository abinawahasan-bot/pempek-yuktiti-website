# CONVENTIONS

> Project Brain file · Project conventions OVERRIDE generic skill recommendations when there is no security or correctness conflict.
> Confidence: CONFIRMED (seen in code/docs), INFERRED, UNKNOWN.

## General

- Naming: keputusan file/fungsi = keputusan user (CONFIRMED); detail lain UNKNOWN sampai kode ada.
- Folder layout: index.html di root, lalu css/, js/, assets/, README.md. (CONFIRMED — struktur yang akan dibuat)
- Formatting / linting: UNKNOWN (belum ditetapkan; tanpa build step).

## Per layer

- HTML: semantic HTML5 (header, nav, main, section, footer); bahasa konten = Indonesia. (CONFIRMED)
- CSS: mobile-first; warna didefinisikan sebagai CSS custom properties (design tokens) di :root. (CONFIRMED)
- JS: vanilla, tanpa framework; hanya progressive enhancement (halaman tetap berfungsi tanpa JS). (INFERRED)
- Components: tidak ada framework komponen. (CONFIRMED)
- State management: tidak ada. (CONFIRMED)
- Error handling: tidak ada logika server; penanganan error hanya untuk kegagalan embed/link. (INFERRED)
- API conventions: tidak ada API. (CONFIRMED)
- Database conventions: tidak ada database. (CONFIRMED)
- Testing conventions: UNKNOWN (belum ada tooling testing).
- Git conventions: UNKNOWN (repo belum diinisialisasi).

## Content rules

- Alt text wajib pada setiap gambar. (CONFIRMED)
- Semua teks konten berbahasa Indonesia. (CONFIRMED)
- Harga selalu disertai disclaimer "harga dapat berubah, konfirmasi via WhatsApp". (CONFIRMED)
- Jangan tampilkan nomor telepon sebagai raw text tanpa link WA bila memungkinkan — (INFERRED)

## Explicitly forbidden

- Framework (React/Vue/Tailwind/build tool) — dilarang. (CONFIRMED)
- Database, backend, API server — dilarang. (CONFIRMED)
- Build step / package manager / bundler — dilarang. (CONFIRMED)
- Menyimpan data harga 2023 yang basi (mis. sikoan Rp 5.500) — dilarang. (CONFIRMED)
- Menyimpan rahasia/kredensial di brain atau di kode. (CONFIRMED)

## Override order

1. Explicit user requirements
2. Security requirements
3. Actual project implementation
4. These project conventions
5. Specialized skills
6. Generic best practices

## Confidence notes

- Entri JS "progressive enhancement" dan beberapa baris per-layer masih INFERRED — verifikasi saat kode dibuat.
