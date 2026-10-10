/**
 * =======================================================================
 * DATA KONTEN ARSIP KORAN: Salwa Kamila (17 Januari 2024 — 20 Desember 2024)
 * =======================================================================
 * File ini adalah pusat pengelolaan seluruh teks dan foto website.
 * Anda HANYA perlu mengubah data di file ini tanpa perlu menyentuh file komponen React.
 *
 * PANDUAN PENGISIAN FOTO:
 * - Taruh file foto baru Anda di folder: /public/
 *   Contoh: simpan 'foto-salwa-1.jpg' di /public/foto-salwa-1.jpg
 * - Di sini, cukup rujuk path-nya: image: "/foto-salwa-1.jpg"
 * - Gunakan placeholder yang sudah tersedia bila belum memiliki foto baru.
 */

// 1. METADATA EDISI KORAN (MASTHEAD & HEADER)
export const ARCHIVE_META = {
  editionTitle: "Mémoire de la Lune",
  editionSub: "LEMBAR ARSIP PRIBADI • ÉDITION SPÉCIALE RETROSPEKSI",
  editionNumber: "NO. 12 / EDISI KHUSUS 2024",
  dateRange: "17 Januari 2024 — 20 Desember 2024",
  location: "Sidoarjo — Surabaya", // [PLACEHOLDER: Kota / lokasi Anda]
  weather: "Sore Berawan • 24°C",
  recipientName: "Salwa Kamila", // Nama penerima / subjek arsip
  headline: "Di bumi, selalu ada seseorang yang hanya bisa dikagumi tapi tidak untuk dimiliki.",
  subHeadline: "Catatan retrospeksi perjalanan satu tahun bersama: bukan untuk mengulang atau menyalahkan, melainkan menyimpan apa yang pernah tumbuh dengan jujur dan tenang."
};

// 2. ARTIKEL UTAMA (MAIN STORY)
export const MAIN_STORY = {
  sectionTag: "ARTIKEL UTAMA • KILAS AWAL",
  dateline: "JANUARI 2024 — PERMULAAN",
  title: "Dia adalah ketidakmungkinan yang selama ini selalu ku semogakan",
  subtitle: "Bagaimana percakapan sederhana tentang hal-hal kecil menjadi awal dari satu tahun perjalanan yang penuh arti.",
  lead: "Pertemuan hari Rabu di pertengahan Januari itu tidak diawali firasat besar atau rencana muluk. Hanya percakapan biasa tentang tugas kuliah, secangkir teh tawar hangat, dan kesepakatan sederhana untuk jalan kaki pulang bersama di trotoar yang masih basah sisa hujan.",
  paragraphs: [
    "Di awal tahun 2024, obrolan kita mengalir wajar tanpa perlu dipaksakan. Kita berbicara tentang hal-hal kecil: daftar lagu yang sering diputar berulang saat belajar larut malam, kebiasaan menaruh kunci sembarangan, hingga menu warung makan langganan di tikungan jalan.",
    "Tidak ada janji berlebihan pada masa itu. Yang ada hanyalah kehadiran yang konsisten, saling mendengarkan keluh kesah di penghujung pekan, dan tawa pelan ketika salah satu dari kami keliru mengingat nama orang di cerita sehari-hari.",
    "Halaman koran ini disusun bukan untuk meratapi akhir, melainkan untuk menandai bahwa perjalanan dari 17 Januari hingga 20 Desember 2024 tersebut pernah benar-benar ada, berharga, dan membawa banyak pelajaran baik bagi kami berdua."
  ],
  // [PLACEHOLDER FOTO UTAMA]: Ganti dengan foto cover utama di /public
  image: "/memori3.png",
  imageCaption: "DOK. 01 — Arsip awal tahun. Pertama kali kita keluar bersama di Surabaya, dan makan bersama."
};

