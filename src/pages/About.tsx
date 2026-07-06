import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { agents, stats } from '../data';
import { CountUp } from '../components/CountUp';

const milestones = [
  { year: '2012', title: 'Estatia is founded', text: 'Aria Okafor leaves architecture to start a brokerage that only represents homes she would live in.' },
  { year: '2015', title: 'First waterfront division', text: 'Jules Renner joins and opens the Harborline office, taking on the tower market.' },
  { year: '2018', title: 'Foundry District expansion', text: 'Sora Hayashi opens the Aldmere office as the mill conversions begin in earnest.' },
  { year: '2021', title: '500 homes sold', text: 'Estatia crosses 500 closed sales and launches its weekly market note.' },
  { year: '2024', title: 'Passive home practice', text: 'We launch a dedicated practice for passive and high-performance homes.' },
];

export function About() {
  return (
    <PageTransition>
      {/* hero */}
      <section className="relative overflow-hidden bg-ink pt-32 text-cream">
        <div className="pointer-events-none absolute -bottom-10 left-0 right-0 select-none text-center">
          <span className="font-display text-[22vw] font-bold leading-none text-cream/[0.04]">STUDIO</span>
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">About Estatia</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-tightest sm:text-7xl">
              We are a small studio that <span className="italic text-gold">only</span> takes on homes we believe in.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* mission + image */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden rounded-6xl bg-ink/5">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1250&fit=crop"
                  alt="Estatia studio"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Our mission"
                title={<>A home is the most important purchase a family will make. We treat it that way.</>}
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-ink/70">
                  Estatia was founded in 2012 by an architect and a broker who were tired of how real estate was sold.
                  We tour every home we list, we represent only homes we would live in, and we never push a buyer
                  toward a house that isn’t right for them.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-ink/70">
                  Today we are a team of {agents.length} agents across two offices, and we have placed over 500
                  families into homes built to last.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="bg-ink py-20 text-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="border-l border-cream/15 pl-5">
                <p className="font-display text-5xl font-light tracking-tightest sm:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-cream/50">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="Milestones" title={<>A short history of Estatia.</>} />
          <div className="mt-16 space-y-0">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <div className="flex gap-6 border-b border-ink/10 pb-10">
                  <p className="w-16 shrink-0 font-display text-2xl text-gold-dark">{m.year}</p>
                  <div>
                    <h3 className="font-display text-xl font-medium">{m.title}</h3>
                    <p className="mt-2 text-ink/60">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* team grid */}
      <section className="bg-ink py-24 text-cream sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between">
            <SectionHeading tone="dark" eyebrow="The team" title={<>The people behind Estatia.</>} />
            <Link to="/agents" className="link-underline inline-flex items-center gap-1.5 text-sm text-cream">
              All agents <ArrowUpRight size={16} />
            </Link>
          </div>
          <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {agents.map((a) => (
              <StaggerItem key={a.id}>
                <Link to={`/agents/${a.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-4xl bg-cream/5">
                    <img src={a.avatar} alt={a.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-xl">{a.name}</h3>
                      <p className="text-sm text-cream/60">{a.title}</p>
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
