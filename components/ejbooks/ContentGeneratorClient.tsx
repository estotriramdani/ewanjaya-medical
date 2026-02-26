'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
import {
  Maximize, Minimize, Image as ImageIcon, MessageSquareQuote,
  Megaphone, Star, ChevronLeft, ChevronRight, Plus, Trash2,
  Save, Pencil, Type, ImagePlus, GripVertical, Download,
  Heart, Sparkles, Flame, BookOpen, Feather, Coffee,
  Sun, Moon, CloudRain, Leaf, Music, Zap, Award, Quote,
  User, Clock, Lightbulb, BarChart3,
} from 'lucide-react';
import {
  EJ_BOOKS_LIST,
  EJ_BOOKS_AUTHORS,
  EJ_BOOKS_TESTIMONIALS,
  EJ_BOOKS_ANNOUNCEMENTS,
  EJ_BOOKS_INFO,
  formatBookPrice,
} from '@/constants/ejbooks';

// ============================================
// Types
// ============================================
type Template = 'book' | 'quote' | 'announcement' | 'testimonial' | 'author-intro' | 'coming-soon' | 'tips' | 'stats' | 'custom';
type AspectRatio = '1:1' | '4:5';
type BgTheme = 'green' | 'white' | 'dark' | 'gradient' | 'blue' | 'yellow';
type QuoteLayout = 'center' | 'left' | 'big' | 'minimal' | 'card' | 'split';

interface QuoteDecoration {
  id: string;
  label: string;
  render: (size?: number) => React.ReactNode;
}

interface CustomElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
  width?: number;
}

interface CustomSlide {
  id: string;
  elements: CustomElement[];
  bgTheme: BgTheme;
}

interface SavedProject {
  title: string;
  template: Template;
  aspectRatio: AspectRatio;
  bgTheme: BgTheme;
  selectedBookIndex: number;
  bookQuoteText: string;
  quoteSlides: { text: string; author: string }[];
  quoteLayout: QuoteLayout;
  quoteDecorations: string[];
  selectedAnnouncementIndex: number;
  selectedTestimonialIndex: number;
  selectedAuthorIndex: number;
  authorIntroCustomBio: string;
  comingSoon: { bookTitle: string; authorName: string; releaseDate: string; tagline: string };
  tipsSlides: { number: number; text: string }[];
  stats: { label: string; value: string }[];
  customSlides: CustomSlide[];
  savedAt: number;
}

// ============================================
// Constants
// ============================================
const BG_THEMES: Record<BgTheme, string> = {
  green: 'bg-[#30AF5B] text-white',
  white: 'bg-white text-gray-90',
  dark: 'bg-[#141414] text-white',
  gradient: 'bg-gradient-to-br from-[#30AF5B] to-[#021639] text-white',
  blue: 'bg-[#021639] text-white',
  yellow: 'bg-[#FEC601] text-[#141414]',
};

const BG_THEME_LABELS: Record<BgTheme, string> = {
  green: 'Hijau',
  white: 'Putih',
  dark: 'Gelap',
  gradient: 'Gradient',
  blue: 'Biru',
  yellow: 'Kuning',
};

const SLIDE_SIZES: Record<AspectRatio, { width: number; height: number }> = {
  '1:1': { width: 540, height: 540 },
  '4:5': { width: 540, height: 675 },
};

// ---- Quote Layouts ----
const QUOTE_LAYOUTS: { key: QuoteLayout; label: string; icon: string }[] = [
  { key: 'center', label: 'Tengah', icon: '⬜' },
  { key: 'left', label: 'Kiri', icon: '◧' },
  { key: 'big', label: 'Besar', icon: '🔤' },
  { key: 'minimal', label: 'Minimal', icon: '—' },
  { key: 'card', label: 'Kartu', icon: '🃏' },
  { key: 'split', label: 'Split', icon: '◨' },
];

// ---- Quote Decorations ----
const QUOTE_DECORATIONS: QuoteDecoration[] = [
  { id: 'heart', label: '❤️ Hati', render: (s = 32) => <Heart className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'sparkles', label: '✨ Sparkle', render: (s = 32) => <Sparkles className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'flame', label: '🔥 Api', render: (s = 32) => <Flame className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'book', label: '📖 Buku', render: (s = 32) => <BookOpen className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'feather', label: '🪶 Bulu', render: (s = 32) => <Feather className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'coffee', label: '☕ Kopi', render: (s = 32) => <Coffee className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'sun', label: '☀️ Matahari', render: (s = 32) => <Sun className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'moon', label: '🌙 Bulan', render: (s = 32) => <Moon className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'rain', label: '🌧️ Hujan', render: (s = 32) => <CloudRain className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'leaf', label: '🍃 Daun', render: (s = 32) => <Leaf className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'music', label: '🎵 Musik', render: (s = 32) => <Music className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'zap', label: '⚡ Petir', render: (s = 32) => <Zap className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'award', label: '🏆 Trophy', render: (s = 32) => <Award className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'star', label: '⭐ Bintang', render: (s = 32) => <Star className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'quote', label: '💬 Kutipan', render: (s = 32) => <Quote className="opacity-20" style={{ width: s, height: s }} /> },
  { id: 'emoji-fire', label: '🔥', render: (s = 32) => <span className="opacity-30" style={{ fontSize: s }}>🔥</span> },
  { id: 'emoji-star', label: '⭐', render: (s = 32) => <span className="opacity-30" style={{ fontSize: s }}>⭐</span> },
  { id: 'emoji-sparkle', label: '✨', render: (s = 32) => <span className="opacity-30" style={{ fontSize: s }}>✨</span> },
  { id: 'emoji-butterfly', label: '🦋', render: (s = 32) => <span className="opacity-30" style={{ fontSize: s }}>🦋</span> },
  { id: 'emoji-flower', label: '🌸', render: (s = 32) => <span className="opacity-30" style={{ fontSize: s }}>🌸</span> },
];

interface LayoutTemplate {
  id: string;
  name: string;
  icon: string;
  elements: Omit<CustomElement, 'id'>[];
}

