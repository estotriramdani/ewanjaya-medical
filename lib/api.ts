// ============================================
// Medical API Service
// ============================================
// Fetches data from the EJ Admin backend API.
// Falls back to local constants if the API is unreachable.

import { PRODUCTS, Product } from '@/constants/products';
import { FEATURES, HISTORY_ITEMS, TENDER_COUNT, WHATSAPP_CONTACT } from '@/constants';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/ejbooks-admin/api';

// ----- Types (API response shapes) -----

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  short_description: string | null;
  is_active: boolean;
  sort_order: number;
  photos: string[];
}

export interface ApiFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  variant: string;
  sort_order: number;
  is_active: boolean;
}

export interface ApiHistoryItem {
  id: string;
  year: string;
  description: string;
  bg_color: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

export interface MedicalSettings {
  whatsapp_contact: string;
  tender_count: string;
  company_name: string;
  company_address: string;
  admin_phone: string;
  admin_email: string;
  video_profile_url: string;
  [key: string]: string;
}

// ----- Helpers -----

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ----- API Functions -----

/**
 * Fetch medical products. Returns API data or falls back to local constants.
 */
export async function fetchMedicalProducts(): Promise<Product[]> {
  const data = await fetchJson<ApiProduct[]>(`${API_BASE}/medical/products.php`);
  if (!data) return PRODUCTS;

  return data.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    shortDescription: p.short_description ?? undefined,
    photos: p.photos,
  }));
}

/**
 * Fetch medical features. Returns API data or falls back to local constants.
 */
export async function fetchMedicalFeatures(): Promise<
  { title: string; icon: string; variant: string; description: string }[]
> {
  const data = await fetchJson<ApiFeature[]>(`${API_BASE}/medical/features.php`);
  if (!data) return FEATURES;

  return data.map((f) => ({
    title: f.title,
    icon: f.icon,
    variant: f.variant,
    description: f.description,
  }));
}

/**
 * Fetch medical history items. Returns API data or falls back to local constants.
 */
export async function fetchMedicalHistory(): Promise<
  { year: string; description: string; bgColor: string; icon: string }[]
> {
  const data = await fetchJson<ApiHistoryItem[]>(`${API_BASE}/medical/history.php`);
  if (!data) return HISTORY_ITEMS;

  return data.map((h) => ({
    year: h.year,
    description: h.description,
    bgColor: h.bg_color,
    icon: h.icon,
  }));
}

/**
 * Fetch medical settings. Returns API data or falls back to local constants.
 */
export async function fetchMedicalSettings(): Promise<MedicalSettings> {
  const data = await fetchJson<MedicalSettings>(`${API_BASE}/medical/settings.php`);
  if (!data) {
    return {
      whatsapp_contact: WHATSAPP_CONTACT,
      tender_count: String(TENDER_COUNT),
      company_name: 'PT. Ewan Jaya Kastara',
      company_address: 'Desa Lebakwangi, Arjasari, Kabupaten Bandung, Jawa Barat',
      admin_phone: '0857-0332-9747',
      admin_email: 'ewanjayakastara@gmail.com',
      video_profile_url: '',
    };
  }
  return data;
}
