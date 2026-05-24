import { useState } from 'react';
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
    pct: 100,
    montant: 380000,
    status: 'Terminé',
    statusCss: 'badge--green',
    statut: 'termine',
    img: 'https://picsum.photos/600/320?grayscale&random=1',
    excerpt: 'Premier grand projet de la Fondation : construction et aménagement de la mosquée Madretsch à Bienne. Un espace de 496 m² accueillant plus de 400 fidèles.',
    benefices: '400+ fidèles accueillis',
  },
  {
    id: 2,
    slug: 'aliman',
    title: 'Centre Al Iman',
    type: 'Centre islamique',
    ville: 'Fribourg, FR',
    date: '2018',
    surface: '132 m²',
    pct: 90,
    montant: 120000,
    status: 'En cours',
    statusCss: 'badge--gold',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=2',
    excerpt: 'Rénovation et extension du Centre Al Iman pour offrir un cadre moderne et accueillant à la communauté musulmane de Fribourg.',
    benefices: 'Communauté fribourgeoise',
  },
  {
    id: 3,
    slug: 'albadr',
    title: 'Centre Al Badr',
    type: 'Centre culturel',
    ville: 'Le Locle, NE',
    date: '2017',
    surface: '2 029 m²',
    pct: 65,
    montant: 850000,
    status: 'En cours',
    statusCss: 'badge--gold',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=3',
    excerpt: 'Le plus grand projet de la Fondation : un centre culturel et islamique de 2 029 m² au cœur du canton de Neuchâtel.',
    benefices: 'Communauté neuchâteloise',
  },
];

const STATUTS = [
  { slug: 'tous', label: 'Tous' },
  { slug: 'termine', label: 'Terminés' },
  { slug: 'en-cours', label: 'En cours' },
  { slug: 'avenir', label: 'À venir' },
];

export default function Projets() {
  const [filter, setFilter] = useState('tous');

  const visible = filter === 'tous' ? PROJECTS : PROJECTS.filter(p => p.statut === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef – Suisse</span>
          <h1 className="page-hero__title">Nos Projets</h1>
          <p className="page-hero__sub">Chaque projet construit un héritage durable pour la communauté musulmane en Suisse. Explorez nos réalisations passées, en cours et à venir.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Nos Projets</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            {/* Filters */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
              {STATUTS.map(s => (
                <button
                  key={s.slug}
                  onClick={() => setFilter(s.slug)}
                  style={{
                    padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all .2s', minHeight: 44,
                    background: filter === s.slug ? 'var(--green)' : 'var(--white)',
                    color: filter === s.slug ? 'var(--white)' : 'var(--text-muted)',
                    border: filter === s.slug ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                  }}
                >{s.label}</button>
              ))}
            </div>

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
                {visible.map(p => (
                  <article className="projet-card" key={p.id} id={p.slug}>
                    <div className="projet-card__img">
                      <img src={p.img} alt={p.title} loading="lazy" />
                    </div>
                    <div className="projet-card__body">
                      <span className={`badge ${p.statusCss}`}>{p.status}</span>
                      <span className="projet-card__tag">{p.type}</span>
                      <h3 className="projet-card__title">{p.title}</h3>
                      <p className="projet-card__location">📍 {p.ville}</p>
                      <p className="projet-card__location" style={{ color: 'var(--text-faint)' }}>📅 {p.date} · {p.surface}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>{p.excerpt}</p>
                      {p.pct > 0 && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                            <span style={{ color: 'var(--text-muted)' }}>Financement collecté</span>
                            <span style={{ fontWeight: 700, color: 'var(--green)' }}>{p.pct}%</span>
                          </div>
                          <div className="projet-card__bar"><div className="projet-card__bar-fill" style={{ width: `${p.pct}%` }} /></div>
                        </div>
                      )}
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                        Montant : <strong>CHF {p.montant.toLocaleString('fr-CH')}</strong>
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.benefices}</p>
                      <Link to="/don" className="projet-card__link">Soutenir ce projet →</Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: 16 }}>Aucun projet dans cette catégorie pour le moment.</p>
              </div>
            )}

            {/* CTA */}
            <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--green)', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>Soutenir un projet</h3>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>Chaque don contribue à un héritage durable pour la communauté musulmane en Suisse.</p>
              <Link to="/don" className="btn btn--white btn--lg">Faire un don →</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
