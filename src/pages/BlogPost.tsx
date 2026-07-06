import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';
import { blogPosts, getBlogPost } from '../data';

export function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream pt-20 text-center">
          <h1 className="font-display text-4xl">Article not found</h1>
          <Link to="/blog" className="mt-6 text-gold-dark underline">Back to journal</Link>
        </div>
      </PageTransition>
    );
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageTransition>
      <article className="bg-cream pt-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
            <ArrowLeft size={16} /> Journal
          </Link>
          <Reveal>
            <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">{post.category}</span>
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-6xl">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-ink/50">
              <span className="font-medium text-ink">{post.author}</span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
            <div className="aspect-[16/9] overflow-hidden rounded-6xl bg-ink/5">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="space-y-6">
              {post.body.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink/80">{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-light tracking-tightest">More from the journal</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-4xl bg-ink/5">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium group-hover:text-gold-dark">{p.title}</h3>
                <p className="mt-1 text-xs text-ink/40">{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
