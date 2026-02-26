'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useMedical } from '@/lib/MedicalProvider';

const History = () => {
  const { history } = useMedical();

  return (
    <section className="max-container padding-container py-16 lg:py-24">
      <div className="mb-4">
        <h2 className="bold-40 lg:bold-64">Sejarah Perusahaan</h2>
        <div className="mt-2 h-1.5 w-24 rounded-full bg-green-50" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {history.map((item) => (
          <div
            key={item.year}
            className={cn(
              'flex flex-col items-center rounded-2xl p-8 text-center text-white',
              item.bgColor
            )}
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <img src={item.icon} alt={item.year} className="h-8 w-8 brightness-0 invert" />
            </div>
            <h3 className="bold-32 lg:bold-40 mb-3">{item.year}</h3>
            <p className="regular-14 lg:regular-16 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
