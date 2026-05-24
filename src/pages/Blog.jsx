import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/useWordPress';

const STATIC_POSTS = [
  { id: 1, slug: 'inauguration-centre-cultuel', tag: 'Centre cultuel', date: '15 avril 2025', title: 'Inauguration de nouveaux locaux pour le centre cultuel', excerpt: 'Grâce à vos contributions, un nouveau centre cultuel a été inauguré en Suisse, offrant un espace digne et accueillant pour la communauté musulmane locale.', img: 10 },
  { id: 2, slug: 'bourses-2026', tag: 'Éducation', date: '2 mars 2025', title: 'Programme de bourses 2026 : ouverture des candidatures', excerpt: 'La Fondation Wakef – Suisse ouvre les candidatures pour son programme de bourses d\'études 2026. Les étudiants musulmans domiciliés en Suisse sont invités à postuler avant le 30 juin 2025.', img: 11 },
  { id: 3, slug: 'rapport-annuel-2025', tag: 'Rapport', date: '1 janvier 2025', title: 'Rapport annuel : bilan des actions 2025', excerpt: 'Notre rapport annuel détaille l\'utilisation de chaque franc collecté, les projets réalisés en Suisse et nos objectifs pour 2026. Transparence totale, conformément à notre charte.', img: 12 },
  { id: 4, slug: 'zakat-al-mal', tag: 'Zakat', date: '10 novembre 2024', title: 'Rappel : la Zakat al-Māl — calculez et acquittez-vous', excerpt: 'À l\'approche de la fin d\'année lunaire, nous rappelons à notre communauté l\'importance de s\'acquitter de la Zakat. Notre calculateur en ligne est disponible gratuitement.', img: 13 },
  { id: 5, slug: 'partenariat-islamic-relief', tag: 'Partenariat', date: '5 septembre 2024', title: 'Renforcement de notre réseau de partenaires', excerpt: 'La Fondation Wakef – Suisse renforce son réseau pour mieux coordonner les projets islamiques en Suisse.', img: 14 },
  { id: 6, slug: 'carre-musulman-berne', tag: 'Cimetière', date: '20 juillet 2024', title: 'Projet de carré musulman à Berne : appel à contributions', excerpt: 'Nous lançons une campagne pour la création d\'un carré musulman dans un cimetière bernois afin que la communauté musulmane puisse être inhumée selon les rites islamiques.', img: 15 },
];

export default function Blog() {
  const { data: wpPosts, isLoading, isError } = usePosts();
  const [tag, setTag] = useState('Tous');

  const posts = (!isLoading && !isError && wpPosts && wpPosts.length > 0)
    ? wpPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        tag: p._embedded?.['wp:term']?.[1]?.[0]?.name || 'Actualité',
        date: new Date(p.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' }),
        title: p.title.rendered,
        excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) + '…',
        img: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }))
    : STATIC_POSTS;

  const tags = ['Tous', ...new Set(posts.map(p => p.tag))];
  const visible = tag === 'Tous' ? posts : posts.filter(p => p.tag === tag);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef – Suisse</span>
          <h1 className="page-hero__title">Actualités</h1>
          <p className="page-hero__sub">Restez informé de l'avancement de nos projets, de nos actions sur le terrain et des nouvelles de la communauté.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Actualités</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            {/* Tag filters */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
              {tags.map(t => (
                <button key={t} onClick={() => setTag(t)} style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s', minHeight: 44,
                  background: tag === t ? 'var(--green)' : 'var(--white)',
                  color: tag === t ? 'var(--white)' : 'var(--text-muted)',
                  border: tag === t ? '1.5px solid var(--green)' : '1.5px solid var(--border)',
                }}>{t}</button>
              ))}
            </div>

            {isLoading && (
              <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--text-muted)' }}>
                <p>Chargement des actualités…</p>
              </div>
            )}

            <div className="grid-3">
              {visible.map(p => (
                <article className="actu-card" key={p.id}>
                  <div className="actu-card__img">
                    <img src={p.img || `https://picsum.photos/600/300?grayscale&random=${p.id}`} alt={p.title} loading="lazy" />
                  </div>
                  <div className="actu-card__body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="actu-card__tag">{p.tag}</span>
                      <span className="actu-card__date">{p.date}</span>
                    </div>
                    <h3 className="actu-card__title">{p.title}</h3>
                    <p className="actu-card__excerpt">{p.excerpt}</p>
                    <Link to={`/blog/${p.slug}`} className="actu-card__link">Lire la suite →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
