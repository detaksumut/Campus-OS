import { create } from 'zustand';

interface ThemeState {
  mode: 'light' | 'dark';
  primaryColor: string;
  radius: string;
  setMode: (mode: 'light' | 'dark') => void;
  setPrimaryColor: (color: string) => void;
  setRadius: (radius: string) => void;
}

export const useThemeRuntime = create<ThemeState>((set) => ({
  mode: 'light',
  primaryColor: '#1e3a8a', // campus.blue
  radius: '0.5rem',
  setMode: (mode) => set({ mode }),
  setPrimaryColor: (color) => set({ primaryColor: color }),
  setRadius: (radius) => set({ radius }),
}));
