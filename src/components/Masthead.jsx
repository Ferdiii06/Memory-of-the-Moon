import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Masthead({ meta }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.masthead-elem', {
        y: 16,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });
  }, { scope: containerRef });

  return (
    <header ref={containerRef} className="w-full pt-6 pb-4 border-b border-[#1c1917]">
      {/* Top Meta Bar */}
      <div className="masthead-elem flex flex-wrap items-center justify-between gap-2 pb-2.5 text-[11px] font-sans uppercase tracking-widest text-[#57534e] border-b border-[#d6cebe]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#1c1917]">{meta.editionNumber}</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span>{meta.dateRange}</span>
        </div>
        <div className="hidden sm:block text-center font-medium tracking-wider text-[#6e1a24]">
          {meta.editionSub}
        </div>
        <div className="flex items-center gap-3">
          <span>{meta.location}</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span>{meta.weather}</span>
        </div>
      </div>

      {/* Main Newspaper Nameplate */}
      <div className="py-6 sm:py-9 text-center">
        <p className="masthead-elem text-[12px] sm:text-xs font-sans tracking-[0.28em] text-[#57534e] uppercase mb-2">
          Lembaran Catatan Khusus
        </p>
        <h1 className="masthead-elem font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#1c1917] uppercase scale-y-[0.98]">
          {meta.editionTitle}
        </h1>
        <div className="masthead-elem mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-editorial italic text-[#57534e]">
          <span>Arsip Perjalanan Bersama</span>
          <span className="font-semibold not-italic tracking-wider uppercase font-sans text-[#1c1917] bg-[#eae3d2] px-2.5 py-0.5 rounded-sm">
            {meta.recipientName}
          </span>
          <span>({meta.dateRange})</span>
        </div>
      </div>

      {/* Broadside Double Rule Bar */}
      <div className="masthead-elem border-double-y py-2 flex flex-wrap items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#57534e]">
        <span>Penerbitan Terbatas: Arsip Retrospeksi</span>
        <span className="italic font-editorial normal-case text-xs text-[#1c1917]">
          "Disimpan dengan tenang, tanpa sesal atau sangka buruk"
        </span>
        <span className="font-medium text-[#1c1917]">Status: Ditutup &bull; Selesai</span>
      </div>
    </header>
  );
}
