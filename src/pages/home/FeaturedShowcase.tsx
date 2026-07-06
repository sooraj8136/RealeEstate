import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bath, Bed, Maximize } from 'lucide-react';
import { formatPrice, properties } from '../../data';
import { Reveal } from '../../components/Reveal';

const featured = properties.filter((p) => p.featured).slice(0, 3);

export function FeaturedShowcase() {
  const [active, setActive] = useState(0);
  const current = featured[active];

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Featured Listings</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-5xl">
              A closer look at <span className="italic text-gold-dark">three</span> homes we love this season.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/listings" className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              View all listings <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        {/* sticky pinned showcase */}
        <div className="mt-16 lg:sticky lg:top-24">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            {/* left thumbnail */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <button
                onClick={() => setActive((active + featured.length - 1) % featured.length)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-ink/5">
                  <img
                    src={featured[(active + featured.length - 1) % featured.length].images[0]}
                    alt=""
                    className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-xs text-ink/50">
                  {featured[(active + featured.length - 1) % featured.length].title}
                </p>
              </button>
            </div>

            {/* central large */}
            <div className="order-1 lg:order-2 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/listings/${current.id}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-6xl bg-ink">
                      <img
                        src={current.images[0]}
                        alt={current.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                      {/* floating badges */}
                      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full glass glass-dark px-4 py-2 text-cream">
                        <span className="h-2 w-2 rounded-full bg-gold" />
                        <span className="text-xs font-medium">{current.status}</span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                        <div className="text-cream">
                          <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{current.title}</h3>
                          <p className="mt-1 text-cream/70">{current.address}</p>
                        </div>
                        <div className="flex gap-3">
                          {[
                            { icon: Bed, label: `${current.beds} beds` },
                            { icon: Bath, label: `${current.baths} baths` },
                            { icon: Maximize, label: `${current.sqft.toLocaleString()} ft²` },
                          ].map((s, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 rounded-full glass glass-dark px-3 py-1.5 text-xs text-cream"
                            >
                              <s.icon size={13} className="text-gold" /> {s.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="font-display text-2xl font-semibold tracking-tight">{formatPrice(current.price)}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-gold-dark">
                        View property <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* dots */}
              <div className="mt-6 flex justify-center gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-ink' : 'w-1.5 bg-ink/20'}`}
                    aria-label={`Show featured ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* right thumbnail */}
            <div className="order-3 lg:col-span-2">
              <button
                onClick={() => setActive((active + 1) % featured.length)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-ink/5">
                  <img
                    src={featured[(active + 1) % featured.length].images[0]}
                    alt=""
                    className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-xs text-ink/50">{featured[(active + 1) % featured.length].title}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
