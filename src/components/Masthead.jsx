import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function getGraphemes(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('fr', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export default function Masthead({ meta }) {
  const containerRef = useRef(null);
  const titleText = meta.editionTitle || 'Mémoire de la Lune';
  const words = titleText.split(' ');

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Top metadata bar slide-down
      tl.from('.masthead-top-bar', {
        y: -10,
        opacity: 0,
        duration: 0.7
      })
      // 2. Kicker note
      .from('.masthead-kicker', {
        opacity: 0,
        y: 4,
        duration: 0.5
      }, '-=0.3')
      // 3. Ink letter-by-letter printing effect (blur to sharp + slight y)
      .from('.masthead-letter', {
        opacity: 0,
        y: 8,
        filter: 'blur(5px)',
        stagger: 0.04,
        duration: 0.65,
        ease: 'power2.out'
      }, '-=0.2')
      // 4. Sub-header with recipient name
      .from('.masthead-sub', {
        opacity: 0,
        y: 10,
        duration: 0.6
      }, '-=0.2')
      // 5. Broadside double rule line draws from center to edges
      .fromTo('.masthead-rule', 
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.95, ease: 'power3.inOut' },
        '-=0.3'
      )
      // 6. Double rule content fade in
      .from('.masthead-rule-text', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, '-=0.4');
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5
      });
    });
  }, { scope: containerRef });

  return (
    <header ref={containerRef} className="w-full pt-6 pb-4 border-b border-[#1c1917]">
      {/* Top Meta Bar */}
      <div className="masthead-top-bar flex flex-wrap items-center justify-between gap-2 pb-2.5 text-[11px] font-sans uppercase tracking-widest text-[#57534e] border-b border-[#d6cebe]">
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
      <div className="py-6 sm:py-9 text-center overflow-hidden">
        <p className="masthead-kicker text-[12px] sm:text-xs font-sans tracking-[0.28em] text-[#57534e] uppercase mb-2">
          Lembaran Catatan Khusus
        </p>

        <h1
          aria-label={titleText}
          lang="fr"
          className="font-serif text-[clamp(1.75rem,7.5vw,5.5rem)] sm:text-7xl md:text-8xl font-bold tracking-tight text-[#1c1917] uppercase scale-y-[0.98] select-none flex flex-wrap items-center justify-center gap-x-[0.28em] gap-y-1"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap">
              {getGraphemes(word).map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="masthead-letter inline-block"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="masthead-sub mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-editorial italic text-[#57534e]">
          <span>Arsip Perjalanan Bersama</span>
          <span className="font-semibold not-italic tracking-wider uppercase font-sans text-[#1c1917] bg-[#eae3d2] px-2.5 py-0.5 rounded-sm">
            {meta.recipientName}
          </span>
          <span>({meta.dateRange})</span>
        </div>
      </div>

      {/* Broadside Double Rule Bar */}
      <div className="masthead-rule border-double-y py-2 flex flex-wrap items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#57534e]">
        <span className="masthead-rule-text">Penerbitan Terbatas: Arsip Retrospeksi</span>
        <span className="masthead-rule-text italic font-editorial normal-case text-xs text-[#1c1917]">
          "Disimpan dengan tenang, tanpa sesal atau sangka buruk"
        </span>
        <span className="masthead-rule-text font-medium text-[#1c1917]">Status: Ditutup &bull; Selesai</span>
      </div>
    </header>
  );
}
