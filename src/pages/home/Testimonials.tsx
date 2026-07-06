import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data';
import { Reveal } from '../../components/Reveal';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <Quote size={40} className="mx-auto text-gold" />
        </Reveal>
        <div className="mt-8 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-light leading-snug tracking-tight sm:text-4xl"
            >
              “{t.quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-1 text-gold">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={16} className="fill-gold" />
          ))}
        </div>
        <p className="mt-4 text-sm font-medium">{t.name}</p>
        <p className="text-sm text-ink/50">{t.role}</p>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-8 bg-ink' : 'w-1.5 bg-ink/20'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
