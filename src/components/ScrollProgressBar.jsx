import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });
    });
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-50 pointer-events-none print:hidden"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#d9b86a] via-[#e5cf94] to-[#f4efe6] origin-left scale-x-0 shadow-[0_0_6px_rgba(217,184,106,0.45)]"
      />
    </div>
  );
}
