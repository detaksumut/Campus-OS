import React, { createContext, useContext, useEffect, useState } from 'react';
import { INavigationRuntime, NavigationService } from '@campus-os/presentation-core';

// NavigationAdapter handles the integration with external routers
export interface NavigationAdapter {
  navigate(path: string): void;
  replace(path: string): void;
  back(): void;
  current(): string;
  onNavigate(callback: (path: string) => void): () => void;
}

const NavigationContext = createContext<INavigationRuntime | null>(null);

export const ReactNavigationRuntime: React.FC<{
  adapter: NavigationAdapter;
  navigationService: NavigationService;
  children: React.ReactNode;
}> = ({ adapter, navigationService, children }) => {
  const [currentPath, setCurrentPath] = useState(adapter.current());

  useEffect(() => {
    const unsubscribe = adapter.onNavigate((path) => {
      setCurrentPath(path);
    });
    return () => unsubscribe();
  }, [adapter]);

  // The ABI implementation respects the INavigationRuntime kernel contract
  const runtime: INavigationRuntime = {
    navigate: (path) => adapter.navigate(path),
    replace: (path) => adapter.replace(path),
    back: () => adapter.back(),
    current: () => currentPath
  };

  return (
    <NavigationContext.Provider value={runtime}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within ReactNavigationRuntime');
  return context;
};
