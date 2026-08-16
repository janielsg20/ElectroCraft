export interface HelpDescriptor {
  id: string;
  title: string;
  description: string;
  link?: string;
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

// M03.1 - M03.3 Initial registration
helpRegistry.register({
  id: 'help.studio.shell',
  title: 'Interfaz del Studio',
  description: 'Guía rápida sobre las áreas principales del editor de ElectroCraft: Sidebar global, Canvas central e Inspector de propiedades.'
});

helpRegistry.register({
  id: 'help.studio.sidebar',
  title: 'Barra de Navegación',
  description: 'Accede a las herramientas de construcción, datos, lógica y publicación desde el panel izquierdo.'
});

helpRegistry.register({
  id: 'help.studio.canvas',
  title: 'Editor Visual',
  description: 'Arrastra componentes y diseña tu aplicación en tiempo real con previsualización multi-dispositivo.'
});
