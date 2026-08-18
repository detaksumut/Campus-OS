import { RenderedMessage } from '../contracts/INotificationService';

export class TemplateRegistry {
  private templates: Record<string, Record<string, string>> = {
    'welcome-email': {
      'id-ID': 'Selamat datang di Campus OS, {{name}}!',
      'en-US': 'Welcome to Campus OS, {{name}}!'
    },
    'password-reset': {
      'id-ID': 'Halo {{name}}, klik link ini untuk mereset password Anda.',
      'en-US': 'Hello {{name}}, click this link to reset your password.'
    }
  };

  getTemplate(templateId: string, locale: string): string {
    const group = this.templates[templateId];
    if (!group) throw new Error(`Template [${templateId}] not found in Registry.`);
    
    // Fallback to en-US if locale is missing
    return group[locale] || group['en-US'] || group[Object.keys(group)[0]];
  }
}

export class TemplateRenderer {
  private registry = new TemplateRegistry();

  render(templateId: string, locale: string, context: any): RenderedMessage {
    let rawTemplate = this.registry.getTemplate(templateId, locale);
    
    // Naive mock compilation (e.g. replacing {{name}})
    for (const key of Object.keys(context)) {
      rawTemplate = rawTemplate.replace(new RegExp(`{{${key}}}`, 'g'), context[key]);
    }

    return {
      subject: `Notification: ${templateId}`,
      body: rawTemplate,
      metadata: { locale, timestamp: new Date().toISOString() }
    };
  }
}
