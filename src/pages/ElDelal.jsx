import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageLightbox from '../components/ImageLightbox';

const COTIZUP_URL = 'https://www.cotizup.com/@fondationwakef/mosquee-al-badr-le-locle-notre-nouvelle-maison';

// QR TWINT et IBAN génériques de wakf.ch, identiques à la page /don (choix du 22.09.2026 :
// les dons TWINT pour ce projet ne sont donc plus tracés séparément des dons généraux).
const TWINT = {
  image: '/images/qr-twint-wakf.png',
  iban: 'CH84 0900 0000 1076 1819 4',
};

const PHOTOS = [
  { id: 'aerienne', group: 'exterior', src: '/images/el-delal/aerienne.jpg', w: 1500, h: 813 },
  { id: 'facade', group: 'exterior', src: '/images/el-delal/facade.jpg', w: 1500, h: 1373 },
  { id: 'local', group: 'interior', src: '/images/el-delal/local-commercial.jpg', w: 1500, h: 2000 },
  { id: 'piece', group: 'interior', src: '/images/el-delal/piece-vide.jpg', w: 1500, h: 2000 },
  { id: 'chambre', group: 'interior', src: '/images/el-delal/chambre.jpg', w: 1500, h: 2000 },
  { id: 'sejour', group: 'interior', src: '/images/el-delal/sejour.jpg', w: 1500, h: 1125 },
  { id: 'sdeau', group: 'interior', src: '/images/el-delal/salle-d-eau.jpg', w: 1500, h: 2000 },
];

const UNITS = [
  { key: 'apartments', n: '6' },
  { key: 'shop', n: '1' },
  { key: 'parking', n: '5' },
  { key: 'plots', n: '2' },
];

const MAP_SRC = 'https://www.openstreetmap.org/export/embed.html?bbox=6.7200%2C46.4180%2C6.7800%2C46.4480&layer=mapnik&marker=46.4333%2C6.7500';
const MAP_LINK = 'https://www.openstreetmap.org/?mlat=46.4333&mlon=6.7500#map=15/46.4333/6.7500';

