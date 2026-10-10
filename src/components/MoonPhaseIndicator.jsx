import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MoonPhaseIndicator() {
  const moonRef = useRef(null);
  const maskRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Animate moon shadow as user scrolls down the memory archive
      if (maskRef.current) {
        gsap.to(maskRef.current, {
          attr: { cx: 28 }, // shifts shadow circle from covering the moon to revealing crescent
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
          }
        });
      }

      // Gentle breathing glow behind the moon
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.85,
          scale: 1.15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
  });

  return (
    <div
      ref={moonRef}
      className="print:hidden flex items-center gap-2 px-2.5 py-1 bg-[#f9f7f2]/90 backdrop-blur-xs border border-[#d6cebe] rounded-full shadow-2xs text-[#57534e]"
      title="Fase Bulan Mémoire de la Lune (Memory of the Moon)"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Soft golden celestial glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full bg-[#dcb978]/25 blur-[3px] pointer-events-none opacity-40"
        />

        {/* Dynamic SVG Moon */}
        <svg
          viewBox="0 0 32 32"
          className="w-4 h-4 text-[#1c1917] relative z-10"
          fill="none"
        >
          <defs>
            <mask id="moon-phase-mask">
              {/* Full white disc */}
              <circle cx="16" cy="16" r="14" fill="#ffffff" />
              {/* Black cutting circle to form phase */}
              <circle ref={maskRef} cx="12" cy="16" r="13" fill="#000000" />
            </mask>
          </defs>

          {/* Moon disc rendered with mask */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="#dcb978"
            mask="url(#moon-phase-mask)"
            className="transition-colors"
          />
          {/* Subtle outline ring */}
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="#8c8273"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
        </svg>
      </div>

      <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase text-[#57534e]">
        Memory of the Moon
      </span>
    </div>
  );
}
