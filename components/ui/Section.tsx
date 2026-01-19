import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
}

export function Section({
  children,
  className,
  background = 'white',
  padding = 'lg',
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-[var(--color-surface)]',
    dark: 'bg-[var(--color-primary)] text-white',
  };

  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
  };

  return (
    <section className={cn(backgrounds[background], paddings[padding], className)}>
      <div className="container">{children}</div>
    </section>
  );
}
