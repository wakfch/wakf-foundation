import { Link, useParams } from 'react-router-dom';

const PROJECTS = {
  madretsch: {
    title: 'Mosquée Madretsch',
    subtitle: 'Premier grand projet de la Fondation Wakef – Suisse',
    ville: 'Bienne (Madretsch), BE',
    annee: '2009',
    surface: '496 m²',
    type: 'Lieu de culte',
    statut: 'Réalisé',
    img: 'https://picsum.photos/1200/500?grayscale&random=1',
    intro: 'La Mosquée Madretsch, inaugurée en 2009 à Bienne, est le premier grand projet de la Fondation Wakef – Suisse. Avec ses 496 m², elle accueille la communauté musulmane du quartier de Madretsch et constitue le fondement sur lequel la Fondation a bâti son expertise en matière de financement islamique en Suisse.',
    objectifs: [
      'Créer un espace de culte digne pour la communauté musulmane de Madretsch',
      'Offrir un cadre d\'apprentissage pour la langue arabe et l\'éducation islamique',
      'Favoriser l\'intégration et le vivre-ensemble dans le tissu local biennois',
    ],
    fiche: [
      { label: 'Localisation', value: 'Bienne (Madretsch), canton de Berne' },
      { label: 'Année', value: '2009' },
      { label: 'Surface totale', value: '496 m²' },
      { label: 'Type', value: 'Lieu de culte' },
      { label: 'Statut', value: 'Réalisé' },
    ],
    description: 'Premier grand projet de la Fondation, la Mosquée Madretsch témoigne de la capacité de la Fondation Wakef à mener à bien des projets d\'infrastructure islamique en Suisse. Ce projet a posé les bases de notre modèle opérationnel : financement communautaire transparent, gestion professionnelle et ancrage local fort.',
    avancement: 'Projet réalisé et pleinement opérationnel depuis 2009. La mosquée accueille quotidiennement la communauté de Madretsch et constitue un repère stable pour toute la région.',
    vision: 'La Mosquée Madretsch demeure un modèle de référence : un espace de culte bien intégré dans son quartier, au service d\'une communauté diverse et unie, symbole de la pérennité que la Fondation Wakef cherche à incarner.',
  },
  aliman: {
    title: 'Centre Al Iman',
    subtitle: 'Centre islamique ouvert à toutes les nationalités',
    ville: 'Fribourg, FR',
    annee: '2018',
    surface: '132 m²',
    type: 'Centre islamique',
    statut: 'En cours',
    operateur: 'Association Culturelle Albanaise (CCA)',
    img: 'https://picsum.photos/1200/500?grayscale&random=2',
    intro: 'Le Centre Al Iman à Fribourg, opéré par l\'Association Culturelle Albanaise (CCA), incarne une philosophie d\'ouverture totale : transcender les nationalités pour accueillir l\'ensemble de la communauté musulmane fribourgeoise. Construit en 1997, il couvre 132 m² au cœur de la ville.',
    objectifs: [
      'Rénover et moderniser les infrastructures pour mieux accueillir les fidèles',
      'Offrir un espace de culte dépassant les frontières nationales et culturelles',
      'Renforcer le lien entre la communauté musulmane et la société fribourgeoise',
    ],
    fiche: [
      { label: 'Localisation', value: 'Fribourg, canton de Fribourg' },
      { label: 'Construction', value: '1997' },
      { label: 'Financement Wakef', value: '2018' },
      { label: 'Surface', value: '132 m²' },
      { label: 'Opérateur', value: 'Association Culturelle Albanaise (CCA)' },
      { label: 'Statut', value: 'En cours' },
    ],
    description: 'Le Centre Al Iman se distingue par sa philosophie d\'ouverture totale : ses portes sont ouvertes à toutes les nationalités et cultures, au-delà des origines de l\'association gestionnaire. C\'est un lieu de rencontre, d\'apprentissage et de prière pour toute la communauté musulmane fribourgeoise, reflet du cosmopolitisme de la ville.',
    avancement: 'Travaux de rénovation partiellement réalisés. La Fondation Wakef accompagne l\'Association CCA dans la finalisation des aménagements intérieurs et l\'optimisation des espaces.',
    vision: 'Faire du Centre Al Iman un modèle d\'intégration et d\'ouverture, où la diversité de l\'islam suisse trouve son expression la plus harmonieuse — un centre communautaire au sens plein du terme.',
  },
  albadr: {
    title: 'Centre Al Badr',
    subtitle: 'La seule mosquée à la frontière franco-suisse',
    ville: 'Le Locle, NE',
    annee: '2017',
    surface: '2 029 m² (terrain)',
    type: 'Centre culturel islamique',
    statut: 'En cours',
    img: 'https://picsum.photos/1200/500?grayscale&random=3',
    intro: 'Le Centre Al Badr au Locle est un projet d\'envergure unique : avec un terrain de 2 029 m², dont 600 m² déjà bâtis et 1 400 m² destinés à l\'extension, il est la seule mosquée présente à la frontière franco-suisse. Le bâtiment existant, construit en 1902, est remarquable par son intérêt architectural.',
    objectifs: [
      'Rénovation complète du bâtiment historique de 1902',
      'Construction moderne d\'une extension de 1 400 m²',
      'Créer le seul pôle culturel islamique à la frontière franco-suisse',
    ],
    fiche: [
      { label: 'Localisation', value: 'Le Locle, canton de Neuchâtel' },
      { label: 'Financement Wakef', value: '2017' },
      { label: 'Terrain total', value: '2 029 m²' },
      { label: 'Surface bâtie existante', value: '600 m²' },
      { label: 'Extension prévue', value: '1 400 m²' },
      { label: 'Salle de prière hommes', value: '70 m²' },
      { label: 'Salle de prière femmes', value: '60 m²' },
      { label: 'Bâtiment historique', value: 'Construit en 1902' },
      { label: 'Statut', value: 'En cours' },
    ],
    description: 'Le Centre Al Badr est le projet le plus ambitieux de la Fondation Wakef. Situé à quelques pas de la frontière française, il dessert une communauté transfrontalière unique. Le projet intègre la préservation d\'un patrimoine architectural remarquable (bâtiment de 1902) avec une vision résolument moderne pour son extension.',
    avancement: 'Phase 1 réalisée : salle de prière pour hommes (70 m²) et femmes (60 m²) opérationnelles. Phase 2 en cours : rénovation complète du bâtiment historique et construction de l\'extension de 1 400 m².',
    vision: 'Faire du Centre Al Badr un centre culturel islamique de référence pour les communautés du Locle et des régions frontalières françaises — alliant patrimoine et modernité, en un lieu unique en Suisse.',
  },
  annour: {
    title: 'Mosquée An-Nour',
    subtitle: 'Première mosquée arabophone du Valais',
    ville: 'Sion, VS',
    annee: '2024',
    surface: '420 m²',
    type: 'Lieu de culte',
    statut: 'En cours',
    budget: 'CHF 900 000',
    operateur: 'Association An-Nour',
    img: 'https://picsum.photos/1200/500?grayscale&random=4',
    intro: 'La Mosquée An-Nour à Sion est un projet historique : première mosquée arabophone du canton du Valais, elle répond aux besoins d\'une communauté jusqu\'alors sans espace de culte adapté. Avec un budget de CHF 900 000 et une surface de 420 m², ce projet se déploie en deux phases portées par l\'Association An-Nour.',
    objectifs: [
      'Offrir au Valais sa première mosquée arabophone digne et adaptée',
      'Finaliser les deux phases de construction (210 m² + 210 m²)',
      'Ancrer durablement la communauté arabophone dans la région sédunoise',
    ],
    fiche: [
      { label: 'Localisation', value: 'Sion, canton du Valais' },
      { label: 'Surface totale', value: '420 m²' },
      { label: 'Budget total', value: 'CHF 900 000' },
      { label: 'Opérateur', value: 'Association An-Nour' },
      { label: 'Phase 1', value: '210 m² — finalisée' },
      { label: 'Phase 2', value: '210 m² — promesse de vente jusqu\'à fin 2026' },
      { label: 'Statut', value: 'En cours' },
    ],
    description: 'Le Valais accueille une communauté musulmane arabophone importante, longtemps privée d\'un lieu de culte à sa mesure. La Mosquée An-Nour, portée par l\'Association An-Nour avec le soutien de la Fondation Wakef, comble ce vide historique. La Phase 1 de 210 m² est d\'ores et déjà opérationnelle.',
    avancement: 'Phase 1 (210 m²) : finalisée et opérationnelle. Phase 2 (210 m²) : promesse de vente signée, valable jusqu\'à fin 2026. Collecte de fonds en cours pour finaliser l\'acquisition et les travaux.',
    vision: 'Faire de la Mosquée An-Nour le cœur spirituel de la communauté arabophone valaisanne — un espace de prière, d\'apprentissage et de vie communautaire pour les générations présentes et futures.',
  },
  bibliotheque: {
    title: 'Bibliothèque Mobile',
    subtitle: '« Ponts du Savoir » — Le savoir nous rassemble',
    ville: 'Suisse romande',
    annee: '2023',
    surface: 'Itinérante',
    type: 'Programme éducatif',
    statut: 'En cours',
    slogan: 'Faisons connaissance. Le savoir nous rassemble.',
    img: 'https://picsum.photos/1200/500?grayscale&random=5',
    intro: 'La Bibliothèque Mobile « Ponts du Savoir » est un projet unique en Suisse romande : une bibliothèque itinérante multilingue dédiée au dialogue interculturel. Elle se déplace dans les événements culturels, les espaces publics et les lieux de vie pour aller à la rencontre des communautés là où elles se trouvent.',
    objectifs: [
      'Favoriser le dialogue interculturel par le partage des savoirs',
      'Rendre les ressources multilingues accessibles à toutes les communautés',
      'Former des ambassadeurs du dialogue interculturel en Suisse romande',
    ],
    fiche: [
      { label: 'Zone d\'action', value: 'Suisse romande (itinérante)' },
      { label: 'Format', value: 'Bibliothèque mobile' },
      { label: 'Langues', value: 'Multilingue' },
      { label: 'Cibles', value: 'Événements culturels, espaces publics' },
      { label: 'Équipe', value: 'Ambassadeurs du dialogue interculturel' },
      { label: 'Conformité', value: 'Conforme à la LPD' },
      { label: 'Statut', value: 'En cours' },
    ],
    description: 'Sous le slogan « Faisons connaissance. Le savoir nous rassemble. », la Bibliothèque Mobile sillonne la Suisse romande pour créer des ponts entre les communautés. L\'équipe d\'ambassadeurs ne transporte pas seulement des livres — elle transporte des histoires, des langues, et l\'élan d\'une rencontre authentique entre des personnes de cultures différentes.',
    avancement: 'Programme actif depuis 2023. Présence régulière dans les événements culturels et espaces publics de Suisse romande. Réseau d\'ambassadeurs en développement continu.',
    vision: 'Faire de la Bibliothèque Mobile « Ponts du Savoir » une référence nationale pour le dialogue interculturel par l\'éducation — en s\'appuyant sur le pouvoir rassembleur universel de la connaissance.',
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)', textAlign: 'center', padding: 'var(--space-8)' }}>
        <div style={{ fontSize: 64 }}>🕌</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--text-heading)' }}>Projet introuvable</h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>Ce projet n'existe pas ou n'est plus disponible.</p>
        <Link to="/projets" className="btn btn--primary">Voir tous les projets →</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero" style={{ textAlign: 'left' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">{project.type}</span>
          <h1 className="page-hero__title" style={{ marginInline: 0 }}>{project.title}</h1>
          <p className="page-hero__sub" style={{ marginInline: 0 }}>{project.subtitle}</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📍 {project.ville}</span>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📅 {project.annee}</span>
            <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: 'rgba(255,255,255,.9)' }}>📐 {project.surface}</span>
          </div>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/projets">Nos Projets</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">{project.title}</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-12)', alignItems: 'start' }}>

              <div>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-10)' }}>
                  <img src={project.img} alt={project.title} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <span className="section-label">Introduction</span>
                  <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.8, marginTop: 'var(--space-3)' }}>{project.intro}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>Objectifs du projet</h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {project.objectifs.map((obj, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 15, color: 'var(--text-body)', lineHeight: 1.6 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--green-light)', color: 'var(--green)', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>Description</h2>
                  <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8, fontWeight: 300 }}>{project.description}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>État d'avancement</h2>
                  <div style={{ background: 'var(--green-light)', border: '1px solid rgba(45,122,58,.15)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
                    <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.7 }}>{project.avancement}</p>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-10)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-5)' }}>Vision future</h2>
                  <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>{project.vision}</p>
                </div>
              </div>

              <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + var(--space-6))' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
                  <div style={{ background: 'var(--green)', padding: 'var(--space-5) var(--space-6)' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>Fiche technique</h3>
                  </div>
                  <div style={{ padding: 'var(--space-2)' }}>
                    {project.fiche.map(f => (
                      <div key={f.label} style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-faint)', marginBottom: 2 }}>{f.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>🤝</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-3)' }}>Soutenir ce projet</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', lineHeight: 1.6, marginBottom: 'var(--space-6)', fontWeight: 300 }}>
                    Votre contribution est une Sadaqa Jariya — une aumône qui dure et profite à la communauté.
                  </p>
                  <Link to={`/don?projet=${slug}`} className="btn btn--gold" style={{ display: 'block', textAlign: 'center' }}>
                    Faire un don →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .project-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
