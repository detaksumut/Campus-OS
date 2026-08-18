import { ComponentType } from 'react';

export interface LayoutDefinition {
  id: string;
  component: ComponentType<{ children?: React.ReactNode }>;
  regions: string[]; // e.g., ['header', 'hero', 'main.left', 'sidebar.right', 'footer']
}

export class LayoutRegistry {
  private layouts = new Map<string, LayoutDefinition>();

  public register(layout: LayoutDefinition): void {
    if (this.layouts.has(layout.id)) {
      throw new Error(`Layout with ID ${layout.id} is already registered.`);
    }
    this.layouts.set(layout.id, layout);
  }

  public get(id: string): LayoutDefinition | undefined {
    return this.layouts.get(id);
  }
}

export const globalLayoutRegistry = new LayoutRegistry();
