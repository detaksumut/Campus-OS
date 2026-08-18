import React, { Suspense } from 'react';
import { ReactWidgetRuntime } from '../widget/ReactWidgetRuntime';
import { ReactFormRuntime } from '../form/ReactFormRuntime';
import { ReactGridRuntime } from '../grid/ReactGridRuntime';

export interface RenderNode {
  type: 'widget' | 'form' | 'grid' | 'html';
  id?: string;
  config?: any;
}

export const ReactRendererRuntime: React.FC<{ nodes: RenderNode[] }> = ({ nodes }) => {
  if (!nodes || nodes.length === 0) return null;

  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case 'widget':
            return <ReactWidgetRuntime key={i} widgetId={node.id!} />;
          case 'form':
            return <ReactFormRuntime key={i} formId={node.id!} config={node.config} />;
          case 'grid':
            return <ReactGridRuntime key={i} gridId={node.id!} config={node.config} />;
          case 'html':
            return <div key={i} dangerouslySetInnerHTML={{ __html: node.config?.html }} />;
          default:
            console.warn(`[Renderer] Unsupported node type: ${node.type}`);
            return null;
        }
      })}
    </>
  );
};
