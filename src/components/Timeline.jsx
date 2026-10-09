import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ events, meta }) {
  const containerRef = useRef(null);
  const lineProgressRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Scrub the vertical connecting line as user scrolls
      if (lineProgressRef.current && containerRef.current) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.6
            }
          }
        );
      }

      // Stagger timeline items
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out'
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-12 border-b border-[#d6cebe]">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
        <span className="font-semibold text-[#1c1917]">LINIMASA ARSIP • KILAS RETROSPEKSI</span>
        <span>{meta?.dateRange || '17 JAN — 20 DES 2024'}</span>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2">
          Jejak Waktu dan Perubahan Ritme
        </h3>
        <p className="font-editorial text-base text-[#57534e] italic">
          Enam tonggak waktu utama yang merangkum awal, kebiasaan, hingga titik pisah yang tenang.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-3xl mx-auto pl-6 sm:pl-10">
        {/* Background static line */}
        <div className="absolute left-[11px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-[#d6cebe]" />

        {/* Animated scrub line */}
        <div
          ref={lineProgressRef}
          className="absolute left-[11px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-[#6e1a24]"
        />

        <div className="space-y-8">
          {events.map((evt, idx) => (
            <div key={evt.id || idx} className="timeline-item relative flex items-start gap-4 sm:gap-6">
              {/* Dot node */}
              <div className="relative z-10 w-6 h-6 -ml-[23px] sm:-ml-[31px] rounded-full border-2 border-[#1c1917] bg-[#f6f3eb] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#6e1a24]" />
              </div>

              {/* Node Card */}
              <div className="flex-1 bg-[#f9f7f2] border border-[#d6cebe] p-4 rounded-xs shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6e1a24] bg-[#eae3d2] px-2 py-0.5 rounded-xs">
                      {evt.badge}
                    </span>
                    <span className="text-xs font-mono text-[#57534e]">
                      {evt.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a8a29e]">
                    TAHAP 0{idx + 1}
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-[#1c1917] mb-1">
                  {evt.title}
                </h4>

                <p className="font-editorial text-[14.5px] text-[#44403c] leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
