import React, { useState } from 'react';
import {
  Search,
  Layout,
  Type,
  Image as ImageIcon,
  MousePointer2,
  Database,
  Zap,
  Box,
  Columns,
  Rows,
  Grid3X3,
  CreditCard,
  MessageSquare,
  Navigation,
  CheckSquare,
  ArrowRightCircle,
  Star
} from 'lucide-react';
import {
  Input,
  ScrollArea,
  Button,
  Badge,
  cn,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Separator
} from '@electrocraft/design-system';

interface PaletteItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  kind: 'CORE' | 'PRESET' | 'BLOCK';
  description: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  // Layout
  { id: 'section', name: 'Sección', category: 'Layout', icon: Layout, kind: 'PRESET', description: 'Bloque estructural de ancho completo.' },
  { id: 'container', name: 'Contenedor', category: 'Layout', icon: Box, kind: 'CORE', description: 'Caja básica para agrupar elementos.' },
  { id: 'grid', name: 'Cuadrícula', category: 'Layout', icon: Grid3X3, kind: 'PRESET', description: 'Distribución en rejilla adaptable.' },

  // Basic
  { id: 'text', name: 'Texto', category: 'Básicos', icon: Type, kind: 'CORE', description: 'Etiqueta de texto simple.' },
  { id: 'button', name: 'Botón', category: 'Básicos', icon: MousePointer2, kind: 'CORE', description: 'Acción interactiva primaria.' },
  { id: 'image', name: 'Imagen', category: 'Básicos', icon: ImageIcon, kind: 'CORE', description: 'Recurso visual o fotografía.' },

  // Data
  { id: 'list', name: 'Listado', category: 'Datos', icon: Database, kind: 'CORE', description: 'Muestra una colección de registros.' },
  { id: 'dyn_text', name: 'Campo Dinámico', category: 'Datos', icon: Zap, kind: 'PRESET', description: 'Vinculado a una fuente de datos.' },

  // Forms
  { id: 'input', name: 'Campo Texto', category: 'Formularios', icon: CheckSquare, kind: 'CORE', description: 'Entrada de datos del usuario.' },
  { id: 'submit', name: 'Enviar', category: 'Formularios', icon: ArrowRightCircle, kind: 'PRESET', description: 'Botón de envío de formulario.' },

  // Blocks
  { id: 'card', name: 'Tarjeta', category: 'Bloques', icon: CreditCard, kind: 'BLOCK', description: 'Contenedor con sombra y padding.' },
  { id: 'testimonial', name: 'Testimonio', category: 'Bloques', icon: MessageSquare, kind: 'BLOCK', description: 'Cita de usuario con avatar.' }
];

export const ComponentPalette = () => {
  const [search, setSearch] = useState('');

  const categories = Array.from(new Set(PALETTE_ITEMS.map(item => item.category)));

  const filteredItems = PALETTE_ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b space-y-4 bg-muted/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar componentes..."
            className="pl-9 h-9 bg-background/50 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
           <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Catálogo</span>
           <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-primary"><Star className="w-3.5 h-3.5" /></Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {search ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 p-2">
              {filteredItems.map(item => <PaletteCard key={item.id} item={item} />)}
            </div>
          ) : (
            <Accordion type="multiple" defaultValue={['Layout', 'Básicos']} className="w-full">
              {categories.map(cat => (
                <AccordionItem key={cat} value={cat} className="border-none">
                  <AccordionTrigger className="px-3 py-3 hover:no-underline hover:bg-muted/30 rounded-lg transition-colors">
                    <span className="text-xs font-bold text-foreground/70">{cat}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 px-1">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                      {PALETTE_ITEMS.filter(i => i.category === cat).map(item => (
                        <PaletteCard key={item.id} item={item} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-primary/5">
         <p className="text-[10px] text-muted-foreground text-center font-medium leading-relaxed">
           ¿No encuentras lo que buscas? <br />
           <span className="text-primary font-bold cursor-pointer hover:underline">Pídele a Gemini que lo cree</span>
         </p>
      </div>
    </div>
  );
};

const PaletteCard = ({ item }: { item: PaletteItem }) => {
  const Icon = item.icon;
  return (
    <div className="p-3 border rounded-xl bg-background hover:border-primary/40 hover:shadow-md transition-all cursor-grab group active:cursor-grabbing">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
        </div>
        <Badge variant="outline" className="text-[8px] h-4 px-1 opacity-40 group-hover:opacity-100">{item.kind}</Badge>
      </div>
      <div className="space-y-0.5">
        <h5 className="text-[11px] font-black tracking-tight">{item.name}</h5>
        <p className="text-[9px] text-muted-foreground leading-tight line-clamp-1 group-hover:line-clamp-none transition-all">{item.description}</p>
      </div>
    </div>
  );
};
