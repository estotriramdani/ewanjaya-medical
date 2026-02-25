import { Metadata } from 'next';
import EJBooksClientPage from '@/components/ejbooks/EJBooksClientPage';

export const metadata: Metadata = {
  title: 'EJ Books | Terbit buku gratis',
  description:
    'EJ Books adalah unit usaha penerbitan buku dari PT Ewan Jaya Kastara. Self publishing mudah, cepat, dan terjangkau.',
  keywords: ['EJ Books', 'penerbitan buku', 'self publishing', 'terbit buku gratis'],
};

export default function EJBooksPage() {
  return <EJBooksClientPage />;
}
