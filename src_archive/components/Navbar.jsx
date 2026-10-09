import { useState, useEffect } from 'react';
import { Moon, Sun, Printer, Music2, Play, Pause } from 'lucide-react';

export default function Navbar({ isPlaying, onTogglePlay, currentTrack }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="w-full max-w-[1340px] mx-auto px-4 pt-4 pb-2 flex items-center justify-between text-xs font-mono font-bold print:hidden">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-ink text-paper border border-rule max-w-[260px] sm:max-w-none truncate">
          <Music2 size={13} className="shrink-0" />
          <span className="truncate">
            {currentTrack ? `${currentTrack.artist.toUpperCase()} • ${currentTrack.title.toUpperCase()}` : 'THE 1975 • ABOUT YOU'}
          </span>
          {isPlaying && (
            <span className="flex items-end gap-0.5 h-3 ml-0.5 shrink-0" aria-hidden="true" title="Lagu sedang diputar">
              <span className="w-0.5 bg-paper h-2 animate-pulse"></span>
              <span className="w-0.5 bg-paper h-3 animate-pulse delay-75"></span>
              <span className="w-0.5 bg-paper h-1.5 animate-pulse delay-150"></span>
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Tombol Putar / Jeda di Navbar */}
        <button 
          type="button" 
          onClick={() => onTogglePlay(!isPlaying)}
          className="inline-flex items-center gap-1.5 px-3 py-1 border border-rule bg-ink text-paper hover:bg-paper hover:text-ink cursor-pointer transition-colors shadow-[2px_2px_0px_var(--rule-color)]"
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

        {/* Print / Save */}
        <button 
          type="button" 
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1 border border-rule bg-transparent text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors"
          title="Cetak Poster Koran"
        >
          <Printer size={13} />
          <span className="hidden sm:inline">PRINT POSTER</span>
        </button>

        {/* Theme Toggle */}
        <button 
          type="button" 
          onClick={toggleTheme}
          className="inline-flex items-center gap-1.5 px-3 py-1 border border-rule bg-transparent text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors"
          title="Ganti Mode Kertas / Gelap"
        >
          {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          <span>{theme === 'light' ? 'NIGHT' : 'DAY'}</span>
        </button>
      </div>
    </nav>
  );
}
