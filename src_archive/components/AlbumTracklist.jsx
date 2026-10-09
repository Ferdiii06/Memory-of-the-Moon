import { Play, Pause, Disc3, Sparkles, Pin, Heart } from 'lucide-react';
import { TRACKS } from '../data/tracks';

export default function AlbumTracklist({ 
  isPlaying = false, 
  onTogglePlay, 
  currentTrack = TRACKS[0], 
  onSelectTrack 
}) {
  const isAboutYouCurrent = currentTrack?.id === 'about-you';
  const isAboutYouPlaying = isAboutYouCurrent && isPlaying;

  return (
    <section className="w-full max-w-[1100px] mx-auto my-12 px-3 sm:px-6">
      <div className="border-2 border-rule bg-paper p-4 sm:p-7 shadow-[6px_6px_0px_var(--rule-color)]">
        {/* Header Section */}
        <div className="border-b-2 border-rule pb-3 mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink">
          <div className="flex items-center gap-2">
            <Disc3 size={15} className={`text-ink ${isPlaying ? 'animate-spin' : ''}`} />
            <span>DIRTY HIT CATALOGUE &bull; DH01482 &bull; 33⅓ RPM</span>
          </div>
          <span className="px-2 py-0.5 border border-rule bg-ink text-paper text-[10px]">
            OFFICIAL TRACKLIST
          </span>
        </div>

        {/* Section Title */}
        <div className="text-center mb-6">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/70 mb-1 flex items-center justify-center gap-2">
            <Sparkles size={11} />
            <span>BEING FUNNY IN A FOREIGN LANGUAGE &bull; SPECIAL EDITION</span>
            <Sparkles size={11} />
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
            SUSUNAN LAGU RESMI
          </h2>
          <div className="w-24 h-[2px] bg-rule mx-auto mt-3"></div>
        </div>

        {/* Pinned Spotlight Card: About You (Lagu Kesukaan Dia) */}
        <div className="mb-8 border-2 border-rule bg-ink/[0.04] dark:bg-white/[0.04] p-4 sm:p-5 relative shadow-[4px_4px_0px_var(--rule-color)]">
          {/* Top Pinned Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule/30 pb-2.5 mb-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-ink">
              <Pin size={13} className="rotate-45 shrink-0" />
              <span>DISEMATKAN &bull; LAGU KESUKAAN DIA</span>
              <Heart size={12} className="fill-current text-red-600 dark:text-red-400 shrink-0 ml-0.5" />
            </div>
            <span className="px-2 py-0.5 border border-rule bg-ink text-paper text-[9px] sm:text-[10px]">
              PINNED SELECTION
            </span>
          </div>

          {/* Main Pinned Content */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 border-2 border-rule flex items-center justify-center bg-paper shrink-0 shadow-[2px_2px_0px_var(--rule-color)]">
                <Disc3 size={22} className={`text-ink ${isAboutYouPlaying ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-ink/60">TRACK 01.</span>
                  <h3 className="font-serif font-black text-lg sm:text-2xl tracking-wide uppercase">
                    ABOUT YOU
                  </h3>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 border border-rule bg-ink text-paper">
                    <Heart size={9} className="fill-current text-red-400" />
                    FAVORITE
                  </span>
                  {isAboutYouPlaying && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 bg-ink text-paper animate-pulse">
                      NOW PLAYING
                    </span>
                  )}
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-ink/80 mt-0.5">
                  &ldquo;Kamu aku taruh di sebuah lagu ini dan bulan ya.&rdquo;
                </p>
                <p className="font-mono text-[9px] text-red-600 dark:text-red-400 mt-1 tracking-wider uppercase">
                  DUET DENGAN CARLY HOLT &bull; STRING ARR. BY WARREN ELLIS &bull; 5:26
                </p>
              </div>
            </div>

            {onTogglePlay && (
              <button
                type="button"
                onClick={() => {
                  if (isAboutYouCurrent) {
                    onTogglePlay(!isPlaying);
                  } else {
                    const aboutYouTrack = TRACKS.find(t => t.id === 'about-you');
                    if (aboutYouTrack) onSelectTrack?.(aboutYouTrack);
                    onTogglePlay(true);
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 border-2 border-rule bg-ink text-paper hover:bg-paper hover:text-ink cursor-pointer transition-all text-xs font-mono font-bold shadow-[2px_2px_0px_var(--rule-color)] shrink-0"
                title={isAboutYouPlaying ? 'Jeda Lagu Kesukaan' : 'Putar Lagu Kesukaan'}
              >
                {isAboutYouPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                <span>{isAboutYouPlaying ? 'JEDA LAGU KESUKAAN' : 'PUTAR LAGU KESUKAAN'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Editorial Tracklist Table */}
        <div className="divide-y divide-rule/30 font-mono text-xs">
          {TRACKS.map((t) => {
            const isPinned = t.pinned;
            const isCurrent = currentTrack?.id === t.id;
            const isThisPlaying = isCurrent && isPlaying;

            return (
              <div 
                key={t.id || t.no}
                className={`py-3 px-2 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                  isCurrent
                    ? 'bg-ink/10 dark:bg-paper-surface/40 border-l-4 border-l-ink font-bold shadow-[2px_2px_0px_var(--rule-color)]'
                    : isPinned
                    ? 'bg-ink/[0.04] dark:bg-paper-surface/20 border-l-2 border-l-ink/60'
                    : 'hover:bg-ink/[0.03]'
                }`}
              >
                {/* Left: Track Number & Title */}
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <span className="font-serif text-sm sm:text-base font-bold text-ink/60 shrink-0 w-6">
                    {t.no}.
                  </span>
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-serif text-sm sm:text-base tracking-wide uppercase ${isCurrent ? 'font-black underline decoration-rule/60' : 'font-semibold'}`}>
                        {t.title}
                      </span>
                      {isPinned && (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 bg-ink text-paper tracking-wider">
                          <Pin size={9} className="rotate-45" />
                          <span>PINNED &bull; KESUKAAN DIA</span>
                          <Heart size={8} className="fill-current text-red-400" />
                        </span>
                      )}
                      {isThisPlaying && (
                        <span className="inline-flex items-end gap-0.5 h-3 px-1 bg-ink text-paper" title="Sedang diputar">
                          <span className="w-0.5 bg-paper h-2 animate-pulse"></span>
                          <span className="w-0.5 bg-paper h-3 animate-pulse delay-75"></span>
                          <span className="w-0.5 bg-paper h-1.5 animate-pulse delay-150"></span>
                        </span>
                      )}
                    </div>
                    {t.note && (
                      <div className="font-mono text-[9px] text-red-600 dark:text-red-400 mt-0.5 tracking-wider">
                        {t.note}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Credits, Duration, & Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 text-ink/75 shrink-0 pl-9 sm:pl-0">
                  <span className="hidden md:inline font-mono text-[10px] text-ink/50 truncate max-w-[200px]">
                    {t.writer}
                  </span>
                  <span className="font-mono text-xs font-bold">
                    {t.duration}
                  </span>

                  {onTogglePlay && (
                    <button
                      type="button"
                      onClick={() => {
                        if (isCurrent) {
                          onTogglePlay(!isPlaying);
                        } else {
                          onSelectTrack?.(t);
                          onTogglePlay(true);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 border border-rule cursor-pointer transition-colors text-[10px] font-mono font-bold shadow-[2px_2px_0px_var(--rule-color)] ${
                        isThisPlaying 
                          ? 'bg-ink text-paper hover:bg-paper hover:text-ink' 
                          : 'bg-paper text-ink hover:bg-ink hover:text-paper'
                      }`}
                      title={isThisPlaying ? `Jeda ${t.title}` : `Putar ${t.title}`}
                    >
                      {isThisPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                      <span>{isThisPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-rule/40 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-ink/65">
          <span>EDISI SPESIAL KURASI 4 LAGU &bull; THE 1975</span>
          <span>&ldquo;KAMU AKU TARUH DI SEBUAH LAGU INI DAN BULAN YA&rdquo;</span>
        </div>
      </div>
    </section>
  );
}
