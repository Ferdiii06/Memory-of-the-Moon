import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  Disc3, 
  Sparkles, 
  Moon, 
  Sun, 
  Printer, 
  Music2,
  Calendar,
  Clock,
  Gift,
  Bookmark 
} from 'lucide-react';
import AudioPlayer from './components/AudioPlayer';
import FilmGrainCanvas from './components/FilmGrainCanvas';
import AlbumTracklist from './components/AlbumTracklist';
import EditorialColumns from './components/EditorialColumns';
import PhotoArchiveGrid from './components/PhotoArchiveGrid';
import NewspaperFooter from './components/NewspaperFooter';
import { TRACKS } from './data/tracks';

gsap.registerPlugin(Flip);

export const PHOTO_PLATES = [
  {
    id: 'subway',
    plate: 'PLATE 01',
    label: 'SUBWAY',
    title: 'Metropolitan Ave Subway Station',
    caption: 'FIG. 1.1 — METROPOLITAN AVE SUBWAY STATION',
    quote: '"And I miss you on a train, I miss you in the morning."',
    src: '/about-you-subway.jpg',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'picture1',
    plate: 'PLATE 02',
    label: 'LOVE IN SILENCE',
    title: 'Silent Devotion',
    caption: 'FIG. 1.2 — "I CHOOSE TO LOVE YOU IN SILENCE" (ASH.K)',
    quote: '"I choose to love you in silence." — Ash.K',
    src: '/picture1.png',
    aspect: 'max-h-[560px] aspect-[4/3] sm:aspect-[16/10]'
  },
  {
    id: 'picture2',
    plate: 'PLATE 03',
    label: 'CAR IN TIDE',
    title: 'Submerged Vehicle on Shore',
    caption: 'FIG. 1.3 — SUBMERGED VEHICLE AT OCEAN SHORELINE',
    quote: '"Hold on and hope that we\'ll find our way back in the end."',
    src: '/picture2.jpg',
    aspect: 'max-h-[560px] aspect-square sm:aspect-[4/3]'
  },
  {
    id: 'picture3',
    plate: 'PLATE 04',
    label: 'TWO RAVENS',
    title: 'Two Ravens in Flight',
    caption: 'FIG. 1.4 — TWO RAVENS IN FLIGHT • MOTION STUDY',
    quote: '"We get married in our heads, something to do while we try to recall how we met."',
    src: '/picture3.jpg',
    aspect: 'max-h-[560px] aspect-square sm:aspect-[4/3]'
  },
  {
    id: 'picture4',
    plate: 'PLATE 05',
    label: 'THE 1975',
    title: 'The 1975 Leather Stencil',
    caption: 'FIG. 1.5 — THE 1975 STENCIL • LEATHER JACKET EMBLEM',
    quote: '"Being Funny in a Foreign Language • Dirty Hit Records"',
    src: '/picture4.jpg',
    aspect: 'max-h-[560px] aspect-square sm:aspect-[4/3]'
  },
  {
    id: 'picture5',
    plate: 'PLATE 06',
    label: 'THE END ?',
    title: 'The End ? Epilogue',
    caption: 'FIG. 1.6 — "THE END ?" • FINAL EPILOGUE',
    quote: '"Hold on and hope that we\'ll find our way back in the end."',
    src: '/picture5.jpg',
    aspect: 'max-h-[560px] aspect-square sm:aspect-[4/3]'
  },
  {
    id: 'picture6',
    plate: 'PLATE 07',
    label: 'MANYO & MIYOWO',
    title: 'Manyo & Miyowo — About You & The Moon',
    caption: 'FIG. 1.7 — "KAMU AKU TARUH DI SEBUAH LAGU INI DAN BULAN YA" • MIYOWO',
    quote: '"Kamu aku taruh disebuah lagu ini dan bulan ya." — Miyowo',
    src: '/picture6.jpg',
    aspect: 'max-h-[560px] aspect-square sm:aspect-[4/3]'
  }
];

