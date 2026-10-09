import { useState } from 'react';
import { Camera, Sparkles, X, ZoomIn } from 'lucide-react';

const ARCHIVE_PHOTOS = [
  {
    id: 'exp01',
    src: '/picture1.png',
    frame: 'EXP 01',
    title: 'The Subway Car Reverie',
    date: 'OCT 2022',
    caption: 'Di antara gemerlap lampu gerbong kereta malam dan bayang masa lalu.'
  },
  {
    id: 'exp02',
    src: '/picture2.jpg',
    frame: 'EXP 02',
    title: 'The Microphone Stand',
    date: 'NOV 2022',
    caption: 'Siluet vokal yang melantunkan bait-bait penuh harap.'
  },
  {
    id: 'exp03',
    src: '/picture3.jpg',
    frame: 'EXP 03',
    title: 'Stage Fog & Reverberation',
    date: 'DEC 2022',
    caption: 'Dinding suara shoegaze yang menyelimuti riuh penonton.'
  },
  {
    id: 'exp04',
    src: '/picture4.jpg',
    frame: 'EXP 04',
    title: 'Monochrome Intimacy',
    date: 'JAN 2023',
    caption: 'Potret hitam putih yang mengabadikan kedekatan tanpa kata.'
  },
  {
    id: 'exp05',
    src: '/picture5.jpg',
    frame: 'EXP 05',
    title: 'The Studio Sessions',
    date: 'FEB 2023',
    caption: 'Perekaman string orchestra yang mengiris kalbu di Wiltshire.'
  },
  {
    id: 'exp06',
    src: '/picture6.jpg',
    frame: 'EXP 06',
    title: 'You & The Midnight Moon',
    date: 'OCT 2024',
    caption: 'Kamu aku taruh disebuah lagu ini dan bulan ya.'
  }
];

export default function PhotoArchiveGrid() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="w-full max-w-[1100px] mx-auto my-12 px-3 sm:px-6">
      <div className="border-2 border-rule bg-paper p-4 sm:p-7 shadow-[6px_6px_0px_var(--rule-color)]">
        {/* Header Ribbon */}
        <div className="border-b-2 border-rule pb-2 mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink">
          <div className="flex items-center gap-2">
            <Camera size={14} className="text-red-600 dark:text-red-400" />
            <span>35MM CONTACT SHEET &bull; MONOCHROME ARCHIVE</span>
          </div>
          <span>ILFORD HP5 PLUS 400</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/70 mb-1 flex items-center justify-center gap-2">
            <Sparkles size={11} />
            <span>VISUAL DOCUMENTATION</span>
            <Sparkles size={11} />
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
            GALERI ARSIP HITAM-PUTIH
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-ink/75 mt-2">
            Klik foto untuk memperbesar lembaran arsip film analog.
          </p>
          <div className="w-24 h-[2px] bg-rule mx-auto mt-3"></div>
        </div>

        {/* 6-Photo Contact Sheet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ARCHIVE_PHOTOS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer border-2 border-rule bg-paper p-2.5 shadow-[3px_3px_0px_var(--rule-color)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--rule-color)] transition-all duration-300 relative overflow-hidden"
            >
              {/* 35mm Film Top Bar */}
              <div className="flex items-center justify-between border-b border-rule/50 pb-1 mb-2 font-mono text-[9px] font-bold text-ink/70 uppercase tracking-wider">
                <span>{item.frame}</span>
                <span className="flex items-center gap-1 group-hover:text-ink">
                  <ZoomIn size={10} />
                  <span>PERBESAR</span>
                </span>
              </div>

              {/* Photo Box with Analog Film Effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black border border-rule/50">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover poster-photo transition-all duration-500 group-hover:scale-105 group-hover:filter-none"
                />

                {/* Film Notch Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                  <p className="font-serif italic text-paper text-xs leading-snug drop-shadow-md line-clamp-2">
                    &ldquo;{item.caption}&rdquo;
                  </p>
                </div>
              </div>

              {/* Caption Bottom Bar */}
              <div className="mt-2.5 pt-1.5 border-t border-rule/30 flex items-center justify-between font-mono text-[10px] text-ink">
                <span className="font-serif font-bold truncate pr-2 uppercase">
                  {item.title}
                </span>
                <span className="text-ink/60 shrink-0 text-[9px]">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="max-w-[720px] w-full border-2 border-rule bg-paper text-ink p-4 sm:p-6 shadow-[10px_10px_0px_var(--rule-color)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-rule pb-2 mb-4 font-mono text-xs font-bold uppercase">
              <span>{activePhoto.frame} &bull; {activePhoto.title}</span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="p-1 border border-rule hover:bg-ink hover:text-paper cursor-pointer transition-colors"
                title="Tutup"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="border border-rule bg-black overflow-hidden max-h-[60vh] flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[60vh] w-auto object-contain poster-photo block mx-auto"
              />
            </div>

            {/* Modal Caption */}
            <div className="mt-4 pt-3 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
              <p className="font-serif italic text-sm text-ink/90">
                &ldquo;{activePhoto.caption}&rdquo;
              </p>
              <span className="text-[10px] text-ink/60 font-mono shrink-0">
                ARSIP RESMI THE 1975 &bull; {activePhoto.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
