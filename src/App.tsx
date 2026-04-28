import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useLenis } from '@/lib/lenis';
import { routeFade } from '@/lib/motion';

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const Echiquier = lazy(() =>
  import('@/pages/Echiquier').then((m) => ({ default: m.Echiquier })),
);
const AxeDetail = lazy(() =>
  import('@/pages/AxeDetail').then((m) => ({ default: m.AxeDetail })),
);
const Candidat = lazy(() =>
  import('@/pages/Candidat').then((m) => ({ default: m.Candidat })),
);
const Contact = lazy(() =>
  import('@/pages/Contact').then((m) => ({ default: m.Contact })),
);

const PageWrap = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={routeFade}
    initial="hidden"
    animate="show"
    exit="exit"
    style={{ willChange: 'opacity, transform' }}
  >
    {children}
  </motion.div>
);

export default function App() {
  useLenis();
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Suspense
          key={location.pathname}
          fallback={<div className="min-h-screen" aria-hidden />}
        >
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrap>
                  <Home />
                </PageWrap>
              }
            />
            <Route
              path="/echiquier"
              element={
                <PageWrap>
                  <Echiquier />
                </PageWrap>
              }
            />
            <Route
              path="/echiquier/:axeId"
              element={
                <PageWrap>
                  <AxeDetail />
                </PageWrap>
              }
            />
            <Route
              path="/candidat"
              element={
                <PageWrap>
                  <Candidat />
                </PageWrap>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrap>
                  <Contact />
                </PageWrap>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
}
