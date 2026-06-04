import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageCarousel({ images, title = '', height = 280, showNav = false, autoplay = false }) {
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      <style>{`
        .swiper-wakef {
          width: 100%;
          height: 100%;
        }
        .swiper-wakef .swiper-slide {
          position: relative;
          overflow: hidden;
        }
        .swiper-wakef .swiper-pagination {
          bottom: 12px;
          z-index: 20;
        }
        .swiper-wakef .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,.5);
          opacity: 1;
          margin: 0 4px;
          transition: background .25s, transform .25s;
          border: 1.5px solid rgba(255,255,255,.4);
        }
        .swiper-wakef .swiper-pagination-bullet-active {
          background: #c8a951;
          border-color: #c8a951;
          transform: scale(1.25);
        }
        .swiper-wakef .swiper-button-prev,
        .swiper-wakef .swiper-button-next {
          color: #ffffff;
          background: rgba(30,82,41,.8);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: background .2s;
        }
        .swiper-wakef .swiper-button-prev:hover,
        .swiper-wakef .swiper-button-next:hover {
          background: rgba(30,82,41,1);
        }
        .swiper-wakef .swiper-button-prev::after,
        .swiper-wakef .swiper-button-next::after {
          font-size: 13px;
          font-weight: 800;
        }
      `}</style>

      <Swiper
        className="swiper-wakef"
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
            {img.caption && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 100%)',
                padding: '28px 16px 36px',
                pointerEvents: 'none',
              }}>
                <span style={{ color: 'rgba(255,255,255,.9)', fontSize: 12, fontWeight: 500, letterSpacing: '.02em' }}>
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
