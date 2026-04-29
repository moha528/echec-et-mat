import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { CTA } from '@/components/CTA';
import { fadeUp, stagger } from '@/lib/motion';
import { PieceTile } from '@/components/PieceTile';
import { axes } from '@/data/axes';
import { lenisScrollTo } from '@/lib/lenis';

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
);

export const Home = () => {
  const introRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Échec et Mat — Baye Amadou Thiam — CEE ESP 2025–2026';
  }, []);

  const scrollToIntro = () => {
    if (introRef.current) lenisScrollTo(introRef.current, -16);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="max-w-page mx-auto h-[100svh] px-5 sm:px-8 md:px-10 lg:px-16 grid md:grid-cols-12 gap-6 md:gap-10 items-center pt-24 md:pt-20 pb-20 md:pb-16">
          {/* Text col */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger(0.1, 0.1)}
            className="md:col-span-7 lg:col-span-7 z-10 relative"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow bullets className="mb-5 md:mb-6">
                CEE • ESP 2025–2026
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-bone leading-display tracking-tightest"
              style={{
                fontSize: 'clamp(3.25rem, 11vw, 9.5rem)',
                fontWeight: 400,
              }}
            >
              Échec
              <br />
              et Mat
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="label text-bone-2 text-[0.95rem] sm:text-[1.0625rem] mt-8 md:mt-10"
            >
              Baye Amadou Thiam
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-bone-3 text-[0.8125rem] sm:text-[0.875rem] mt-2 md:mt-3"
            >
              Expérience — Anticipation — Action
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <CTA to="/echiquier" variant="primary">
                Découvrir le programme
              </CTA>
              <CTA to="/candidat" variant="ghost">
                À propos du candidat
              </CTA>
            </motion.div>
          </motion.div>

          {/* 3D col — full pillar visible, no cropping */}
          <div className="md:col-span-5 lg:col-span-5 relative h-[40vh] md:h-[78vh] -mx-5 md:mx-0">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </div>

        {/* Scroll cue — anchored bottom-right (desktop) / center under content (mobile) */}
        <button
          type="button"
          onClick={scrollToIntro}
          aria-label="Faire défiler vers la suite"
          className="group absolute z-20 flex flex-col items-center gap-3 px-3 py-2 text-bone-3 hover:text-bronze focus-visible:text-bronze transition-colors bottom-3 right-5 sm:bottom-6 sm:right-8 md:right-10 lg:right-16"
        >
          <span className="text-[0.625rem] tracking-eyebrow uppercase">
            Défiler
          </span>
          <span
            aria-hidden
            className="block h-9 w-px bg-current relative overflow-hidden"
          >
            <span className="absolute inset-x-[-3px] top-0 h-2 bg-current animate-[scrollcue_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite]" />
          </span>
        </button>
      </section>

      {/* INTRO ÉDITORIAL */}
      <section
        ref={introRef}
        className="border-y border-line py-24 md:py-40 scroll-mt-24"
      >
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-prose2"
          >
            <p
              className="font-display italic text-bone leading-tight mb-8"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 80",
              }}
            >
              Une candidature, c’est un trait à jouer.
            </p>
            <p className="text-bone-2 text-[1rem] sm:text-[1.0625rem] leading-[1.8]">
              En présentant la liste{' '}
              <span className="text-bone">Échec et Mat</span> à la présidence
              du CEE, Baye Amadou Thiam propose un programme construit comme
              une partie :{' '}
              <span className="text-bone">
                chaque pièce a un rôle, chaque coup a un sens.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* SIX PIÈCES — TEASER avec mini-pièces 3D */}
      <section className="py-24 md:py-40">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <Eyebrow className="mb-5 md:mb-6">Six axes — Six pièces</Eyebrow>
          <h2
            className="font-display text-bone tracking-tightest mb-10 md:mb-14"
            style={{ fontSize: 'clamp(1.875rem, 5vw, 4rem)' }}
          >
            Le programme,
            <br />
            posé sur l’échiquier.
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-line">
            {axes.map((a) => (
              <li key={a.id}>
                <PieceTile axe={a} />
              </li>
            ))}
          </ul>
          <div className="mt-10 md:mt-12">
            <CTA to="/echiquier" variant="ghost">
              Entrer dans la partie
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
};
