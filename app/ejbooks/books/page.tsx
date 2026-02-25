import { Metadata } from 'next';
import { EJ_BOOKS_LIST } from '@/constants/ejbooks';

export const metadata: Metadata = {
  title: 'Katalog Buku | EJ Books',
  description:
    'Jelajahi koleksi buku yang telah diterbitkan oleh EJ Books. Dari fiksi hingga panduan praktis.',
};

export default function EJBooksCatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-600 to-teal-700 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="absolute top-16 right-20 text-white/10 text-8xl hidden lg:block">📚</div>
          <div className="absolute bottom-24 right-1/3 text-white/10 text-6xl hidden lg:block">📖</div>
        </div>

        <div className="max-container padding-container relative z-10 py-20 lg:py-24">
          <a
            href="/ejbooks"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            ← Kembali ke EJ Books
          </a>
          <h1 className="bold-40 lg:bold-64 mb-4 drop-shadow-sm">Katalog Buku</h1>
          <p className="regular-18 lg:regular-20 text-white/85 max-w-2xl leading-relaxed">
            Temukan buku-buku berkualitas yang telah diterbitkan oleh EJ Books. Setiap buku ditulis
            dengan penuh dedikasi oleh penulis-penulis berbakat Indonesia.
          </p>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Book list */}
      <section className="max-container padding-container py-16 lg:py-24">
        <div className="mb-8">
          <p className="regular-16 text-gray-30">
            Menampilkan <span className="font-semibold text-gray-90">{EJ_BOOKS_LIST.length}</span>{' '}
            buku
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EJ_BOOKS_LIST.map((book) => (
            <a
              key={book.id}
              href={`/ejbooks/books/${book.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Price badge */}
                <span className="absolute top-3 right-3 bg-green-50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {book.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="bold-18 text-gray-90 mb-1 group-hover:text-green-50 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-30 mb-3">
                  oleh {book.authorPenName || book.author}
                </p>
                <p className="regular-14 text-gray-50 line-clamp-2 mb-4">
                  {book.shortDescription}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-30">{book.pages} halaman</span>
                  <span className="text-green-50 font-medium group-hover:underline">
                    Lihat Detail →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {EJ_BOOKS_LIST.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📚</span>
            <p className="regular-18 text-gray-50">Belum ada buku yang diterbitkan.</p>
            <p className="regular-14 text-gray-30 mt-2">
              Jadilah penulis pertama yang menerbitkan buku di EJ Books!
            </p>
            <a
              href="/ejbooks/submit"
              className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-8 py-3 font-semibold mt-6 hover:bg-green-600 transition-colors"
            >
              Terbitkan Buku Anda
            </a>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gray-10 py-16">
        <div className="max-container padding-container text-center">
          <h2 className="bold-32 text-gray-90 mb-4">Ingin Buku Anda Tampil di Sini?</h2>
          <p className="regular-16 text-gray-50 mb-6 max-w-xl mx-auto">
            Kirimkan naskah Anda dan bergabung bersama penulis-penulis berbakat lainnya di EJ
            Books.
          </p>
          <a
            href="/ejbooks/submit"
            className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-8 py-3 font-semibold hover:bg-green-600 transition-colors"
          >
            ✍️ Terbitkan Buku
          </a>
        </div>
      </section>
    </>
  );
}
