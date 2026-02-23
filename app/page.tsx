import LocationSection from '@/components/LocationSection';
import Features from '@/components/Features';
import GetApp from '@/components/GetApp';
import Hero from '@/components/Hero';
import History from '@/components/History';
import ProductSection from '@/components/ProductSection';

export default function Home() {
  return (
    <>
      <Hero />
      <History />
      <ProductSection />
      <LocationSection />
      {/* <Guide /> */}
      <Features />
      <GetApp />
    </>
  );
}
