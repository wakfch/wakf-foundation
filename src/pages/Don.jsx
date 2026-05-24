import { useState } from 'react';
import { Link } from 'react-router-dom';

const AMOUNTS = [20, 50, 100, 200, 500, 1000];
const TYPES = ['Don libre', 'Zakat', 'Sadaqah', 'Zakat al-Fitr', 'Waqf', 'Kaffarah'];
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'xyzabcde';

export default function Don() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [type, setType] = useState('Don libre');
  const [recurring, setRecurring] = useState('unique');
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          montant: finalAmount,
          type_don: type,
          frequence: recurring,
          _subject: `Don ${type} — CHF ${finalAmount}`,
        }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Soutenir la Fondation</span>
          <h1 className="page-hero__title">Faire un Don</h1>
          <p className="page-hero__sub">Votre générosité construit des mosquées, finance des bourses d'études et crée des espaces pour les générations futures. Chaque franc compte.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Faire un don</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div className="don__grid">
              {/* Left: Form */}
              <div>
                <div className="don__form-card">
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 'var(--space-6)', color: 'var(--text-heading)' }}>Votre don</h2>

                  {/* Fréquence */}
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
                    {[['unique', 'Don unique'], ['mensuel', 'Don mensuel']].map(([val, label]) => (
                      <button key={val} onClick={() => setRecurring(val)} className={`don__tab${recurring === val ? ' active' : ''}`}>{label}</button>
                    ))}
                  </div>

                  {/* Montants */}
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>Montant (CHF)</p>
                  <div className="don__amounts">
                    {AMOUNTS.map(a => (
                      <button key={a} onClick={() => { setAmount(a); setCustomAmount(''); }}
                        className={`don__amount-btn${amount === a && !customAmount ? ' active' : ''}`}>
                        CHF {a}
                      </button>
                    ))}
                  </div>
                  <input type="number" placeholder="Autre montant (CHF)" min="1" value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    className="form-input" style={{ marginBottom: 'var(--space-5)' }} />

                  {/* Type de don */}
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>Type de don</p>
                  <div className="don__type-tabs" style={{ marginBottom: 'var(--space-6)' }}>
                    {TYPES.map(t => (
                      <button key={t} onClick={() => setType(t)} className={`don__tab${type === t ? ' active' : ''}`}>{t}</button>
                    ))}
                  </div>

                  {/* Coordonnées */}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--text-heading)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>Vos coordonnées</h3>

                  {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)', background: 'var(--green-light)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ fontSize: 40, marginBottom: 'var(--space-3)' }}>✅</div>
                      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--green)', fontSize: 18, marginBottom: 'var(--space-2)' }}>Demande envoyée !</p>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Nous vous recontacterons sous 48h pour finaliser votre don et vous envoyer un reçu fiscal.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        <div className="form-group">
                          <label className="form-label">Prénom *</label>
                          <input required className="form-input" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nom *</label>
                          <input required className="form-input" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email * (pour le reçu fiscal)</label>
                        <input required type="email" className="form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Message (optionnel)</label>
                        <textarea className="form-textarea" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                      </div>

                      {status === 'error' && (
                        <div style={{ padding: 'var(--space-3)', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', fontSize: 14, color: '#dc2626' }}>
                          Une erreur est survenue. Veuillez réessayer ou nous contacter directement à <a href="mailto:info@wakf.ch" style={{ color: '#dc2626' }}>info@wakf.ch</a>.
                        </div>
                      )}

                      <div style={{ padding: 'var(--space-4)', background: 'var(--gold-light)', border: '1px solid rgba(200,169,81,.3)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text-heading)' }}>Récapitulatif :</strong> {type} {recurring === 'mensuel' ? 'mensuel' : 'unique'} de <strong style={{ color: 'var(--green)' }}>CHF {finalAmount || '?'}</strong>
                      </div>

                      <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Envoi en cours…' : `Confirmer le don de CHF ${finalAmount || '?'} →`}
                      </button>
                      <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>
                        🔒 Vos données sont protégées · Reçu fiscal garanti · Don déductible des impôts
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Right: Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {/* Impact */}
                <div style={{ background: 'linear-gradient(135deg, var(--green-dark), var(--green))', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', color: 'var(--white)' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-5)' }}>L'impact de votre don</p>
                  {[
                    ['CHF 20', 'Finance une journée d\'école de langue arabe pour un enfant'],
                    ['CHF 50', 'Contribue aux fournitures scolaires d\'un élève pour un an'],
                    ['CHF 200', 'Finance une journée de travaux dans un centre islamique'],
                    ['CHF 500', 'Aide à l\'acquisition de mobilier liturgique pour une mosquée'],
                    ['CHF 1 000', 'Contribue significativement à un carré musulman'],
                  ].map(([amt, desc]) => (
                    <div key={amt} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                      <span style={{ background: 'rgba(200,169,81,.25)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', fontSize: 13, fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>{amt}</span>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Garanties */}
                <div style={{ background: 'var(--bg-section)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, marginBottom: 'var(--space-4)', color: 'var(--text-heading)' }}>Nos garanties</p>
                  {[
                    ['🔒', 'Paiement 100% sécurisé'],
                    ['🧾', 'Reçu fiscal pour déduction d\'impôts (Suisse)'],
                    ['☪️', 'Conformité Charia — sans intérêt'],
                    ['📊', 'Rapport annuel d\'utilisation des fonds'],
                    ['🏛️', 'Fondation reconnue d\'utilité publique'],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{text}</p>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div style={{ textAlign: 'center', padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>Questions ? Contactez-nous</p>
                  <a href="mailto:info@wakf.ch" style={{ color: 'var(--green)', fontWeight: 600, fontSize: 14 }}>info@wakf.ch</a>
                  <br />
                  <a href="tel:+41793799646" style={{ color: 'var(--text-muted)', fontSize: 13 }}>+41 79 379 96 46</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virement bancaire */}
        <section className="section section--alt">
          <div className="container" style={{ maxWidth: 680 }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-3)' }}>Don par virement bancaire</h2>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 300 }}>Pour les dons importants ou si vous préférez un virement, voici nos coordonnées bancaires.</p>
            </div>
            <div className="legal-box">
              <div className="legal-box__title">Coordonnées bancaires</div>
              <div className="legal-box__grid">
                {[
                  ['Bénéficiaire', 'Fondation Wakef – Suisse'],
                  ['IBAN', 'CH.. (sur demande à info@wakf.ch)'],
                  ['BIC / SWIFT', 'Sur demande'],
                  ['Référence', 'Votre nom + type de don'],
                  ['Email de confirmation', 'info@wakf.ch'],
                  ['Tél.', '+41 79 379 96 46'],
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
      </main>
    </>
  );
}
