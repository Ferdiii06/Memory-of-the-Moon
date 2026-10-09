import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Headline({ meta }) {
  const headlineRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.headline-item', {
        y: 18,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.25
      });
    });
  }, { scope: headlineRef });

  return (
    <section ref={headlineRef} className="w-full pt-8 pb-6 border-b border-[#d6cebe]">
      <div className="max-w-4xl mx-auto text-center px-2">
        {/* Kicker tag */}
        <div className="headline-item inline-flex items-center gap-2 px-3 py-1 bg-[#eae3d2] text-[#6e1a24] text-[11px] font-sans font-semibold tracking-widest uppercase mb-4 rounded-xs">
          <span>KILAS EDISI UTAMA</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span>{meta.dateRange}</span>
        </div>

        {/* Primary Headline */}
        <h2 className="headline-item font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1c1917] tracking-tight leading-[1.12] mb-4">
          {meta.headline}
        </h2>

        {/* Sub-headline */}
        <p className="headline-item font-editorial text-lg sm:text-xl md:text-2xl text-[#57534e] italic max-w-3xl mx-auto leading-relaxed mb-5">
          {meta.subHeadline}
        </p>

        {/* Byline / Newspaper Dateline Bar */}
        <div className="headline-item flex items-center justify-center gap-4 text-xs font-sans uppercase tracking-wider text-[#78716c] pt-2">
          <span>Oleh: Penulis Catatan</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span>Waktu Baca: ~4 Menit</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span className="text-[#6e1a24] font-medium">Refleksi Dewasa</span>
        </div>
      </div>
    </section>
  );
}
