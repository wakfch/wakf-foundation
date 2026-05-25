import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    num: 1,
    titre: 'Dénomination et durée',
    contenu: 'Il est constitué sous le nom de « Fondation WAKEF – SUISSE » (ci-après « la Fondation ») une fondation de droit privé suisse au sens des articles 80 et suivants du Code civil suisse. La durée de la Fondation est illimitée.',
  },
  {
    num: 2,
    titre: 'Siège',
    contenu: 'Le siège de la Fondation est à Prilly, dans le canton de Vaud (Suisse).',
  },
  {
    num: 3,
    titre: 'But',
    contenu: 'La Fondation a pour but de soutenir et de financer des projets à caractère religieux, éducatif, social et humanitaire, conformément aux valeurs de l\'Islam et dans le respect des lois suisses. La Fondation exerce ses activités exclusivement en Suisse. Elle poursuit en particulier les objectifs suivants : (1) Construire, acheter et assainir les lieux de culte musulman ; (2) Contribuer à la formation des imams et à leur intégration dans la société suisse ; (3) Soutenir les écoles de langue arabe et de culture musulmane ; (4) Offrir des bourses d\'études à des étudiants musulmans ; (5) Encourager les activités caritatives, éducatives, scientifiques et socioculturelles ; (6) Soutenir la création de carrés musulmans dans les cimetières suisses.',
  },
  {
    num: 4,
    titre: 'Capital de dotation',
    contenu: 'Le capital de dotation est fixé à CHF 50 000 (cinquante mille francs suisses) en espèces. La Fondation gère ce capital selon les principes de liquidité, sécurité, rendement et répartition des risques. Ce capital est inaliénable et affecté exclusivement aux buts de la Fondation.',
  },
  {
    num: 5,
    titre: 'Ressources',
    contenu: 'Les ressources de la Fondation proviennent du capital de dotation et de ses revenus, des dons et legs de personnes physiques ou morales, des subventions accordées par des organismes publics ou privés, et de tout autre revenu compatible avec le but de la Fondation.',
  },
  {
    num: 6,
    titre: 'Responsabilité des organes',
    contenu: 'Les membres des organes de la Fondation sont responsables des dommages qu\'ils causent intentionnellement ou par négligence dans l\'exercice de leurs fonctions, conformément aux dispositions du Code des obligations suisse.',
  },
  {
    num: 7,
    titre: 'Organes',
    contenu: 'Les organes de la Fondation sont : le Conseil de fondation (CF), le Comité de direction (CD), également appelé Bureau, le Groupe de travail (GT), et l\'organe de révision.',
  },
  {
    num: 8,
    titre: 'Conseil de fondation',
    contenu: 'Le Conseil de fondation est composé de 7 à 10 membres, tous de confession musulmane. Les trois quarts au moins des membres doivent être domiciliés en Suisse. Les membres sont cooptés à la majorité des deux tiers des membres en exercice. Les membres exercent leurs fonctions à titre bénévole.',
  },
  {
    num: 9,
    titre: 'Compétences du Conseil de fondation',
    contenu: 'Le Conseil de fondation est l\'organe suprême de la Fondation. Il est compétent pour : définir la direction stratégique de la Fondation, autoriser les actes de signature au nom de la Fondation, nommer et révoquer les membres du Comité de direction, approuver le budget annuel et les comptes, édicter les règlements internes, et toute autre décision réservée au CF par les présents statuts.',
  },
  {
    num: 10,
    titre: 'Réunions du Conseil de fondation',
    contenu: 'Le Conseil de fondation se réunit au moins une fois par an. L\'ordre du jour est communiqué aux membres au moins 30 jours avant la réunion. Le quorum est atteint lorsque la majorité des membres est présente, dont obligatoirement le Président ou le Vice-président. Les décisions sont prises à la majorité simple des membres présents.',
  },
  {
    num: 11,
    titre: 'Comité de direction',
    contenu: 'Le Comité de direction (Bureau) est composé du Président, du Vice-président et du Secrétaire. Les membres du Comité de direction sont élus par le Conseil de fondation pour une durée de cinq ans, renouvelable.',
  },
  {
    num: 12,
    titre: 'Attributions du Comité de direction',
    contenu: 'Le Comité de direction exécute les décisions du Conseil de fondation et représente la Fondation à l\'égard des tiers par la signature collective à deux. Il établit le budget annuel et le bilan de la Fondation, et gère les affaires courantes.',
  },
  {
    num: 13,
    titre: 'Réunions du Comité de direction',
    contenu: 'Le Comité de direction se réunit au moins quatre fois par an pour traiter des affaires courantes et assurer le suivi des projets en cours.',
  },
  {
    num: 14,
    titre: 'Opposition',
    contenu: 'Tout membre du Conseil de fondation peut former opposition à une décision du Comité de direction dans un délai de 30 jours. L\'opposition a un effet suspensif et la décision contestée est soumise au Conseil de fondation.',
  },
  {
    num: 15,
    titre: 'Organe de révision',
    contenu: 'L\'organe de révision est externe et indépendant de la Fondation. Il est désigné par le Conseil de fondation pour une durée d\'un an, renouvelable. Il vérifie les comptes annuels et établit un rapport à l\'intention du Conseil de fondation et de l\'autorité de surveillance.',
  },
  {
    num: 16,
    titre: 'Comptabilité',
    contenu: 'L\'exercice comptable couvre la période du 1er janvier au 31 décembre. Les états financiers annuels sont soumis à l\'approbation du Conseil de fondation dans les six mois suivant la clôture de l\'exercice.',
  },
  {
    num: 17,
    titre: 'Modification des statuts',
    contenu: 'Les présents statuts peuvent être modifiés par décision du Conseil de fondation prise à la majorité des deux tiers des membres en exercice. Le but de la Fondation est intangible et ne peut être modifié.',
  },
  {
    num: 18,
    titre: 'Dissolution',
    contenu: 'La dissolution de la Fondation est régie par les articles 88 et 89 du Code civil suisse. Elle est prononcée par l\'autorité de surveillance compétente.',
  },
  {
    num: 19,
    titre: 'Irrévocabilité des biens',
    contenu: 'En cas de dissolution, les biens de la Fondation sont transférés à une ou plusieurs institutions suisses de droit public ou reconnues d\'utilité publique, poursuivant un but analogue et exonérées d\'impôts. Cette clause est intangible. Les fondateurs renoncent irrévocablement à tout droit sur les biens de la Fondation.',
  },
  {
    num: 20,
    titre: 'Autorité de surveillance',
    contenu: 'La Fondation est soumise à la surveillance de l\'autorité compétente conformément aux articles 84 du Code civil suisse et 96 de l\'ordonnance sur le registre du commerce (ORC). La Fondation peut solliciter une dispense de surveillance conformément à l\'article 87 CC.',
  },
  {
    num: 21,
    titre: 'Registre',
    contenu: 'La Fondation est inscrite au registre du commerce du canton de Vaud.',
  },
];

