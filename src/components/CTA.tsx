import { Link } from 'react-router-dom';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & {
  to: string;
  external?: boolean;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

const baseClass =
  'inline-flex items-center justify-center label text-[0.8125rem] tracking-[0.15em] px-10 py-4 transition-colors duration-300 ease-editorial';

const variants: Record<Variant, string> = {
  primary:
    'bg-bronze text-ink hover:bg-bronze-deep focus-visible:bg-bronze-deep',
  ghost:
    'border border-bone-3 text-bone-2 hover:border-bronze hover:text-bronze focus-visible:border-bronze focus-visible:text-bronze',
};

export const CTA = (props: LinkProps | ButtonProps) => {
  const variant = props.variant ?? 'primary';
  const cls = `${baseClass} ${variants[variant]} ${props.className ?? ''}`;

  if ('to' in props && props.to) {
    if (props.external) {
      return (
        <a href={props.to} className={cls} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    }
    return (
      <Link to={props.to} className={cls}>
        {props.children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children, ...buttonProps } = props as ButtonProps;
  return (
    <button {...buttonProps} className={cls}>
      {children}
    </button>
  );
};
