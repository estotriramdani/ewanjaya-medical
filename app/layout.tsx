import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PT Ewan Jaya Kastara',
  description:
    'Produsen alat kesehatan yang berdiri pada 12 Januari 2000, dengan paten merk EJ-Medical, berlokasi di Kabupaten Bandung. Memiliki izin resmi dari Kementerian Kesehatan Republik Indonesia dan Kementrian Perindustrian Republik Indonesia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
