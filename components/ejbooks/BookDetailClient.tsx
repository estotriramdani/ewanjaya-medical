'use client';

import { useState } from 'react';
import { EJ_BOOKS_LIST, EJ_BOOKS_SOCIAL_LINKS, formatBookPrice, type EJBook } from '@/constants/ejbooks';
import { ChevronLeft, ChevronRight, Download, ShoppingCart, X, Loader2 } from 'lucide-react';

function BookGallery({ book }: { book: EJBook }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % book.images.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + book.images.length) % book.images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-10 rounded-2xl overflow-hidden">
        <img
          src={book.images[activeIndex]}
          alt={`${book.title} - gambar ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {book.images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {activeIndex + 1} / {book.images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {book.images.length > 1 && (
        <div className="flex gap-2">
          {book.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-1 aspect-square rounded-xl overflow-hidden transition-all ${
                activeIndex === index
                  ? 'ring-2 ring-green-50 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`${book.title} - thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WhatsAppOrderModal({
  book,
  isOpen,
  onClose,
}: {
  book: EJBook;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const waLink = EJ_BOOKS_SOCIAL_LINKS.find((l) => l.id === 'whatsapp');
  const waNumber = waLink ? waLink.url.replace('https://wa.me/', '') : '6285703329747';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsRedirecting(true);

    const message = encodeURIComponent(
      `Halo EJ Books! 👋\n\nSaya ingin memesan buku cetak:\n📕 Judul: ${book.title}\n✍️ Penulis: ${book.author.name}\n💰 Harga: ${formatBookPrice(book.price)}\n\nNama saya: ${name.trim()}\n\nMohon info selanjutnya. Terima kasih!`
    );

    const url = `https://wa.me/${waNumber}?text=${message}`;

    setTimeout(() => {
      window.open(url, '_blank');
      setIsRedirecting(false);
      onClose();
      setName('');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-10 transition-colors"
        >
          <X className="w-5 h-5 text-gray-30" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-50/10 flex items-center justify-center mx-auto mb-3">
            <ShoppingCart className="w-7 h-7 text-green-50" />
          </div>
          <h3 className="bold-20 text-gray-90">Pesan Buku Cetak</h3>
          <p className="regular-14 text-gray-30 mt-1">via WhatsApp</p>
        </div>

        <div className="bg-gray-10 rounded-xl p-4 mb-6 flex gap-3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-14 h-20 object-cover rounded-lg flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="bold-16 text-gray-90 truncate">{book.title}</p>
            <p className="text-sm text-gray-30">{book.author.name}</p>
            <p className="text-sm font-semibold text-green-50 mt-1">{formatBookPrice(book.price)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-90 mb-2">
              Nama Anda <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama lengkap Anda"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isRedirecting || !name.trim()}
            className="w-full rounded-full bg-[#25D366] text-white py-3.5 font-semibold transition-all hover:bg-[#1fb855] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Membuka WhatsApp...
              </>
            ) : (
              <>💬 Lanjutkan ke WhatsApp</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function BookDetail({ book }: { book: EJBook }) {
  const [showWAModal, setShowWAModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Category */}
      <span className="inline-block text-sm font-medium text-green-50 bg-green-50/10 px-3 py-1 rounded-full">
        {book.category}
      </span>

      {/* Title */}
      <h1 className="bold-32 lg:bold-40 text-gray-90">{book.title}</h1>

      {/* Author */}
      <p className="regular-18 text-gray-50">
        oleh <span className="font-semibold text-gray-90">{book.author.name}</span>
        {book.author.penName && (
          <span className="text-gray-30"> ({book.author.penName})</span>
        )}
      </p>

      {/* Price */}
      <div className="bg-green-50/10 rounded-xl p-4">
        <span className="bold-32 text-green-50">{formatBookPrice(book.price)}</span>
      </div>

      {/* Description */}
      <div>
        <h3 className="bold-18 text-gray-90 mb-2">Deskripsi</h3>
        <p className="regular-16 text-gray-50 leading-relaxed">{book.description}</p>
      </div>

      {/* Info table */}
      <div className="border rounded-xl divide-y">
        {book.isbn && (
          <div className="flex justify-between p-4">
            <span className="text-sm text-gray-30">ISBN</span>
            <span className="text-sm font-medium text-gray-90">{book.isbn}</span>
          </div>
        )}
        <div className="flex justify-between p-4">
          <span className="text-sm text-gray-30">Jumlah Halaman</span>
          <span className="text-sm font-medium text-gray-90">{book.pages} halaman</span>
        </div>
        <div className="flex justify-between p-4">
          <span className="text-sm text-gray-30">Tanggal Terbit</span>
          <span className="text-sm font-medium text-gray-90">
            {new Date(book.publishedDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex justify-between p-4">
          <span className="text-sm text-gray-30">Kategori</span>
          <span className="text-sm font-medium text-gray-90">{book.category}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {book.downloadLink && (
          <a
            href={book.downloadLink}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-green-50 text-white px-6 py-3.5 font-semibold hover:bg-green-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            Unduh E-Book (Gratis)
          </a>
        )}
        {book.buyLink && (
          <button
            onClick={() => setShowWAModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gray-90 text-white px-6 py-3.5 font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            Beli Versi Cetak
          </button>
        )}
      </div>

      <WhatsAppOrderModal
        book={book}
        isOpen={showWAModal}
        onClose={() => setShowWAModal(false)}
      />
    </div>
  );
}

export default function BookDetailClient({ bookId }: { bookId: string }) {
  const book = EJ_BOOKS_LIST.find((b) => b.id === bookId);

  if (!book) {
    return (
      <section className="max-container padding-container py-20 text-center">
        <span className="text-6xl block mb-4">🔍</span>
        <h1 className="bold-32 text-gray-90 mb-2">Buku Tidak Ditemukan</h1>
        <p className="regular-16 text-gray-50 mb-6">
          Buku yang Anda cari tidak tersedia atau sudah dihapus.
        </p>
        <a
          href="/ejbooks/books"
          className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-8 py-3 font-semibold hover:bg-green-600 transition-colors"
        >
          Kembali ke Katalog
        </a>
      </section>
    );
  }

  return (
    <>
      <section className="max-container padding-container py-8 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <a
            href="/ejbooks/books"
            className="inline-flex items-center gap-1 text-gray-30 hover:text-green-50 text-sm mb-8 transition-colors"
          >
            ← Kembali ke Katalog
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <BookGallery book={book} />
            <BookDetail book={book} />
          </div>
        </div>
      </section>

      {/* Related books */}
      <section className="bg-gray-10 py-16">
        <div className="max-container padding-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="bold-32 text-gray-90 mb-8">Buku Lainnya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EJ_BOOKS_LIST.filter((b) => b.id !== book.id)
                .slice(0, 4)
                .map((relatedBook) => (
                  <a
                    key={relatedBook.id}
                    href={`/ejbooks/books/${relatedBook.id}`}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedBook.coverImage}
                        alt={relatedBook.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="bold-16 text-gray-90 group-hover:text-green-50 transition-colors mb-1">
                        {relatedBook.title}
                      </h3>
                      <p className="text-sm text-gray-30">
                        {relatedBook.author.penName || relatedBook.author.name}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
