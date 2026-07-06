import { PageTransition } from '../components/PageTransition';
import { Hero } from './home/Hero';
import { StatsBar } from './home/StatsBar';
import { FeaturedShowcase } from './home/FeaturedShowcase';
import { Philosophy } from './home/Philosophy';
import { NeighborhoodsGrid } from './home/NeighborhoodsGrid';
import { AgentSpotlight } from './home/AgentSpotlight';
import { Testimonials } from './home/Testimonials';
import { CtaBanner } from './home/CtaBanner';

export function Home() {
  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <FeaturedShowcase />
      <Philosophy />
      <NeighborhoodsGrid />
      <AgentSpotlight />
      <Testimonials />
      <CtaBanner />
    </PageTransition>
  );
}
