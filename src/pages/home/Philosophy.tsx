import { Link } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem } from '../../components/Reveal';
import { testimonials } from '../../data';
import { Star } from 'lucide-react';

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      {/* oversized background type */}
      <div className="pointer-events-none absolute -left-10 top-10 select-none">
        <span className="font-display text-[18vw] font-bold leading-none text-cream/[0.04]">HOME</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">Why Estatia</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-6xl">
                We believe a home is the <span className="italic text-gold">most important</span> purchase a family
                will ever make. We treat it that way.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-cream/60">
                Estatia was founded by an architect and a broker who were tired of how real estate was sold. We tour
                every home we list, we represent only homes we would live in, and we never push a buyer toward a house
                that isn’t right for them.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-all hover:bg-gold"
                >
                  Our approach
                </Link>
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:border-cream"
                >
                  See reviews
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {testimonials.map((t) => (
                    <img
                      key={t.id}
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full border-2 border-ink object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-cream/60">Trusted by 5,000+ families across the region</p>
                </div>
              </div>
            </Reveal>

            <StaggerGroup className="mt-10 space-y-6" stagger={0.1}>
              {testimonials.slice(0, 2).map((t) => (
                <StaggerItem key={t.id} className="rounded-4xl border border-cream/10 bg-cream/[0.03] p-6">
                  <p className="text-cream/80">“{t.quote}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-cream/50">{t.role}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
