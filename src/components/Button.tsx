import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 overflow-hidden';

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function PrimaryButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const cls = `${base} ${sizes[size]} bg-ink text-cream hover:shadow-2xl hover:shadow-ink/20 ${className}`;
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {children}
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button type={type} onClick={onClick} className={cls}>{inner}</button>;
}

export function GhostButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
  tone = 'light',
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const border = tone === 'light' ? 'border-ink/20 text-ink hover:border-ink' : 'border-cream/20 text-cream hover:border-cream';
  const fill = tone === 'light' ? 'bg-ink' : 'bg-cream';
  const hoverText = tone === 'light' ? 'group-hover:text-cream' : 'group-hover:text-ink';
  const cls = `${base} ${sizes[size]} border ${border} ${className}`;
  const inner = (
    <>
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${hoverText}`}>{children}</span>
      <span className={`absolute inset-0 ${fill} scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100`} />
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return <button type={type} onClick={onClick} className={cls}>{inner}</button>;
}

export function Pill({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark' | 'gold';
  className?: string;
}) {
  const tones = {
    light: 'bg-ink/5 text-ink/70',
    dark: 'bg-cream/10 text-cream/80',
    gold: 'bg-gold/15 text-gold-dark',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
