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

// F03 Initial registrations
helpRegistry.register({
  id: 'screens',
  titleKey: 'help:sections.screens.title',
  shortKey: 'help:sections.screens.short',
  longKey: 'help:sections.screens.long'
});

helpRegistry.register({
  id: 'data_sources',
  titleKey: 'help:sections.data_sources.title',
  shortKey: 'help:sections.data_sources.short',
  longKey: 'help:sections.data_sources.long'
});

helpRegistry.register({
  id: 'ai_generate',
  titleKey: 'help:sections.ai_generate.title',
  shortKey: 'help:sections.ai_generate.short',
  longKey: 'help:sections.ai_generate.long'
});
