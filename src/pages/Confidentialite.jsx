import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Confidentialite() {
  const { t } = useTranslation();
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('privacy.hero.label')}</span>
          <h1 className="page-hero__title">{t('privacy.hero.title')}</h1>
          <p className="page-hero__sub">{t('privacy.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('privacy.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8 }}>
              {t('privacy.sections', { returnObjects: true }).map(({ title, content }) => (
                <div key={title} style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>{title}</h3>
                  <p>{content}</p>
                </div>
              ))}
              <p style={{ fontSize: 12, color: 'var(--text-faint)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
                {t('privacy.updated')}<a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
