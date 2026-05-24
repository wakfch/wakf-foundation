import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    cat: 'Fondation',
    items: [
      ['Qu\'est-ce que la Fondation Wakef – Suisse ?', 'La Fondation Wakef – Suisse est une fondation de droit privé suisse (art. 80 CC), enregistrée sous CHE-114.901.246, fondée en 2009. Elle finance des projets d\'infrastructure islamique en Suisse : mosquées, centres islamiques, bourses d\'études et carrés musulmans dans les cimetières.'],
      ['La Fondation est-elle reconnue d\'utilité publique ?', 'Oui. La Fondation Wakef – Suisse est reconnue d\'utilité publique par les autorités fiscales suisses. Vos dons sont déductibles des impôts selon les règles cantonales en vigueur.'],
      ['Qui contrôle la Fondation ?', 'La Fondation est supervisée par l\'Autorité fédérale de surveillance des fondations. Elle dispose d\'un organe de révision indépendant qui vérifie annuellement les comptes et d\'un comité Charia qui valide la conformité islamique de chaque projet.'],
      ['Quel est le capital de dotation ?', 'Le capital de dotation initial est de CHF 50 000, conformément aux statuts enregistrés en 2009. Tous les fonds collectés s\'ajoutent à ce capital et sont utilisés exclusivement pour les projets de la Fondation.'],
    ],
  },
  {
    cat: 'Dons',
    items: [
      ['Comment faire un don ?', 'Vous pouvez faire un don via notre formulaire en ligne sur la page "Faire un don", par virement bancaire (coordonnées disponibles sur demande à info@wakf.ch), ou par courrier à notre bureau de contact à Bienne.'],
      ['Les dons sont-ils déductibles des impôts suisses ?', 'Oui. En tant que fondation reconnue d\'utilité publique, vos dons à la Fondation Wakef sont déductibles de votre revenu imposable selon les règles cantonales. Nous émettons un reçu fiscal pour tout don dès CHF 20.'],
      ['Puis-je faire un don récurrent (mensuel) ?', 'Oui. Vous pouvez opter pour un don mensuel en précisant votre souhait dans le formulaire. Notre équipe vous contactera pour mettre en place le virement automatique.'],
      ['Mon don est-il conforme à la Charia ?', 'Oui. Tous les fonds sont gérés selon les principes de la finance islamique — sans intérêt, sans spéculation, en totale transparence. Notre comité Charia valide chaque projet et mode de collecte.'],
    ],
  },
  {
    cat: 'Zakat',
    items: [
      ['Puis-je verser ma Zakat à la Fondation ?', 'Oui. La Fondation Wakef accepte la Zakat et la Sadaqah. Ces fonds sont affectés à des projets approuvés par notre comité Charia et répondant aux critères de distribution de la Zakat.'],
      ['Comment calculer ma Zakat ?', 'Utilisez notre calculateur Zakat disponible sur la page /zakat. Entrez vos avoirs (or, argent, liquidités, investissements) et vos dettes à court terme. Si votre patrimoine net dépasse le Nisab (CHF/€ 4 600) depuis une année lunaire, vous devez 2,5% de ce montant.'],
      ['Qu\'est-ce que le Nisab ?', 'Le Nisab est le seuil minimal de richesse. Il est fixé à la valeur de 85g d\'or, soit environ CHF 4 600 en 2025. Si votre patrimoine net est inférieur à ce seuil, vous n\'êtes pas redevable de la Zakat al-Māl.'],
      ['La Zakat al-Fitr est-elle différente ?', 'Oui. La Zakat al-Fitr est une aumône obligatoire versée à la fin du Ramadan, indépendamment de votre patrimoine. Son montant est fixé chaque année par les savants islamiques (généralement entre CHF 10 et 20 par personne).'],
    ],
  },
  {
    cat: 'Projets',
    items: [
      ['Quels sont les projets actuels ?', 'Nos trois projets principaux sont : la Mosquée Madretsch à Bienne (terminé, 496 m²), le Centre Al Iman à Fribourg (en cours, 132 m²) et le Centre Al Badr au Locle (en cours, 2 029 m²). Consultez la page Projets pour le détail.'],
      ['Comment les fonds sont-ils alloués ?', 'Chaque don est affecté à un fonds général ou à un projet spécifique selon votre choix. Le Conseil de fondation valide l\'allocation des fonds, et un rapport annuel détaille l\'utilisation de chaque franc collecté.'],
      ['Puis-je dédier mon don à un projet spécifique ?', 'Oui. Lors de votre don, vous pouvez préciser le projet que vous souhaitez soutenir (Mosquée Madretsch, Centre Al Iman ou Centre Al Badr). Si le projet est déjà financé, les fonds seront affectés au projet le plus urgent.'],
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item${open ? ' open' : ''}`}>
      <div className="faq__question" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(!open)}>
        <span className="faq__question-text">{q}</span>
        <div className="faq__icon">+</div>
      </div>
      {open && <div className="faq__answer"><p>{a}</p></div>}
    </div>
  );
}

export default function FAQ() {
  const [activeCat, setActiveCat] = useState('Tous');
  const cats = ['Tous', ...FAQS.map(f => f.cat)];
  const visible = activeCat === 'Tous' ? FAQS : FAQS.filter(f => f.cat === activeCat);

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef – Suisse</span>
          <h1 className="page-hero__title">Questions fréquentes</h1>
          <p className="page-hero__sub">Toutes les réponses sur la Fondation, les dons, la Zakat et nos projets. Une question sans réponse ? Écrivez-nous.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">FAQ</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)', justifyContent: 'center' }}>
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s', minHeight: 44, border: 'none',
                  background: activeCat === c ? 'var(--green)' : 'var(--bg-section)',
                  color: activeCat === c ? 'var(--white)' : 'var(--text-muted)',
                }}>{c}</button>
              ))}
            </div>

            {visible.map(group => (
              <div key={group.cat} style={{ marginBottom: 'var(--space-10)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-2)' }}>
                  {group.cat}
                </h2>
                <div className="faq__list">
                  {group.items.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-12)', padding: 'var(--space-10)', background: 'var(--green-light)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(45,122,58,.1)' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-4)' }}>💬</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>Vous n'avez pas trouvé votre réponse ?</h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 'var(--space-6)', fontWeight: 300 }}>Notre équipe répond dans les 48h ouvrables.</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn--primary">Nous contacter →</Link>
                <a href="mailto:info@wakf.ch" className="btn btn--outline">info@wakf.ch</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
