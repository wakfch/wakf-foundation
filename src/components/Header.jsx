import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const navLinks = [
  { label: 'Accueil', to: '/', noActive: true },
  {
    label: 'À Propos',
    dropdown: [
      { label: 'Wakef Fondation', to: '/a-propos' },
      { label: 'Statuts de la Fondation', to: '/statuts' },
    ],
  },
  {
    label: 'Nos Projets',
    dropdown: [
      { label: 'Tous les projets', to: '/projets' },
      { label: 'Mosquée Madretsch Bienne', to: '/projets/madretsch' },
      { label: 'Centre Al Iman Fribourg', to: '/projets/aliman' },
      { label: 'Centre Al Badr Le Locle', to: '/projets/albadr' },
      { label: 'Mosquée An-Nour Sion', to: '/projets/annour' },
      { label: 'Bibliothèque Mobile', to: '/projets/bibliotheque' },
    ],
  },
  { label: 'Zakat', to: '/zakat' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setScrolledDown(y > lastScrollY.current && y > 60);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${scrolledDown ? ' nav--dark' : ''}${menuOpen ? ' nav--open' : ''}`}>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-h); display: flex; align-items: center;
          padding-inline: var(--space-6); gap: var(--space-8);
          transition: background .3s, box-shadow .3s;
        }
        .nav--scrolled { background: rgba(255,255,255,.97); box-shadow: var(--shadow-md); backdrop-filter: blur(12px); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) { background: rgba(10,20,12,.92); box-shadow: 0 2px 16px rgba(0,0,0,.35); backdrop-filter: blur(8px); }
        .nav:not(.nav--scrolled):not(.nav--dark):not(.nav--open) { background: transparent; }
        .nav--open { background: rgba(255,255,255,.97); }
        .nav__logo { display: flex; align-items: center; gap: var(--space-3); text-decoration: none; flex-shrink: 0; }
        .nav__logo-img { height: 44px; width: auto; border-radius: 8px; object-fit: contain; }
        .nav__logo-text { display: flex; flex-direction: column; }
        .nav__logo-name { font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--green); line-height: 1.1; }
        .nav__logo-sub { font-size: 10px; color: var(--text-faint); letter-spacing: .06em; }
        .nav__links { display: flex; align-items: center; gap: var(--space-1); flex: 1; margin-inline: var(--space-4); }
        .nav__link {
          font-size: 14px; font-weight: 500; color: var(--text-heading); padding: 8px 12px;
          border-radius: var(--radius-sm); transition: color .3s, background .3s;
          white-space: nowrap; display: flex; align-items: center; gap: 4px; cursor: pointer;
          background: none; border: none; font-family: var(--font-body);
        }
        .nav__link:hover, .nav__link--active { color: var(--green); background: var(--green-light); }
        .nav--scrolled .nav__link { color: var(--text-heading); }
        .nav:not(.nav--scrolled):not(.nav--open) .nav__link { color: rgba(255,255,255,.9); }
        .nav:not(.nav--scrolled):not(.nav--open) .nav__link:hover { color: var(--white); background: rgba(255,255,255,.15); }
        .nav:not(.nav--scrolled):not(.nav--open) .nav__logo-name { color: var(--white); }
        .nav:not(.nav--scrolled):not(.nav--open) .nav__logo-sub { color: rgba(255,255,255,.6); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) .nav__link { color: rgba(255,255,255,.9); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) .nav__link:hover { color: var(--white); background: rgba(255,255,255,.12); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) .nav__logo-name { color: var(--white); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) .nav__logo-sub { color: rgba(255,255,255,.55); }
        .nav--dark:not(.nav--scrolled):not(.nav--open) .nav__burger span { background: var(--white); }
        .nav__dropdown-wrap { position: relative; }
        .nav__dropdown {
          position: absolute; top: calc(100% + 8px); left: 0; min-width: 240px;
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg); padding: var(--space-2); z-index: 100;
          animation: dropIn .2s ease;
        }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .nav__dropdown-item { display: block; padding: 10px 14px; font-size: 14px; color: var(--text-body); border-radius: var(--radius-sm); transition: all .2s; }
        .nav__dropdown-item:hover { background: var(--green-light); color: var(--green); }
        .nav__actions { display: flex; align-items: center; gap: var(--space-3); flex-shrink: 0; }
        .nav__donate { background: var(--gold); color: var(--white); padding: 10px 22px; border-radius: var(--radius-md); font-family: var(--font-heading); font-size: 14px; font-weight: 700; transition: all .25s; white-space: nowrap; }
        .nav__donate:hover { background: #b8952f; transform: translateY(-1px); }
        .nav__burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; border-radius: var(--radius-sm); }
        .nav__burger span { display: block; width: 22px; height: 2px; background: var(--text-heading); transition: all .3s; border-radius: 2px; }
        .nav:not(.nav--scrolled):not(.nav--open) .nav__burger span { background: var(--white); }
        .nav__mobile { display: none; position: fixed; top: var(--nav-h); left: 0; right: 0; background: var(--white); box-shadow: var(--shadow-lg); padding: var(--space-4); border-top: 1px solid var(--border); z-index: 999; max-height: calc(100vh - var(--nav-h)); overflow-y: auto; }
        .nav__mobile.open { display: block; }
        .nav__mobile-link { display: block; padding: 12px 16px; font-size: 15px; font-weight: 500; color: var(--text-heading); border-radius: var(--radius-md); transition: all .2s; }
        .nav__mobile-link:hover { background: var(--green-light); color: var(--green); }
        .nav__mobile-sub { padding-left: var(--space-4); }
        .nav__mobile-sublabel { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--text-faint); padding: 8px 16px; }
        @media (max-width: 900px) {
          .nav__links { display: none; }
          .nav__burger { display: flex; }
          .nav__actions .nav__donate { display: none; }
        }
      `}</style>

      <Link to="/" className="nav__logo">
        <img src={logo} alt="Fondation Wakef" className="nav__logo-img" />
        <div className="nav__logo-text">
          <span className="nav__logo-name">Fondation Wakef</span>
          <span className="nav__logo-sub">Suisse · depuis 2009</span>
        </div>
      </Link>

      <nav className="nav__links" ref={dropRef}>
        {navLinks.map((link) =>
          link.dropdown ? (
            <div className="nav__dropdown-wrap" key={link.label}>
              <button
                className="nav__link"
                onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
              >
                {link.label} <span style={{ fontSize: 10, transition: 'transform .3s', display: 'inline-block', transform: openDropdown === link.label ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {openDropdown === link.label && (
                <div className="nav__dropdown">
                  {link.dropdown.map((d) => (
                    <Link key={d.to} to={d.to} className="nav__dropdown-item">
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav__link${isActive && !link.noActive ? ' nav__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="nav__actions">
        <Link to="/don" className="nav__donate">Faire un don →</Link>
        <button
          className="nav__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
        </button>
      </div>

      <div className={`nav__mobile${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) =>
          link.dropdown ? (
            <div key={link.label}>
              <div className="nav__mobile-sublabel">{link.label}</div>
              <div className="nav__mobile-sub">
                {link.dropdown.map((d) => (
                  <Link key={d.to} to={d.to} className="nav__mobile-link">{d.label}</Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={link.to} to={link.to} className="nav__mobile-link">{link.label}</Link>
          )
        )}
        <Link to="/don" className="btn btn--gold" style={{ display: 'block', textAlign: 'center', margin: 'var(--space-4) 0 var(--space-2)' }}>
          Faire un don →
        </Link>
      </div>
    </header>
  );
}
