import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PropertyCard } from '../components/PropertyCard';
import { formatPrice, getNeighborhood, getPropertiesByNeighborhood } from '../data';

export function NeighborhoodDetail() {
  const { slug } = useParams();
  const neighborhood = slug ? getNeighborhood(slug) : undefined;

  if (!neighborhood) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream pt-20 text-center">
          <h1 className="font-display text-4xl">Neighborhood not found</h1>
          <Link to="/neighborhoods" className="mt-6 text-gold-dark underline">Back to neighborhoods</Link>
        </div>
      </PageTransition>
    );
  }

  const listings = getPropertiesByNeighborhood(neighborhood.slug);

  return (
    <PageTransition>
      {/* hero */}
      <section className="relative h-[60vh] overflow-hidden bg-ink pt-20">
        <img src={neighborhood.image} alt={neighborhood.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 text-cream sm:px-8">
          <Reveal>
            <p className="text-sm text-cream/60">{neighborhood.city}</p>
            <h1 className="mt-2 font-display text-5xl font-light tracking-tightest sm:text-7xl">{neighborhood.name}</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lg text-ink/70">{neighborhood.blurb}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  to={`/listings?neighborhood=${neighborhood.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-gold hover:text-ink"
                >
                  Browse {listings.length} homes here <ArrowUpRight size={16} />
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    ['Homes', String(neighborhood.stats.homes)],
                    ['Median', formatPrice(neighborhood.stats.medianPrice)],
                    ['Walk score', String(neighborhood.stats.walkScore)],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-3xl border border-ink/10 p-5">
                      <p className="text-xs uppercase tracking-wide text-ink/40">{k}</p>
                      <p className="mt-1 font-display text-xl">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {listings.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl font-light tracking-tightest sm:text-4xl">Homes in {neighborhood.name}</h2>
                <Link to="/neighborhoods" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
                  <ArrowLeft size={16} /> All neighborhoods
                </Link>
              </div>
              <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
