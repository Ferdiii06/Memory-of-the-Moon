import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function PullQuote({ pullQuote }) {
  const quoteRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.quote-content', {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      });
    });
  }, { scope: quoteRef });

  return (
    <section ref={quoteRef} className="w-full py-12 border-b border-[#d6cebe]">
      <div className="quote-content max-w-3xl mx-auto text-center px-4">
        {/* Newspaper double line top */}
        <div className="w-24 h-[3px] bg-[#6e1a24] mx-auto mb-6" />

        <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#78716c] mb-3">
          KUTIPAN EDISI
        </p>

        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1c1917] font-semibold leading-snug sm:leading-relaxed mb-6">
          {pullQuote.quote}
        </blockquote>

        <div className="space-y-1">
          <p className="font-sans text-xs uppercase tracking-wider text-[#6e1a24] font-semibold">
            {pullQuote.context}
          </p>
          {pullQuote.note && (
            <p className="font-editorial text-sm italic text-[#57534e]">
              {pullQuote.note}
            </p>
          )}
        </div>

        {/* Newspaper double line bottom */}
        <div className="w-24 h-[1px] bg-[#d6cebe] mx-auto mt-6" />
      </div>
    </section>
  );
}
