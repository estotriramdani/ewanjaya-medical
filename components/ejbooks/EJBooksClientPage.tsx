'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  EJ_BOOKS_INFO,
  EJ_BOOKS_LIST,
  EJ_BOOKS_CONTACT,
  EJ_BOOKS_FAQ,
  EJ_BOOKS_TESTIMONIALS,
  EJ_BOOKS_ANNOUNCEMENTS,
  EJ_BOOKS_SECTIONS,
} from '@/constants/ejbooks';

// ===================== HERO =====================
function HeroSection() {
  return (
    <section
      id={EJ_BOOKS_SECTIONS.hero}
      className="relative bg-gradient-to-br from-green-50 via-emerald-600 to-teal-700 text-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-emerald-400/10 blur-2xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-teal-300/10 blur-2xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        {/* Floating book shapes */}
        <div className="absolute top-16 right-20 text-white/10 text-8xl hidden lg:block animate-pulse">📖</div>
        <div className="absolute bottom-32 right-40 text-white/10 text-6xl hidden lg:block">📚</div>
        <div className="absolute top-40 right-1/3 text-white/10 text-5xl hidden lg:block">✏️</div>
      </div>

      <div className="max-container padding-container relative z-10 py-24 lg:py-36">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-white/15 backdrop-blur-sm px-5 py-2 text-sm font-medium mb-8 border border-white/20">
            📚 {EJ_BOOKS_INFO.tagline}
          </span>
          <h1 className="bold-52 lg:bold-88 mb-6 drop-shadow-sm">
            {EJ_BOOKS_INFO.name}
          </h1>
          <p className="regular-18 lg:regular-20 text-white/85 mb-10 max-w-2xl leading-relaxed">
            {EJ_BOOKS_INFO.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/ejbooks/submit"
              className="inline-flex items-center justify-center rounded-full bg-white text-green-50 px-8 py-4 font-semibold transition-all hover:bg-gray-10 hover:scale-105 shadow-lg shadow-black/10"
            >
              ✍️ Terbitkan Buku Anda
            </a>
            <a
              href={`#${EJ_BOOKS_SECTIONS.books}`}
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white px-8 py-4 font-semibold transition-all hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
            >
              📖 Lihat Katalog Buku
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

// ===================== ABOUT =====================
function AboutSection() {
  return (
    <section id={EJ_BOOKS_SECTIONS.about} className="max-container padding-container py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-6">Tentang EJ Books</h2>
          <p className="regular-16 text-gray-50 mb-8 leading-relaxed">
            {EJ_BOOKS_INFO.sejarah}
          </p>
          <div className="bg-green-50/10 rounded-2xl p-6">
            <h3 className="bold-20 text-green-50 mb-3">🎯 Visi</h3>
            <p className="regular-16 text-gray-50">{EJ_BOOKS_INFO.visi}</p>
          </div>
        </div>
        <div>
          <div className="bg-gray-10 rounded-2xl p-6">
            <h3 className="bold-20 text-gray-90 mb-4">🚀 Misi</h3>
            <ul className="space-y-3">
              {EJ_BOOKS_INFO.misi.map((item, index) => (
                <li key={index} className="flex gap-3 regular-16 text-gray-50">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-50 text-white text-sm flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== BOOKS =====================
function BooksSection() {
  return (
    <section id={EJ_BOOKS_SECTIONS.books} className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Buku Terbitan Kami</h2>
          <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
            Jelajahi koleksi buku yang telah diterbitkan oleh EJ Books. Dari fiksi hingga panduan
            praktis, temukan buku yang menginspirasi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EJ_BOOKS_LIST.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              <a href={`/ejbooks/books/${book.id}`} className="block aspect-square overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </a>
              <div className="p-5">
                <h3 className="bold-18 text-gray-90 mb-1 group-hover:text-green-50 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-30 mb-2">oleh {book.authorPenName || book.author}</p>
                <p className="regular-14 text-gray-50 mb-4 line-clamp-2">{book.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-50">{book.price}</span>
                  <a
                    href={`/ejbooks/books/${book.id}`}
                    className="text-sm font-medium text-green-50 hover:underline"
                  >
                    Detail →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/ejbooks/books"
            className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-8 py-3 font-semibold transition-all hover:bg-green-600 hover:scale-105"
          >
            Lihat Semua Buku →
          </a>
        </div>
      </div>
    </section>
  );
}

// ===================== CTA =====================
function CTASection() {
  return (
    <section id={EJ_BOOKS_SECTIONS.cta} className="max-container padding-container py-16 lg:py-24">
      <div className="bg-gradient-to-r from-green-50 to-emerald-600 rounded-3xl p-10 lg:p-16 text-white text-center">
        <h2 className="bold-32 lg:bold-40 mb-4">Punya Naskah? Terbitkan Sekarang!</h2>
        <p className="regular-18 text-white/90 mb-8 max-w-2xl mx-auto">
          Wujudkan mimpi Anda menjadi penulis. EJ Books siap mendampingi Anda dari naskah hingga
          buku jadi. Proses mudah, cepat, dan terjangkau.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/ejbooks/submit"
            className="inline-flex items-center justify-center rounded-full bg-white text-green-50 px-8 py-4 font-semibold transition-all hover:bg-gray-10 hover:scale-105"
          >
            ✍️ Mulai Terbitkan
          </a>
          <a
            href={`https://wa.me/${EJ_BOOKS_CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/50 text-white px-8 py-4 font-semibold transition-all hover:bg-white/10"
          >
            💬 Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ===================== TESTIMONIALS =====================
function TestimonialsSection() {
  return (
    <section id={EJ_BOOKS_SECTIONS.testimonials} className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Apa Kata Mereka?</h2>
          <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
            Testimoni dari penulis yang telah menerbitkan buku bersama EJ Books.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EJ_BOOKS_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="regular-16 text-gray-50 mb-6 italic leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50/20 flex items-center justify-center text-green-50 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-90">{testimonial.name}</p>
                  <p className="text-sm text-gray-30">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== FAQ =====================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={EJ_BOOKS_SECTIONS.faq} className="max-container padding-container py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Pertanyaan Umum (FAQ)</h2>
          <p className="regular-16 text-gray-50">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang EJ Books.
          </p>
        </div>

        <div className="space-y-3">
          {EJ_BOOKS_FAQ.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-10/50 transition-colors"
              >
                <span className="bold-16 text-gray-90 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-30 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-30 flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <p className="regular-16 text-gray-50 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== CONTACT =====================
function ContactSection() {
  return (
    <section id={EJ_BOOKS_SECTIONS.contact} className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Hubungi Kami</h2>
          <p className="regular-16 text-gray-50">
            Punya pertanyaan atau ingin konsultasi? Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href={`mailto:${EJ_BOOKS_CONTACT.email}`}
            className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-3">📧</div>
            <h3 className="bold-18 text-gray-90 mb-2 group-hover:text-green-50 transition-colors">
              Email
            </h3>
            <p className="regular-14 text-gray-50">{EJ_BOOKS_CONTACT.email}</p>
          </a>
          <a
            href={`https://wa.me/${EJ_BOOKS_CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-3">💬</div>
            <h3 className="bold-18 text-gray-90 mb-2 group-hover:text-green-50 transition-colors">
              WhatsApp
            </h3>
            <p className="regular-14 text-gray-50">{EJ_BOOKS_CONTACT.phone}</p>
          </a>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="bold-18 text-gray-90 mb-2">Alamat</h3>
            <p className="regular-14 text-gray-50">{EJ_BOOKS_CONTACT.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== ANNOUNCEMENTS =====================
function AnnouncementsSection() {
  const activeAnnouncements = EJ_BOOKS_ANNOUNCEMENTS.filter((a) => a.isActive);

  if (activeAnnouncements.length === 0) return null;

  return (
    <section id={EJ_BOOKS_SECTIONS.announcements} className="max-container padding-container py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Pengumuman</h2>
        <p className="regular-16 text-gray-50">
          Informasi terbaru dan pengumuman dari EJ Books.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {activeAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="border-2 border-green-50/20 bg-green-50/5 rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📢</span>
              <span className="text-sm font-medium text-green-50">
                {new Date(announcement.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h3 className="bold-20 text-gray-90 mb-2">{announcement.title}</h3>
            <p className="regular-16 text-gray-50 leading-relaxed">{announcement.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================== BOTTOM CTA =====================
function BottomCTASection() {
  return (
    <section className="bg-gray-90 py-16 lg:py-24">
      <div className="max-container padding-container text-center">
        <h2 className="bold-32 lg:bold-40 text-white mb-4">
          Siap Menjadi Penulis?
        </h2>
        <p className="regular-18 text-gray-20 mb-8 max-w-2xl mx-auto">
          Jangan biarkan naskah Anda hanya tersimpan di laci. Kirimkan ke EJ Books dan kami akan
          membantu mewujudkannya menjadi buku nyata yang bisa dibaca oleh semua orang.
        </p>
        <a
          href="/ejbooks/submit"
          className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-10 py-4 font-semibold text-lg transition-all hover:bg-green-600 hover:scale-105"
        >
          ✍️ Terbitkan Buku Sekarang
        </a>
      </div>
    </section>
  );
}

// ===================== MAIN PAGE COMPONENT =====================
export default function EJBooksClientPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BooksSection />
      <CTASection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <AnnouncementsSection />
      <BottomCTASection />
    </>
  );
}
