import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  bullets?: boolean;
  className?: string;
};

export const Eyebrow = ({ children, bullets = false, className = '' }: Props) => (
  <p className={`eyebrow ${className}`}>
    {bullets && <span aria-hidden className="mr-2 text-bronze">•</span>}
    {children}
    {bullets && <span aria-hidden className="ml-2 text-bronze">•</span>}
  </p>
);
