import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    title: 'Mosquée Madretsch',
    type: 'Lieu de culte',
    ville: 'Bienne, BE',
    date: '2009',
    surface: '496 m²',
    pct: 100,
    status: 'Terminé',
    statusCss: 'badge--green',
    img: 'https://picsum.photos/600/320?grayscale&random=1',
    excerpt: 'Construction et aménagement de la mosquée Madretsch, premier grand projet de la Fondation.',
  },
  {
    id: 2,
    title: 'Centre Al Iman',
    type: 'Centre islamique',
    ville: 'Fribourg, FR',
    date: '2018',
    surface: '132 m²',
    pct: 90,
    status: 'En cours',
    statusCss: 'badge--gold',
    img: 'https://picsum.photos/600/320?grayscale&random=2',
    excerpt: 'Rénovation et extension du Centre Al Iman pour mieux accueillir la communauté fribourgeoise.',
  },
  {
    id: 3,
    title: 'Centre Al Badr',
    type: 'Centre culturel',
    ville: 'Le Locle, NE',
    date: '2017',
    surface: '2 029 m²',
    pct: 65,
    status: 'En cours',
    statusCss: 'badge--gold',
    img: 'https://picsum.photos/600/320?grayscale&random=3',
    excerpt: 'Grand centre culturel et islamique au cœur du canton de Neuchâtel, un projet d\'envergure.',
  },
];

const STATS = [
  { num: 3, suffix: '', label: 'Projets réalisés', gold: false },
  { num: 15, suffix: '+', label: 'Années d\'action', gold: true },
  { num: 50, suffix: 'k', label: 'CHF capital de dotation', gold: false },
  { num: 2657, suffix: ' m²', label: 'Surface construite', gold: false },
];

function CountUp({ target, suffix, active }) {
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
  return <>{val.toLocaleString('fr-CH')}{suffix}</>;
}

