import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Search, ShieldCheck, Star } from 'lucide-react';
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
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink pt-28">
      {/* oversized background type */}
      <motion.div
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none text-cream/[0.05]">
          ESTATIA
        </span>
      </motion.div>

      {/* hero image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute right-0 top-1/2 h-[78%] w-[62%] -translate-y-1/2 overflow-hidden rounded-6xl sm:w-[52%] lg:w-[46%]"
      >
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1600&fit=crop"
          alt="Modern glass-and-timber home at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      </motion.div>

      {/* foreground text */}
      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl pt-10 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 text-cream/60"
          >
            <span className="flex h-2 w-2 rounded-full bg-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.25em]">Boutique real estate, est. 2012</span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[0.98] tracking-tightest text-cream">
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 max-w-md text-cream/60"
          >
            We represent the region’s most considered homes — modern builds, waterfront villas, and converted lofts —
            and the families who belong in them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/listings"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-all hover:bg-gold"
            >
              Search properties
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:border-cream"
            >
              Book a viewing
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* floating glass badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute right-[4%] top-[22%] z-20 hidden lg:block"
      >
        <div className="flex items-center gap-3 rounded-2xl glass glass-light px-4 py-3 text-ink shadow-xl shadow-ink/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Verified listings</p>
            <p className="text-xs text-ink/50">Every home, toured in person</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute right-[8%] bottom-[20%] z-20 hidden lg:block"
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
    <section className="relative z-20 bg-ink pb-10">
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
    </section>
    </>
  );
}
