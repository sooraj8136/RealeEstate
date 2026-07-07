import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Search, ShieldCheck, Star, Building2, Compass } from 'lucide-react';
import { neighborhoods } from '../../data';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  return (
    <>
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-cream pt-20 sm:pt-28">
      {/* oversized background type */}
      {/* <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
      >
        <span className="select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none text-ink/[0.03]">
          ESTATIA
        </span>
      </motion.div> */}

      {/* hero background image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 h-full w-full overflow-hidden z-0"
      >
        <img
          src="/hero-bg.png"
          alt="Modern Architectural Building in Winter"
          className="h-full w-full object-cover"
        />
        {/* Mobile: cream fade from top covering navbar + text area */}
        <div className="absolute inset-x-0 top-0 h-[75%] bg-gradient-to-b from-cream via-cream/80 to-transparent sm:hidden" />
        {/* Desktop: soft cream fade just behind the navbar strip */}
        <div className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-cream/90 to-transparent sm:block" />
      </motion.div>

      {/* foreground — two-column responsive layout */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8"
      >
        <div className="flex flex-col gap-8 pb-12 pt-8 sm:pt-16 lg:flex-row lg:items-start lg:gap-12 lg:pb-0">

          {/* ── LEFT: headline block ── */}
          <div className="shrink-0 lg:max-w-[55%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-ink/65"
            >
              {/* <span className="flex h-2 w-2 rounded-full bg-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.25em]">Boutique real estate, est. 2012</span> */}
            </motion.div>

            <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-tight text-ink sm:leading-[0.98] sm:tracking-tightest">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Estatia <span className="font-normal italic text-gold">finds</span> your
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="block font-semibold"
              >
                dream home
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block font-light"
              >
                in the city.
              </motion.span>
            </h1>

            {/* <motion.p ... /> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9"
            >
              <Link
                to="/listings"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-gold hover:text-ink"
              >
                Search properties
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: info panel — stacks on mobile, floats right on lg ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col gap-5 lg:ml-auto lg:mt-6 lg:w-[min(320px,32vw)] lg:shrink-0"
          >
            {/* heading block */}
            <div className="flex flex-col gap-3">
              {/* decorative line + label */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-ink/20" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                  Our Vision
                </span>
              </div>

              <h2 className="font-grotesk text-[clamp(1.05rem,1.6vw,1.35rem)] font-bold leading-[1.2] tracking-tight text-ink">
                Designing Timeless{' '}
                <span className="text-hero-accent">Architectural Icons</span>
              </h2>

              <p className="text-[clamp(0.72rem,0.95vw,0.83rem)] leading-relaxed text-ink/55">
                A bold construction company that merges innovation, precision, and aesthetics to shape the cities of tomorrow.
              </p>
            </div>

            {/* action cards row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 — Explore */}
              <Link
                to="/listings"
                className="group flex flex-col gap-2 rounded-2xl glass glass-light p-4 text-ink shadow-lg shadow-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/15"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.08] text-ink transition-colors group-hover:bg-gold/20 group-hover:text-gold-dark">
                  <Compass size={18} />
                </div>
                <div>
                  <p className="text-[0.78rem] font-bold leading-tight">
                    Explore <span className="text-hero-accent">all</span> locations
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-snug text-ink/50">
                    See all objects on the map
                  </p>
                </div>
              </Link>

              {/* Card 2 — Discover */}
              <Link
                to="/about"
                className="group flex flex-col gap-2 rounded-2xl glass glass-light p-4 text-ink shadow-lg shadow-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/15"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.08] text-ink transition-colors group-hover:bg-gold/20 group-hover:text-gold-dark">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-[0.78rem] font-bold leading-tight">
                    Discover <span className="text-hero-accent">Estatia</span>
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-snug text-ink/50">
                    Discover our legacy
                  </p>
                </div>
              </Link>
            </div>

            {/* ratings badge — inline on mobile, hidden on lg (absolute version takes over) */}
            <div className="flex items-center gap-3 rounded-2xl glass glass-light px-4 py-3 text-ink shadow-lg shadow-ink/15 lg:hidden">
              <div className="flex -space-x-2">
                {[3760263, 1681010, 415829].map((id) => (
                  <img
                    key={id}
                    src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-cream object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-gold" />
                  ))}
                </div>
                <p className="text-xs text-ink/60">Trusted by 5,000+ families</p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ratings badge — absolute overlay, desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-[12%] right-[3%] z-20 hidden lg:block xl:right-[5%]"
      >
        <div className="flex items-center gap-3 rounded-2xl glass glass-light px-4 py-3 text-ink shadow-xl shadow-ink/20">
          <div className="flex -space-x-2">
            {[3760263, 1681010, 415829].map((id) => (
              <img
                key={id}
                src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`}
                alt=""
                className="h-8 w-8 rounded-full border-2 border-cream object-cover"
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-gold" />
              ))}
            </div>
            <p className="text-xs text-ink/60">Trusted by 5,000+ families</p>
          </div>
        </div>
      </motion.div>

    </section>

    {/* search bar — in normal flow, always visible */}
    {/* <section className="relative z-20 bg-ink pb-10">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            if (location) params.set('neighborhood', location);
            if (type) params.set('type', type);
            navigate(`/listings?${params.toString()}`);
          }}
          className="flex flex-col gap-3 rounded-4xl glass glass-light p-3 shadow-2xl shadow-ink/30 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-3 rounded-3xl bg-cream/60 px-4 py-3 sm:py-2.5">
            <MapPin size={18} className="shrink-0 text-gold" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="">All locations</option>
              {neighborhoods.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.name}, {n.city}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden h-8 w-px bg-ink/10 sm:block" />
          <div className="flex flex-1 items-center gap-3 rounded-3xl bg-cream/60 px-4 py-3 sm:py-2.5">
            <Search size={18} className="shrink-0 text-gold" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="">Any type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Loft">Loft</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <button
            type="submit"
            className="group flex shrink-0 items-center justify-center gap-2 rounded-3xl bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-gold hover:text-ink sm:px-8"
          >
            Search
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </section> */}
    </>
  );
}
