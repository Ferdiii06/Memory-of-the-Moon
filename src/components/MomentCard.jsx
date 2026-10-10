import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MomentCard({ moment, index = 0 }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  // Deterministic slight rotation for glued paper feel (-1.3deg to +1.3deg)
  const tiltAngle = useMemo(() => {
    const seed = index + (moment.id ? moment.id.charCodeAt(moment.id.length - 1) : 0);
    const angles = [-1.3, 0.9, -0.7, 1.2, -1.0, 0.8];
    return angles[seed % angles.length];
  }, [index, moment.id]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. "Foto ditempel" landing effect: drops gently from y -18 with settling shadow
      gsap.fromTo(cardRef.current,
        {
          y: -18,
          opacity: 0,
          rotation: tiltAngle * 1.5,
          boxShadow: '0 18px 24px -4px rgba(28, 25, 23, 0.14)'
        },
        {
          y: 0,
          opacity: 1,
          rotation: tiltAngle,
          boxShadow: '0 3px 10px rgba(28, 25, 23, 0.05)',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Photo ink drying: high contrast monochrome transitions to warm nostalgic tone
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { filter: 'grayscale(95%) contrast(110%) brightness(94%)' },
          {
            filter: 'grayscale(15%) sepia(20%) contrast(104%) brightness(99%)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(cardRef.current, {
        opacity: 0,
        duration: 0.5
      });
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="moment-card bg-[#f9f7f2] border border-[#d6cebe] p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#8c8273]"
      style={{ willChange: 'transform, opacity, box-shadow' }}
    >
      <div>
        {/* Top Header info */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e5ded0] text-[11px] font-sans uppercase tracking-widest text-[#78716c]">
          <span className="font-semibold text-[#6e1a24] stamp-seal px-1.5 py-0.2 text-[10px]">
            {moment.plate}
          </span>
          <span className="font-mono text-[11px] text-[#57534e]">{moment.date}</span>
        </div>

        {/* Image with newspaper frame */}
        <div className="overflow-hidden border border-[#d6cebe] bg-[#1c1917] mb-3">
          <img
            ref={imgRef}
            src={moment.image}
            alt={moment.title}
            className="moment-img w-full h-48 sm:h-52 object-cover transition-filter duration-700"
            loading="lazy"
          />
        </div>

        {/* Caption */}
        <p className="font-sans text-[10.5px] text-[#78716c] italic leading-tight mb-3 px-0.5 border-l-2 border-[#d6cebe] pl-2">
          {moment.caption}
        </p>

        {/* Title */}
        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917] leading-snug mb-2">
          {moment.title}
        </h4>

        {/* Narrative Description */}
        <p className="font-editorial text-[14.5px] text-[#44403c] leading-relaxed text-justify mb-4">
          {moment.description}
        </p>
      </div>

      {/* Footer Location tag */}
      <div className="pt-2 border-t border-[#e5ded0] flex items-center justify-between text-[10.5px] font-mono text-[#78716c]">
        <span>{moment.location}</span>
        <span className="text-[#a8a29e]">&bull; Catatan Terverifikasi</span>
      </div>
    </div>
  );
}
