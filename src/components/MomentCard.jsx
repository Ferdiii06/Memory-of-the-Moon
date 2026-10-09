import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MomentCard({ moment }) {
  const cardRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Card entrance animation with ScrollTrigger
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out'
      });

      // Photo ink reveal on scroll
      const img = cardRef.current.querySelector('.moment-img');
      if (img) {
        gsap.to(img, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          filter: 'grayscale(15%) contrast(102%) brightness(100%)',
          duration: 0.9,
          ease: 'power2.out'
        });
      }
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="moment-card bg-[#f9f7f2] border border-[#d6cebe] p-4 flex flex-col justify-between transition-colors hover:border-[#1c1917]"
    >
      <div>
        {/* Top Header info */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e5ded0] text-[11px] font-sans uppercase tracking-widest text-[#78716c]">
          <span className="font-semibold text-[#6e1a24]">{moment.plate}</span>
          <span>{moment.date}</span>
        </div>

        {/* Image with newspaper frame */}
        <div className="overflow-hidden border border-[#d6cebe] bg-[#1c1917] mb-3">
          <img
            src={moment.image}
            alt={moment.title}
            className="moment-img ink-drying-img w-full h-48 sm:h-52 object-cover"
            loading="lazy"
          />
        </div>

        {/* Caption */}
        <p className="font-sans text-[10.5px] text-[#78716c] italic leading-tight mb-3 px-0.5">
          {moment.caption}
        </p>

        {/* Title */}
        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917] leading-snug mb-2">
          {moment.title}
        </h4>

        {/* Narrative Description (2-3 calm sentences) */}
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