const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  { id: 'blank', name: 'Kosong', icon: '⬜', elements: [] },
  {
    id: 'title-subtitle',
    name: 'Judul & Subjudul',
    icon: '📝',
    elements: [
      { type: 'text', content: 'Judul Utama', x: 10, y: 25, fontSize: 32, fontWeight: 'bold', color: 'inherit' },
      { type: 'text', content: 'Subjudul atau deskripsi singkat', x: 10, y: 50, fontSize: 16, fontWeight: 'normal', color: 'inherit' },
    ],
  },
  {
    id: 'image-title',
    name: 'Gambar & Judul',
    icon: '🖼️',
    elements: [
      { type: 'image', content: '/sample-book-covers/1.jpg', x: 25, y: 5, width: 50 },
      { type: 'text', content: 'Judul di sini', x: 10, y: 70, fontSize: 24, fontWeight: 'bold', color: 'inherit' },
      { type: 'text', content: 'Deskripsi singkat', x: 10, y: 82, fontSize: 14, fontWeight: 'normal', color: 'inherit' },
    ],
  },
  {
    id: 'full-image',
    name: 'Gambar Penuh',
    icon: '📸',
    elements: [
      { type: 'image', content: '/sample-book-covers/2.jpg', x: 0, y: 0, width: 100 },
    ],
  },
  {
    id: 'quote-layout',
    name: 'Kutipan',
    icon: '💬',
    elements: [
      { type: 'text', content: '"Kutipan inspiratif"', x: 10, y: 25, fontSize: 24, fontWeight: 'bold', color: 'inherit' },
      { type: 'text', content: '— Nama Penulis', x: 10, y: 55, fontSize: 16, fontWeight: 'normal', color: 'inherit' },
    ],
  },
  {
    id: 'promo',
    name: 'Promo',
    icon: '🏷️',
    elements: [
      { type: 'text', content: 'PROMO SPESIAL', x: 10, y: 8, fontSize: 28, fontWeight: 'bold', color: 'inherit' },
      { type: 'image', content: '/sample-book-covers/3.jpg', x: 25, y: 22, width: 50 },
      { type: 'text', content: 'Diskon hingga 50%', x: 10, y: 75, fontSize: 20, fontWeight: 'bold', color: 'inherit' },
      { type: 'text', content: 'Berlaku hingga akhir bulan', x: 10, y: 85, fontSize: 14, fontWeight: 'normal', color: 'inherit' },
    ],
  },
];

const DB_NAME = 'ejbooks-content-generator';
const DB_VERSION = 1;
const STORE_NAME = 'projects';

// ============================================
// IndexedDB helpers
// ============================================
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'title' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveProject(project: SavedProject): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(project);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function getAllProjects(): Promise<SavedProject[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteProjectFromDB(title: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(title);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Renders text content with \n converted to <br /> */
function TextWithBreaks({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const parts = text.split('\n');
  return (
    <p className={className} style={style}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

// ============================================
// DraggableItem component
// ============================================
function DraggableItem({
  el,
  containerRef,
  onUpdate,
  onDelete,
  onReplaceImage,
  isEditing,
}: {
  el: CustomElement;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onUpdate: (id: string, patch: Partial<CustomElement>) => void;
  onDelete: (id: string) => void;
  onReplaceImage: (id: string) => void;
  isEditing: boolean;
}) {
  const mode = useRef<'idle' | 'drag' | 'resize'>('idle');
  const offset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ clientX: 0, startWidth: 0 });
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const isResizeHandle = resizeHandleRef.current?.contains(target);

    if (isResizeHandle) {
      mode.current = 'resize';
      resizeStart.current = { clientX: e.clientX, startWidth: el.width || 30 };
    } else {
      mode.current = 'drag';
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [isEditing, el.width]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (mode.current === 'idle' || !containerRef.current) return;
    const cont = containerRef.current.getBoundingClientRect();

    if (mode.current === 'drag') {
      const x = ((e.clientX - cont.left - offset.current.x) / cont.width) * 100;
      const y = ((e.clientY - cont.top - offset.current.y) / cont.height) * 100;
      onUpdate(el.id, { x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(90, y)) });
    } else if (mode.current === 'resize') {
      const deltaPx = e.clientX - resizeStart.current.clientX;
      const deltaPct = (deltaPx / cont.width) * 100;
      const newWidth = Math.max(5, Math.min(100, resizeStart.current.startWidth + deltaPct));
      onUpdate(el.id, { width: Math.round(newWidth) });
    }
  }, [containerRef, onUpdate, el.id]);

  const onPointerUp = useCallback(() => {
    mode.current = 'idle';
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!isEditing || el.type !== 'image') return;
    e.stopPropagation();
    onReplaceImage(el.id);
  }, [isEditing, el.type, el.id, onReplaceImage]);

  const style: React.CSSProperties = { left: `${el.x}%`, top: `${el.y}%` };

  const renderImage = (interactive: boolean) => (
    <div className="relative">
      <img src={el.content} alt="" className="pointer-events-none" style={{ width: `${el.width || 30}%`, minWidth: 40 }} />
      {interactive && (
        <>
          <div
            ref={resizeHandleRef}
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize opacity-0 group-hover:opacity-80 transition-opacity"
          >
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-tl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none">
            <span className="text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded">Klik 2x untuk ganti</span>
          </div>
        </>
      )}
    </div>
  );

  const renderText = () => (
    <TextWithBreaks text={el.content || 'Text'} style={{ fontSize: el.fontSize || 16, fontWeight: el.fontWeight || 'normal', color: el.color || 'inherit' }} />
  );

  if (!isEditing) {
    return (
      <div className="absolute select-none" style={style}>
        {el.type === 'text' ? renderText() : renderImage(false)}
      </div>
    );
  }

  return (
    <div
      className="absolute group cursor-grab active:cursor-grabbing select-none touch-none"
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <div className="relative ring-2 ring-blue-400/50 ring-offset-1 rounded">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(el.id); }}
          className="absolute -top-3 -right-3 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
        <div className="absolute -top-3 -left-3 z-10 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-3 h-3" />
        </div>
        {el.type === 'text' ? renderText() : renderImage(true)}
      </div>
    </div>
  );
}

// ============================================
// Brand footer
// ============================================
function BrandFooter() {
  return (
    <div className="mt-auto pt-4 opacity-75 text-xs flex items-center gap-2">
      <img src="/img/ej-logo.png" alt="EJ Books" className="w-5 h-5" />
      {EJ_BOOKS_INFO.name}
    </div>
  );
}

