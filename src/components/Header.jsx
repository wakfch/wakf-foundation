import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo-mark.png';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const getNavLinks = (t) => [
  { label: t('header.home'), to: '/', noActive: true },
  {
    label: t('header.about'),
    dropdown: [
      { label: t('header.aboutFoundation'), to: '/a-propos' },
      { label: t('header.statutes'), to: '/statuts' },
    ],
  },
  {
    label: t('header.projects'),
    dropdown: [
      { label: t('header.allProjects'), to: '/projets' },
      { label: t('header.madretsch'), to: '/projets/mosquee-madretsch' },
      { label: t('header.aliman'), to: '/projets/centre-al-iman' },
      { label: t('header.albadr'), to: '/projets/centre-al-badr' },
      { label: t('header.annour'), to: '/projets/mosquee-an-nour' },
      { label: t('header.bibliotheque'), to: '/projets/bibliotheque-mobile' },
    ],
  },
  { label: t('header.zakat'), to: '/zakat' },
  { label: t('header.faq'), to: '/faq' },
  { label: t('header.contact'), to: '/contact' },
];

export default function Header() {
  const { t } = useTranslation();
  const navLinks = getNavLinks(t);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropRef = useRef(null);
  const closeTimer = useRef(null);
  const lastPointer = useRef('mouse');
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    clearTimeout(closeTimer.current);
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Sous-menus : ouverts au survol de la souris, refermés 150 ms après sa sortie (le délai évite que le menu
  // se ferme en traversant l'espace entre le bouton et la liste). Écran tactile : ouverture et fermeture au clic.
  const openSub = (label) => { clearTimeout(closeTimer.current); setOpenDropdown(label); };
  const closeSubSoon = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpenDropdown(null), 150); };

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${menuOpen ? ' nav--open' : ''}`}>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-h); display: flex; align-items: center;
          padding-inline: var(--space-6); gap: var(--space-8);
          background: #FFFFFF; box-shadow: var(--shadow-sm);
          transition: background .3s, box-shadow .3s;
        }
        /* En-tête blanc en permanence, sur toutes les pages y compris l'accueil : seule l'ombre s'accentue au défilement */
        .nav--scrolled { background: #FFFFFF; box-shadow: var(--shadow-md); }
        .nav--open { background: #FFFFFF; }
        .nav__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        /* Symbole seul, fond transparent (plus de carré blanc) */
        .nav__logo-img { height: 42px; width: auto; object-fit: contain; }
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
        .nav__dropdown-wrap { position: relative; }
        .nav__dropdown {
          position: absolute; top: calc(100% + 8px); inset-inline-start: 0; min-width: 240px;
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg); padding: var(--space-2); z-index: 100;
          animation: dropIn .2s ease;
        }
        /* Zone invisible entre le bouton et la liste : le pointeur ne quitte pas le menu en la traversant */
        .nav__dropdown::before { content: ''; position: absolute; top: -10px; left: 0; right: 0; height: 10px; }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .nav__dropdown-item { display: block; padding: 10px 14px; font-size: 14px; color: var(--text-body); border-radius: var(--radius-sm); transition: all .2s; }
        .nav__dropdown-item:hover { background: var(--green-light); color: var(--green); }
        .nav__actions { display: flex; align-items: center; gap: var(--space-3); flex-shrink: 0; }
        .nav__donate { background: var(--gold); color: var(--white); padding: 10px 22px; border-radius: var(--radius-md); font-family: var(--font-heading); font-size: 14px; font-weight: 700; transition: all .25s; white-space: nowrap; }
        .nav__donate:hover { background: #b8952f; transform: translateY(-1px); }
        .nav__burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; border-radius: var(--radius-sm); }
        .nav__burger span { display: block; width: 22px; height: 2px; background: var(--text-heading); transition: all .3s; border-radius: 2px; }
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
        <img src={logo} alt="" aria-hidden="true" className="nav__logo-img" />
        <div className="nav__logo-text">
          <span className="nav__logo-name">{t('common.foundationName')}</span>
          <span className="nav__logo-sub">{t('header.sub')}</span>
        </div>
      </Link>

      <nav className="nav__links" ref={dropRef}>
        {navLinks.map((link) =>
          link.dropdown ? (
            <div
              className="nav__dropdown-wrap"
              key={link.label}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') openSub(link.label); }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') closeSubSoon(); }}
              onKeyDown={(e) => { if (e.key === 'Escape') setOpenDropdown(null); }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null); }}
            >
              <button
                className="nav__link"
                aria-haspopup="true"
                aria-expanded={openDropdown === link.label}
                onPointerDown={(e) => { lastPointer.current = e.pointerType; }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') lastPointer.current = 'keyboard'; }}
                onClick={() => (lastPointer.current === 'mouse'
                  ? openSub(link.label)
                  : setOpenDropdown(openDropdown === link.label ? null : link.label))}
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
        <LanguageSwitcher />
        <Link to="/don" className="nav__donate">{t('header.donate')}</Link>
        <button
          className="nav__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('common.menu')}
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
          {t('header.donate')}
        </Link>
      </div>
    </header>
  );
}