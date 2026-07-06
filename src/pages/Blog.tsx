import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal';
import { blogPosts } from '../data';

const categories = ['All', 'Market Trends', 'Buying Guides', 'Neighborhood Reports'];

export function Blog() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageTransition>
      <section className="bg-cream pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Journal</span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tightest sm:text-6xl">
              Market <span className="italic text-gold-dark">insights</span> & buying guides.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  cat === c ? 'border-ink bg-ink text-cream' : 'border-ink/15 text-ink/70 hover:border-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {featured && (
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="group block">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="aspect-[16/10] overflow-hidden rounded-6xl bg-ink/5">
                    <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{featured.category}</span>
                    <h2 className="mt-4 font-display text-3xl font-light leading-tight tracking-tightest sm:text-5xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-ink/60">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-ink/50">
                      <span>{featured.author}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {featured.readTime}</span>
                      <span>{featured.date}</span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-gold-dark">
                      Read article <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {rest.map((p) => (
              <StaggerItem key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-4xl bg-ink/5">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{p.category}</span>
                  <h3 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight group-hover:text-gold-dark">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-ink/40">{p.date} · {p.readTime}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageTransition>
  );
}
