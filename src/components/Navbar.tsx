import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const navLinks = [
  { label: 'Listings', to: '/listings' },
  { label: 'Neighborhoods', to: '/neighborhoods' },
  { label: 'Agents', to: '/agents' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const color = tone === 'dark' ? 'text-ink' : 'text-cream';
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${color}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" className="shrink-0">
        <path d="M6 23 L16 7 L26 23 M10 19 L22 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-xl font-semibold tracking-tight">Estatia</span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === '/';
  const light = false; // Hero background is now light, so we always want dark navigation links for contrast

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass glass-light py-3 shadow-sm shadow-ink/5'
            : isHome
              ? 'py-5'
              : 'glass glass-light py-3'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo tone={light ? 'light' : 'dark'} />

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `link-underline text-sm font-medium tracking-tight transition-colors ${
                    light ? 'text-cream/90 hover:text-cream' : 'text-ink/80 hover:text-ink'
                  } ${isActive ? 'after:w-full' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/favorites"
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                light ? 'text-cream hover:bg-cream/10' : 'text-ink hover:bg-ink/5'
              }`}
              aria-label="Saved listings"
            >
              <Heart size={18} className={favorites.length ? 'fill-gold text-gold' : ''} />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all sm:inline-flex ${
                light
                  ? 'bg-cream text-ink hover:bg-gold'
                  : 'bg-ink text-cream hover:bg-gold hover:text-ink'
              }`}
            >
              Book a viewing
            </Link>
            <button
              onClick={() => setOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
                light ? 'text-cream' : 'text-ink'
              }`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink text-cream lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo tone="light" />
              <button onClick={() => setOpen(false)} className="text-cream" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-5 pt-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={l.to}
                    className="block border-b border-cream/10 py-4 font-display text-3xl font-light tracking-tight"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                className="mt-8 inline-flex w-fit rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink"
              >
                Book a viewing
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}