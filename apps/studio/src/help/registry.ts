export interface HelpDescriptor {
  id: string;
  titleKey: string;
  shortKey: string;
  longKey?: string;
  relatedIds?: string[];
  learnMoreRef?: string;
}

class HelpRegistry {
  private descriptors: Map<string, HelpDescriptor> = new Map();

  register(descriptor: HelpDescriptor) {
    this.descriptors.set(descriptor.id, descriptor);
  }

  get(id: string): HelpDescriptor | undefined {
    return this.descriptors.get(id);
  }

  getAll(): HelpDescriptor[] {
    return Array.from(this.descriptors.values());
  }
}

export const helpRegistry = new HelpRegistry();

// Final F03 registrations
const helpItems: HelpDescriptor[] = [
  { id: 'screens', titleKey: 'help:sections.screens.title', shortKey: 'help:sections.screens.short', longKey: 'help:sections.screens.long' },
  { id: 'components', titleKey: 'help:sections.components.title', shortKey: 'help:sections.components.short', longKey: 'help:sections.components.long' },
  { id: 'data_sources', titleKey: 'help:sections.data_sources.title', shortKey: 'help:sections.data_sources.short', longKey: 'help:sections.data_sources.long' },
  { id: 'records', titleKey: 'help:sections.records.title', shortKey: 'help:sections.records.short', longKey: 'help:sections.records.long' },
  { id: 'actions', titleKey: 'help:sections.actions.title', shortKey: 'help:sections.actions.short', longKey: 'help:sections.actions.long' },
  { id: 'ai_generate', titleKey: 'help:sections.ai_generate.title', shortKey: 'help:sections.ai_generate.short', longKey: 'help:sections.ai_generate.long' },
  { id: 'themes', titleKey: 'help:sections.themes.title', shortKey: 'help:sections.themes.short', longKey: 'help:sections.themes.long' },
  { id: 'deploy', titleKey: 'help:sections.deploy.title', shortKey: 'help:sections.deploy.short', longKey: 'help:sections.deploy.long' }
];

helpItems.forEach(item => helpRegistry.register(item));
