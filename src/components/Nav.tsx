import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const links = [
  { to: '/echiquier', label: 'Programme' },
  { to: '/candidat', label: 'Candidat' },
  { to: '/contact', label: 'Contact' },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
        scrolled || open ? 'bg-ink/90 backdrop-blur-md border-b border-line' : ''
      }`}
    >
      <div className="max-w-page mx-auto flex items-center justify-between px-5 sm:px-8 md:px-10 py-4 md:py-5">
        <NavLink
          to="/"
          aria-label="Accueil — Échec et Mat"
          className="font-display tracking-tighter2 text-bone hover:text-bronze transition-colors text-[0.95rem] sm:text-[1.0625rem]"
        >
          <span className="hidden sm:inline">Échec et Mat</span>
          <span className="sm:hidden">É&amp;M</span>
        </NavLink>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-10">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `label text-[0.6875rem] tracking-eyebrow transition-colors ${
                      isActive ? 'text-bronze' : 'text-bone-3 hover:text-bone-2'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex flex-col items-end gap-1.5 p-2 -m-2"
        >
          <span
            className={`block h-px bg-bone-2 transition-all duration-300 ${
              open ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'
            }`}
          />
          <span
            className={`block h-px bg-bone-2 transition-all duration-300 ${
              open ? 'opacity-0 w-6' : 'w-4'
            }`}
          />
          <span
            className={`block h-px bg-bone-2 transition-all duration-300 ${
              open ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-6'
            }`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      <nav
        id="mobile-menu"
        aria-label="Navigation mobile"
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-editorial ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="px-5 pb-6 pt-2 flex flex-col gap-2 border-t border-line">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block py-3 font-display text-[1.5rem] transition-colors ${
                    isActive ? 'text-bronze' : 'text-bone hover:text-bronze'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
