import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { formation, postes } from '@/data/parcours';
import { realisations } from '@/data/realisations';
import { fadeUp, stagger } from '@/lib/motion';

export const Candidat = () => {
  useEffect(() => {
    document.title = 'Candidat — Baye Amadou Thiam';
  }, []);

  return (
    <article className="pt-32 pb-16">
      {/* Hero — profil éditorial */}
      <section className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grain relative aspect-[4/5] bg-ink-2 overflow-hidden border border-line"
              style={{ filter: 'grayscale(1) contrast(1.05)' }}
            >
              {/* TODO: photo du candidat à fournir — placeholder typographique */}
              <div className="absolute inset-0 flex items-end justify-center p-8">
                <span className="font-display text-[clamp(3rem,7vw,6rem)] text-bone-3/30 leading-none">
                  BAT
                </span>
              </div>
            </motion.div>
            <p className="mt-3 text-[0.6875rem] tracking-eyebrow uppercase text-bone-3/60">
              {/* TODO: photo officielle */}
              Portrait à venir
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.1, 0.1)}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow className="mb-5">Candidat • Liste EEM</Eyebrow>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-display text-bone tracking-tightest"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', fontWeight: 400 }}
              >
                Baye Amadou
                <br />
                Thiam
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-display italic text-bone-2 mt-8 text-[1.125rem] leading-[1.7] max-w-prose2"
              >
                « Une candidature, c’est un trait à jouer. La mienne se prépare
                depuis longtemps — chaque poste occupé, chaque projet conduit,
                chaque mandat tenu. »
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="mt-32 md:mt-40">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Eyebrow>Formation</Eyebrow>
          </div>
          <ol className="md:col-span-9 relative pl-8 border-l border-bronze/40">
            {formation.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[1.95rem] top-2 text-bronze text-[8px] leading-none"
                >
                  ◆
                </span>
                <p className="font-mono text-bronze text-[0.8125rem] tracking-wider mb-2">
                  {f.date}
                </p>
                <h3 className="font-display text-bone text-[1.25rem] leading-tight mb-1">
                  {f.title}
                </h3>
                <p className="italic text-bone-3 text-[0.9375rem]">{f.place}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Postes occupés */}
      <section className="mt-32 md:mt-40">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <Eyebrow>Postes occupés</Eyebrow>
          </div>
          <ol className="md:col-span-9">
            {postes.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 py-6 border-b border-line"
              >
                <span className="col-span-12 md:col-span-3 font-mono text-bronze text-[0.8125rem]">
                  {p.period}
                </span>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-bone text-[1.25rem] leading-tight">
                    {p.title}
                  </h3>
                  <p className="italic text-bone-3 text-[0.9375rem]">{p.place}</p>
                </div>
              </motion.li>
            ))}
            {/* TODO: postes 3+ à fournir par l'utilisateur */}
          </ol>
        </div>
      </section>

      {/* Grandes réalisations */}
      <section className="mt-32 md:mt-40">
        <div className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="mb-12">
            <Eyebrow className="mb-4">Grandes réalisations</Eyebrow>
            <h2
              className="font-display text-bone tracking-tightest"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}
            >
              Cinq mouvements,
              <br />
              déjà joués.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-line">
            {realisations.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="bg-ink p-8 flex flex-col gap-3 hover:bg-ink-2 transition-colors duration-500"
              >
                <span className="font-display text-bronze text-[2rem] leading-none">
                  {r.numeral}
                </span>
                <h3 className="font-display text-bone text-[1.25rem] leading-tight">
                  {r.title}
                </h3>
                <p className="text-bone-3 text-[0.9375rem] leading-[1.6]">
                  {r.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
