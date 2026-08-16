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
  ChevronLeft,
  ChevronRight,
  FileCode,
  Table,
  Settings2,
  Brush,
  Globe,
  CheckCircle2,
  ShieldCheck,
  User,
  LogOut,
  Download,
  Cloud,
  ChevronUp,
  MousePointer2
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
  TabsList,
  TabsTrigger,
  Sheet,
  SheetTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  cn
} from '@electrocraft/design-system';
import { SettingsPanel } from './SettingsPanel';
import { PropertyInspector } from './PropertyInspector';

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
  const [activePlatform, setActivePlatform] = useState('ios');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <Sheet>
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">

          {/* 1. Global Sidebar */}
          <aside
            className={cn(
              "border-r flex flex-col bg-muted/20 transition-all duration-300 ease-in-out select-none shrink-0",
              sidebarCollapsed ? "w-12" : "w-60"
            )}
          >
            <div className={cn(
              "h-14 flex items-center border-b px-3 shrink-0",
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

            <div className="p-2 mt-auto border-t bg-muted/10 shrink-0">
              <SidebarItem icon={HelpCircle} label={t('shell.items.help')} active={activeSection === 'help'} collapsed={sidebarCollapsed} onClick={() => setActiveSection('help')} />
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size={sidebarCollapsed ? "icon" : "default"}
                  className={cn(
                    "w-full rounded-none justify-start px-3 h-10 hover:bg-accent",
                    sidebarCollapsed && "justify-center px-0"
                  )}
                >
                  <Settings className="w-4 h-4 shrink-0 text-muted-foreground" />
                  {!sidebarCollapsed && <span className="ml-3 text-sm">{t('shell.items.settings')}</span>}
                </Button>
              </SheetTrigger>
            </div>
          </aside>

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

            {/* 2. Topbar */}
            <header className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0 select-none">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-accent px-3 py-1.5 rounded-md transition-colors">
                      <span className="font-bold text-sm">Mi App de Gestión</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Proyectos</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2 font-medium">
                      <Box className="w-4 h-4" /> Mi App de Gestión
                      <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-primary" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Box className="w-4 h-4 text-muted-foreground" /> Portal de Clientes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-primary font-bold">
                      <Plus className="w-4 h-4" /> Nuevo Proyecto...
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center bg-muted/50 rounded-lg p-1">
                  <Button
                    variant={activePlatform === 'web' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-2.5 text-xs gap-1.5", activePlatform === 'web' ? "bg-background text-foreground shadow-sm hover:bg-background" : "opacity-60 hover:opacity-100")}
                    onClick={() => setActivePlatform('web')}
                  >
                    <Monitor className="w-3.5 h-3.5" /> Web
                  </Button>
                  <Button
                    variant={activePlatform === 'ios' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-2.5 text-xs gap-1.5", activePlatform === 'ios' ? "bg-background text-primary shadow-sm hover:bg-background" : "opacity-60 hover:opacity-100")}
                    onClick={() => setActivePlatform('ios')}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> iOS
                  </Button>
                  <Button
                    variant={activePlatform === 'android' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-2.5 text-xs gap-1.5", activePlatform === 'android' ? "bg-background text-foreground shadow-sm hover:bg-background" : "opacity-60 hover:opacity-100")}
                    onClick={() => setActivePlatform('android')}
                  >
                    <Tablet className="w-3.5 h-3.5" /> Android
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-black text-green-600 tracking-wider">Listo</span>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 h-9 px-3">
                      <Share2 className="w-4 h-4" /> {t('shell.items.export')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Opciones de Exportación</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-3 py-3">
                      <Download className="w-5 h-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Descargar Proyecto Local</span>
                        <span className="text-[10px] text-muted-foreground">ZIP con código fuente completo</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-3 py-3">
                      <Cloud className="w-5 h-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Sincronizar con GitHub</span>
                        <span className="text-[10px] text-muted-foreground">Push directo a repositorio</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" className="gap-2 bg-primary h-9 px-4 font-bold shadow-md shadow-primary/20">
                  <CheckCircle2 className="w-4 h-4" /> {t('shell.items.deploy')}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-primary/10 text-primary font-black border-2 border-primary/20">
                      J
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">JANSG20</p>
                        <p className="text-xs leading-none text-muted-foreground">jansg20@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <User className="w-4 h-4" /> Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Settings className="w-4 h-4" /> Mi suscripción
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4" /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                          "w-full rounded-md justify-start font-normal h-9 text-sm px-3 group transition-all",
                          idx === 0 && activeSection === 'screens' ? "bg-primary/5 text-primary font-bold border-l-4 border-primary rounded-l-none" : ""
                        )}
                      >
                        <Layers className="w-4 h-4 mr-2.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        {item}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-primary/5 border-primary/10">
                   <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-primary/20 shadow-sm">
                      <div className="relative">
                        <Bot className="w-6 h-6 text-primary" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-background" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tight">Gemini Activo</span>
                        <span className="text-[11px] font-medium text-muted-foreground italic leading-tight">¿Necesitas ayuda?</span>
                      </div>
                      <ChevronUp className="w-3.5 h-3.5 ml-auto text-muted-foreground/50" />
                   </div>
                </div>
              </aside>

              {/* 4. Canvas Central */}
              <main className="flex-1 bg-muted/15 flex flex-col overflow-hidden relative">
                 <div className="h-12 border-b bg-background/50 backdrop-blur-md flex items-center justify-center shrink-0 z-10">
                    <Tabs defaultValue="design">
                      <TabsList className="h-8.5 bg-muted/80 p-1 rounded-lg">
                        <TabsTrigger value="design" className="text-xs px-5 rounded-md font-bold tracking-tight">Diseño</TabsTrigger>
                        <TabsTrigger value="logic" className="text-xs px-5 rounded-md font-bold tracking-tight">Lógica</TabsTrigger>
                        <TabsTrigger value="code" className="text-xs px-5 rounded-md font-bold tracking-tight">Código</TabsTrigger>
                      </TabsList>
                    </Tabs>
                 </div>

                 <ScrollArea className="flex-1" onClick={() => setSelectedElementId(null)}>
                   <div className="p-12 flex items-center justify-center min-h-full">
                      {/* Device Preview Frame */}
                      <div
                        className={cn(
                          "bg-slate-950 shadow-[0_0_100px_-20px_rgba(0,0,0,0.4)] rounded-[64px] border-[12px] border-slate-900 overflow-hidden relative flex flex-col transition-all duration-500 ring-1 ring-white/10",
                          activePlatform === 'web' ? "w-[90%] h-[600px] rounded-xl border-4" :
                          activePlatform === 'android' ? "w-[400px] h-[800px] rounded-[48px]" :
                          "w-[380px] h-[780px]"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                          {/* Notch Area (Mobile only) */}
                          {activePlatform !== 'web' && (
                            <div className="h-7 w-full bg-slate-900 flex justify-center items-end pb-1 absolute top-0 z-20">
                              <div className="w-24 h-5 bg-slate-950 rounded-b-2xl" />
                            </div>
                          )}

                          {/* Internal Content */}
                          <div className={cn("bg-background flex-1 flex flex-col", activePlatform !== 'web' && "pt-10")}>
                            <header className="px-6 py-5 flex justify-between items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                              <h2 className="font-black text-xl tracking-tight">Dashboard</h2>
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-accent transition-colors" onClick={() => setSelectedElementId('profile_icon')}>
                                <Users className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </header>

                            <div className="p-6 space-y-6">
                              <div
                                className={cn(
                                  "h-36 w-full bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-5 text-white flex flex-col shadow-xl shadow-primary/20 relative overflow-hidden group cursor-pointer transition-all",
                                  selectedElementId === 'hero_card' && "ring-4 ring-primary ring-offset-2 ring-offset-background"
                                )}
                                onClick={() => setSelectedElementId('hero_card')}
                              >
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Ventas Totales (Mes)</span>
                                <span className="text-4xl font-black mt-2 leading-none">$12,450.00</span>
                                <div className="mt-auto flex items-center justify-between">
                                  <div className="h-1.5 flex-1 bg-white/20 rounded-full mr-4 overflow-hidden">
                                    <div className="h-full w-2/3 bg-white rounded-full shadow-[0_0_10px_white]" />
                                  </div>
                                  <span className="text-[10px] font-bold">+12%</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="h-32 bg-card rounded-3xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedElementId('stats_invoices')}>
                                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-3">
                                    <Table className="w-5 h-5" />
                                  </div>
                                  <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest leading-none">Facturas</span>
                                  <div className="text-2xl font-black mt-1">14</div>
                                </div>
                                <div className="h-32 bg-card rounded-3xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedElementId('stats_activity')}>
                                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3">
                                    <Zap className="w-5 h-5" />
                                  </div>
                                  <span className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest leading-none">Actividad</span>
                                  <div className="text-2xl font-black mt-1">89%</div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="h-16 w-full bg-muted/20 rounded-2xl flex items-center px-4 gap-4 border border-dashed border-border group hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setSelectedElementId('list_item_1')}>
                                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                                  <div className="flex-1 space-y-1.5">
                                    <div className="h-2.5 w-24 bg-muted rounded animate-pulse" />
                                    <div className="h-2 w-16 bg-muted/50 rounded animate-pulse" />
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground/30" />
                                </div>
                              </div>

                              <Button
                                className={cn(
                                  "w-full h-14 rounded-2xl text-base font-black shadow-xl shadow-primary/30 mt-4 active:scale-[0.98] transition-all",
                                  selectedElementId === 'order_button' && "ring-4 ring-primary ring-offset-2 ring-offset-background"
                                )}
                                onClick={() => setSelectedElementId('order_button')}
                              >
                                Crear Nueva Orden
                              </Button>
                            </div>
                          </div>

                          {/* Bottom Indicator (Mobile only) */}
                          {activePlatform !== 'web' && (
                            <div className="h-1.5 w-32 bg-slate-800 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2" />
                          )}
                      </div>
                   </div>
                 </ScrollArea>

                 {/* Grid background pattern */}
                 <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
              </main>

              {/* 5. Property Inspector */}
              <aside className="w-80 border-l flex flex-col bg-background shrink-0 hidden xl:flex">
                <PropertyInspector selectedElement={selectedElementId} />
              </aside>

            </div>

            {/* 6. Statusbar */}
            <footer className="h-8 border-t bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 select-none">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Sincronizado</span>
                </div>
                <Separator orientation="vertical" className="h-4 opacity-50" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-black text-blue-600/80 uppercase tracking-widest">Motor Seguro v2.4</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-black text-muted-foreground/50 uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Español (ES)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>60 FPS</span>
                </div>
                <span className="text-foreground/30">EC-STUDIO-RELEASE-0.8.2</span>
              </div>
            </footer>
          </div>

          {/* Settings Panel Content */}
          <SettingsPanel />
        </div>
      </Sheet>
    </TooltipProvider>
  );
};