// 3. KOLOM MOMEN (5 - 8 KENANGAN DENGAN FOTO, TANGGAL, & DESKRIPSI KONKRET)
export const MOMENTS = [
  {
    id: "momen-01",
    plate: "LEMBAR 01",
    date: "17 Januari 2024",
    title: "Mampir Sebentar Sepulang Kuliah",
    location: "Indomaret",
    description: "Sepulang kuliah, aku menyempatkan diri untuk bertemu denganmu. Kita mampir ke Indomaret, membeli yogurt yang selalu menjadi minuman kesukaanmu. Pertemuan yang singkat dan sederhana, tapi waktunya memang sengaja kusisihkan.",
    // [PLACEHOLDER FOTO 1]
    image: "/memori2.png",
    caption: "FIG. 1.1 — Yogurt kesukaanmu, dan waktu yang disempatkan."
  },
  {
    id: "momen-02",
    plate: "LEMBAR 02",
    date: "14 Februari 2024",
    title: "Sepasang Merpati",
    location: "Jalan Ranggagading",
    description: "Seperti sepasang merpati yang selalu ingin terbang berdampingan, kita beruntung dipertemukan pada hari itu.",
    // [PLACEHOLDER FOTO 2]
    image: "/picture3.jpg",
    caption: "FIG. 1.2 — Sepasang merpati, dipertemukan hari itu."
  },
  {
    id: "momen-03",
    plate: "LEMBAR 03",
    date: "28 Maret 2024",
    title: "Satu Foto untuk Disimpan",
    location: "[ISI TEMPAT]",
    description: "Hari itu kita menyempatkan berfoto bersama untuk disimpan sebagai kenangan. Senang bisa bertemu.",
    // [PLACEHOLDER FOTO 3]
    image: "/memori5.png",
    caption: "FIG. 1.3 — Satu foto bersama, untuk diingat."
  },
  {
    id: "momen-04",
    plate: "LEMBAR 04",
    date: "19 April 2024",
    title: "Makan Setelah Kuliah",
    location: "McDonald's Puri Surya Jaya",
    description: "Semester pertama, sepulang dari mata kuliah yang cukup rumit. Kita kelaparan, dan karena saat itu belum punya kos, kita makan di McDonald's Puri Surya Jaya.",
    // [PLACEHOLDER FOTO 4]
    image: "/memori7.png",
    caption: "FIG. 1.4 — Makan malam setelah kuliah yang panjang."
  },
  {
    id: "momen-05",
    plate: "LEMBAR 05",
    date: "18 Juli 2024",
    title: "Lagu untuk Hari Tanpa Bertemu",
    location: "[ISI TEMPAT]",
    description: "Setiap kali kita tidak bertemu, aku memutar \"About You\" dari The 1975. Lagu itu jadi caraku mengingat dia.",
    // [PLACEHOLDER FOTO 5]
    image: "/picture4.jpg",
    caption: "FIG. 1.5 — Satu lagu, diputar di hari-hari tanpa bertemu."
  },
  {
    id: "momen-06",
    plate: "LEMBAR 06",
    date: "[ISI TANGGAL]",
    title: "Pertama Kali ke Tunjungan Plaza",
    location: "Tunjungan Plaza, Surabaya",
    description: "Pertama kalinya kita keluar bersama ke Surabaya. Kita berjalan-jalan di Tunjungan Plaza, mampir ke Ohsome, lalu makan di Marugame Udon sambil saling bercerita tentang susah dan senangnya awal perkuliahan.",
    // [PLACEHOLDER FOTO 6]
    image: "/memori1.png",
    caption: "FIG. 1.6 — Tunjungan Plaza, dan cerita tentang awal perkuliahan."
  },
  {
    id: "momen-07",
    plate: "LEMBAR 07",
    date: "20 Desember 2024",
    title: "Berkeliling Surabaya",
    location: "Surabaya",
    description: "Siang itu kita keluar untuk berjalan-jalan menyusuri Surabaya. Tidak ada tujuan yang dikejar, hanya berkeliling dan bercerita sepanjang perjalanan.",
    // [PLACEHOLDER FOTO 7]
    image: "/memori6.png",
    caption: "FIG. 1.7 — Siang di Surabaya, dan cerita sepanjang jalan."
  },
  {
    id: "momen-08",
    plate: "LEMBAR 08",
    date: "[ISI TANGGAL]",
    title: "Bulan yang Selalu Ia Foto",
    location: "[ISI TEMPAT]",
    description: "Dia selalu memotret bulan, karena bulan sangat berarti baginya. Dari situ aku jadi menyukai bulan. Dia menaruhku di sana, untuk dikenang.",
    // [PLACEHOLDER FOTO 8]
    image: "/picture6.jpg",
    caption: "FIG. 1.8 — Bulan, yang selalu ia foto."
  },
  {
    id: "momen-09",
    plate: "LEMBAR 09",
    date: "20 Desember 2024",
    title: "Selfie Sebelum Berangkat",
    location: "[ISI TEMPAT]",
    description: "Ia mengirimkan foto selfie, cantik, lucu, dengan matanya yang indah. Hari itu ia akan pergi bersama keluarganya untuk menjemput kakaknya yang pulang dari bandara.",
    // [PLACEHOLDER FOTO 9]
    image: "/memori11.png",
    caption: "FIG. 1.9 — Selfie yang ia kirim sebelum berangkat ke bandara."
  }
  
];

