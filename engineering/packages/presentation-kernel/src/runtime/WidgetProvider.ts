export interface IWidgetProvider {
  resolve(widgetId: string): Promise<any>;
}

// In real implementation, this maps widgetIds to lazy import paths
const localComponentRegistry: Record<string, () => Promise<any>> = {
  'RegistrationHeroWidget': () => import('../../../domains/siakad/src/submodules/registration/src/presentation/components/RegistrationHeroWidget'),
  'RegistrationKPIWidget': () => import('../../../domains/siakad/src/submodules/registration/src/presentation/components/RegistrationKPIWidget'),
};

export class LocalWidgetProvider implements IWidgetProvider {
  async resolve(widgetId: string): Promise<any> {
    console.log(`[LocalWidgetProvider] Resolving ${widgetId}...`);
    const loader = localComponentRegistry[widgetId];
    if (!loader) {
      throw new Error(`Local widget ${widgetId} not found in registry`);
    }
    return loader; // Returns the dynamic import function for React.lazy
  }
}
