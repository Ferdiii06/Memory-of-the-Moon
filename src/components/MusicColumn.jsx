import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play, Square, ExternalLink, Disc3, Music2 } from 'lucide-react';
import { MUSIC_SECTION_META, SONGS_DATA } from '../data/songs';

gsap.registerPlugin(ScrollTrigger);

export default function MusicColumn() {
  const containerRef = useRef(null);
  const [activeSongId, setActiveSongId] = useState(null);

  // Check if an embedId is valid (not a placeholder)
  const isConfigured = (embedId) => {
    return Boolean(embedId && !embedId.includes('[ISI SENDIRI]') && embedId.trim().length > 3);
  };

  const handleTogglePlay = (songId) => {
    if (activeSongId === songId) {
      setActiveSongId(null);
    } else {
      // 1. Auto-mute ambient background sound
      window.dispatchEvent(new CustomEvent('warta:stop-ambient'));
      // 2. Set new active song (automatically closes any previously playing song)
      setActiveSongId(songId);
    }
  };

  // Entrance animations on scroll
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header entrance
      gsap.from('.music-header', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Cards ink-sweep entrance
      gsap.fromTo('.music-card',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.music-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Vinyl disks entrance
      gsap.from('.vinyl-disk-wrapper', {
        scale: 0.88,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.music-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5
      });
    });
  }, { scope: containerRef });

  // Vinyl rotation and tonearm movement sync
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    SONGS_DATA.forEach((song) => {
      const disc = document.querySelector(`.vinyl-disc-${song.id}`);
      const tonearm = document.querySelector(`.tonearm-${song.id}`);
      if (!disc || !tonearm) return;

      if (activeSongId === song.id) {
        // Drop tonearm onto record
        gsap.to(tonearm, {
          rotation: 19,
          transformOrigin: '28px 4px',
          duration: 0.85,
          ease: 'power2.out'
        });

        // Continuous vinyl rotation loop
        gsap.to(disc, {
          rotation: '+=360',
          duration: 5.5,
          ease: 'none',
          repeat: -1
        });
      } else {
        // Lift tonearm back to rest
        gsap.to(tonearm, {
          rotation: 0,
          transformOrigin: '28px 4px',
          duration: 0.65,
          ease: 'power2.inOut'
        });

        // Slow down vinyl rotation to a smooth halt
        gsap.killTweensOf(disc);
        gsap.to(disc, {
          rotation: '+=60',
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    });
  }, [activeSongId]);

  return (
    <section
      id="rubrik-musik"
      ref={containerRef}
      className="w-full py-12 border-b border-[#d6cebe]"
    >
      {/* Section Rubric Header */}
      <div className="music-header flex items-center justify-between pb-3 mb-8 border-b border-[#1c1917] text-xs font-sans tracking-widest uppercase text-[#57534e]">
        <div className="flex items-center gap-2">
          <Music2 size={13} className="text-[#7a2e2e]" />
          <span className="font-semibold text-[#1c1917]">{MUSIC_SECTION_META.rubric}</span>
        </div>
        <span>2 LAGU TERARSIP</span>
      </div>

      <div className="music-header text-center max-w-2xl mx-auto mb-10">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-2">
          {MUSIC_SECTION_META.title}
        </h3>
        <p className="font-editorial text-base text-[#57534e] italic">
          {MUSIC_SECTION_META.subtitle}
        </p>
      </div>

      {/* Two Songs Grid: 2 columns on desktop, stacked on mobile */}
      <div className="music-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        {SONGS_DATA.map((song) => {
          const isPlaying = activeSongId === song.id;
          const configured = isConfigured(song.embedId);

          return (
            <article
              key={song.id}
              className="music-card bg-[#f9f7f2] border border-[#d6cebe] p-5 sm:p-6 rounded-xs shadow-2xs flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#8c8273]"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e5ded0] text-[11px] font-mono uppercase tracking-wider text-[#78716c]">
                  <span className="font-semibold text-[#7a2e2e] stamp-seal px-1.5 py-0.2 text-[10px]">
                    EDISI MUSIK
                  </span>
                  <span>RILIS {song.year}</span>
                </div>

                {/* Turntable / Vinyl Record Visual Frame */}
                <div className="vinyl-disk-wrapper relative w-full h-44 bg-[#f4efe6] border border-[#d6cebe] rounded-xs mb-4 flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle turntable platter shadow */}
                  <div className="absolute w-36 h-36 rounded-full bg-[#1c1a17]/10 blur-xs" />

                  {/* Vinyl Record Disc (SVG) */}
                  <div
                    className={`vinyl-disc-${song.id} relative w-32 h-32 rounded-full shadow-lg flex items-center justify-center select-none`}
                    style={{
                      background: 'radial-gradient(circle, #2b2622 0%, #151311 70%, #0d0c0b 100%)'
                    }}
                  >
                    {/* Concentric sound grooves */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#6e665e" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="39" fill="none" stroke="#6e665e" strokeWidth="0.4" />
                      <circle cx="50" cy="50" r="34" fill="none" stroke="#6e665e" strokeWidth="0.4" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="#6e665e" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="23" fill="none" stroke="#6e665e" strokeWidth="0.4" />
                    </svg>

                    {/* Light reflection sheen */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none opacity-20"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.2) 60%, transparent 100%)'
                      }}
                    />

                    {/* Center record paper label */}
                    <div className="relative w-12 h-12 rounded-full bg-[#7a2e2e] border-2 border-[#dcb978]/60 flex flex-col items-center justify-center text-center p-0.5">
                      <span className="font-serif text-[7.5px] font-bold text-[#fcfbf7] leading-tight line-clamp-1">
                        {song.title}
                      </span>
                      <span className="font-mono text-[5.5px] text-[#dcb978] uppercase mt-0.5">
                        {song.artist}
                      </span>
                      {/* Center spindle hole */}
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1c1917] border border-[#dcb978]/40 mt-0.5" />
                    </div>
                  </div>

                  {/* Turntable Tonearm (SVG) in Top-Right Corner */}
                  <div className="absolute right-4 top-3 w-10 h-24 pointer-events-none z-10">
                    <svg viewBox="0 0 40 90" className="w-full h-full overflow-visible">
                      {/* Pivot base */}
                      <circle cx="28" cy="8" r="5" fill="#8c8273" stroke="#1c1917" strokeWidth="1" />
                      <circle cx="28" cy="8" r="2" fill="#1c1917" />
                      {/* Arm rod with pivot */}
                      <g className={`tonearm-${song.id}`}>
                        <line x1="28" y1="8" x2="16" y2="60" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="16" y1="60" x2="10" y2="76" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
                        {/* Cartridge head & stylus needle */}
                        <rect x="7" y="74" width="7" height="11" rx="1.5" transform="rotate(-15 10 78)" fill="#1c1917" stroke="#7a2e2e" strokeWidth="1" />
                        <circle cx="9" cy="86" r="1" fill="#dcb978" />
                      </g>
                    </svg>
                  </div>

                  {/* Status Indicator Badge */}
                  <div className="absolute bottom-2 left-3">
                    {isPlaying ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#7a2e2e] bg-[#fcfbf7] px-2 py-0.5 border border-[#d6cebe] rounded-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7a2e2e] animate-ping" />
                        Sedang Berputar
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#78716c] bg-[#fcfbf7]/80 px-2 py-0.5 border border-[#d6cebe] rounded-xs">
                        <Disc3 size={10} />
                        Siap Diputar
                      </span>
                    )}
                  </div>
                </div>

                {/* Song Title & Artist */}
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] leading-tight mb-1">
                  {song.title}
                </h4>
                <p className="font-editorial text-sm sm:text-base italic text-[#7a2e2e] font-medium mb-3">
                  {song.artist} ({song.year})
                </p>

                {/* Owner's Editorial Caption */}
                <p className="font-editorial text-[14px] sm:text-[14.5px] text-[#44403c] leading-relaxed text-justify mb-5 pl-2.5 border-l-2 border-[#d6cebe]">
                  {song.caption}
                </p>
              </div>

              {/* Player Area & Action Bar */}
              <div>
                {/* Embed Player Area (Lazy-Loaded only when user clicks play) */}
                {isPlaying && configured && (
                  <div className="mb-4 overflow-hidden rounded-xs border border-[#d6cebe] bg-[#1c1917] transition-all">
                    {song.provider === 'spotify' ? (
                      <iframe
                        src={`https://open.spotify.com/embed/track/${song.embedId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="80"
                        title={`Spotify Player: ${song.title} - ${song.artist}`}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-full border-0 block"
                      />
                    ) : (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${song.embedId}?autoplay=1&rel=0`}
                        width="100%"
                        height="180"
                        title={`YouTube Player: ${song.title} - ${song.artist}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        loading="lazy"
                        className="w-full border-0 block"
                      />
                    )}
                  </div>
                )}

                {/* Placeholder Notice if embedId is not configured */}
                {isPlaying && !configured && (
                  <div className="mb-4 p-3 bg-[#eae3d2]/60 border border-[#d6cebe] rounded-xs text-center">
                    <p className="font-editorial italic text-xs text-[#57534e] mb-1">
                      Lagu belum dihubungkan ke penyedia pemutar.
                    </p>
                    <p className="font-mono text-[10px] text-[#78716c]">
                      Masukkan ID track Spotify pada berkas <code>src/data/songs.js</code>.
                    </p>
                  </div>
                )}

                {/* Buttons row */}
                <div className="pt-3 border-t border-[#e5ded0] flex flex-wrap items-center justify-between gap-2">
                  {/* Play / Stop Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePlay(song.id)}
                    aria-label={isPlaying ? `Hentikan putaran ${song.title}` : `Putar ${song.title}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-[#7a2e2e] text-[#fcfbf7] hover:bg-[#5a1e1e]'
                        : 'bg-[#1c1917] text-[#fcfbf7] hover:bg-[#7a2e2e]'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square size={11} fill="currentColor" />
                        <span>Hentikan</span>
                      </>
                    ) : (
                      <>
                        <Play size={11} fill="currentColor" />
                        <span>Putar Lagu</span>
                      </>
                    )}
                  </button>

                  {/* External Streaming Link */}
                  {song.externalUrl && !song.externalUrl.includes('[ISI SENDIRI]') ? (
                    <a
                      href={song.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans text-[#78716c] hover:text-[#1c1917] transition-colors"
                      title={`Dengarkan ${song.title} di ${song.provider === 'youtube' ? 'YouTube' : 'Spotify'}`}
                    >
                      <span>Buka di {song.provider === 'youtube' ? 'YouTube' : 'Spotify'}</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span className="text-[10.5px] font-mono text-[#a8a29e]">
                      Penyedia: {song.provider === 'youtube' ? 'YouTube' : 'Spotify'}
                    </span>
                  )}
                </div>

                {/* Spotify preview disclaimer note */}
                <div className="mt-2 text-right">
                  <span className="text-[9.5px] font-editorial italic text-[#78716c]">
                    *Cuplikan web ~30 dtk. Buka Spotify untuk lagu penuh.
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial Footer Note */}
      <div className="text-center mt-8 pt-4 border-t border-[#e5ded0]">
        <p className="font-editorial text-xs italic text-[#78716c]">
          {MUSIC_SECTION_META.editorialNote}
        </p>
      </div>
    </section>
  );
}
