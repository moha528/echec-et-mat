import type { GroupIcon } from '@/data/axes';

const sw = 1.5;

export const Icon = ({
  name,
  size = 16,
  className = '',
}: {
  name: GroupIcon | 'arrow-right' | 'arrow-left' | 'whatsapp' | 'mail' | 'link';
  size?: number;
  className?: string;
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
        </svg>
      );
    case 'magnifier':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6l-8-3Z" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...common}>
          <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-1 4 2 5c-1-3 1-6 1-6Z" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15 9-2 6-4 1 2-6 4-1Z" />
        </svg>
      );
    case 'crown':
      return (
        <svg {...common}>
          <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7Z" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...common}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common}>
          <path d="M3 21l1.6-4.4A8 8 0 1 1 8 20l-5 1Z" />
          <path d="M9 9c0 4 3 7 7 7M9 9c0-1 1-2 1-2M16 16c1 0 2-1 2-1M9 9l1 2M16 16l-2-1" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'link':
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5 0l3-3a4 4 0 1 0-5-5l-1 1" />
          <path d="M14 10a4 4 0 0 0-5 0l-3 3a4 4 0 1 0 5 5l1-1" />
        </svg>
      );
  }
};
