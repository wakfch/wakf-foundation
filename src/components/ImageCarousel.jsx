import { useState, useEffect, useCallback, useRef } from 'react';

export default function ImageCarousel({ images, title = '', height = 280, showNav = false, autoplay = false }) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);
  const total = images.length;

  const goTo = useCallback((next) => {
    if (animating) return;
    setAnimating(true);
    setIdx((next + total) % total);
    setTimeout(() => setAnimating(false), 400);
  }, [animating, total]);

  const prev = () => goTo(idx - 1);
  const next = () => goTo(idx + 1);

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => goTo((idx + 1) % total), 4000);
    return () => clearInterval(timerRef.current);
  }, [autoplay, idx, total, goTo]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      style={{ position: 'relative', height, overflow: 'hidden', background: '#f0f0f0', borderRadius: 'inherit', userSelect: 'none' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        .carousel-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: opacity .4s ease;
        }
        .carousel-img.active { opacity: 1; z-index: 2; }
        .carousel-img.inactive { opacity: 0; z-index: 1; }
        .carousel-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 100%);
          padding: 24px 16px 36px; z-index: 5; pointer-events: none;
        }
        .carousel-dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 10;
        }
        .carousel-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,.5);
          background: rgba(255,255,255,.4);
          cursor: pointer; transition: background .25s, transform .25s;
          padding: 0;
        }
        .carousel-dot.active { background: #c8a951; border-color: #c8a951; transform: scale(1.25); }
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 10; width: 36px; height: 36px; border-radius: 50%;
          background: rgba(30,82,41,.8); color: #fff; border: none;
          font-size: 14px; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .carousel-btn:hover { background: rgba(30,82,41,1); }
        .carousel-btn.prev { left: 12px; }
        .carousel-btn.next { right: 12px; }
      `}</style>

      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.caption || `${title} — photo ${i + 1}`}
          className={`carousel-img ${i === idx ? 'active' : 'inactive'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {images[idx]?.caption && (
        <div className="carousel-caption">
          <span style={{ color: 'rgba(255,255,255,.9)', fontSize: 12, fontWeight: 500 }}>
            {images[idx].caption}
          </span>
        </div>
      )}

      {showNav && (
        <>
          <button className="carousel-btn prev" onClick={prev} aria-label="Photo précédente">‹</button>
          <button className="carousel-btn next" onClick={next} aria-label="Photo suivante">›</button>
        </>
      )}

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === idx ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
