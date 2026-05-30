import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const location = useLocation();
  const sent = new URLSearchParams(location.search).get('sent') === '1';

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-hero__label">Fondation Wakef Suisse</span>
          <h1 className="page-hero__title">Contactez-nous</h1>
          <p className="page-hero__sub">Notre équipe répond dans les 48h ouvrables. Pour les urgences, appelez le +41 79 379 96 46.</p>
        </div>
      </div>

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb__sep">›</li>
            <li className="breadcrumb__item">Contact</li>
          </ol>
        </div>
      </nav>

      <main>
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-12)', alignItems: 'start' }}>
              {/* Info */}
              <div>
                <span className="section-label">Nous écrire</span>
                <h2 className="section-title">Restons en contact</h2>
                <span className="accent-line" />
                <p className="section-body" style={{ marginBottom: 'var(--space-8)' }}>
                  Que vous ayez des questions sur nos projets, souhaitiez faire un don ou cherchiez des informations sur la Zakat, notre équipe est à votre disposition.
                </p>

                {[
                  { icon: '✉️', label: 'Email', val: 'info@wakf.ch', href: 'mailto:info@wakf.ch' },
                  { icon: '📞', label: 'Téléphone', val: '+41 79 379 96 46', href: 'tel:+41793799646' },
                  { icon: '🏛️', label: 'Siège social', val: 'Ave de la Confrérie 11, 1008 Prilly (VD)', href: null },
                  { icon: '🏢', label: 'Bureau de contact', val: 'Rue de Mardertsch 64, 2503 Bienne (BE)', href: null },
                ].map(({ icon, label, val, href }) => (
                  <div key={label} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', marginBottom: 'var(--space-5)' }}>
                    <div style={{ width: 44, height: 44, background: 'var(--green-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 2 }}>{label}</p>
                      {href
                        ? <a href={href} style={{ fontSize: 15, fontWeight: 500, color: 'var(--green)' }}>{val}</a>
                        : <p style={{ fontSize: 14, color: 'var(--text-body)' }}>{val}</p>
                      }
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-5)', background: 'var(--gold-light)', border: '1px solid rgba(200,169,81,.25)', borderRadius: 'var(--radius-lg)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--text-heading)' }}>Numéro IDE :</strong> CHE-114.901.246<br />
                    <strong style={{ color: 'var(--text-heading)' }}>Base légale :</strong> Art. 80 CC · Fondée en 2009<br />
                    <strong style={{ color: 'var(--text-heading)' }}>Surveillance :</strong> Autorité fédérale des fondations
                  </p>
                </div>
              </div>

              {/* Form */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 'var(--space-6)' }}>Envoyer un message</h3>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
                    <div style={{ fontSize: 48, marginBottom: 'var(--space-4)' }}>✅</div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 'var(--space-3)' }}>Merci, ton message a été reçu !</h4>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Nous vous répondrons dans les 48h ouvrables.</p>
                  </div>
                ) : (
                  <form
                    method="POST"
                    action="https://formspree.io/f/mreddaay"
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                  >
                    <input type="hidden" name="_next" value="https://wakf.ch/contact?sent=1" />
                    <input type="hidden" name="_subject" value="Contact Wakef Suisse" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div className="form-group">
                        <label className="form-label">Nom complet *</label>
                        <input required name="nom" className="form-input" value={form.nom} onChange={e => set('nom', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input required type="email" name="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sujet *</label>
                      <select required name="sujet" className="form-select" value={form.sujet} onChange={e => set('sujet', e.target.value)}>
                        <option value="">Choisir un sujet…</option>
                        <option>Faire un don</option>
                        <option>Zakat & Sadaqah</option>
                        <option>Nos projets</option>
                        <option>Comité Charia</option>
                        <option>Partenariat</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message *</label>
                      <textarea required name="message" className="form-textarea" rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Votre message…" />
                    </div>
                    <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Envoyer le message →
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>Vos données sont protégées et ne seront jamais partagées.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <style>{`@media(max-width:768px){.section .container>div{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
