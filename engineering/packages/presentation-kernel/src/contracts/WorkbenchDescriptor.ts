export type ZoneType = 'Navigation' | 'Sidebar' | 'Content' | 'Inspector' | 'Footer' | 'Overlay' | 'Dialog';

export interface ZoneDescriptor {
  id: string;
  type: ZoneType;
  name: string;
}

export interface WorkbenchDescriptor {
  id: string;
  name: string;
  zones: ZoneDescriptor[];
}
