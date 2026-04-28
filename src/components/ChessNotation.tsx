import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/theme';

const SAMPLE_GAME: [string, string][] = [
  ['e4', 'e5'],
  ['Nf3', 'Nc6'],
  ['Bb5', 'a6'],
  ['Ba4', 'Nf6'],
  ['O-O', 'Be7'],
  ['Re1', 'b5'],
  ['Bb3', 'd6'],
  ['c3', 'O-O'],
  ['h3', 'Nb8'],
  ['d4', 'Nbd7'],
];

export const ChessNotation = ({ className = '' }: { className?: string }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(SAMPLE_GAME.length);
      return;
    }
    const id = window.setInterval(() => {
      setShown((n) => (n >= SAMPLE_GAME.length ? 1 : n + 1));
    }, 4000);
    setShown(1);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`font-mono text-[0.6875rem] leading-[1.7] text-bone-3 ${className}`}
      aria-hidden
    >
      {SAMPLE_GAME.slice(0, shown).map(([w, b], i) => (
        <div key={i} className="flex items-baseline gap-3">
          <span className="text-bronze/60 w-6 text-right">{i + 1}.</span>
          <span className="w-12">{w}</span>
          <span className="w-12">{b}</span>
        </div>
      ))}
    </div>
  );
};
