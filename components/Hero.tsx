'use client';

import Image from 'next/image';
import VideoProfilePopup from './VideoProfilePopup';
import { SECTIONS } from '@/constants';
import { buttonVariants } from './ui/button';
import { useMedical } from '@/lib/MedicalProvider';

const Hero = () => {
  const { settings } = useMedical();
  const tenderCount = settings.tender_count || '20';
  const whatsappContact = settings.whatsapp_contact || '6285703329747';

  return (
    <section
      id={SECTIONS.hero}
      className="max-container padding-container relative py-16 lg:py-24"
    >
      <div className="hero-map" />

      <div className="relative z-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Text content */}
        <div className="flex flex-col items-start text-center lg:text-left">
          <h1 className="bold-40 lg:bold-64 w-full lg:max-w-[620px]">
            PT Ewan Jaya Kastara
          </h1>
          <p className="regular-16 mt-5 w-full text-gray-30 lg:max-w-[520px]">
            Produsen alat kesehatan yang berdiri pada 12 Januari 2000, dengan paten merk
            EJ-Medical, berlokasi di Kabupaten Bandung.
          </p>
          <p className="regular-16 mt-3 w-full text-gray-30 lg:max-w-[520px]">
            Ewan Jaya Kastara adalah UKM berbentuk badan usaha dengan legalitas produk seperti
            izin edar, TKDN, dan sertifikasi lainnya. Seluruh perangkat produksi merupakan hasil
            pengembangan mandiri.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:items-start sm:justify-center lg:justify-start">
            <div className="flex shrink-0 items-center gap-2">
              {Array(5)
                .fill(1)
                .map((_, index) => (
                  <Image src="/star.svg" key={index} alt="star" width={24} height={24} />
                ))}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <p className="regular-16 lg:regular-18">
                <span className="bold-16 lg:bold-18 text-blue-70">{tenderCount}</span> Tender
                berskala nasional telah selesai dengan baik.
              </p>
              <p className="regular-16 lg:regular-18">
                <span className="bold-16 lg:bold-18 text-blue-70">100.000+</span> produk telah
                dipasarkan ke fasilitas kesehatan.
              </p>
            </div>
          </div>

          <a
            className={buttonVariants({
              variant: 'green',
              className: 'mt-8 flex items-center self-center lg:self-start',
            })}
            target="_blank"
            href={`https://wa.me/${whatsappContact}`}
          >
            <Image
              src="/whatsapp.png"
              alt="whatsapp icon"
              width={22}
              height={22}
              className="mr-2"
            />
            Kontak kami
          </a>
        </div>

        {/* Right: Video + licenses */}
        <div className="flex flex-col items-center gap-6 lg:items-end">
          <VideoProfilePopup className="aspect-video w-full max-w-[560px]" />

          <div className="flex w-full max-w-[560px] flex-col gap-4 rounded-3xl bg-white px-6 py-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-sm font-medium text-green-50 sm:text-left">
              Memiliki izin resmi dari
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative h-12 w-24">
                <Image
                  alt="Kemenkes"
                  src="/img/kemenkes-logo.png"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-12 w-24">
                <Image
                  alt="Kemenperin"
                  src="/img/kemenperin-logo.png"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
