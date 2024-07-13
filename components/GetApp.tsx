import React from 'react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { WHATSAPP_CONTACT } from '@/constants';

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">Kontak</h2>
          <p className="regular-16 text-gray-10">
            Segera kontak kami untuk mendapatkan pelayanan terbaik!
          </p>
          <div className="flex w-full flex-col gap-3 whitespace-nowrap xl:flex-row">
            <a
              target="_blank"
              href="mailto:ewanjayakastara@gmail.com"
              className={buttonVariants({
                variant: 'green',
                size: 'lg',
                className: 'w-full xl:w-auto flex items-center gap-2',
              })}
            >
              <Mail className="w-6 h-6" /> <span className="text-lg">Email</span>
            </a>
            <a
              target="_blank"
              href={`https://wa.me/${WHATSAPP_CONTACT}`}
              className={buttonVariants({
                variant: 'white',
                size: 'lg',
                className: 'w-full xl:w-auto flex items-center gap-2',
              })}
            >
              <Phone className="w-6 h-6" /> <span className="text-lg">WhatsApp/Telepon</span>
            </a>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end">
          {/* <Image src="/phones.png" alt="phones" width={550} height={870} /> */}
        </div>
      </div>
    </section>
  );
};

export default GetApp;
