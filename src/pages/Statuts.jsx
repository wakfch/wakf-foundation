import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Statuts() {
  const { t } = useTranslation();
  const ARTICLES = t('statutes.articles', { returnObjects: true }).map((art, i) => ({ ...art, num: i + 1 }));
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('statutes.hero.label')}</span>
          <h1 className="page-hero__title">{t('statutes.hero.title')}</h1>
          <p className="page-hero__sub">{t('statutes.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/a-propos">{t('statutes.aboutBreadcrumb')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('statutes.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>

            <div style={{ background: 'var(--green-light)', border: '1px solid rgba(45,122,58,.15)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>{t('statutes.cardTitle')}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {t('statutes.cardLine1')}<br />
                    {t('statutes.cardLine2')}<br />
                    {t('statutes.cardLine3')}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>{t('statutes.signatories')}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>El Khatib Sahbi</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>Safi Samir</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              {ARTICLES.map((art, idx) => (
                <div
                  key={art.num}
                  style={{
                    padding: 'var(--space-8)',
                    borderBottom: idx < ARTICLES.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: 'var(--space-6)',
                    alignItems: 'start',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: 'var(--green)',
                    flexShrink: 0,
                  }}>
                    {art.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>
                      {t('statutes.articleTitle', { num: art.num, titre: art.titre })}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8, fontWeight: 300 }}>{art.contenu}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-10)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/a-propos" className="btn btn--outline btn--sm">{t('statutes.back')}</Link>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
