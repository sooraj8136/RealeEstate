import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { agents } from '../../data';
import { Reveal, StaggerGroup, StaggerItem } from '../../components/Reveal';

export function AgentSpotlight() {
  return (
    <section className="bg-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">Meet the team</span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-5xl">
              The <span className="italic text-gold">people</span> who will find your home.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/agents" className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-cream">
              All agents <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {agents.map((a) => (
            <StaggerItem key={a.id}>
              <Link to={`/agents/${a.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-cream/5">
                  <img
                    src={a.avatar}
                    alt={a.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-1 text-gold">
                      <Star size={12} className="fill-gold" />
                      <span className="text-xs text-cream/70">{a.rating} · {a.reviews} reviews</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium tracking-tight">{a.name}</h3>
                    <p className="text-sm text-cream/60">{a.title}</p>
                    <p className="mt-3 text-xs text-cream/40">{a.listings} active listings</p>
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
