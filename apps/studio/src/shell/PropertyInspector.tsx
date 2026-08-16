import React from 'react';
import {
  Type,
  Move,
  Palette,
  Zap,
  ChevronDown,
  MousePointer2,
  Layers
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
  Slider,
  Switch,
  Separator,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button
} from '@electrocraft/design-system';

interface PropertyInspectorProps {
  selectedElement: string | null;
}

export const PropertyInspector = ({ selectedElement }: PropertyInspectorProps) => {
  if (!selectedElement) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground/30">
          <MousePointer2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold">Sin selección</p>
          <p className="text-[11px] text-muted-foreground px-6">
            Selecciona un elemento en el canvas para editar sus propiedades.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="props" className="flex flex-col h-full">
      <div className="px-4 pt-2 border-b bg-muted/5">
        <TabsList className="w-full bg-transparent justify-start gap-6 p-0 h-10 border-b-0">
          <TabsTrigger value="props" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Propiedades</TabsTrigger>
          <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Estilo</TabsTrigger>
          <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Eventos</TabsTrigger>
        </TabsList>
      </div>

      <ScrollArea className="flex-1">
        <TabsContent value="props" className="p-0 m-0">
          <div className="p-5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest">Identificador</label>
              <Input className="h-8 font-mono text-[11px]" defaultValue={selectedElement} />
            </div>

            <Separator className="opacity-50" />

            <Accordion type="multiple" defaultValue={['basic']} className="w-full">
              <AccordionItem value="basic" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest flex items-center gap-2">
                    <Type className="w-3 h-3" /> Contenido Básico
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold">Texto / Etiqueta</label>
                    <Input className="h-9 text-sm" defaultValue="Crear Nueva Orden" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold">Visible al inicio</label>
                    <Switch defaultChecked />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="style" className="p-0 m-0">
          <Accordion type="multiple" defaultValue={['layout', 'visual']} className="w-full">
            <AccordionItem value="layout" className="px-5 border-b">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest flex items-center gap-2">
                  <Move className="w-3.5 h-3.5" /> Layout & Tamaño
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground">Ancho</label>
                    <Input className="h-8 text-xs" defaultValue="100%" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground">Alto</label>
                    <Input className="h-8 text-xs" defaultValue="auto" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold">Opacidad</label>
                    <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded">100%</span>
                  </div>
                  <Slider defaultValue={[100]} max={100} step={1} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="visual" className="px-5 border-b">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5" /> Apariencia
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold">Radio de Borde</label>
                    <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded">16px</span>
                  </div>
                  <Slider defaultValue={[16]} max={40} step={1} />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold">Color de Fondo</label>
                  <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/20">
                    <div className="w-4 h-4 rounded-sm bg-primary shadow-sm" />
                    <span className="text-xs font-mono">#007BFF</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="events" className="p-5 m-0 space-y-6">
           <div className="p-6 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center text-center gap-3 transition-all hover:bg-primary/10 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-tight text-primary">Añadir Workflow</p>
                <p className="text-[11px] text-muted-foreground/80 font-medium px-4">Configura lo que ocurre al interactuar con este elemento.</p>
              </div>
           </div>

           <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest">Triggers Disponibles</h4>
              <div className="space-y-1">
                {['Al hacer clic', 'Al cargar', 'Al cambiar valor'].map(t => (
                  <div key={t} className="p-2 text-xs border rounded-lg bg-muted/10 flex items-center justify-between">
                    <span>{t}</span>
                    <Plus className="w-3 h-3 text-muted-foreground" />
                  </div>
                ))}
              </div>
           </div>
        </TabsContent>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/10 space-y-4 shrink-0">
         <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Árbol de Capas</span>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background"><Plus className="w-3.5 h-3.5"/></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background"><Layers className="w-3.5 h-3.5"/></Button>
            </div>
         </div>
         <div className="space-y-1.5 max-h-40 overflow-auto pr-1">
            <div className="flex items-center gap-2.5 p-2 text-[11px] hover:bg-background rounded-lg cursor-pointer transition-all border border-transparent hover:border-border">
               <Layers className="w-4 h-4 text-muted-foreground" />
               <span className="font-bold">Page_Root</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 text-[11px] bg-primary/10 text-primary rounded-lg cursor-pointer font-black border border-primary/20 shadow-sm ml-4">
               <Zap className="w-4 h-4" /> Order_Button
            </div>
         </div>
      </div>
    </Tabs>
  );
};
