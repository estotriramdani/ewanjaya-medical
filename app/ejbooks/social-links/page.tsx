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
      <div className="max-w-md mx-auto">
        {/* Profile */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Image src="/img/ej-logo.png" alt="EJ Books" width={44} height={44} />
          </div>
          <h1 className="bold-24 text-white mb-1">{EJ_BOOKS_INFO.name}</h1>
          <p className="regular-14 text-white/80">{EJ_BOOKS_INFO.tagline}</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {EJ_BOOKS_SOCIAL_LINKS.map((link) => {
            const isExternal = link.url.startsWith('http') || link.url.startsWith('mailto:');

            return (
              <a
                key={link.id}
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white hover:bg-white hover:text-gray-90 transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 group-hover:bg-green-50/10 transition-colors">
                  {link.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{link.platform}</p>
                  <p className="text-xs opacity-80 truncate">{link.label}</p>
                  {link.description && (
                    <p className="text-xs opacity-60 mt-0.5 line-clamp-1">{link.description}</p>
                  )}
                </div>
                <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <a
            href="/ejbooks"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <Image src="/img/ej-logo.png" alt="EJ Books" width={16} height={16} />
            Kunjungi Website EJ Books
          </a>
          <p className="text-xs text-white/40 mt-4">
            © {new Date().getFullYear()} EJ Books — PT Ewan Jaya Kastara
          </p>
        </div>
      </div>
    </section>
  );
}
