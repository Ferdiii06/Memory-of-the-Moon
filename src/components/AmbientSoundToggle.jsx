import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

const PRESETS = [
  { id: 'vinyl', label: 'Vinyl & Kertas', filterFreq: 650, crackleProb: 0.9992, crackleAmp: 0.45 },
  { id: 'rain', label: 'Gerimis Hujan', filterFreq: 420, crackleProb: 0.996, crackleAmp: 0.2 },
  { id: 'night', label: 'Malam Sunyi', filterFreq: 260, crackleProb: 0.9998, crackleAmp: 0.1 }
];

function generateNoiseBuffer(ctx, preset) {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    const crackle = Math.random() > preset.crackleProb ? (Math.random() - 0.5) * preset.crackleAmp : 0;
    lastOut = (lastOut * 0.94) + (white * 0.06);
    data[i] = (lastOut * 0.12) + crackle;
  }
  return buffer;
}

export default function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState('vinyl');
  const [showMenu, setShowMenu] = useState(false);

  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const menuRef = useRef(null);

  const startSound = (presetId = currentPreset) => {
    try {
      const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const buffer = generateNoiseBuffer(ctx, preset);

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = preset.filterFreq;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 1.2);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();

      sourceNodeRef.current = noiseSource;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch {
      // Audio context restricted fallback
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.setValueAtTime(
          gainNodeRef.current.gain.value,
          audioCtxRef.current.currentTime
        );
        // Smooth 1s fade-out
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 1.0
        );
        setTimeout(() => {
          if (audioCtxRef.current) {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
          }
        }, 1100);
      } catch {
        if (audioCtxRef.current) audioCtxRef.current.close();
      }
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound(currentPreset);
    }
  };

  const changePreset = (presetId) => {
    setCurrentPreset(presetId);
    setShowMenu(false);
    if (isPlaying) {
      stopSound();
      setTimeout(() => startSound(presetId), 250);
    }
  };

  // Close preset dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showMenu]);

  // Auto-mute listener when MusicColumn plays a song
  useEffect(() => {
    const handleStopAmbient = () => {
      if (isPlaying) {
        stopSound();
      }
    };
    window.addEventListener('warta:stop-ambient', handleStopAmbient);
    return () => window.removeEventListener('warta:stop-ambient', handleStopAmbient);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const activePresetLabel = PRESETS.find((p) => p.id === currentPreset)?.label || 'Vinyl & Kertas';

  return (
    <div ref={menuRef} className="relative inline-flex items-center print:hidden">
      <div className="inline-flex items-center bg-[#f6f3eb] border border-[#d6cebe] rounded-xs divide-x divide-[#d6cebe]">
        {/* Toggle Main Sound Button */}
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans font-medium text-[#57534e] hover:text-[#1c1917] hover:bg-[#eae3d2] transition-colors cursor-pointer"
          title={isPlaying ? 'Heningkan suara ambient' : `Nyalakan suasana: ${activePresetLabel}`}
        >
          {isPlaying ? (
            <>
              <Volume2 size={13} className="text-[#7a2e2e] animate-pulse" />
              {/* Visual audio wave bars */}
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-[#7a2e2e] h-2 animate-[pulse_0.7s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#7a2e2e] h-3 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 bg-[#7a2e2e] h-1.5 animate-[pulse_0.6s_ease-in-out_infinite_0.4s]" />
              </span>
              <span className="text-[11px] font-mono tracking-wider text-[#1c1917]">
                {activePresetLabel}
              </span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="text-[#78716c]" />
              <span className="text-[11px] font-mono tracking-wider">Suasana: Sunyi</span>
            </>
          )}
        </button>

        {/* Preset Selector Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="px-1.5 py-1 text-xs text-[#57534e] hover:text-[#1c1917] hover:bg-[#eae3d2] transition-colors cursor-pointer"
          title="Pilih jenis suasana koran"
          aria-expanded={showMenu}
          aria-label="Pilih opsi suasana latar"
        >
          <ChevronDown size={11} className={`transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Preset Menu Popover */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-[#fcfbf7] border border-[#d6cebe] shadow-lg rounded-xs z-50 py-1 text-xs font-sans divide-y divide-[#f0ebd9]">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#78716c]">
            Pilih Suasana Latar:
          </div>
          <div className="py-1">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => changePreset(p.id)}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#f4efe6] transition-colors cursor-pointer ${
                  currentPreset === p.id ? 'font-semibold text-[#7a2e2e]' : 'text-[#57534e]'
                }`}
              >
                <span>{p.label}</span>
                {currentPreset === p.id && <span className="text-[10px]">&bull;</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
