import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MainStory({ story }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Reveal text
      gsap.from('.story-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Photo ink reveal
      gsap.from('.story-photo-img', {
        scrollTrigger: {
          trigger: '.story-photo-box',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        filter: 'grayscale(100%) contrast(85%)',
        opacity: 0.8,
        duration: 1.1,
        ease: 'power2.out'
      });
    });
  }, { scope: sectionRef });

  return (
    <article ref={sectionRef} className="w-full py-10 border-b border-[#d6cebe]">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
        <span className="font-semibold text-[#1c1917]">{story.sectionTag}</span>
        <span>{story.dateline}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Headline & Text (7 cols) */}
        <div className="lg:col-span-7 story-col space-y-5">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1917] leading-tight">
            {story.title}
          </h3>

          {story.subtitle && (
            <p className="font-editorial italic text-base sm:text-lg text-[#57534e] leading-snug">
              {story.subtitle}
            </p>
          )}

          {/* Lead Paragraph with Drop Cap */}
          <p className="drop-cap font-editorial text-base sm:text-lg text-[#1c1917] leading-relaxed text-justify">
            {story.lead}
          </p>

          {/* Following paragraphs in newspaper editorial format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-editorial text-[15px] sm:text-base text-[#44403c] leading-relaxed text-justify">
            {story.paragraphs.map((p, idx) => (
              <p key={idx} className="indent-4 first:indent-0">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Photo Plate (5 cols) */}
        <div className="lg:col-span-5 story-col">
          <div className="story-photo-box bg-[#f9f7f2] border border-[#d6cebe] p-3 shadow-xs">
            <div className="overflow-hidden border border-[#e5ded0] bg-[#1c1917]">
              <img
                src={story.image}
                alt={story.title}
                className="story-photo-img ink-drying-img w-full h-[320px] sm:h-[400px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="pt-2.5 px-1">
              <p className="font-sans text-[11px] text-[#57534e] tracking-wide leading-relaxed">
                {story.imageCaption}
              </p>
              <div className="mt-2 pt-2 border-t border-[#e5ded0] flex items-center justify-between text-[10px] font-mono text-[#78716c] uppercase">
                <span>Plat: Arsip Utama</span>
                <span>Resolusi: 35mm Monokrom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
