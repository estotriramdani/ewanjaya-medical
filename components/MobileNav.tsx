'use client';

import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when nav is open
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

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close]);

  return (
    <>
      {/* Hamburger / Close button */}
      <button
        className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-10 lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className="flex h-5 w-6 flex-col justify-between">
          <span
            className={cn(
              'h-0.5 w-full rounded-full bg-gray-90 transition-all duration-300 origin-left',
              isOpen && 'rotate-45 translate-x-[3px] -translate-y-[1px]'
            )}
          />
          <span
            className={cn(
              'h-0.5 w-full rounded-full bg-gray-90 transition-all duration-300',
              isOpen && 'opacity-0 scale-x-0'
            )}
          />
          <span
            className={cn(
              'h-0.5 w-full rounded-full bg-gray-90 transition-all duration-300 origin-left',
              isOpen && '-rotate-45 translate-x-[3px] translate-y-[1px]'
            )}
          />
        </div>
      </button>

      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          'fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 border-b border-gray-10 px-6 py-5">
          <Image src="/img/ej-logo.png" alt="logo" width={32} height={32} />
          <span className="bold-16 text-gray-90">EJ-Medical</span>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  onClick={close}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 regular-16 text-gray-50 transition-all duration-200',
                    'hover:bg-green-50/10 hover:text-green-50 active:scale-[0.98]'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  replace={link.href.startsWith('#')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-10 px-6 py-4">
          <p className="regular-14 text-gray-20">
            © {new Date().getFullYear()} PT Ewan Jaya Kastara
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