const TESTIMONIALS = [
  { text: 'Grâce à la Fondation Wakef, notre communauté dispose enfin d\'un lieu de culte digne. Le professionnalisme et la transparence sont exemplaires.', name: 'Imam Youssef A.', role: 'Bienne' },
  { text: 'Le calculateur de Zakat est simple et fiable. J\'ai pu m\'acquitter de mon obligation en quelques minutes, avec un reçu fiscal en plus.', name: 'Fatima M.', role: 'Lausanne' },
  { text: 'Je soutiens la Fondation depuis 2015. Chaque rapport annuel montre exactement comment mes dons sont utilisés. Une transparence totale.', name: 'Hassan B.', role: 'Zürich' },
];

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [tIdx, setTIdx] = useState(0);
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
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
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0d2b14 0%, #1e5229 50%, #2d7a3a 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingBlock: '120px 80px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,169,81,.15)', border: '1px solid rgba(200,169,81,.3)', borderRadius: 999, padding: '6px 20px', marginBottom: 'var(--space-5)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Fondation Wakef – Suisse · CHE-114.901.246
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,6vw,68px)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 800, marginInline: 'auto' }}>
            Bâtir un héritage<br />
            <span style={{ color: 'var(--gold)' }}>islamique durable</span><br />
            en Suisse
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,.75)', fontWeight: 300, lineHeight: 1.75, maxWidth: 560, marginInline: 'auto', marginBottom: 'var(--space-10)' }}>
            Depuis 2009, la Fondation Wakef finance des mosquées, des centres islamiques et des programmes éducatifs pour la communauté musulmane de Suisse.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/don" className="btn btn--gold btn--lg">Faire un don →</Link>
            <Link to="/projets" className="btn btn--outline btn--lg" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,.4)' }}>Nos projets</Link>
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
                  <CountUp target={s.num} suffix={s.suffix} active={statsVisible} />
                </div>
                <div className="stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECTS ──────────────────────────────────────────── */}
      <section className="section" ref={addReveal}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }} className="reveal" ref={addReveal}>
            <span className="section-label">Nos réalisations</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>Projets phares</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
            <p className="section-body" style={{ marginInline: 'auto' }}>Trois projets emblématiques qui illustrent notre mission de construire des espaces durables pour la communauté musulmane en Suisse.</p>
          </div>
          <div className="grid-3" style={{ marginBottom: 'var(--space-10)' }}>
            {PROJECTS.map((p) => (
              <article className="projet-card" key={p.id}>
                <div className="projet-card__img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="projet-card__body">
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className={`badge ${p.statusCss}`}>{p.status}</span>
                  </div>
                  <span className="projet-card__tag">{p.type}</span>
                  <h3 className="projet-card__title">{p.title}</h3>
                  <p className="projet-card__location">📍 {p.ville} · 📅 {p.date} · {p.surface}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.excerpt}</p>
                  {p.pct > 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)' }}>Financement</span>
                        <span style={{ fontWeight: 700, color: 'var(--green)' }}>{p.pct}%</span>
                      </div>
                      <div className="projet-card__bar"><div className="projet-card__bar-fill" style={{ width: `${p.pct}%` }} /></div>
                    </div>
                  )}
                  <Link to="/projets" className="projet-card__link">Voir le projet →</Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/projets" className="btn btn--outline">Tous nos projets →</Link>
          </div>
        </div>
      </section>

      {/* ── DON CTA ───────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>Soutenir la Fondation</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>Votre don compte</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', fontWeight: 300, maxWidth: 520, marginInline: 'auto', marginBottom: 'var(--space-8)' }}>
            CHF 50 aide un enfant à apprendre l'arabe. CHF 200 finance une journée de construction. CHF 1 000 contribue à un carré musulman. Chaque franc bâtit l'avenir.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/don" className="btn btn--gold btn--lg">Faire un don maintenant →</Link>
            <Link to="/zakat" className="btn btn--white btn--lg">Calculer ma Zakat</Link>
          </div>
        </div>
      </section>

      {/* ── ZAKAT COMPACT ─────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <span className="section-label">Pilier de l'Islam</span>
          <h2 className="section-title" style={{ marginInline: 'auto' }}>Évaluateur de Zakat</h2>
          <span className="accent-line" style={{ marginInline: 'auto' }} />
          <p className="section-body" style={{ marginInline: 'auto', marginBottom: 'var(--space-8)' }}>
            Nisab actuel : CHF/€ 4 600 (≈ 85g d'or) · Taux : 2,5% du patrimoine net. Calculez votre obligation annuelle en quelques secondes.
          </p>
          <Link to="/zakat" className="btn btn--primary btn--lg">Ouvrir le calculateur →</Link>
        </div>
      </section>

      {/* ── FAQ PREVIEW ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span className="section-label">Questions fréquentes</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>On répond à vos questions</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
          </div>
          <div className="faq__list" style={{ marginBottom: 'var(--space-8)' }}>
            {[
              ['La Fondation est-elle reconnue d\'utilité publique ?', 'Oui. La Fondation Wakef – Suisse est reconnue d\'utilité publique par les autorités fiscales suisses. Vos dons sont déductibles des impôts selon les règles cantonales en vigueur.'],
              ['Comment sont utilisés les dons ?', 'Chaque franc collecté est affecté à des projets concrets (mosquées, centres islamiques, bourses). Nous publions un rapport annuel détaillant l\'utilisation de tous les fonds.'],
              ['Puis-je obtenir un reçu fiscal ?', 'Oui. Nous émettons automatiquement un reçu fiscal pour tout don dès CHF 20. Contactez-nous à info@wakf.ch si vous n\'avez pas reçu le vôtre.'],
            ].map(([q, a], i) => (
              <FaqItem key={i} q={q} a={a} defaultOpen={i === 0} />
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/faq" className="btn btn--outline">Toutes les questions →</Link>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ───────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
          <span className="section-label">Témoignages</span>
          <h2 className="section-title" style={{ marginInline: 'auto' }}>Ce que dit la communauté</h2>
          <span className="accent-line" style={{ marginInline: 'auto' }} />
          <div style={{ position: 'relative', minHeight: 180 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
                opacity: tIdx === i ? 1 : 0, transform: `translateY(${tIdx === i ? 0 : 12}px)`,
                transition: 'opacity .5s, transform .5s', pointerEvents: tIdx === i ? 'auto' : 'none',
              }}>
                <div style={{ fontSize: 36, color: 'var(--gold)', marginBottom: 'var(--space-3)' }}>"</div>
                <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 'var(--space-4)', fontWeight: 300 }}>{t.text}</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--green)' }}>{t.name}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{
                width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: tIdx === i ? 'var(--green)' : 'var(--border)', transition: 'background .3s', padding: 0,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── À PROPOS BRIEF ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <span className="section-label">Notre mission</span>
              <h2 className="section-title">Fondée en 2009, une mission durable</h2>
              <span className="accent-line" />
              <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                La Fondation Wakef – Suisse finance des projets d'infrastructure islamique depuis 2009 : mosquées, centres islamiques, bourses d'études et carrés musulmans.
              </p>
              <p className="section-body" style={{ marginBottom: 'var(--space-6)' }}>
                Toutes les opérations sont validées par notre Comité Charia et conformes à la finance islamique — sans intérêt, en total transparence.
              </p>
              <Link to="/a-propos" className="btn btn--primary">En savoir plus →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              {[['🕌', 'Lieux de culte', 'Construire et assainir les mosquées en Suisse'], ['📖', 'Imams & intégration', 'Former les imams et les intégrer dans la société suisse'], ['🎓', 'Bourses d\'études', 'Soutenir les étudiants musulmans en Suisse'], ['⚰️', 'Carrés musulmans', 'Créer des carrés islamiques dans les cimetières suisses']].map(([icon, title, desc]) => (
                <div key={title} style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
                  <div style={{ fontSize: 28, marginBottom: 'var(--space-2)' }}>{icon}</div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>{title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 300 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.section .container>div{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-section)', padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>Une question ? Contactez-nous</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>
            Notre équipe répond dans les 48h · <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a> · <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg">Nous écrire →</Link>
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
      {open && <div className="faq__answer"><p>{a}</p></div>}
    </div>
  );
}
