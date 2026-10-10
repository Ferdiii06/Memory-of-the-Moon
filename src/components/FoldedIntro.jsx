import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FoldedIntro({ meta }) {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return sessionStorage.getItem('warta_kenangan_folded_opened') !== 'true';
    } catch {
      return true;
    }
  });

  const [isOpening, setIsOpening] = useState(false);
  const overlayRef = useRef(null);
  const paperRef = useRef(null);
  const topFoldRef = useRef(null);
  const bottomFoldRef = useRef(null);
  const hintRef = useRef(null);

  // Lock scroll while intro is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Breathing hint pulse
  useGSAP(() => {
    if (!isVisible) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(hintRef.current, {
        opacity: 0.35,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, { scope: overlayRef, dependencies: [isVisible] });

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      sessionStorage.setItem('warta_kenangan_folded_opened', 'true');
    } catch {
      // storage unavailable fallback
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = '';
        }
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }
    });

    // 1. Newspaper lifts slightly and aligns straight
    tl.to(paperRef.current, {
      rotation: 0,
      y: -14,
      scale: 1.02,
      duration: 0.45,
      ease: 'power2.out'
    })
    // 2. Hide hint
    .to(hintRef.current, {
      opacity: 0,
      duration: 0.2
    }, '<')
    // 3. Top fold unfolds backwards
    .to(topFoldRef.current, {
      rotateX: 0,
      duration: 0.75,
      ease: 'power3.inOut'
    })
    // 4. Bottom fold unfolds forwards
    .to(bottomFoldRef.current, {
      rotateX: 0,
      duration: 0.75,
      ease: 'power3.inOut'
    }, '-=0.4')
    // 5. Newspaper expands and overlay dissolves into page
    .to(paperRef.current, {
      scale: 1.25,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.in'
    }, '-=0.2')
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out'
    }, '-=0.35');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Layar pembuka edisi Mémoire de la Lune"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1c1a17]/95 backdrop-blur-sm p-4 overflow-hidden select-none print:hidden"
    >
      {/* Clickable 3D Folded Newspaper Container */}
      <button
        ref={paperRef}
        type="button"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        aria-label="Sentuh atau tekan Enter untuk membuka edisi Mémoire de la Lune"
        className="perspective-1200 preserve-3d w-full max-w-[370px] sm:max-w-[430px] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dcb978] rounded-xs transition-transform duration-300"
        style={{
          transform: 'rotate(-1.5deg)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="relative bg-[#fcfbf7] border border-[#d6cebe] shadow-2xl overflow-hidden rounded-xs">
          
          {/* Top Panel (Visible Fold: Masthead Preview) */}
          <div className="p-5 sm:p-6 bg-[#fcfbf7] border-b border-[#d6cebe]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e5ded0] text-[10px] font-sans uppercase tracking-widest text-[#78716c]">
              <span className="font-semibold text-[#1c1917]">{meta?.editionNumber || 'NO. 12 / EDISI KHUSUS'}</span>
              <span>{meta?.dateRange || '17 JAN — 20 DES 2024'}</span>
            </div>

            <p className="text-[10px] font-sans tracking-[0.25em] text-[#57534e] uppercase text-center mb-1">
              Lembaran Khusus
            </p>
            <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl font-black tracking-tight text-[#1c1917] uppercase text-center">
              <span lang="fr">{meta?.editionTitle || 'Mémoire de la Lune'}</span>
            </h2>
            <p className="text-center font-editorial italic text-xs text-[#6e1a24] mt-1.5">
              Untuk {meta?.recipientName || 'Salwa Kamila'} &bull; Retrospeksi Perjalanan
            </p>

            {/* Crease line 1 indicator */}
            <div className="crease-line h-[4px] w-full mt-4 -mb-5" />
          </div>

          {/* Middle Fold (Initially angled in perspective) */}
          <div
            ref={topFoldRef}
            className="p-5 sm:p-6 bg-[#f9f7f2] border-b border-[#d6cebe] origin-top preserve-3d"
            style={{
              transform: 'rotateX(-65deg)',
              boxShadow: 'inset 0 10px 15px -3px rgba(28,25,23,0.18)'
            }}
          >
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono uppercase bg-[#eae3d2] text-[#6e1a24] px-2 py-0.5 rounded-xs">
                KILAS EDISI
              </span>
              <p className="font-serif text-sm font-bold text-[#1c1917] pt-2">
                "Ada Waktu yang Selesai, Ada Hal Baik yang Tetap Tinggal."
              </p>
              <p className="font-editorial text-xs italic text-[#78716c]">
                Halaman dibuka tanpa prasangka dan rasa sesal.
              </p>
            </div>

            {/* Crease line 2 indicator */}
            <div className="crease-line h-[4px] w-full mt-4 -mb-5" />
          </div>

          {/* Bottom Fold (Initially angled in perspective) */}
          <div
            ref={bottomFoldRef}
            className="p-4 bg-[#f4efe6] text-center origin-top preserve-3d"
            style={{
              transform: 'rotateX(55deg)',
              boxShadow: 'inset 0 -10px 15px -3px rgba(28,25,23,0.14)'
            }}
          >
            <div className="flex items-center justify-between text-[9.5px] font-mono text-[#78716c] uppercase">
              <span>Arsip Ditutup</span>
              <span>Lipatan Tersegel</span>
            </div>
          </div>
        </div>
      </button>

      {/* Gentle Pulsating Hint */}
      <div
        ref={hintRef}
        aria-hidden="true"
        className="mt-6 text-center text-[#dcb978] font-editorial italic text-sm tracking-wide"
      >
        <span>Sentuh untuk membuka edisi ini &rarr;</span>
      </div>
    </aside>
  );
}
