# Laboratorium Virtual Pemisahan Campuran

Proyek React + TypeScript + Vite yang direkonstruksi dari file JSON hasil Google AI Studio Build mode.

## Catatan penting
- File sumber sudah dipisahkan menjadi struktur folder proyek, tetapi proyek tetap perlu diuji build sebelum dianggap siap produksi.
- Simulasi 3D untuk dekantasi, evaporasi, kristalisasi, dan distilasi masih placeholder menurut status di file sumber.
- Firebase belum aktif sampai konfigurasi proyek Firebase dan aturan keamanan Firestore disiapkan.
- Dashboard guru di kode sumber memakai PIN demo yang ditanam di frontend. Jangan mengandalkannya sebagai keamanan produksi; ubah menjadi autentikasi yang benar sebelum mengumpulkan data siswa.

## Menjalankan secara lokal
1. Pasang Node.js versi LTS.
2. Buka terminal di folder proyek.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka alamat lokal yang ditampilkan Vite.

## Menerbitkan di GitHub Pages
Workflow `.github/workflows/deploy.yml` akan menjalankan build dan deploy ketika ada perubahan pada branch `main`.
1. Buat repository GitHub dan unggah seluruh isi folder proyek (bukan file ZIP saja).
2. Di repository, buka **Settings → Pages**.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
4. Buka tab **Actions** dan tunggu workflow selesai dengan status sukses.
5. Alamat website akan ditampilkan di **Settings → Pages**.

`vite.config.ts` menggunakan `base: './'` agar aset memakai path relatif pada GitHub Pages.
