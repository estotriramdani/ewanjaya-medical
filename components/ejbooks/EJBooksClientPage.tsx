'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ArrowRight, Pen } from 'lucide-react';
import {
  EJ_BOOKS_INFO,
  EJ_BOOKS_LIST,
  EJ_BOOKS_CONTACT,
  EJ_BOOKS_FAQ,
  EJ_BOOKS_TESTIMONIALS,
  EJ_BOOKS_ANNOUNCEMENTS,
  EJ_BOOKS_SECTIONS,
  EJ_BOOKS_PUBLISHING_FLOW,
  EJ_BOOKS_PUBLISHING_PACKAGES,
  formatBookPrice,
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
          <h1 className="bold-52 lg:bold-88 mb-4 drop-shadow-sm">
            {EJ_BOOKS_INFO.name}
          </h1>
          <p className="regular-18 lg:regular-20 text-white/90 mb-6 italic font-medium">
            &ldquo;{EJ_BOOKS_INFO.tagline2}&rdquo;
          </p>
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

// ===================== BEST SELLER =====================
function BestSellerSection() {
  const bestSellers = EJ_BOOKS_LIST.filter((b) => b.isBestSeller);

  if (bestSellers.length === 0) return null;

  return (
    <section className="max-container padding-container py-16 lg:py-24">
      <div className="text-center mb-12">
        <span className="inline-block rounded-full bg-yellow-50/20 text-yellow-600 px-4 py-1.5 text-sm font-semibold mb-4">
          🔥 Best Seller
        </span>
        <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Buku Paling Laris</h2>
        <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
          Buku-buku terlaris yang paling banyak diminati pembaca.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((book) => (
          <a
            key={book.id}
            href={`/ejbooks/books/${book.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border-2 border-yellow-50/30"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-yellow-50 text-white text-xs font-bold px-3 py-1 rounded-full">
                🔥 Best Seller
              </span>
              <span className="absolute top-3 right-3 bg-green-50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {formatBookPrice(book.price)}
              </span>
            </div>
            <div className="p-5">
              <h3 className="bold-18 text-gray-90 mb-1 group-hover:text-green-50 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-30 mb-2">oleh {book.author.penName || book.author.name}</p>
              <p className="regular-14 text-gray-50 mb-3 line-clamp-2">{book.shortDescription}</p>
              <span className="text-sm font-medium text-green-50 group-hover:underline">
                Lihat Detail →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ===================== BOOKS (4 newest) =====================
function BooksSection() {
  const newestBooks = [...EJ_BOOKS_LIST]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 4);

  return (
    <section id={EJ_BOOKS_SECTIONS.books} className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Buku Terbitan Kami</h2>
          <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
            Buku-buku terbaru yang telah diterbitkan oleh EJ Books.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newestBooks.map((book) => (
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
                <p className="text-sm text-gray-30 mb-2">oleh {book.author.penName || book.author.name}</p>
                <p className="regular-14 text-gray-50 mb-4 line-clamp-2">{book.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-50">{formatBookPrice(book.price)}</span>
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

// ===================== PUBLISHING TIMELINE =====================
function PublishingTimelineSection() {
  return (
    <section className="max-container padding-container py-16 lg:py-24">
      <div className="text-center mb-14">
        <span className="inline-block rounded-full bg-green-50/10 text-green-50 px-4 py-1.5 text-sm font-semibold mb-4">
          📋 Proses Penerbitan
        </span>
        <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Alur Penerbitan Buku</h2>
        <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
          {EJ_BOOKS_PUBLISHING_FLOW.length} langkah mudah untuk menerbitkan buku Anda bersama EJ Books.
        </p>
      </div>

      {/* Desktop timeline */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-green-50/20" />
          <div className="grid grid-cols-6 gap-4">
            {EJ_BOOKS_PUBLISHING_FLOW.map((step, index) => (
              <div key={step.step} className="relative text-center group">
                {/* Dot */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-green-50 mx-auto flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:border-green-600">
                  {step.icon}
                </div>
                <div className="mt-4">
                  <span className="text-xs font-bold text-green-50 uppercase tracking-wider">
                    Langkah {step.step}
                  </span>
                  <h4 className="bold-14 text-gray-90 mt-1 mb-1 leading-tight">{step.title}</h4>
                  <p className="text-xs text-gray-30 leading-snug">{step.description.substring(0, 80)}...</p>
                  <span className="inline-block mt-2 text-xs text-green-50 font-medium bg-green-50/10 rounded-full px-2 py-0.5">
                    ⏱ {step.estimatedDuration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="md:hidden space-y-0">
        {EJ_BOOKS_PUBLISHING_FLOW.map((step, index) => (
          <div key={step.step} className="flex gap-4">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-50 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                {step.icon}
              </div>
              {index < EJ_BOOKS_PUBLISHING_FLOW.length - 1 && (
                <div className="w-0.5 h-full bg-green-50/20 mt-2" />
              )}
            </div>
            {/* Content */}
            <div className="pb-8">
              <span className="text-xs font-bold text-green-50 uppercase tracking-wider">
                Langkah {step.step}
              </span>
              <h4 className="bold-18 text-gray-90 mt-1 mb-1">{step.title}</h4>
              <p className="regular-14 text-gray-50 leading-relaxed mb-1">{step.description}</p>
              <span className="text-xs text-green-50 font-medium">⏱ {step.estimatedDuration}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/ejbooks/submit"
          className="inline-flex items-center gap-2 rounded-full bg-green-50 text-white px-8 py-3.5 font-semibold transition-all hover:bg-green-600 hover:scale-105"
        >
          <Pen className="w-4 h-4" />
          Mulai Kirim Naskah
        </a>
      </div>
    </section>
  );
}

// ===================== CTA (Animated & Interactive) =====================
function CTASection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id={EJ_BOOKS_SECTIONS.cta} className="max-container padding-container py-16 lg:py-24">
      <div
        className="relative rounded-3xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Floating decorative elements */}
        <div className={`absolute top-6 left-8 text-white/10 text-6xl transition-transform duration-700 ${isHovered ? 'translate-y-[-8px] rotate-12' : ''}`}>📝</div>
        <div className={`absolute top-8 right-12 text-white/10 text-5xl transition-transform duration-700 delay-100 ${isHovered ? 'translate-y-[-12px] -rotate-6' : ''}`}>📖</div>
        <div className={`absolute bottom-8 left-16 text-white/10 text-5xl transition-transform duration-700 delay-200 ${isHovered ? 'translate-y-[-6px] rotate-6' : ''}`}>✨</div>
        <div className={`absolute bottom-6 right-20 text-white/10 text-6xl transition-transform duration-700 delay-150 ${isHovered ? 'translate-y-[-10px] -rotate-12' : ''}`}>📚</div>

        {/* Glow orbs */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl transition-all duration-1000 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-60'}`} />
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-300/10 blur-3xl transition-all duration-1000 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-60'}`} />

        <div className="relative z-10 p-10 lg:p-16 text-white text-center">
          <div className={`inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-5 py-2 mb-6 text-sm font-medium border border-white/20 transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}>
            <Sparkles className="w-4 h-4" />
            Wujudkan Mimpi Anda
          </div>

          <h2 className="bold-32 lg:bold-52 mb-4 leading-tight">
            Punya Naskah?
            <br />
            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent bg-[length:200%] animate-shimmer">
              Terbitkan Sekarang!
            </span>
          </h2>

          <p className="regular-18 text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Wujudkan mimpi Anda menjadi penulis. EJ Books siap mendampingi Anda dari naskah hingga
            buku jadi. Proses mudah, cepat, dan terjangkau.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            <div className="text-center">
              <p className="bold-32 text-white">{EJ_BOOKS_LIST.length}+</p>
              <p className="text-sm text-white/70">Buku Terbit</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="bold-32 text-white">{EJ_BOOKS_PUBLISHING_PACKAGES.length}</p>
              <p className="text-sm text-white/70">Paket Tersedia</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="bold-32 text-white">Gratis</p>
              <p className="text-sm text-white/70">Paket Dasar</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ejbooks/submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-green-50 px-8 py-4 font-bold text-lg transition-all hover:bg-gray-10 hover:scale-105 shadow-xl shadow-black/10 animate-pulse-glow"
            >
              ✍️ Mulai Terbitkan
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`https://wa.me/${EJ_BOOKS_CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 text-white px-8 py-4 font-semibold transition-all hover:bg-white/10 hover:border-white/70 backdrop-blur-sm"
            >
              💬 Konsultasi via WhatsApp
            </a>
          </div>
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
      <PublishingTimelineSection />
      <BestSellerSection />
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
