import { IWidgetProvider, LocalWidgetProvider } from './WidgetProvider';

export class WidgetFactory {
  private providers: Map<string, IWidgetProvider> = new Map();

  constructor() {
    // Register providers
    this.providers.set('local', new LocalWidgetProvider());
    // this.providers.set('remote', new RemoteWidgetProvider());
    // this.providers.set('marketplace', new MarketplaceWidgetProvider());
  }

  async getWidget(descriptor: any): Promise<any> {
    const providerName = descriptor.provider || 'local';
    const provider = this.providers.get(providerName);
    
    if (!provider) {
      throw new Error(`Provider ${providerName} not supported for widget ${descriptor.id}`);
    }

    return provider.resolve(descriptor.id);
  }
}
