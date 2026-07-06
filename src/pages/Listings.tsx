import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, Map as MapIcon, SlidersHorizontal, X } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { PropertyCard } from '../components/PropertyCard';
import { neighborhoods, properties, type Property } from '../data';

const types: Property['type'][] = ['House', 'Apartment', 'Villa', 'Penthouse', 'Loft', 'Townhouse'];
const statuses: Property['status'][] = ['For Sale', 'New Listing', 'Luxury', 'Under Contract'];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'sqft-desc', label: 'Largest' },
] as const;

export function Listings() {
  const [searchParams] = useSearchParams();
  const initialNeighborhood = searchParams.get('neighborhood') || '';
  const initialType = searchParams.get('type') || '';

  const [priceMax, setPriceMax] = useState(6_000_000);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
    () => (initialType ? new Set([initialType]) : new Set()),
  );
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialNeighborhood);
  const [sort, setSort] = useState<(typeof sortOptions)[number]['value']>('newest');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (set: Set<string>, value: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (p.price > priceMax) return false;
      if (selectedTypes.size && !selectedTypes.has(p.type)) return false;
      if (beds && p.beds < beds) return false;
      if (baths && p.baths < baths) return false;
      if (selectedStatuses.size && !selectedStatuses.has(p.status)) return false;
      if (selectedNeighborhood && p.neighborhood !== selectedNeighborhood) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'sqft-desc':
          return b.sqft - a.sqft;
        default:
          return b.yearBuilt - a.yearBuilt;
      }
    });
    return list;
  }, [priceMax, selectedTypes, beds, baths, selectedStatuses, selectedNeighborhood, sort]);

  const reset = () => {
    setPriceMax(6_000_000);
    setSelectedTypes(new Set());
    setBeds(0);
    setBaths(0);
    setSelectedStatuses(new Set());
    setSelectedNeighborhood('');
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium">Filters</h3>
        <button onClick={reset} className="text-xs text-ink/50 underline hover:text-ink">
          Reset all
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Neighborhood</p>
        <select
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-sm outline-none focus:border-ink"
        >
          <option value="">All neighborhoods</option>
          {neighborhoods.map((n) => (
            <option key={n.slug} value={n.slug}>
              {n.name}, {n.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Max price</p>
          <p className="text-sm font-medium">
            {priceMax >= 1_000_000 ? `$${(priceMax / 1_000_000).toFixed(1)}M` : `$${priceMax.toLocaleString()}`}
          </p>
        </div>
        <input
          type="range"
          min={500_000}
          max={6_000_000}
          step={100_000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="mt-4 w-full"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Property type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => toggle(selectedTypes, t, setSelectedTypes)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                selectedTypes.has(t)
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/15 text-ink/70 hover:border-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Beds</p>
          <div className="mt-3 flex gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setBeds(n)}
                className={`flex h-10 flex-1 items-center justify-center rounded-full border text-sm transition-all ${
                  beds === n ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-ink/70 hover:border-ink'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Baths</p>
          <div className="mt-3 flex gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setBaths(n)}
                className={`flex h-10 flex-1 items-center justify-center rounded-full border text-sm transition-all ${
                  baths === n ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-ink/70 hover:border-ink'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Status</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => toggle(selectedStatuses, s, setSelectedStatuses)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                selectedStatuses.has(s)
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/15 text-ink/70 hover:border-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="bg-cream pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="border-b border-ink/10 pb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Browse</span>
            <h1 className="mt-3 font-display text-4xl font-light tracking-tightest sm:text-5xl">
              All <span className="italic text-gold-dark">listings</span>
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex gap-10">
            {/* sidebar */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-28">
                <FilterContent />
              </div>
            </aside>

            {/* results */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm lg:hidden"
                  >
                    <SlidersHorizontal size={15} /> Filters
                  </button>
                  <p className="text-sm text-ink/50">
                    <span className="font-medium text-ink">{filtered.length}</span> homes
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex rounded-full border border-ink/15 p-1">
                    <button
                      onClick={() => setView('grid')}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        view === 'grid' ? 'bg-ink text-cream' : 'text-ink/60'
                      }`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid size={15} />
                    </button>
                    <button
                      onClick={() => setView('map')}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                        view === 'map' ? 'bg-ink text-cream' : 'text-ink/60'
                      }`}
                      aria-label="Map view"
                    >
                      <MapIcon size={15} />
                    </button>
                  </div>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm outline-none focus:border-ink"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {view === 'grid' ? (
                <motion.div layout className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((p, i) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <PropertyCard property={p} index={i} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
                    {filtered.map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                  <div className="sticky top-28 h-[70vh] overflow-hidden rounded-5xl border border-ink/10 bg-ink/5">
                    <div className="flex h-full items-center justify-center text-ink/30">
                      <div className="text-center">
                        <MapIcon size={40} className="mx-auto" />
                        <p className="mt-3 text-sm">Map view — {filtered.length} homes</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {filtered.length === 0 && (
                <div className="mt-20 text-center">
                  <p className="font-display text-2xl">No homes match your filters.</p>
                  <button onClick={reset} className="mt-4 text-sm text-gold-dark underline">
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-cream p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="text-ink/60">
                  <X size={22} />
                </button>
              </div>
              <div className="mt-6">
                <FilterContent />
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="mt-8 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-cream"
              >
                Show {filtered.length} homes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
