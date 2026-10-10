import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Closing({ closing, meta }) {
  const closingRef = useRef(null);
  const signaturePathRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      // 1. Box container enters
      tl.from('.closing-box', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      })
      // 2. Sentences reveal one by one with contemplative pauses
      .from('.closing-p', {
        y: 12,
        opacity: 0,
        duration: 0.9,
        stagger: 0.3,
        ease: 'power2.out'
      }, '-=0.3')
      // 3. Signature SVG stroke draws itself like real pen ink
      .fromTo(signaturePathRef.current,
        { strokeDashoffset: 320 },
        { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
        '-=0.2'
      )
      // 4. Stars twinkle in footer
      .fromTo('.star-twinkle',
        { opacity: 0.1 },
        {
          opacity: 0.6,
          duration: 2.2,
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true
          },
          ease: 'sine.inOut'
        },
        '-=1.0'
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(closingRef.current, {
        opacity: 0,
        duration: 0.6
      });
    });
  }, { scope: closingRef });

  return (
    <footer ref={closingRef} className="relative w-full pt-12 pb-16 overflow-hidden">
      {/* Subtle night sky stars constellation (14 soft dots, max 20) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-40">
        {[
          { top: '15%', left: '8%', size: 2 },
          { top: '28%', left: '88%', size: 2.5 },
          { top: '42%', left: '16%', size: 1.5 },
          { top: '65%', left: '92%', size: 2 },
          { top: '78%', left: '6%', size: 3 },
          { top: '88%', left: '82%', size: 1.5 },
          { top: '22%', left: '45%', size: 2 },
          { top: '85%', left: '48%', size: 2 },
          { top: '10%', left: '72%', size: 2 },
          { top: '55%', left: '85%', size: 1.5 },
          { top: '70%', left: '22%', size: 2 },
          { top: '35%', left: '95%', size: 1.5 },
          { top: '90%', left: '12%', size: 2 },
          { top: '8%', left: '25%', size: 2 }
        ].map((star, idx) => (
          <span
            key={idx}
            className="star-twinkle absolute rounded-full bg-[#dcb978]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
          />
        ))}
      </div>

      <div className="closing-box max-w-3xl mx-auto px-4 relative z-10">
        {/* Editor's Note Box */}
        <div className="bg-[#f9f7f2] border border-[#d6cebe] p-6 sm:p-10 rounded-xs shadow-xs relative">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
            <span className="font-semibold text-[#6e1a24]">{closing.sectionTag}</span>
            <span className="font-mono">{closing.date}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-4">
            {closing.title}
          </h3>

          <div className="space-y-4 font-editorial text-base sm:text-lg text-[#33302e] leading-relaxed text-justify mb-8">
            {closing.paragraphs.map((p, idx) => (
              <p key={idx} className="closing-p">{p}</p>
            ))}
          </div>

          <div className="pt-5 border-t border-[#e5ded0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-editorial italic text-xs text-[#78716c] mb-1">
                {closing.signOff}
              </p>
              <p className="font-serif font-bold text-lg text-[#1c1917]">
                {closing.author}
              </p>

              {/* Hand-drawn SVG signature path with animated stroke-dashoffset */}
              <div className="mt-2 w-36 h-12">
                <svg viewBox="0 0 160 50" className="w-full h-full text-[#6e1a24]">
                  <path
                    ref={signaturePathRef}
                    d="M 12 34 C 24 18, 38 12, 50 25 C 62 38, 54 44, 46 36 C 38 28, 62 14, 82 22 C 102 30, 96 42, 110 32 C 124 22, 138 26, 150 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="320"
                    strokeDashoffset="320"
                  />
                </svg>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block text-[11px] font-mono uppercase bg-[#eae3d2] text-[#57534e] px-3 py-1 border border-[#d6cebe] rounded-xs">
                Arsip Tersimpan &bull; Damai
              </span>
              <p className="text-[10px] font-mono text-[#a8a29e] mt-1">
                Dicatat untuk {meta.recipientName}
              </p>
            </div>
          </div>
        </div>

        {/* Final Colophon Notice */}
        <div className="text-center mt-8 text-xs font-sans text-[#78716c] tracking-wider uppercase">
          <p className="text-[11px]">
            &copy; {meta.dateRange} &bull; Seluruh Memori Dicatat dengan Rasa Hormat
          </p>
        </div>
      </div>
    </footer>
  );
}
