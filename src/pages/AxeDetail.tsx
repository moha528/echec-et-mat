import { Suspense, lazy, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { axes, axeIndex } from '@/data/axes';
import { Eyebrow } from '@/components/Eyebrow';
import { Icon } from '@/components/Icon';
import { fadeUp, stagger } from '@/lib/motion';

const PieceShowcase = lazy(() =>
  import('@/components/three/PieceShowcase').then((m) => ({
    default: m.PieceShowcase,
  })),
);

export const AxeDetail = () => {
  const { axeId } = useParams<{ axeId: string }>();
  const idx = useMemo(() => (axeId ? axeIndex(axeId) : -1), [axeId]);
  const axe = idx >= 0 ? axes[idx] : null;

  useEffect(() => {
    if (axe) {
      document.title = `${axe.number} — ${axe.title} — Échec et Mat`;
    }
  }, [axe]);

  if (!axe) return <Navigate to="/echiquier" replace />;

  const prev = idx > 0 ? axes[idx - 1] : axes[axes.length - 1];
  const next = idx < axes.length - 1 ? axes[idx + 1] : axes[0];

  return (
    <article className="pt-24">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 pt-12 md:pt-20 pb-16 md:pb-24 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Text col with watermark number */}
          <div className="md:col-span-7 relative">
            <span
              aria-hidden
              className="absolute -top-6 md:-top-10 left-0 font-display text-ink-3 select-none pointer-events-none leading-none -z-0"
              style={{
                fontSize: 'clamp(7rem, 16vw, 14rem)',
                fontWeight: 500,
              }}
            >
              {axe.number}
            </span>

            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.1, 0.08)}
              className="relative z-10 pt-16 md:pt-24"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow className="mb-5">{axe.pieceLabel}</Eyebrow>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-display text-bone tracking-tightest"
                style={{
                  fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                  fontWeight: 400,
                }}
              >
                {axe.title}
              </motion.h1>
            </motion.div>
          </div>

          {/* 3D piece col */}
          <div
            aria-hidden
            className="md:col-span-5 relative h-[42vh] sm:h-[48vh] md:h-[60vh]"
          >
            <Suspense fallback={null}>
              <PieceShowcase kind={axe.piece} highlight={axe.highlight} />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Engagements */}
      <section className="py-20 md:py-28 border-t border-line">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Eyebrow>Engagements</Eyebrow>
          </div>
          <div className="md:col-span-9 space-y-16">
            {axe.groups.map((g, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.7,
                  delay: gi * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon name={g.icon} size={18} className="text-bronze" />
                  <h2 className="font-display text-bronze text-[1.5rem]">
                    {g.title}
                  </h2>
                </div>
                <ul className="space-y-6">
                  {g.items.map((item, ii) => {
                    const isTodo = item.startsWith('// TODO');
                    return (
                      <li
                        key={ii}
                        className="flex gap-4 pb-6 border-b border-line last:border-0 last:pb-0"
                      >
                        <span
                          aria-hidden
                          className={`mt-2 text-[8px] leading-none ${
                            isTodo ? 'text-bone-3/40' : 'text-bronze'
                          }`}
                        >
                          ◆
                        </span>
                        <p
                          className={`text-[1.0625rem] leading-[1.7] ${
                            isTodo
                              ? 'text-bone-3/50 italic font-mono text-[0.8125rem]'
                              : 'text-bone-2'
                          }`}
                        >
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav
        aria-label="Navigation entre les axes"
        className="border-t border-line py-12"
      >
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Link
            to={`/echiquier/${prev.id}`}
            className="group flex items-center gap-3 text-bone-2 hover:text-bronze transition-colors"
          >
            <Icon name="arrow-left" size={16} />
            <span className="label text-[0.75rem] tracking-eyebrow">
              {prev.title}
            </span>
          </Link>

          <Link
            to="/echiquier"
            className="label text-[0.6875rem] tracking-eyebrow text-bone-3 hover:text-bronze transition-colors"
          >
            Retour à l’échiquier
          </Link>

          <Link
            to={`/echiquier/${next.id}`}
            className="group flex items-center gap-3 text-bone-2 hover:text-bronze transition-colors"
          >
            <span className="label text-[0.75rem] tracking-eyebrow">
              {next.title}
            </span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </nav>
    </article>
  );
};
