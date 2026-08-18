import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackId?: string;
  widgetId: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class WidgetErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[WidgetErrorBoundary] Caught error in widget ${this.props.widgetId}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 dark:bg-red-900/20 dark:border-red-900/50 flex flex-col items-center justify-center text-center shadow-sm">
          <svg className="w-8 h-8 mb-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="font-bold text-sm mb-1">Widget Failed to Load</div>
          <div className="text-xs opacity-80 font-mono bg-red-100/50 dark:bg-red-950 px-2 py-1 rounded max-w-full truncate">{this.state.error?.message || 'Unknown error'}</div>
        </div>
      );
    }

    return this.props.children;
  }
}
