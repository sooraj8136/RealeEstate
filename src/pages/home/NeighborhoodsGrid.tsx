import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { neighborhoods } from '../../data';
import { Reveal, StaggerGroup, StaggerItem } from '../../components/Reveal';
import { formatPrice } from '../../data';

export function NeighborhoodsGrid() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Where we work</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-5xl">
              Featured <span className="italic text-gold-dark">neighborhoods</span> across the region.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/neighborhoods" className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              All neighborhoods <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {neighborhoods.map((n, i) => (
            <StaggerItem key={n.slug} className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <Link to={`/neighborhoods/${n.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-ink/5">
                  <img
                    src={n.image}
                    alt={n.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                    <p className="text-xs text-cream/60">{n.city}</p>
                    <h3 className="mt-1 font-display text-2xl font-medium tracking-tight">{n.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-cream/70">{n.blurb}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-cream/60">
                        Median {formatPrice(n.stats.medianPrice)}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-all group-hover:bg-gold group-hover:text-ink">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
