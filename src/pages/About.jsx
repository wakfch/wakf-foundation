import { Link } from 'react-router-dom';

const OBJECTIFS = [
  'Construire, acheter et assainir les lieux de culte musulman en Suisse.',
  'Offrir un cadre religieux adéquat, former les imams et contribuer à leur intégration.',
  'Soutenir les écoles de la langue arabe et de la culture musulmane en Suisse.',
  'Offrir autant que possible des bourses d\'études aux étudiants en Suisse.',
  'Encourager les activités caritatives, éducatives, scientifiques, socioculturelles et de médiation familiale.',
  'Soutenir la création et l\'aménagement de carrés musulmans dans les cimetières suisses.',
];

export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef Suisse depuis 2009</span>
          <h1 className="page-hero__title">À Propos de la Fondation</h1>
          <p className="page-hero__sub">Découvrez notre histoire, notre mission et les 6 objectifs qui guident notre action pour la communauté musulmane en Suisse.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">À Propos</li>
          </ol>
        </div>
      </nav>

      <main>
        {/* ── Histoire & Mission ──────────────────────────────── */}
        <section className="section" id="histoire">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
              <div>
                <span className="section-label">Notre histoire</span>
                <h2 className="section-title">Fondée en 2009, une mission durable</h2>
                <span className="accent-line" />
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  La Fondation Wakef Suisse a été créée en 2009 sous l'égide de l'article 80 du Code civil suisse, enregistrée sous le numéro CHE-114.901.246. Elle est née d'une conviction profonde : la communauté musulmane de Suisse mérite des institutions durables, indépendantes et gouvernées avec rigueur.
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  Son nom <em>Wakef</em> (وقف) renvoie au concept islamique de dotation perpétuelle : un bien ou une somme dédiés irrévocablement à une cause d'intérêt général, dont les revenus servent la communauté génération après génération.
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-4)' }}>
                  <strong>Notre mission :</strong> Promouvoir une citoyenneté positive à travers un cadre éducatif et religieux équilibré. Nos actions couvrent l'entretien des lieux de culte, la formation des imams, le soutien à la recherche scientifique et l'accompagnement académique des jeunes.
                </p>
                <p className="section-body" style={{ marginBottom: 'var(--space-8)' }}>
                  <strong>Notre vision :</strong> Établir une gouvernance institutionnelle garantissant l'indépendance financière des institutions musulmanes en Suisse, afin de pérenniser leur contribution pour les générations futures.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {[['🕌', '① Lieux de culte', 'Construire, acheter et assainir les mosquées et centres cultuels en Suisse.'],
                    ['📖', '② Imams & intégration', 'Offrir un cadre religieux adéquat, former les imams et contribuer à leur intégration.'],
                    ['🌍', '③ Langue arabe & culture', 'Soutenir les écoles de langue arabe et de culture musulmane en Suisse.'],
                    ['🎓', '④ Bourses d\'études', 'Offrir autant que possible des bourses aux étudiants en Suisse.']
                  ].map(([icon, title, desc]) => (
                    <div key={title} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 2 }}>{title}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Green card — 6 objectifs */}
              <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-2)' }}>Nos 6 objectifs officiels</p>
                {OBJECTIFS.map((obj, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <span style={{ width: 24, height: 24, background: 'rgba(255,255,255,.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.6 }}>{obj}</p>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255,255,255,.15)' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>2009</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Année de fondation</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>CHF 50k</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Capital de dotation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){#histoire .container>div{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* ── Gouvernance ──────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">Gouvernance</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>Notre organisation interne</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="grid-2">
              {[
                ['🏛️', 'Conseil de fondation', 'Organe suprême responsable de la stratégie, de la surveillance et du respect des statuts. Composé de membres indépendants élus conformément à l\'art. 80 CC. Il se réunit au moins une fois par an.'],
                ['⚙️', 'Comité de direction', 'Assure la gestion opérationnelle quotidienne : suivi des projets, relations partenaires, gestion financière et communication. Rend compte au Conseil de fondation avec un rapport d\'activité annuel détaillé.'],
                ['📋', 'Organe de révision', 'Conformément à la législation suisse, un organe de révision indépendant vérifie annuellement les comptes et s\'assure du respect des obligations légales et statutaires.'],
                ['☪️', 'Comité Charia', 'Un comité de savants qualifiés valide la conformité de chaque projet avec les principes islamiques. Tous les fonds sont gérés selon la finance islamique, sans intérêt, dans la transparence totale.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <span style={{ fontSize: 24 }}>{icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--text-heading)' }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mentions légales ─────────────────────────────────── */}
        <section className="section">
          <div className="container" style={{ maxWidth: 840 }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">Légal</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>Mentions légales & statut</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="legal-box">
              <div className="legal-box__title">Identification officielle de la Fondation</div>
              <div className="legal-box__grid">
                {[
                  ['Dénomination officielle', 'Fondation WAKEF SUISSE'],
                  ['Numéro d\'identification', 'CHE-114.901.246'],
                  ['Forme juridique', 'Fondation de droit privé suisse'],
                  ['Base légale', 'Art. 80 ss du Code civil suisse (CC)'],
                  ['Siège social', 'Avenue de la Confrérie 11, 1008 Prilly (VD)'],
                  ['Bureau de contact', 'Rue de Mardertsch 64, 2503 Bienne (BE)'],
                  ['Année de fondation', '2009'],
                  ['Capital de dotation', 'CHF 50 000'],
                  ['Reconnaissance d\'utilité publique', 'Oui, exonération fiscale'],
                  ['Surveillance', 'Autorité fédérale de surveillance des fondations'],
                  ['Email', <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)' }}>info@wakf.ch</a>],
                  ['Téléphone', <a href="tel:+41793799646" style={{ color: 'var(--green)' }}>+41 79 379 96 46</a>],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p className="legal-item__label">{label}</p>
                    <p className="legal-item__value">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section style={{ background: 'var(--green)', padding: 'var(--space-12) 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>Soutenir la Fondation</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.75)', marginBottom: 'var(--space-8)', fontWeight: 300 }}>Votre don contribue à un héritage durable pour la communauté musulmane en Suisse.</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/don" className="btn btn--gold btn--lg">Faire un don →</Link>
              <Link to="/statuts" className="btn btn--white btn--lg">Consulter les statuts</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
