import { useState, useEffect, useRef, useCallback } from 'react';

export default function ImageLightbox({ images, initialIndex = 0, onClose }) {
  const [idx, setIdx] = useState(initialIndex);
  const touchStartX = useRef(null);
  const total = images.length;

  const goTo = useCallback((next) => {
    setIdx((next + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(idx - 1), [goTo, idx]);
  const next = useCallback(() => goTo(idx + 1), [goTo, idx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={onBackdropClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lb-in .2s ease',
      }}
    >
      <style>{`
        @keyframes lb-in { from { opacity: 0 } to { opacity: 1 } }
        .lb-img { max-width: 90vw; max-height: 88vh; object-fit: contain; border-radius: 6px; display: block; user-select: none; pointer-events: none; }
        .lb-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10000; width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,.12); color: #fff; border: 1.5px solid rgba(255,255,255,.25); font-size: 22px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; backdrop-filter: blur(4px); }
        .lb-btn:hover { background: rgba(255,255,255,.25); }
        .lb-btn.lb-prev { left: 20px; }
        .lb-btn.lb-next { right: 20px; }
        .lb-close { position: absolute; top: 16px; right: 16px; z-index: 10000; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.12); color: #fff; border: 1.5px solid rgba(255,255,255,.25); font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; backdrop-filter: blur(4px); }
        .lb-close:hover { background: rgba(255,255,255,.3); }
        .lb-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10000; }
        .lb-dot { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.5); background: rgba(255,255,255,.35); cursor: pointer; padding: 0; transition: background .2s, transform .2s; }
        .lb-dot.active { background: #c8a951; border-color: #c8a951; transform: scale(1.3); }
        .lb-caption { position: absolute; bottom: 46px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,.75); font-size: 13px; white-space: nowrap; pointer-events: none; }
        .lb-counter { position: absolute; top: 20px; left: 20px; color: rgba(255,255,255,.6); font-size: 13px; z-index: 10000; pointer-events: none; }
      `}</style>

      <button className="lb-close" onClick={onClose} aria-label="Fermer">✕</button>

      <span className="lb-counter">{idx + 1} / {total}</span>

      <img
        key={idx}
        src={images[idx].src}
        alt={images[idx].caption || `Photo ${idx + 1}`}
        className="lb-img"
      />

      {total > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Photo précédente">‹</button>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Photo suivante">›</button>
        </>
      )}

      {images[idx]?.caption && (
        <span className="lb-caption">{images[idx].caption}</span>
      )}

      <div className="lb-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`lb-dot${i === idx ? ' active' : ''}`}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
