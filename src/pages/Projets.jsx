import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';
import { IMAGE_SRCS } from '../data/projectImages';

const PROJECTS = [
  { id: 1, slug: 'madretsch', date: '2009', statut: 'termine' },
  { id: 2, slug: 'aliman', date: '2018', statut: 'en-cours' },
  { id: 3, slug: 'albadr', date: '2017', statut: 'en-cours' },
  { id: 4, slug: 'annour', date: '2024', statut: 'en-cours', img: 'https://picsum.photos/600/320?grayscale&random=4' },
  { id: 5, slug: 'bibliotheque', date: '2023', statut: 'en-cours', img: 'https://picsum.photos/600/320?grayscale&random=5' },
];

const STATUTS = [
  { slug: 'tous', key: 'all' },
  { slug: 'termine', key: 'done' },
  { slug: 'en-cours', key: 'ongoing' },
];

export default function Projets() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('tous');

  const visible = filter === 'tous' ? PROJECTS : PROJECTS.filter(p => p.statut === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('projects.hero.label')}</span>
          <h1 className="page-hero__title">{t('projects.hero.title')}</h1>
          <p className="page-hero__sub">{t('projects.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('projects.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
              {STATUTS.map(s => (
                <button
                  key={s.slug}
                  onClick={() => setFilter(s.slug)}
                  style={{
                    padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all .3s', minHeight: 44,
                    background: filter === s.slug ? 'var(--green)' : 'var(--white)',
                    color: filter === s.slug ? 'var(--white)' : 'var(--text-muted)',
                    border: filter === s.slug ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                  }}
                >{t(`projects.filters.${s.key}`)}</button>
              ))}
            </div>

            {visible.length > 0 ? (
              <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
                {visible.map(p => (
                  <article className="projet-card" key={p.id} id={p.slug}>
                    <div className="projet-card__img">
                      {IMAGE_SRCS[p.slug] ? (
                        <ImageCarousel
                          images={IMAGE_SRCS[p.slug].map((src, i) => ({ src, caption: t(`projects.items.${p.slug}.captionsShort`, { returnObjects: true })[i] }))}
                          title={t(`projects.items.${p.slug}.title`)}
                          height={200}
                          showNav
                          autoplay
                        />
                      ) : (
                        <img src={p.img} alt={t(`projects.items.${p.slug}.title`)} loading="lazy" />
                      )}
                    </div>
                    <div className="projet-card__body">
                      <span className="projet-card__tag">{t(`projects.items.${p.slug}.type`)}</span>
                      <h3 className="projet-card__title">{t(`projects.items.${p.slug}.title`)}</h3>
                      <p className="projet-card__location">📍 {t(`projects.items.${p.slug}.ville`)}</p>
                      <p className="projet-card__location" style={{ color: 'var(--text-faint)' }}>📅 {p.date} · {t(`projects.items.${p.slug}.surface`)}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>{t(`projects.items.${p.slug}.excerpt`)}</p>
                      <Link to={`/projets/${p.slug}`} className="projet-card__link">{t('common.learnMore')}</Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: 16 }}>{t('projects.empty')}</p>
              </div>
            )}

            <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--green)', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>{t('projects.supportTitle')}</h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>{t('projects.supportBody')}</p>
              <Link to="/don" className="btn btn--white btn--lg">{t('common.donate')}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
