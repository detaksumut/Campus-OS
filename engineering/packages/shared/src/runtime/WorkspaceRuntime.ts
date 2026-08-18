import { create } from 'zustand';

export interface WorkspaceTab {
  id: string;
  title: string;
  component: string;
  active: boolean;
}

interface WorkspaceState {
  tabs: WorkspaceTab[];
  activeTabId: string | null;
  addTab: (tab: Omit<WorkspaceTab, 'active'>) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
}

export const useWorkspaceRuntime = create<WorkspaceState>((set) => ({
  tabs: [],
  activeTabId: null,
  addTab: (tab) => set((state) => {
    const exists = state.tabs.find(t => t.id === tab.id);
    if (exists) {
      return { activeTabId: tab.id };
    }
    return {
      tabs: [...state.tabs, { ...tab, active: false }],
      activeTabId: tab.id,
    };
  }),
  closeTab: (id) => set((state) => ({
    tabs: state.tabs.filter(t => t.id !== id),
    activeTabId: state.activeTabId === id 
      ? (state.tabs.length > 1 ? state.tabs[0].id : null) 
      : state.activeTabId
  })),
  setActiveTab: (id) => set({ activeTabId: id }),
}));
