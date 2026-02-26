import { Metadata } from 'next';
import ContentGeneratorClient from '@/components/ejbooks/ContentGeneratorClient';

export const metadata: Metadata = {
  title: 'Content Generator | EJ Books',
  description:
    'Buat konten Instagram siap posting untuk EJ Books. Pilih template, kustomisasi, fullscreen, lalu screenshot.',
};

export default function ContentGeneratorPage() {
  return <ContentGeneratorClient />;
}
