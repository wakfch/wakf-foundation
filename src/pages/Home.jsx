import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';

const STATS = [
  { num: 5, suffix: '', key: 'projects', gold: false },
  { num: 800, suffix: '+', key: 'beneficiaries', gold: true },
  { num: 50, suffix: 'k', key: 'capital', gold: false },
  { num: 2657, suffix: ' m²', key: 'surface', gold: false },
];

function CountUp({ target, suffix, active, locale }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [active, target]);
  // <bdi dir="ltr"> : le nombre et son unité gardent leur ordre (2'657 m², 800+) même dans une page RTL
  return <bdi dir="ltr">{val.toLocaleString(locale)}{suffix}</bdi>;
}

const NUMBER_LOCALES = { fr: 'fr-CH', de: 'de-CH', en: 'en-GB', ar: 'de-CH' };

export default function Home() {
  const { t, i18n } = useTranslation();
  const numLocale = NUMBER_LOCALES[(i18n.language || 'fr').slice(0, 2)] || 'fr-CH';
  const objectives = t('home.about.objectives', { returnObjects: true });
  const values = t('home.about.values', { returnObjects: true });
  const faqItems = t('home.faq.items', { returnObjects: true });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <div style={{ marginTop: 'calc(-1 * var(--nav-h))' }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-page-hero style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0d2b14 0%, #1e5229 50%, #2d7a3a 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon fill='%23ffffff' points='30,8 33.83,20.76 45.56,14.44 39.24,26.17 52,30 39.24,33.83 45.56,45.56 33.83,39.24 30,52 26.17,39.24 14.44,45.56 20.76,33.83 8,30 20.76,26.17 14.44,14.44 26.17,20.76'/%3E%3Cpolygon fill='%23ffffff' points='0,0 6,0 0,6'/%3E%3Cpolygon fill='%23ffffff' points='60,0 60,6 54,0'/%3E%3Cpolygon fill='%23ffffff' points='0,60 0,54 6,60'/%3E%3Cpolygon fill='%23ffffff' points='60,60 54,60 60,54'/%3E%3Cpolygon fill='%23ffffff' points='26,0 30,4 34,0'/%3E%3Cpolygon fill='%23ffffff' points='26,60 30,56 34,60'/%3E%3Cpolygon fill='%23ffffff' points='0,26 4,30 0,34'/%3E%3Cpolygon fill='%23ffffff' points='60,26 56,30 60,34'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBlock: '120px 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,169,81,.15)', border: '1px solid rgba(200,169,81,.3)', borderRadius: 999, padding: '6px 20px', marginBottom: 'var(--space-5)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {t('home.hero.badge')}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,6vw,68px)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 800, marginInline: 'auto' }}>
            {t('home.hero.title1')}<br />
            <span style={{ color: 'var(--gold)' }}>{t('home.hero.title2')}</span><br />
            {t('home.hero.title3')}
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,.75)', fontWeight: 300, lineHeight: 1.75, maxWidth: 560, marginInline: 'auto', marginBottom: 'var(--space-10)' }}>
            {t('home.hero.sub')}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/don" className="btn btn--gold btn--lg">{t('home.hero.ctaDonate')}</Link>
            <Link to="/projets" className="btn btn--outline btn--lg" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,.4)' }}>{t('home.hero.ctaProjects')}</Link>
          </div>
        </div>
      </section>

      {/* ── À PROPOS INTRO ───────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }} className="reveal" ref={addReveal}>
            <span className="section-label">{t('home.about.label')}</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('home.about.title')}</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
            <p className="section-body" style={{ marginInline: 'auto' }}>
              {t('home.about.body')}
            </p>
          </div>
          <div className="grid-3" style={{ marginBottom: 'var(--space-10)' }}>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🤝</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>{t('home.about.objectivesTitle')}</h3>
              {t('home.about.objectivesLead') && (
                <p style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600, marginBottom: 'var(--space-3)', textAlign: 'left' }}>{t('home.about.objectivesLead')}</p>
              )}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'left' }}>
                {objectives.map(item => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, marginTop: 1 }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--green)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>{t('home.about.missionTitle')}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.85)', lineHeight: 1.8, fontWeight: 300 }}>
                {t('home.about.missionBody')}
              </p>
            </div>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🌱</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>{t('home.about.valuesTitle')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {values.map((v, i) => (
                  <div key={v} style={{ background: i % 2 === 0 ? 'var(--green-light)' : 'var(--gold-light)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: 13, fontWeight: 600, color: i % 2 === 0 ? 'var(--green)' : '#92710a' }}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/a-propos" className="btn btn--primary">{t('home.about.more')}</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <div className="stats" ref={statsRef}>
        <div className="container">
          <div className="stats__grid">
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className={`stats__num${s.gold ? ' stats__gold' : ''}`}>
                  <CountUp target={s.num} suffix={s.suffix} active={statsVisible} locale={numLocale} />
                </div>
                <div className="stats__label">{t(`home.stats.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }} className="reveal" ref={addReveal}>
            <span className="section-label">{t('home.projects.label')}</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('home.projects.title')}</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
            <p className="section-body" style={{ marginInline: 'auto' }}>{t('home.projects.body')}</p>
          </div>
          <div className="grid-3" style={{ marginBottom: 'var(--space-10)' }}>
            {PROJECTS.filter((p) => p.featured).map((p) => (
              <ProjectCard key={p.id} project={p} variant="home" />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/projets" className="btn btn--outline">{t('home.projects.all')}</Link>
          </div>
        </div>
      </section>

      {/* ── DON CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>{t('home.donCta.label')}</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>{t('home.donCta.title')}</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', fontWeight: 300, maxWidth: 560, marginInline: 'auto', marginBottom: 'var(--space-8)', lineHeight: 1.75 }}>
            {t('home.donCta.body')}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/don" className="btn btn--gold btn--lg">{t('home.donCta.btnDonate')}</Link>
            <Link to="/zakat" className="btn btn--white btn--lg">{t('home.donCta.btnZakat')}</Link>
          </div>
        </div>
      </section>

      {/* ── ZAKAT COMPACT ─────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <span className="section-label">{t('home.zakat.label')}</span>
          <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('home.zakat.title')}</h2>
          <span className="accent-line" style={{ marginInline: 'auto' }} />
          <p className="section-body" style={{ marginInline: 'auto', marginBottom: 'var(--space-8)' }}>
            {t('home.zakat.body')}
          </p>
          <Link to="/zakat" className="btn btn--primary btn--lg">{t('home.zakat.btn')}</Link>
        </div>
      </section>

      {/* ── FAQ PREVIEW ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span className="section-label">{t('home.faq.label')}</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>{t('home.faq.title')}</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
          </div>
          <div className="faq__list" style={{ marginBottom: 'var(--space-8)' }}>
            {faqItems.map(({ q, a }, i) => (
              <FaqItem key={i} q={q} a={a} defaultOpen={i === 0} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/faq" className="btn btn--outline">{t('home.faq.all')}</Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-section)', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>{t('home.contact.title')}</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>
            {t('home.contact.body')} · <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a> · <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">{t('home.contact.btn')}</Link>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
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
