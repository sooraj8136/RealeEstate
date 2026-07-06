import { useState } from 'react';
import { Check, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Reveal } from '../components/Reveal';

const offices = [
  { city: 'Northbridge', address: '12 Harborline Walk, Floor 6, Northbridge', hours: 'Mon–Sat, 9am–7pm', phone: '+1 (415) 555-0100' },
  { city: 'Aldmere', address: '4 Foundry Mews, Aldmere', hours: 'Mon–Fri, 10am–6pm', phone: '+1 (415) 555-0200' },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageTransition>
      <section className="bg-cream pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Contact</span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tightest sm:text-6xl">
              Let’s find your <span className="italic text-gold-dark">next home</span> together.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* form */}
            <Reveal>
              <div className="relative">
                <div className="absolute -right-4 -top-4 z-10 flex items-center gap-2 rounded-full glass glass-light px-4 py-2 text-xs font-medium text-ink shadow-lg">
                  <Clock size={13} className="text-gold" /> We reply within 2 hours
                </div>
                {sent ? (
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-5xl border border-ink/10 p-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
                      <Check size={28} />
                    </span>
                    <h3 className="mt-6 font-display text-2xl">Message sent</h3>
                    <p className="mt-2 text-ink/60">Thank you. One of our agents will be in touch shortly.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-sm text-gold-dark underline">
                      Send another
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-4 rounded-5xl border border-ink/10 p-6 sm:p-8"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input required placeholder="First name" className="rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
                      <input required placeholder="Last name" className="rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
                    </div>
                    <input required type="email" placeholder="Email" className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
                    <input placeholder="Phone (optional)" className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
                    <select className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink">
                      <option>I’m interested in buying</option>
                      <option>I’m interested in selling</option>
                      <option>I’d like to book a viewing</option>
                      <option>Something else</option>
                    </select>
                    <textarea rows={4} placeholder="Tell us what you’re looking for" className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-ink" />
                    <button type="submit" className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-cream transition-all hover:bg-gold hover:text-ink">
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* offices + map */}
            <Reveal delay={0.1}>
              <div className="space-y-6">
                {offices.map((o) => (
                  <div key={o.city} className="rounded-5xl border border-ink/10 p-6">
                    <h3 className="font-display text-2xl">{o.city}</h3>
                    <div className="mt-4 space-y-3 text-sm text-ink/70">
                      <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-gold" /> {o.address}</p>
                      <p className="flex items-center gap-2"><Clock size={16} className="text-gold" /> {o.hours}</p>
                      <p className="flex items-center gap-2"><Phone size={16} className="text-gold" /> {o.phone}</p>
                    </div>
                  </div>
                ))}
                <div className="h-64 overflow-hidden rounded-5xl border border-ink/10">
                  <img
                    src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                    alt="Aerial city view"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 rounded-3xl bg-ink p-5 text-cream">
                  <Mail size={18} className="text-gold" />
                  <p className="text-sm">Or email us directly at <span className="font-medium text-gold">hello@estatia.co</span></p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
