export type Property = {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Villa' | 'Penthouse' | 'Loft' | 'Townhouse';
  status: 'For Sale' | 'New Listing' | 'Luxury' | 'Under Contract';
  yearBuilt: number;
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  lat: number;
  lng: number;
  featured?: boolean;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  avatar: string;
  listings: number;
  rating: number;
  reviews: number;
  email: string;
  phone: string;
  social: { twitter?: string; linkedin?: string; instagram?: string };
};

export type Neighborhood = {
  slug: string;
  name: string;
  city: string;
  blurb: string;
  image: string;
  stats: { homes: number; medianPrice: number; walkScore: number };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
};

const img = (id: string | number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const properties: Property[] = [
  {
    id: 'marlowe-house',
    title: 'Marlowe House',
    address: '42 Linden Crescent, Westbrook',
    neighborhood: 'westbrook',
    city: 'Northbridge',
    price: 2450000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: 'House',
    status: 'For Sale',
    yearBuilt: 2019,
    images: [img('323780'), img('1396122'), img('1571460'), img('2026960'), img('271639')],
    description:
      'A glass-and-timber family residence set above a quiet ravine. Marlowe House pairs a calm, material-led interior with a south-facing courtyard designed for long, slow evenings. Every surface was chosen to age well — oiled oak, brushed limestone, and hand-troweled plaster.',
    features: [
      'Heated oak floors throughout',
      'Chef’s kitchen with stone island',
      'Floor-to-ceiling glass courtyard',
      'Primary suite with private terrace',
      'EV charging in garage',
      'Landscaped by Field Studio',
    ],
    agentId: 'aria-okafor',
    lat: 40.71,
    lng: -74.0,
    featured: true,
  },
  {
    id: 'the-arden-penthouse',
    title: 'The Arden Penthouse',
    address: 'Floor 38, 9 Harborline Tower',
    neighborhood: 'harborline',
    city: 'Northbridge',
    price: 4100000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: 'Penthouse',
    status: 'Luxury',
    yearBuilt: 2021,
    images: [img('758742'), img('2462015'), img('1115800'), img('1029599'), img('1080722')],
    description:
      'A full-floor penthouse with 360-degree harbor views and a private rooftop terrace. The Arden is for the buyer who wants the city laid out beneath them — and the quiet of being above it.',
    features: [
      'Private elevator landing',
      '360° wraparound terrace',
      'Double-height living room',
      'Gaggenau appliance package',
      'Smart-home automation',
      'Two deeded parking spaces',
    ],
    agentId: 'jules-renner',
    lat: 40.72,
    lng: -74.01,
    featured: true,
  },
  {
    id: 'cedar-walk-loft',
    title: 'Cedar Walk Loft',
    address: '118 Cedar Walk, Foundry District',
    neighborhood: 'foundry',
    city: 'Aldmere',
    price: 1280000,
    beds: 2,
    baths: 2,
    sqft: 1850,
    type: 'Loft',
    status: 'New Listing',
    yearBuilt: 2018,
    images: [img('1571460'), img('2026960'), img('271639'), img('1438832'), img('1648776')],
    description:
      'A converted foundry loft with original brick, steel beams, and new oversized windows. Cedar Walk keeps its industrial bones and adds warmth through walnut millwork and a wood-burning hearth.',
    features: [
      '14ft original timber ceilings',
      'Wood-burning fireplace',
      'Walnut chef’s kitchen',
      'Private rooftop access',
      'Bike storage + workshop',
      'Concierge lobby',
    ],
    agentId: 'sora-hayashi',
    lat: 40.7,
    lng: -73.99,
    featured: true,
  },
  {
    id: 'linden-villa',
    title: 'Linden Villa',
    address: '7 Ridge Path, Westbrook',
    neighborhood: 'westbrook',
    city: 'Northbridge',
    price: 3850000,
    beds: 5,
    baths: 4,
    sqft: 4600,
    type: 'Villa',
    status: 'Luxury',
    yearBuilt: 2020,
    images: [img('1396122'), img('323780'), img('2026960'), img('271639'), img('276474')],
    description:
      'A low-slung villa wrapped in mature gardens and a long lap pool. Linden Villa is built for entertaining — open plan, generous outdoor rooms, and a wine cellar tucked under the stair.',
    features: [
      '30m lap pool',
      'Wine cellar (1,200 bottles)',
      'Detached studio / guest house',
      'Solar + battery storage',
      'Mature landscape by Field Studio',
      'Gated motor court',
    ],
    agentId: 'aria-okafor',
    lat: 40.705,
    lng: -74.005,
  },
  {
    id: 'harborline-flat-12b',
    title: 'Harborline Flat 12B',
    address: 'Floor 12, 9 Harborline Tower',
    neighborhood: 'harborline',
    city: 'Northbridge',
    price: 1650000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: 'Apartment',
    status: 'For Sale',
    yearBuilt: 2021,
    images: [img('2462015'), img('758742'), img('1029599'), img('1115800'), img('1080722')],
    description:
      'A corner two-bedroom in the Harborline tower with unobstructed water views. Clean white oak floors, a calm palette, and a balcony deep enough for a table for four.',
    features: [
      'Corner unit, dual-aspect',
      'Balcony with harbor view',
      'White oak floors',
      'Building gym + spa',
      '24h concierge',
      'Pet friendly',
    ],
    agentId: 'jules-renner',
    lat: 40.715,
    lng: -74.012,
  },
  {
    id: 'foundry-mews-townhouse',
    title: 'Foundry Mews Townhouse',
    address: '5 Foundry Mews, Foundry District',
    neighborhood: 'foundry',
    city: 'Aldmere',
    price: 1980000,
    beds: 3,
    baths: 3,
    sqft: 2400,
    type: 'Townhouse',
    status: 'New Listing',
    yearBuilt: 2017,
    images: [img('2026960'), img('1571460'), img('271639'), img('1438832'), img('1648776')],
    description:
      'A three-story mews townhouse with a private courtyard and a roof terrace. Foundry Mews is a quiet, modern home tucked into a cobbled lane — close to the galleries and the river.',
    features: [
      'Private courtyard garden',
      'Rooftop terrace',
      'Basement media room',
      'Underfloor heating',
      'Secure gated lane',
      'Walk to river path',
    ],
    agentId: 'sora-hayashi',
    lat: 40.695,
    lng: -73.985,
  },
  {
    id: 'the-greenway-residence',
    title: 'The Greenway Residence',
    address: '1 Greenway Court, Westbrook',
    neighborhood: 'westbrook',
    city: 'Northbridge',
    price: 2950000,
    beds: 4,
    baths: 4,
    sqft: 3900,
    type: 'House',
    status: 'For Sale',
    yearBuilt: 2022,
    images: [img('271639'), img('323780'), img('1396122'), img('2026960'), img('1571460')],
    description:
      'A new build on a generous corner lot, The Greenway Residence is all about light and flow — a single open volume on the ground floor opening to a wide lawn and a thin reflecting pool.',
    features: [
      'Open ground-floor volume',
      'Reflecting pool + lawn',
      'Passive house insulation',
      'Triple-glazed glass',
      'Home cinema',
      'Two-car garage',
    ],
    agentId: 'aria-okafor',
    lat: 40.708,
    lng: -74.008,
  },
  {
    id: 'aldmere-skyline-loft',
    title: 'Aldmere Skyline Loft',
    address: '220 Mill Street, Foundry District',
    neighborhood: 'foundry',
    city: 'Aldmere',
    price: 1120000,
    beds: 1,
    baths: 1,
    sqft: 1100,
    type: 'Loft',
    status: 'For Sale',
    yearBuilt: 2016,
    images: [img('1438832'), img('1648776'), img('1571460'), img('2026960'), img('271639')],
    description:
      'A one-bedroom loft with a wall of steel-framed windows looking over the old mill district. Compact, considered, and fully renovated last year.',
    features: [
      'Steel-framed windows',
      'Renovated 2024',
      'Custom built-ins',
      'Shared roof deck',
      'Bike room',
      'Walk to galleries',
    ],
    agentId: 'sora-hayashi',
    lat: 40.69,
    lng: -73.98,
  },
  {
    id: 'the-meridian-house',
    title: 'The Meridian House',
    address: '88 Coast Road, Harborline',
    neighborhood: 'harborline',
    city: 'Northbridge',
    price: 5200000,
    beds: 6,
    baths: 5,
    sqft: 6200,
    type: 'Villa',
    status: 'Luxury',
    yearBuilt: 2023,
    images: [img('1396122'), img('271639'), img('323780'), img('2026960'), img('758742')],
    description:
      'A waterfront villa with a private dock and a glass-walled living room that opens to the sea. The Meridian is the rare house that feels both monumental and completely calm.',
    features: [
      'Private deepwater dock',
      'Glass-walled living room',
      'Infinity edge pool',
      'Wine room + tasting',
      'Staff / guest wing',
      'Landscaped bluff garden',
    ],
    agentId: 'jules-renner',
    lat: 40.725,
    lng: -74.015,
  },
];

export const agents: Agent[] = [
  {
    id: 'aria-okafor',
    name: 'Aria Okafor',
    title: 'Principal Broker',
    specialty: 'Architectural homes & new builds',
    bio: 'Aria founded Estatia after a decade in architecture. She represents the region’s most considered new builds and has placed over 300 families into homes designed to last.',
    avatar: img('3760263', 600, 600),
    listings: 42,
    rating: 4.9,
    reviews: 128,
    email: 'aria@estatia.co',
    phone: '+1 (415) 555-0142',
    social: { linkedin: '#', instagram: '#' },
  },
  {
    id: 'jules-renner',
    name: 'Jules Renner',
    title: 'Senior Agent, Waterfront',
    specialty: 'Penthouses & harbor properties',
    bio: 'Jules knows the harborline better than anyone. He’s sold every penthouse in Harborline Tower and specializes in high-floor, high-view properties for buyers who want the city at their feet.',
    avatar: img('1681010', 600, 600),
    listings: 28,
    rating: 4.8,
    reviews: 94,
    email: 'jules@estatia.co',
    phone: '+1 (415) 555-0177',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    id: 'sora-hayashi',
    name: 'Sora Hayashi',
    title: 'Agent, Foundry District',
    specialty: 'Lofts & converted spaces',
    bio: 'Sora lives in and sells the Foundry District. She has a soft spot for old industrial buildings and the people who love them, and has placed more artists into the mill lofts than anyone else.',
    avatar: img('415829', 600, 600),
    listings: 19,
    rating: 5.0,
    reviews: 61,
    email: 'sora@estatia.co',
    phone: '+1 (415) 555-0193',
    social: { instagram: '#' },
  },
  {
    id: 'marco-vela',
    name: 'Marco Vela',
    title: 'Agent, Westbrook',
    specialty: 'Family homes & gardens',
    bio: 'Marco helps growing families find homes with room to breathe — gardens, good schools, and streets that stay quiet. He’s the agent most of Westbrook’s new residents are referred to.',
    avatar: img('220453', 600, 600),
    listings: 24,
    rating: 4.9,
    reviews: 87,
    email: 'marco@estatia.co',
    phone: '+1 (415) 555-0118',
    social: { linkedin: '#' },
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'westbrook',
    name: 'Westbrook',
    city: 'Northbridge',
    blurb: 'Tree-lined streets, good schools, and the city’s best gardens. Westbrook is where families put down roots.',
    image: img('1396122', 1000, 1200),
    stats: { homes: 184, medianPrice: 2650000, walkScore: 72 },
  },
  {
    slug: 'harborline',
    name: 'Harborline',
    city: 'Northbridge',
    blurb: 'Glass towers, harbor views, and a waterfront promenade. Harborline is the city’s vertical address.',
    image: img('758742', 1000, 1200),
    stats: { homes: 142, medianPrice: 3100000, walkScore: 91 },
  },
  {
    slug: 'foundry',
    name: 'Foundry District',
    city: 'Aldmere',
    blurb: 'Converted mills, cobbled lanes, and the city’s gallery scene. The Foundry District is for loft lovers.',
    image: img('1571460', 1000, 1200),
    stats: { homes: 96, medianPrice: 1450000, walkScore: 88 },
  },
  {
    slug: 'aldmere-old-town',
    name: 'Aldmere Old Town',
    city: 'Aldmere',
    blurb: 'Georgian terraces, independent shops, and the river path. Old Town is quiet, central, and full of character.',
    image: img('2026960', 1000, 1200),
    stats: { homes: 73, medianPrice: 1750000, walkScore: 95 },
  },
  {
    slug: 'coast-road',
    name: 'Coast Road',
    city: 'Northbridge',
    blurb: 'Bluff-top villas and private docks. Coast Road is the city’s quiet waterfront — big sky, big water.',
    image: img('271639', 1000, 1200),
    stats: { homes: 41, medianPrice: 4400000, walkScore: 54 },
  },
  {
    slug: 'mill-green',
    name: 'Mill Green',
    city: 'Aldmere',
    blurb: 'A new park-side enclave of low-rise modern homes. Mill Green is green, new, and walkable to the river.',
    image: img('323780', 1000, 1200),
    stats: { homes: 58, medianPrice: 2100000, walkScore: 84 },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-a-passive-house-actually-costs',
    title: 'What a passive house actually costs in 2026',
    excerpt:
      'We broke down the real numbers — insulation, glazing, solar — for three Estatia-listed passive homes. The payback is faster than most buyers think.',
    category: 'Market Trends',
    author: 'Aria Okafor',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    image: img('323780', 1200, 800),
    body: [
      'A passive house is a building standard, not a style. It means a home is insulated and airtight enough to stay comfortable with a tiny fraction of the heating and cooling a normal home needs. The question every buyer asks is whether the upfront cost is worth it.',
      'Across three Estatia-listed passive homes this year, the premium over a comparable code-built home ranged from 6% to 11% of total build cost. Most of that sits in three buckets: triple-glazed windows, a heat-recovery ventilator, and a much tighter insulation package.',
      'The payback math is friendlier than it looks. At current energy prices, and with the region’s new heat-pump rebates, two of the three homes we tracked will recover the premium in under twelve years — and that is before counting resale. Passive homes in our market have sold for a 4–7% premium over comparable non-passive homes.',
      'The non-financial case is harder to put a number on but matters more to most owners: the air is cleaner, the rooms are quieter, and the temperature never moves more than a degree or two. If you are buying a home to live in for a decade or more, the passive premium is one of the best dollars you can spend.',
    ],
  },
  {
    slug: 'how-to-read-a-listing-photo',
    title: 'How to read a listing photo (and what it’s hiding)',
    excerpt:
      'Wide-angle lenses, golden hour, and staged furniture. A short guide to seeing past the photography and into the actual home.',
    category: 'Buying Guides',
    author: 'Sora Hayashi',
    date: 'Jun 02, 2026',
    readTime: '5 min read',
    image: img('1571460', 1200, 800),
    body: [
      'Listing photography is marketing. That is not a complaint — good photography helps a good home find its buyer. But it does mean you have to learn to read the photo, not just look at it.',
      'The first tell is the lens. Most listing interiors are shot on a very wide lens, which makes rooms look roughly 30% larger than they are. Compare the floor plan’s square footage to what your eye tells you; trust the number.',
      'The second tell is light. Golden-hour exteriors are beautiful and say almost nothing about how the home feels at 4pm in November. Ask the agent for a second visit in the late afternoon on an overcast day. The homes that still feel good then are the ones worth buying.',
      'The third tell is staging. A staged living room is a suggestion, not a promise. Look past the furniture to the bones: ceiling height, window placement, the relationship between rooms. Furniture leaves; the architecture stays.',
    ],
  },
  {
    slug: 'foundry-district-five-years-in',
    title: 'Foundry District, five years in: what changed and what’s next',
    excerpt:
      'A neighborhood report on the mill district’s conversion wave — prices, new businesses, and the residents who got in early.',
    category: 'Neighborhood Reports',
    author: 'Sora Hayashi',
    date: 'May 21, 2026',
    readTime: '6 min read',
    image: img('2026960', 1200, 800),
    body: [
      'Five years ago the Foundry District was a handful of converted mills and a lot of empty cobbles. Today it is the city’s most active conversion market and its most concentrated gallery scene.',
      'Median prices in the district are up 38% over five years, but the more interesting number is volume: 96 active listings across the district this quarter, more than double the count in 2021. The supply is finally catching up to the demand.',
      'What is next is the Mill Green extension — a park-side enclave of low-rise modern homes breaking ground this autumn. It will be the first new-build product in the district and will likely reset the top of the market here.',
    ],
  },
  {
    slug: 'the-case-for-a-smaller-house',
    title: 'The case for a smaller house',
    excerpt:
      'Square footage is the most overrated number on a listing. A short argument for buying less space and more quality.',
    category: 'Buying Guides',
    author: 'Aria Okafor',
    date: 'May 04, 2026',
    readTime: '4 min read',
    image: img('271639', 1200, 800),
    body: [
      'The first thing most buyers ask is the square footage. It is usually the wrong question.',
      'A well-designed 1,800 square foot home will outlive and out-love a poorly designed 3,500 square foot one. The cost per square foot of good design falls as the home gets smaller, because the expensive things — the windows, the kitchen, the primary bath — are fixed costs.',
      'Buy the home you will actually use. Most families use three rooms daily and the rest occasionally. Spend the budget on making those three rooms exceptional, not on square footage you will heat and clean and rarely enter.',
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena & Theo Marchetti',
    role: 'Bought in Westbrook',
    quote:
      'Aria didn’t sell us a house — she found us the house we didn’t know we were looking for. We toured six homes and she quietly ruled out five of them before we understood why. She was right.',
    avatar: img('415829', 200, 200),
    rating: 5,
  },
  {
    id: 't2',
    name: 'Priya Anand',
    role: 'Bought a Foundry loft',
    quote:
      'I’d been watching the Foundry District for two years. Sora knew every building, every developer, and which conversions were done right. I bought within three weeks of meeting her.',
    avatar: img('3760263', 200, 200),
    rating: 5,
  },
  {
    id: 't3',
    name: 'The Okafor-Bell family',
    role: 'Sold in Harborline',
    quote:
      'Jules sold our penthouse in eleven days, above asking, to a buyer he already knew. The whole thing felt calm and inevitable. We have already recommended him to three friends.',
    avatar: img('1681010', 200, 200),
    rating: 5,
  },
  {
    id: 't4',
    name: 'Daniel Reyes',
    role: 'Bought in Coast Road',
    quote:
      'I wanted a waterfront house and I wanted it to be the right one. Marco showed me four and told me to wait on the fifth. The fifth was the one. He has earned a client for life.',
    avatar: img('220453', 200, 200),
    rating: 5,
  },
];

export const stats = [
  { label: 'Properties sold', value: 500, suffix: '+' },
  { label: 'Cities covered', value: 120, suffix: '+' },
  { label: 'Years active', value: 14, suffix: '' },
  { label: 'Client satisfaction', value: 98, suffix: '%' },
];

export const formatPrice = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M` : `$${n.toLocaleString()}`;

export const getProperty = (id: string) => properties.find((p) => p.id === id);
export const getAgent = (id: string) => agents.find((a) => a.id === id);
export const getNeighborhood = (slug: string) => neighborhoods.find((n) => n.slug === slug);
export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getPropertiesByAgent = (agentId: string) => properties.filter((p) => p.agentId === agentId);
export const getPropertiesByNeighborhood = (slug: string) => properties.filter((p) => p.neighborhood === slug);
export const getSimilarProperties = (id: string, limit = 3) => {
  const p = getProperty(id);
  if (!p) return [];
  return properties
    .filter((x) => x.id !== id && (x.neighborhood === p.neighborhood || x.type === p.type))
    .slice(0, limit);
};
