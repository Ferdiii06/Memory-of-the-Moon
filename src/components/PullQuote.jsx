import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function PullQuote({ pullQuote }) {
  const quoteRef = useRef(null);
  const clippingRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Newspaper clipping paper cut entrance
      gsap.fromTo(clippingRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          rotation: -1.4,
          opacity: 0,
          y: 20
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          rotation: -0.8,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Ink underline drawing under the emotional keyword
      gsap.fromTo('.quote-ink-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(quoteRef.current, {
        opacity: 0,
        duration: 0.6
      });
    });
  }, { scope: quoteRef });

  return (
    <section ref={quoteRef} className="w-full py-12 border-b border-[#d6cebe]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Clipped Paper Box */}
        <div
          ref={clippingRef}
          className="newspaper-clipping p-6 sm:p-10 text-center rounded-xs"
        >
          {/* Scissors icon note / Plate badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-[1px] w-8 bg-[#8c8273]" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6e1a24]">
              &bull; KLIPING KUTIPAN TERPILIH &bull;
            </span>
            <span className="h-[1px] w-8 bg-[#8c8273]" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1c1917] font-semibold leading-snug sm:leading-relaxed mb-6">
            “Kita tidak perlu memaksakan akhir yang sama untuk{' '}
            <span className="relative inline-block text-[#6e1a24]">
              menghargai apa yang pernah dijalani
              {/* Animated ink underline */}
              <span
                aria-hidden="true"
                className="quote-ink-line absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6e1a24]/70 origin-left"
              />
            </span>{' '}
            dengan sungguh-sungguh.”
          </blockquote>

          <div className="space-y-1.5 pt-2 border-t border-[#e5ded0]">
            <p className="font-sans text-xs uppercase tracking-wider text-[#6e1a24] font-semibold">
              {pullQuote.context}
            </p>
            {pullQuote.note && (
              <p className="font-editorial text-sm italic text-[#57534e]">
                {pullQuote.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