export default function ElDelal() {
  const { t } = useTranslation();
  const [group, setGroup] = useState('exterior');
  const [lightbox, setLightbox] = useState(null);

  const photos = PHOTOS.filter((p) => p.group === group).map((p) => ({ ...p, caption: t(`eldelal.gallery.items.${p.id}`) }));

  return (
    <div className="eld">
      <style>{`
        .eld { --eld-navy: #1b2b4b; --eld-navy-dark: #111c33; --eld-navy-soft: #e9edf4; --eld-grey: #f3f4f6; --eld-grey-line: #e2e5ea; --eld-ink: #1f2937; --eld-muted: #4b5563; color: var(--eld-ink); background: #fff; }
        .eld-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .eld-section { padding: 72px 0; }
        .eld-section--grey { background: var(--eld-grey); }
        .eld-eyebrow { display: block; font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--eld-navy); margin-bottom: 12px; }
        .eld-h2 { font-family: var(--font-heading); font-size: clamp(26px, 3.2vw, 34px); font-weight: 700; color: var(--eld-navy); line-height: 1.2; margin-bottom: 16px; }
        .eld-lead { font-size: 16px; line-height: 1.75; color: var(--eld-muted); max-width: 680px; }

        .eld-hero { position: relative; margin-top: calc(-1 * var(--nav-h)); padding: calc(var(--nav-h) + 72px) 24px 64px; background: linear-gradient(160deg, var(--eld-navy-dark) 0%, var(--eld-navy) 100%); color: #fff; overflow: hidden; }
        .eld-hero__inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr .9fr; gap: 48px; align-items: center; }
        .eld-hero__label { display: block; font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #c9d3e6; margin-bottom: 20px; }
        .eld-hero__title { font-family: var(--font-heading); font-size: clamp(40px, 6vw, 68px); font-weight: 800; line-height: 1.05; margin-bottom: 8px; }
        .eld-hero__ar { display: block; text-align: start; font-family: 'Almarai', sans-serif; font-size: clamp(26px, 3.4vw, 38px); font-weight: 700; color: #dbe3f1; margin-bottom: 8px; }
        .eld-hero__sub { display: block; font-size: 16px; color: #c9d3e6; margin-bottom: 24px; }
        .eld-hero__mission { font-size: 17px; line-height: 1.75; color: #e8edf6; font-weight: 300; max-width: 560px; margin-bottom: 32px; }
        .eld-hero__photo { position: relative; border-radius: 6px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,.35); aspect-ratio: 4 / 3; }
        .eld-hero__photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .eld-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 28px; border-radius: 4px; font-family: var(--font-heading); font-size: 15px; font-weight: 600; text-align: center; border: 2px solid transparent; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
        .eld-btn:focus-visible { outline: 3px solid #93b4ee; outline-offset: 3px; }
        .eld-btn--light { background: #fff; color: var(--eld-navy); }
        .eld-btn--light:hover { background: var(--eld-navy-soft); }
        .eld-btn--navy { background: var(--eld-navy); color: #fff; }
        .eld-btn--navy:hover { background: var(--eld-navy-dark); }
        .eld-btn--lg { min-height: 60px; padding: 16px 40px; font-size: 18px; }

        .eld-subnav { position: sticky; top: var(--nav-h); z-index: 40; background: #fff; border-bottom: 1px solid var(--eld-grey-line); }
        .eld-subnav__list { max-width: 1120px; margin: 0 auto; padding: 0 24px; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
        .eld-subnav__list::-webkit-scrollbar { display: none; }
        .eld-subnav a { flex: 0 0 auto; padding: 14px 14px; font-size: 14px; font-weight: 500; color: var(--eld-muted); border-bottom: 2px solid transparent; }
        .eld-subnav a:hover { color: var(--eld-navy); border-bottom-color: var(--eld-navy); }
        .eld-anchor { scroll-margin-top: calc(var(--nav-h) + 56px); }

        .eld-tabs { display: inline-flex; border: 1px solid var(--eld-navy); border-radius: 4px; overflow: hidden; margin: 28px 0 24px; }
        .eld-tab { min-height: 44px; padding: 10px 24px; background: #fff; color: var(--eld-navy); font-family: var(--font-body); font-size: 14px; font-weight: 600; border: 0; cursor: pointer; }
        .eld-tab[aria-selected="true"] { background: var(--eld-navy); color: #fff; }
        .eld-tab:focus-visible { outline: 3px solid #93b4ee; outline-offset: -3px; }
        .eld-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .eld-thumb { position: relative; display: block; width: 100%; padding: 0; border: 0; background: var(--eld-grey); cursor: zoom-in; border-radius: 4px; overflow: hidden; aspect-ratio: 4 / 3; text-align: start; }
        .eld-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .eld-thumb:hover img { transform: scale(1.03); }
        .eld-thumb:focus-visible { outline: 3px solid var(--eld-navy); outline-offset: 3px; }
        .eld-thumb__cap { position: absolute; inset-inline: 0; bottom: 0; padding: 28px 14px 12px; background: linear-gradient(transparent, rgba(17,28,51,.85)); color: #fff; font-size: 13px; font-weight: 500; }

        .eld-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 32px; border: 1px solid var(--eld-grey-line); background: #fff; }
        .eld-stat { padding: 28px 24px; border-inline-end: 1px solid var(--eld-grey-line); }
        .eld-stat:last-child { border-inline-end: 0; }
        .eld-stat__label { display: block; font-size: 13px; font-weight: 600; color: var(--eld-muted); margin-bottom: 8px; }
        .eld-stat__value { display: block; font-family: var(--font-heading); font-size: clamp(24px, 3vw, 32px); font-weight: 700; color: var(--eld-navy); line-height: 1.2; }
        .eld-stat--goal { background: var(--eld-navy); }
        .eld-stat--goal .eld-stat__label { color: #c9d3e6; }
        .eld-stat--goal .eld-stat__value { color: #fff; }
        .eld-units { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 24px; }
        .eld-unit { padding: 20px; background: #fff; border: 1px solid var(--eld-grey-line); border-radius: 4px; }
        .eld-unit__n { display: block; font-family: var(--font-heading); font-size: 36px; font-weight: 700; color: var(--eld-navy); line-height: 1; margin-bottom: 8px; }
        .eld-unit__t { font-size: 14px; color: var(--eld-muted); line-height: 1.4; }
        .eld-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
        .eld-fact { padding: 20px 24px; background: #fff; border: 1px solid var(--eld-grey-line); border-radius: 4px; }
        .eld-fact dt { font-size: 13px; font-weight: 600; color: var(--eld-muted); margin-bottom: 6px; }
        .eld-fact dd { margin: 0; font-size: 17px; font-weight: 600; color: var(--eld-navy); line-height: 1.4; }

        .eld-contribute { background: var(--eld-navy); color: #fff; padding: 80px 0; }
        .eld-contribute__box { display: grid; grid-template-columns: 1.2fr 1fr; gap: 56px; align-items: center; }
        .eld-contribute .eld-eyebrow { color: #c9d3e6; }
        .eld-contribute__lead { font-family: var(--font-heading); font-size: clamp(28px, 3.6vw, 40px); font-weight: 700; line-height: 1.2; margin-bottom: 20px; }
        .eld-contribute__text { font-size: 17px; line-height: 1.7; color: #e8edf6; margin-bottom: 28px; max-width: 520px; }
        .eld-contribute__note { margin-top: 20px; font-size: 14px; color: #c9d3e6; }
        .eld-qr { background: #fff; color: var(--eld-ink); border-radius: 6px; padding: 28px; text-align: center; }
        .eld-qr__text { font-size: 14px; line-height: 1.6; color: var(--eld-muted); margin-bottom: 16px; }
        .eld-qr img { display: block; width: 200px; max-width: 100%; height: auto; margin: 0 auto 12px; }
        .eld-qr__name { font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--eld-navy); }
        .eld-qr__iban { margin-top: 6px; font-size: 13px; color: var(--eld-muted); overflow-wrap: anywhere; }

        .eld-contact { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .eld-contact__list { margin: 24px 0 0; display: grid; gap: 16px; }
        .eld-contact__list dt { font-size: 13px; font-weight: 600; color: var(--eld-muted); margin-bottom: 2px; }
        .eld-contact__list dd { margin: 0; font-size: 16px; color: var(--eld-ink); font-weight: 500; }
        .eld-contact__list a { color: var(--eld-navy); text-decoration: underline; text-underline-offset: 3px; }
        .eld-map { border: 1px solid var(--eld-grey-line); border-radius: 4px; overflow: hidden; background: var(--eld-grey); }
        .eld-map iframe { display: block; width: 100%; height: 320px; border: 0; }
        .eld-map__link { display: inline-block; margin-top: 12px; font-size: 14px; color: var(--eld-navy); text-decoration: underline; text-underline-offset: 3px; }

        .eld-benefits { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; margin-top: 36px; }
        .eld-benefit { grid-column: span 2; }
        .eld-benefit:nth-child(n+4) { grid-column: span 3; }
        .eld-benefit { padding: 28px; background: #fff; border: 1px solid var(--eld-grey-line); border-top: 3px solid var(--eld-navy); border-radius: 4px; }
        .eld-benefit h3 { font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--eld-navy); margin-bottom: 10px; }
        .eld-benefit p { font-size: 15px; line-height: 1.7; color: var(--eld-muted); }

        @media (max-width: 900px) {
          .eld-hero__inner, .eld-contribute__box, .eld-contact { grid-template-columns: 1fr; gap: 32px; }
          .eld-hero__photo { order: -1; }
          .eld-stats { grid-template-columns: 1fr; }
          .eld-stat { border-inline-end: 0; border-bottom: 1px solid var(--eld-grey-line); }
          .eld-stat:last-child { border-bottom: 0; }
          .eld-units { grid-template-columns: repeat(2, 1fr); }
          .eld-benefits { grid-template-columns: 1fr 1fr; }
          .eld-benefit, .eld-benefit:nth-child(n+4) { grid-column: auto; }
        }
        @media (max-width: 600px) {
          .eld-section { padding: 56px 0; }
          .eld-wrap { padding: 0 16px; }
          .eld-hero { padding-inline: 16px; }
          .eld-facts, .eld-benefits { grid-template-columns: 1fr; }
          .eld-grid { grid-template-columns: 1fr; }
          .eld-btn--lg { width: 100%; padding-inline: 20px; }
          .eld-tabs { display: flex; }
          .eld-tab { flex: 1; padding-inline: 12px; }
        }
        @media (prefers-reduced-motion: reduce) { .eld-thumb img, .eld-btn { transition: none; } }
      `}</style>

      <header className="eld-hero" data-page-hero>
        <div className="eld-hero__inner">
          <div>
            <span className="eld-hero__label">{t('eldelal.hero.label')}</span>
            <h1 className="eld-hero__title">El Delal</h1>
            <span className="eld-hero__ar" lang="ar"><bdi dir="rtl">ظِلال الخير</bdi></span>
            <span className="eld-hero__sub">{t('eldelal.hero.subtitle')}</span>
            <p className="eld-hero__mission">{t('eldelal.hero.mission')}</p>
            <a href="#contribuer" className="eld-btn eld-btn--light">{t('eldelal.hero.ctaBtn')}</a>
          </div>
          <div className="eld-hero__photo">
            <img src={PHOTOS[0].src} alt={t('eldelal.gallery.items.aerienne')} width={PHOTOS[0].w} height={PHOTOS[0].h} fetchPriority="high" />
          </div>
        </div>
      </header>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/projets">{t('header.projects')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('eldelal.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <nav className="eld-subnav" aria-label="El Delal">
        <div className="eld-subnav__list">
          {['gallery', 'figures', 'contribute', 'contact', 'map', 'benefits'].map((k) => (
            <a key={k} href={`#${k === 'contribute' ? 'contribuer' : k}`}>{t(`eldelal.nav.${k}`)}</a>
          ))}
        </div>
      </nav>

      <main>
        <section id="gallery" className="eld-section eld-anchor">
          <div className="eld-wrap">
            <span className="eld-eyebrow">{t('eldelal.nav.gallery')}</span>
            <h2 className="eld-h2">{t('eldelal.gallery.title')}</h2>
            <p className="eld-lead">{t('eldelal.gallery.intro')}</p>
            <div className="eld-tabs" role="tablist">
              {['exterior', 'interior'].map((g) => (
                <button key={g} type="button" role="tab" className="eld-tab" aria-selected={group === g} onClick={() => setGroup(g)}>
                  {t(`eldelal.gallery.${g}`)}
                </button>
              ))}
            </div>
            <div className="eld-grid" role="tabpanel">
              {photos.map((p, i) => (
                <button key={p.id} type="button" className="eld-thumb" onClick={() => setLightbox(i)} aria-label={`${t('eldelal.gallery.open')} : ${p.caption}`}>
                  <img src={p.src} alt="" width={p.w} height={p.h} loading="lazy" />
                  <span className="eld-thumb__cap">{p.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="figures" className="eld-section eld-section--grey eld-anchor">
          <div className="eld-wrap">
            <span className="eld-eyebrow">{t('eldelal.nav.figures')}</span>
            <h2 className="eld-h2">{t('eldelal.figures.title')}</h2>
            <p className="eld-lead">{t('eldelal.figures.intro')}</p>
            <div className="eld-stats">
              <div className="eld-stat eld-stat--goal">
                <span className="eld-stat__label">{t('eldelal.figures.goalLabel')}</span>
                <bdi dir="ltr" className="eld-stat__value">{t('eldelal.figures.goalValue')}</bdi>
              </div>
              <div className="eld-stat">
                <span className="eld-stat__label">{t('eldelal.figures.priceLabel')}</span>
                <bdi dir="ltr" className="eld-stat__value">{t('eldelal.figures.priceValue')}</bdi>
              </div>
              <div className="eld-stat">
                <span className="eld-stat__label">{t('eldelal.figures.incomeLabel')}</span>
                <bdi dir="ltr" className="eld-stat__value">{t('eldelal.figures.incomeValue')}</bdi>
              </div>
            </div>
            <h3 className="eld-eyebrow" style={{ marginTop: 40, marginBottom: 0 }}>{t('eldelal.figures.unitsTitle')}</h3>
            <div className="eld-units">
              {UNITS.map((u) => (
                <div key={u.key} className="eld-unit">
                  <bdi dir="ltr" className="eld-unit__n">{u.n}</bdi>
                  <span className="eld-unit__t">{t(`eldelal.figures.${u.key}`)}</span>
                </div>
              ))}
            </div>
            <dl className="eld-facts">
              <div className="eld-fact">
                <dt>{t('eldelal.figures.builtLabel')}</dt>
                <dd><bdi dir="ltr">{t('eldelal.figures.builtValue')}</bdi></dd>
              </div>
              <div className="eld-fact">
                <dt>{t('eldelal.figures.beneficiariesLabel')}</dt>
                <dd>{t('eldelal.figures.beneficiariesValue')}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="contribuer" className="eld-contribute eld-anchor" aria-labelledby="eld-contribute-title">
          <div className="eld-wrap">
            <div className="eld-contribute__box">
              <div>
                <span className="eld-eyebrow" id="eld-contribute-title">{t('eldelal.contribute.title')}</span>
                <p className="eld-contribute__lead">{t('eldelal.contribute.lead')}</p>
                <p className="eld-contribute__text">{t('eldelal.contribute.cotizupText')}</p>
                <a href={COTIZUP_URL} className="eld-btn eld-btn--light eld-btn--lg" target="_blank" rel="noopener noreferrer">{t('eldelal.contribute.cotizupBtn')}</a>
                <p className="eld-contribute__note">{t('eldelal.contribute.note')}</p>
              </div>
              {TWINT.image && (
                <figure className="eld-qr" style={{ margin: 0 }}>
                  <p className="eld-qr__text">{t('eldelal.contribute.qrText')}</p>
                  <img src={TWINT.image} alt={t('eldelal.contribute.qrAlt')} width="200" height="332" loading="lazy" />
                  <figcaption className="eld-qr__name">{t('eldelal.contribute.twint')}</figcaption>
                  {TWINT.iban && <div className="eld-qr__iban">{t('eldelal.contribute.ibanLabel')} <bdi dir="ltr">{TWINT.iban}</bdi></div>}
                </figure>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="eld-section eld-anchor">
          <div className="eld-wrap eld-contact">
            <div>
              <span className="eld-eyebrow">{t('eldelal.nav.contact')}</span>
              <h2 className="eld-h2">{t('eldelal.contact.title')}</h2>
              <p className="eld-lead">{t('eldelal.contact.text')}</p>
              <dl className="eld-contact__list">
                <div>
                  <dt>{t('eldelal.contact.foundation')}</dt>
                  <dd lang="fr" dir="ltr">{t('eldelal.contact.address')}</dd>
                </div>
                <div>
                  <dt>{t('eldelal.contact.emailLabel')}</dt>
                  <dd><a href="mailto:info@wakf.ch">info@wakf.ch</a></dd>
                </div>
                <div>
                  <dt>{t('eldelal.contact.phoneLabel')}</dt>
                  <dd><a href="tel:+41793799646">+41 79 379 96 46</a></dd>
                </div>
              </dl>
              <p style={{ marginTop: 24 }}>
                <Link to="/don" className="eld-btn eld-btn--navy">{t('eldelal.contact.moreWays')}</Link>
              </p>
            </div>
            <div id="map" className="eld-anchor">
              <span className="eld-eyebrow">{t('eldelal.nav.map')}</span>
              <h2 className="eld-h2">{t('eldelal.map.title')}</h2>
              <p className="eld-lead" style={{ marginBottom: 20 }}>{t('eldelal.map.text')}</p>
              <div className="eld-map">
                <iframe title={t('eldelal.map.iframeTitle')} src={MAP_SRC} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <a className="eld-map__link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">{t('eldelal.map.open')}</a>
            </div>
          </div>
        </section>

        <section id="benefits" className="eld-section eld-section--grey eld-anchor">
          <div className="eld-wrap">
            <span className="eld-eyebrow">{t('eldelal.nav.benefits')}</span>
            <h2 className="eld-h2">{t('eldelal.benefits.title')}</h2>
            <div className="eld-benefits">
              {t('eldelal.benefits.items', { returnObjects: true }).map((b) => (
                <article key={b.title} className="eld-benefit">
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {lightbox !== null && (
        <ImageLightbox images={photos} initialIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
