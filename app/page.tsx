import { Hero } from '@/components/sections/Hero';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { Stats } from '@/components/sections/Stats';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { NewsPreview } from '@/components/sections/NewsPreview';
import { CTABanner } from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioPreview />
      <Stats />
      <AboutPreview />
      <NewsPreview />
      <CTABanner />
    </>
  );
}
