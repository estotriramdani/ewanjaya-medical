'use client';

import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const MobileNav = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const navListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toggleNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [toggleNav]);

  return (
    <>
      <button
        className="inline-block cursor-pointer lg:hidden"
        onClick={() => setToggleNav((prev) => !prev)}
      >
        <Image src="menu.svg" alt="menu" width={32} height={32} className="" />
      </button>

      {toggleNav && (
        <div className="lg:hidden fixed inset-0 shadow-lg flex flex-col">
          <div className="bg-white py-8">
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="flexCenter regular-16 py-4 hover:text-gray-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex-1 bg-gray-50/50" onClick={() => setToggleNav(false)}></div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
