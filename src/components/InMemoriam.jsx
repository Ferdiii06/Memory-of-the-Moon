import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { IN_MEMORIAM_SECTION, OBITUARY_ITEMS } from '../data/inMemoriam';

gsap.registerPlugin(ScrollTrigger);

export default function InMemoriam() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Entrance of the section container
      gsap.from('.obit-header', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // 2. Stagger obituary notices
      gsap.from('.obit-entry', {
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.obit-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-12 border-b border-[#d6cebe]">
      {/* Editorial Section Rubric Bar */}
      <div className="obit-header flex items-center justify-between pb-3 mb-8 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
        <span className="font-semibold text-[#1c1917]">{IN_MEMORIAM_SECTION.rubric}</span>
        <span>{IN_MEMORIAM_SECTION.metaNote}</span>
      </div>

      <div className="obit-header text-center max-w-2xl mx-auto mb-10">
        {/* Classical printer's floral flourish */}
        <div className="flex items-center justify-center gap-3 mb-2 text-[#7a2e2e]">
          <span className="h-[1px] w-12 bg-[#8c8273]" />
          <span className="text-base select-none">❦</span>
          <span className="h-[1px] w-12 bg-[#8c8273]" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2">
          {IN_MEMORIAM_SECTION.title}
        </h3>
        <p className="font-editorial text-base text-[#57534e] italic">
          {IN_MEMORIAM_SECTION.subtitle}
        </p>
      </div>

      {/* Obituary Grid: Double-bordered newspaper columns */}
      <div className="obit-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {OBITUARY_ITEMS.map((item, idx) => (
          <article
            key={item.id || idx}
            className="obit-entry obituary-frame p-5 sm:p-6 flex flex-col justify-between transition-colors hover:border-[#7a2e2e]/70"
          >
            <div>
              {/* Category tag & Period */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e5ded0] text-[10.5px] font-mono uppercase tracking-wider text-[#78716c]">
                <span className="font-semibold text-[#7a2e2e]">{item.category}</span>
                <span>{item.period}</span>
              </div>

              {/* Title ("Telah Berpulang: ...") */}
              <h4 className="font-serif text-lg font-bold text-[#1c1917] leading-snug mb-3">
                {item.title}
              </h4>

              {/* Narrative of the habit/moment */}
              <p className="font-editorial text-[14.5px] text-[#44403c] leading-relaxed text-justify mb-4">
                {item.narrative}
              </p>
            </div>

            {/* Short italic closing line */}
            <div className="pt-3 border-t border-[#e5ded0] text-center">
              <p className="font-editorial italic text-xs text-[#57534e]">
                {item.epitaph}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Editorial Reminder */}
      <div className="text-center mt-8">
        <p className="font-editorial text-xs italic text-[#78716c]">
          * Kolom ini dicatat bukan untuk berduka, melainkan menandai batas waktu yang pernah diisi dengan baik.
        </p>
      </div>
    </section>
  );
}
