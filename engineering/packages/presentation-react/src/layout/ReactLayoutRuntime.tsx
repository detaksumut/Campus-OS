import React from 'react';
import { PageService } from '@campus-os/presentation-core';
import { ReactRendererRuntime } from '../renderer/ReactRendererRuntime';

export const ReactLayoutRuntime: React.FC<{
  pageService: PageService;
  route: string;
}> = ({ pageService, route }) => {
  const compiledPage = pageService.findByRoute(route);
  
  if (!compiledPage) {
    return <div>Page not found for {route}</div>;
  }

  const { layout } = compiledPage;

  if (layout.type === 'sidebar') {
    return (
      <div className="layout-sidebar-container" style={{ display: 'flex' }}>
        <aside style={{ width: layout.sidebar?.width || 250 }}>
          <ReactRendererRuntime nodes={layout.zones.sidebar} />
        </aside>
        <main style={{ flex: 1 }}>
          <header style={{ height: layout.header?.height || 60 }}>
            <ReactRendererRuntime nodes={layout.zones.header} />
          </header>
          <section>
            <ReactRendererRuntime nodes={layout.zones.content} />
          </section>
        </main>
      </div>
    );
  }

  // Fallback flat layout
  return <ReactRendererRuntime nodes={layout.zones.content} />;
};
