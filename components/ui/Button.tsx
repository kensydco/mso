import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)]',
    secondary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] focus:ring-[var(--color-primary)]',
    outline: 'border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white focus:ring-[var(--color-secondary)]',
    brand: 'bg-[var(--brand-primary)] text-white hover:opacity-90 focus:ring-[var(--brand-primary)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    'hover:scale-102 active:scale-98',
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
