import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/echiquier', label: 'Programme' },
  { to: '/candidat', label: 'Candidat' },
  { to: '/contact', label: 'Contact' },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : ''
      }`}
    >
      <div className="max-w-page mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <NavLink
          to="/"
          className="font-display text-[1.0625rem] tracking-tighter2 text-bone hover:text-bronze transition-colors"
        >
          Échec et Mat
        </NavLink>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-7 md:gap-10">
            {links.slice(1).map((l) => (
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
      </div>
    </header>
  );
};
