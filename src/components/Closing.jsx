import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Closing({ closing, meta }) {
  const closingRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.closing-content', {
        scrollTrigger: {
          trigger: closingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out'
      });
    });
  }, { scope: closingRef });

  return (
    <footer ref={closingRef} className="w-full pt-12 pb-16">
      <div className="closing-content max-w-3xl mx-auto px-4">
        {/* Editor's Note Box */}
        <div className="bg-[#f9f7f2] border border-[#d6cebe] p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
            <span className="font-semibold text-[#6e1a24]">{closing.sectionTag}</span>
            <span>{closing.date}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-4">
            {closing.title}
          </h3>

          <div className="space-y-4 font-editorial text-base sm:text-lg text-[#33302e] leading-relaxed text-justify mb-6">
            {closing.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e5ded0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-editorial italic text-xs text-[#78716c]">
                {closing.signOff}
              </p>
              <p className="font-serif font-bold text-base text-[#1c1917]">
                {closing.author}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block text-[11px] font-mono uppercase bg-[#eae3d2] text-[#57534e] px-2.5 py-1 rounded-xs">
                Arsip Tersimpan &bull; Damai
              </span>
            </div>
          </div>
        </div>

        {/* Newspaper Colophon / Imprint */}
        <div className="mt-10 pt-6 border-t border-[#1c1917] text-center space-y-2 text-xs font-sans text-[#78716c]">
          <p className="tracking-widest uppercase text-[11px]">
            {meta.editionTitle} &bull; DOKUMENTASI PRIBADI UNTUK {meta.recipientName.toUpperCase()}
          </p>
          <p className="font-editorial italic text-sm text-[#57534e]">
            "Waktu berjalan terus, tetapi kenangan yang dirawat dengan hormat tidak akan kehilangan nilainya."
          </p>
          <p className="text-[10px] font-mono text-[#a8a29e]">
            17 Januari 2024 &mdash; 20 Juli 2024 &bull; Dicetak khusus dalam media digital
          </p>
        </div>
      </div>
    </footer>
  );
}
