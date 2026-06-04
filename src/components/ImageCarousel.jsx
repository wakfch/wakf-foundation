import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageCarousel({ images, title = '', height = 360, showNav = true, autoplay = false }) {
  return (
    <div style={{ position: 'relative', height }}>
      <style>{`
        .swiper-wakef { width: 100%; height: 100%; }
        .swiper-wakef .swiper-slide { position: relative; overflow: hidden; }
        .swiper-wakef .swiper-pagination { bottom: 10px; z-index: 10; }
        .swiper-wakef .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: rgba(255,255,255,.55);
          opacity: 1;
          transition: background .25s, transform .25s;
        }
        .swiper-wakef .swiper-pagination-bullet-active {
          background: #c8a951;
          transform: scale(1.3);
        }
        .swiper-wakef .swiper-button-prev,
        .swiper-wakef .swiper-button-next {
          color: #ffffff;
          background: rgba(30,82,41,.75);
          width: 38px; height: 38px;
          border-radius: 50%;
          transition: background .2s, transform .2s;
        }
        .swiper-wakef .swiper-button-prev:hover,
        .swiper-wakef .swiper-button-next:hover {
          background: rgba(30,82,41,1);
          transform: scale(1.08);
        }
        .swiper-wakef .swiper-button-prev::after,
        .swiper-wakef .swiper-button-next::after {
          font-size: 14px; font-weight: 800;
        }
        .swiper-wakef .swiper-button-disabled { opacity: 0.3; }

        .swiper-mini { width: 100%; height: 100%; }
        .swiper-mini .swiper-slide { position: relative; overflow: hidden; }
        .swiper-mini .swiper-pagination { bottom: 6px; }
        .swiper-mini .swiper-pagination-bullet {
          width: 6px; height: 6px;
          background: rgba(255,255,255,.5);
          opacity: 1;
        }
        .swiper-mini .swiper-pagination-bullet-active {
          background: #c8a951;
        }
        .swiper-mini .swiper-button-prev,
        .swiper-mini .swiper-button-next {
          color: #ffffff;
          background: rgba(30,82,41,.7);
          width: 28px; height: 28px;
          border-radius: 50%;
        }
        .swiper-mini .swiper-button-prev::after,
        .swiper-mini .swiper-button-next::after {
          font-size: 11px; font-weight: 800;
        }
      `}</style>

      <Swiper
        className={height < 260 ? 'swiper-mini' : 'swiper-wakef'}
        modules={[Navigation, Pagination, ...(autoplay ? [Autoplay] : [])]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={showNav}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={autoplay ? { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img.src}
              alt={img.caption || `${title} — photo ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            {img.caption && height >= 260 && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 100%)',
                padding: '32px 18px 38px',
                pointerEvents: 'none',
              }}>
                <span style={{ color: 'rgba(255,255,255,.92)', fontSize: 13, fontWeight: 500, letterSpacing: '.01em' }}>
                  {img.caption}
                </span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
