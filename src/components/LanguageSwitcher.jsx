import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'fr', label: 'FR', nativeName: 'Français' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch' },
  { code: 'ar', label: 'AR', nativeName: 'العربية' },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'fr');
  const ref = useRef(null);

  useEffect(() => {
    setCurrentLang(i18n.language || 'fr');
  }, [i18n.language]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    setOpen(false);
    localStorage.setItem('i18nextLng', lng);
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="lang-switcher" ref={ref}>
      <style>{`
        .lang-switcher {
          position: relative;
        }
        .lang-switcher__trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          min-height: 40px;
          background: var(--green-light);
          border: 1px solid var(--green);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all .2s;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: var(--green);
          white-space: nowrap;
        }
        .lang-switcher__trigger:hover {
          background: var(--green);
          color: var(--white);
        }
        .lang-switcher__trigger:focus-visible {
          outline: 2px solid var(--green);
          outline-offset: 2px;
        }
        .lang-switcher__arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          opacity: .7;
          transition: transform .25s ease, opacity .2s;
        }
        .lang-switcher__arrow svg {
          width: 12px;
          height: 12px;
          display: block;
        }
        .lang-switcher__trigger:hover .lang-switcher__arrow,
        .lang-switcher__trigger[aria-expanded="true"] .lang-switcher__arrow {
          opacity: 1;
        }
        .lang-switcher__arrow.open {
          transform: rotate(180deg);
        }
        /* Zone tactile confortable sur mobile (44px recommandés) */
        @media (max-width: 900px) {
          .lang-switcher__trigger {
            min-height: 44px;
            padding-inline: 14px;
          }
        }
        .lang-switcher__dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 140px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: var(--space-2);
          z-index: 1000;
          animation: dropIn .2s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: none; }
        }
        .lang-switcher__option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: none;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-body);
          cursor: pointer;
          transition: all .2s;
          text-align: left;
        }
        .lang-switcher__option:hover {
          background: var(--green-light);
          color: var(--green);
        }
        .lang-switcher__option--active {
          background: var(--green);
          color: var(--white);
        }
        .lang-switcher__option-label {
          font-weight: 600;
        }
        .lang-switcher__option-native {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.7;
        }
      `}</style>
      <button
        className="lang-switcher__trigger"
        onClick={() => setOpen(!open)}
        aria-label={t('common.changeLanguage')}
        aria-expanded={open}
      >
        <span className="lang-switcher__option-label">{currentLanguage.label}</span>
        <span className={`lang-switcher__arrow${open ? ' open' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="lang-switcher__dropdown" role="menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-switcher__option${currentLang === lang.code ? ' lang-switcher__option--active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
              role="menuitem"
              aria-selected={currentLang === lang.code}
            >
              <span className="lang-switcher__option-label">{lang.label}</span>
              <span className="lang-switcher__option-native">{lang.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}