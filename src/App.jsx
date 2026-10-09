import { Printer } from 'lucide-react';
import Masthead from './components/Masthead';
import Headline from './components/Headline';
import MainStory from './components/MainStory';
import MomentCard from './components/MomentCard';
import Timeline from './components/Timeline';
import PullQuote from './components/PullQuote';
import Closing from './components/Closing';

import {
  ARCHIVE_META,
  MAIN_STORY,
  MOMENTS,
  PULL_QUOTE,
  TIMELINE_EVENTS,
  CLOSING_NOTE
} from './data/moments';

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f6f3eb] text-[#1c1917] selection:bg-[#6e1a24] selection:text-[#fcfbf7] py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      {/* Newspaper Page Wrapper */}
      <div className="max-w-6xl mx-auto bg-[#fcfbf7] border border-[#d6cebe] shadow-sm px-4 sm:px-8 md:px-12 py-6 sm:py-10">
        
        {/* Floating Print / Archive action bar (hidden during print) */}
        <div className="print:hidden flex items-center justify-between pb-3 mb-2 border-b border-[#e5ded0] text-xs font-sans text-[#78716c]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6e1a24]"></span>
            <span className="uppercase tracking-widest text-[11px] font-medium text-[#1c1917]">
              Edisi Khusus Koleksi Pribadi
            </span>
          </div>
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium uppercase tracking-wider text-[#57534e] bg-[#f6f3eb] hover:bg-[#eae3d2] hover:text-[#1c1917] border border-[#d6cebe] rounded-xs transition-colors cursor-pointer"
            title="Cetak lembaran koran atau simpan ke PDF"
          >
            <Printer size={13} />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* 1. Masthead */}
        <Masthead meta={ARCHIVE_META} />

        {/* 2. Headline */}
        <Headline meta={ARCHIVE_META} />

        {/* 3. Main Story */}
        <MainStory story={MAIN_STORY} />

        {/* 4. Kolom Momen (5 - 8 Kenangan) */}
        <section className="w-full py-12 border-b border-[#d6cebe]">
          <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
            <span className="font-semibold text-[#1c1917]">
              KOLOM MEMORABILIA • LEMBARAN PILIHAN
            </span>
            <span>TOTAL {MOMENTS.length} MOMEN TERARSIP</span>
          </div>

          <div className="mb-6 max-w-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2">
              Fragmen Hari-Hari Biasa
            </h3>
            <p className="font-editorial text-base text-[#57534e] italic">
              Hal-hal kecil yang tidak sempat masuk ke percakapan besar, tetapi membekas paling lama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOMENTS.map((moment) => (
              <MomentCard key={moment.id} moment={moment} />
            ))}
          </div>
        </section>

        {/* 5. Pull Quote */}
        <PullQuote pullQuote={PULL_QUOTE} />

        {/* 6. Linimasa */}
        <Timeline events={TIMELINE_EVENTS} meta={ARCHIVE_META} />

        {/* 7. Penutup */}
        <Closing closing={CLOSING_NOTE} meta={ARCHIVE_META} />

      </div>
    </div>
  );
}
