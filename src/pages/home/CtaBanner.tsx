import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

export function CtaBanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-cream pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-6xl bg-ink px-6 py-20 text-cream sm:px-16 sm:py-28">
            {/* oversized background type */}
            <div className="pointer-events-none absolute -bottom-8 left-0 right-0 select-none text-center">
              <span className="font-display text-[20vw] font-bold leading-none text-cream/[0.04]">JOIN</span>
            </div>

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl font-light leading-[1.05] tracking-tightest sm:text-5xl">
                Get new listings <span className="italic text-gold">before</span> they go public.
              </h2>
              <p className="mx-auto mt-6 max-w-md text-cream/60">
                A short, weekly note with the homes we’ve just listed, market notes from our agents, and the occasional
                off-market opportunity.
              </p>

              {sent ? (
                <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold/15 px-6 py-3.5 text-sm font-medium text-gold">
                  <Check size={18} /> You’re on the list. Welcome.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSent(true);
                  }}
                  className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-6 py-3.5 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-all hover:bg-gold"
                  >
                    Subscribe
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
              <p className="mt-4 text-xs text-cream/40">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