export default function Statuts() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Documents officiels</span>
          <h1 className="page-hero__title">Statuts de la Fondation</h1>
          <p className="page-hero__sub">Les statuts officiels de la Fondation Wakef – Suisse, enregistrée sous CHE-114.901.246 selon l'art. 80 CC. Adoptés le 5 juin 2009, modifiés le 13 avril 2018.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item"><Link to="/a-propos">À Propos</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Statuts</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 860 }}>

            <div style={{ background: 'var(--green-light)', border: '1px solid rgba(45,122,58,.15)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', marginBottom: 'var(--space-10)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>Fondation WAKEF – SUISSE</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    Numéro IDE : CHE-114.901.246<br />
                    Fondée le 5 juin 2009 · Modifiée le 13 avril 2018<br />
                    Art. 80 ss Code civil suisse · Siège : Prilly (VD)
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Signataires</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>El Khatib Sahbi</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>Safi Samir</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              {ARTICLES.map((art, idx) => (
                <div
                  key={art.num}
                  style={{
                    padding: 'var(--space-8)',
                    borderBottom: idx < ARTICLES.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: 'var(--space-6)',
                    alignItems: 'start',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700, color: 'var(--green)',
                    flexShrink: 0,
                  }}>
                    {art.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>
                      Art. {art.num} — {art.titre}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8, fontWeight: 300 }}>{art.contenu}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-10)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/a-propos" className="btn btn--outline btn--sm">← Retour À Propos</Link>
              <a href="mailto:info@wakf.ch" className="btn btn--primary btn--sm">Demander une copie officielle</a>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
