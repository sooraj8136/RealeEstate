import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bath, Bed, Heart, MapPin, Maximize } from 'lucide-react';
import { formatPrice, type Property, getNeighborhood } from '../data';
import { useFavorites } from '../context/FavoritesContext';

const statusTone: Record<Property['status'], string> = {
  'For Sale': 'bg-ink/80 text-cream',
  'New Listing': 'bg-gold text-ink',
  Luxury: 'bg-ink text-gold',
  'Under Contract': 'bg-ink/40 text-cream',
};

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(property.id);
  const neighborhood = getNeighborhood(property.neighborhood);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/listings/${property.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-ink/5">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60" />

          {/* status pill */}
          <div className="absolute left-4 top-4">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[property.status]}`}>
              {property.status}
            </span>
          </div>

          {/* favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(property.id);
            }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass glass-light text-ink transition-all hover:scale-110"
            aria-label="Save listing"
          >
            <Heart size={16} className={fav ? 'fill-gold text-gold' : ''} />
          </button>

          {/* floating stat badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full glass glass-light px-3 py-1.5 text-xs font-medium text-ink">
            <MapPin size={12} className="text-gold" />
            {neighborhood?.name ?? property.city}
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-gold-dark">
              {property.title}
            </h3>
            <p className="mt-0.5 text-sm text-ink/50">{property.address}</p>
          </div>
          <p className="shrink-0 font-display text-lg font-semibold tracking-tight">{formatPrice(property.price)}</p>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-ink/60">
          <span className="flex items-center gap-1.5">
            <Bed size={15} className="text-gold" /> {property.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={15} className="text-gold" /> {property.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={15} className="text-gold" /> {property.sqft.toLocaleString()} ft²
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
