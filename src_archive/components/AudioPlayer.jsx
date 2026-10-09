import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3, Upload, SkipBack, SkipForward } from 'lucide-react';
import { TRACKS } from '../data/tracks';

export default function AudioPlayer({ 
  isPlaying, 
  onTogglePlay, 
  currentTrack = TRACKS[0], 
  onSelectTrack, 
  visible = true 
}) {
  const [localAudioSrc, setLocalAudioSrc] = useState(null);
  const [hasLocalFile, setHasLocalFile] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' | 'local' | 'spotify'
  const [ytReady, setYtReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack?.durationSec || 326);
  
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const ytPlayerInitRef = useRef(false);
  const timerIntervalRef = useRef(null);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const onTogglePlayRef = useRef(onTogglePlay);
  useEffect(() => {
    onTogglePlayRef.current = onTogglePlay;
  }, [onTogglePlay]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Direct postMessage command to YouTube iframe
  const sendYtCommand = (func, args = []) => {
    try {
      const iframe = iframeRef.current || document.getElementById('youtube-audio-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args
        }), '*');
      }
    } catch (err) {
      console.warn('sendYtCommand warning:', err);
    }
  };

  // Silence all audio sources
  const silenceAll = () => {
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
    }
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try { ytPlayerRef.current.pauseVideo(); } catch {}
    }
    sendYtCommand('pauseVideo');
  };

  // Initialize YouTube Iframe Player API
  useEffect(() => {
    if (ytPlayerInitRef.current) return;

    const setupPlayer = () => {
      if (ytPlayerInitRef.current || !window.YT || !window.YT.Player) return;
      ytPlayerInitRef.current = true;

      try {
        ytPlayerRef.current = new window.YT.Player('youtube-audio-frame', {
          events: {
            onReady: (event) => {
              setYtReady(true);
              try {
                const dur = event.target.getDuration();
                if (dur && dur > 0) setDuration(dur);
                if (isPlayingRef.current) {
                  event.target.playVideo();
                } else {
                  event.target.pauseVideo();
                }
              } catch (err) {
                console.log('YT onReady deferred:', err);
              }
            },
            onStateChange: (event) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                if (!isPlayingRef.current) onTogglePlayRef.current?.(true);
              } else if (event.data === 2) {
                if (isPlayingRef.current) onTogglePlayRef.current?.(false);
              } else if (event.data === 0) {
                if (isPlayingRef.current) onTogglePlayRef.current?.(false);
              }
            }
          }
        });
      } catch (err) {
        console.warn('YouTube Player API hook fallback to postMessage:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        setupPlayer();
      };
    }
  }, []);

  // Track timer interval
  useEffect(() => {
    if (isPlaying) {
      timerIntervalRef.current = setInterval(() => {
        if (playerMode === 'youtube') {
          if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
            try {
              const time = ytPlayerRef.current.getCurrentTime();
              if (typeof time === 'number' && !isNaN(time)) setCurrentTime(time);
              const total = ytPlayerRef.current.getDuration();
              if (total && total > 0) setDuration(total);
            } catch {}
          } else {
            setCurrentTime(prev => (prev < duration ? prev + 1 : prev));
          }
        } else if (playerMode === 'local' && audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          if (audioRef.current.duration) setDuration(audioRef.current.duration);
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isPlaying, playerMode, duration]);

  // Synchronize playback state across all engines
  useEffect(() => {
    if (!isPlaying) {
      silenceAll();
    } else {
      if (playerMode === 'local' && audioRef.current && hasLocalFile) {
        audioRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      } else if (playerMode === 'youtube') {
        let played = false;
        if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
          try {
            ytPlayerRef.current.playVideo();
            played = true;
          } catch {}
        }
        if (!played) {
          sendYtCommand('playVideo');
        }
      }
    }
  }, [isPlaying, playerMode, hasLocalFile, ytReady]);

  // Silence other engines on Spotify
  useEffect(() => {
    if (playerMode === 'spotify') {
      silenceAll();
    }
  }, [playerMode]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
      try {
        ytPlayerRef.current.setVolume(isMuted ? 0 : volume * 100);
      } catch {}
    }
    sendYtCommand('setVolume', [isMuted ? 0 : volume * 100]);
  }, [volume, isMuted, ytReady]);

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalAudioSrc(url);
      setHasLocalFile(true);
      setPlayerMode('local');
      onTogglePlay(true);
    }
  };

  // Handle next / prev track
  const handlePrevTrack = () => {
    const idx = TRACKS.findIndex(t => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + TRACKS.length) % TRACKS.length;
    onSelectTrack?.(TRACKS[prevIdx]);
    if (!isPlaying) onTogglePlay?.(true);
  };

  const handleNextTrack = () => {
    const idx = TRACKS.findIndex(t => t.id === currentTrack.id);
    const nextIdx = (idx + 1) % TRACKS.length;
    onSelectTrack?.(TRACKS[nextIdx]);
    if (!isPlaying) onTogglePlay?.(true);
  };

  // Switch video when currentTrack changes
  const prevTrackIdRef = useRef(currentTrack?.id);
  useEffect(() => {
    if (!currentTrack) return;
    if (prevTrackIdRef.current !== currentTrack.id) {
      prevTrackIdRef.current = currentTrack.id;
      setCurrentTime(0);
      setDuration(currentTrack.durationSec || 300);

      if (playerMode === 'youtube') {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === 'function') {
          try {
            if (isPlaying) {
              ytPlayerRef.current.loadVideoById(currentTrack.youtubeId);
            } else {
              ytPlayerRef.current.cueVideoById(currentTrack.youtubeId);
            }
          } catch (err) {
            console.warn('YT loadVideoById error:', err);
          }
        } else {
          sendYtCommand(isPlaying ? 'loadVideoById' : 'cueVideoById', [currentTrack.youtubeId]);
        }
      }
    }
  }, [currentTrack, isPlaying, playerMode]);

  // Immediate toggle handler
  const handleToggle = () => {
    const next = !isPlaying;
    if (!next) {
      silenceAll();
    }
    onTogglePlay(next);
  };

  return (
    <>
      {/* Persistent YouTube Audio Iframe */}
      <iframe 
        ref={iframeRef}
        id="youtube-audio-frame" 
        src={`https://www.youtube-nocookie.com/embed/${currentTrack?.youtubeId || 'tGv7CUutzqU'}?enablejsapi=1&version=3&controls=0&disablekb=1&fs=0&rel=0&playsinline=1`}
        allow="autoplay; encrypted-media"
        title={`${currentTrack?.title || 'About You'} Official Audio`}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -9999
        }}
      />

      {/* Hidden HTML5 Audio Element */}
      <audio 
        ref={audioRef}
        src={localAudioSrc}
        onEnded={handleNextTrack}
        preload="metadata"
      />

      {/* Vintage Broadsheet Audio Player Card */}
      {visible && (
        <div className="w-full max-w-[1340px] mx-auto px-3 sm:px-6 my-8 print:hidden">
          <div className="border-2 border-rule bg-paper text-ink p-4 sm:p-5 shadow-[6px_6px_0px_var(--rule-color)]">
            {/* Header Strip */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border-b border-rule pb-2.5 mb-3 font-mono text-[11px] sm:text-xs font-bold">
              <div className="flex items-center gap-2 min-w-0">
                <Disc3 className={`text-ink shrink-0 ${isPlaying ? 'animate-spin' : ''}`} size={16} />
                <span className="uppercase tracking-wider truncate">
                  PEMUTAR RESMI: {currentTrack?.artist?.toUpperCase()} &bull; {currentTrack?.title?.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-ink/60">SUMBER:</span>
                <div className="flex border border-rule">
                  <button 
                    type="button"
                    onClick={() => setPlayerMode('youtube')}
                    className={`px-2 sm:px-2.5 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${playerMode === 'youtube' ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
                  >
                    STREAM YT
                  </button>
                  <button 
                    type="button"
                    onClick={() => setPlayerMode('spotify')}
                    className={`px-2 sm:px-2.5 py-0.5 text-[10px] font-bold cursor-pointer transition-colors border-l border-rule ${playerMode === 'spotify' ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
                  >
                    SPOTIFY
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setPlayerMode('local');
                      if (!hasLocalFile && fileInputRef.current) fileInputRef.current.click();
                    }}
                    className={`px-2 sm:px-2.5 py-0.5 text-[10px] font-bold cursor-pointer transition-colors border-l border-rule ${playerMode === 'local' ? 'bg-ink text-paper' : 'hover:bg-ink/10'}`}
                    title={hasLocalFile ? 'Gunakan MP3 Lokal' : 'Pilih file MP3 Anda'}
                  >
                    LOCAL MP3
                  </button>
                </div>
              </div>
            </div>

            {/* Spotify Mode */}
            {playerMode === 'spotify' ? (
              <div className="mt-2 border border-rule">
                <iframe 
                  style={{ borderRadius: '0px' }}
                  src={currentTrack?.spotifyEmbed || "https://open.spotify.com/embed/track/56s1M3kUu8h2mQ63702T0d?utm_source=generator&theme=0"} 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title={`${currentTrack?.artist} - ${currentTrack?.title} Spotify Player`}
                />
              </div>
            ) : (
              /* Broadsheet Audio Controller */
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-1">
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Previous Track Button */}
                  <button
                    type="button"
                    onClick={handlePrevTrack}
                    className="p-2 border border-rule bg-paper text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors shadow-[2px_2px_0px_var(--rule-color)]"
                    title="Lagu Sebelumnya"
                    aria-label="Lagu Sebelumnya"
                  >
                    <SkipBack size={14} />
                  </button>

                  {/* Putar / Jeda Button */}
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-rule bg-ink text-paper hover:bg-paper hover:text-ink font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase cursor-pointer transition-all shadow-[3px_3px_0px_var(--rule-color)] shrink-0"
                    aria-label={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
                    title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={15} />
                        <span>JEDA</span>
                      </>
                    ) : (
                      <>
                        <Play size={15} className="ml-0.5" />
                        <span>PUTAR</span>
                      </>
                    )}
                  </button>

                  {/* Next Track Button */}
                  <button
                    type="button"
                    onClick={handleNextTrack}
                    className="p-2 border border-rule bg-paper text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors shadow-[2px_2px_0px_var(--rule-color)]"
                    title="Lagu Berikutnya"
                    aria-label="Lagu Berikutnya"
                  >
                    <SkipForward size={14} />
                  </button>

                  {/* Track Info with Timer Duration */}
                  <div className="flex flex-col min-w-0 ml-1">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-serif font-black text-sm sm:text-base md:text-lg tracking-wide uppercase leading-tight truncate">
                        {currentTrack?.title}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 bg-ink text-paper shrink-0">
                        {isPlaying ? 'PLAYING' : 'PAUSED'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-ink/75 truncate">
                      <span>{currentTrack?.artist}</span>
                      <span>&bull;</span>
                      <span className="font-bold">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Sound Controls & Equalizer Wave */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-rule/30">
                  {/* Equalizer animation */}
                  {isPlaying && (
                    <div className="flex items-end gap-1 h-5 px-1 sm:px-2 shrink-0" aria-hidden="true">
                      <span className="w-1 bg-ink animate-pulse h-3"></span>
                      <span className="w-1 bg-ink animate-pulse h-5 delay-75"></span>
                      <span className="w-1 bg-ink animate-pulse h-2 delay-150"></span>
                      <span className="w-1 bg-ink animate-pulse h-4 delay-100"></span>
                    </div>
                  )}

                  {/* Volume & Mute */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-ink hover:opacity-70 cursor-pointer"
                      title={isMuted ? 'Buka Suara' : 'Bisu'}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-16 xs:w-20 sm:w-24 accent-ink cursor-pointer"
                      aria-label="Pengatur Volume"
                    />
                  </div>

                  {/* Hidden File Upload for Local MP3 */}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="audio/mp3,audio/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono border border-dashed border-rule px-2 py-1 text-ink hover:bg-ink hover:text-paper cursor-pointer transition-colors"
                    title="Pilih file lagu .mp3 dari komputer Anda"
                  >
                    <Upload size={12} />
                    <span>UNGGAH MP3</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
