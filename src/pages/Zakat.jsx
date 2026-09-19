import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NISAB = 4600;
const NUMBER_LOCALES = { fr: 'fr-CH', de: 'de-CH', en: 'en-GB', ar: 'fr-CH' };
const EXPLAIN_ICONS = ['⚖️', '📅', '💰', '📦'];
const FIELD_KEYS = ['or', 'argent', 'liquid', 'invest', 'dettes'];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item${open ? ' open' : ''}`}>
      <div className="faq__question" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(!open)}>
        <span className="faq__question-text">{q}</span>
        <div className="faq__icon">+</div>
      </div>
      {open && <div className="faq__answer"><p dangerouslySetInnerHTML={{ __html: a }} /></div>}
    </div>
  );
}

export default function Zakat() {
  const { t, i18n } = useTranslation();
  const numLocale = NUMBER_LOCALES[(i18n.language || 'fr').slice(0, 2)] || 'fr-CH';
  const rateLabel = numLocale === 'en-GB' ? '2.5%' : '2,5%';
  const [fields, setFields] = useState({ or: '', argent: '', liquid: '', invest: '', dettes: '' });
  const [result, setResult] = useState(null);

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const or = parseFloat(fields.or) || 0;
    const argent = parseFloat(fields.argent) || 0;
    const liquid = parseFloat(fields.liquid) || 0;
    const invest = parseFloat(fields.invest) || 0;
    const dettes = parseFloat(fields.dettes) || 0;
    const total = or + argent + liquid + invest;
    const net = Math.max(0, total - dettes);
    const zakat = net >= NISAB ? net * 0.025 : 0;
    setResult({ total, dettes, net, zakat, aboveNisab: net >= NISAB });
  };

  const fmt = (n) => n.toLocaleString(numLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('zakat.hero.label')}</span>
          <h1 className="page-hero__title">{t('zakat.hero.title')}</h1>
          <p className="page-hero__sub">{t('zakat.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('zakat.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        {/* ── Calculateur ──────────────────────────────────────── */}
        <section className="section" id="zakat">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <span className="section-label">{t('zakat.toolLabel')}</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('zakat.toolTitle')}</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
              <p className="section-body" style={{ marginInline: 'auto' }}>{t('zakat.toolBody')}</p>
            </div>
            <div className="zakat__grid">
              {/* Form */}
              <div className="zakat__form">
                <p className="zakat__form-title">{t('zakat.formTitle')}</p>
                {FIELD_KEYS.map((k) => (
                  <div className="zakat__field" key={k}>
                    <label>{t(`zakat.fields.${k}.label`)} <span>{t(`zakat.fields.${k}.hint`)}</span></label>
                    <input type="number" className="zakat__input" placeholder="0" min="0"
                      value={fields[k]} onChange={e => set(k, e.target.value)} />
                  </div>
                ))}
                <button className="zakat__calc-btn" onClick={calculate}>{t('zakat.calcBtn')}</button>
              </div>

              {/* Result */}
              <div className="zakat__result">
                <div>
                  <p className="zakat__result-label">{t('zakat.estimated')}</p>
                  <div className="zakat__result-amount">
                    {`CHF ${fmt(result ? result.zakat : 0)}`}
                  </div>
                </div>

                {result && (
                  <div className="zakat__breakdown">
                    <div className="zakat__breakdown-row"><span>{t('zakat.totalAssets')}</span><strong>CHF {fmt(result.total)}</strong></div>
                    <div className="zakat__breakdown-row"><span>{t('zakat.debtsDeducted')}</span><strong>CHF {fmt(result.dettes)}</strong></div>
                    <div className="zakat__breakdown-row"><span>{t('zakat.taxable')}</span><strong>CHF {fmt(result.net)}</strong></div>
                    <div className="zakat__breakdown-row"><span>{t('zakat.rate')}</span><strong>{rateLabel}</strong></div>
                    {!result.aboveNisab && (
                      <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-3)', background: 'rgba(255,255,255,.1)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>
                        {t('zakat.belowNisab', { nisab: NISAB.toLocaleString(numLocale) })}
                      </div>
                    )}
                  </div>
                )}

                <div className="zakat__nisab-info">
                  <p>{t('zakat.nisabInfo')}</p>
                </div>
                <p className="zakat__result-note">{t('zakat.rateNoteBefore')}<strong style={{ color: 'var(--gold)' }}>{rateLabel}</strong>{t('zakat.rateNoteAfter')}<br />{t('zakat.estimateNote')}</p>
                <Link to="/don" className="zakat__result-donate">{t('zakat.donateZakat')}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Explications ─────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <span className="section-label">{t('zakat.explainLabel')}</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('zakat.explainTitle')}</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="grid-2">
              {t('zakat.explain', { returnObjects: true }).map(({ title, desc }, i) => (
                <div className="card" style={{ padding: 'var(--space-8)' }} key={title}>
                  <div style={{ fontSize: 36, marginBottom: 'var(--space-4)' }}>{EXPLAIN_ICONS[i]}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Zakat ─────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">{t('zakat.faqLabel')}</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('zakat.faqTitle')}</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="faq__list">
              {t('zakat.faq', { returnObjects: true }).map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* ── Note savant ───────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-5)' }}>📚</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>{t('zakat.noteTitle')}</h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 'var(--space-8)' }}>{t('zakat.noteBody')}</p>
            <Link to="/contact" className="btn btn--primary">{t('zakat.noteBtn')}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
