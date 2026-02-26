// ============================================
// EJ Books Constants (Static only)
// Dynamic data is fetched from API via lib/ejbooks-api.ts
// ============================================

export const EJ_BOOKS_SECTIONS = {
  hero: 'ejbooks-hero',
  about: 'ejbooks-about',
  books: 'ejbooks-books',
  cta: 'ejbooks-cta',
  contact: 'ejbooks-contact',
  faq: 'ejbooks-faq',
  testimonials: 'ejbooks-testimonials',
  announcements: 'ejbooks-announcements',
};

// NAV LINKS (EJ Books)
export const EJ_BOOKS_NAV_LINKS = [
  { href: `/#${EJ_BOOKS_SECTIONS.hero}`, key: 'beranda', label: 'Beranda' },
  { href: `/#${EJ_BOOKS_SECTIONS.books}`, key: 'buku', label: 'Buku' },
  { href: '/submit', key: 'terbitkan', label: 'Terbitkan Buku' },
  { href: `/#${EJ_BOOKS_SECTIONS.faq}`, key: 'faq', label: 'FAQ' },
  { href: `/#${EJ_BOOKS_SECTIONS.contact}`, key: 'kontak', label: 'Kontak' },
  { href: '/social-links', key: 'social', label: 'Social Links' },
];

// ABOUT / INFO
export const EJ_BOOKS_INFO = {
  name: 'EJ Books',
  tagline: 'Terbit buku gratis, self publishing',
  tagline2: 'Menerbitkan buku renyah dan ringan, juga berisi',
  description:
    'EJ Books adalah unit usaha dari PT Ewan Jaya Kastara yang berfokus pada penerbitan buku secara gratis melalui skema self publishing. Kami membantu para penulis mewujudkan karya mereka menjadi buku yang berkualitas dan siap dipasarkan.',
  visi: 'Menjadi penerbit independen terpercaya yang memberdayakan penulis Indonesia untuk menyebarkan ilmu dan inspirasi ke seluruh nusantara.',
  misi: [
    'Menyediakan layanan penerbitan buku yang mudah, cepat, dan terjangkau.',
    'Mendampingi penulis dari proses naskah hingga buku siap cetak.',
    'Memperluas distribusi buku melalui kanal digital dan offline.',
    'Membangun komunitas penulis dan pembaca yang aktif dan kolaboratif.',
  ],
  sejarah:
    'EJ Books didirikan sebagai divisi penerbitan dari PT Ewan Jaya Kastara pada tahun 2024. Berawal dari keinginan untuk memberdayakan penulis-penulis muda Indonesia yang kesulitan menerbitkan karyanya, EJ Books hadir dengan konsep self publishing yang ramah dan profesional. Kini, EJ Books telah membantu puluhan penulis menerbitkan buku pertama mereka.',
};

// PUBLISHING FLOW (static — no API)
export interface PublishingStep {
  step: number;
  title: string;
  description: string;
  estimatedDuration: string;
  icon: string;
}

export const EJ_BOOKS_PUBLISHING_FLOW: PublishingStep[] = [
  {
    step: 1,
    title: 'Pengiriman Naskah',
    description:
      'Penulis mengirimkan naskah melalui formulir online beserta dokumen pendukung (sinopsis, daftar isi, kata pengantar, tentang penulis).',
    estimatedDuration: '1 hari',
    icon: '📝',
  },
  {
    step: 2,
    title: 'Review & Kurasi',
    description:
      'Tim editor kami akan melakukan review awal terhadap naskah untuk memastikan kualitas dan kelayakan penerbitan.',
    estimatedDuration: '3-5 hari',
    icon: '🔍',
  },
  {
    step: 3,
    title: 'Editing & Proofreading',
    description:
      'Naskah akan melalui proses editing dan proofreading untuk memperbaiki tata bahasa, ejaan, dan konsistensi penulisan.',
    estimatedDuration: '1-2 minggu',
    icon: '✏️',
  },
  {
    step: 4,
    title: 'Desain & Layout',
    description:
      'Tim desain akan membuat cover buku dan menyusun layout halaman sesuai standar penerbitan profesional.',
    estimatedDuration: '1-2 minggu',
    icon: '🎨',
  },
  {
    step: 5,
    title: 'Review Final',
    description:
      'Penulis akan menerima proof digital untuk ditinjau. Revisi minor dapat dilakukan pada tahap ini.',
    estimatedDuration: '3-5 hari',
    icon: '✅',
  },
  {
    step: 6,
    title: 'Cetak & Distribusi',
    description:
      'Setelah disetujui, buku akan dicetak dan didistribusikan melalui kanal online dan offline.',
    estimatedDuration: '1-2 minggu',
    icon: '📚',
  },
];
