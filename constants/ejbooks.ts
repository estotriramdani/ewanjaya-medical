// ============================================
// EJ Books Constants
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
  { href: `/ejbooks#${EJ_BOOKS_SECTIONS.hero}`, key: 'beranda', label: 'Beranda' },
  { href: `/ejbooks#${EJ_BOOKS_SECTIONS.books}`, key: 'buku', label: 'Buku' },
  { href: '/ejbooks/submit', key: 'terbitkan', label: 'Terbitkan Buku' },
  { href: `/ejbooks#${EJ_BOOKS_SECTIONS.faq}`, key: 'faq', label: 'FAQ' },
  { href: `/ejbooks#${EJ_BOOKS_SECTIONS.contact}`, key: 'kontak', label: 'Kontak' },
  { href: '/ejbooks/social-links', key: 'social', label: 'Social Links' },
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

// BOOK INTERFACE & LIST
export interface EJBook {
  id: string;
  title: string;
  author: string;
  authorPenName?: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  images: string[];
  category: string;
  categories: string[];
  qrcbn?: string;
  pages: number;
  isbn?: string;
  publishedDate: string;
  price: string;
  buyLink?: string;
  downloadLink?: string;
  isBestSeller?: boolean;
}

export const EJ_BOOKS_LIST: EJBook[] = [
  {
    id: 'buku-001',
    title: 'Langkah Pertama Menulis',
    author: 'Ahmad Fauzi',
    authorPenName: 'A. Fauzi',
    description:
      'Buku panduan lengkap bagi pemula yang ingin memulai perjalanan menulis. Dari menemukan ide hingga menyusun naskah pertama, buku ini akan menjadi teman setia Anda. Dilengkapi dengan latihan-latihan praktis dan tips dari penulis berpengalaman.',
    shortDescription: 'Panduan lengkap menulis untuk pemula.',
    coverImage: '/sample-book-covers/1.jpg',
    images: [
      '/sample-book-covers/1.jpg',
      '/sample-book-covers/2.jpg',
      '/sample-book-covers/3.jpg',
    ],
    category: 'Panduan',
    categories: ['Panduan', 'Menulis', 'Edukasi'],
    qrcbn: 'QRCBN-2024-001',
    pages: 180,
    isbn: '978-602-0001-01-0',
    publishedDate: '2024-06-15',
    price: 'Gratis',
    downloadLink: '#',
    isBestSeller: true,
  },
  {
    id: 'buku-002',
    title: 'Cerita dari Ujung Negeri',
    author: 'Siti Nurhaliza',
    authorPenName: 'S. Nur',
    description:
      'Kumpulan cerpen yang mengangkat kisah-kisah masyarakat di pelosok Indonesia. Dari Sabang sampai Merauke, setiap cerita menghadirkan kehangatan dan keunikan budaya lokal yang jarang tersentuh media mainstream.',
    shortDescription: 'Kumpulan cerpen dari pelosok Indonesia.',
    coverImage: '/sample-book-covers/2.jpg',
    images: [
      '/sample-book-covers/2.jpg',
      '/sample-book-covers/2.jpg',
      '/sample-book-covers/2.jpg',
    ],
    category: 'Fiksi',
    categories: ['Fiksi', 'Cerpen', 'Budaya'],
    qrcbn: 'QRCBN-2024-002',
    pages: 220,
    isbn: '978-602-0001-02-7',
    publishedDate: '2024-09-01',
    price: 'Gratis',
    downloadLink: '#',
    isBestSeller: true,
  },
  {
    id: 'buku-003',
    title: 'Bisnis Digital untuk Generasi Z',
    author: 'Rendi Pratama',
    description:
      'Buku ini membahas strategi membangun bisnis digital yang relevan dengan era Gen Z. Mulai dari branding, social media marketing, hingga monetisasi konten. Cocok untuk anak muda yang ingin mulai berwirausaha di dunia digital.',
    shortDescription: 'Strategi bisnis digital untuk anak muda.',
    coverImage: '/sample-book-covers/3.jpg',
    images: [
      '/sample-book-covers/3.jpg',
      '/sample-book-covers/3.jpg',
      '/sample-book-covers/3.jpg',
    ],
    category: 'Bisnis',
    categories: ['Bisnis', 'Digital', 'Marketing'],
    qrcbn: 'QRCBN-2025-003',
    pages: 150,
    isbn: '978-602-0001-03-4',
    publishedDate: '2025-01-20',
    price: 'Rp 50.000',
    buyLink: '#',
    isBestSeller: false,
  },
  {
    id: 'buku-004',
    title: 'Puisi Hujan di Bulan Juni',
    author: 'Dewi Anggraeni',
    authorPenName: 'Dewi A.',
    description:
      'Antologi puisi yang menggambarkan perasaan cinta, rindu, dan harapan. Setiap bait kata mengalir seperti hujan di bulan Juni, menyentuh hati dan menghidupkan imajinasi pembaca.',
    shortDescription: 'Antologi puisi tentang cinta dan harapan.',
    coverImage: '/sample-book-covers/4.jpg',
    images: [
      '/sample-book-covers/4.jpg',
      '/sample-book-covers/4.jpg',
      '/sample-book-covers/4.jpg',
    ],
    category: 'Puisi',
    categories: ['Puisi', 'Sastra', 'Romansa'],
    qrcbn: 'QRCBN-2025-004',
    pages: 120,
    publishedDate: '2025-03-10',
    price: 'Gratis',
    downloadLink: '#',
    isBestSeller: false,
  },
  {
    id: 'buku-005',
    title: 'Judul Buku 5',
    author: 'Nama Penulis 5',
    authorPenName: 'PenName 5',
    description: 'Deskripsi buku 5.',
    shortDescription: 'Deskripsi singkat buku 5.',
    coverImage: '/sample-book-covers/5.jpg',
    images: [
      '/sample-book-covers/5.jpg',
      '/sample-book-covers/5.jpg',
      '/sample-book-covers/5.jpg',
    ],
    category: 'Kategori 5',
    categories: ['Kategori 5'],
    qrcbn: 'QRCBN-2025-005',
    pages: 100,
    publishedDate: '2025-06-01',
    price: 'Gratis',
    downloadLink: '#',
    isBestSeller: false,
  }
];