// ============================================
// Main component
// ============================================
export default function ContentGeneratorClient() {
  const [template, setTemplate] = useState<Template>('book');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [bgTheme, setBgTheme] = useState<BgTheme>('green');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Book template
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [bookQuoteText, setBookQuoteText] = useState('');

  // Quote template (multiple slides)
  const [quoteSlides, setQuoteSlides] = useState([{ text: '', author: '' }]);
  const [quoteLayout, setQuoteLayout] = useState<QuoteLayout>('center');
  const [quoteDecorations, setQuoteDecorations] = useState<string[]>([]);

  // Announcement / Testimonial
  const [selectedAnnouncementIndex, setSelectedAnnouncementIndex] = useState(0);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

  // Author intro
  const [selectedAuthorIndex, setSelectedAuthorIndex] = useState(0);
  const [authorIntroCustomBio, setAuthorIntroCustomBio] = useState('');

  // Coming soon
  const [comingSoon, setComingSoon] = useState({ bookTitle: '', authorName: '', releaseDate: '', tagline: '' });

  // Tips menulis (multi-slide)
  const [tipsSlides, setTipsSlides] = useState([{ number: 1, text: '' }]);

  // Statistik
  const [stats, setStats] = useState([{ label: 'Buku Diterbitkan', value: '5' }, { label: 'Penulis Aktif', value: '10+' }, { label: 'Total Halaman', value: '870' }]);

  // Custom template
  const [customSlides, setCustomSlides] = useState<CustomSlide[]>([
    { id: uid(), elements: [], bgTheme: 'green' },
  ]);
  const [editingCustom, setEditingCustom] = useState(true);

  // Save
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [saveError, setSaveError] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const slideBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllProjects().then(setSavedProjects).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  useEffect(() => { setActiveSlide(0); }, [template]);

  const toggleFullscreen = useCallback(() => {
    if (!contentRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      contentRef.current.requestFullscreen();
    }
  }, []);

  const saveSlideAsImage = useCallback(async () => {
    if (!slideBoxRef.current) return;
    const canvas = await html2canvas(slideBoxRef.current, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    });
    const link = document.createElement('a');
    link.download = `slide-${activeSlide + 1}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [activeSlide]);

  // ---- Slide counts ----
  const getSlideCount = (): number => {
    switch (template) {
      case 'book': return 2;
      case 'quote': return quoteSlides.length;
      case 'announcement': return 1;
      case 'testimonial': return 1;
      case 'author-intro': return 1;
      case 'coming-soon': return 1;
      case 'tips': return tipsSlides.length;
      case 'stats': return 1;
      case 'custom': return customSlides.length;
    }
  };

  const slideCount = getSlideCount();

  const goSlide = (dir: -1 | 1) => {
    setActiveSlide((s) => Math.max(0, Math.min(slideCount - 1, s + dir)));
  };

  // ---- Data ----
  const selectedBook = EJ_BOOKS_LIST[selectedBookIndex];
  const selectedAnnouncement = EJ_BOOKS_ANNOUNCEMENTS[selectedAnnouncementIndex];
  const selectedTestimonial = EJ_BOOKS_TESTIMONIALS[selectedTestimonialIndex];

  // ---- Quote slides ----
  const addQuoteSlide = () => setQuoteSlides((s) => [...s, { text: '', author: '' }]);
  const removeQuoteSlide = (i: number) => {
    setQuoteSlides((s) => s.filter((_, idx) => idx !== i));
    setActiveSlide((a) => Math.min(a, quoteSlides.length - 2));
  };
  const updateQuoteSlide = (i: number, patch: Partial<{ text: string; author: string }>) => {
    setQuoteSlides((s) => s.map((sl, idx) => (idx === i ? { ...sl, ...patch } : sl)));
  };

  // ---- Custom slides ----
  const addCustomSlide = () => {
    setCustomSlides((s) => [...s, { id: uid(), elements: [], bgTheme }]);
    setActiveSlide(customSlides.length);
  };
  const removeCustomSlide = (i: number) => {
    if (customSlides.length <= 1) return;
    setCustomSlides((s) => s.filter((_, idx) => idx !== i));
    setActiveSlide((a) => Math.min(a, customSlides.length - 2));
  };
  const updateCustomElement = (slideIdx: number, elId: string, patch: Partial<CustomElement>) => {
    setCustomSlides((s) =>
      s.map((sl, i) =>
        i === slideIdx
          ? { ...sl, elements: sl.elements.map((e) => (e.id === elId ? { ...e, ...patch } : e)) }
          : sl,
      ),
    );
  };
  const deleteCustomElement = (slideIdx: number, elId: string) => {
    setCustomSlides((s) =>
      s.map((sl, i) =>
        i === slideIdx ? { ...sl, elements: sl.elements.filter((e) => e.id !== elId) } : sl,
      ),
    );
  };
  const addCustomText = () => {
    const el: CustomElement = { id: uid(), type: 'text', content: 'Teks baru', x: 10, y: 10, fontSize: 18, fontWeight: 'normal', color: 'inherit' };
    setCustomSlides((s) =>
      s.map((sl, i) => (i === activeSlide ? { ...sl, elements: [...sl.elements, el] } : sl)),
    );
  };
  const addCustomImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const el: CustomElement = { id: uid(), type: 'image', content: reader.result as string, x: 10, y: 10, width: 30 };
        setCustomSlides((s) =>
          s.map((sl, i) => (i === activeSlide ? { ...sl, elements: [...sl.elements, el] } : sl)),
        );
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const replaceImageElement = (slideIdx: number, elId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        updateCustomElement(slideIdx, elId, { content: reader.result as string });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const applyLayoutTemplate = (tpl: LayoutTemplate) => {
    const elements = tpl.elements.map((e) => ({ ...e, id: uid() }));
    setCustomSlides((s) =>
      s.map((sl, i) => (i === activeSlide ? { ...sl, elements } : sl)),
    );
  };

  // ---- Save / Load ----
  const handleSave = async () => {
    const trimmed = saveTitle.trim();
    if (!trimmed) { setSaveError('Judul harus diisi.'); return; }
    const existing = savedProjects.find((p) => p.title === trimmed);
    if (existing) { setSaveError('Judul sudah ada. Gunakan judul lain.'); return; }

    const project: SavedProject = {
      title: trimmed,
      template,
      aspectRatio,
      bgTheme,
      selectedBookIndex,
      bookQuoteText,
      quoteSlides,
      quoteLayout,
      quoteDecorations,
      selectedAnnouncementIndex,
      selectedTestimonialIndex,
      selectedAuthorIndex,
      authorIntroCustomBio,
      comingSoon,
      tipsSlides,
      stats,
      customSlides,
      savedAt: Date.now(),
    };

    await saveProject(project);
    const updated = await getAllProjects();
    setSavedProjects(updated);
    setShowSaveDialog(false);
    setSaveTitle('');
    setSaveError('');
  };

  const handleLoad = (project: SavedProject) => {
    setTemplate(project.template);
    setAspectRatio(project.aspectRatio);
    setBgTheme(project.bgTheme);
    setSelectedBookIndex(project.selectedBookIndex);
    setBookQuoteText(project.bookQuoteText || '');
    setQuoteSlides(project.quoteSlides || [{ text: '', author: '' }]);
    setQuoteLayout(project.quoteLayout || 'center');
    setQuoteDecorations(project.quoteDecorations || []);
    setSelectedAnnouncementIndex(project.selectedAnnouncementIndex);
    setSelectedTestimonialIndex(project.selectedTestimonialIndex);
    setSelectedAuthorIndex(project.selectedAuthorIndex ?? 0);
    setAuthorIntroCustomBio(project.authorIntroCustomBio ?? '');
    setComingSoon(project.comingSoon ?? { bookTitle: '', authorName: '', releaseDate: '', tagline: '' });
    setTipsSlides(project.tipsSlides ?? [{ number: 1, text: '' }]);
    setStats(project.stats ?? [{ label: 'Buku Diterbitkan', value: '5' }, { label: 'Penulis Aktif', value: '10+' }, { label: 'Total Halaman', value: '870' }]);
    setCustomSlides(project.customSlides || [{ id: uid(), elements: [], bgTheme: 'green' }]);
    setActiveSlide(0);
  };

  const handleDelete = async (title: string) => {
    await deleteProjectFromDB(title);
    const updated = await getAllProjects();
    setSavedProjects(updated);
  };

  // ---- Templates config ----
  const templates: { key: Template; label: string; icon: React.ReactNode }[] = [
    { key: 'book', label: 'Promosi Buku', icon: <ImageIcon className="w-4 h-4" /> },
    { key: 'quote', label: 'Kutipan', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { key: 'announcement', label: 'Pengumuman', icon: <Megaphone className="w-4 h-4" /> },
    { key: 'testimonial', label: 'Testimoni', icon: <Star className="w-4 h-4" /> },
    { key: 'author-intro', label: 'Perkenalan Penulis', icon: <User className="w-4 h-4" /> },
    { key: 'coming-soon', label: 'Coming Soon', icon: <Clock className="w-4 h-4" /> },
    { key: 'tips', label: 'Tips Menulis', icon: <Lightbulb className="w-4 h-4" /> },
    { key: 'stats', label: 'Statistik', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'custom', label: 'Custom', icon: <Pencil className="w-4 h-4" /> },
  ];

  // ---- Current custom slide ----
  const currentCustomSlide = customSlides[activeSlide] || customSlides[0];
  const currentCustomBg = template === 'custom' ? BG_THEMES[currentCustomSlide?.bgTheme || bgTheme] : BG_THEMES[bgTheme];
  const slideSize = SLIDE_SIZES[aspectRatio];

  // ---- Render slide content ----
  const renderSlideContent = () => {
    if (template === 'book' && selectedBook) {
      if (activeSlide === 0) {
        return (
          <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
            <img src={selectedBook.coverImage} alt={selectedBook.title} className="object-cover rounded-xl shadow-2xl" style={{ width: 160, height: 224 }} />
            <div>
              <h2 className="text-3xl font-bold leading-tight mb-2">{selectedBook.title}</h2>
              <p className="text-base opacity-90 mb-1">oleh {selectedBook.author.penName || selectedBook.author.name}</p>
              <p className="text-xl font-bold mt-3">{formatBookPrice(selectedBook.price)}</p>
            </div>
            <p className="text-base opacity-80 leading-relaxed">{selectedBook.shortDescription}</p>
            <BrandFooter />
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center text-center gap-6" style={{ width: 420 }}>
          <span className="text-5xl opacity-30">&ldquo;</span>
          <TextWithBreaks
            text={bookQuoteText || 'Tulis kutipan dari buku ini di panel kiri...'}
            className="text-xl font-semibold leading-relaxed italic"
            style={{ width: 400 }}
          />
          <p className="text-base font-medium opacity-80">— {selectedBook.title}</p>
          <p className="text-sm opacity-70">oleh {selectedBook.author.penName || selectedBook.author.name}</p>
          <BrandFooter />
        </div>
      );
    }

    if (template === 'quote') {
      const slide = quoteSlides[activeSlide] || quoteSlides[0];
      const text = slide.text || 'Tulis kutipan di panel kiri...';
      const author = slide.author;
      const decoItems = quoteDecorations.map(id => QUOTE_DECORATIONS.find(d => d.id === id)).filter(Boolean) as QuoteDecoration[];

      const DecoCorners = () =>
        decoItems.length > 0 ? (
          <>
            <div className="absolute top-4 left-4 flex gap-1">{decoItems.map((d, i) => <span key={i}>{d.render(24)}</span>)}</div>
            <div className="absolute top-4 right-4 flex gap-1">{decoItems.map((d, i) => <span key={i} style={{ transform: 'scaleX(-1)' }}>{d.render(24)}</span>)}</div>
            <div className="absolute bottom-12 left-4 flex gap-1">{decoItems.map((d, i) => <span key={i} style={{ transform: 'scaleY(-1)' }}>{d.render(24)}</span>)}</div>
            <div className="absolute bottom-12 right-4 flex gap-1">{decoItems.map((d, i) => <span key={i} style={{ transform: 'scale(-1)' }}>{d.render(24)}</span>)}</div>
          </>
        ) : null;

      if (quoteLayout === 'left') {
        return (
          <div className="relative flex flex-col items-start text-left gap-5 px-10" style={{ width: 480 }}>
            <DecoCorners />
            <span className="text-5xl opacity-30">&ldquo;</span>
            <TextWithBreaks text={text} className="text-xl font-semibold leading-relaxed italic" style={{ width: 400 }} />
            {author && <p className="text-sm font-medium opacity-80 mt-2">— {author}</p>}
            <BrandFooter />
          </div>
        );
      }

      if (quoteLayout === 'big') {
        return (
          <div className="relative flex flex-col items-center text-center gap-4 px-8" style={{ width: 480 }}>
            <DecoCorners />
            <TextWithBreaks text={text} className="text-3xl font-extrabold leading-snug" style={{ width: 440 }} />
            {author && <p className="text-base font-medium opacity-80 mt-4">— {author}</p>}
            <BrandFooter />
          </div>
        );
      }

      if (quoteLayout === 'minimal') {
        return (
          <div className="relative flex flex-col items-center text-center gap-4" style={{ width: 420 }}>
            <DecoCorners />
            <div className="w-12 h-[2px] opacity-30 bg-current" />
            <TextWithBreaks text={text} className="text-lg font-light leading-relaxed italic" style={{ width: 380 }} />
            {author && <p className="text-xs tracking-widest uppercase opacity-70 mt-3">{author}</p>}
            <div className="w-12 h-[2px] opacity-30 bg-current" />
            <BrandFooter />
          </div>
        );
      }

      if (quoteLayout === 'card') {
        return (
          <div className="relative flex flex-col items-center text-center gap-4" style={{ width: 420 }}>
            <DecoCorners />
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col gap-4 items-center" style={{ width: 400 }}>
              <span className="text-4xl opacity-30">&ldquo;</span>
              <TextWithBreaks text={text} className="text-xl font-semibold leading-relaxed italic" style={{ width: 340 }} />
              {author && <p className="text-sm font-medium opacity-80">— {author}</p>}
            </div>
            <BrandFooter />
          </div>
        );
      }

      if (quoteLayout === 'split') {
        return (
          <div className="relative flex items-center gap-6 px-8" style={{ width: 480 }}>
            <DecoCorners />
            <div className="w-[3px] self-stretch opacity-40 bg-current rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-4">
              <TextWithBreaks text={text} className="text-xl font-semibold leading-relaxed italic" style={{ width: 360 }} />
              {author && <p className="text-sm font-medium opacity-80">— {author}</p>}
              <BrandFooter />
            </div>
          </div>
        );
      }

      // Default: center
      return (
        <div className="relative flex flex-col items-center text-center gap-6" style={{ width: 420 }}>
          <DecoCorners />
          <span className="text-5xl opacity-30">&ldquo;</span>
          <TextWithBreaks text={text} className="text-xl font-semibold leading-relaxed italic" style={{ width: 400 }} />
          {author && <p className="text-sm font-medium opacity-80">— {author}</p>}
          <BrandFooter />
        </div>
      );
    }

    if (template === 'announcement' && selectedAnnouncement) {
      return (
        <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
          <span className="text-4xl">📢</span>
          <h2 className="text-3xl font-bold leading-tight">{selectedAnnouncement.title}</h2>
          <TextWithBreaks
            text={selectedAnnouncement.content}
            className="text-base opacity-90 leading-relaxed"
            style={{ width: 400 }}
          />
          <p className="text-sm opacity-70 mt-2">{selectedAnnouncement.date}</p>
          <BrandFooter />
        </div>
      );
    }

    if (template === 'testimonial' && selectedTestimonial) {
      return (
        <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
          <span className="text-4xl opacity-30">&ldquo;</span>
          <TextWithBreaks
            text={selectedTestimonial.content}
            className="text-lg font-medium leading-relaxed italic"
            style={{ width: 400 }}
          />
          <div className="mt-2">
            <p className="font-bold text-sm">{selectedTestimonial.name}</p>
            <p className="text-xs opacity-80">{selectedTestimonial.role}</p>
          </div>
          <BrandFooter />
        </div>
      );
    }

    if (template === 'author-intro') {
      const author = EJ_BOOKS_AUTHORS[selectedAuthorIndex] || EJ_BOOKS_AUTHORS[0];
      const displayBio = authorIntroCustomBio || author.bio || '';
      const authorBooks = EJ_BOOKS_LIST.filter(b => b.author.id === author.id);
      return (
        <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
          <img
            src={author.profileImage}
            alt={author.name}
            className="rounded-full object-cover border-4 border-white/30 shadow-lg"
            style={{ width: 120, height: 120 }}
          />
          <div>
            <h2 className="text-3xl font-bold leading-tight">{author.penName || author.name}</h2>
            {author.penName && (
              <p className="text-sm opacity-75 mt-1">{author.name}</p>
            )}
          </div>
          {displayBio && (
            <TextWithBreaks
              text={displayBio}
              className="text-base opacity-90 leading-relaxed"
              style={{ width: 360 }}
            />
          )}
          {authorBooks.length > 0 && (
            <div className="flex flex-col items-center gap-2 mt-1">
              <p className="text-sm font-semibold opacity-75 uppercase tracking-wider">Buku diterbitkan</p>
              <div className="flex flex-col gap-1 items-center">
                {[...authorBooks]
                  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
                  .slice(0, 3)
                  .map(book => (
                    <p key={book.id} className="text-base font-medium opacity-90">{book.title}</p>
                  ))}
              </div>
            </div>
          )}
          <BrandFooter />
        </div>
      );
    }

    if (template === 'coming-soon') {
      return (
        <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-70">Coming Soon</p>
          <div className="w-16 h-[2px] opacity-30 bg-current" />
          <h2 className="text-4xl font-extrabold leading-tight">
            {comingSoon.bookTitle || 'Judul Buku Baru'}
          </h2>
          {comingSoon.authorName && (
            <p className="text-base opacity-80">oleh {comingSoon.authorName}</p>
          )}
          {comingSoon.tagline && (
            <TextWithBreaks
              text={comingSoon.tagline}
              className="text-lg italic opacity-90 leading-relaxed"
              style={{ width: 360 }}
            />
          )}
          {comingSoon.releaseDate && (
            <div className="mt-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm">
              <p className="text-base font-semibold">
                <Clock className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
                {comingSoon.releaseDate}
              </p>
            </div>
          )}
          <BrandFooter />
        </div>
      );
    }

    if (template === 'tips') {
      const slide = tipsSlides[activeSlide] || tipsSlides[0];
      return (
        <div className="flex flex-col items-center text-center gap-5" style={{ width: 420 }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">Tips Menulis</p>
          <div className="flex items-center justify-center">
            <span className="text-7xl font-black opacity-15">{String(slide.number).padStart(2, '0')}</span>
          </div>
          <TextWithBreaks
            text={slide.text || 'Tulis tips di panel kiri...'}
            className="text-xl font-semibold leading-relaxed"
            style={{ width: 380 }}
          />
          <BrandFooter />
        </div>
      );
    }

    if (template === 'stats') {
      return (
        <div className="flex flex-col items-center text-center gap-6" style={{ width: 420 }}>
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-70">Pencapaian Kami</p>
          <div className="w-16 h-[2px] opacity-30 bg-current" />
          <div className="flex flex-col gap-5 w-full">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-5xl font-black">{s.value}</span>
                <span className="text-base opacity-75 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
          <BrandFooter />
        </div>
      );
    }

    if (template === 'custom' && currentCustomSlide) {
      return (
        <div ref={slideRef} className="absolute inset-0">
          {currentCustomSlide.elements.map((el) => (
            <DraggableItem
              key={el.id}
              el={el}
              containerRef={slideRef}
              onUpdate={(id, patch) => updateCustomElement(activeSlide, id, patch)}
              onDelete={(id) => deleteCustomElement(activeSlide, id)}
              onReplaceImage={(id) => replaceImageElement(activeSlide, id)}
              isEditing={editingCustom && !isFullscreen}
            />
          ))}
          {currentCustomSlide.elements.length === 0 && !isFullscreen && (
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-sm pointer-events-none">
              Tambahkan teks atau gambar dari panel kiri
            </div>
          )}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <BrandFooter />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="max-container padding-container">
        <div className="text-center mb-10">
          <h1 className="bold-32 lg:bold-40 text-gray-90 mb-3">Content Generator</h1>
          <p className="regular-16 text-gray-50">
            Buat konten Instagram siap posting. Pilih template, kustomisasi, fullscreen, lalu screenshot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ==================== CONTROLS ==================== */}
          <div className="lg:col-span-1 space-y-5">
            {/* Template picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">Template</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTemplate(t.key)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      template === t.key
                        ? 'bg-green-50 text-white border-green-50'
                        : 'bg-white text-gray-50 border-gray-200 hover:border-green-50'
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ---- BOOK controls ---- */}
            {template === 'book' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Pilih Buku</label>
                  <select
                    value={selectedBookIndex}
                    onChange={(e) => setSelectedBookIndex(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                  >
                    {EJ_BOOKS_LIST.map((book, i) => (
                      <option key={book.id} value={i}>{book.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Kutipan dari Buku (Slide 2)</label>
                  <textarea
                    value={bookQuoteText}
                    onChange={(e) => setBookQuoteText(e.target.value)}
                    placeholder="Tulis kutipan menarik dari buku ini..."
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ---- QUOTE controls (multi-slide) ---- */}
            {template === 'quote' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-90">Slide Kutipan</label>
                  <button onClick={addQuoteSlide} className="text-xs text-green-50 font-semibold flex items-center gap-1 hover:underline">
                    <Plus className="w-3 h-3" /> Tambah Slide
                  </button>
                </div>
                {quoteSlides.map((slide, i) => (
                  <div key={i} className={`p-3 rounded-xl border space-y-2 ${activeSlide === i ? 'border-green-50 bg-green-50/5' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setActiveSlide(i)} className="text-xs font-semibold text-gray-90">
                        Slide {i + 1}
                      </button>
                      {quoteSlides.length > 1 && (
                        <button onClick={() => removeQuoteSlide(i)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={slide.text}
                      onChange={(e) => updateQuoteSlide(i, { text: e.target.value })}
                      placeholder="Kutipan..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-90 resize-none"
                    />
                    <input
                      value={slide.author}
                      onChange={(e) => updateQuoteSlide(i, { author: e.target.value })}
                      placeholder="Penulis kutipan"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-90"
                    />
                  </div>
                ))}

                {/* Quote Layout picker */}
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Tata Letak Kutipan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {QUOTE_LAYOUTS.map((l) => (
                      <button
                        key={l.key}
                        onClick={() => setQuoteLayout(l.key)}
                        className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border ${
                          quoteLayout === l.key
                            ? 'bg-green-50 text-white border-green-50'
                            : 'bg-white text-gray-50 border-gray-200 hover:border-green-50'
                        }`}
                      >
                        <span className="text-base">{l.icon}</span>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quote Decoration picker */}
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Tambah Dekorasi</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {QUOTE_DECORATIONS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() =>
                          setQuoteDecorations((prev) =>
                            prev.includes(d.id)
                              ? prev.filter((x) => x !== d.id)
                              : prev.length < 4 ? [...prev, d.id] : prev
                          )
                        }
                        className={`flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${
                          quoteDecorations.includes(d.id)
                            ? 'bg-green-50 text-white border-green-50'
                            : 'bg-white text-gray-50 border-gray-200 hover:border-green-50'
                        }`}
                        title={d.label}
                      >
                        <span className="text-sm">{d.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                  {quoteDecorations.length > 0 && (
                    <button
                      onClick={() => setQuoteDecorations([])}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Hapus semua dekorasi
                    </button>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">Maks 4 dekorasi. Klik untuk toggle.</p>
                </div>
              </div>
            )}

            {/* ---- ANNOUNCEMENT controls ---- */}
            {template === 'announcement' && (
              <div>
                <label className="block text-sm font-semibold text-gray-90 mb-2">Pilih Pengumuman</label>
                <select
                  value={selectedAnnouncementIndex}
                  onChange={(e) => setSelectedAnnouncementIndex(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                >
                  {EJ_BOOKS_ANNOUNCEMENTS.map((ann, i) => (
                    <option key={ann.id} value={i}>{ann.title}</option>
                  ))}
                </select>
              </div>
            )}

            {/* ---- TESTIMONIAL controls ---- */}
            {template === 'testimonial' && (
              <div>
                <label className="block text-sm font-semibold text-gray-90 mb-2">Pilih Testimoni</label>
                <select
                  value={selectedTestimonialIndex}
                  onChange={(e) => setSelectedTestimonialIndex(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                >
                  {EJ_BOOKS_TESTIMONIALS.map((t, i) => (
                    <option key={i} value={i}>{t.name} — {t.role}</option>
                  ))}
                </select>
              </div>
            )}

            {/* ---- AUTHOR INTRO controls ---- */}
            {template === 'author-intro' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Pilih Penulis</label>
                  <select
                    value={selectedAuthorIndex}
                    onChange={(e) => {
                      setSelectedAuthorIndex(Number(e.target.value));
                      setAuthorIntroCustomBio('');
                    }}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                  >
                    {EJ_BOOKS_AUTHORS.map((a, i) => (
                      <option key={a.id} value={i}>{a.penName || a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Bio (opsional, override)</label>
                  <textarea
                    value={authorIntroCustomBio}
                    onChange={(e) => setAuthorIntroCustomBio(e.target.value)}
                    placeholder={EJ_BOOKS_AUTHORS[selectedAuthorIndex]?.bio || 'Tulis bio penulis...'}
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90 resize-none"
                  />
                </div>
                <div className="p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-90 mb-2">Preview info</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={EJ_BOOKS_AUTHORS[selectedAuthorIndex]?.profileImage}
                      alt=""
                      className="rounded-full object-cover"
                      style={{ width: 40, height: 40 }}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-90">
                        {EJ_BOOKS_AUTHORS[selectedAuthorIndex]?.penName || EJ_BOOKS_AUTHORS[selectedAuthorIndex]?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {EJ_BOOKS_LIST.filter(b => b.author.id === EJ_BOOKS_AUTHORS[selectedAuthorIndex]?.id).length} buku diterbitkan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---- COMING SOON controls ---- */}
            {template === 'coming-soon' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Judul Buku</label>
                  <input
                    value={comingSoon.bookTitle}
                    onChange={(e) => setComingSoon(s => ({ ...s, bookTitle: e.target.value }))}
                    placeholder="Judul buku yang akan rilis..."
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Nama Penulis</label>
                  <input
                    value={comingSoon.authorName}
                    onChange={(e) => setComingSoon(s => ({ ...s, authorName: e.target.value }))}
                    placeholder="Nama penulis"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Tanggal Rilis</label>
                  <input
                    value={comingSoon.releaseDate}
                    onChange={(e) => setComingSoon(s => ({ ...s, releaseDate: e.target.value }))}
                    placeholder="Contoh: Maret 2026"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-90 mb-2">Tagline</label>
                  <textarea
                    value={comingSoon.tagline}
                    onChange={(e) => setComingSoon(s => ({ ...s, tagline: e.target.value }))}
                    placeholder="Tagline atau deskripsi singkat..."
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-90 resize-none"
                  />
                </div>
              </div>
            )}

            {/* ---- TIPS controls (multi-slide) ---- */}
            {template === 'tips' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-90">Slide Tips</label>
                  <button
                    onClick={() => setTipsSlides(s => [...s, { number: s.length + 1, text: '' }])}
                    className="text-xs text-green-50 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3 h-3" /> Tambah Slide
                  </button>
                </div>
                {tipsSlides.map((slide, i) => (
                  <div key={i} className={`p-3 rounded-xl border space-y-2 ${activeSlide === i ? 'border-green-50 bg-green-50/5' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setActiveSlide(i)} className="text-xs font-semibold text-gray-90">
                        Tips #{slide.number}
                      </button>
                      {tipsSlides.length > 1 && (
                        <button
                          onClick={() => {
                            setTipsSlides(s => s.filter((_, idx) => idx !== i));
                            setActiveSlide(a => Math.min(a, tipsSlides.length - 2));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-50">No.</label>
                      <input
                        type="number"
                        value={slide.number}
                        onChange={(e) => setTipsSlides(s => s.map((sl, idx) => idx === i ? { ...sl, number: Number(e.target.value) } : sl))}
                        className="w-16 rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-90"
                        min={1}
                      />
                    </div>
                    <textarea
                      value={slide.text}
                      onChange={(e) => setTipsSlides(s => s.map((sl, idx) => idx === i ? { ...sl, text: e.target.value } : sl))}
                      placeholder="Isi tips..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-90 resize-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ---- STATS controls ---- */}
            {template === 'stats' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-90">Data Statistik</label>
                  {stats.length < 5 && (
                    <button
                      onClick={() => setStats(s => [...s, { label: '', value: '' }])}
                      className="text-xs text-green-50 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3 h-3" /> Tambah
                    </button>
                  )}
                </div>
                {stats.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-90">Item {i + 1}</span>
                      {stats.length > 1 && (
                        <button
                          onClick={() => setStats(st => st.filter((_, idx) => idx !== i))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      value={s.value}
                      onChange={(e) => setStats(st => st.map((item, idx) => idx === i ? { ...item, value: e.target.value } : item))}
                      placeholder="Angka (misal: 5, 200+, 1000)"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-90"
                    />
                    <input
                      value={s.label}
                      onChange={(e) => setStats(st => st.map((item, idx) => idx === i ? { ...item, label: e.target.value } : item))}
                      placeholder="Label (misal: Buku Diterbitkan)"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-90"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ---- CUSTOM controls ---- */}
            {template === 'custom' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-90">Slide</label>
                  <button onClick={addCustomSlide} className="text-xs text-green-50 font-semibold flex items-center gap-1 hover:underline">
                    <Plus className="w-3 h-3" /> Tambah Slide
                  </button>
                </div>

                <div className="flex gap-1.5 flex-wrap">
                  {customSlides.map((sl, i) => (
                    <div key={sl.id} className="flex items-center">
                      <button
                        onClick={() => setActiveSlide(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          activeSlide === i ? 'bg-green-50 text-white border-green-50' : 'bg-white text-gray-50 border-gray-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                      {customSlides.length > 1 && (
                        <button onClick={() => removeCustomSlide(i)} className="ml-0.5 text-red-400 hover:text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-90 mb-1.5">Layout Template</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {LAYOUT_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => applyLayoutTemplate(tpl)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-200 text-xs text-gray-50 hover:border-green-50 hover:text-green-50 transition-all"
                      >
                        <span className="text-lg">{tpl.icon}</span>
                        <span className="leading-tight text-center">{tpl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={addCustomText} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-50 hover:border-green-50 transition-all">
                    <Type className="w-4 h-4" /> Teks
                  </button>
                  <button onClick={addCustomImage} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-50 hover:border-green-50 transition-all">
                    <ImagePlus className="w-4 h-4" /> Gambar
                  </button>
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-50">
                  <input type="checkbox" checked={editingCustom} onChange={(e) => setEditingCustom(e.target.checked)} className="rounded" />
                  Mode edit (drag &amp; hapus)
                </label>

                <div>
                  <label className="block text-xs font-semibold text-gray-90 mb-1">Background slide ini</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(Object.keys(BG_THEMES) as BgTheme[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setCustomSlides((s) => s.map((sl, i) => i === activeSlide ? { ...sl, bgTheme: key } : sl))}
                        className={`px-2 py-1.5 rounded-lg text-xs border transition-all ${
                          currentCustomSlide?.bgTheme === key ? 'ring-2 ring-green-50 border-green-50' : 'border-gray-200'
                        }`}
                      >
                        {BG_THEME_LABELS[key]}
                      </button>
                    ))}
                  </div>
                </div>

                {currentCustomSlide && currentCustomSlide.elements.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-90">Elemen</label>
                    {currentCustomSlide.elements.map((el) => (
                      <div key={el.id} className="p-2 rounded-lg border border-gray-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-50">{el.type === 'text' ? '📝 Teks' : '🖼️ Gambar'}</span>
                          <button onClick={() => deleteCustomElement(activeSlide, el.id)} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {el.type === 'text' && (
                          <>
                            <textarea
                              value={el.content}
                              onChange={(e) => updateCustomElement(activeSlide, el.id, { content: e.target.value })}
                              className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-90 resize-none"
                              rows={2}
                            />
                            <div className="flex gap-1.5">
                              <input
                                type="number"
                                value={el.fontSize || 16}
                                onChange={(e) => updateCustomElement(activeSlide, el.id, { fontSize: Number(e.target.value) })}
                                className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-xs"
                                min={8}
                                max={120}
                              />
                              <select
                                value={el.fontWeight || 'normal'}
                                onChange={(e) => updateCustomElement(activeSlide, el.id, { fontWeight: e.target.value as 'normal' | 'bold' })}
                                className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                              >
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                              </select>
                              <input
                                type="color"
                                value={el.color === 'inherit' ? '#ffffff' : (el.color || '#ffffff')}
                                onChange={(e) => updateCustomElement(activeSlide, el.id, { color: e.target.value })}
                                className="w-8 h-7 rounded border border-gray-200 cursor-pointer"
                              />
                            </div>
                          </>
                        )}
                        {el.type === 'image' && (
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-50">Lebar %</label>
                            <input
                              type="number"
                              value={el.width || 30}
                              onChange={(e) => updateCustomElement(activeSlide, el.id, { width: Number(e.target.value) })}
                              className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-xs"
                              min={5}
                              max={100}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---- Aspect ratio ---- */}
            <div>
              <label className="block text-sm font-semibold text-gray-90 mb-2">Rasio</label>
              <div className="flex gap-2">
                {(['1:1', '4:5'] as AspectRatio[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      aspectRatio === r
                        ? 'bg-green-50 text-white border-green-50'
                        : 'bg-white text-gray-50 border-gray-200 hover:border-green-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* ---- Background (non-custom) ---- */}
            {template !== 'custom' && (
              <div>
                <label className="block text-sm font-semibold text-gray-90 mb-2">Background</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(BG_THEMES) as BgTheme[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setBgTheme(key)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                        bgTheme === key ? 'ring-2 ring-green-50 border-green-50' : 'border-gray-200 hover:border-green-50'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 rounded-full mr-2 align-middle ${
                        key === 'green' ? 'bg-[#30AF5B]' :
                        key === 'white' ? 'bg-white border border-gray-200' :
                        key === 'dark' ? 'bg-[#141414]' :
                        key === 'blue' ? 'bg-[#021639]' :
                        key === 'yellow' ? 'bg-[#FEC601]' :
                        'bg-gradient-to-br from-[#30AF5B] to-[#021639]'
                      }`} />
                      {BG_THEME_LABELS[key]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ---- Actions ---- */}
            <div className="flex gap-2">
              <button
                onClick={toggleFullscreen}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-90 text-white py-3 font-semibold transition-all hover:bg-gray-50"
              >
                <Maximize className="w-5 h-5" />
                Fullscreen
              </button>
              <button
                onClick={saveSlideAsImage}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-70 text-white py-3 font-semibold transition-all hover:opacity-90"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowSaveDialog(true); setSaveError(''); }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-50 text-white py-3 font-semibold transition-all hover:opacity-90"
              >
                <Save className="w-5 h-5" />
                Save Project
              </button>
            </div>

            {/* ---- Saved projects ---- */}
            {savedProjects.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-90 mb-2">Projek Tersimpan</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {savedProjects.map((p) => (
                    <div key={p.title} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-white">
                      <button onClick={() => handleLoad(p)} className="text-sm text-gray-90 font-medium truncate text-left flex-1 hover:text-green-50 transition-colors">
                        {p.title}
                      </button>
                      <button onClick={() => handleDelete(p.title)} className="ml-2 text-red-400 hover:text-red-600 flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ==================== PREVIEW ==================== */}
          <div className="lg:col-span-2 flex flex-col items-center gap-4">
            {slideCount > 1 && (
              <div className="flex items-center gap-3">
                <button onClick={() => goSlide(-1)} disabled={activeSlide === 0} className="p-1.5 rounded-full border border-gray-200 disabled:opacity-30 hover:border-green-50 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: slideCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeSlide ? 'bg-green-50 scale-125' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <button onClick={() => goSlide(1)} disabled={activeSlide === slideCount - 1} className="p-1.5 rounded-full border border-gray-200 disabled:opacity-30 hover:border-green-50 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-30 ml-1">Slide {activeSlide + 1}/{slideCount}</span>
              </div>
            )}

            <div
              ref={contentRef}
              className={isFullscreen ? 'bg-black w-screen h-screen flex items-center justify-center' : ''}
            >
              <div
                ref={slideBoxRef}
                className={`${template === 'custom' ? currentCustomBg : BG_THEMES[bgTheme]} overflow-hidden flex flex-col items-center justify-center p-10 relative`}
                style={{
                  width: slideSize.width,
                  height: slideSize.height,
                  ...(isFullscreen ? { transform: `scale(${Math.min(window.innerWidth / slideSize.width, window.innerHeight / slideSize.height)})` } : {}),
                }}
              >
                {isFullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 z-50 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors"
                  >
                    <Minimize className="w-5 h-5" />
                  </button>
                )}
                {renderSlideContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SAVE DIALOG ==================== */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowSaveDialog(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="bold-18 text-gray-90 mb-4">Simpan Projek</h3>
            <input
              value={saveTitle}
              onChange={(e) => { setSaveTitle(e.target.value); setSaveError(''); }}
              placeholder="Judul projek (harus unik)"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-90 mb-2"
              autoFocus
            />
            {saveError && <p className="text-xs text-red-500 mb-2">{saveError}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowSaveDialog(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-50">
                Batal
              </button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-green-50 text-white text-sm font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
