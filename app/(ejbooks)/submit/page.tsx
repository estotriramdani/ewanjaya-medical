import { Metadata } from 'next';
import EJBooksSubmitClient from '@/components/ejbooks/EJBooksSubmitClient';

export const metadata: Metadata = {
  title: 'Terbitkan Buku | EJ Books',
  description:
    'Kirimkan naskah Anda untuk diterbitkan oleh EJ Books. Pilih paket penerbitan yang sesuai dan mulai perjalanan Anda menjadi penulis.',
};

export default function EJBooksSubmitPage() {
  return <EJBooksSubmitClient />;
}
