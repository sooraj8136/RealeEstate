import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  tone = 'light',
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}) {
  const muted = tone === 'light' ? 'text-ink/50' : 'text-cream/50';
  const heading = tone === 'light' ? 'text-ink' : 'text-cream';
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${muted}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`mt-4 font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-5xl ${heading}`}>
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
