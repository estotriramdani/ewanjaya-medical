import Image from 'next/image';
import VideoProfilePopup from './VideoProfilePopup';
import { SECTIONS, TENDER_COUNT, WHATSAPP_CONTACT } from '@/constants';
import { buttonVariants } from './ui/button';

const Hero = () => {
  return (
    <section
      id={SECTIONS.hero}
      className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row"
    >
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <h1 className="bold-52 lg:bold-88">PT Ewan Jaya Kastara</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Produsen alat kesehatan yang berdiri pada 12 Januari 2000, dengan paten merk EJ-Medical,
          berlokasi di Kabupaten Bandung.
        </p>
        <p className="regular-16 mt-2 text-gray-30 xl:max-w-[520px]">
          Ewan Jaya Kastara adalah UKM berbentuk bandan usaha dengan legalitas produk seperti izin
          edar, TKDN dsb. Seluruh perangkat produksi merupakan hasil pengembangan mandiri.
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image src="/star.svg" key={index} alt="star" width={24} height={24} />
              ))}
          </div>

          <div>
            <p className="regular-16 lg:regular-20 ml-1 ">
              <span className="bold-16 lg:bold-20 text-blue-70">{TENDER_COUNT}</span>
              <span className=""> Tender berskala nasional telah selesai dengan baik.</span>
            </p>
            <p className="regular-16 lg:regular-20 ml-1 ">
              <span className="bold-16 lg:bold-20 text-blue-70">100.000+</span> produk telah
              dipasarkan ke berbagai rumah sakit dan fasilitas kesehatan lainnya.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          {/* <Button type="button" title="Download App" variant="btn_green" onClick={() => {}} /> */}
          <a
            className={buttonVariants({ variant: 'green', className: 'flex items-center' })}
            target="_blank"
            href={`https://wa.me/${WHATSAPP_CONTACT}`}
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
          <VideoProfilePopup />
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-white px-7 py-8 shadow-xl">
          <div className="flex flex-col">
            <div className="flexBetween mb-3">
              <p className="font-medium text-base text-green-50">Memiliki izin resmi dari</p>
              {/* <Image src="/close.svg" alt="close" width={24} height={24} /> */}
            </div>
            <div className="space-y-3">
              <div className="relative w-full h-20 p-2 rounded-xl ">
                <Image
                  alt="Kemenkes"
                  src="/img/kemenkes-logo.png"
                  width={200}
                  height={50}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="relative w-full h-20 p-2 rounded-xl">
                <Image
                  alt="Kemenperin"
                  src="/img/kemenperin-logo.png"
                  width={200}
                  height={50}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="bold-20 text-white">173.28 mi</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Elevation</p>
              <p className="bold-20 text-white">2.040 km</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
