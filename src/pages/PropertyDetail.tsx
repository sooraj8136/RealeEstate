import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Maximize,
  Phone,
  Share2,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { PropertyCard } from '../components/PropertyCard';
import { formatPrice, getAgent, getNeighborhood, getProperty, getSimilarProperties } from '../data';
import { useFavorites } from '../context/FavoritesContext';

export function PropertyDetail() {
  const { id } = useParams();
  const property = id ? getProperty(id) : undefined;
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<'features' | 'description' | 'neighborhood'>('features');
  const [tourSent, setTourSent] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const mortgage = useMemo(() => {
    if (!property) return { monthly: 0, total: 0, interest: 0, down: 0 };
    const price = property.price;
    const down = price * 0.2;
    const principal = price - down;
    const rate = 0.065 / 12;
    const months = 360;
    const monthly = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const total = monthly * months;
    return { monthly, total, interest: total - principal, down };
  }, [property]);

  if (!property) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream pt-20 text-center">
          <h1 className="font-display text-4xl">Property not found</h1>
          <Link to="/listings" className="mt-6 text-gold-dark underline">
            Back to listings
          </Link>
        </div>
      </PageTransition>
    );
  }

  const agent = getAgent(property.agentId);
  const neighborhood = getNeighborhood(property.neighborhood);
  const similar = getSimilarProperties(property.id);
  const fav = isFavorite(property.id);

  return (
    <PageTransition>
      <div className="bg-cream pt-20 pb-28 sm:pb-24 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to listings
          </Link>

          {/* gallery */}
          <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-ink sm:rounded-5xl lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={property.images[activeImg]}
                  alt={property.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              <button
                onClick={() => setActiveImg((activeImg + property.images.length - 1) % property.images.length)}
                className="absolute left-4 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full glass glass-light text-ink transition-all hover:bg-cream"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => setActiveImg((activeImg + 1) % property.images.length)}
                className="absolute right-4 top-1/2 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full glass glass-light text-ink transition-all hover:bg-cream"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <div className="absolute bottom-4 left-4 rounded-full glass glass-dark px-4 py-1.5 text-xs text-cream">
                {activeImg + 1} / {property.images.length}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 lg:col-span-1 lg:grid-cols-1">
              {property.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl transition-all ${
                    activeImg === i ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* header row */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="w-full sm:max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">
                  {property.status}
                </span>
                <span className="text-sm text-ink/50">{property.type}</span>
              </div>
              <h1 className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-light tracking-tightest">{property.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-ink/60">
                <MapPin size={16} className="text-gold" /> {property.address}, {property.city}
              </p>
              <div className="mt-4 lg:hidden">
                <p className="text-xs uppercase tracking-wide text-ink/40">Listed at</p>
                <p className="mt-1 font-display text-3xl font-medium tracking-tight text-gold-dark">{formatPrice(property.price)}</p>
                <p className="text-xs text-ink/50">
                  ${Math.round(property.price / property.sqft).toLocaleString()}/ft²
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(property.id)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all hover:border-ink"
                aria-label="Save"
              >
                <Heart size={18} className={fav ? 'fill-gold text-gold' : ''} />
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all hover:border-ink"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* key stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {[
              { icon: Bed, label: 'Bedrooms', value: property.beds },
              { icon: Bath, label: 'Bathrooms', value: property.baths },
              { icon: Maximize, label: 'Square feet', value: property.sqft.toLocaleString() },
              { icon: Calendar, label: 'Year built', value: property.yearBuilt },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink/10 bg-cream p-4 sm:rounded-3xl sm:p-5">
                <s.icon size={18} className="text-gold sm:h-5 sm:w-5" />
                <p className="mt-3 font-display text-xl font-medium sm:text-2xl">{s.value}</p>
                <p className="text-sm text-ink/50">{s.label}</p>
              </div>
            ))}
          </div>

          {/* main grid: content + sticky summary */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {/* tabs */}
              <div className="flex gap-2 overflow-x-auto border-b border-ink/10 pb-1">
                {(['features', 'description', 'neighborhood'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative px-3 py-2.5 text-sm font-medium capitalize whitespace-nowrap transition-colors sm:px-4 sm:py-3 ${
                      tab === t ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-gold"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 min-h-[300px]">
                {tab === 'features' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-3 sm:grid-cols-2">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 rounded-2xl border border-ink/10 p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                          <Check size={15} />
                        </span>
                        <span className="text-sm">{f}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {tab === 'description' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-lg leading-relaxed text-ink/80">{property.description}</p>
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        ['Type', property.type],
                        ['Built', String(property.yearBuilt)],
                        ['Neighborhood', neighborhood?.name ?? '—'],
                        ['City', property.city],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-xs uppercase tracking-wide text-ink/40">{k}</p>
                          <p className="mt-1 font-medium">{v}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {tab === 'neighborhood' && neighborhood && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 className="font-display text-2xl">{neighborhood.name}</h3>
                    <p className="mt-3 text-ink/70">{neighborhood.blurb}</p>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-ink/10 p-4">
                        <p className="text-xs text-ink/40">Homes</p>
                        <p className="mt-1 font-display text-xl">{neighborhood.stats.homes}</p>
                      </div>
                      <div className="rounded-2xl border border-ink/10 p-4">
                        <p className="text-xs text-ink/40">Median price</p>
                        <p className="mt-1 font-display text-xl">{formatPrice(neighborhood.stats.medianPrice)}</p>
                      </div>
                      <div className="rounded-2xl border border-ink/10 p-4">
                        <p className="text-xs text-ink/40">Walk score</p>
                        <p className="mt-1 font-display text-xl">{neighborhood.stats.walkScore}</p>
                      </div>
                    </div>
                    <Link
                      to={`/neighborhoods/${neighborhood.slug}`}
                      className="mt-6 inline-flex text-sm font-medium text-gold-dark underline"
                    >
                      Explore {neighborhood.name}
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* mortgage calculator */}
              <div className="mt-12 rounded-3xl sm:rounded-5xl border border-ink/10 bg-cream p-6 sm:p-8">
                <h3 className="font-display text-2xl">Mortgage calculator</h3>
                <p className="mt-1 text-sm text-ink/50">Estimated at 20% down, 30-year fixed at 6.5%.</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/40">Down payment (20%)</p>
                    <p className="mt-1 font-display text-2xl">{formatPrice(mortgage.down)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/40">Monthly payment</p>
                    <p className="mt-1 font-display text-2xl text-gold-dark">
                      ${Math.round(mortgage.monthly).toLocaleString()}/mo
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/40">Total interest</p>
                    <p className="mt-1 font-display text-2xl">{formatPrice(mortgage.interest)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* sticky summary */}
            <div className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="rounded-3xl border border-ink/10 bg-cream p-5 sm:rounded-5xl sm:p-6">
                  <p className="text-xs uppercase tracking-wide text-ink/40">Listed at</p>
                  <p className="mt-1 font-display text-4xl font-medium tracking-tight">{formatPrice(property.price)}</p>
                  <p className="mt-1 text-sm text-ink/50">
                    ${Math.round(property.price / property.sqft).toLocaleString()}/ft²
                  </p>

                  {agent && (
                    <div className="mt-6 flex items-center gap-3 border-t border-npmink/10 pt-6">
                      <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium">{agent.name}</p>
                        <p className="text-xs text-ink/50">{agent.title}</p>
                      </div>
                    </div>
                  )}

                  <a
                    href={`tel:${agent?.phone}`}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-sm font-medium transition-all hover:border-ink"
                  >
                    <Phone size={15} /> Call agent
                  </a>
                </div>

                {/* schedule a tour */}
                <div id="tour-form" className="rounded-3xl border border-ink/10 bg-ink p-5 text-cream sm:rounded-5xl sm:p-6">
                  <h3 className="font-display text-xl">Schedule a tour</h3>
                  {tourSent ? (
                    <div className="mt-6 flex flex-col items-center gap-2 py-6 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink">
                        <Check size={22} />
                      </span>
                      <p className="mt-2 text-sm text-cream/80">Request received. {agent?.name.split(' ')[0]} will reach out within 2 hours.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setTourSent(true);
                      }}
                      className="mt-4 space-y-3"
                    >
                      <input
                        required
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-2xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                      />
                      <input
                        type="date"
                        className="w-full rounded-2xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold [color-scheme:dark]"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-full bg-gold py-3 text-sm font-medium text-ink transition-all hover:bg-cream"
                      >
                        Request viewing
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* similar properties */}
          {similar.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light tracking-tightest sm:text-4xl">Similar homes</h2>
              <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Mobile Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/80 glass py-3 lg:hidden">
        <div className="mx-auto flex items-center justify-between gap-3 px-4 sm:px-5">
          <div>
            <p className="text-xs text-ink/50">Listed at</p>
            <p className="font-display text-xl font-semibold text-ink">{formatPrice(property.price)}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${agent?.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all active:bg-ink/5"
              aria-label="Call agent"
            >
              <Phone size={15} />
            </a>
            <button
              onClick={() => {
                document.getElementById('tour-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-all hover:bg-gold sm:px-6"
            >
              Request Tour
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
