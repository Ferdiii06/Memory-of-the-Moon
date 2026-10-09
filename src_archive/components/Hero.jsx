import { ArrowLeft, Disc3, Sparkles } from 'lucide-react';

export default function Hero({ onBackToCover, isPlaying }) {
  const [selectedPlate, setSelectedPlate] = useState('subway');
  return (
    <section className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Split-Screen 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_430px] gap-8 items-start">
        
        {/* Kolom Kiri: Poster Koran "ABOUT YOU" Asli */}
        <article className="border-2 border-rule bg-paper text-ink p-3 sm:p-5 md:p-7 shadow-[6px_6px_0px_var(--rule-color)] sm:shadow-[8px_8px_0px_var(--rule-color)] animate-slide-left">
          
          {/* Top Header Block */}
          <div className="border-t border-b border-rule py-3 sm:py-5 px-1 sm:px-3 flex items-center justify-between">
            <div className="w-1/4 text-left font-serif font-bold text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase">
              <div>SPECIAL</div>
              <div>EDITION</div>
            </div>

            <h1 className="w-2/4 text-center font-band font-black italic text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none select-none">
              The 1975
            </h1>

            <div className="w-1/4 text-right font-serif font-bold text-xs sm:text-sm md:text-base leading-tight tracking-wider uppercase">
              <div>DAILY</div>
              <div>REPORT</div>
            </div>
          </div>

          {/* Sub-Header Metadata Bar */}
          <div className="border-b border-rule py-2 px-1 sm:px-2 flex justify-between items-center text-[10px] sm:text-xs font-serif uppercase tracking-widest font-semibold">
            <span>DIRTY HIT RECORDS</span>
            <span className="hidden sm:inline">BEING FUNNY IN FOREIGN LANGUAGE</span>
            <span>14 OKT 2022</span>
          </div>

          {/* Big Centered Title */}
          <div className="py-5 sm:py-8 text-center">
            <h2 className="font-title font-normal text-4xl sm:text-6xl md:text-7xl tracking-[0.16em] sm:tracking-[0.2em] uppercase leading-none select-none">
              ABOUT YOU
            </h2>
          </div>

          {/* Photo Plate Selection Bar */}
          <div className="border-t border-b border-rule py-1.5 px-2 mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="text-ink/60">PRESS PHOTO:</span>
              <button
                type="button"
                onClick={() => setSelectedPlate('subway')}
                className={`px-2 py-0.5 border border-rule cursor-pointer transition-colors ${selectedPlate === 'subway' ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
              >
                PLATE 01 &bull; SUBWAY
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlate('picture1')}
                className={`px-2 py-0.5 border border-rule cursor-pointer transition-colors ${selectedPlate === 'picture1' ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
              >
                PLATE 02 &bull; LOVE IN SILENCE
              </button>
            </div>
            <span className="hidden sm:inline text-ink/60 text-[10px]">KLIK UNTUK GANTI FOTO</span>
          </div>

          {/* Photo Display */}
          <div className="border border-rule w-full overflow-hidden bg-black relative group">
            <img 
              src={selectedPlate === 'subway' ? '/about-you-subway.jpg' : '/picture1.png'} 
              alt={selectedPlate === 'subway' ? 'Metropolitan Ave Subway' : 'I choose to love you in silence'} 
              className={`w-full ${selectedPlate === 'subway' ? 'aspect-[16/9]' : 'max-h-[560px] aspect-[4/3] sm:aspect-[16/10]'} object-cover poster-photo block transition-all duration-300 mx-auto`}
              loading="eager"
            />
            <div className="absolute bottom-2 left-2 bg-paper/95 text-ink text-[10px] font-mono px-2 py-0.5 border border-rule">
              {selectedPlate === 'subway' ? 'FIG. 1.1 — METROPOLITAN AVE SUBWAY STATION' : 'FIG. 1.2 — "I CHOOSE TO LOVE YOU IN SILENCE" (ASH.K)'}
            </div>
          </div>

          {/* Central Bold Quote */}
          <div className="py-4 sm:py-6 text-center">
            <p className="font-sans font-extrabold text-sm sm:text-xl md:text-2xl tracking-wide uppercase leading-tight">
              "DO YOU THINK I HAVE FORGOTTEN ABOUT YOU?"
            </p>
          </div>

          {/* 3-Column Newspaper Lyrics */}
          <div className="border-t border-rule pt-4 sm:pt-6 pb-6 sm:pb-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 text-xs sm:text-[13px] leading-[1.65] font-serif text-justify">
            {/* Column 1 */}
            <div className="space-y-3">
              <p>
                I know a place. It's somewhere I go when I need to remember your face. We get married in our heads. Something to do while we try to recall how we met. Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten about you? You and I (don't let go) were alive (don't let go). With nothing to do, I could lay and just look in your eyes. Wait, and pretend (don't let go).
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <p>
                Hold on and hope that we'll find our way back in the end. Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten, about you? Do you think I have forgotten? Do you think I have forgotten? Do you think I have forgotten, about you? There was something 'bout you that now I can't remember.
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <p>
                It's the same damn thing that made my heart surrender. And I miss you on a train, I miss you in the morning. I never know what to think about. I think about you. About you (so don't let go). Do you think I have forgotten. About you? (Don't let go). About you. About you. Do you think I have forgotten, about you?
              </p>
            </div>
          </div>

          {/* Bottom Footer Metadata */}
          <div className="border-t border-rule pt-2.5 pb-1 px-1 sm:px-2 flex justify-between items-center font-serif text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
            <span>VOL. 1... NO. 1</span>
            <span className="font-mono font-bold">A916°</span>
            <span>10 FEB 2023</span>
          </div>

        </article>

        {/* Kolom Kanan (Dipinggir Kanan): Visual Gambar Mobil Meluncur ke Sisi Ini */}
        <aside className="lg:sticky lg:top-6 flex flex-col gap-6 animate-slide-right">
          
          {/* Box 1: Gambar Mobil Berdiri di Pinggir Kanan */}
          <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)] relative overflow-hidden">
            {/* Header Box */}
            <div className="flex items-center justify-between border-b border-rule pb-2 mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/80">
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>OFFICIAL VISUAL ARTWORK</span>
              </div>
              <span>SIDE B</span>
            </div>

            {/* Gambar about_you-removebg-preview.png */}
            <div className="relative py-2 px-1 text-center group">
              <img 
                src="/about_you-removebg-preview.png" 
                alt="Matty Healy on car - About You artwork" 
                className="w-full max-w-[340px] h-auto object-contain mx-auto drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="w-4/5 mx-auto h-[1px] bg-gradient-to-r from-transparent via-rule/50 to-transparent mt-3"></div>
            </div>

            {/* Caption & Play/Pause Controls */}
            <div className="mt-4 pt-3 border-t border-dashed border-rule/50 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm tracking-wide uppercase">
                    THE 1975 &bull; ABOUT YOU
                  </h3>
                  <p className="font-serif italic text-xs text-ink/70">
                    Lagu Penuh: 5:26 Menit &bull; Track 10
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-ink text-paper font-mono text-[10px] font-bold border border-rule">
                  <Disc3 className={`text-paper ${isPlaying ? 'animate-spin' : ''}`} size={12} />
                  <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Kartu Foto Arsip Tambahan: picture1.png */}
          <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/80">
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>ARCHIVE PHOTOGRAPH</span>
              </div>
              <span>PLATE NO. 02</span>
            </div>

            <div 
              className="border border-rule overflow-hidden bg-black group relative cursor-pointer"
              onClick={() => {
                setSelectedPlate('picture1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Klik untuk tampilkan di lembaran koran utama"
            >
              <img 
                src="/picture1.png" 
                alt="I choose to love you in silence - The 1975 Memorabilia" 
                className="w-full max-h-[380px] object-cover poster-photo group-hover:filter-none transition-all duration-500 group-hover:scale-105 block mx-auto"
              />
              <div className="absolute bottom-2 right-2 bg-paper/95 text-ink text-[10px] font-mono px-2 py-0.5 border border-rule opacity-0 group-hover:opacity-100 transition-opacity">
                KLIK UNTUK TAMPILKAN DI KORAN
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-ink/80 pt-1 border-t border-dashed border-rule/50">
              <span className="font-serif italic text-xs">&ldquo;I choose to love you in silence.&rdquo;</span>
              <span className="font-bold">&mdash; Ash.K</span>
            </div>
          </div>

          {/* Box 3: Kutipan Redaksi & Navigasi Kembali */}
          <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)] flex flex-col gap-3">
            <span className="font-mono text-[10px] font-bold tracking-widest text-ink/60 uppercase">
              EDITORIAL EXCERPT
            </span>
            <blockquote className="font-serif italic text-sm leading-relaxed text-ink/90 border-l-2 border-rule pl-3">
              "And I miss you on a train, I miss you in the morning. I never know what to think about. I think about you."
            </blockquote>

            <div className="pt-2 border-t border-rule mt-2">
              <button
                type="button"
                onClick={onBackToCover}
                className="w-full inline-flex items-center justify-center gap-2 py-2 border border-rule font-mono text-xs font-bold tracking-wider hover:bg-ink hover:text-paper transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>KEMBALI KE COVER AWAL</span>
              </button>
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
}
