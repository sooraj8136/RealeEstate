import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PropertyCard } from '../components/PropertyCard';
import { properties } from '../data';
import { useFavorites } from '../context/FavoritesContext';

export function Favorites() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <PageTransition>
      <section className="bg-cream pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Saved</span>
            <h1 className="mt-4 font-display text-5xl font-light tracking-tightest sm:text-6xl">
              Your <span className="italic text-gold-dark">saved</span> homes
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {saved.length > 0 ? (
            <>
              <p className="text-sm text-ink/50">{saved.length} saved {saved.length === 1 ? 'home' : 'homes'}</p>
              <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-5xl border border-dashed border-ink/15 py-24 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5 text-ink/40">
                <Heart size={28} />
              </span>
              <h3 className="mt-6 font-display text-2xl">No saved homes yet</h3>
              <p className="mt-2 max-w-sm text-ink/50">
                Tap the heart on any listing to save it here for later.
              </p>
              <Link
                to="/listings"
                className="mt-8 inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-gold hover:text-ink"
              >
                Browse listings
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