// 4. KUTIPAN EDISI (PULL QUOTE DARI PERCAKAPAN NYATA)
export const PULL_QUOTE = {
  // [PLACEHOLDER KUTIPAN]: Ganti kalimat kutipan nyata di bawah ini
  quote: "“Kutegaskan lagi. Kamu tidak bersalah. Aku juga tidak. Mungkin kita hanya dua orang yang bertemu di waktu yang sama-sama salah.”",
  context: "Percakapan di Minimarket dekat kampus, 20 Desember 2024",
  note: "Tersimpan sebagai pengingat bahwa ketenangan hati selalu lebih berharga daripada penyesalan yang berlarut."
};

// 5. LINIMASA ARSIP (DARI AWAL 17 JANUARI HINGGA 20 DESEMBER 2024)
export const TIMELINE_EVENTS = [
  {
    id: "tl-1",
    date: "17 Jan 2024",
    badge: "PERMULAAN",
    title: "Pertemuan Pertama",
    desc: "Obrolan ringan tentang buku dan musik yang membuka pintu perkenalan tanpa prasangka.",
    songId: "about-you"
  },
  {
    id: "tl-2",
    date: "14 Feb 2024",
    badge: "KEBIASAAN",
    title: "Menemukan Ritme Bersama",
    desc: "Saling bertukar kabar harian, rute jalan kaki sore, dan daftar lagu mingguan yang diputar bergantian."
  },
  {
    id: "tl-3",
    date: "28 Mar 2024",
    badge: "RUTINITAS",
    title: "Melewati Pekan Ujian",
    desc: "Saling menemani di meja belajar hingga larut, menghargai kehadiran meski minim kata-kata."
  },
  {
    id: "tl-4",
    date: "18 Jul 2024",
    badge: "PUNCAK",
    title: "Perjalanan Tengah Tahun",
    desc: "Hari-hari paling hangat di pesisir pantai, berbagi cerita rencana hidup, dan saling menguatkan."
  },
  {
    id: "tl-5",
    date: "15 Okt 2024",
    badge: "REALITAS",
    title: "Menyadari Cabang Jalan",
    desc: "Melihat kenyataan bahwa prioritas dan tujuan hidup kami perlahan bergerak ke arah yang berbeda."
  },
  {
    id: "tl-6",
    date: "20 Des 2024",
    badge: "PENUTUP",
    title: "Pamit dengan Dewasa",
    desc: "Menyudahi perjalanan bersama tanpa kemarahan, saling berterima kasih dan mendoakan yang terbaik.",
    songId: "i-thought-i-saw-your-face-today"
  }
];

// 6. CATATAN EDITOR / PENUTUP (EPILOG REFLEKTIF & JUJUR)
export const CLOSING_NOTE = {
  sectionTag: "CATATAN REDAKSI • EPILOG",
  title: "Menyimpan yang Baik, Melanjutkan Langkah",
  date: "Edisi Akhir Tahun, 20 Desember 2024",
  paragraphs: [
    "Satu tahun bukan waktu yang singkat bagi dua orang yang pernah saling berbagi isi kepala dan waktu luang. Di dalamnya ada banyak hal baik yang layak diingat: tawa atas hal remeh, kesabaran mendengarkan, dan rasa nyaman yang tidak dibuat-buat.",
    "Ketika takdir meminta kita mengambil jalur berbeda, tidak ada yang perlu disesali apalagi disalahkan. Yang tertinggal di lembaran ini adalah rasa terima kasih karena Salwa Kamila pernah menjadi bagian penting dari seluruh perjalanan tahun 2024.",
    "Semoga langkahmu ke depan selalu ringan, dikelilingi orang-orang yang tulus, dan sampai di semua impian baik yang pernah kamu ceritakan sore itu."
  ],
  signOff: "Disusun dengan penuh rasa hormat,",
  // [PLACEHOLDER PENULIS]: Ganti nama penulis jika ingin disesuaikan
  author: "Manyo",
  footnote: "Lembar arsip ini bersifat privat dan disimpan secara tenang sebagai memorabilia pribadi."
};
