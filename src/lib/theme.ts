export const colors = {
  ink: '#0a0a0a',
  ink2: '#141312',
  ink3: '#1f1d1a',
  bone: '#f5e6c8',
  bone2: '#d9c9a8',
  bone3: '#8a7d65',
  bronze: '#c9a961',
  bronzeDeep: '#8a6f3a',
  blood: '#6b1f1f',
} as const;

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return cores <= 4 || (mem !== undefined && mem <= 4);
};
