'use client';

import { EJ_BOOKS_NAV_LINKS } from '@/constants/ejbooks';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import EJBooksLogo from './EJBooksLogo';

const EJBooksNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close]);

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="max-container padding-container flexBetween py-4">
        <a href="/" className="flex items-center gap-2">
          <EJBooksLogo size="md" />
        </a>

        <ul className="hidden h-full gap-8 lg:flex">
          {EJ_BOOKS_NAV_LINKS.map((link) => (
            <a
              href={link.href}
              key={link.key}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold hover:text-green-50"
            >
              {link.label}
            </a>
          ))}
        </ul>

        <div className="hidden lg:flex">
          <a
            href="/submit"
            className="inline-flex items-center justify-center rounded-full bg-green-50 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Terbitkan Buku
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-10 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-xl transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="bold-18 text-gray-90">Menu</span>
          <button onClick={close} className="p-2 rounded-lg hover:bg-gray-10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-1">
          {EJ_BOOKS_NAV_LINKS.map((link) => (
            <a
              href={link.href}
              key={link.key}
              onClick={close}
              className="regular-16 text-gray-50 px-4 py-3 rounded-lg transition-colors hover:bg-gray-10 hover:text-green-50"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t">
            <a
              href="/submit"
              onClick={close}
              className="flex items-center justify-center rounded-full bg-green-50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              Terbitkan Buku
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EJBooksNavbar;
