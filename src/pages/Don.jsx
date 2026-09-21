import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IMPACT_AMOUNTS = ['CHF 20', 'CHF 50', 'CHF 200', 'CHF 500', 'CHF 1 000'];
const GUARANTEE_ICONS = ['☪️', '📊', '🏛️'];
const IBAN_RAW = 'CH8409000000107618194'; // valeur copiée dans le presse papier
const TRANSFER_ROWS = ['beneficiary', 'iban', 'bank', 'address'];

export default function Don() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyIban = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(IBAN_RAW);
      ok = true;
    } catch {
      // secours pour les navigateurs sans API presse papier (ou page non sécurisée)
      const ta = document.createElement('textarea');
      ta.value = IBAN_RAW;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      document.body.removeChild(ta);
    }
    if (!ok) return;
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('donation.hero.label')}</span>
          <h1 className="page-hero__title">{t('donation.hero.title')}</h1>
          <p className="page-hero__sub">{t('donation.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('donation.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div className="don__grid">
              {/* Left: Form */}
              <div>
                <p className="don-intro" lang="fr">{t('donation.intro')}</p>
                <div className="don-choices" lang="fr" dir="ltr">
                <section className="don-twint">
                  <h2 className="don-virement__title">{t('donation.twint.title')}</h2>
                  <div className="don-twint__qr">
                    <img className="don-twint__qr-img" src="/images/qr-twint-wakf.png" width="200" height="332" loading="lazy" alt={t('donation.twint.qrAlt')} />
                    <p className="don-virement__scan">{t('donation.twint.scan')}</p>
                  </div>
                  <p className="don-virement__scan don-twint__redirect">{t('donation.twint.redirect')}</p>
                  <a className="don-twint__btn" href="https://pay.raisenow.io/kqhfc?lng=fr" target="_blank" rel="noopener noreferrer">{t('donation.twint.button')}</a>
                </section>
                <div className="don-virement">
                  <style>{`
                    @media (min-width: 901px) { .don__grid { grid-template-columns: 1.5fr 1fr; } }
                    .don-intro { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 20px; }
                    .don-choices { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: stretch; }
                    @media (min-width: 768px) { .don-choices { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
                    @media (min-width: 901px) and (max-width: 1100px) {
                      .don-choices .don-twint, .don-choices .don-virement { padding: 24px 12px; }
                      .don-virement .don-virement__list dd.don-virement__iban { white-space: normal; }
                    }
                    .don-twint { display: flex; flex-direction: column; align-items: center; background: #fff; border: 1px solid #1A1A1A; border-radius: 20px; padding: 32px; font-family: var(--font-body); color: #444444; }
                    .don-twint .don-virement__title { align-self: flex-start; }
                    .don-twint__qr { display: none; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 24px; }
                    .don-twint__qr-img { display: block; width: 200px; max-width: 100%; height: auto; }
                    .don-twint__redirect { margin-bottom: 20px; }
                    .don-twint__btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 24px; border-radius: 10px; background: #1A1A1A; color: #fff; font-family: var(--font-heading); font-size: 15px; font-weight: 600; text-align: center; transition: background .2s; }
                    .don-twint__btn:hover { background: #000; }
                    .don-twint__btn:focus-visible { outline: 2px solid #2d7a3a; outline-offset: 2px; }
                    @media (min-width: 768px) {
                      .don-twint__qr { display: flex; }
                      .don-twint__redirect { display: none; }
                      .don-choices .don-virement__title { min-height: 70px; min-height: 2lh; }
                    }
                    @media (min-width: 901px) and (max-width: 1279px) {
                      .don-choices .don-twint .don-virement__title, .don-choices .don-virement .don-virement__title { min-height: 105px; min-height: 3lh; }
                    }
                    .don-virement { display: flex; flex-direction: column; background: #fff; border: 1px solid #2d7a3a; border-radius: 20px; padding: 32px; font-family: var(--font-body); color: #444444; }
                    .don-virement__title { font-family: var(--font-heading); font-size: 22px; font-weight: 700; color: #1A1A1A; margin-bottom: 24px; }
                    .don-virement__grid { display: grid; grid-template-columns: 1fr; justify-items: center; gap: 24px; align-items: start; }
                    .don-virement__qr { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 200px; max-width: 100%; }
                    .don-virement__qr-img { display: block; width: 200px; max-width: 100%; height: auto; aspect-ratio: 1; box-sizing: border-box; padding: 10px; background: #fff; border: 1px solid #E8E8E8; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,.08); }
                    .don-virement__scan { font-size: 13px; line-height: 1.6; text-align: center; color: #444444; }
                    .don-virement__details { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; min-width: 0; }
                    .don-virement__list { display: flex; flex-direction: column; gap: 14px; margin: 0; }
                    .don-virement__list dt { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #555555; margin-bottom: 2px; }
                    .don-virement__list dd { margin: 0; font-size: 15px; font-weight: 500; line-height: 1.5; color: #1A1A1A; overflow-wrap: anywhere; }
                    .don-virement__list dd.don-virement__iban { font-weight: 600; letter-spacing: .03em; white-space: nowrap; }
                    .don-virement__copy { display: inline-flex; align-items: center; min-height: 36px; padding: 6px 14px; border: 1px solid #E8E8E8; border-radius: 8px; background: #fff; color: #2d7a3a; font-family: var(--font-body); font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s, border-color .2s, color .2s; }
                    .don-virement__copy:hover { background: #f0f7f1; border-color: #2d7a3a; color: #236130; }
                    .don-virement__copy:focus-visible { outline: 2px solid #2d7a3a; outline-offset: 2px; }
                    .don-virement__copy[data-copied="true"] { background: #f0f7f1; border-color: #2d7a3a; }
                    .don-virement__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
                    .don-virement__free { margin-top: 28px; padding: 16px 20px; background: #f0f7f1; border-inline-start: 4px solid #C8A951; border-radius: 10px; font-family: var(--font-heading); font-size: 15px; font-weight: 600; line-height: 1.5; color: #1A1A1A; }
                    .don-regulier { margin-top: 24px; padding: 20px 24px; background: #fff; border: 1px solid #E8E8E8; border-radius: 14px; }
                    .don-regulier__title { font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: #1A1A1A; margin-bottom: 8px; }
                    .don-regulier__body { font-size: 14px; line-height: 1.7; color: #444444; }
                    .don-virement__details { width: 100%; }
                    @media (max-width: 720px) {
                      .don-virement, .don-twint { padding: 24px 20px; }
                      .don-virement__copy { min-height: 44px; }
                    }
                    @media (prefers-reduced-motion: reduce) { .don-virement__copy { transition: none; } }
                  `}</style>
                  <h2 className="don-virement__title">{t('donation.transfer.title')}</h2>
                  <div className="don-virement__grid">
                    <div className="don-virement__qr">
                      <img className="don-virement__qr-img" src="/images/qr-don-wakf.svg" width="200" height="200" alt={t('donation.transfer.qrAlt')} />
                      <p className="don-virement__scan">{t('donation.transfer.scan')}</p>
                    </div>
                    <div className="don-virement__details">
                      <dl className="don-virement__list">
                        {TRANSFER_ROWS.map((key) => (
                          <div key={key}>
                            <dt>{t(`donation.transfer.${key}.label`)}</dt>
                            <dd className={key === 'iban' ? 'don-virement__iban' : undefined} dir={key === 'iban' ? 'ltr' : undefined}>
                              {t(`donation.transfer.${key}.value`)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <button type="button" className="don-virement__copy" onClick={copyIban} data-copied={copied}>
                        {copied ? t('donation.transfer.copied') : t('donation.transfer.copy')}
                      </button>
                      <span className="don-virement__sr" role="status" aria-live="polite">{copied ? t('donation.transfer.copied') : ''}</span>
                    </div>
                  </div>
                  <p className="don-virement__free">{t('donation.transfer.free')}</p>
                </div>
                </div>

                <div className="don-regulier" lang="fr" dir="ltr">
                  <h3 className="don-regulier__title">{t('donation.regular.title')}</h3>
                  <p className="don-regulier__body">{t('donation.regular.body')}</p>
                </div>
              </div>

              {/* Right: Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {/* Impact */}
                <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', color: 'var(--white)' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-5)' }}>{t('donation.impactTitle')}</p>
                  {t('donation.impact', { returnObjects: true }).map((desc, i) => {
                    const amt = IMPACT_AMOUNTS[i];
                    return (
                    <div key={amt} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                      <span style={{ background: 'rgba(200,169,81,.25)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', fontSize: 13, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>{amt}</span>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.5 }}>{desc}</p>
                    </div>
                    );
                  })}
                </div>

                {/* Garanties */}
                <div style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, marginBottom: 'var(--space-4)', color: 'var(--text-heading)' }}>{t('donation.guaranteesTitle')}</p>
                  {t('donation.guarantees', { returnObjects: true }).map((text, i) => {
                    const icon = GUARANTEE_ICONS[i];
                    return (
                    <div key={text} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{text}</p>
                    </div>
                    );
                  })}
                </div>

                {/* Contact */}
                <div style={{ textAlign: 'center', padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>{t('donation.questions')}</p>
                  <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)', fontWeight: 600, fontSize: 14 }}>info@wakf.ch</a>
                  <br />
                  <a href="tel:+41793799646" style={{ color: 'var(--text-muted)', fontSize: 13 }}>+41 79 379 96 46</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
