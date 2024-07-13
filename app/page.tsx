import LocationSection from '@/components/LocationSection';
import Features from '@/components/Features';
import GetApp from '@/components/GetApp';
import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSection />
      <LocationSection />
      {/* <Guide /> */}
      <Features />
      <GetApp />
    </>
  );
}
