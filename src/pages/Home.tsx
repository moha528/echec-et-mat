import { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { CTA } from '@/components/CTA';
import { fadeUp, stagger } from '@/lib/motion';

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
);

export const Home = () => {
  useEffect(() => {
    document.title = 'Échec et Mat — Baye Amadou Thiam — CEE ESP 2025–2026';
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center">
        {/* 3D side */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-full md:w-[60%] pointer-events-none md:pointer-events-auto"
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Text — left, sits above 3D */}
        <div className="relative z-10 max-w-page mx-auto w-full px-6 md:px-10 lg:px-16 pt-32 md:pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger(0.15, 0.12)}
            className="max-w-[42rem]"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow bullets className="mb-6">
                CEE • ESP 2025–2026
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-bone leading-display tracking-tightest"
              style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', fontWeight: 400 }}
            >
              Échec
              <br />
              et Mat
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="label text-bone-2 text-[1.0625rem] mt-10"
            >
              Baye Amadou Thiam
            </motion.p>

            <motion.p variants={fadeUp} className="text-bone-3 text-[0.875rem] mt-3">
              Expérience — Anticipation — Action
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <CTA to="/echiquier" variant="primary">
                Découvrir le programme
              </CTA>
              <CTA to="/candidat" variant="ghost">
                À propos du candidat
              </CTA>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bone-3 text-[0.6875rem] tracking-eyebrow uppercase flex flex-col items-center gap-2"
        >
          <span>Faites défiler</span>
          <span className="block h-8 w-px bg-bone-3" />
        </div>
      </section>

      {/* Editorial intro */}
      <section className="border-y border-line py-32 md:py-40">
        <div className="max-w-page mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-prose2"
          >
            <p
              className="font-display italic text-bone text-[clamp(1.75rem,3vw,2.5rem)] leading-tight mb-8"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 80" }}
            >
              Une candidature, c’est un trait à jouer.
            </p>
            <p className="text-bone-2 text-[1.0625rem] leading-[1.8]">
              En présentant la liste{' '}
              <span className="text-bone">Échec et Mat</span> à la présidence du
              CEE, Baye Amadou Thiam propose un programme construit comme une
              partie :{' '}
              <span className="text-bone">
                chaque pièce a un rôle, chaque coup a un sens.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Six pieces teaser */}
      <section className="py-32 md:py-40">
        <div className="max-w-page mx-auto px-6 md:px-10 lg:px-16">
          <Eyebrow className="mb-6">Six axes — Six pièces</Eyebrow>
          <h2
            className="font-display text-bone tracking-tightest mb-12"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Le programme,
            <br />
            posé sur l’échiquier.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
            {[
              ['01', 'Le Roi', 'Social'],
              ['02', 'La Reine', 'Communication'],
              ['03', 'La Tour', 'Pédagogie & IT'],
              ['04', 'Le Fou', 'Sport & Culture'],
              ['05', 'Le Cavalier', 'Relations Extérieures'],
              ['06', 'Sigma', 'Organisation & Finance'],
            ].map(([n, p, t]) => (
              <div
                key={n}
                className="bg-ink p-8 md:p-10 flex flex-col gap-3 hover:bg-ink-2 transition-colors duration-500"
              >
                <span className="font-mono text-bronze text-[0.6875rem] tracking-eyebrow">
                  {n}
                </span>
                <span className="font-display text-bone text-[1.5rem]">{t}</span>
                <span className="label text-bone-3 text-[0.6875rem]">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CTA to="/echiquier" variant="ghost">
              Entrer dans la partie
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
};
