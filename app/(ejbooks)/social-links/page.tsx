import { Metadata } from 'next';
import { EJ_BOOKS_SOCIAL_LINKS, EJ_BOOKS_INFO } from '@/constants/ejbooks';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Social Links | EJ Books',
  description:
    'Temukan semua tautan dan platform EJ Books di satu tempat. Ikuti kami di media sosial.',
};

export default function EJBooksSocialLinksPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-700 py-12 px-4">
      <div className="max-container padding-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: profile */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg">
              <Image src="/img/ej-logo.png" alt="EJ Books" width={64} height={64} />
            </div>
            <h1 className="bold-24 text-white mb-2">{EJ_BOOKS_INFO.name}</h1>
            <p className="regular-14 text-white/90 mb-4 italic">{EJ_BOOKS_INFO.tagline2 || EJ_BOOKS_INFO.tagline}</p>
            <p className="regular-14 text-white/80 max-w-sm">
              Ikuti kami di platform pilihan untuk mendapatkan info terbaru, workshop, dan tips
              menulis dari EJ Books.
            </p>
            <div className="mt-6">
              <a
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full bg-white text-green-50 px-4 py-2 font-semibold shadow hover:scale-105 transition-all"
              >
                ✍️ Kirim Naskah
              </a>
            </div>
          </div>

          {/* Links grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EJ_BOOKS_SOCIAL_LINKS.map((link) => {
                const isExternal = link.url.startsWith('http') || link.url.startsWith('mailto:');
                return (
                  <div key={link.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-start gap-4 text-white">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center text-2xl">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{link.platform}</p>
                          <p className="text-xs opacity-80">{link.label}</p>
                        </div>
                        <div>
                          <a
                            href={link.url}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-2 rounded-full bg-white text-green-50 px-3 py-1 text-sm font-semibold hover:opacity-90"
                          >
                            Buka
                          </a>
                        </div>
                      </div>
                      {link.description && <p className="text-sm opacity-70 mt-2">{link.description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-10 text-white/60">
          © {new Date().getFullYear()} EJ Books — PT Ewan Jaya Kastara
        </div>
      </div>
    </section>
  );
}
