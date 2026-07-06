import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import { Logo } from './Navbar';

const offices = [
  { city: 'Northbridge', address: '12 Harborline Walk, Floor 6' },
  { city: 'Aldmere', address: '4 Foundry Mews' },
];

const sitemap = [
  { label: 'Listings', to: '/listings' },
  { label: 'Neighborhoods', to: '/neighborhoods' },
  { label: 'Agents', to: '/agents' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Saved', to: '/favorites' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* oversized background type */}
      <div className="pointer-events-none absolute -bottom-10 left-0 right-0 select-none text-center">
        <span className="font-display text-[22vw] font-bold leading-none text-cream/[0.04]">Estatia</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-cream/60">
              A boutique real estate agency representing the region’s most considered homes. We find, tour, and place
              families into houses built to last.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all hover:border-gold hover:text-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">Explore</h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {sitemap.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-sm text-cream/70 hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">Offices</h4>
            <div className="mt-5 space-y-4">
              {offices.map((o) => (
                <div key={o.city} className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium">{o.city}</p>
                    <p className="text-sm text-cream/50">{o.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-32 overflow-hidden rounded-2xl border border-cream/10">
              <img
                src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600&h=200&fit=crop"
                alt="Aerial city view"
                loading="lazy"
                className="h-full w-full object-cover opacity-60"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Estatia. All rights reserved.</p>
          <p>Designed in-house. Built to last.</p>
        </div>
      </div>
    </footer>
  );
}
