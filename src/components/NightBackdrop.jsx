import { useState, useEffect } from 'react';

function getIsLiteMode() {
  if (typeof window === 'undefined') return false;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  const lowCores =
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency <= 4;
  const lowMemory =
    typeof navigator.deviceMemory === 'number' &&
    navigator.deviceMemory <= 4;

  return isMobile || isCoarse || saveData || lowCores || lowMemory;
}

export default function NightBackdrop() {
  const [isLite, setIsLite] = useState(getIsLiteMode);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = () => setIsLite(getIsLiteMode());
    mqMobile.addEventListener('change', handleMediaChange);

    // Jeda animasi saat tab tidak terlihat
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mqMobile.removeEventListener('change', handleMediaChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="nb-backdrop"
      data-nb={isLite ? 'lite' : 'full'}
      data-nb-paused={isPaused ? 'true' : 'false'}
      aria-hidden="true"
    >
      {/* Lapisan 2: Bintang Ubin A & B */}
      <div className="nb-stars-a" />
      <div className="nb-stars-b" />

      {/* Lapisan 3: Glow Bulan Keemasan */}
      <div className="nb-glow" />

      {/* Lapisan 4: Bidang Cahaya Miring Rembulan */}
      <div className="nb-beam" />
    </div>
  );
}