// CONTACT INFO
export const EJ_BOOKS_CONTACT = {
  email: 'ejbooks@ewanjayakastara.com',
  phone: '0857-0332-9747',
  whatsapp: '6285703329747',
  address: 'Desa Lebakwangi, Arjasari, Kabupaten Bandung, Jawa Barat',
  operationalHours: 'Senin - Jumat, 08.00 - 17.00 WIB',
};

// FAQ
export const EJ_BOOKS_FAQ = [
  {
    question: 'Apa itu EJ Books?',
    answer:
      'EJ Books adalah unit usaha penerbitan buku dari PT Ewan Jaya Kastara yang berfokus pada penerbitan buku secara self publishing. Kami membantu penulis menerbitkan buku mereka dengan proses yang mudah dan profesional.',
  },
  {
    question: 'Apakah benar-benar gratis?',
    answer:
      'Ya, kami menyediakan paket penerbitan gratis dengan fitur dasar. Namun, untuk fitur tambahan seperti desain cover premium, editing profesional, dan distribusi luas, tersedia paket berbayar yang bisa disesuaikan kebutuhan.',
  },
  {
    question: 'Berapa lama proses penerbitan?',
    answer:
      'Proses penerbitan biasanya memakan waktu 4-8 minggu tergantung kompleksitas naskah dan paket yang dipilih. Paket premium memiliki prioritas pengerjaan yang lebih cepat.',
  },
  {
    question: 'Format naskah apa yang diterima?',
    answer:
      'Kami menerima naskah dalam format dokumen (DOC/DOCX) dengan ketentuan ukuran A5, margin 2-2-2-2, font Cambria 11pt, dan spasi 1.15. File harus dilengkapi dengan rangkuman, daftar isi, kata pengantar, dan tentang penulis.',
  },
  {
    question: 'Apakah saya tetap memegang hak cipta buku?',
    answer:
      'Ya, hak cipta sepenuhnya milik penulis. EJ Books hanya bertindak sebagai penerbit dan fasilitator distribusi. Penulis memiliki kendali penuh atas karya mereka.',
  },
  {
    question: 'Bagaimana cara mendapatkan buku yang diterbitkan EJ Books?',
    answer:
      'Buku-buku EJ Books tersedia dalam format digital (e-book) yang bisa diunduh gratis melalui website kami. Untuk versi cetak, buku bisa dipesan melalui marketplace atau menghubungi kami langsung.',
  },
  {
    question: 'Apakah ada batasan genre atau topik buku?',
    answer:
      'Kami menerima berbagai genre dan topik selama konten tidak melanggar hukum, norma, dan etika yang berlaku. Naskah akan melalui proses kurasi sebelum diterbitkan.',
  },
];

// TESTIMONIALS
export const EJ_BOOKS_TESTIMONIALS = [
  {
    name: 'Ahmad Fauzi',
    role: 'Penulis "Langkah Pertama Menulis"',
    content:
      'Proses penerbitan di EJ Books sangat mudah dan profesional. Tim mereka sangat membantu dari awal hingga akhir. Buku pertama saya akhirnya bisa terbit dengan kualitas yang memuaskan!',
    avatar: '/img/ejbooks/avatar-placeholder.jpg',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Penulis "Cerita dari Ujung Negeri"',
    content:
      'Saya sangat berterima kasih kepada EJ Books. Sebagai penulis pemula, saya tidak tahu harus mulai dari mana. EJ Books memberikan pendampingan yang luar biasa dan membantu saya mewujudkan mimpi menerbitkan buku.',
    avatar: '/img/ejbooks/avatar-placeholder.jpg',
  },
  {
    name: 'Rendi Pratama',
    role: 'Penulis "Bisnis Digital untuk Generasi Z"',
    content:
      'Kualitas cetak dan desain cover yang dihasilkan EJ Books sangat bagus. Harganya juga sangat terjangkau. Sangat direkomendasikan untuk penulis-penulis muda!',
    avatar: '/img/ejbooks/avatar-placeholder.jpg',
  },
  {
    name: 'Dewi Anggraeni',
    role: 'Penulis "Puisi Hujan di Bulan Juni"',
    content:
      'EJ Books benar-benar memahami kebutuhan penulis. Prosesnya transparan, komunikasinya lancar, dan hasilnya memuaskan. Saya pasti akan menerbitkan buku berikutnya di sini!',
    avatar: '/img/ejbooks/avatar-placeholder.jpg',
  },
];

