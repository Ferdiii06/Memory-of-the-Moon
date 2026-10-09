import { Bookmark, Sparkles, Radio } from 'lucide-react';

export default function EditorialColumns() {
  return (
    <section className="w-full max-w-[1100px] mx-auto my-12 px-3 sm:px-6">
      <div className="border-2 border-rule bg-paper p-4 sm:p-7 shadow-[6px_6px_0px_var(--rule-color)]">
        {/* Newspaper Section Ribbon */}
        <div className="border-b-2 border-rule pb-2 mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-red-600 dark:text-red-400" />
            <span>CRITICAL ESSAY &bull; MUSIC DISCOURSE NO. 10</span>
          </div>
          <span>FOLIO: PAGE B-3</span>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
            ANATOMI SUARA: GAUNG YANG TAK PERNAH PADAM
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-ink/75 mt-2 max-w-[700px] mx-auto">
            Sebuah ulasan tentang reverb shoegaze, dialog dua vokal, dan nostalgia yang membeku di antara rel kereta dan langit malam.
          </p>
        </div>

        {/* Multi-Column Newspaper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 font-serif text-xs sm:text-[13px] leading-[1.8] text-justify text-ink/90 border-t border-b border-rule py-6">
          {/* Column 1: The Sonic Architecture */}
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2 border-b border-rule/30 pb-1">
              [ I. ARSITEKTUR REVERB ]
            </div>
            <p>
              <span className="float-left font-serif text-4xl sm:text-5xl font-black leading-none pr-2 pt-1 uppercase">D</span>
              idengungkan sebagai penerus spiritual dari karya legendaris <em>"Robbers"</em> (2013), lagu ke-10 dalam album <em>Being Funny in a Foreign Language</em> ini berdiri di atas fondasi gelombang dream-pop dan shoegaze yang lapang. Jack Antonoff dan George Daniel membangun dinding suara analog yang hangat, menghidupkan kembali resonansi pita rekaman era 1980-an dengan presisi modern.
            </p>
            <p className="mt-3">
              Petikan gitar jangle yang terpendam di balik gaung katedral menciptakan ilusi ruang tanpa tepi—seperti berjalan di peron stasiun yang basah oleh hujan, di mana setiap detik yang lalu memantul kembali ke masa kini.
            </p>
          </div>

          {/* Column 2: The Carly Holt Duet & Central Pull Quote */}
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink mb-2 border-b border-rule/30 pb-1">
              [ II. DIALOG DUA SUARA ]
            </div>
            <p>
              Momen paling menentukan dalam lagu ini terjadi ketika vokal Carly Holt (istri gitaris Adam Hann) membelah kabut musik pada paruh akhir. Di balik kepulan gaung, suaranya bukan sekadar backing vocal; ia adalah perwujudan dari sosok yang dipanggil dari kejauhan.
            </p>

            {/* Pulled Quote Box */}
            <div className="my-4 p-3 border-y-2 border-rule bg-paper-surface/40 text-center font-mono text-[11px] font-bold tracking-wide uppercase text-ink">
              <span className="block text-red-600 dark:text-red-400 text-base">&ldquo;</span>
              &ldquo;HOLD ON AND HOPE THAT WE'LL FIND OUR WAY BACK IN THE END.&rdquo;
              <span className="block text-[9px] text-ink/60 font-serif italic mt-1 font-normal">&mdash; Refrain Refleksi Track 10</span>
            </div>

            <p>
              Suara biola Warren Ellis (The Bad Seeds) merayap naik seperti helai kenangan yang tidak ingin terputus, mengikat kedua vokal dalam sebuah simfoni yang menghanyutkan pendengar dalam rasa rindu yang abadi.
            </p>
          </div>

          {/* Column 3: The Lyricism of Longing */}
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink mb-2 border-b border-rule/30 pb-1">
              [ III. RITUS INGATAN ]
            </div>
            <p>
              Lirik Matty Healy berfokus pada ketidakpastian memori: ketakutan bahwa waktu akan mengikis lekuk wajah yang pernah sangat dihafal. Gagasan bahwa kita menikah di dalam kepala saat mencoba mengingat bagaimana pertama kali bertemu bukan sekadar metafora manis, melainkan manifestasi dari kebiasaan manusia mengabadikan rasa yang tak berlabuh.
            </p>
            <p className="mt-3">
              Di sinilah letak resonansi mendalamnya bagi siapa pun yang pernah menyimpan rasa selama berbulan-bulan bahkan bertahun-tahun: menaruh seseorang di dalam lagu dan bulan malam hari agar ia tak pernah benar-benar lenyap.
            </p>
          </div>
        </div>

        {/* Sonic Technical Specifications Bar */}
        <div className="mt-6 pt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-ink/80">
          <div className="flex items-center gap-1.5">
            <Bookmark size={12} className="text-red-600 dark:text-red-400" />
            <span className="font-bold">KUNCI NADA: A MAYOR</span>
            <span>&bull;</span>
            <span className="font-bold">TEMPO: 96 BPM</span>
            <span>&bull;</span>
            <span>DURASI: 5 MENIT 26 DETIK</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles size={11} />
            <span className="uppercase text-ink/60 font-semibold">ARSIP TEKS KORAN DIRTY HIT EDISI KHUSUS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
