import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import ImageLightbox from '../components/ImageLightbox';
import { useTranslation } from 'react-i18next';
import { findProjectBySlug, getProjectCaptions, projectPath } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const base = findProjectBySlug(slug);
  const [lightbox, setLightbox] = useState(null);

  // Ancien lien (ex. /projets/madretsch) : redirection vers l'URL actuelle
  if (base && slug !== base.slug) {
    return <Navigate to={projectPath(base)} replace />;
  }

  const k = (field) => `projects.items.${base?.id}.${field}`;
  const captions = base?.images ? getProjectCaptions(t, base) : [];
  const project = base && {
    img: base.heroImage,
    title: t(k('title')),
    subtitle: t(k('subtitle')),
    ville: t(k('villeDetail')),
    annee: base.year,
    surface: t(k('surfaceDetail'), { defaultValue: t(k('surface')) }),
    type: t(k('typeDetail'), { defaultValue: t(k('type')) }),
    intro: t(k('intro')),
    objectifs: t(k('objectifs'), { returnObjects: true }),
    fiche: t(k('fiche'), { returnObjects: true }),
    description: t(k('description')),
    avancement: t(k('avancement')),
    vision: t(k('vision')),
    images: base.images ? base.images.map((src, i) => ({ src, caption: captions[i] })) : null,
  };

  if (!project) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-8)' }}>
        <div style={{ fontSize: 64 }}>🕌</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--text-heading)' }}>{t('projects.detail.notFoundTitle')}</h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>{t('projects.detail.notFoundText')}</p>
        <Link to="/projets" className="btn btn--primary">{t('projects.detail.notFoundBtn')}</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero" style={{ textAlign: 'left' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{project.type}</span>
          <h1 className="page-hero__title" style={{ marginInline: 0 }}>{project.title}</h1>
          <p className="page-hero__sub" style={{ marginInline: 0 }}>{project.subtitle}</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📍 {project.ville}</span>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📅 {project.annee}</span>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📐 {project.surface}</span>
          </div>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/projets">{t('projects.breadcrumb')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item" aria-current="page">{project.title}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-12)', alignItems: 'start' }}>

              <div>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-10)' }}>
                  {project.images ? (
                    <ImageCarousel
                      images={project.images}
                      title={project.title}
                      height={280}
                      autoplay={false}
                      onImageClick={(i) => setLightbox(i)}
                    />
                  ) : (
                    <img src={project.img} alt={project.title} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
                  )}
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <span className="section-label">{t('projects.detail.introduction')}</span>
                  <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.8, marginTop: 'var(--space-3)' }}>{project.intro}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>{t('projects.detail.objectives')}</h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {project.objectifs.map((obj, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 15, color: 'var(--text-body)', lineHeight: 1.6 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green)', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>{t('projects.detail.description')}</h2>
                  <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8, fontWeight: 300 }}>{project.description}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>{t('projects.detail.progress')}</h2>
                  <div style={{ background: 'var(--green-light)', border: '1px solid rgba(45,122,58,.15)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
                    <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.7 }}>{project.avancement}</p>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>{t('projects.detail.vision')}</h2>
                  <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>{project.vision}</p>
                </div>

                <Link to="/" className="btn btn--outline btn--sm">{t('common.backHome')}</Link>
              </div>

              <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + var(--space-6))' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
                  <div style={{ background: 'var(--green)', padding: 'var(--space-5) var(--space-6)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>{t('projects.detail.factsheet')}</h3>
                  </div>
                  <div style={{ padding: 'var(--space-2)' }}>
                    {project.fiche.map(f => (
                      <div key={f.label} style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-faint)', marginBottom: 2 }}>{f.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {base.contribute?.cotizupUrl && (
                  <div style={{ marginBottom: 'var(--space-6)', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>{t('projects.detail.contribute.title')}</h3>
                    <a href={base.contribute.cotizupUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center' }}>
                      {t('projects.detail.contribute.cotizup')}
                    </a>
                  </div>
                )}

                <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>🤝</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-3)' }}>{t('projects.detail.supportTitle')}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', lineHeight: 1.6, marginBottom: 'var(--space-6)', fontWeight: 300 }}>
                    {t('projects.detail.supportBody')}
                  </p>
                  <Link to={`/don?projet=${base.slug}`} className="btn btn--gold" style={{ display: 'block', textAlign: 'center' }}>
                    {t('common.donate')}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .project-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {lightbox !== null && project.images && (
        <ImageLightbox
          images={project.images}
          initialIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
