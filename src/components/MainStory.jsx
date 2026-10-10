import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MainStory({ story }) {
  const sectionRef = useRef(null);
  const photoBoxRef = useRef(null);
  const photoImgRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // 1. Article title ink sweep
      tl.fromTo('.story-title',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.5 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.1, ease: 'power3.out' }
      )
      // 2. Subtitle
      .from('.story-subtitle', {
        y: 12,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      // 3. Drop cap entrance: scales from 0.8 to 1
      .from('.story-lead', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.3')
      // 4. Staggered column paragraphs
      .from('.story-paragraph', {
        y: 14,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out'
      }, '-=0.3')
      // 5. Vertical column dividing rule drawing down
      .fromTo('.story-col-divider',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.5'
      );

      // Photo plate: "Landing" glued photo effect (y -20 landing with soft shadow settling)
      if (photoBoxRef.current) {
        gsap.fromTo(photoBoxRef.current,
          {
            y: -20,
            opacity: 0,
            rotation: -1.2,
            boxShadow: '0 20px 25px -5px rgba(28, 25, 23, 0.16)'
          },
          {
            y: 0,
            opacity: 1,
            rotation: -1.0,
            boxShadow: '0 4px 12px rgba(28, 25, 23, 0.06)',
            duration: 1.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: photoBoxRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Photo image ink tone: high-contrast monochrome drying to warm sepia
      if (photoImgRef.current) {
        gsap.fromTo(photoImgRef.current,
          { filter: 'grayscale(100%) contrast(115%) brightness(92%)' },
          {
            filter: 'grayscale(15%) sepia(20%) contrast(104%) brightness(99%)',
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: photoBoxRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 0.6
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
        <div className="lg:col-span-7 space-y-5">
          <h3 className="story-title font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1917] leading-tight">
            {story.title}
          </h3>

          {story.subtitle && (
            <p className="story-subtitle font-editorial italic text-base sm:text-lg text-[#57534e] leading-snug">
              {story.subtitle}
            </p>
          )}

          {/* Lead Paragraph with Drop Cap */}
          <p className="story-lead drop-cap font-editorial text-base sm:text-lg text-[#1c1917] leading-relaxed text-justify">
            {story.lead}
          </p>

          {/* Following paragraphs in newspaper editorial format */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-editorial text-[15px] sm:text-base text-[#44403c] leading-relaxed text-justify">
            {/* Subtle vertical rule between sub-columns on sm screens */}
            <div
              aria-hidden="true"
              className="story-col-divider hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#d6cebe] -translate-x-1/2"
            />

            {story.paragraphs.map((p, idx) => (
              <p key={idx} className="story-paragraph indent-4 first:indent-0">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Photo Plate (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={photoBoxRef}
            className="w-full max-w-md bg-[#f9f7f2] border border-[#d6cebe] p-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
          >
            <div className="overflow-hidden border border-[#e5ded0] bg-[#1c1917]">
              <img
                ref={photoImgRef}
                src={story.image}
                alt={story.title}
                className="w-full h-[320px] sm:h-[390px] object-cover transition-filter duration-700"
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
