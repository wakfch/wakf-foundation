import { Link } from 'react-router-dom';

export default function Statuts() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Documents officiels</span>
          <h1 className="page-hero__title">Statuts de la Fondation</h1>
          <p className="page-hero__sub">Les statuts officiels de la Fondation Wakef – Suisse, enregistrée sous CHE-114.901.246 selon l'art. 80 CC.</p>
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
          <div className="container" style={{ maxWidth: 840 }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-2)' }}>Fondation WAKEF – SUISSE</h2>
                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Numéro IDE : CHE-114.901.246 · Art. 80 ss Code civil suisse · Fondée en 2009</p>
              </div>

              {[
                ['Article 1 — Dénomination', 'Il est constitué sous le nom de « Fondation WAKEF – SUISSE » (ci-après « la Fondation ») une fondation de droit privé suisse au sens des articles 80 et suivants du Code civil suisse.'],
                ['Article 2 — Siège', 'Le siège de la Fondation est à Prilly, dans le canton de Vaud (Suisse). L\'adresse postale principale est : Avenue de la Confrérie 11, 1008 Prilly. Un bureau de contact est établi à Bienne : Rue de Mardertsch 64, 2503 Bienne (BE).'],
                ['Article 3 — But', 'La Fondation a pour but de soutenir et de financer des projets à caractère religieux, éducatif, social et humanitaire, conformément aux valeurs de l\'Islam et dans le respect des lois suisses. La Fondation exerce ses activités exclusivement en Suisse. Elle poursuit en particulier les 6 objectifs suivants : (1) Construire, acheter et assainir les lieux de culte musulman ; (2) Former les imams et contribuer à leur intégration ; (3) Soutenir les écoles de langue arabe et de culture musulmane ; (4) Offrir des bourses d\'études ; (5) Encourager les activités caritatives, éducatives, scientifiques et socioculturelles ; (6) Soutenir la création de carrés musulmans dans les cimetières suisses.'],
                ['Article 4 — Capital de dotation', 'Le capital de dotation est fixé à CHF 50 000 (cinquante mille francs suisses). Ce capital est inaliénable et affecté exclusivement aux buts de la Fondation. Les revenus générés par le capital et les dons reçus sont utilisés pour financer les projets conformément aux statuts.'],
                ['Article 5 — Ressources', 'La Fondation se finance par : les revenus du capital de dotation, les dons et legs de personnes physiques ou morales, les subventions d\'organismes publics ou privés, et tout autre revenu compatible avec le but de la Fondation.'],
                ['Article 6 — Organisation', 'La Fondation est administrée par un Conseil de fondation composé d\'au moins 3 membres. Il dispose d\'un Comité de direction pour la gestion opérationnelle, d\'un Organe de révision indépendant pour le contrôle des comptes, et d\'un Comité Charia pour la validation de la conformité islamique.'],
                ['Article 7 — Conformité islamique', 'Tous les fonds collectés et projets financés sont conformes aux principes de la finance islamique et aux règles du Waqf (dotation perpétuelle islamique). Aucun intérêt (riba) n\'est perçu ou versé. Le Comité Charia valide chaque projet et mode de collecte.'],
                ['Article 8 — Utilité publique', 'La Fondation est reconnue d\'utilité publique par les autorités fiscales suisses compétentes. Elle est soumise à la surveillance de l\'Autorité fédérale de surveillance des fondations (ASF). Les dons à la Fondation sont déductibles des impôts selon les règles cantonales en vigueur.'],
                ['Article 9 — Dissolution', 'En cas de dissolution de la Fondation, les actifs seront transférés à une ou plusieurs institutions suisses reconnues d\'utilité publique poursuivant des buts analogues, conformément à la décision du Conseil de fondation et sous supervision de l\'autorité de surveillance.'],
              ].map(([title, content]) => (
                <div key={title} style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8, fontWeight: 300 }}>{content}</p>
                </div>
              ))}

              <div style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/a-propos" className="btn btn--outline btn--sm">← Retour À Propos</Link>
                <a href="mailto:info@wakf.ch" className="btn btn--primary btn--sm">Demander une copie officielle</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
