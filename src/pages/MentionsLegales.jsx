import { Link } from 'react-router-dom';

export default function MentionsLegales() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Informations légales</span>
          <h1 className="page-hero__title">Mentions légales</h1>
          <p className="page-hero__sub">Fondation Wakef – Suisse · CHE-114.901.246 · Art. 80 Code civil suisse</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Mentions légales</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

              {/* Identification */}
              <div className="legal-box">
                <div className="legal-box__title">Identification de l'éditeur</div>
                <div className="legal-box__grid">
                  {[
                    ['Dénomination officielle', 'Fondation WAKEF – SUISSE'],
                    ['Numéro IDE', 'CHE-114.901.246'],
                    ['Forme juridique', 'Fondation de droit privé suisse (Art. 80 CC)'],
                    ['Fondée en', '2009'],
                    ['Capital de dotation', 'CHF 50 000'],
                    ['Reconnaissance', 'Utilité publique — exonération fiscale'],
                    ['Siège social', 'Avenue de la Confrérie 11, 1008 Prilly (VD)'],
                    ['Bureau de contact', 'Rue de Mardertsch 64, 2503 Bienne (BE)'],
                    ['Email', <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>],
                    ['Téléphone', <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>],
                    ['Surveillance', 'Autorité fédérale de surveillance des fondations (ASF)'],
                    ['Site web', <a href="https://www.wakef.ch" style={{ color: 'var(--green)' }}>www.wakef.ch</a>],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p className="legal-item__label">{label}</p>
                      <p className="legal-item__value">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hébergement */}
              <div className="legal-box">
                <div className="legal-box__title">Hébergement</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Ce site est hébergé par <strong>Netlify, Inc.</strong>, 512 2nd Street, Suite 200, San Francisco, CA 94107, USA.
                  La version WordPress est hébergée par <strong>Hostinger</strong>.
                  Les données des visiteurs restent soumises aux présentes mentions légales et à notre politique de confidentialité.
                </p>
              </div>

              {/* Propriété intellectuelle */}
              <div className="legal-box">
                <div className="legal-box__title">Propriété intellectuelle</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Tous les contenus de ce site (textes, images, logo, design) sont la propriété exclusive de la Fondation Wakef – Suisse ou sont utilisés avec les autorisations nécessaires. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
                </p>
              </div>

              {/* Limitation de responsabilité */}
              <div className="legal-box">
                <div className="legal-box__title">Limitation de responsabilité</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  La Fondation Wakef – Suisse s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, elle ne peut garantir l'exhaustivité, l'exactitude ou l'actualité des informations. Les calculs de Zakat fournis par notre outil sont des estimations indicatives — consultez un savant islamique qualifié pour les situations complexes.
                </p>
              </div>

              {/* Droit applicable */}
              <div className="legal-box">
                <div className="legal-box__title">Droit applicable & juridiction</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Le présent site et ses contenus sont soumis au droit suisse. En cas de litige, les tribunaux compétents sont ceux du canton de Vaud (Suisse), sous réserve des dispositions légales impératives applicables.
                </p>
              </div>

              <Link to="/" className="btn btn--outline btn--sm" style={{ width: 'fit-content' }}>← Retour à l'accueil</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
