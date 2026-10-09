import { ArrowUp, Sparkles, Newspaper } from 'lucide-react';

export default function NewspaperFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-[1100px] mx-auto mt-16 mb-8 px-3 sm:px-6 print:hidden">
      <div className="border-t-[3px] border-t-double border-b-2 border-rule pt-6 pb-6 bg-paper text-ink">
        {/* Top Colophon Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule/50 pb-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Newspaper size={14} />
            <span>THE 1975 BROADSHEET GAZETTE &bull; VOL. 1 &bull; NO. 1</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 border border-rule bg-transparent hover:bg-ink hover:text-paper cursor-pointer transition-colors text-[10px]"
            title="Kembali ke Bagian Atas"
          >
            <ArrowUp size={12} />
            <span>KEMBALI KE ATAS</span>
          </button>
        </div>

        {/* Middle 3-Column Imprint Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-rule/40 font-serif text-xs text-ink/80 leading-relaxed">
          {/* Column 1: Publication Info */}
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink mb-1.5 border-b border-rule/30 pb-1">
              [ IMPRINT &amp; CIRCULATION ]
            </h4>
            <p>
              Diterbitkan untuk memperingati perilisan album <em>Being Funny in a Foreign Language</em> dan resonansi abadi lagu <em>About You</em>.
            </p>
            <p className="font-mono text-[10px] text-ink/60 mt-2">
              Sirkulasi: Edisi Khusus Kolektor &bull; London &bull; Manchester &bull; Global
            </p>
          </div>

          {/* Column 2: Creative & Audio Credits */}
          <div>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink mb-1.5 border-b border-rule/30 pb-1">
              [ KREDIT KREATIF ]
            </h4>
            <p>
              Lagu ciptaan Matthew Healy, George Daniel, Warren Ellis &amp; Carly Holt. Diproduksi oleh Jack Antonoff bersama The 1975. Label: Dirty Hit Records.
            </p>
            <p className="font-mono text-[10px] text-ink/60 mt-2">
              Tata Rupa: Edisi Koran Vintage Monokrom 35mm
            </p>
          </div>

          {/* Column 3: Weather Forecast & Barcode */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink mb-1.5 border-b border-rule/30 pb-1">
                [ PRAKIRAAN CUACA &amp; KONDISI ]
              </h4>
              <p className="font-mono text-[11px] leading-tight text-ink/90">
                CUACA: Berawan &amp; Melankolis &bull; 18&deg;C<br />
                LANGIT MALAM: Bulan Purnama Tampak Jelas<br />
                STATUS RASA: Masih Menunggu Versi Terbaik ;)
              </p>
            </div>

            {/* Authentic Vintage Monospace Barcode */}
            <div className="mt-4 pt-2 border-t border-dashed border-rule/40 font-mono flex items-center justify-between">
              <div className="tracking-[-0.05em] text-[13px] font-bold select-none text-ink">
                ||| | |||| | ||||| || ||| |||| | |||
              </div>
              <span className="text-[9px] font-bold text-ink/70">
                ISBN 978-1-975-2022
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-ink/60 text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles size={11} />
            <span>&copy; {new Date().getFullYear()} THE 1975 &bull; DIRTY HIT &bull; ALL RIGHTS RESERVED</span>
          </div>
          <span>DICETAK DI ATAS KERTAS NEWSPRINT VINTAGE 75 G/M&sup2;</span>
        </div>
      </div>
    </footer>
  );
}
