import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageCarousel({ images, title = '', height = 280, showNav = true, autoplay = false, onImageClick, imageCursor = 'zoom-in' }) {
  const { t } = useTranslation();
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
          z-index: 10; width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,.88); color: var(--green); border: none;
          box-shadow: var(--shadow-md); cursor: pointer; padding: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .carousel-btn:hover { background: var(--white); }
        .carousel-btn:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
        .carousel-btn svg { width: 22px; height: 22px; display: block; }
        /* Côtés logiques : en arabe (dir="rtl") la flèche précédente passe à droite, la suivante à gauche, et les chevrons sont retournés */
        .carousel-btn.prev { inset-inline-start: 12px; }
        .carousel-btn.next { inset-inline-end: 12px; }
        html[dir="rtl"] .carousel-btn svg { transform: scaleX(-1); }
      `}</style>

      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.caption || t('common.photoOf', { title, n: i + 1 })}
          className={`carousel-img ${i === idx ? 'active' : 'inactive'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          onClick={onImageClick ? () => onImageClick(i) : undefined}
          style={onImageClick ? { cursor: imageCursor } : undefined}
        />
      ))}

      {images[idx]?.caption && (
        <div className="carousel-caption">
          <span style={{ color: 'rgba(255,255,255,.9)', fontSize: 12, fontWeight: 500 }}>
            {images[idx].caption}
          </span>
        </div>
      )}

      {showNav && total > 1 && (
        <>
          <button type="button" className="carousel-btn prev" onClick={prev} aria-label={t('common.prevPhoto')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="carousel-btn next" onClick={next} aria-label={t('common.nextPhoto')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === idx ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={t('common.photo', { n: i + 1 })}
          />
        ))}
      </div>
    </div>
  );
}
