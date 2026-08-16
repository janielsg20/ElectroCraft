import React, { useState } from 'react';
import {
  Layout,
  Layers,
  Database,
  Zap,
  Bot,
  Settings,
  HelpCircle,
  Play,
  Eye,
  Share2,
  Search,
  Plus,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
  Box,
  FileJson,
  Users
} from 'lucide-react';
import {
  Button,
  Separator,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn
} from '@electrocraft/design-system';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-none hover:bg-accent",
          active && "bg-accent border-l-2 border-primary"
        )}
        onClick={onClick}
      >
        <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-muted-foreground")} />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="right">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export const AppShell = () => {
  const [activeSection, setActiveSection] = useState('screens');

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">

        {/* 1. Global Sidebar (Izquierda) */}
        <aside className="w-12 border-r flex flex-col items-center py-4 bg-muted/30">
          <div className="mb-4">
            <Box className="w-8 h-8 text-primary" />
          </div>
          <SidebarItem icon={Layout} label="Pantallas" active={activeSection === 'screens'} onClick={() => setActiveSection('screens')} />
          <SidebarItem icon={Database} label="Datos" active={activeSection === 'data'} onClick={() => setActiveSection('data')} />
          <SidebarItem icon={Zap} label="Automatizaciones" active={activeSection === 'actions'} onClick={() => setActiveSection('actions')} />
          <SidebarItem icon={Bot} label="Generar con IA" active={activeSection === 'ai'} onClick={() => setActiveSection('ai')} />
          <SidebarItem icon={Users} label="Usuarios y Permisos" active={activeSection === 'auth'} onClick={() => setActiveSection('users')} />

          <div className="mt-auto flex flex-col items-center gap-2 pb-2">
            <SidebarItem icon={HelpCircle} label="Ayuda" active={activeSection === 'help'} onClick={() => setActiveSection('help')} />
            <SidebarItem icon={Settings} label="Configuración" active={activeSection === 'settings'} onClick={() => setActiveSection('settings')} />
          </div>
        </aside>

        <div className="flex-1 flex flex-col">

          {/* 2. Topbar */}
          <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
            <div className="flex items-center gap-4">
              <div className="font-semibold text-sm flex items-center gap-2">
                <span>Mi App Increíble</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center bg-muted rounded-md p-1">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Monitor className="w-3 h-3" /> Web
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1 bg-background shadow-sm">
                  <Smartphone className="w-3 h-3 text-primary" /> iOS
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                  <Tablet className="w-3 h-3" /> Android
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 mr-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Sync Ready</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" /> Vista previa
              </Button>
              <Button size="sm" className="gap-2 bg-primary">
                <Share2 className="w-4 h-4" /> Desplegar
              </Button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">

            {/* 3. Navigation Panel */}
            <aside className="w-64 border-r flex flex-col bg-muted/10">
              <div className="p-4 flex items-center justify-between border-b bg-background/50">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estructura</h3>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {['Inicio', 'Dashboard', 'Perfil', 'Configuración'].map((screen, idx) => (
                    <Button
                      key={screen}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal h-8 text-sm px-2",
                        idx === 0 && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                      {screen}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-muted/20">
                 <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20 text-primary">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-medium italic">Asistente IA activo</span>
                 </div>
              </div>
            </aside>

            {/* 4. Canvas Central (Editor) */}
            <main className="flex-1 bg-muted/20 p-8 flex items-center justify-center overflow-auto relative">
               <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <Tabs defaultValue="design">
                    <TabsList>
                      <TabsTrigger value="design">Diseño</TabsTrigger>
                      <TabsTrigger value="logic">Lógica</TabsTrigger>
                      <TabsTrigger value="code">Código</TabsTrigger>
                    </TabsList>
                  </Tabs>
               </div>

               {/* Mock Visual Editor */}
               <div className="w-[375px] h-[667px] bg-background shadow-2xl rounded-[40px] border-[8px] border-slate-900 overflow-hidden relative flex flex-col">
                  <div className="h-6 w-full bg-slate-900 flex justify-center items-end pb-1">
                    <div className="w-20 h-4 bg-slate-800 rounded-full" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                     <div className="h-10 w-32 bg-primary/20 rounded-lg animate-pulse" />
                     <div className="h-40 w-full bg-muted rounded-xl" />
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-muted rounded-lg" />
                        <div className="h-24 bg-muted rounded-lg" />
                     </div>
                     <div className="mt-auto mb-4 h-12 w-full bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        Botón Principal
                     </div>
                  </div>
               </div>

               {/* Grid background pattern */}
               <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </main>

            {/* 5. Property Inspector (Derecha) */}
            <aside className="w-80 border-l flex flex-col bg-background">
              <Tabs defaultValue="props" className="flex flex-col h-full">
                <div className="px-4 pt-2 border-b">
                  <TabsList className="w-full bg-transparent justify-start gap-4 p-0 h-10 border-b-0">
                    <TabsTrigger value="props" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none">Propiedades</TabsTrigger>
                    <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none">Estilo</TabsTrigger>
                    <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none">Eventos</TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1">
                  <TabsContent value="props" className="p-4 m-0 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Identificador</label>
                      <div className="p-2 bg-muted rounded text-xs font-mono">btn_primary_home</div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Texto del Botón</label>
                      <input className="w-full p-2 bg-muted/50 border rounded text-sm" defaultValue="Continuar" />
                    </div>
                  </TabsContent>
                  <TabsContent value="style" className="p-4 m-0">
                     <p className="text-xs text-muted-foreground italic text-center py-20">Selecciona un elemento para ver sus estilos.</p>
                  </TabsContent>
                  <TabsContent value="events" className="p-4 m-0">
                     <Button variant="outline" className="w-full text-xs gap-2 border-dashed">
                        <Plus className="w-3 h-3" /> Añadir Acción
                     </Button>
                  </TabsContent>
                </ScrollArea>

                <div className="p-4 border-t bg-muted/10 space-y-2">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Capas</span>
                      <Search className="w-3 h-3 text-muted-foreground" />
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 p-1 text-xs hover:bg-accent rounded cursor-pointer">
                         <Box className="w-3 h-3" /> Container
                      </div>
                      <div className="flex items-center gap-2 p-1 text-xs pl-4 hover:bg-accent rounded cursor-pointer text-primary bg-primary/5 border-l-2 border-primary">
                         <Zap className="w-3 h-3" /> Button
                      </div>
                   </div>
                </div>
              </Tabs>
            </aside>

          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
