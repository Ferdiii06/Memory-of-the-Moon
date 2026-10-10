import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Headline({ meta }) {
  const headlineRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // 1. Kicker tag
      tl.from('.headline-kicker', {
        scale: 0.94,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
      // 2. Headline: Ink sweep clip-path reveal from left to right
      .fromTo('.headline-title', 
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.6 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.15, ease: 'power3.out' },
        '-=0.2'
      )
      // 3. Sub-headline
      .from('.headline-sub', {
        y: 14,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')
      // 4. Byline dateline bar
      .from('.headline-byline', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        duration: 0.6
      });
    });
  }, { scope: headlineRef });

  return (
    <section ref={headlineRef} className="w-full pt-8 pb-6 border-b border-[#d6cebe]">
      <div className="max-w-4xl mx-auto text-center px-2">
        {/* Kicker tag */}
        <div className="headline-kicker inline-flex items-center gap-2 px-3 py-1 bg-[#eae3d2] text-[#6e1a24] text-[11px] font-sans font-semibold tracking-widest uppercase mb-4 rounded-xs border border-[#d6cebe]">
          <span>KILAS EDISI UTAMA</span>
          <span className="text-[#a8a29e]">&bull;</span>
          <span>{meta.dateRange}</span>
        </div>

        {/* Primary Headline with ink-sweep clip-path */}
        <h2 className="headline-title font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1c1917] tracking-tight leading-[1.12] mb-4">
          {meta.headline}
        </h2>

        {/* Sub-headline */}
        <p className="headline-sub font-editorial text-lg sm:text-xl md:text-2xl text-[#57534e] italic max-w-3xl mx-auto leading-relaxed mb-5">
          {meta.subHeadline}
        </p>

        {/* Byline / Newspaper Dateline Bar */}
        <div className="headline-byline flex items-center justify-center gap-4 text-xs font-sans uppercase tracking-wider text-[#78716c] pt-2">
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
