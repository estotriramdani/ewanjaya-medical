import { EJ_BOOKS_CONTACT, EJ_BOOKS_NAV_LINKS, EJ_BOOKS_SOCIAL_LINKS } from '@/constants/ejbooks';
import EJBooksLogo from './EJBooksLogo';

const EJBooksFooter = () => {
  return (
    <footer className="bg-gray-90 text-white">
      <div className="max-container padding-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/ejbooks" className="flex items-center gap-2">
              <EJBooksLogo size="md" className="[&_span]:text-white" />
            </a>
            <p className="regular-14 text-gray-20">
              Unit usaha penerbitan buku dari PT Ewan Jaya Kastara. Membantu
              penulis Indonesia mewujudkan karya terbaik mereka.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="bold-18 mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {EJ_BOOKS_NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="regular-14 text-gray-20 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="bold-18 mb-4">Kontak</h4>
            <ul className="space-y-2 regular-14 text-gray-20">
              <li>
                <span className="text-gray-30">Email:</span>
                <br />
                <a href={`mailto:${EJ_BOOKS_CONTACT.email}`} className="hover:text-white transition-colors">
                  {EJ_BOOKS_CONTACT.email}
                </a>
              </li>
              <li>
                <span className="text-gray-30">Telepon:</span>
                <br />
                <a href={`tel:${EJ_BOOKS_CONTACT.phone}`} className="hover:text-white transition-colors">
                  {EJ_BOOKS_CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-gray-30">Jam Operasional:</span>
                <br />
                {EJ_BOOKS_CONTACT.operationalHours}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="bold-18 mb-4">Ikuti Kami</h4>
            <div className="flex flex-wrap gap-3">
              {EJ_BOOKS_SOCIAL_LINKS.filter(
                (link) => !['website', 'submit', 'email'].includes(link.id)
              ).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition-colors"
                >
                  <span>{link.icon}</span>
                  <span>{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="regular-14 text-gray-30">
            {new Date().getFullYear()} EJ Books — PT Ewan Jaya Kastara. All rights reserved.
          </p>
          <a
            href="/"
            className="regular-14 text-gray-30 hover:text-white transition-colors"
          >
            ← Kembali ke EJ Medical
          </a>
        </div>
      </div>
    </footer>
  );
};

export default EJBooksFooter;
