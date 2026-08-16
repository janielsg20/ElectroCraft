import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Layers,
  Database,
  Zap,
  Bot,
  Settings,
  HelpCircle,
  Eye,
  Share2,
  Plus,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
  Box,
  Users,
  Menu,
  ChevronLeft,
  ChevronRight,
  FileCode,
  Table,
  Settings2,
  Brush,
  Globe,
  Puzzle,
  ShieldCheck,
  CheckCircle2
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

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) => (
  <Tooltip delayDuration={0}>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size={collapsed ? "icon" : "default"}
        className={cn(
          "w-full rounded-none justify-start px-3 h-10 hover:bg-accent relative",
          active && "bg-accent text-primary font-medium",
          collapsed && "justify-center px-0"
        )}
        onClick={onClick}
      >
        <Icon className={cn("w-4 h-4 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
        {!collapsed && <span className="ml-3 truncate text-sm">{label}</span>}
        {active && !collapsed && <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary rounded-r-full" />}
      </Button>
    </TooltipTrigger>
    {collapsed && (
      <TooltipContent side="right" className="font-medium">
        {label}
      </TooltipContent>
    )}
  </Tooltip>
);

const SidebarGroup = ({ title, children, collapsed }: { title: string, children: React.ReactNode, collapsed?: boolean }) => (
  <div className="py-2">
    {!collapsed && (
      <h4 className="px-4 mb-1 text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">
        {title}
      </h4>
    )}
    <div className="space-y-[1px]">
      {children}
    </div>
  </div>
);

export const AppShell = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('screens');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">

        {/* 1. Global Sidebar */}
        <aside
          className={cn(
            "border-r flex flex-col bg-muted/20 transition-all duration-300 ease-in-out select-none",
            sidebarCollapsed ? "w-12" : "w-60"
          )}
        >
          <div className={cn(
            "h-14 flex items-center border-b px-3",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm tracking-tight">ElectroCraft</span>
              </div>
            )}
            {sidebarCollapsed && <Box className="w-5 h-5 text-primary" />}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <SidebarGroup title={t('shell.groups.build')} collapsed={sidebarCollapsed}>
              <SidebarItem icon={Layout} label={t('shell.items.screens')} active={activeSection === 'screens'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('screens')} />
              <SidebarItem icon={Layers} label={t('shell.items.components')} active={activeSection === 'components'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('components')} />
              <SidebarItem icon={Bot} label={t('shell.items.ai_generate')} active={activeSection === 'ai'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('ai')} />
            </SidebarGroup>

            <Separator className="mx-2 opacity-50" />

            <SidebarGroup title={t('shell.groups.data')} collapsed={sidebarCollapsed}>
              <SidebarItem icon={Table} label={t('shell.items.records')} active={activeSection === 'records'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('records')} />
              <SidebarItem icon={Database} label={t('shell.items.data_sources')} active={activeSection === 'data_sources'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('data_sources')} />
              <SidebarItem icon={FileCode} label={t('shell.items.queries')} active={activeSection === 'queries'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('queries')} />
            </SidebarGroup>

            <Separator className="mx-2 opacity-50" />

            <SidebarGroup title={t('shell.groups.logic')} collapsed={sidebarCollapsed}>
              <SidebarItem icon={Zap} label={t('shell.items.actions')} active={activeSection === 'actions'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('actions')} />
              <SidebarItem icon={Settings2} label={t('shell.items.state')} active={activeSection === 'state'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('state')} />
            </SidebarGroup>

            <Separator className="mx-2 opacity-50" />

            <SidebarGroup title={t('shell.groups.appearance')} collapsed={sidebarCollapsed}>
              <SidebarItem icon={Brush} label={t('shell.items.themes')} active={activeSection === 'themes'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('themes')} />
              <SidebarItem icon={Layers} label={t('shell.items.design_system')} active={activeSection === 'design_system'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('design_system')} />
            </SidebarGroup>

            <Separator className="mx-2 opacity-50" />

            <SidebarGroup title={t('shell.groups.publish')} collapsed={sidebarCollapsed}>
              <SidebarItem icon={Eye} label={t('shell.items.preview')} active={activeSection === 'preview'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('preview')} />
              <SidebarItem icon={Globe} label={t('shell.items.deploy')} active={activeSection === 'deploy'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('deploy')} />
            </SidebarGroup>
          </ScrollArea>

          <div className="p-2 mt-auto border-t bg-muted/10">
            <SidebarItem icon={HelpCircle} label={t('shell.items.help')} active={activeSection === 'help'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('help')} />
            <SidebarItem icon={Settings} label={t('shell.items.settings')} active={activeSection === 'settings'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('settings')} />
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">

          {/* 2. Topbar */}
          <header className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0">
            <div className="flex items-center gap-4">
              <div className="font-semibold text-sm flex items-center gap-2 cursor-pointer hover:bg-accent px-2 py-1 rounded-md transition-colors">
                <span>Mi App de Gestión</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center bg-muted/50 rounded-lg p-1">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1.5 opacity-60 hover:opacity-100">
                  <Monitor className="w-3.5 h-3.5" /> Web
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1.5 bg-background shadow-sm text-primary font-bold">
                  <Smartphone className="w-3.5 h-3.5" /> iOS
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1.5 opacity-60 hover:opacity-100">
                  <Tablet className="w-3.5 h-3.5" /> Android
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-black text-green-600 tracking-wider">Listo</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Share2 className="w-4 h-4" /> {t('shell.items.export')}
              </Button>
              <Button size="sm" className="gap-2 bg-primary h-9 px-4">
                <CheckCircle2 className="w-4 h-4" /> {t('shell.items.deploy')}
              </Button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">

            {/* 3. Sub-navigation Panel */}
            <aside className="w-64 border-r flex flex-col bg-muted/5 shrink-0 hidden lg:flex">
              <div className="h-10 px-4 flex items-center justify-between border-b bg-background/50">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                  {activeSection === 'screens' ? 'Páginas' : t(`shell.items.${activeSection}`)}
                </h3>
                <Button variant="ghost" size="icon" className="w-6 h-6 hover:bg-primary/10 hover:text-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {['Inicio', 'Listado de Clientes', 'Nueva Factura', 'Configuración de Cuenta'].map((item, idx) => (
                    <Button
                      key={item}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal h-9 text-sm px-3 group",
                        idx === 0 && "bg-primary/5 text-primary border-l-2 border-primary rounded-l-none font-medium"
                      )}
                    >
                      <Layers className="w-4 h-4 mr-2.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      {item}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-primary/5 border-primary/10">
                 <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background border border-primary/20 shadow-sm">
                    <Bot className="w-5 h-5 text-primary animate-bounce" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-primary uppercase">Gemini</span>
                      <span className="text-[11px] font-medium text-muted-foreground italic leading-tight">Sugiriendo componentes...</span>
                    </div>
                 </div>
              </div>
            </aside>

            {/* 4. Canvas Central */}
            <main className="flex-1 bg-muted/20 flex flex-col overflow-hidden relative">
               <div className="h-12 border-b bg-background/80 backdrop-blur flex items-center justify-center shrink-0 z-10">
                  <Tabs defaultValue="design">
                    <TabsList className="h-9 bg-muted/50 p-1">
                      <TabsTrigger value="design" className="text-xs px-4">Diseño</TabsTrigger>
                      <TabsTrigger value="logic" className="text-xs px-4">Lógica</TabsTrigger>
                      <TabsTrigger value="code" className="text-xs px-4">Código</TabsTrigger>
                    </TabsList>
                  </Tabs>
               </div>

               <ScrollArea className="flex-1">
                 <div className="p-12 flex items-center justify-center min-h-full">
                    {/* Device Preview Frame */}
                    <div className="w-[380px] h-[780px] bg-slate-950 shadow-[0_0_80px_-15px_rgba(0,0,0,0.3)] rounded-[60px] border-[12px] border-slate-900 overflow-hidden relative flex flex-col ring-1 ring-slate-800">
                        {/* Notch Area */}
                        <div className="h-7 w-full bg-slate-900 flex justify-center items-end pb-1 absolute top-0 z-20">
                          <div className="w-24 h-5 bg-slate-950 rounded-b-2xl" />
                        </div>

                        {/* Internal Content */}
                        <div className="bg-background flex-1 flex flex-col pt-10">
                          <header className="px-6 py-4 flex justify-between items-center border-b">
                            <h2 className="font-bold text-lg">Dashboard</h2>
                            <Users className="w-5 h-5 text-muted-foreground" />
                          </header>

                          <div className="p-6 space-y-6">
                            <div className="h-32 w-full bg-primary/10 rounded-2xl border border-primary/20 flex flex-col p-4">
                              <span className="text-xs font-bold text-primary uppercase tracking-tighter">Ventas Totales</span>
                              <span className="text-3xl font-black mt-1">$12,450.00</span>
                              <div className="mt-auto h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-primary" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="h-28 bg-muted/50 rounded-2xl border border-border/50 p-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-600 flex items-center justify-center mb-2">
                                  <Table className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Facturas</span>
                                <div className="text-xl font-bold">14</div>
                              </div>
                              <div className="h-28 bg-muted/50 rounded-2xl border border-border/50 p-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-600 flex items-center justify-center mb-2">
                                  <Zap className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Actividad</span>
                                <div className="text-xl font-bold">89%</div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="h-14 w-full bg-muted/30 rounded-xl flex items-center px-4 gap-3 border border-dashed border-muted-foreground/20">
                                <div className="w-6 h-6 rounded bg-muted animate-pulse" />
                                <div className="flex-1 h-3 bg-muted rounded animate-pulse" />
                              </div>
                              <div className="h-14 w-full bg-muted/30 rounded-xl flex items-center px-4 gap-3 border border-dashed border-muted-foreground/20 opacity-50">
                                <div className="w-6 h-6 rounded bg-muted" />
                                <div className="flex-1 h-3 bg-muted rounded" />
                              </div>
                            </div>

                            <Button className="w-full h-12 rounded-2xl text-base font-bold shadow-lg shadow-primary/25 mt-4">
                              Crear Nueva Orden
                            </Button>
                          </div>
                        </div>

                        {/* Bottom Indicator */}
                        <div className="h-1.5 w-32 bg-slate-800 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2" />
                    </div>
                 </div>
               </ScrollArea>

               {/* Grid background pattern */}
               <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
            </main>

            {/* 5. Property Inspector */}
            <aside className="w-80 border-l flex flex-col bg-background shrink-0 hidden xl:flex">
              <Tabs defaultValue="props" className="flex flex-col h-full">
                <div className="px-4 pt-2 border-b bg-muted/5">
                  <TabsList className="w-full bg-transparent justify-start gap-6 p-0 h-10 border-b-0">
                    <TabsTrigger value="props" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-xs font-bold uppercase tracking-tight">Propiedades</TabsTrigger>
                    <TabsTrigger value="style" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-xs font-bold uppercase tracking-tight">Estilo</TabsTrigger>
                    <TabsTrigger value="events" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent shadow-none px-0 text-xs font-bold uppercase tracking-tight">Eventos</TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1">
                  <TabsContent value="props" className="p-5 m-0 space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-muted-foreground/70 tracking-widest">Identificador</label>
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border text-[11px] font-mono text-primary">
                        <Box className="w-3 h-3" /> main_action_button
                      </div>
                    </div>

                    <Separator className="opacity-50" />

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-muted-foreground/70 tracking-widest">Texto</label>
                      <input className="w-full p-2.5 bg-muted/30 border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none transition-all" defaultValue="Crear Nueva Orden" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-muted-foreground/70 tracking-widest">Icono</label>
                      <Button variant="outline" className="w-full justify-between h-10 px-3 bg-muted/10">
                        <span className="text-xs">Plus (Default)</span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </div>

                    <div className="pt-4">
                      <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-orange-600">
                          <Users className="w-4 h-4" />
                          <span className="text-xs font-bold">Binding Activo</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Este elemento está vinculado a la sesión del usuario actual.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="p-5 m-0 space-y-6">
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase text-muted-foreground/70 tracking-widest">Colores</span>
                           <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-3 h-3"/></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-2 border rounded-lg flex items-center gap-2 bg-muted/20">
                              <div className="w-4 h-4 rounded bg-primary shadow-sm" />
                              <span className="text-xs font-medium">Primario</span>
                           </div>
                           <div className="p-2 border rounded-lg flex items-center gap-2 bg-muted/20">
                              <div className="w-4 h-4 rounded bg-slate-950 shadow-sm" />
                              <span className="text-xs font-medium">Texto</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase text-muted-foreground/70 tracking-widest">Tipografía</span>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Tamaño</span>
                              <span className="font-bold">16px</span>
                           </div>
                           <div className="h-1 w-full bg-muted rounded-full">
                              <div className="h-full w-1/2 bg-primary rounded-full" />
                           </div>
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="events" className="p-5 m-0">
                     <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 flex flex-col items-center text-center gap-2">
                           <Zap className="w-5 h-5 text-primary/50" />
                           <p className="text-[11px] text-muted-foreground">No hay eventos configurados para este componente.</p>
                           <Button size="sm" variant="ghost" className="text-primary text-[11px] font-bold h-7 hover:bg-primary/10 mt-1">
                              Añadir flujo de trabajo
                           </Button>
                        </div>
                     </div>
                  </TabsContent>
                </ScrollArea>

                {/* Layer List Footer */}
                <div className="p-4 border-t bg-muted/10 space-y-3 shrink-0">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest">Árbol de Capas</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-5 w-5"><Plus className="w-3 h-3"/></Button>
                        <Button variant="ghost" size="icon" className="h-5 w-5"><Layers className="w-3 h-3"/></Button>
                      </div>
                   </div>
                   <div className="space-y-1.5 max-h-32 overflow-auto pr-1">
                      <div className="flex items-center gap-2 p-1.5 text-[11px] hover:bg-accent rounded-md cursor-pointer transition-colors">
                         <Layout className="w-3.5 h-3.5 text-muted-foreground" /> Page_Root
                      </div>
                      <div className="flex items-center gap-2 p-1.5 text-[11px] hover:bg-accent rounded-md cursor-pointer transition-colors pl-4">
                         <Box className="w-3.5 h-3.5 text-muted-foreground" /> Header_Section
                      </div>
                      <div className="flex items-center gap-2 p-1.5 text-[11px] pl-8 bg-primary/10 text-primary rounded-md cursor-pointer font-bold border-l-2 border-primary">
                         <Zap className="w-3.5 h-3.5" /> Order_Button
                      </div>
                   </div>
                </div>
              </Tabs>
            </aside>

          </div>

          {/* 6. Statusbar */}
          <footer className="h-7 border-t bg-background flex items-center justify-between px-3 shrink-0 select-none">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sync Completo</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Modo Seguro Activo</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/70 uppercase">
              <span>v0.8.2-final</span>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>60 FPS</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
};
