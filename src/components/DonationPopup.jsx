import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DonationPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('donation-popup-dismissed')) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('donation-popup-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 8888,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 0 env(safe-area-inset-bottom)',
        animation: 'dp-in .3s ease',
      }}
    >
      <style>{`
        @keyframes dp-in { from { opacity:0 } to { opacity:1 } }
        @keyframes dp-up { from { transform:translateY(100%) } to { transform:translateY(0) } }
        .dp-card { animation: dp-up .35s cubic-bezier(.22,1,.36,1); }
        @media (min-width: 600px) {
          .dp-wrap { align-items: center !important; padding: 16px !important; }
          .dp-card { border-radius: 20px !important; max-width: 420px !important; width: 100%; }
        }
      `}</style>

      <div
        className="dp-card"
        style={{
          background: 'linear-gradient(160deg, #0d2b14 0%, #1e5229 60%, #2d7a3a 100%)',
          borderRadius: '20px 20px 0 0',
          padding: '28px 24px 36px',
          width: '100%',
          maxWidth: 480,
          position: 'relative',
          boxShadow: '0 -4px 40px rgba(0,0,0,.35)',
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Fermer"
          style={{
            position: 'absolute', top: 14, right: 16,
            background: 'rgba(255,255,255,.12)', border: 'none',
            color: '#fff', width: 32, height: 32, borderRadius: '50%',
            fontSize: 16, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🕌</div>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '.15em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: 8,
          }}>Sadaqa Jariya</p>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800,
            color: '#fff', lineHeight: 1.25, marginBottom: 10,
          }}>
            Aidez-nous à construire<br />d'autres projets
          </h2>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,.75)', lineHeight: 1.65,
            fontWeight: 300, marginBottom: 22, maxWidth: 320, marginInline: 'auto',
          }}>
            Chaque don contribue à financer des mosquées, centres islamiques et programmes éducatifs pour la communauté musulmane en Suisse.
          </p>

          <Link
            to="/don"
            onClick={dismiss}
            className="btn btn--gold"
            style={{ display: 'block', fontSize: 15, padding: '14px 24px', marginBottom: 12 }}
          >
            Faire un don maintenant →
          </Link>

          <button
            onClick={dismiss}
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,.45)',
              fontSize: 13, cursor: 'pointer', padding: 4,
            }}
          >
            Non merci, continuer la visite
          </button>
        </div>
      </div>
    </div>
  );
}
