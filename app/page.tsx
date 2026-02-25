import LocationSection from '@/components/LocationSection';
import Features from '@/components/Features';
import GetApp from '@/components/GetApp';
import Hero from '@/components/Hero';
import History from '@/components/History';
import ProductSection from '@/components/ProductSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EJ Medical | Memberikan alat kesehatan terbaik',
  description: 'EJ Medical menyediakan solusi alat kesehatan terbaik untuk semua kebutuhan Anda.',
  keywords: ['EJ Medical', 'alat kesehatan', 'solusi kesehatan', 'produk kesehatan'],
  abstract: 'EJ Medical menyediakan informasi dan solusi alat kesehatan terbaik untuk semua kebutuhan Anda.'
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <History />
        <ProductSection />
        <LocationSection />
        {/* <Guide /> */}
        <Features />
        <GetApp />
      </main>
      <Footer />
    </>
  );
}
