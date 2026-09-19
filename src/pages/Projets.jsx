import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';

const STATUTS = [
  { slug: 'tous', key: 'all' },
  { slug: 'termine', key: 'done' },
  { slug: 'en-cours', key: 'ongoing' },
];

export default function Projets() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('tous');

  const visible = filter === 'tous' ? PROJECTS : PROJECTS.filter(p => p.status === filter);

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
                  <ProjectCard key={p.id} project={p} />
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
