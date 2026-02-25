import { Metadata } from 'next';
import { EJ_BOOKS_LIST } from '@/constants/ejbooks';
import BookDetailClient from '@/components/ejbooks/BookDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const book = EJ_BOOKS_LIST.find((b) => b.id === id);

  if (!book) {
    return {
      title: 'Buku Tidak Ditemukan | EJ Books',
    };
  }

  return {
    title: `${book.title} | EJ Books`,
    description: book.shortDescription,
  };
}

export function generateStaticParams() {
  return EJ_BOOKS_LIST.map((book) => ({
    id: book.id,
  }));
}

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  return <BookDetailClient bookId={id} />;
}