// ANNOUNCEMENTS
export const EJ_BOOKS_ANNOUNCEMENTS = [
  {
    id: 'ann-001',
    title: 'Pendaftaran Penulis Batch 3 Dibuka!',
    content:
      'Kami membuka pendaftaran penulis batch 3 untuk periode April - Juni 2026. Daftarkan naskah Anda sekarang dan dapatkan diskon 20% untuk paket Premium!',
    date: '2026-02-20',
    isActive: true,
  },
  {
    id: 'ann-002',
    title: 'Workshop Menulis Gratis',
    content:
      'EJ Books mengadakan workshop menulis gratis secara online pada 15 Maret 2026. Terbuka untuk umum. Daftar sekarang melalui link di bio Instagram kami!',
    date: '2026-02-15',
    isActive: true,
  },
];

// PUBLISHING FLOW
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

// PUBLISHING PACKAGES
export interface PublishingPackage {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export const EJ_BOOKS_PUBLISHING_PACKAGES: PublishingPackage[] = [
  {
    id: 'paket-gratis',
    name: 'Paket Gratis',
    price: 'Rp 0',
    priceNumeric: 0,
    description:
      'Paket dasar untuk penulis yang ingin menerbitkan buku pertama mereka tanpa biaya.',
    features: [
      'Penerbitan e-book (PDF)',
      'Review naskah dasar',
      'ISBN gratis',
      'Distribusi digital melalui website EJ Books',
      'Sertifikat penerbitan',
    ],
    color: 'bg-gray-50',
  },
  {
    id: 'paket-standard',
    name: 'Paket Standard',
    price: 'Rp 500.000',
    priceNumeric: 500000,
    description:
      'Paket menengah dengan fitur editing profesional dan desain cover yang menarik.',
    features: [
      'Semua fitur Paket Gratis',
      'Editing & proofreading profesional',
      'Desain cover custom',
      'Layout halaman profesional',
      'Cetak 10 eksemplar',
      'Distribusi melalui marketplace',
    ],
    isPopular: true,
    color: 'bg-green-50',
  },
  {
    id: 'paket-premium',
    name: 'Paket Premium',
    price: 'Rp 1.500.000',
    priceNumeric: 1500000,
    description:
      'Paket lengkap dengan semua fitur premium termasuk promosi dan distribusi luas.',
    features: [
      'Semua fitur Paket Standard',
      'Editing mendalam & substantif',
      'Desain cover premium (3 alternatif)',
      'Ilustrasi buku (hingga 10 halaman)',
      'Cetak 50 eksemplar',
      'Distribusi nasional (toko buku & marketplace)',
      'Promosi di media sosial EJ Books',
      'Prioritas pengerjaan',
      'Konsultasi penulis 1-on-1',
    ],
    color: 'bg-blue-70',
  },
];

// SOCIAL LINKS
export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  description?: string;
}

export const EJ_BOOKS_SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    label: '@ejbooks.id',
    url: 'https://instagram.com/ejbooks.id',
    icon: '📸',
    description: 'Ikuti kami untuk update terbaru dan tips menulis.',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    label: '@ejbooks.id',
    url: 'https://tiktok.com/@ejbooks.id',
    icon: '🎵',
    description: 'Konten menarik seputar dunia penerbitan.',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    label: 'EJ Books Channel',
    url: 'https://youtube.com/@ejbooks',
    icon: '🎬',
    description: 'Workshop, tutorial, dan wawancara penulis.',
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp',
    label: 'Chat Admin',
    url: 'https://wa.me/6285703329747',
    icon: '💬',
    description: 'Hubungi admin untuk konsultasi penerbitan.',
  },
  {
    id: 'email',
    platform: 'Email',
    label: 'ejbooks@ewanjayakastara.com',
    url: 'mailto:ejbooks@ewanjayakastara.com',
    icon: '📧',
    description: 'Kirim email untuk pertanyaan dan kerjasama.',
  },
  {
    id: 'website',
    platform: 'Website',
    label: 'ewanjayakastara.com',
    url: 'https://ewanjayakastara.com',
    icon: '🌐',
    description: 'Kunjungi website utama PT Ewan Jaya Kastara.',
  },
  {
    id: 'shopee',
    platform: 'Shopee',
    label: 'EJ Books Store',
    url: 'https://shopee.co.id/ejbooks',
    icon: '🛒',
    description: 'Beli buku cetak di Shopee.',
  },
  {
    id: 'submit',
    platform: 'Terbitkan Buku',
    label: 'Kirim Naskah Anda',
    url: '/ejbooks/submit',
    icon: '✍️',
    description: 'Mulai perjalanan penerbitan buku Anda sekarang.',
  },
];
