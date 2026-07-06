import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Star } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { PropertyCard } from '../components/PropertyCard';
import { agents, getAgent, getPropertiesByAgent } from '../data';

export function AgentProfile() {
  const { id } = useParams();
  const agent = id ? getAgent(id) : undefined;

  if (!agent) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream pt-20 text-center">
          <h1 className="font-display text-4xl">Agent not found</h1>
          <Link to="/agents" className="mt-6 text-gold-dark underline">Back to agents</Link>
        </div>
      </PageTransition>
    );
  }

  const listings = getPropertiesByAgent(agent.id);
  const otherAgents = agents.filter((a) => a.id !== agent.id).slice(0, 3);

  return (
    <PageTransition>
      <div className="bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link to="/agents" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <ArrowLeft size={16} /> All agents
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-6xl bg-ink/5">
                <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" />
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-1 text-gold">
                  <Star size={15} className="fill-gold" />
                  <span className="text-sm text-ink/60">{agent.rating} · {agent.reviews} reviews</span>
                </div>
                <h1 className="mt-3 font-display text-5xl font-light tracking-tightest sm:text-6xl">{agent.name}</h1>
                <p className="mt-2 text-lg text-ink/60">{agent.title}</p>
                <p className="mt-1 text-sm text-gold-dark">{agent.specialty}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-ink/70">{agent.bio}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream hover:bg-gold hover:text-ink">
                    <Mail size={15} /> Email
                  </a>
                  <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium hover:border-ink">
                    <Phone size={15} /> Call
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-ink/10 p-5">
                    <p className="font-display text-3xl">{agent.listings}</p>
                    <p className="text-sm text-ink/50">Active listings</p>
                  </div>
                  <div className="rounded-3xl border border-ink/10 p-5">
                    <p className="font-display text-3xl">{agent.rating}</p>
                    <p className="text-sm text-ink/50">Avg. rating</p>
                  </div>
                  <div className="rounded-3xl border border-ink/10 p-5">
                    <p className="font-display text-3xl">{agent.reviews}</p>
                    <p className="text-sm text-ink/50">Reviews</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* active listings */}
          {listings.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light tracking-tightest sm:text-4xl">Active listings</h2>
              <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* other agents */}
          <div className="mt-24 border-t border-ink/10 pt-16">
            <h2 className="font-display text-2xl">Other agents</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {otherAgents.map((a) => (
                <Link key={a.id} to={`/agents/${a.id}`} className="group flex items-center gap-4 rounded-3xl border border-ink/10 p-4 transition-all hover:border-ink/30">
                  <img src={a.avatar} alt={a.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-ink/50">{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
