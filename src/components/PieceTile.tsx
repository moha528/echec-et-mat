import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Axe } from '@/data/axes';

const PieceMini = lazy(() =>
  import('./three/PieceMini').then((m) => ({ default: m.PieceMini })),
);

export const PieceTile = ({ axe }: { axe: Axe }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/echiquier/${axe.id}`}
      className="group relative block bg-ink hover:bg-ink-2 focus-visible:bg-ink-2 transition-colors duration-500 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* 3D mini */}
      <div className="relative h-44 sm:h-52 md:h-60 -mb-8">
        <Suspense fallback={null}>
          <PieceMini
            kind={axe.piece}
            highlight={axe.highlight}
            spinning={hovered}
          />
        </Suspense>
      </div>

      <div className="relative px-6 sm:px-8 pb-7 sm:pb-9 pt-3 flex flex-col gap-2">
        <span className="font-mono text-bronze text-[0.6875rem] tracking-eyebrow">
          {axe.number}
        </span>
        <span className="font-display text-bone text-[1.25rem] sm:text-[1.5rem] leading-tight">
          {axe.title}
        </span>
        <span className="label text-bone-3 text-[0.6875rem]">
          {axe.pieceLabel}
        </span>
      </div>
    </Link>
  );
};
