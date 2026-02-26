'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, PRODUCTS } from '@/constants/products';
import { FEATURES, HISTORY_ITEMS, TENDER_COUNT, WHATSAPP_CONTACT } from '@/constants';
import {
  fetchMedicalProducts,
  fetchMedicalFeatures,
  fetchMedicalHistory,
  fetchMedicalSettings,
  MedicalSettings,
} from '@/lib/api';

interface MedicalData {
  products: Product[];
  features: { title: string; icon: string; variant: string; description: string }[];
  history: { year: string; description: string; bgColor: string; icon: string }[];
  settings: MedicalSettings;
  isLoading: boolean;
}

const defaultSettings: MedicalSettings = {
  whatsapp_contact: WHATSAPP_CONTACT,
  tender_count: String(TENDER_COUNT),
  company_name: 'PT. Ewan Jaya Kastara',
  company_address: 'Desa Lebakwangi, Arjasari, Kabupaten Bandung, Jawa Barat',
  admin_phone: '0857-0332-9747',
  admin_email: 'ewanjayakastara@gmail.com',
  video_profile_url: '',
};

const MedicalContext = createContext<MedicalData>({
  products: PRODUCTS,
  features: FEATURES,
  history: HISTORY_ITEMS,
  settings: defaultSettings,
  isLoading: true,
});

export const useMedical = () => useContext(MedicalContext);

export function MedicalProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MedicalData>({
    products: PRODUCTS,
    features: FEATURES,
    history: HISTORY_ITEMS,
    settings: defaultSettings,
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [products, features, history, settings] = await Promise.all([
        fetchMedicalProducts(),
        fetchMedicalFeatures(),
        fetchMedicalHistory(),
        fetchMedicalSettings(),
      ]);

      if (!cancelled) {
        setData({ products, features, history, settings, isLoading: false });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return <MedicalContext.Provider value={data}>{children}</MedicalContext.Provider>;
}
