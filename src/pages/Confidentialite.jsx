import { Link } from 'react-router-dom';

export default function Confidentialite() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Protection des données</span>
          <h1 className="page-hero__title">Politique de confidentialité</h1>
          <p className="page-hero__sub">Fondation Wakef – Suisse · CHE-114.901.246 · Conformité RGPD & LPD suisse</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Confidentialité</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-10)', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8 }}>
              {[
                ['1. Responsable du traitement', 'La Fondation Wakef – Suisse (CHE-114.901.246), Avenue de la Confrérie 11, 1008 Prilly (VD), est responsable du traitement de vos données personnelles au sens du Règlement général sur la protection des données (RGPD) et de la Loi fédérale sur la protection des données (LPD).'],
                ['2. Données collectées', 'Nous collectons uniquement les données nécessaires : nom et prénom, adresse email, numéro de téléphone (si fourni), montant et type de don, et toute information que vous nous fournissez via le formulaire de contact.'],
                ['3. Finalités du traitement', 'Vos données sont utilisées pour : traiter votre don et émettre un reçu fiscal, répondre à vos demandes de contact, envoyer notre newsletter (avec votre consentement), et satisfaire nos obligations légales (fiscales, comptables).'],
                ['4. Bases légales', 'Le traitement est fondé sur : votre consentement (newsletter), l\'exécution d\'un contrat (dons), nos obligations légales (reçus fiscaux, comptabilité), et notre intérêt légitime (sécurité et amélioration du service).'],
                ['5. Durée de conservation', 'Vos données de don sont conservées 10 ans (obligation légale suisse). Les données de contact sont supprimées sur demande ou après 3 ans d\'inactivité. Les données newsletter sont supprimées dès désinscription.'],
                ['6. Partage des données', 'Vos données ne sont jamais vendues. Elles peuvent être partagées avec : Formspree (traitement des formulaires), Mailchimp (newsletter), et les autorités fiscales suisses (reçus fiscaux uniquement).'],
                ['7. Vos droits', 'Conformément au RGPD et à la LPD, vous avez le droit d\'accès, de rectification, de suppression, de portabilité et d\'opposition. Pour exercer ces droits, contactez-nous à info@wakf.ch.'],
                ['8. Cookies', 'Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement (pas de cookies publicitaires ou de suivi tiers). Vous pouvez désactiver les cookies dans votre navigateur.'],
                ['9. Contact & réclamations', 'Pour toute question, contactez : info@wakf.ch · +41 79 379 96 46. Vous pouvez également déposer une réclamation auprès du Préposé fédéral à la protection des données (PFPDT).'],
              ].map(([title, content]) => (
                <div key={title} style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>{title}</h3>
                  <p>{content}</p>
                </div>
              ))}
              <p style={{ fontSize: 12, color: 'var(--text-faint)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
                Dernière mise à jour : janvier 2025 · Contact : <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
