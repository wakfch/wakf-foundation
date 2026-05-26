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
    statut: 'termine',
    img: 'https://picsum.photos/600/320?grayscale&random=1',
    excerpt: 'Premier grand projet de la Fondation Wakef : construction et aménagement de la mosquée Madretsch à Bienne. Un espace de 496 m² au service de la communauté musulmane de Madretsch.',
  },
  {
    id: 2,
    slug: 'aliman',
    title: 'Centre Al Iman',
    type: 'Centre islamique',
    ville: 'Fribourg, FR',
    date: '2018',
    surface: '132 m²',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=2',
    excerpt: 'Centre islamique opéré par l\'Association Culturelle Albanaise (CCA) — philosophie d\'ouverture totale, transcendant les nationalités pour accueillir toute la communauté fribourgeoise.',
  },
  {
    id: 3,
    slug: 'albadr',
    title: 'Centre Al Badr',
    type: 'Centre culturel',
    ville: 'Le Locle, NE',
    date: '2017',
    surface: '2 029 m²',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=3',
    excerpt: 'Seule mosquée à la frontière franco-suisse — rénovation d\'un bâtiment historique de 1902 et extension de 1 400 m² pour un grand centre culturel islamique.',
  },
  {
    id: 4,
    slug: 'annour',
    title: 'Mosquée An-Nour',
    type: 'Lieu de culte',
    ville: 'Sion, VS',
    date: '2024',
    surface: '420 m²',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=4',
    excerpt: 'Première mosquée arabophone du canton du Valais. Phase 1 (210 m²) finalisée ; Phase 2 (210 m²) en cours avec promesse de vente jusqu\'à fin 2026.',
  },
  {
    id: 5,
    slug: 'bibliotheque',
    title: 'Bibliothèque Mobile',
    type: 'Programme éducatif',
    ville: 'Suisse romande',
    date: '2023',
    surface: 'Itinérante',
    statut: 'en-cours',
    img: 'https://picsum.photos/600/320?grayscale&random=5',
    excerpt: '« Ponts du Savoir » — bibliothèque itinérante multilingue favorisant le dialogue interculturel. Slogan : « Faisons connaissance. Le savoir nous rassemble. »',
  },
];

const STATUTS = [
  { slug: 'tous', label: 'Tous' },
  { slug: 'termine', label: 'Terminés' },
  { slug: 'en-cours', label: 'En cours' },
];

export default function Projets() {
  const [filter, setFilter] = useState('tous');

  const visible = filter === 'tous' ? PROJECTS : PROJECTS.filter(p => p.statut === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef Suisse</span>
          <h1 className="page-hero__title">Nos Projets</h1>
          <p className="page-hero__sub">Chaque projet construit un héritage durable pour la communauté musulmane en Suisse. Explorez nos réalisations passées et en cours.</p>
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
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
              {STATUTS.map(s => (
                <button
                  key={s.slug}
                  onClick={() => setFilter(s.slug)}
                  style={{
                    padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all .3s', minHeight: 44,
                    background: filter === s.slug ? 'var(--green)' : 'var(--white)',
                    color: filter === s.slug ? 'var(--white)' : 'var(--text-muted)',
                    border: filter === s.slug ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                  }}
                >{s.label}</button>
              ))}
            </div>

            {visible.length > 0 ? (
              <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
                {visible.map(p => (
                  <article className="projet-card" key={p.id} id={p.slug}>
                    <div className="projet-card__img">
                      <img src={p.img} alt={p.title} loading="lazy" />
                    </div>
                    <div className="projet-card__body">
                      <span className="projet-card__tag">{p.type}</span>
                      <h3 className="projet-card__title">{p.title}</h3>
                      <p className="projet-card__location">📍 {p.ville}</p>
                      <p className="projet-card__location" style={{ color: 'var(--text-faint)' }}>📅 {p.date} · {p.surface}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300 }}>{p.excerpt}</p>
                      <Link to={`/projets/${p.slug}`} className="projet-card__link">En savoir plus →</Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: 16 }}>Aucun projet dans cette catégorie pour le moment.</p>
              </div>
            )}

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
