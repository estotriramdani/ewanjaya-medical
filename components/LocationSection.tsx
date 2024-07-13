import { sections } from '@/constants';
import Image from 'next/image';

const LocationSection = () => {
  return (
    <section
      id={sections.location}
      className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20"
    >
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <div className="w-full bg-green-50 h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15838.964732392038!2d107.6028382!3d-7.0396736!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68eb2aa9d9be5b%3A0x2e0a2971099dd235!2sAlkes%20Ewan%20Jaya%20Kastara!5e0!3m2!1sen!2sid!4v1707491021159!5m2!1sen!2sid"
            className="aspect-video w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-green-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-14 xl:py-14 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            Memerlukan pertemuan langsung untuk <strong>dikusi lebih lanjut?</strong>
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
            Mari datang ke <i>workshop</i> kami. Kami akan memberikan solusi lebih lanjut untuk
            perusahaan Anda, termasuk menerima <i>custom order</i>.
          </p>
          <p className="regular-14 xl:regular-16 mt-2 text-white">
            Lokasi kami:
            <br />
            <strong>PT Ewan Jaya Kastara</strong>
            <br />
            Jl. Cihonje-Batukarut, Lebakwangi, Kec. Arjasari, Kabupaten Bandung, Jawa Barat 40379
          </p>
          <Image src="/quote.svg" alt="camp-2" width={186} height={219} className="camp-quote" />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