export default function App() {
  const [isSplit, setIsSplit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [theme, setTheme] = useState('light');
  const [selectedPlate, setSelectedPlate] = useState('subway');

  const activeIndex = PHOTO_PLATES.findIndex(p => p.id === selectedPlate);
  const safeIndex = activeIndex !== -1 ? activeIndex : 0;

  const goToPrev = () => {
    const nextIdx = (safeIndex - 1 + PHOTO_PLATES.length) % PHOTO_PLATES.length;
    setSelectedPlate(PHOTO_PLATES[nextIdx].id);
  };

  const goToNext = () => {
    const nextIdx = (safeIndex + 1) % PHOTO_PLATES.length;
    setSelectedPlate(PHOTO_PLATES[nextIdx].id);
  };

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      goToPrev();
    } else if (deltaX < -45) {
      goToNext();
    }
    touchStartX.current = null;
  };

  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll carousel slides every 4.5 seconds
  useEffect(() => {
    if (!isSplit || !isAutoPlay || isPaused) return;

    const timer = setInterval(() => {
      setSelectedPlate(prev => {
        const idx = PHOTO_PLATES.findIndex(p => p.id === prev);
        const cur = idx !== -1 ? idx : 0;
        return PHOTO_PLATES[(cur + 1) % PHOTO_PLATES.length].id;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isSplit, isAutoPlay, isPaused]);

  // Keyboard navigation for photo carousel
  useEffect(() => {
    if (!isSplit) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setSelectedPlate(prev => {
          const idx = PHOTO_PLATES.findIndex(p => p.id === prev);
          const cur = idx !== -1 ? idx : 0;
          return PHOTO_PLATES[(cur + 1) % PHOTO_PLATES.length].id;
        });
      } else if (e.key === 'ArrowLeft') {
        setSelectedPlate(prev => {
          const idx = PHOTO_PLATES.findIndex(p => p.id === prev);
          const cur = idx !== -1 ? idx : 0;
          return PHOTO_PLATES[(cur - 1 + PHOTO_PLATES.length) % PHOTO_PLATES.length].id;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSplit]);

  const carImgRef = useRef(null);
  const carShadowRef = useRef(null);
  const title3DRef = useRef(null);
  const flipStateRef = useRef(null);
  const posterRef = useRef(null);
  const rightPanelRef = useRef(null);
  const coverContainerRef = useRef(null);

  // Sync theme
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // GSAP 1: Staggered Entrance Animation for Cover Awal
  useLayoutEffect(() => {
    if (!isSplit && coverContainerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.gsap-cover-masthead', 
          { opacity: 0, y: -30 }, 
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo('.gsap-cover-kicker', 
          { opacity: 0, y: -15 }, 
          { opacity: 1, y: 0, duration: 0.6 }, 
          '-=0.4'
        )
        .fromTo('.gsap-cover-title', 
          { opacity: 0, scale: 0.92, y: 30 }, 
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power4.out' }, 
          '-=0.4'
        )
        .fromTo('.gsap-cover-car', 
          { opacity: 0, y: 40, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.1)' }, 
          '-=0.6'
        )
        .fromTo('.gsap-cover-quote', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.7 }, 
          '-=0.5'
        )
        .fromTo('.gsap-cover-btn', 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 
          '-=0.3'
        );
      }, coverContainerRef);

      return () => ctx.revert();
    }
  }, [isSplit]);

  // GSAP 2: Realistic 3D Mouse Parallax Tilt & Depth
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      if (carImgRef.current) {
        gsap.to(carImgRef.current, {
          rotationY: deltaX * 12,
          rotationX: -deltaY * 8,
          x: deltaX * 10,
          y: deltaY * 6,
          transformPerspective: 1000,
          duration: 0.6,
          ease: 'power1.out'
        });
      }

      if (carShadowRef.current) {
        gsap.to(carShadowRef.current, {
          x: -deltaX * 14,
          y: -deltaY * 6 + 10,
          rotationY: -deltaX * 6,
          duration: 0.8,
          ease: 'power1.out'
        });
      }

      if (title3DRef.current) {
        gsap.to(title3DRef.current, {
          rotationY: deltaX * 8,
          rotationX: -deltaY * 6,
          x: deltaX * 6,
          transformPerspective: 800,
          duration: 0.7,
          ease: 'power1.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP 3: Scroll Parallax on Car
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (carImgRef.current && !isSplit) {
        gsap.to(carImgRef.current, {
          y: scrollY * 0.08,
          rotationZ: scrollY * 0.005,
          overwrite: 'auto',
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSplit]);

  // GSAP 4: Subtle Organic Idle Float on the Car
  useEffect(() => {
    if (!carImgRef.current) return;
    const floatTween = gsap.to(carImgRef.current, {
      y: -6,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => floatTween.kill();
  }, []);

  // Transition to Split Page with GSAP Flip
  const handleOpenNewspaper = (plateId) => {
    if (carImgRef.current) {
      flipStateRef.current = Flip.getState(carImgRef.current);
    }
    if (typeof plateId === 'string') {
      setSelectedPlate(plateId);
    }
    setIsSplit(true);
    setIsPlaying(true);
  };

  // Instant media toggle handler for navbar
  const handleToggleAudio = () => {
    const next = !isPlaying;
    if (!next) {
      const audios = document.querySelectorAll('audio');
      audios.forEach(a => { try { a.pause(); } catch {} });
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(f => {
        try {
          f.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: []
          }), '*');
        } catch {}
      });
    }
    setIsPlaying(next);
  };

  // Transition back to Cover with GSAP Flip
  const handleBackToCover = () => {
    if (carImgRef.current) {
      flipStateRef.current = Flip.getState(carImgRef.current);
    }
    setIsSplit(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // GSAP 4: Flip Execution & Staggered Reveal of Newspaper Poster
  useLayoutEffect(() => {
    if (flipStateRef.current && carImgRef.current) {
      Flip.from(flipStateRef.current, {
        duration: 1.2,
        ease: 'power3.inOut',
        scale: true,
        clearProps: 'transform',
        onStart: () => {
          if (isSplit && posterRef.current) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo(posterRef.current, 
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 0.9 }
            )
            .fromTo('.gsap-poster-fade', 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
              '-=0.5'
            );
          }

          if (isSplit && rightPanelRef.current) {
            gsap.fromTo(rightPanelRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.25 }
            );
          }
        }
      });
      flipStateRef.current = null;
    }
  }, [isSplit]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-200 overflow-x-hidden relative">
      {/* 35mm Analog Film Grain & Dust Particle Canvas */}
      <FilmGrainCanvas theme={theme} />
      
      {/* 1. Header Toolbar (Mode Split) atau Masthead Cover (Mode Cover) */}
      {isSplit ? (
        <nav className="w-full max-w-[1340px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-mono font-bold print:hidden">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Tombol Kembali ke Halaman Pertama */}
            <button
              type="button"
              onClick={handleBackToCover}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 border-2 border-rule bg-paper text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors shadow-[2px_2px_0px_var(--rule-color)] shrink-0 text-[11px] sm:text-xs"
              title="Kembali ke Halaman Pertama"
            >
              <ArrowLeft size={14} />
              <span className="hidden xs:inline">HALAMAN PERTAMA</span>
              <span className="xs:hidden">COVER</span>
            </button>

            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 bg-ink text-paper border border-rule min-w-0 truncate text-[10px] sm:text-xs">
              <Music2 size={13} className="shrink-0" />
              <span className="truncate">{currentTrack?.artist?.toUpperCase()} &bull; {currentTrack?.title?.toUpperCase()}</span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3 ml-0.5 shrink-0" aria-hidden="true">
                  <span className="w-0.5 bg-paper h-2 animate-pulse"></span>
                  <span className="w-0.5 bg-paper h-3 animate-pulse delay-75"></span>
                  <span className="w-0.5 bg-paper h-1.5 animate-pulse delay-150"></span>
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Tombol Putar / Jeda */}
            <button 
              type="button" 
              onClick={handleToggleAudio}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 border border-rule bg-ink text-paper hover:bg-paper hover:text-ink cursor-pointer transition-colors shadow-[2px_2px_0px_var(--rule-color)] text-[11px] sm:text-xs"
              title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
            >
              {isPlaying ? (
                <>
                  <Pause size={12} />
                  <span>JEDA</span>
                </>
              ) : (
                <>
                  <Play size={12} className="ml-0.5" />
                  <span>PUTAR</span>
                </>
              )}
            </button>

            {/* Print */}
            <button 
              type="button" 
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 border border-rule bg-transparent text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors text-[11px] sm:text-xs"
              title="Cetak Poster Koran"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            {/* Theme Toggle */}
            <button 
              type="button" 
              onClick={toggleTheme}
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 border border-rule bg-transparent text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors text-[11px] sm:text-xs"
              title="Ganti Mode Kertas / Gelap"
            >
              {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
              <span>{theme === 'light' ? 'NIGHT' : 'DAY'}</span>
            </button>
          </div>
        </nav>
      ) : (
        /* Cover Masthead dengan GSAP Class */
        <header className="max-w-[920px] mx-auto px-3 sm:px-4 pt-4 sm:pt-6 select-none">
          <div className="gsap-cover-masthead border-t-[3px] border-t-double border-b-2 border-rule py-2 sm:py-3 px-2 flex items-center justify-between font-serif text-[10px] xs:text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase">
            <span>VOL. 1 &bull; NO. 1</span>
            <span className="font-band font-black italic text-xl xs:text-2xl sm:text-4xl tracking-normal">
              The 1975
            </span>
            <span>SPECIAL EDITION</span>
          </div>
        </header>
      )}

      {/* 2. Main Content Grid */}
      <main className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 py-4">
        <div className={`grid items-start ${
          isSplit 
            ? 'grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px] gap-8' 
            : 'grid-cols-1 max-w-[880px] mx-auto'
        }`}>
          
          {/* Kolom Kiri: Poster Koran & Kapsul Waktu */}
          {isSplit && (
            <div className="flex flex-col gap-6 sm:gap-8">
              <article 
                ref={posterRef} 
                className="border-2 border-rule bg-paper text-ink p-3 sm:p-5 md:p-7 shadow-[6px_6px_0px_var(--rule-color)] sm:shadow-[8px_8px_0px_var(--rule-color)]"
              >
                {/* Header Box */}
                <div className="gsap-poster-fade border-t border-b border-rule py-2.5 sm:py-4 md:py-5 px-1 sm:px-3 flex items-center justify-between">
                  <div className="w-1/4 text-left font-serif font-bold text-[10px] xs:text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase">
                    <div>SPECIAL</div>
                    <div>EDITION</div>
                  </div>

                  <h1 className="w-2/4 text-center font-band font-black italic text-3xl xs:text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none select-none">
                    The 1975
                  </h1>

                  <div className="w-1/4 text-right font-serif font-bold text-[10px] xs:text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase">
                    <div>DAILY</div>
                    <div>REPORT</div>
                  </div>
                </div>

                {/* Sub-Header Metadata Bar */}
                <div className="gsap-poster-fade border-b border-rule py-1.5 sm:py-2 px-1 sm:px-2 flex justify-between items-center text-[9px] xs:text-[10px] sm:text-xs font-serif uppercase tracking-wider sm:tracking-widest font-semibold">
                  <span>DIRTY HIT RECORDS</span>
                  <span className="hidden sm:inline">BEING FUNNY IN FOREIGN LANGUAGE</span>
                  <span>14 OKT 2022</span>
                </div>

                {/* Big Centered Title */}
                <div className="gsap-poster-fade py-4 sm:py-6 md:py-8 text-center">
                  <h2 className="font-title font-normal text-3xl xs:text-4xl sm:text-6xl md:text-7xl tracking-[0.10em] xs:tracking-[0.14em] sm:tracking-[0.2em] uppercase leading-none select-none">
                    ABOUT YOU
                  </h2>
                </div>

                {/* Photo Plate Selection Bar */}
                <div className="gsap-poster-fade border-t border-b border-rule py-2 px-1.5 sm:px-2 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 touch-pan-x">
                    <span className="text-ink/60 mr-1 flex items-center gap-1 shrink-0">
                      <Sparkles size={11} />
                      <span>PLATES:</span>
                    </span>
                    {PHOTO_PLATES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlate(p.id)}
                        className={`px-2 py-0.5 border border-rule cursor-pointer transition-colors text-[10px] sm:text-[11px] shrink-0 ${
                          selectedPlate === p.id 
                            ? 'bg-ink text-paper font-black shadow-[1px_1px_0px_var(--rule-color)]' 
                            : 'hover:bg-ink/10 text-ink'
                        }`}
                        title={p.title}
                      >
                        {p.plate} &bull; {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsAutoPlay(prev => !prev)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 border border-rule transition-colors cursor-pointer text-[10px] font-mono font-bold ${
                        isAutoPlay ? 'bg-ink text-paper' : 'hover:bg-ink/10 text-ink'
                      }`}
                      title={isAutoPlay ? 'Jeda Gulir Otomatis' : 'Aktifkan Gulir Otomatis'}
                      aria-label="Toggle Auto Scroll"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? (isPaused ? 'bg-amber-400' : 'bg-green-400 animate-pulse') : 'bg-ink/40'}`}></span>
                      <span>AUTO: {isAutoPlay ? (isPaused ? 'PAUSED' : 'ON') : 'OFF'}</span>
                    </button>
                  </div>
                </div>

                {/* Photo Carousel Display */}
                <div 
                  className="gsap-poster-fade border-2 border-rule w-full overflow-hidden bg-black relative group select-none shadow-[4px_4px_0px_var(--rule-color)]"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Auto-scroll progress line indicator */}
                  {isAutoPlay && !isPaused && (
                    <div 
                      key={safeIndex} 
                      className="absolute top-0 left-0 h-[2px] bg-paper z-20 animate-slide-progress pointer-events-none"
                    />
                  )}
                  {/* Sliding Track */}
                  <div 
                    className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                    style={{ transform: `translateX(-${safeIndex * 100}%)` }}
                  >
                    {PHOTO_PLATES.map((p, idx) => (
                      <div 
                        key={p.id} 
                        className="w-full shrink-0 relative h-[240px] xs:h-[300px] sm:h-[420px] md:h-[490px] overflow-hidden bg-black flex items-center justify-center"
                      >
                        <img 
                          src={p.src} 
                          alt={p.title} 
                          className="w-full h-full object-cover poster-photo block transition-transform duration-700 group-hover:scale-[1.01]"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                        {/* Caption on Each Slide */}
                        <div className="absolute bottom-2.5 left-2.5 bg-paper/95 text-ink text-[10px] sm:text-[11px] font-mono px-2.5 py-1 border border-rule shadow-[2px_2px_0px_var(--rule-color)] max-w-[85%] truncate">
                          {p.caption}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Slide Counter Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-paper/95 text-ink text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 border border-rule shadow-[2px_2px_0px_var(--rule-color)] z-10 pointer-events-none">
                    {safeIndex + 1} / {PHOTO_PLATES.length}
                  </div>

                  {/* Bottom Slide Indicator Dots */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10 bg-paper/90 px-2 py-1 border border-rule shadow-[2px_2px_0px_var(--rule-color)]">
                    {PHOTO_PLATES.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlate(p.id)}
                        className={`w-2 h-2 border border-rule transition-all cursor-pointer ${
                          safeIndex === idx ? 'bg-ink scale-125' : 'bg-paper hover:bg-ink/50'
                        }`}
                        title={`Beralih ke ${p.label}`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Central Bold Quote */}
                <div className="gsap-poster-fade py-3 sm:py-6 text-center">
                  <p className="font-sans font-extrabold text-xs xs:text-sm sm:text-xl md:text-2xl tracking-wide uppercase leading-tight px-1">
                    "DO YOU THINK I HAVE FORGOTTEN ABOUT YOU?"
                  </p>
                </div>

                {/* 3-Column Lyrics */}
                <div className="gsap-poster-fade border-t border-rule pt-4 sm:pt-6 pb-6 sm:pb-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 text-xs sm:text-[13px] leading-[1.65] font-serif text-justify">
                  <div>
                    <p>
                      I know a place. It's somewhere I go when I need to remember your face. We get married in our heads. Something to do while we try to recall how we met. Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten about you? You and I (don't let go) were alive (don't let go). With nothing to do, I could lay and just look in your eyes. Wait, and pretend (don't let go).
                    </p>
                  </div>
                  <div>
                    <p>
                      Hold on and hope that we'll find our way back in the end. Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten, about you? Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten, about you? There was something 'bout you that now I can't remember.
                    </p>
                  </div>
                  <div>
                    <p>
                      It's the same damn thing that made my heart surrender. And I miss you on a train, I miss you in the morning. I never know what to think about. I think about you. About you (so don't let go). Do you think I have forgotten. About you? (Don't let go). About you. About you. Do you think I have forgotten, about you?
                    </p>
                  </div>
                </div>

                {/* Vintage Classified Ads */}
                <div className="gsap-poster-fade border-t-2 border-rule pt-4 pb-4">
                  <div className="border-b border-rule pb-1.5 mb-3 flex items-center justify-between font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                    <span>SECTION C &bull; CLASSIFIEDS &amp; SPECIAL NOTICES</span>
                    <span className="text-red-600 dark:text-red-400 font-black">RATE: FREE &bull; CIRCULATION 2024</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] font-mono">
                    {/* Notice 1: LOST & FOUND */}
                    <div className="border border-dashed border-rule p-2.5 bg-paper-surface/40 flex flex-col justify-between">
                      <div>
                        <div className="font-bold border-b border-rule/50 pb-1 mb-1.5 flex items-center justify-between text-[10px] tracking-wider uppercase text-red-600 dark:text-red-400">
                          <span>[ LOST &amp; FOUND ]</span>
                          <span>REF #01</span>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-ink/90">
                          Hilang: Hari-hari sebelum kelulusan SMA &amp; kenangan semester 1. Hubungan tanpa status 6 bulan.
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-rule/30 text-[9px] uppercase font-bold text-ink/75">
                        Imbalan: Kembali bersama &amp; saling support.
                      </div>
                    </div>

                    {/* Notice 2: PERSONALS */}
                    <div className="border border-dashed border-rule p-2.5 bg-paper-surface/40 flex flex-col justify-between">
                      <div>
                        <div className="font-bold border-b border-rule/50 pb-1 mb-1.5 flex items-center justify-between text-[10px] tracking-wider uppercase text-ink">
                          <span>[ PERSONALS ]</span>
                          <span>REF #02</span>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-ink/90">
                          To: <span className="font-bold">Miyowo</span> (Lesung pipi manis, suka merah &amp; sunset). From: <span className="font-bold">Manyo</span>.
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-rule/30 text-[9px] uppercase font-bold text-ink/75">
                        Status: 2 tahun stuck pada rasa yang sama.
                      </div>
                    </div>

                    {/* Notice 3: NIGHT BROADCAST */}
                    <div className="border border-dashed border-rule p-2.5 bg-paper-surface/40 flex flex-col justify-between">
                      <div>
                        <div className="font-bold border-b border-rule/50 pb-1 mb-1.5 flex items-center justify-between text-[10px] tracking-wider uppercase text-ink">
                          <span>[ NIGHT BROADCAST ]</span>
                          <span>REF #03</span>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-ink/90">
                          &ldquo;Kamu aku taruh disebuah lagu ini dan bulan ya.&rdquo; Lagu: <span className="italic">About You The 1975</span>.
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-rule/30 text-[9px] uppercase font-bold text-ink/75">
                        Kondisi: Memantau dari sosial media &amp; langit malam.
                      </div>
                    </div>

                    {/* Notice 4: PROMISE / WISH */}
                    <div className="border border-dashed border-rule p-2.5 bg-paper-surface/40 flex flex-col justify-between">
                      <div>
                        <div className="font-bold border-b border-rule/50 pb-1 mb-1.5 flex items-center justify-between text-[10px] tracking-wider uppercase text-red-600 dark:text-red-400">
                          <span>[ PROMISE / WISH ]</span>
                          <span>REF #04</span>
                        </div>
                        <p className="font-serif text-xs leading-relaxed text-ink/90">
                          &ldquo;Suatu saat kita pasti bisa jadi pacarmu.&rdquo; Semoga kita bertemu dengan versi yang terbaik masing-masing.
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-rule/30 text-[9px] uppercase font-bold text-ink/75">
                        Catatan: Wanita paling sempurna sejak 2024 ;)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="gsap-poster-fade border-t border-rule pt-2.5 pb-1 px-1 sm:px-2 flex justify-between items-center font-serif text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                  <span>VOL. 1... NO. 1</span>
                  <span className="font-mono font-bold">A916°</span>
                  <span>10 FEB 2023</span>
                </div>
              </article>

              {/* KAPSUL WAKTU & LINIMASA CERITA */}
              <section className="border-2 border-rule bg-paper text-ink p-4 sm:p-6 shadow-[6px_6px_0px_var(--rule-color)] sm:shadow-[8px_8px_0px_var(--rule-color)]">
                {/* Header Pita Koran */}
                <div className="border-b-2 border-rule pb-3 mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ink/80">
                  <div className="flex items-center gap-1.5 text-ink">
                    <Calendar size={13} className="text-red-600 dark:text-red-400" />
                    <span>CHRONICLE OF TIME &bull; ARCHIVE LOG NO. 08</span>
                  </div>
                  <span className="px-2 py-0.5 border border-rule bg-ink text-paper text-[9px] sm:text-[10px] font-bold">
                    SPECIAL SUPPLEMENT
                  </span>
                </div>

                {/* Judul Utama Suplemen */}
                <div className="mb-5 text-center sm:text-left">
                  <div className="font-mono text-[10px] text-ink/60 uppercase tracking-widest mb-1 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Clock size={11} />
                    <span>REKAPITULASI DUA TAHUN RASA &bull; MANYO &bull; MIYOWO</span>
                  </div>
                  <h2 className="font-serif font-black text-2xl sm:text-3xl tracking-tight uppercase leading-tight">
                    KAPSUL WAKTU &amp; LINIMASA CERITA
                  </h2>
                  <p className="font-serif italic text-xs sm:text-sm text-ink/80 mt-1">
                    &ldquo;Catatan perjalanan yang tak pernah lekang, janji manis di ingatan, dan rasa yang selalu menetap.&rdquo;
                  </p>
                </div>

                {/* Timeline Grid */}
                <div className="space-y-3.5 relative before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-rule/30">
                  {/* Milestone 1 */}
                  <div className="relative pl-8 sm:pl-9">
                    <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2.5 h-2.5 rounded-full bg-ink border-2 border-paper"></div>
                    <div className="border border-rule/70 p-3 bg-paper-surface/30">
                      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rule/30 pb-1 mb-1.5 font-mono text-[10px]">
                        <span className="font-black text-red-600 dark:text-red-400 uppercase">[ FASE 01 • SMA &amp; HARI SEBELUM KELULUSAN ]</span>
                        <span className="text-ink/60">SEKOLAH MENENGAH ATAS</span>
                      </div>
                      <p className="font-serif text-xs leading-relaxed text-ink/90">
                        Selalu memandang kagum dengan wajah cantiknya. Merasa paling senang bila bersamamu—saling support, berjuang tryout bareng, dan saling bertukar keluh kesah. Menganggap kita pasangan yang paling sempurna.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="relative pl-8 sm:pl-9">
                    <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2.5 h-2.5 rounded-full bg-ink border-2 border-paper"></div>
                    <div className="border border-rule/70 p-3 bg-paper-surface/30">
                      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rule/30 pb-1 mb-1.5 font-mono text-[10px]">
                        <span className="font-black text-ink uppercase">[ FASE 02 • AWAL KULIAH SEMESTER 1 ]</span>
                        <span className="text-ink/60">KAMPUS PERDANA</span>
                      </div>
                      <p className="font-serif text-xs leading-relaxed text-ink/90">
                        Membuat banyak kenangan berharga hingga masa transisi perkuliahan semester 1. Merasakan kehangatan dan kebahagiaan saat melangkah bersama menyongsong fase baru kehidupan.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="relative pl-8 sm:pl-9">
                    <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2.5 h-2.5 rounded-full bg-ink border-2 border-paper"></div>
                    <div className="border border-rule/70 p-3 bg-paper-surface/30">
                      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rule/30 pb-1 mb-1.5 font-mono text-[10px]">
                        <span className="font-black text-ink uppercase">[ FASE 03 • 6 BULAN &amp; TERPISAH JARAK ]</span>
                        <span className="text-ink/60">JANJI TERPATRI</span>
                      </div>
                      <p className="font-serif text-xs leading-relaxed text-ink/90">
                        Setelah menjalani kedekatan indah tanpa status selama 6 bulan, takdir membawa langkah kita saling terpisah dan berjauhan hingga sekarang. Namun sebuah ucapan selalu terngiang: <span className="italic font-bold">&ldquo;Suatu saat kita pasti bisa jadi pacarmu.&rdquo;</span>
                      </p>
                    </div>
                  </div>

                  {/* Milestone 4 */}
                  <div className="relative pl-8 sm:pl-9">
                    <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2.5 h-2.5 rounded-full bg-ink border-2 border-paper"></div>
                    <div className="border border-rule/70 p-3 bg-paper-surface/30">
                      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rule/30 pb-1 mb-1.5 font-mono text-[10px]">
                        <span className="font-black text-red-600 dark:text-red-400 uppercase flex items-center gap-1">
                          <Gift size={11} />
                          <span>[ FASE 04 • RITUAL TUKAR GIFT ULANG TAHUN ]</span>
                        </span>
                        <span className="text-ink/60">BINGKISAN SPESIAL</span>
                      </div>
                      <p className="font-serif text-xs leading-relaxed text-ink/90">
                        Mengingat indahnya momen ketika hari ulang tahun tiba, kita saling memberikan kado yang dianggap sangat spesial. Tanda tulus bahwa perhatian tidak pernah pudar oleh waktu dan jarak.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 5 */}
                  <div className="relative pl-8 sm:pl-9">
                    <div className="absolute left-[7px] sm:left-[9px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 dark:bg-red-400 border-2 border-paper"></div>
                    <div className="border border-rule/70 p-3 bg-paper-surface/30">
                      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rule/30 pb-1 mb-1.5 font-mono text-[10px]">
                        <span className="font-black text-red-600 dark:text-red-400 uppercase flex items-center gap-1">
                          <Moon size={11} />
                          <span>[ FASE 05 • 2 TAHUN STUCK DENGAN PERASAAN SAMA ]</span>
                        </span>
                        <span className="text-ink/60">HARI INI &amp; SELAMANYA</span>
                      </div>
                      <p className="font-serif text-xs leading-relaxed text-ink/90">
                        2 tahun masih menginginkan kehadiran sosokmu meski hanya bisa memantau dari kejauhan sosial media. Selalu memutar lagu <span className="italic font-bold">About You The 1975</span> saat menatap langit malam: <span className="italic font-bold">&ldquo;Kamu aku taruh disebuah lagu ini dan bulan ya.&rdquo;</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Cap */}
                <div className="mt-5 pt-3 border-t-2 border-double border-rule flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] text-ink/75">
                  <div className="flex items-center gap-2">
                    <Bookmark size={12} className="text-ink" />
                    <span>STATUS: MASIH MENUNGGU VERSI TERBAIK</span>
                  </div>
                  <div className="px-2 py-1 border border-dashed border-red-600/50 text-red-700 dark:text-red-400 font-bold text-center">
                    FAVORIT: MERAH &bull; SUNSET &bull; BULAN MALAM &bull; WANITA PALING SEMPURNA ;)
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Kolom Kanan ATAU Centerpiece Cover Awal */}
          <div 
            ref={coverContainerRef}
            className={`${
              isSplit 
                ? 'lg:sticky lg:top-6 flex flex-col gap-6' 
                : 'py-8 sm:py-12 flex flex-col items-center text-center select-none'
            }`}
          >
            
            {/* Teks Intro Khusus Cover Awal */}
            {!isSplit && (
              <>
                <div className="gsap-cover-kicker flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-ink/70 uppercase mb-3">
                  <Sparkles size={13} className="shrink-0" />
                  <span className="truncate">BEING FUNNY IN A FOREIGN LANGUAGE &bull; TRACK 10</span>
                  <Sparkles size={13} className="shrink-0" />
                </div>

                {/* 3D Depth Title */}
                <div className="perspective-[1000px] py-1">
                  <h1 
                    ref={title3DRef}
                    className="gsap-cover-title font-title font-normal text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-[0.10em] xs:tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.2em] uppercase leading-none mb-4 sm:mb-6 select-none will-change-transform"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      textShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
                    }}
                  >
                    ABOUT YOU
                  </h1>
                </div>
              </>
            )}

            {/* Kotak Gambar Mobil dengan GSAP Flip & Parallax */}
            <div className={`gsap-cover-car w-full ${
              isSplit 
                ? 'border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)]' 
                : 'my-2 sm:my-4'
            }`}>
              {/* Header Box jika di mode Split */}
              {isSplit && (
                <div className="flex items-center justify-between border-b border-rule pb-2 mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/80">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>VISUAL ARTWORK</span>
                  </div>
                  <span>SIDE B</span>
                </div>
              )}

              {/* Gambar Mobil (Matty Healy) dengan Stereoscopic Parallax Layers */}
              <div 
                className="relative py-2 text-center group cursor-grab perspective-[1200px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Layer 0: Ambient Depth Silhouette Shadow */}
                <div 
                  ref={carShadowRef}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20 blur-md transition-transform will-change-transform"
                  style={{ transform: 'translateZ(-30px)' }}
                  aria-hidden="true"
                >
                  <img 
                    src="/about_you-removebg-preview.png" 
                    alt="" 
                    className={`w-full h-auto object-contain mx-auto filter brightness-0 ${
                      isSplit 
                        ? 'max-w-[340px]' 
                        : 'max-w-[560px]'
                    }`}
                  />
                </div>

                {/* Layer 1: Main Car & Matty Healy Figure */}
                <div style={{ transformStyle: 'preserve-3d' }}>
                  <img 
                    ref={carImgRef}
                    src="/about_you-removebg-preview.png" 
                    alt="The 1975 - Matty Healy on Car - About You" 
                    className={`w-full h-auto object-contain mx-auto transition-shadow will-change-transform ${
                      isSplit 
                        ? 'max-w-[340px] drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)]' 
                        : 'max-w-[560px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]'
                    }`}
                    style={{ transform: 'translateZ(25px)' }}
                  />
                </div>
                <div className="w-3/4 mx-auto h-[1px] bg-gradient-to-r from-transparent via-rule/40 to-transparent mt-3"></div>
              </div>

              {/* Info Artwork & Status saat di Halaman Kedua (Side B) */}
              {isSplit && (
                <div 
                  ref={rightPanelRef}
                  className="mt-4 pt-3 border-t border-dashed border-rule/50 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-sm tracking-wide uppercase">
                        THE 1975 &bull; ABOUT YOU
                      </h3>
                      <p className="font-serif italic text-xs text-ink/70">
                        Durasi Penuh: 5:26 Menit &bull; Track 10
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-paper font-mono text-[10px] font-bold border border-rule">
                      <Disc3 className={`text-paper ${isPlaying ? 'animate-spin' : ''}`} size={12} />
                      <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Konten Tambahan Mode Cover vs Mode Split */}
            {!isSplit ? (
              <>
                <p className="gsap-cover-quote font-sans font-black text-sm xs:text-base sm:text-2xl md:text-3xl tracking-wide uppercase mt-4 sm:mt-6 mb-6 sm:mb-8 max-w-[700px] leading-snug px-2">
                  "DO YOU THINK I HAVE FORGOTTEN ABOUT YOU?"
                </p>

                {/* Tombol Utama Buka Koran & Tombol Audio Langsung */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleOpenNewspaper}
                    className="gsap-cover-btn group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-ink text-paper border-2 border-rule font-mono text-[11px] xs:text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase shadow-[4px_4px_0px_var(--rule-color)] sm:shadow-[6px_6px_0px_var(--rule-color)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--rule-color)] sm:hover:shadow-[8px_8px_0px_var(--rule-color)] active:translate-x-0 active:translate-y-0 cursor-pointer transition-all"
                  >
                    <Disc3 className="animate-spin group-hover:scale-110 transition-transform shrink-0" size={17} />
                    <span className="truncate">BUKA POSTER KORAN & PUTAR</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform shrink-0" size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 border-2 border-rule bg-paper text-ink font-mono text-[11px] xs:text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-ink hover:text-paper shadow-[3px_3px_0px_var(--rule-color)] cursor-pointer transition-all"
                    title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu Sekarang'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                    <span>{isPlaying ? 'JEDA MUSIK' : 'PUTAR MUSIK SAJA'}</span>
                  </button>
                </div>

                {/* Sub-badge */}
                <div className="gsap-cover-kicker flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] text-ink/70 uppercase tracking-wider mt-5">
                  <Sparkles size={12} />
                  <span>DILENGKAPI FOTO ARSIP, TRACKLIST RESMI &amp; ULASAN EDITORIAL</span>
                  <Sparkles size={12} />
                </div>
              </>
            ) : (
              <>
                {/* Kartu Foto Arsip Tambahan: picture6.jpg */}
                <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)] flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/80">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={13} />
                      <span>ARCHIVE PHOTOGRAPH</span>
                    </div>
                    <span>PLATE NO. 07</span>
                  </div>

                  <div 
                    className="border border-rule overflow-hidden bg-black group relative cursor-pointer"
                    onClick={() => {
                      setSelectedPlate('picture6');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    title="Klik untuk tampilkan di lembaran koran utama"
                  >
                    <img 
                      src="/picture6.jpg" 
                      alt="The 1975 - You Moon Artwork" 
                      className="w-full max-h-[380px] object-cover poster-photo group-hover:filter-none transition-all duration-500 group-hover:scale-105 block mx-auto"
                    />
                    <div className="absolute bottom-2 right-2 bg-paper/95 text-ink text-[10px] font-mono px-2 py-0.5 border border-rule opacity-0 group-hover:opacity-100 transition-opacity">
                      KLIK UNTUK TAMPILKAN DI KORAN
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-ink/80 pt-1 border-t border-dashed border-rule/50">
                    <span className="font-serif italic text-xs">&ldquo;Kamu aku taruh disebuah lagu ini dan bulan ya.&rdquo;</span>
                    <span className="font-bold">&mdash; Miyowo</span>
                  </div>

                  {/* Kisah Kenangan Manyo & Miyowo */}
                  <div className="pt-3 border-t border-rule flex flex-col gap-2.5">
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-ink/80">
                      <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 animate-pulse"></span>
                        <span>MEMOIR &bull; MANYO &amp; MIYOWO</span>
                      </span>
                      <span className="px-1.5 py-0.5 border border-rule/50 bg-ink/5 text-[9px]">
                        FAV: MERAH &bull; BULAN
                      </span>
                    </div>

                    <div className="border border-rule/50 bg-paper-surface/50 p-3 sm:p-3.5 text-xs font-serif leading-[1.75] text-justify space-y-2 text-ink/90">
                      <p>
                        Pada waktu SMA hari sebelum kelulusan itu, aku selalu memandang kagum dengan wajah cantikmu sebagaimana aku ingin sekali memilikimu karena aku mempunyai rasa yang sangat senang bila bersamamu. Kita juga membuat kenangan yang banyak hingga awal masuk perkuliahan pada semester 1 itu aku merasa senang bersamanya.
                      </p>
                      <p>
                        Dulu aku ingat kita pernah saling support, tryout bareng, dan kita saling tukar keluh kesah&mdash;aku menganggap kita pasangan yang paling sempurna. Tetapi setelah menjalani hubungan tersebut tanpa status selama 6 bulan, kita saling terpisah dan berjauhan hingga sekarang.
                      </p>
                      <p>
                        Perasaan tersebut masih saja sama dan ingin rasanya kembali bersama dengan ucapan dia: <span className="font-semibold italic">&ldquo;suatu saat kita pasti bisa jadi pacarmu&rdquo;</span>. Dan aku di sini masih stuck dengan perasaan tersebut karena 2 tahun aku masih menginginkan sesosok kehadiranmu meski kita hanya bisa memantau dari sosial media.
                      </p>
                      <p>
                        Aku juga ingat ketika kita ulang tahun saling memberikan gift yang aku anggap spesial, dan funfact-nya kamu itu first experience-ku. Kalau diingat-ingat kita punya nama panggilan seperti aku (<span className="font-bold">Manyo</span>) dan dia (<span className="font-bold">Miyowo</span>). Karakter dia itu lucu, cantik, mempunyai lesung pipi yang manis, tidak terlalu tinggi. Aku harap kita bertemu dengan versi yang terbaik kita masing-masing.
                      </p>
                      <p>
                        Sekarang aku hanya bisa memantaumu dari kejauhan dan rasa ini masih tetap sama. Aku selalu memutar lagu <span className="italic font-semibold">About You The 1975</span> beserta melihat bulan di malam hari, dan terkadang aku mengabadikan momen tersebut seperti perihal dia pernah bilang: <span className="font-semibold italic">&ldquo;kamu aku taruh disebuah lagu ini dan bulan ya&rdquo;</span>.
                      </p>
                      <div className="border-t border-dashed border-rule/40 pt-2 text-[11px] font-mono leading-relaxed text-center font-bold text-red-700 dark:text-red-400">
                        Favorit warna dia warna merah &bull; Suka sunset &amp; bulan di malam hari &bull; Kamu wanita paling sempurna yang pernah aku temui di tahun 2024 hingga sekarang ;)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kartu Navigasi Kembali ke Cover */}
                <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)] flex flex-col gap-3">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-ink/60 uppercase">
                    EDITORIAL EXCERPT
                  </span>
                  <blockquote className="font-serif italic text-sm leading-relaxed text-ink/90 border-l-2 border-rule pl-3">
                    &ldquo;And I miss you on a train, I miss you in the morning. I never know what to think about. I think about you.&rdquo;
                  </blockquote>

                  <div className="pt-2 border-t border-rule mt-2">
                    <button
                      type="button"
                      onClick={handleBackToCover}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 border-2 border-rule bg-ink text-paper font-mono text-xs font-bold tracking-wider hover:bg-paper hover:text-ink shadow-[3px_3px_0px_var(--rule-color)] transition-all cursor-pointer"
                      title="Kembali ke Halaman Pertama (Cover)"
                    >
                      <ArrowLeft size={15} />
                      <span>KEMBALI KE HALAMAN PERTAMA</span>
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>

        {/* 3. Pemutar Lagu Penuh di Bawah Poster (Mode Split) */}
        <AudioPlayer 
          isPlaying={isPlaying} 
          onTogglePlay={setIsPlaying} 
          currentTrack={currentTrack}
          onSelectTrack={setCurrentTrack}
          visible={isSplit}
        />

        {/* 4. Section Lanjutan Halaman Koran Editorial (Tracklist, Kolom Ulasan, Galeri) */}
        <AlbumTracklist 
          isPlaying={isPlaying} 
          onTogglePlay={setIsPlaying} 
          currentTrack={currentTrack}
          onSelectTrack={setCurrentTrack}
        />
        <EditorialColumns />
        <PhotoArchiveGrid />
      </main>

      {/* 5. Footer Bergaya Koran Vintage */}
      <NewspaperFooter />
    </div>
  );
}
