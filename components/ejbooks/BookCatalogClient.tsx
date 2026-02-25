'use client';

import React, { useMemo, useState } from 'react';
import { EJ_BOOKS_LIST, type EJBook } from '@/constants/ejbooks';
import { Search } from 'lucide-react';

export default function BookCatalogClient() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    EJ_BOOKS_LIST.forEach((b) => b.categories?.forEach((c) => set.add(c)));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EJ_BOOKS_LIST.filter((b) => {
      if (category !== 'Semua' && !(b.categories || []).includes(category)) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.authorPenName && b.authorPenName.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-3 w-full sm:w-2/3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul atau penulis..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-90 focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <label className="text-sm text-gray-50 mr-2">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2 bg-white text-gray-90"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="regular-16 text-gray-50">Tidak ada buku yang sesuai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((book: EJBook) => (
            <a
              key={book.id}
              href={`/ejbooks/books/${book.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-green-50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {book.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="bold-18 text-gray-90 mb-1 group-hover:text-green-50 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-30 mb-3">oleh {book.authorPenName || book.author}</p>
                <p className="regular-14 text-gray-50 line-clamp-2 mb-4">{book.shortDescription}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-30">{book.pages} halaman</span>
                  <span className="text-green-50 font-medium group-hover:underline">Lihat Detail →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
