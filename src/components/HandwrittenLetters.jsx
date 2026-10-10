import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText, Move } from 'lucide-react';
import { HANDWRITTEN_LETTERS } from '../data/handwrittenLetters';

gsap.registerPlugin(ScrollTrigger);

export default function HandwrittenLetters() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const triggerElementRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  // Lightbox Zoom & Pan State
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, moved: false });

  const handleImgError = useCallback((id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  const openLightbox = (index, event) => {
    triggerElementRef.current = event?.currentTarget || null;
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setActiveIdx(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
      triggerElementRef.current.focus();
    }
  }, []);

  const showPrev = useCallback(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : HANDWRITTEN_LETTERS.length - 1));
  }, []);

  const showNext = useCallback(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setActiveIdx((prev) => (prev < HANDWRITTEN_LETTERS.length - 1 ? prev + 1 : 0));
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [activeIdx]);

  // Keyboard controls for Lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus?.();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIdx, closeLightbox, showPrev, showNext]);

  // Pan / Drag Handlers when Zoomed
  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
      moved: false
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragStartRef.current.moved = true;
    }
    setPan({
      x: dragStartRef.current.origX + dx,
      y: dragStartRef.current.origY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = () => {
    // If not dragging, toggle zoom
    if (!dragStartRef.current.moved) {
      if (isZoomed) {
        setIsZoomed(false);
        setPan({ x: 0, y: 0 });
      } else {
        setIsZoomed(true);
        setPan({ x: 0, y: 0 });
      }
    }
  };

  // Touch Handlers for Mobile Pan
  const handleTouchStart = (e) => {
    if (!isZoomed || e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      origX: pan.x,
      origY: pan.y,
      moved: false
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isZoomed || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.startX;
    const dy = touch.clientY - dragStartRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragStartRef.current.moved = true;
    }
    setPan({
      x: dragStartRef.current.origX + dx,
      y: dragStartRef.current.origY + dy
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // GSAP Animations
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      // 1. Header double rule draws from center
      tl.fromTo(
        '.hl-header-rule',
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.85, ease: 'power2.inOut', clearProps: 'transform' }
      )
      // 2. Header text fade & slight lift
      .fromTo(
        '.hl-header-text',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', clearProps: 'all' },
        '-=0.35'
      )
      // 3. Cards landing entrance with slight rotation and expanding shadow
      .fromTo(
        '.hl-card',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.18, ease: 'power2.out', clearProps: 'opacity' },
        '-=0.2'
      )
      // 4. Tape strips appear last with subtle scale
      .fromTo(
        '.hl-tape',
        { scaleX: 0.6, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.45, stagger: 0.18, ease: 'back.out(1.4)', clearProps: 'opacity' },
        '-=0.2'
      );

      // Desktop light scroll parallax (max ±14px)
      if (card1Ref.current && card2Ref.current) {
        gsap.to(card1Ref.current, {
          y: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
        gsap.to(card2Ref.current, {
          y: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 0.5
      });
    });
  }, { scope: sectionRef });

  const activeLetter = activeIdx !== null ? HANDWRITTEN_LETTERS[activeIdx] : null;

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 border-b border-[#d6cebe] relative"
      aria-labelledby="handwritten-letters-title"
    >
      {/* Deckled torn paper line at top edge */}
      <div className="hl-deckled-edge absolute top-0 left-0 right-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* Rubric Header */}
        <div className="flex items-center justify-between pb-3 mb-8 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
          <span className="font-semibold text-[#1c1917]">
            ARSIP SURAT &bull; TULISAN TANGAN
          </span>
          <span className="font-mono text-[11px] text-[#78716c]">
            2 LEMBAR ASLI
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3
            id="handwritten-letters-title"
            className="hl-header-text font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2"
          >
            Fragmen di Atas Kertas Bergaris
          </h3>
          <p className="hl-header-text font-editorial text-base text-[#57534e] italic">
            Dua lembar, ditulis dengan tangan.
          </p>
          <div className="hl-header-rule border-double-b mt-4 max-w-xs mx-auto" />
        </div>

        {/* Two Letter Cards Grid: Staggered Landscape Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto px-2 sm:px-4 items-start">
          {HANDWRITTEN_LETTERS.map((letter, idx) => {
            const isError = Boolean(imgErrors[letter.id]);
            const cardRef = idx === 0 ? card1Ref : card2Ref;
            const rotationClass = idx === 0 ? '-rotate-[1.4deg]' : 'rotate-[1.1deg] md:mt-6';

            return (
              <div
                key={letter.id}
                ref={cardRef}
                className={`hl-card-wrapper flex justify-center transition-transform duration-300 ${rotationClass}`}
              >
                <button
                  type="button"
                  onClick={(e) => openLightbox(idx, e)}
                  className="hl-card group relative w-full bg-[#fcfbf7] border border-[#d6cebe] p-3.5 sm:p-4 rounded-xs shadow-md text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6e1a24] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-xl"
                  aria-label={`Buka surat tulisan tangan lembar ${idx + 1}`}
                >
                  {/* Decorative Vintage Paper Tape: safely on top card border without covering writing */}
                  <div
                    aria-hidden="true"
                    className="hl-tape absolute -top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#e8dec8]/90 border-x border-[#d6cebe]/70 shadow-2xs z-20 pointer-events-none"
                    style={{
                      transform: `translateX(-50%) rotate(${idx === 0 ? '-1.5deg' : '1.2deg'})`
                    }}
                  />

                  {/* Photo Frame respecting landscape aspect-ratio */}
                  {isError ? (
                    <div
                      className="w-full bg-[#f6f3eb] border border-dashed border-[#c5bca9] flex flex-col items-center justify-center p-6 text-center rounded-xs"
                      style={{ aspectRatio: `${letter.width} / ${letter.height}` }}
                    >
                      <FileText className="w-8 h-8 text-[#8c8273] mb-2 stroke-[1.5]" />
                      <p className="font-serif font-bold text-sm text-[#1c1917]">
                        Foto belum ditambahkan
                      </p>
                      <p className="font-mono text-[11px] text-[#78716c] mt-2 leading-relaxed break-all">
                        Simpan file ke: <br />
                        <span className="text-[#6e1a24] font-medium">{letter.src}</span>
                      </p>
                    </div>
                  ) : (
                    <div
                      className="relative overflow-hidden bg-[#e5ded0] border border-[#d6cebe]/80 rounded-xs"
                      style={{ aspectRatio: `${letter.width} / ${letter.height}` }}
                    >
                      <img
                        src={letter.src}
                        alt={letter.alt}
                        width={letter.width}
                        height={letter.height}
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImgError(letter.id)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015] hl-photo-filter"
                      />
                      {/* Hover Inspect Pill */}
                      <div className="absolute inset-0 bg-[#1c1917]/0 group-hover:bg-[#1c1917]/12 transition-colors flex items-center justify-center pointer-events-none">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 bg-[#fcfbf7]/95 text-[#1c1917] text-xs font-sans font-medium uppercase tracking-wider rounded-xs shadow-md flex items-center gap-1.5">
                          <ZoomIn size={13} className="text-[#6e1a24]" /> Perbesar Surat
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Editorial Caption Bar */}
                  <div className="pt-3 pb-0.5 border-t border-[#e5ded0] mt-3 flex items-baseline justify-between gap-3 text-left">
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-[#78716c] tracking-widest block uppercase">
                        FIG. S.{idx + 1}
                      </span>
                      <p className="font-editorial text-sm text-[#1c1917] leading-snug truncate">
                        {letter.caption}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-[#78716c] shrink-0 uppercase">
                      {letter.date}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

      {/* Lightbox Dialog */}
      {activeLetter && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan penuh surat tulisan tangan: ${activeLetter.caption}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-5 bg-[#1c1a17]/92 backdrop-blur-sm select-none print:hidden transition-opacity duration-350"
        >
          {/* Top Control Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between pb-2 text-[#fcfbf7] text-xs font-sans">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#d6cebe]">
                LEMBAR {activeIdx + 1} DARI {HANDWRITTEN_LETTERS.length}
              </span>
              <span className="text-[#78716c]">&bull;</span>
              <span className="font-editorial italic text-xs text-[#eae3d2]">
                {activeLetter.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom toggle button */}
              <button
                type="button"
                onClick={handleImageClick}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs bg-[#fcfbf7]/15 hover:bg-[#fcfbf7]/25 text-[#fcfbf7] text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcfbf7]"
                title={isZoomed ? 'Perkecil tampilan' : 'Perbesar 2x'}
              >
                {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                <span className="hidden sm:inline">{isZoomed ? '1x (Normal)' : '2x (Perbesar)'}</span>
              </button>

              {/* Close Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeLightbox}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xs bg-[#fcfbf7]/15 hover:bg-[#fcfbf7]/25 text-[#fcfbf7] text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcfbf7]"
                aria-label="Tutup tampilan surat (Esc)"
              >
                <X size={15} />
                <span className="hidden sm:inline">Tutup (Esc)</span>
              </button>
            </div>
          </div>

          {/* Main Enlarge Frame with Interactive Pan & Zoom */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden my-auto">
            {imgErrors[activeLetter.id] ? (
              <div className="w-[85vw] max-w-md aspect-[4/3] bg-[#fcfbf7] border border-[#d6cebe] flex flex-col items-center justify-center p-8 text-center rounded-xs shadow-2xl">
                <FileText className="w-10 h-10 text-[#8c8273] mb-3 stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-[#1c1917]">
                  Foto belum ditambahkan
                </p>
                <p className="font-mono text-xs text-[#78716c] mt-2 leading-relaxed break-all">
                  Letakkan foto surat di folder: <br />
                  <span className="text-[#6e1a24] font-medium">{activeLetter.src}</span>
                </p>
              </div>
            ) : (
              <div
                className={`relative max-w-full max-h-[82vh] bg-[#fcfbf7] p-2 sm:p-2.5 border border-[#d6cebe] shadow-2xl rounded-xs overflow-hidden ${
                  isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  key={activeLetter.id}
                  src={activeLetter.src}
                  alt={activeLetter.alt}
                  width={activeLetter.width}
                  height={activeLetter.height}
                  onClick={handleImageClick}
                  draggable={false}
                  style={{
                    transform: isZoomed
                      ? `scale(2) translate(${pan.x / 2}px, ${pan.y / 2}px)`
                      : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    touchAction: isZoomed ? 'none' : 'pan-y'
                  }}
                  className="max-w-[94vw] max-h-[78vh] object-contain rounded-xs hl-photo-filter select-none"
                />
              </div>
            )}

            {/* Prev & Next Floating Buttons */}
            {HANDWRITTEN_LETTERS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1c1a17]/85 hover:bg-[#1c1a17] text-[#fcfbf7] border border-[#57534e] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcfbf7] shadow-lg z-30"
                  aria-label="Lihat lembar sebelumnya (Panah Kiri)"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1c1a17]/85 hover:bg-[#1c1a17] text-[#fcfbf7] border border-[#57534e] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fcfbf7] shadow-lg z-30"
                  aria-label="Lihat lembar berikutnya (Panah Kanan)"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption & Instruction Bar */}
          <div className="w-full max-w-xl text-center px-4 pt-2">
            <p className="font-editorial text-sm text-[#f6f3eb] italic">
              {activeLetter.caption}
            </p>
            <p className="font-mono text-[10.5px] text-[#a8a29e] mt-1 uppercase tracking-wider flex items-center justify-center gap-1.5">
              {isZoomed ? (
                <>
                  <Move size={11} className="inline text-[#d9b86a]" />
                  <span>Seret untuk menggeser &bull; Klik untuk perkecil</span>
                </>
              ) : (
                <>
                  <ZoomIn size={11} className="inline text-[#d9b86a]" />
                  <span>Klik gambar untuk perbesar 2x &bull; Navigasi: Panah Kiri/Kanan &bull; Esc untuk tutup</span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
