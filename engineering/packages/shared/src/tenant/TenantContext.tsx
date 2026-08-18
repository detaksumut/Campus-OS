import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CampusProfile {
  tenantId: string;
  institutionCode: string;
  institutionName: string;
  institutionType: 'UNIVERSITAS' | 'POLITEKNIK' | 'INSTITUT' | 'SEKOLAH_TINGGI';
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  heroImageUrl: string;
  executiveTitle: 'Direktur' | 'Rektor' | 'Ketua';
  executiveName: string;
  executiveNip: string;
  primaryColor: string;
  accentColor: string;
  darkSurface: string;
  ssoProvider: 'google' | 'microsoft' | 'saml';
  ssoOrganizationDomain: string;
}

const DEFAULT_PROFILE: CampusProfile = {
  tenantId: 'kampus-utama',
  institutionCode: '005012',
  institutionName: 'UNIVERSITAS/POLITEKNIK (KAMPUS ANDA)',
  institutionType: 'POLITEKNIK',
  tagline: 'Highly Advanced and Competitive',
  logoUrl: '',
  faviconUrl: '/vite.svg',
  heroImageUrl: '/hero-campuos.png',
  executiveTitle: 'Direktur',
  executiveName: 'Pak Direktur',
  executiveNip: '197508152002121001',
  primaryColor: '#2563eb',
  accentColor: '#3b82f6',
  darkSurface: '#0f172a',
  ssoProvider: 'google',
  ssoOrganizationDomain: 'politeknik-anda.ac.id'
};

interface TenantContextValue {
  profile: CampusProfile;
  updateProfile: (updates: Partial<CampusProfile>) => void;
  resetToDefault: () => void;
}

const TenantContext = createContext<TenantContextValue>({
  profile: DEFAULT_PROFILE,
  updateProfile: () => {},
  resetToDefault: () => {}
});

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CampusProfile>(() => {
    try {
      const saved = localStorage.getItem('campus_os_tenant_profile');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const updateProfile = (updates: Partial<CampusProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('campus_os_tenant_profile', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist tenant profile', err);
      }
      return updated;
    });
  };

  const resetToDefault = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('campus_os_tenant_profile');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TenantContext.Provider value={{ profile, updateProfile, resetToDefault }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
