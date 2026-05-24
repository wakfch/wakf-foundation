import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer style={{ background: '#0f1f14', color: 'rgba(255,255,255,.75)', paddingTop: 'var(--space-16)', fontFamily: 'var(--font-body)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-10)', paddingBottom: 'var(--space-12)', borderBottom: '1px solid rgba(255,255,255,.1)' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', textDecoration: 'none' }}>
              <img src={logo} alt="Fondation Wakef" style={{ height: 48, borderRadius: 8, objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Fondation Wakef</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '.06em' }}>Suisse · depuis 2009</div>
              </div>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.7, fontWeight: 300, marginBottom: 'var(--space-4)' }}>
              Une œuvre durable pour les générations futures.<br />
              CHE-114.901.246 · Art. 80 CC
            </p>
            <a href="mailto:info@wakf.ch" style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 500 }}>info@wakf.ch</a><br />
            <a href="tel:+41793799646" style={{ color: 'rgba(255,255,255,.6)', fontSize: 13 }}>+41 79 379 96 46</a>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>Navigation</p>
            {[['Accueil', '/'], ['À Propos', '/a-propos'], ['Nos Projets', '/projets'], ['Actualités', '/blog'], ['Contact', '/contact']].map(([label, to]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.65)', marginBottom: 'var(--space-2)', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--white)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}
              >{label}</Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>Services</p>
            {[['Calculateur Zakat', '/zakat'], ['Faire un don', '/don'], ['FAQ', '/faq'], ['Statuts', '/statuts']].map(([label, to]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.65)', marginBottom: 'var(--space-2)', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--white)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>Adresses</p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,.6)', marginBottom: 'var(--space-4)' }}>
              <strong style={{ color: 'rgba(255,255,255,.85)' }}>Siège social</strong><br />
              Ave de la Confrérie 11<br />
              1008 Prilly (VD)
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,.6)' }}>
              <strong style={{ color: 'rgba(255,255,255,.85)' }}>Bureau de contact</strong><br />
              Rue de Mardertsch 64<br />
              2503 Bienne (BE)
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5) 0', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
            © {new Date().getFullYear()} Fondation Wakef – Suisse · CHE-114.901.246
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            {[['Confidentialité', '/confidentialite'], ['Mentions légales', '/mentions-legales']].map(([label, to]) => (
              <Link key={to} to={to} style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.8)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
              >{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
