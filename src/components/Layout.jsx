import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import DonationPopup from './DonationPopup';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: 'var(--nav-h)' }}>
        {/* key = chemin : la page est remontée à chaque navigation, ce qui rejoue l'animation d'entrée */}
        <div key={pathname} className="page-transition">{children}</div>
      </main>
      <Footer />
      <CookieBanner />
      <DonationPopup />
    </>
  );
}
