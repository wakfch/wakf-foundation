import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import DonationPopup from './DonationPopup';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ paddingTop: 'var(--nav-h)' }}>{children}</main>
      <Footer />
      <CookieBanner />
      <DonationPopup />
    </>
  );
}
