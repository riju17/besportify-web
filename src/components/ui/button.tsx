import Link from 'next/link';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-blue-500 text-on-accent font-semibold shadow-[0_0_20px_rgba(237,28,36,0.32)] hover:shadow-[0_0_28px_rgba(237,28,36,0.52)] hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'border border-slate-700 bg-slate-800/75 backdrop-blur-md text-white-100 hover:border-blue-500/50 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]',
  ghost:
    'bg-transparent text-white-100 hover:bg-white-100/8 hover:text-white-100 active:scale-[0.98]',
  danger:
    'bg-danger text-on-accent font-semibold shadow-glow hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-9 py-2 px-3.5 text-xs tracking-wide uppercase font-semibold font-mono',
  md: 'min-h-11 py-2.5 px-5 text-sm tracking-tight',
  lg: 'min-h-12 py-3 px-6 text-base tracking-tight',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-[0.75rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none cursor-pointer select-none';

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

type LinkButtonProps = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'href'
  > & {
    href: string;
    external?: boolean;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, className, variant = 'primary', size = 'md' } = props;

  const classes = cx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ('href' in props) {
    const linkProps = props as LinkButtonProps;
    const {
      external,
      href,
      children: _children,
      className: _className,
      variant: _variant,
      size: _size,
      ...anchorProps
    } = linkProps;
    void _children;
    void _className;
    void _variant;
    void _size;

    if (external) {
      return (
        <a
          className={classes}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const {
    children: _children,
    className: _className,
    variant: _variant,
    size: _size,
    ...buttonProps
  } = props as ButtonProps;
  void _children;
  void _className;
  void _variant;
  void _size;

  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
