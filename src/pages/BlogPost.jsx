import { Link, useParams } from 'react-router-dom';
import { usePost } from '../hooks/useWordPress';

const STATIC = {
  'inauguration-centre-cultuel': {
    tag: 'Centre cultuel', date: '15 avril 2025',
    title: 'Inauguration de nouveaux locaux pour le centre cultuel',
    content: '<p>Grâce aux contributions de nos donateurs, un nouveau centre cultuel a été inauguré en Suisse, offrant un espace digne et accueillant pour la communauté musulmane locale.</p><p>Cet espace de plus de 500 m² comprend une salle de prière pour 300 fidèles, des salles de cours pour l\'enseignement de l\'arabe et une bibliothèque islamique. Un véritable héritage pour les générations futures.</p><h3>Un projet collectif</h3><p>Ce projet a été rendu possible grâce aux dons de centaines de membres de la communauté et au travail acharné du Comité de direction de la Fondation Wakef.</p>',
    img: 10,
  },
  'rapport-annuel-2025': {
    tag: 'Rapport', date: '1 janvier 2025',
    title: 'Rapport annuel : bilan des actions 2025',
    content: '<p>Notre rapport annuel 2025 détaille l\'utilisation de chaque franc collecté. Nous avons financé 3 projets majeurs pour un total de CHF 1 350 000 investis dans la communauté musulmane suisse.</p><h3>Points forts 2025</h3><ul><li>Centre Al Badr — Le Locle : 65% financé (CHF 552 500 collectés)</li><li>Centre Al Iman — Fribourg : 90% financé (CHF 108 000 collectés)</li><li>Mosquée Madretsch — Bienne : 100% terminé</li></ul><p>Merci à tous nos donateurs pour leur confiance et leur générosité.</p>',
    img: 12,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const { data: wpPost, isLoading, isError } = usePost(slug);

  const post = !isLoading && !isError && wpPost
    ? {
        tag: wpPost._embedded?.['wp:term']?.[1]?.[0]?.name || 'Actualité',
        date: new Date(wpPost.date).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' }),
        title: wpPost.title.rendered,
        content: wpPost.content.rendered,
        img: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }
    : STATIC[slug];

  if (isLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--nav-h)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Chargement…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)', paddingTop: 'var(--nav-h)' }}>
        <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>Article introuvable.</p>
        <Link to="/blog" className="btn btn--outline">← Retour aux actualités</Link>
      </div>
    );
  }

  return (
    <>
      <div style={{
        height: 360, background: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.3)), url(${post.img || `https://picsum.photos/1200/400?grayscale&random=${slug}`}) center/cover`,
        display: 'flex', alignItems: 'flex-end', paddingTop: 'var(--nav-h)',
      }}>
        <div className="container" style={{ paddingBottom: 'var(--space-10)' }}>
          <span className="badge badge--gold" style={{ marginBottom: 'var(--space-3)', display: 'inline-block' }}>{post.tag}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: 'var(--white)', lineHeight: 1.2, maxWidth: 700 }}>{post.title}</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 'var(--space-3)' }}>{post.date}</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/blog">Actualités</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{post.title.slice(0, 40)}…</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div style={{ maxWidth: 760, marginInline: 'auto', padding: '0 var(--space-6)' }}>
            <div style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.85, fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: post.content }} />

            <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <Link to="/blog" className="btn btn--outline btn--sm">← Retour aux actualités</Link>
              <Link to="/don" className="btn btn--primary btn--sm">Soutenir la Fondation →</Link>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .section h2, .section h3 { font-family: var(--font-heading); color: var(--text-heading); margin: var(--space-8) 0 var(--space-4); }
        .section h2 { font-size: 22px; }
        .section h3 { font-size: 18px; }
        .section p { margin-bottom: var(--space-4); }
        .section ul, .section ol { padding-left: var(--space-6); margin-bottom: var(--space-4); }
        .section li { margin-bottom: var(--space-2); font-size: 15px; color: var(--text-muted); }
        .section a { color: var(--green); }
      `}</style>
    </>
  );
}
