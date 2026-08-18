import { create } from 'zustand';

interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface CopilotState {
  isOpen: boolean;
  messages: CopilotMessage[];
  togglePanel: () => void;
  addMessage: (msg: Omit<CopilotMessage, 'id'>) => void;
}

export const useCopilotRuntime = create<CopilotState>((set) => ({
  isOpen: true,
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: 'Halo Pak Direktur, Ada beberapa insight penting untuk Anda hari ini. Sinkronisasi PDDIKTI berhasil.'
    }
  ],
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: Date.now().toString() }]
  })),
}));
