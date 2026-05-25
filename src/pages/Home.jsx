import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    slug: 'madretsch',
    title: 'Mosquée Madretsch',
    type: 'Lieu de culte',
    ville: 'Bienne, BE',
    date: '2009',
    surface: '496 m²',
    img: 'https://picsum.photos/600/320?grayscale&random=1',
    excerpt: 'Construction et aménagement de la mosquée Madretsch, premier grand projet de la Fondation Wakef.',
  },
  {
    id: 2,
    slug: 'aliman',
    title: 'Centre Al Iman',
    type: 'Centre islamique',
    ville: 'Fribourg, FR',
    date: '2018',
    surface: '132 m²',
    img: 'https://picsum.photos/600/320?grayscale&random=2',
    excerpt: 'Centre islamique ouvert à toutes les nationalités — philosophie d\'ouverture totale au cœur de Fribourg.',
  },
  {
    id: 3,
    slug: 'albadr',
    title: 'Centre Al Badr',
    type: 'Centre culturel',
    ville: 'Le Locle, NE',
    date: '2017',
    surface: '2 029 m²',
    img: 'https://picsum.photos/600/320?grayscale&random=3',
    excerpt: 'Seule mosquée à la frontière franco-suisse — rénovation d\'un bâtiment historique de 1902.',
  },
];

const STATS = [
  { num: 5, suffix: '', label: 'Projets financés', gold: false },
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='%23ffffff' points='30,2 34.6,18.9 49.8,10.2 41.1,25.4 58,30 41.1,34.6 49.8,49.8 34.6,41.1 30,58 25.4,41.1 10.2,49.8 18.9,34.6 2,30 18.9,25.4 10.2,10.2 25.4,18.9'/%3E%3C/svg%3E")`,
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

      {/* ── À PROPOS INTRO ───────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }} className="reveal" ref={addReveal}>
            <span className="section-label">Qui sommes-nous</span>
            <h2 className="section-title" style={{ marginInline: 'auto' }}>La Fondation Wakef – Suisse</h2>
            <span className="accent-line" style={{ marginInline: 'auto' }} />
            <p className="section-body" style={{ marginInline: 'auto' }}>
              Fondée en 2009, fondation de droit privé suisse (art. 80 CC) dédiée au financement de projets islamiques durables sur le territoire helvétique.
            </p>
          </div>
          <div className="grid-3" style={{ marginBottom: 'var(--space-10)' }}>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🤝</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>Objectifs</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', textAlign: 'left' }}>
                {['Lieux de culte musulman', 'Formation & intégration des imams', 'Enseignement de l\'arabe', 'Bourses d\'études', 'Activités caritatives', 'Carrés musulmans'].map(item => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, marginTop: 1 }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--green)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>Mission</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.85)', lineHeight: 1.8, fontWeight: 300 }}>
                Bâtir un héritage islamique durable en Suisse en finançant des mosquées, centres islamiques et programmes éducatifs — en conformité avec les valeurs de l'Islam et le droit civil suisse.
              </p>
            </div>
            <div className="reveal" ref={addReveal} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>🌱</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>Valeurs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {['Pérennité', 'Intégrité', 'Transparence', 'Institutionnalisme', 'Innovation', 'Coopération'].map((v, i) => (
                  <div key={v} style={{ background: i % 2 === 0 ? 'var(--green-light)' : 'var(--gold-light)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: 13, fontWeight: 600, color: i % 2 === 0 ? 'var(--green)' : '#92710a' }}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/a-propos" className="btn btn--primary">En savoir plus →</Link>
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
      <section className="section">
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
                  <span className="projet-card__tag">{p.type}</span>
                  <h3 className="projet-card__title">{p.title}</h3>
                  <p className="projet-card__location">📍 {p.ville} · 📅 {p.date} · {p.surface}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.excerpt}</p>
                  <Link to={`/projets/${p.slug}`} className="projet-card__link">En savoir plus →</Link>
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
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', fontWeight: 300, maxWidth: 560, marginInline: 'auto', marginBottom: 'var(--space-8)', lineHeight: 1.75 }}>
            Votre don, quel que soit son montant, contribue directement au financement de nos projets Waqf en Suisse : mosquées, centres islamiques et accompagnement de la communauté musulmane. Chaque contribution est une Sadaqa Jariya — une aumône qui dure.
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
      <div className="faq__answer"><p>{a}</p></div>
    </div>
  );
}
