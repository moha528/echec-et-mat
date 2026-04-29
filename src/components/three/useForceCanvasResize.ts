import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';

/**
 * Some R3F + Suspense + AnimatePresence + lazy combos miss the initial
 * parent measurement, leaving the canvas at the HTML default 300x150.
 * This hook forces a manual resize on mount and on parent resize.
 */
export const useForceCanvasResize = () => {
  const { gl, camera } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const apply = () => {
      const r = parent.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        gl.setSize(r.width, r.height, false);
        canvas.style.width = `${r.width}px`;
        canvas.style.height = `${r.height}px`;
        const persp = camera as PerspectiveCamera;
        if (persp.isPerspectiveCamera) {
          persp.aspect = r.width / r.height;
          persp.updateProjectionMatrix();
        }
      }
    };

    apply();
    const raf = requestAnimationFrame(() => requestAnimationFrame(apply));
    const t1 = window.setTimeout(apply, 200);
    const t2 = window.setTimeout(apply, 700);

    const ro = new ResizeObserver(apply);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
    };
  }, [gl, camera]);
};
