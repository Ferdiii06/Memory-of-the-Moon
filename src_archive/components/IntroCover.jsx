import { useState } from 'react';
import { ArrowRight, Disc3, Sparkles } from 'lucide-react';

export default function IntroCover({ onEnter }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartTransition = () => {
    setIsTransitioning(true);
    // Smooth glide transition to the right before switching to split page
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <section className="min-h-screen flex flex-col justify-between max-w-[920px] mx-auto px-4 py-6 sm:py-8 bg-paper text-ink select-none overflow-x-hidden">
      {/* Top Masthead Strip */}
      <div className={`border-t-[3px] border-t-double border-b-2 border-rule py-3 px-2 flex items-center justify-between font-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <span>VOL. 1 &bull; NO. 1</span>
        <span className="font-band font-black italic text-2xl sm:text-4xl tracking-normal">
          The 1975
        </span>
        <span>SPECIAL EDITION</span>
      </div>

      {/* Main Centerpiece Area */}
      <div className="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        {/* Sub-kicker */}
        <div className={`flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold tracking-widest text-ink/70 uppercase mb-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Sparkles size={13} />
          <span>BEING FUNNY IN A FOREIGN LANGUAGE &bull; TRACK 10</span>
          <Sparkles size={13} />
        </div>

        {/* Big Editorial Title */}
        <h1 className={`font-title font-normal text-5xl sm:text-7xl md:text-8xl tracking-[0.16em] sm:tracking-[0.2em] uppercase leading-none mb-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          ABOUT YOU
        </h1>

        {/* Central Cutout Artwork (Matty Healy on Scratched Car) with Glide Animation */}
        <div 
          className={`relative w-full max-w-[560px] my-2 sm:my-4 transition-all duration-500 ease-in-out ${
            isTransitioning 
              ? 'translate-x-[40vw] scale-75 opacity-90' 
              : 'translate-x-0 scale-100 opacity-100'
          }`}
        >
          <img 
            src="/about_you-removebg-preview.png" 
            alt="The 1975 - Matty Healy on Car - About You" 
            className="w-full h-auto object-contain mx-auto drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
          />
          {/* Subtle ground reflection line */}
          <div className="w-3/4 mx-auto h-[2px] bg-gradient-to-r from-transparent via-rule/40 to-transparent mt-2"></div>
        </div>

        {/* Iconic Lyric Quote */}
        <p className={`font-sans font-black text-base sm:text-2xl md:text-3xl tracking-wide uppercase mt-6 mb-8 max-w-[700px] leading-snug transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          "DO YOU THINK I HAVE FORGOTTEN ABOUT YOU?"
        </p>

        {/* Main Entry Button: Triggers glide and starts music */}
        <button
          type="button"
          onClick={handleStartTransition}
          disabled={isTransitioning}
          className={`group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-ink text-paper border-2 border-rule font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[6px_6px_0px_var(--rule-color)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_var(--rule-color)] active:translate-x-0 active:translate-y-0 cursor-pointer transition-all ${
            isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Disc3 className="animate-spin group-hover:scale-110 transition-transform" size={18} />
          <span>BUKA LEMBARAN KORAN & PUTAR LAGU</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>

      {/* Bottom Imprint Strip */}
      <div className={`border-t border-rule pt-3 pb-1 flex justify-between items-center font-mono text-[10px] sm:text-xs text-ink/60 uppercase transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <span>DIRTY HIT RECORDS &bull; 2022</span>
        <span className="hidden sm:inline">KLIK TOMBOL DI ATAS UNTUK MEMBUKA HALAMAN DUA</span>
        <span>A916&deg; ARCHIVE</span>
      </div>
    </section>
  );
}
