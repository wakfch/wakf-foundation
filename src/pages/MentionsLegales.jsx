import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ROW_ORDER = ['name', 'ide', 'form', 'year', 'capital', 'recognition', 'head', 'office', 'email', 'phone', 'supervision', 'web'];

export default function MentionsLegales() {
  const { t } = useTranslation();
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('legalNotice.hero.label')}</span>
          <h1 className="page-hero__title">{t('legalNotice.hero.title')}</h1>
          <p className="page-hero__sub">{t('legalNotice.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('legalNotice.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

              {/* Identification */}
              <div className="legal-box">
                <div className="legal-box__title">{t('legalNotice.idTitle')}</div>
                <div className="legal-box__grid">
                  {ROW_ORDER.map((key) => {
                    const val = key === 'email'
                      ? <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>
                      : key === 'phone'
                        ? <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>
                        : key === 'web'
                          ? <a href="https://wakf.ch" style={{ color: 'var(--green)' }}>wakf.ch</a>
                          : t(`legalNotice.rows.${key}.value`);
                    return (
                      <div key={key}>
                        <p className="legal-item__label">{t(`legalNotice.rows.${key}.label`)}</p>
                        <p className="legal-item__value">{val}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hébergement */}
              <div className="legal-box">
                <div className="legal-box__title">{t('legalNotice.hostingTitle')}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {t('legalNotice.hostingP1')}<strong>Cloudflare, Inc.</strong>, 101 Townsend Street, San Francisco, CA 94107, {t('legalNotice.hostingCountry')}
                  {t('legalNotice.hostingP2')}<strong>Hostinger</strong>{t('legalNotice.hostingP3')}
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div className="legal-box">
                <div className="legal-box__title">{t('legalNotice.ipTitle')}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {t('legalNotice.ipBody')}
                </p>
              </div>

              {/* Limitation de responsabilité */}
              <div className="legal-box">
                <div className="legal-box__title">{t('legalNotice.liabilityTitle')}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {t('legalNotice.liabilityBody')}
                </p>
              </div>

              {/* Droit applicable */}
              <div className="legal-box">
                <div className="legal-box__title">{t('legalNotice.lawTitle')}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {t('legalNotice.lawBody')}
                </p>
              </div>

              <Link to="/" className="btn btn--outline btn--sm" style={{ width: 'fit-content' }}>{t('legalNotice.back')}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
