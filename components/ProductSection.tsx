import { SECTIONS } from '@/constants';
import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '@/constants/products';

const ProductSection = () => {
  return (
    <section id={SECTIONS.product} className="">
      <div className="padding-container max-container w-full pb-24">
        <h2 className="bold-40 lg:bold-64">Produk Kami</h2>
        <p className="regular-16 text-gray-30 mt-2">
          Berikut produk-produk terbaik yang kami miliki. Kami juga menerima pesanan khusus atau{' '}
          <i>custom order</i>.
        </p>
        <div className="mt-6 gap-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
