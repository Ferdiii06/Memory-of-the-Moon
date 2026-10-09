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
  editionTitle: "WARTA KENANGAN",
  editionSub: "LEMBAR ARSIP PRIBADI • EDISI KHUSUS RETROSPEKSI",
  editionNumber: "NO. 12 / EDISI KHUSUS 2024",
  dateRange: "17 Januari 2024 — 20 Desember 2024",
  location: "Bandung — Surabaya", // [PLACEHOLDER: Kota / lokasi Anda]
  weather: "Sore Berawan • 24°C",
  recipientName: "Salwa Kamila", // Nama penerima / subjek arsip
  headline: "Ada Waktu yang Selesai, Ada Hal Baik yang Tetap Tinggal.",
  subHeadline: "Catatan retrospeksi perjalanan satu tahun bersama: bukan untuk mengulang atau menyalahkan, melainkan menyimpan apa yang pernah tumbuh dengan jujur dan tenang."
};

// 2. ARTIKEL UTAMA (MAIN STORY)
export const MAIN_STORY = {
  sectionTag: "ARTIKEL UTAMA • KILAS AWAL",
  dateline: "JANUARI 2024 — PERMULAAN",
  title: "Awal yang Tenang Tanpa Rencana Panjang",
  subtitle: "Bagaimana percakapan sederhana tentang hal-hal kecil menjadi awal dari satu tahun perjalanan yang penuh arti.",
  lead: "Pertemuan hari Rabu di pertengahan Januari itu tidak diawali firasat besar atau rencana muluk. Hanya percakapan biasa tentang tugas kuliah, secangkir teh tawar hangat, dan kesepakatan sederhana untuk jalan kaki pulang bersama di trotoar yang masih basah sisa hujan.",
  paragraphs: [
    "Di awal tahun 2024, obrolan kami mengalir wajar tanpa perlu dipaksakan. Kami berbicara tentang hal-hal kecil: daftar lagu yang sering diputar berulang saat belajar larut malam, kebiasaan menaruh kunci sembarangan, hingga menu warung makan langganan di tikungan jalan.",
    "Tidak ada janji berlebihan pada masa itu. Yang ada hanyalah kehadiran yang konsisten, saling mendengarkan keluh kesah di penghujung pekan, dan tawa pelan ketika salah satu dari kami keliru mengingat nama orang di cerita sehari-hari.",
    "Halaman koran ini disusun bukan untuk meratapi akhir, melainkan untuk menandai bahwa perjalanan dari 17 Januari hingga 20 Desember 2024 tersebut pernah benar-benar ada, berharga, dan membawa banyak pelajaran baik bagi kami berdua."
  ],
  // [PLACEHOLDER FOTO UTAMA]: Ganti dengan foto cover utama di /public
  image: "/hero-portrait.jpg",
  imageCaption: "DOK. 01 — Arsip awal tahun. Duduk berdua di halte menunggu gerimis reda."
};

