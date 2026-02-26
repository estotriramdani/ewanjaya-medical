'use client';

import { useState } from 'react';
import {
  EJ_BOOKS_PUBLISHING_FLOW,
  EJ_BOOKS_PUBLISHING_PACKAGES,
  EJ_BOOKS_CONTACT,
  type PublishingPackage,
} from '@/constants/ejbooks';
import { Check, ArrowRight, Send, Loader2 } from 'lucide-react';

// ===================== TIMELINE =====================
function PublishingTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="max-container padding-container py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Alur Penerbitan</h2>
        <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
          Proses penerbitan buku di EJ Books yang terstruktur dan transparan. Klik setiap langkah
          untuk melihat detail.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          {EJ_BOOKS_PUBLISHING_FLOW.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isActive = activeStep === index;

            return (
              <div key={step.step} className="relative mb-8 last:mb-0">
                {/* Center dot */}
                <button
                  onClick={() => setActiveStep(isActive ? null : index)}
                  className={`absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all cursor-pointer
                    ${isActive ? 'bg-green-50 scale-110 shadow-lg shadow-green-50/30' : 'bg-white border-2 border-green-50 hover:bg-green-50/10'}
                  `}
                >
                  {step.icon}
                </button>

                {/* Content card */}
                <div
                  className={`flex ${isLeft ? 'justify-start pr-[55%]' : 'justify-end pl-[55%]'}`}
                >
                  <div
                    className={`bg-white border rounded-2xl p-6 transition-all cursor-pointer w-full
                      ${isActive ? 'border-green-50 shadow-lg' : 'border-gray-200 hover:border-green-50/50 hover:shadow-md'}
                    `}
                    onClick={() => setActiveStep(isActive ? null : index)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-green-50 bg-green-50/10 px-2 py-0.5 rounded-full">
                        Langkah {step.step}
                      </span>
                      <span className="text-xs text-gray-30">⏱ {step.estimatedDuration}</span>
                    </div>
                    <h3 className="bold-18 text-gray-90 mb-1">{step.title}</h3>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="regular-14 text-gray-50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-4">
          {EJ_BOOKS_PUBLISHING_FLOW.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(isActive ? null : index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all
                      ${isActive ? 'bg-green-50 scale-110' : 'bg-white border-2 border-green-50'}
                    `}
                  >
                    {step.icon}
                  </button>
                  {index < EJ_BOOKS_PUBLISHING_FLOW.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 my-1" />
                  )}
                </div>
                <div
                  className={`flex-1 bg-white border rounded-xl p-4 mb-2 transition-all cursor-pointer
                    ${isActive ? 'border-green-50 shadow-md' : 'border-gray-200'}
                  `}
                  onClick={() => setActiveStep(isActive ? null : index)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-green-50">
                      Langkah {step.step}
                    </span>
                    <span className="text-xs text-gray-30">⏱ {step.estimatedDuration}</span>
                  </div>
                  <h3 className="bold-16 text-gray-90">{step.title}</h3>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="regular-14 text-gray-50 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="regular-14 text-gray-30">
            Total estimasi waktu: <span className="font-semibold text-green-50">4-8 minggu</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ===================== PRICING =====================
function PricingSection({
  onSelectPackage,
}: {
  onSelectPackage: (pkg: PublishingPackage) => void;
}) {
  return (
    <section className="bg-gray-10 py-16 lg:py-24">
      <div className="max-container padding-container">
        <div className="text-center mb-12">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Paket Penerbitan</h2>
          <p className="regular-16 text-gray-50 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan Anda. Setiap paket dirancang untuk memberikan
            pengalaman penerbitan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {EJ_BOOKS_PUBLISHING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-xl ${
                pkg.isPopular ? 'border-green-50 shadow-lg scale-[1.02]' : 'border-gray-200'
              }`}
            >
              {pkg.isPopular && (
                <div className="bg-green-50 text-white text-center py-1.5 text-sm font-semibold">
                  ⭐ Paling Populer
                </div>
              )}
              <div className="p-6 lg:p-8">
                <h3 className="bold-20 text-gray-90 mb-2">{pkg.name}</h3>
                <p className="regular-14 text-gray-50 mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className="bold-32 text-gray-90">{pkg.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-50 flex-shrink-0 mt-0.5" />
                      <span className="regular-14 text-gray-50">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full rounded-full py-3 font-semibold transition-all flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-green-50 text-white hover:bg-green-600'
                      : 'bg-gray-90 text-white hover:bg-black'
                  }`}
                >
                  Pilih Paket <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== SUBMISSION FORM =====================
function SubmissionForm({
  selectedPackage,
  onChangePackage,
}: {
  selectedPackage: PublishingPackage | null;
  onChangePackage: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dummy API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="form-section" className="max-container padding-container py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50/10 rounded-3xl p-10 lg:p-16">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="bold-32 text-gray-90 mb-4">Naskah Berhasil Dikirim!</h2>
            <p className="regular-16 text-gray-50 mb-6">
              Terima kasih telah mengirimkan naskah Anda. Tim EJ Books akan meninjau naskah Anda
              dan menghubungi Anda dalam waktu 3-5 hari kerja melalui email atau WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-green-50 text-white px-8 py-3 font-semibold hover:bg-green-600 transition-colors"
              >
                Kembali ke Beranda
              </a>
              <a
                href={`https://wa.me/${EJ_BOOKS_CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-green-50 text-green-50 px-8 py-3 font-semibold hover:bg-green-50/10 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="form-section" className="max-container padding-container py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="bold-32 lg:bold-40 text-gray-90 mb-4">Formulir Pengiriman Naskah</h2>
          <p className="regular-16 text-gray-50">
            Isi formulir di bawah ini untuk mengirimkan naskah Anda. Pastikan semua dokumen
            pendukung telah disiapkan.
          </p>
        </div>

        {/* Selected Package Badge */}
        {selectedPackage && (
          <div className="bg-green-50/10 border border-green-50/30 rounded-xl p-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-sm text-green-50 font-medium">Paket dipilih:</span>
              <span className="ml-2 font-semibold text-gray-90">
                {selectedPackage.name} — {selectedPackage.price}
              </span>
            </div>
            <button
              onClick={onChangePackage}
              className="text-sm text-green-50 hover:underline font-medium"
            >
              Ganti Paket
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paket Penerbitan */}
          <div>
            <label className="block text-sm font-semibold text-gray-90 mb-2">
              Paket Penerbitan <span className="text-red-500">*</span>
            </label>
            <select
              name="package"
              required
              defaultValue={selectedPackage?.id || ''}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
            >
              <option value="" disabled>
                Pilih paket penerbitan
              </option>
              {EJ_BOOKS_PUBLISHING_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — {pkg.price}
                </option>
              ))}
            </select>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-semibold text-gray-90 mb-2">
              Nama Lengkap Penulis <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Masukkan nama lengkap"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
            />
          </div>

          {/* Nama Pena */}
          <div>
            <label className="block text-sm font-semibold text-gray-90 mb-2">
              Nama Pena Penulis
            </label>
            <input
              type="text"
              name="penName"
              placeholder="Masukkan nama pena (opsional)"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
            />
          </div>

          {/* Judul Buku */}
          <div>
            <label className="block text-sm font-semibold text-gray-90 mb-2">
              Judul Buku <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bookTitle"
              required
              placeholder="Masukkan judul buku"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
            />
          </div>

          {/* File Naskah Section */}
          <div className="bg-gray-10 rounded-2xl p-6 space-y-5">
            <h3 className="bold-18 text-gray-90">File Naskah</h3>
            <p className="regular-14 text-gray-30 -mt-3">
              Unggah dokumen pendukung naskah Anda. Format yang diterima: DOC, DOCX, PDF.
            </p>

            {/* Rangkuman / Sinopsis */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Rangkuman / Sinopsis / Gambaran Umum <span className="text-red-500">*</span>
              </label>
              <textarea
                name="synopsis"
                required
                rows={4}
                placeholder="Tuliskan rangkuman, sinopsis, atau gambaran umum naskah Anda..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Daftar Isi */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Daftar Isi <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="tableOfContents"
                required
                accept=".doc,.docx,.pdf"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 file:mr-4 file:rounded-full file:border-0 file:bg-green-50/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-50 hover:file:bg-green-50/20 transition-all"
              />
            </div>

            {/* Kata Pengantar */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Kata Pengantar <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="preface"
                required
                accept=".doc,.docx,.pdf"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 file:mr-4 file:rounded-full file:border-0 file:bg-green-50/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-50 hover:file:bg-green-50/20 transition-all"
              />
            </div>

            {/* Tentang Penulis */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Tentang Penulis <span className="text-red-500">*</span>
              </label>
              <textarea
                name="aboutAuthor"
                required
                rows={3}
                placeholder="Tuliskan biografi singkat tentang penulis..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Naskah Penuh */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Naskah Penuh <span className="text-red-500">*</span>
              </label>
              <p className="regular-14 text-gray-30 mb-2">
                Ketentuan: Ukuran A5, margin 2-2-2-2, font Cambria 11pt, spasi 1.15
              </p>
              <input
                type="file"
                name="fullManuscript"
                required
                accept=".doc,.docx,.pdf"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 file:mr-4 file:rounded-full file:border-0 file:bg-green-50/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-50 hover:file:bg-green-50/20 transition-all"
              />
            </div>

            {/* Cover (opsional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Cover Buku (Opsional)
              </label>
              <input
                type="file"
                name="coverImage"
                accept=".jpg,.jpeg,.png,.pdf"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 file:mr-4 file:rounded-full file:border-0 file:bg-green-50/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-50 hover:file:bg-green-50/20 transition-all"
              />
            </div>
          </div>

          {/* Kontak Penulis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Email Penulis <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">
                Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-90 focus:border-green-50 focus:ring-2 focus:ring-green-50/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-green-50 text-white py-4 font-semibold text-lg transition-all hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Kirim Naskah
                </>
              )}
            </button>
            <p className="regular-14 text-gray-30 text-center mt-3">
              Dengan mengirim, Anda menyetujui bahwa naskah ini adalah karya asli Anda.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

// ===================== MAIN PAGE =====================
export default function EJBooksSubmitClient() {
  const [selectedPackage, setSelectedPackage] = useState<PublishingPackage | null>(null);

  const handleSelectPackage = (pkg: PublishingPackage) => {
    setSelectedPackage(pkg);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-600 to-teal-700 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h1v40H0zM39 0h1v40h-1zM0 0h40v1H0zM0 39h40v1H0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
          <div className="absolute top-20 right-24 text-white/10 text-7xl hidden lg:block">✍️</div>
          <div className="absolute bottom-20 right-1/4 text-white/10 text-5xl hidden lg:block">📝</div>
        </div>

        <div className="max-container padding-container relative z-10 py-20 lg:py-28">
          <div className="max-w-3xl">
            <a
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              ← Kembali ke EJ Books
            </a>
            <h1 className="bold-40 lg:bold-64 mb-4 drop-shadow-sm">Terbitkan Buku Anda</h1>
            <p className="regular-18 lg:regular-20 text-white/85 max-w-2xl leading-relaxed">
              Ikuti alur penerbitan kami yang mudah dan transparan. Pilih paket yang sesuai,
              kirimkan naskah Anda, dan biarkan tim kami yang mengurus sisanya.
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <PublishingTimeline />
      <PricingSection onSelectPackage={handleSelectPackage} />
      <SubmissionForm
        selectedPackage={selectedPackage}
        onChangePackage={() => {
          setSelectedPackage(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  );
}
