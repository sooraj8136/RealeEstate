import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal';
import { formatPrice, neighborhoods } from '../data';

export function Neighborhoods() {
  return (
    <PageTransition>
      <section className="bg-cream pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Where we work</span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tightest sm:text-6xl">
              <span className="italic text-gold-dark">Neighborhoods</span> we know by heart.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {neighborhoods.map((n) => (
              <StaggerItem key={n.slug}>
                <Link to={`/neighborhoods/${n.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-5xl bg-ink/5">
                    <img src={n.image} alt={n.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                      <p className="text-xs text-cream/60">{n.city}</p>
                      <h3 className="mt-1 font-display text-2xl font-medium">{n.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-cream/70">{n.blurb}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-cream/60">Median {formatPrice(n.stats.medianPrice)}</span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-all group-hover:bg-gold group-hover:text-ink">
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
    </PageTransition>
  );
}
