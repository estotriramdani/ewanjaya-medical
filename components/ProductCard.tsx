import React from 'react';
import { Product } from '@/constants/products';
import { buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const ProductCard = ({ product, index }: { product: Product; index?: number }) => {
  return (
    <div
      className={cn(
        'p-6 rounded-xl',
        (index || 0) % 2 === 0 ? 'bg-teal-50' : 'bg-sky-50'
      )}
    >
      <div className="w-full aspect-square flexCenter">
        <img src={product.photos[0]} alt={product.name} className="w-full aspect-square" />
      </div>
      <div className="flex justify-center items-center flex-col text-center space-y-4">
        <p className="text-2xl lg:text-2xl">{product.name}</p>
        <p className="mb-5">{product.shortDescription}</p>
        <div></div>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: 'green',
              size: 'sm',
            })}
          >
            Detail
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">{product.name}</DialogTitle>
              <DialogDescription>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description.replace(/\n/g, '<br />'),
                  }}
                ></div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductCard;
