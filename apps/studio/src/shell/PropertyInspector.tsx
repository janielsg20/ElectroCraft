import React from 'react';
import {
  Type,
  Move,
  Palette,
  Zap,
  ChevronDown,
  MousePointer2,
  Layers,
  Eye,
  Info,
  Smartphone,
  Monitor,
  Tablet,
  Settings2
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
  Button,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@electrocraft/design-system';

interface PropertyInspectorProps {
  selectedElement: string | null;
}

export const PropertyInspector = ({ selectedElement }: PropertyInspectorProps) => {
  if (!selectedElement) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/20">
            <MousePointer2 className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border flex items-center justify-center shadow-sm">
            <Info className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-widest text-foreground/80">Panel del Inspector</h3>
          <p className="text-[11px] text-muted-foreground px-4 leading-relaxed font-medium">
            Selecciona cualquier componente en el <span className="text-primary">Lienzo Central</span> para configurar sus estilos, datos y comportamiento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="props" className="flex flex-col h-full bg-background">
      <div className="px-4 pt-2 border-b bg-muted/5">
        <TabsList className="w-full bg-transparent justify-start gap-8 p-0 h-10 border-b-0">
          <TabsTrigger value="props" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Propiedades</TabsTrigger>
          <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Estilo</TabsTrigger>
          <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-[10px] font-black uppercase tracking-widest">Eventos</TabsTrigger>
        </TabsList>
      </div>

      <ScrollArea className="flex-1">
        <TabsContent value="props" className="p-0 m-0">
          <div className="p-6 space-y-8">
            {/* Header Identifier - Primary but subtle */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest">ID del Componente</label>
                <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">Borrador</span>
              </div>
              <Input className="h-9 font-mono text-[11px] bg-muted/30 border-none shadow-inner" defaultValue={selectedElement} />
            </div>

            <Separator className="opacity-30" />

            <section className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/80">Contenido</h4>
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-primary/70" /> Texto Visible
                    </label>
                    <Input className="h-10 text-sm focus:ring-1 focus:ring-primary/30" defaultValue="Crear Nueva Orden" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/10">
                    <div className="space-y-0.5">
                      <label className="text-[11px] font-bold">Estado Visible</label>
                      <p className="text-[10px] text-muted-foreground">Mostrar en renderizado inicial</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
               </div>
            </section>

            <Separator className="opacity-30" />

            {/* Advanced Metadata - Progressive Disclosure */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced" className="border-none">
                <AccordionTrigger className="py-2 hover:no-underline text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-[10px] uppercase font-black tracking-widest">Opciones Avanzadas</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4 px-1">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Atributos ARIA</label>
                    <Input className="h-8 text-xs font-mono" placeholder="aria-label..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Clases Custom (Tailwind)</label>
                    <Input className="h-8 text-xs font-mono" placeholder="p-4 shadow-xl..." />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="style" className="p-0 m-0">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
               <Eye className="w-4 h-4 text-blue-600" />
               <p className="text-[11px] font-medium text-blue-800 leading-tight">
                 Estás editando el estilo global. Usa <span className="font-bold">Overrides</span> para cambios específicos por dispositivo.
               </p>
            </div>

            <Accordion type="multiple" defaultValue={['visual']} className="w-full">
              <AccordionItem value="visual" className="border-none">
                <AccordionTrigger className="py-4 hover:no-underline border-b">
                  <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5" /> Diseño Visual
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-6 space-y-8">
                  {/* Colors - Primary grouping */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-bold">Colores base</span>
                        <Settings2 className="w-3 h-3 text-muted-foreground/50" />
                     </div>
                     <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/5 group cursor-pointer hover:border-primary/40 transition-colors">
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 rounded-lg bg-primary shadow-sm" />
                             <span className="text-xs font-medium uppercase tracking-tighter">Color de Fondo</span>
                           </div>
                           <span className="text-[10px] font-mono text-muted-foreground">#007BFF</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/5 group cursor-pointer hover:border-primary/40 transition-colors">
                           <div className="flex items-center gap-3">
                             <div className="w-6 h-6 rounded-lg bg-slate-950 border border-white/10" />
                             <span className="text-xs font-medium uppercase tracking-tighter">Color de Texto</span>
                           </div>
                           <span className="text-[10px] font-mono text-muted-foreground">#020617</span>
                        </div>
                     </div>
                  </div>

                  {/* Effects - Progressive grouping */}
                  <div className="space-y-6">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-[11px] font-bold">Esquinas (Radio)</label>
                          <span className="text-[10px] font-black bg-muted px-1.5 py-0.5 rounded">16px</span>
                        </div>
                        <Slider defaultValue={[16]} max={48} step={1} />
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-[11px] font-bold">Opacidad</label>
                          <span className="text-[10px] font-black bg-muted px-1.5 py-0.5 rounded">100%</span>
                        </div>
                        <Slider defaultValue={[100]} max={100} step={1} />
                     </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="platform" className="border-none mt-2">
                <AccordionTrigger className="py-3 hover:no-underline opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase font-black tracking-widest">Overrides de Dispositivo</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-2">
                   <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="flex-1 h-12 flex-col gap-1 rounded-xl">
                        <Smartphone className="w-3.5 h-3.5" /> <span className="text-[9px] uppercase font-bold">iOS</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-12 flex-col gap-1 rounded-xl opacity-40">
                        <Monitor className="w-3.5 h-3.5" /> <span className="text-[9px] uppercase font-bold">Web</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-12 flex-col gap-1 rounded-xl opacity-40">
                        <Tablet className="w-3.5 h-3.5" /> <span className="text-[9px] uppercase font-bold">Android</span>
                      </Button>
                   </div>
                   <p className="text-[10px] text-muted-foreground text-center py-4 italic">Añade estilos específicos para optimizar la UX en cada plataforma.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="events" className="p-0 m-0">
           <div className="p-6 space-y-8 animate-in slide-in-from-bottom-2 duration-300">
              <div className="p-8 rounded-[32px] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center text-center gap-4 transition-all hover:bg-primary/10 group cursor-pointer">
                 <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-primary fill-primary/10" />
                 </div>
                 <div className="space-y-2">
                   <h4 className="text-sm font-black uppercase tracking-tight text-primary">Nuevo Workflow</h4>
                   <p className="text-[11px] text-muted-foreground px-6 font-medium leading-relaxed">
                     Configura acciones inteligentes: navegar, guardar datos o ejecutar procesos en la nube.
                   </p>
                 </div>
                 <Button size="sm" className="rounded-full px-6 font-black text-[10px] uppercase tracking-wider h-8">
                   <Plus className="w-3.5 h-3.5 mr-1.5" /> Añadir
                 </Button>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Eventos del Sistema
                 </h4>
                 <div className="space-y-2">
                   {[
                     { name: 'Al hacer clic', desc: 'Click / Tap standard' },
                     { name: 'Doble pulsación', desc: 'Doble tap rápido' },
                     { name: 'Pulsación larga', desc: 'Long press (> 500ms)' }
                   ].map(evt => (
                     <div key={evt.name} className="p-3.5 rounded-2xl border bg-muted/5 flex items-center justify-between group hover:border-primary/20 transition-colors cursor-pointer">
                       <div className="flex flex-col gap-0.5">
                         <span className="text-[11px] font-black">{evt.name}</span>
                         <span className="text-[10px] text-muted-foreground font-medium">{evt.desc}</span>
                       </div>
                       <Plus className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                     </div>
                   ))}
                 </div>
              </div>
           </div>
        </TabsContent>
      </ScrollArea>

      {/* Dynamic Layer Tree Footer */}
      <div className="p-4 border-t bg-muted/10 space-y-4 shrink-0">
         <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">Árbol de Capas</span>
            <div className="flex gap-2">
               <TooltipProvider>
                 <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg hover:bg-background border border-transparent hover:border-border"><Plus className="w-3 h-3 text-muted-foreground"/></Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-[10px]">Añadir hijo</TooltipContent>
                 </Tooltip>
               </TooltipProvider>
            </div>
         </div>
         <div className="space-y-1.5 max-h-40 overflow-auto pr-1 custom-scrollbar">
            <div
              className={cn(
                "flex items-center gap-2.5 p-2 text-[11px] hover:bg-background rounded-xl cursor-pointer transition-all border border-transparent hover:border-border group",
                selectedElementId === 'hero_card' ? "bg-background border-border shadow-sm" : ""
              )}
              onClick={() => selectedElementId === 'hero_card' ? setSelectedElementId(null) : setSelectedElementId('hero_card')}
            >
               <Layers className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
               <span className={cn("font-medium", selectedElementId === 'hero_card' && "font-black text-primary")}>hero_card</span>
               {selectedElementId === 'hero_card' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </div>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2 text-[11px] hover:bg-background rounded-xl cursor-pointer transition-all border border-transparent hover:border-border group ml-4",
                selectedElementId === 'order_button' ? "bg-background border-border shadow-sm" : ""
              )}
              onClick={() => selectedElementId === 'order_button' ? setSelectedElementId(null) : setSelectedElementId('order_button')}
            >
               <Zap className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
               <span className={cn("font-medium", selectedElementId === 'order_button' && "font-black text-primary")}>order_button</span>
               {selectedElementId === 'order_button' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </div>
         </div>
      </div>
    </Tabs>
  );
};
