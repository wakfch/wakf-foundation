import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wakef_cookies');
    if (!stored) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem('wakef_cookies', 'accepted'); setVisible(false); };
  const refuse = () => { localStorage.setItem('wakef_cookies', 'refused'); setVisible(false); };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: 'var(--white)', borderTop: '2px solid var(--border)',
      boxShadow: '0 -4px 24px rgba(0,0,0,.10)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
        flexWrap: 'wrap', padding: 'var(--space-5) var(--space-6)',
      }}>
        <div style={{ fontSize: 24, flexShrink: 0 }}>🍪</div>
        <p style={{ flex: 1, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, minWidth: 260 }}>
          Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.{' '}
          <Link to="/confidentialite" style={{ color: 'var(--green)', fontWeight: 600 }}>
            Politique de confidentialité
          </Link>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0, flexWrap: 'wrap' }}>
          <button
            onClick={refuse}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border)', background: 'transparent',
              color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-heading)',
              fontWeight: 600, cursor: 'pointer', transition: 'all .2s', minHeight: 44,
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--green)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Refuser
          </button>
          <button
            onClick={accept}
            style={{
              padding: '10px 24px', borderRadius: 'var(--radius-md)', border: 'none',
              background: 'var(--green)', color: 'var(--white)', fontSize: 13,
              fontFamily: 'var(--font-heading)', fontWeight: 700, cursor: 'pointer',
              transition: 'all .2s', minHeight: 44,
            }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--green-dark)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--green)'}
          >
            Accepter tous les cookies
          </button>
        </div>
      </div>
    </div>
  );
}
