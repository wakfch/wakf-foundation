import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const sent = new URLSearchParams(location.search).get('sent') === '1';

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('contact.hero.label')}</span>
          <h1 className="page-hero__title">{t('contact.hero.title')}</h1>
          <p className="page-hero__sub">{t('contact.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('contact.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-12)', alignItems: 'start' }}>
              {/* Info */}
              <div>
                <span className="section-label">{t('contact.infoLabel')}</span>
                <h2 className="section-title">{t('contact.infoTitle')}</h2>
                <span className="accent-line" />
                <p className="section-body" style={{ marginBottom: 'var(--space-8)' }}>
                  {t('contact.infoBody')}
                </p>

                {[
                  { icon: '✉️', label: t('common.email'), val: 'info@wakf.ch', href: 'mailto:info@wakf.ch' },
                  { icon: '📞', label: t('common.phone'), val: '+41 79 379 96 46', href: 'tel:+41793799646' },
                  { icon: '🏛️', label: t('common.headOffice'), val: 'Ave de la Confrérie 11, 1008 Prilly (VD)', href: null },
                  { icon: '🏢', label: t('common.contactOffice'), val: 'Rue de Mardertsch 64, 2503 Bienne (BE)', href: null },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', marginBottom: 'var(--space-5)' }}>
                    <div style={{ width: 44, height: 44, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 2 }}>{label}</p>
                      {href
                        ? <a href={href} style={{ fontSize: 15, fontWeight: 500, color: 'var(--green)' }}>{val}</a>
                        : <p style={{ fontSize: 14, color: 'var(--text-body)' }}>{val}</p>
                      }
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', background: 'var(--gold-light)', border: '1px solid rgba(200,169,81,.25)', borderRadius: 'var(--radius-lg)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--text-heading)' }}>{t('contact.ideLabel')}</strong> CHE-114.901.246<br />
                    <strong style={{ color: 'var(--text-heading)' }}>{t('contact.legalBasisLabel')}</strong> {t('contact.legalBasisValue')}<br />
                    <strong style={{ color: 'var(--text-heading)' }}>{t('contact.supervisionLabel')}</strong> {t('contact.supervisionValue')}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-6)' }}>{t('contact.formTitle')}</h3>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
                    <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>✅</div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>{t('contact.sentTitle')}</h4>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{t('contact.sentText')}</p>
                  </div>
                ) : (
                  <form
                    method="POST"
                    action="https://formspree.io/f/mreddaay"
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                  >
                    <input type="hidden" name="_subject" value="Contact Wakef Suisse" />
                    <input type="hidden" name="_next" value="https://wakf.ch/contact?sent=1" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">{t('contact.fullName')}</label>
                        <input required name="nom" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t('contact.emailLabel')}</label>
                        <input required type="email" name="email" className="form-input" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.subjectLabel')}</label>
                      <select required name="sujet" className="form-select" defaultValue="">
                        <option value="" disabled>{t('contact.subjectPlaceholder')}</option>
                        {['Faire un don', 'Zakat & Sadaqah', 'Nos projets', 'Comité Charia', 'Partenariat', 'Autre'].map((subj) => (
                          <option key={subj} value={subj}>{t(`contact.subjects.${subj}`)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.messageLabel')}</label>
                      <textarea required name="message" className="form-textarea" rows={5} placeholder={t('contact.messagePlaceholder')} />
                    </div>
                    <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                      {t('contact.send')}
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>{t('contact.privacy')}</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <style>{`@media(max-width:768px){.section .container>div{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
