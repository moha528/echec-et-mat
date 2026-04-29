import {
  Suspense,
  lazy,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { ChessNotation } from '@/components/ChessNotation';
import { axes } from '@/data/axes';
import { fadeUp, stagger } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/theme';
import { lenisScrollTo } from '@/lib/lenis';

const ChessboardScene = lazy(() =>
  import('@/components/three/ChessboardScene').then((m) => ({
    default: m.ChessboardScene,
  })),
);

export const Echiquier = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Échiquier — Six axes du programme';
  }, []);

  const triggerSelect = useCallback(
    (id: string) => {
      if (selectedId) return;
      const reduce = prefersReducedMotion();
      // 1. Scroll smooth to canvas so user sees the cinematic camera move
      if (boardRef.current) {
        lenisScrollTo(boardRef.current, -64);
      }
      // 2. After scroll settles, start camera transition
      const scrollSettle = reduce ? 0 : 700;
      window.setTimeout(() => {
        setSelectedId(id);
        const cameraDuration = reduce ? 200 : 1400;
        window.setTimeout(() => {
          navigate(`/echiquier/${id}`);
        }, cameraDuration);
      }, scrollSettle);
    },
    [navigate, selectedId],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((i) => (i + 1) % axes.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((i) => (i <= 0 ? axes.length - 1 : i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (focusIndex >= 0) {
        e.preventDefault();
        triggerSelect(axes[focusIndex].id);
      }
    }
  };

  const externalHover =
    focusIndex >= 0 ? axes[focusIndex].id : hoveredId;

  return (
    <section className="pt-24 md:pt-28 pb-16">
      <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.05, 0.08)}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow className="mb-5">Programme — Six axes</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-bone tracking-tightest"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400 }}
          >
            Choisissez une pièce
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-display italic text-bone-3 mt-4 text-[1rem]"
          >
            Chaque pièce représente un axe du programme.
          </motion.p>
        </motion.div>
      </div>

      {/* Board */}
      <div ref={boardRef} className="relative mt-10 scroll-mt-24">
        <div
          className="relative w-full h-[60vh] md:h-[75vh] outline-none transition-opacity duration-700"
          style={{ opacity: selectedId ? 0.55 : 1 }}
          tabIndex={0}
          role="application"
          aria-label="Échiquier interactif des six axes du programme. Utilisez les flèches pour naviguer entre les pièces, Entrée pour sélectionner."
          onKeyDown={onKey}
        >
          <Suspense fallback={null}>
            <ChessboardScene
              onSelect={triggerSelect}
              selectedAxeId={selectedId}
              externalHoverId={externalHover}
            />
          </Suspense>

          {/* Notation overlay */}
          <div className="hidden md:block absolute top-6 right-6 pointer-events-none">
            <ChessNotation />
          </div>
        </div>
      </div>

      {/* Cards (mobile + always visible as a11y / touch fallback) */}
      <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 mt-10">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line">
          {axes.map((a, i) => (
            <li key={a.id}>
              <button
                onClick={() => triggerSelect(a.id)}
                onMouseEnter={() => setHoveredId(a.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setFocusIndex(i)}
                onBlur={() => setFocusIndex(-1)}
                className="group bg-ink hover:bg-ink-2 focus-visible:bg-ink-2 transition-colors duration-300 w-full p-6 md:p-8 text-left flex flex-col gap-2"
              >
                <span className="font-mono text-bronze text-[0.6875rem] tracking-eyebrow">
                  {a.number}
                </span>
                <span className="font-display text-bone text-[1.25rem] md:text-[1.5rem]">
                  {a.title}
                </span>
                <span className="label text-bone-3 text-[0.6875rem]">
                  {a.pieceLabel}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
