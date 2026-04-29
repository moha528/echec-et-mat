import type { ReactNode } from 'react';
import { Nav } from './Nav';

type Props = {
  children: ReactNode;
  hideNav?: boolean;
};

export const Layout = ({ children, hideNav = false }: Props) => (
  <div className="min-h-screen bg-ink text-bone">
    {!hideNav && <Nav />}
    <main>{children}</main>
    <Footer />
  </div>
);

const Footer = () => (
  <footer className="border-t border-line mt-32">
    <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <p className="font-display text-[1.125rem] text-bone">Échec et Mat</p>
      <p className="text-[0.75rem] tracking-eyebrow uppercase text-bone-3">
        CEE • ESP 2025–2026 • Liste EEM
      </p>
      <p className="text-[0.75rem] text-bone-3">Baye Amadou Thiam</p>
    </div>
  </footer>
);
