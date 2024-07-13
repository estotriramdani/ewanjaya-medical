export const SECTIONS = {
  hero: 'hero-section',
  location: 'location-section',
  product: 'product-section',
  features: 'features-section',
  contact: 'contact-section',
};

// NAVIGATION
export const NAV_LINKS = [
  { href: `/#${SECTIONS.hero}`, key: SECTIONS.hero, label: 'Beranda' },
  { href: `/#${SECTIONS.product}`, key: SECTIONS.product, label: 'Produk ' },
  { href: `/#${SECTIONS.location}`, key: SECTIONS.location, label: 'Lokasi' },
  { href: `/#${SECTIONS.features}`, key: SECTIONS.features, label: 'Keunggulan' },
  { href: `/#${SECTIONS.contact}`, key: SECTIONS.contact, label: 'Kontak' },
];

// CAMP SECTION
export const PEOPLE_URL = ['/person-1.png', '/person-2.png', '/person-3.png', '/person-4.png'];

// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Pengerjaan',
    icon: '/features/production.png',
    variant: 'green',
    description: 'Pengerjaan cepat dengan bahan baku dan mesin produk mandiri',
  },
  {
    title: 'Stok Produk',
    icon: '/features/cart.png',
    variant: 'green',
    description:
      'Kami tidak membuat stok, produk dikirim adalah produk fresh yang diproduksi ketika ada permintaan.',
  },
  {
    title: 'Harga',
    icon: '/features/price.png',
    variant: 'green',
    description:
      'Harga kompetitif tanpa mengurangi kualitas produk dan dapat dinegoisasikan kembali.',
  },
  {
    title: 'Afer Sales',
    icon: '/features/after-sales.png',
    variant: 'orange',
    description: 'Konsultasi setelah penjualan dan koordinasi tentang kritik dan saran produk.',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Navigasi',
    links: NAV_LINKS,
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Kontak',
  links: [
    { label: 'Admin Officer', value: '0857-0332-9747' },
    { label: 'Email Officer', value: 'ewanjayakastara@gmail.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: ['/facebook.svg', '/instagram.svg', '/twitter.svg', '/youtube.svg', '/wordpress.svg'],
};

export const TENDER_COUNT = 20;

export const WHATSAPP_CONTACT = '6285703329747';
