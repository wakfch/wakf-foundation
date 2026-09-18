import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PILLAR_ICONS = ['🕌', '📖', '🌍', '🎓'];
const GOV_ICONS = ['🏛️', '⚙️', '📋', '☪️'];
const LEGAL_ORDER = ['name', 'ide', 'form', 'basis', 'head', 'office', 'year', 'capital', 'recognition', 'supervision', 'email', 'phone'];

export default function About() {
  const { t } = useTranslation();
  const objectifs = t('about.objectives', { returnObjects: true });
  const pillars = t('about.pillars', { returnObjects: true });
  const governance = t('about.governance', { returnObjects: true });
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('about.hero.label')}</span>
          <h1 className="page-hero__title">{t('about.hero.title')}</h1>
          <p className="page-hero__sub">{t('about.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('about.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        {/* ── Histoire & Mission ──────────────────────────────── */}
        <section className="section" id="histoire">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
              <div>
                <span className="section-label">{t('about.historyLabel')}</span>
                <h2 className="section-title">{t('about.historyTitle')}</h2>
                <span className="accent-line" />
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  {t('about.p1')}
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  {t('about.p2Before')}<em>Wakef</em> (وقف){t('about.p2After')}
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  <strong>{t('about.missionLabel')}</strong> {t('about.missionText')}
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-8)' }}>
                  <strong>{t('about.visionLabel')}</strong> {t('about.visionText')}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {pillars.map(({ title, desc }, i) => {
                    const icon = PILLAR_ICONS[i];
                    return (
                    <div key={title} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 2 }}>{title}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Green card — 6 objectifs */}
              <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-2)' }}>{t('about.objectivesCardTitle')}</p>
                {objectifs.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(255,255,255,.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.6 }}>{obj}</p>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,.15)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>2009</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>{t('about.foundedYear')}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>CHF 50k</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>{t('about.endowment')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){#histoire .container>div{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* ── Gouvernance ──────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">{t('about.govLabel')}</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('about.govTitle')}</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="grid-2">
              {governance.map(({ title, desc }, i) => {
                const icon = GOV_ICONS[i];
                return (
                <div key={title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <span style={{ fontSize: 24 }}>{icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text-heading)' }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Mentions légales ─────────────────────────────────── */}
        <section className="section">
          <div className="container" style={{ maxWidth: 840 }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">{t('about.legalLabel')}</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('about.legalTitle')}</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="legal-box">
              <div className="legal-box__title">{t('about.legalBoxTitle')}</div>
              <div className="legal-box__grid">
                {LEGAL_ORDER.map((key) => {
                  const val = key === 'email'
                    ? <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>
                    : key === 'phone'
                      ? <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>
                      : t(`about.legal.${key}.value`);
                  return (
                    <div key={key}>
                      <p className="legal-item__label">{t(`about.legal.${key}.label`)}</p>
                      <p className="legal-item__value">{val}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section style={{ background: 'var(--green)', padding: 'var(--space-12) 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>{t('about.ctaTitle')}</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.75)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>{t('about.ctaBody')}</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/don" className="btn btn--gold btn--lg">{t('about.ctaDonate')}</Link>
              <Link to="/statuts" className="btn btn--white btn--lg">{t('about.ctaStatutes')}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
