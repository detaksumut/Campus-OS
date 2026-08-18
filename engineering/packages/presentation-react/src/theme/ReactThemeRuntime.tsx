import React, { useEffect } from 'react';
import { ThemeService } from '@campus-os/presentation-core';

export const ReactThemeRuntime: React.FC<{
  themeService: ThemeService;
  children: React.ReactNode;
}> = ({ themeService, children }) => {
  
  useEffect(() => {
    const activeTheme = themeService.getActiveTheme();
    if (!activeTheme) return;

    // The ABI Theme Tokens -> CSS Variables mapper
    const root = document.documentElement;
    
    // E.g., { "color.primary": "#0052cc", "spacing.md": "16px" }
    Object.entries(activeTheme.tokens).forEach(([token, value]) => {
      const cssVariable = `--${token.replace(/\./g, '-')}`;
      root.style.setProperty(cssVariable, value as string);
    });

  }, [themeService]);

  return <>{children}</>;
};
