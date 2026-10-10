/**
 * =======================================================================
 * DATA RUBRIK MUSIK ("LAGU EDISI INI")
 * =======================================================================
 * File ini mengatur daftar lagu pengiring edisi koran Mémoire de la Lune.
 * 
 * ATURAN HAK CIPTA:
 * - Tidak ada file audio lokal di repositori.
 * - Pemutaran hanya melalui embed resmi Spotify / YouTube.
 * - Tidak menampilkan lirik di halaman web.
 * 
 * PANDUAN PENGISIAN EMBED ID:
 * 1. Spotify Track ID:
 *    - Buka lagu di Spotify -> Klik 'Bagikan' -> 'Salin Tautan Lagu'.
 *    - Contoh URL: https://open.spotify.com/track/7Lpy8n53Gz04N4fXn3b8v8?si=...
 *    - Masukkan kode ID-nya saja: embedId: "7Lpy8n53Gz04N4fXn3b8v8"
 *    - Masukkan externalUrl: "https://open.spotify.com/track/7Lpy8n53Gz04N4fXn3b8v8"
 * 
 * 2. YouTube Video ID (Alternatif):
 *    - Ubah provider: "youtube"
 *    - Contoh URL: https://www.youtube.com/watch?v=AbCdEfGh123
 *    - Masukkan kode ID-nya: embedId: "AbCdEfGh123"
 *    - Masukkan externalUrl: "https://www.youtube.com/watch?v=AbCdEfGh123"
 */

export const MUSIC_SECTION_META = {
  rubric: "RUBRIK MUSIK — LAGU EDISI INI",
  title: "Dua Melodi yang Menyimpan Ritme Tahun Ini",
  subtitle: "Bukan untuk dinyanyikan bersama lagi, melainkan didengarkan sebagai latar pengingat masa yang pernah hangat.",
  editorialNote: "Catatan: Web embed Spotify memutar cuplikan resmi ~30 dtk bagi pengunjung tanpa akun. Buka aplikasi untuk mendengar penuh."
};

export const SONGS_DATA = [
  {
    id: "about-you",
    title: "About You",
    artist: "The 1975",
    year: "2022",
    caption: "Lagu tentang mengingat seseorang dari masa lalu, tentang perasaan yang tetap tinggal walau waktu sudah berlalu. Pelan, hangat, dan sedikit menyesal.",
    provider: "youtube",
    embedId: "tGv7CUutzqU",
    externalUrl: "https://www.youtube.com/watch?v=tGv7CUutzqU"
  },
 {
    id: "i-thought-i-saw-your-face-today",
    title: "I Thought I Saw Your Face Today",
    artist: "She & Him",
    year: "2010",
    caption: "Lagu tentang sekilas mengira melihat wajah seseorang yang dirindukan, lalu sadar itu hanya bayangan. Lembut dan sederhana.",
    provider: "youtube",
    embedId: "pyGU-UudvrM",
    externalUrl: "https://www.youtube.com/watch?v=pyGU-UudvrM"
  }
];
