import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal';
import { agents } from '../data';

export function Agents() {
  return (
    <PageTransition>
      <section className="bg-cream pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Our agents</span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tightest sm:text-6xl">
              The <span className="italic text-gold-dark">people</span> who will find your home.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2" stagger={0.1}>
            {agents.map((a) => (
              <StaggerItem key={a.id}>
                <Link to={`/agents/${a.id}`} className="group block">
                  <div className="grid grid-cols-5 gap-5 overflow-hidden rounded-5xl border border-ink/10 bg-cream p-4 transition-all hover:border-ink/30 hover:shadow-xl hover:shadow-ink/5">
                    <div className="col-span-2 aspect-[3/4] overflow-hidden rounded-4xl bg-ink/5">
                      <img src={a.avatar} alt={a.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-1 text-gold">
                        <Star size={13} className="fill-gold" />
                        <span className="text-xs text-ink/60">{a.rating} · {a.reviews} reviews</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">{a.name}</h3>
                      <p className="text-sm text-ink/50">{a.title}</p>
                      <p className="mt-3 text-sm text-ink/70">{a.specialty}</p>
                      <p className="mt-4 text-xs text-ink/40">{a.listings} active listings</p>
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
