import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item${open ? ' open' : ''}`}>
      <div className="faq__question" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(!open)}>
        <span className="faq__question-text">{q}</span>
        <div className="faq__icon">+</div>
      </div>
      <div className="faq__answer"><p>{a}</p></div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState('all');
  const FAQS = t('faq.groups', { returnObjects: true });
  const cats = ['all', ...FAQS.map((_, i) => i)];
  const visible = FAQS.map((g, i) => ({ ...g, id: i })).filter(g => activeCat === 'all' || g.id === activeCat);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{t('faq.hero.label')}</span>
          <h1 className="page-hero__title">{t('faq.hero.title')}</h1>
          <p className="page-hero__sub">{t('faq.hero.sub')}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label={t('common.breadcrumbLabel')}>
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">{t('common.home')}</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{t('faq.breadcrumb')}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)', justifyContent: 'center' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s', minHeight: 44, border: 'none',
                  background: activeCat === c ? 'var(--green)' : 'var(--bg-section)',
                  color: activeCat === c ? 'var(--white)' : 'var(--text-muted)',
                }}>{c === 'all' ? t('common.all') : FAQS[c].cat}</button>
              ))}
            </div>

            {visible.map(group => (
              <div key={group.id} style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-2)' }}>
                  {group.cat}
                </h2>
                <div className="faq__list">
                  {group.items.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-12)', padding: 'var(--space-10)', background: 'var(--green-light)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(45,122,58,.1)' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>💬</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>{t('faq.ctaTitle')}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 'var(--space-6)', fontWeight: 300 }}>{t('faq.ctaBody')}</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn--primary">{t('faq.ctaContact')}</Link>
                <a href="mailto:info@wakf.ch" className="btn btn--outline">info@wakf.ch</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
