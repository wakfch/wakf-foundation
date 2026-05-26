import { useState } from 'react';
import { Link } from 'react-router-dom';

const NISAB = 4600;

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item${open ? ' open' : ''}`}>
      <div className="faq__question" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(!open)}>
        <span className="faq__question-text">{q}</span>
        <div className="faq__icon">+</div>
      </div>
      {open && <div className="faq__answer"><p dangerouslySetInnerHTML={{ __html: a }} /></div>}
    </div>
  );
}

export default function Zakat() {
  const [fields, setFields] = useState({ or: '', argent: '', liquid: '', invest: '', dettes: '' });
  const [result, setResult] = useState(null);

  const set = (k, v) => setFields(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const or = parseFloat(fields.or) || 0;
    const argent = parseFloat(fields.argent) || 0;
    const liquid = parseFloat(fields.liquid) || 0;
    const invest = parseFloat(fields.invest) || 0;
    const dettes = parseFloat(fields.dettes) || 0;
    const total = or + argent + liquid + invest;
    const net = Math.max(0, total - dettes);
    const zakat = net >= NISAB ? net * 0.025 : 0;
    setResult({ total, dettes, net, zakat, aboveNisab: net >= NISAB });
  };

  const fmt = (n) => n.toLocaleString('fr-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Pilier de l'Islam</span>
          <h1 className="page-hero__title">Évaluateur de Zakat</h1>
          <p className="page-hero__sub">Calculez votre obligation annuelle de Zakat selon les règles de la Charia. Nisab actuel : CHF/€ 4 600 (≈ 85g d'or).</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Zakat</li>
          </ol>
        </div>
      </nav>

      <main>
        {/* ── Calculateur ──────────────────────────────────────── */}
        <section className="section" id="zakat">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <span className="section-label">Outil islamique</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>Évaluateur de Zakat</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
              <p className="section-body" style={{ marginInline: 'auto' }}>Entrez la valeur de vos avoirs en CHF ou euros. La Zakat est due si votre patrimoine net dépasse le Nisab depuis une année lunaire complète (Hawl).</p>
            </div>
            <div className="zakat__grid">
              {/* Form */}
              <div className="zakat__form">
                <p className="zakat__form-title">Vos avoirs</p>
                {[
                  ['or', 'Or possédé', '(valeur en CHF/€)'],
                  ['argent', 'Argent possédé', '(valeur en CHF/€)'],
                  ['liquid', 'Liquidités', '(comptes bancaires, espèces)'],
                  ['invest', 'Investissements', '(actions, épargne)'],
                  ['dettes', 'Dettes à court terme', '(à déduire)'],
                ].map(([k, label, hint]) => (
                  <div className="zakat__field" key={k}>
                    <label>{label} <span>{hint}</span></label>
                    <input type="number" className="zakat__input" placeholder="0" min="0"
                      value={fields[k]} onChange={e => set(k, e.target.value)} />
                  </div>
                ))}
                <button className="zakat__calc-btn" onClick={calculate}>Évaluer ma Zakat →</button>
              </div>

              {/* Result */}
              <div className="zakat__result">
                <div>
                  <p className="zakat__result-label">Votre Zakat estimée</p>
                  <div className="zakat__result-amount">
                    {result ? `CHF ${fmt(result.zakat)}` : '0,00 CHF'}
                  </div>
                </div>

                {result && (
                  <div className="zakat__breakdown">
                    <div className="zakat__breakdown-row"><span>Total des avoirs</span><strong>CHF {fmt(result.total)}</strong></div>
                    <div className="zakat__breakdown-row"><span>Dettes déduites</span><strong>- CHF {fmt(result.dettes)}</strong></div>
                    <div className="zakat__breakdown-row"><span>Base imposable</span><strong>CHF {fmt(result.net)}</strong></div>
                    <div className="zakat__breakdown-row"><span>Taux Zakat</span><strong>2,5%</strong></div>
                    {!result.aboveNisab && (
                      <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-3)', background: 'rgba(255,255,255,.1)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>
                        ℹ️ Votre patrimoine net est inférieur au Nisab (CHF {NISAB.toLocaleString('fr-CH')}). Vous n'êtes pas redevable de la Zakat al-Māl cette année.
                      </div>
                    )}
                  </div>
                )}

                <div className="zakat__nisab-info">
                  <p>ℹ️ Le Nisab est fixé à la valeur de 85g d'or (~CHF 4 600). La Zakat est due si votre patrimoine net dépasse ce seuil depuis une année lunaire complète (Hawl).</p>
                </div>
                <p className="zakat__result-note">Taux appliqué : <strong style={{ color: 'var(--gold)' }}>2,5%</strong> du patrimoine net imposable.<br />Ce calcul est une estimation indicative.</p>
                <Link to="/don" className="zakat__result-donate">Donner ma Zakat maintenant →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Explications ─────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
              <span className="section-label">Comprendre</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>Nisab, Hawl et Zakat</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="grid-2">
              {[
                ['⚖️', 'Le Nisab النصاب', 'Le Nisab est le seuil minimal de richesse. Il est fixé à la valeur de 85g d\'or (ou 595g d\'argent selon les écoles). En 2025, cela correspond environ à <strong>CHF 4 600</strong>. Ce montant est réévalué selon le cours de l\'or.'],
                ['📅', 'Le Hawl — الحول', 'Le Hawl est la condition de durée : votre patrimoine doit dépasser le Nisab pendant une année lunaire complète (environ 354 jours) pour que la Zakat soit obligatoire.'],
                ['💰', 'Le taux de 2,5%', 'Le taux de la Zakat sur la richesse monétaire (Zakat al-Māl) est de <strong>2,5%</strong> du patrimoine net imposable, soit la somme totale de vos avoirs moins vos dettes à court terme.'],
                ['📦', 'Ce qui est zakatable', 'Sont zakatables : or & argent physiques, espèces, comptes bancaires, actions (valeur de marché), épargne et placements halal. Ne sont pas zakatables : résidence principale, véhicule personnel, biens d\'usage personnel.'],
              ].map(([icon, title, desc]) => (
                <div className="card" style={{ padding: 'var(--space-8)' }} key={title}>
                  <div style={{ fontSize: 36, marginBottom: 'var(--space-4)' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Zakat ─────────────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
              <span className="section-label">Questions fréquentes</span>
              <h2 className="section-title" style={{ marginInline: 'auto' }}>FAQ Zakat</h2>
              <span className="accent-line" style={{ marginInline: 'auto' }} />
            </div>
            <div className="faq__list">
              {[
                ['Puis-je payer ma Zakat en plusieurs fois ?', 'Oui, la Zakat peut être versée en plusieurs fois tout au long de l\'année lunaire, tant que le montant total est acquitté avant la date anniversaire (Hawl). Toutefois, il est préférable de la payer en une seule fois pour éviter d\'oublier une échéance.'],
                ['La Zakat sur les salaires, comment la calculer ?', 'Pour les salariés, la Zakat se calcule sur l\'épargne nette accumulée depuis un an, pas sur le salaire brut. Calculez votre épargne restante (revenus - dépenses nécessaires) au bout d\'une année lunaire. Si cette épargne dépasse le Nisab, vous devez 2,5% dessus.'],
                ['La Zakat est-elle déductible des impôts suisses ?', 'Les dons à une fondation reconnue d\'utilité publique comme la Fondation Wakef Suisse peuvent être déduits des impôts suisses selon les règles cantonales. Nous émettons des reçus fiscaux pour tous vos dons.'],
                ['Mon calculateur indique "En dessous du Nisab", suis-je exempt ?', 'Si votre patrimoine net est inférieur au Nisab (~CHF 4 600), vous n\'êtes pas redevable de la Zakat al-Māl. Vous pouvez néanmoins faire une Sadaqah voluntaire à tout moment.'],
                ['Situations complexes : entrepreneur, immobilier, crypto…', 'Pour les entrepreneurs, les biens immobiliers destinés à la revente, les cryptomonnaies ou les situations patrimoniales complexes, nous recommandons de consulter un savant islamique qualifié ou notre comité Charia. Contactez-nous à <a href="mailto:info@wakf.ch" style="color:var(--green)">info@wakf.ch</a>.'],
              ].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* ── Note savant ───────────────────────────────────────── */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-5)' }}>📚</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>Pour les situations complexes</h3>
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 'var(--space-8)' }}>Notre calculateur couvre les cas standard. Pour les entrepreneurs, détenteurs d'immobilier commercial, investisseurs ou situations patrimoniales atypiques, notre comité Charia peut vous orienter.</p>
            <Link to="/contact" className="btn btn--primary">Contacter notre comité Charia →</Link>
          </div>
        </section>
      </main>
    </>
  );
}
