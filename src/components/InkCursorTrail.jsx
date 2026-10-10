import { useEffect } from 'react';

export default function InkCursorTrail() {
  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleClick = (e) => {
      // Don't trigger on interactive buttons or links directly to avoid interference
      const target = e.target;
      if (target.closest('button') || target.closest('a')) return;

      const dot = document.createElement('div');
      dot.className = 'ink-drop-ripple';
      dot.style.left = `${e.pageX}px`;
      dot.style.top = `${e.pageY}px`;

      document.body.appendChild(dot);

      dot.addEventListener('animationend', () => {
        dot.remove();
      });

      // Fallback cleanup
      setTimeout(() => {
        if (dot.parentElement) dot.remove();
      }, 900);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <style>{`
      .ink-drop-ripple {
        position: absolute;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #6e1a24;
        opacity: 0.42;
        pointer-events: none;
        transform: translate(-50%, -50%) scale(0.3);
        animation: inkBleed 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        z-index: 9999;
        filter: blur(0.5px);
      }
      @keyframes inkBleed {
        0% {
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0.45;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.6);
          opacity: 0.22;
        }
        100% {
          transform: translate(-50%, -50%) scale(2.8);
          opacity: 0;
        }
      }
    `}</style>
  );
}