// 3. KOLOM MOMEN (5 - 8 KENANGAN DENGAN FOTO, TANGGAL, & DESKRIPSI KONKRET)
export const MOMENTS = [
  {
    id: "momen-01",
    plate: "LEMBAR 01",
    date: "17 Januari 2024",
    title: "Obrolan Pertama di Tikungan Kedai",
    location: "Kedai Kopi Sudut Jalan",
    description: "Pertemuan sore pertama yang tidak direncanakan lama. Duduk berhadapan mendengarkan ceritamu tentang buku yang belum tamat dibaca dan daftar lagu yang kamu dengarkan saat naik kereta komuter.",
    // [PLACEHOLDER FOTO 1]
    image: "/about-you-subway.jpg",
    caption: "FIG. 1.1 — Menunggu kereta senja setelah obrolan panjang pertama."
  },
  {
    id: "momen-02",
    plate: "LEMBAR 02",
    date: "14 Februari 2024",
    title: "Hujan Sore dan Rute Pulang Memutar",
    location: "Jalan Ranggagading",
    description: "Sore itu hujan turun deras tepat saat jam pulang. Alih-alih berteduh diam, kita memilih jalan memutar lewat gang kecil sambil bergantian memegang payung abu-abu yang pegangannya sudah longgar.",
    // [PLACEHOLDER FOTO 2]
    image: "/picture1.png",
    caption: "FIG. 1.2 — Berbagi payung abu-abu di trotoar berbatu yang licin."
  },
  {
    id: "momen-03",
    plate: "LEMBAR 03",
    date: "28 Maret 2024",
    title: "Malam Ujian dan Teh Manis Dingin",
    location: "Meja Belajar Bersama",
    description: "Minggu-minggu sibuk menjelang evaluasi tengah semester. Kita duduk bersebelahan selama tiga jam, jarang berbicara, hanya saling membagi roti tawar dan segelas es teh manis untuk mengusir kantuk.",
    // [PLACEHOLDER FOTO 3]
    image: "/picture2.jpg",
    caption: "FIG. 1.3 — Tumpukan catatan fotokopi dan gelas teh yang mulai berembun."
  },
  {
    id: "momen-04",
    plate: "LEMBAR 04",
    date: "19 April 2024",
    title: "Pasar Buku Bekas dan Catatan Pensil",
    location: "Kios Buku Palasari",
    description: "Menemani kamu mencari edisi novel terjemahan lama yang kertasnya sudah menguning. Kamu menunjukkan salah satu bait bergaris bawah pensil, lalu tersenyum tanpa perlu penjelasan panjang.",
    // [PLACEHOLDER FOTO 4]
    image: "/picture3.jpg",
    caption: "FIG. 1.4 — Menelusuri deretan rak buku tua di lorong sempit."
  },
  {
    id: "momen-05",
    plate: "LEMBAR 05",
    date: "18 Juli 2024",
    title: "Perjalanan Tengah Tahun ke Garis Pantai",
    location: "Pesisir Selatan",
    description: "Angin laut sore itu cukup kencang. Kita duduk di atas batu pemecah ombak sambil memperhatikan perahu nelayan merapat, membicarakan rencana masa depan yang saat itu tampak begitu dekat.",
    // [PLACEHOLDER FOTO 5]
    image: "/picture4.jpg",
    caption: "FIG. 1.5 — Jejak tapak sepatu di pasir basah saat matahari mulai turun."
  },
  {
    id: "momen-06",
    plate: "LEMBAR 06",
    date: "15 Oktober 2024",
    title: "Ketika Ritme Mulai Berjarak dan Tenang",
    location: "Teras Depan Rumah",
    description: "Malam itu hening terasa berbeda. Bukan karena ada pertengkaran atau kata keras, melainkan karena kami berdua mulai menyadari ritme dan arah langkah yang perlahan mengambil cabang masing-masing.",
    // [PLACEHOLDER FOTO 6]
    image: "/picture5.jpg",
    caption: "FIG. 1.6 — Lampu jalan temaram yang menemani diskusi malam yang tenang."
  },
  {
    id: "momen-07",
    plate: "LEMBAR 07",
    date: "20 Desember 2024",
    title: "Hari Terakhir dan Pamit yang Lapang Dada",
    location: "Peron Stasiun Kereta",
    description: "Tidak ada drama berlebihan atau kalimat yang saling menyalahkan. Hanya rasa terima kasih tulus untuk satu tahun yang hangat, diiringi doa baik sebelum pintu peron ditutup pelan.",
    // [PLACEHOLDER FOTO 7]
    image: "/picture6.jpg",
    caption: "FIG. 1.7 — Peron keberangkatan. Titik penutup yang disepakati dengan lapang dada."
  }
];

// 4. KUTIPAN EDISI (PULL QUOTE DARI PERCAKAPAN NYATA)
export const PULL_QUOTE = {
  // [PLACEHOLDER KUTIPAN]: Ganti kalimat kutipan nyata di bawah ini
  quote: "“Kita tidak perlu memaksakan akhir yang sama untuk menghargai apa yang pernah dijalani dengan sungguh-sungguh.”",
  context: "Percakapan di kedai teh sore hari, 20 Desember 2024",
  note: "Tersimpan sebagai pengingat bahwa ketenangan hati selalu lebih berharga daripada penyesalan yang berlarut."
};

// 5. LINIMASA ARSIP (DARI AWAL 17 JANUARI HINGGA 20 DESEMBER 2024)
export const TIMELINE_EVENTS = [
  {
    id: "tl-1",
    date: "17 Jan 2024",
    badge: "PERMULAAN",
    title: "Pertemuan Pertama",
    desc: "Obrolan ringan tentang buku dan musik yang membuka pintu perkenalan tanpa prasangka."
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
    desc: "Menyudahi perjalanan bersama tanpa kemarahan, saling berterima kasih dan mendoakan yang terbaik."
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
  author: "Ferry Pratama",
  footnote: "Lembar arsip ini bersifat privat dan disimpan secara tenang sebagai memorabilia pribadi."
};
