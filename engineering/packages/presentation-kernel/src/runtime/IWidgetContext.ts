import { ActionRuntime } from './ActionRuntime';

export interface IWidgetContext {
  currentUser: {
    id: string;
    role: string;
  };
  currentTenant: string;
  permissions: string[];
  theme: 'light' | 'dark' | 'system';
  locale: string;
  workbenchId: string;
  zoneId: string;
  actionRuntime: ActionRuntime;
}
