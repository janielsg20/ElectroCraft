import React, { useState, useEffect } from 'react';
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
  MousePointer2,
  Menu,
  MoreVertical,
  X
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
import { ComponentPalette } from './ComponentPalette';
import { HelpTrigger } from '../help/HelpTrigger';

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
  const [mobileView, setMobileView] = useState<'canvas' | 'structure' | 'inspector'>('canvas');

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) setSidebarCollapsed(true);
      else setSidebarCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TooltipProvider>
      <Sheet>
        <div className="flex h-[100dvh] w-screen overflow-hidden bg-background text-foreground font-sans">

          {/* 1. Global Sidebar */}
          <aside
            className={cn(
              "border-r flex flex-col bg-muted/20 transition-all duration-300 ease-in-out select-none shrink-0 hidden md:flex",
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
                    activeSection === 'settings' && "bg-accent text-primary",
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
            <header className="h-14 border-b flex items-center justify-between px-2 sm:px-4 bg-background shrink-0 select-none">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-accent px-2 sm:px-3 py-1.5 rounded-md transition-colors min-w-0">
                      <span className="font-bold text-xs sm:text-sm truncate">Mi App</span>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Proyectos</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2 font-medium">
                      <Box className="w-4 h-4" /> Mi App de Gestión
                      <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-primary" />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-primary font-bold">
                      <Plus className="w-4 h-4" /> Nuevo Proyecto...
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator orientation="vertical" className="h-6 hidden sm:block" />

                <div className="flex items-center bg-muted/50 rounded-lg p-1">
                  <Button
                    variant={activePlatform === 'web' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-1.5 sm:px-2.5 text-xs gap-1.5", activePlatform === 'web' ? "bg-background text-foreground shadow-sm hover:bg-background" : "opacity-60")}
                    onClick={() => setActivePlatform('web')}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Web</span>
                  </Button>
                  <Button
                    variant={activePlatform === 'ios' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-1.5 sm:px-2.5 text-xs gap-1.5", activePlatform === 'ios' ? "bg-background text-primary shadow-sm hover:bg-background" : "opacity-60")}
                    onClick={() => setActivePlatform('ios')}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">iOS</span>
                  </Button>
                  <Button
                    variant={activePlatform === 'android' ? 'default' : 'ghost'}
                    size="sm"
                    className={cn("h-7 px-1.5 sm:px-2.5 text-xs gap-1.5", activePlatform === 'android' ? "bg-background text-foreground shadow-sm hover:bg-background" : "opacity-60")}
                    onClick={() => setActivePlatform('android')}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Android</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] uppercase font-black text-green-600 tracking-wider">Listo</span>
                </div>

                <Separator orientation="vertical" className="h-6 hidden sm:block" />

                <div className="flex items-center gap-1">
                   <HelpTrigger helpId={activeSection} />
                   <Button variant="outline" size="sm" className="gap-2 h-9 px-2 sm:px-3">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('shell.items.export')}</span>
                  </Button>
                  <Button size="sm" className="gap-2 bg-primary h-9 px-3 sm:px-4 font-bold shadow-md shadow-primary/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('shell.items.deploy')}</span>
                  </Button>
                </div>

                <div className="sm:hidden">
                   <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                   </Button>
                </div>

                <div className="hidden sm:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-primary/10 text-primary font-black border-2 border-primary/20">
                        J
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>JANSG20</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <User className="w-4 h-4" /> Perfil
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <LogOut className="w-4 h-4" /> Salir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative">

              {/* 3. Sub-navigation Panel */}
              <aside
                className={cn(
                  "w-72 border-r flex flex-col bg-muted/5 shrink-0 transition-all duration-300",
                  "hidden lg:flex"
                )}
              >
                {activeSection === 'components' ? (
                  <ComponentPalette />
                ) : (
                  <>
                    <div className="h-10 px-4 flex items-center justify-between border-b bg-background/50">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                          {activeSection === 'screens' ? 'Páginas' : t(`shell.items.${activeSection}`)}
                        </h3>
                        <HelpTrigger helpId={activeSection} />
                      </div>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-2 space-y-1">
                        {['Inicio', 'Listado de Clientes', 'Nueva Factura', 'Configuración'].map((item, idx) => (
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
                    <div className="p-4 border-t bg-primary/5">
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-primary/20 shadow-sm relative overflow-hidden group cursor-help">
                          <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                          <Bot className="w-5 h-5 text-primary relative z-10" />
                          <div className="flex flex-col relative z-10">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-tight">IA Sugiere</span>
                            <span className="text-[11px] font-medium text-muted-foreground italic leading-tight">Crea una pantalla de login</span>
                          </div>
                       </div>
                    </div>
                  </>
                )}
              </aside>

              {/* 4. Canvas Central */}
              <main className={cn(
                "flex-1 bg-muted/15 flex flex-col overflow-hidden relative transition-all duration-300",
                mobileView !== 'canvas' && "translate-x-full lg:translate-x-0 hidden lg:flex"
              )}>
                 <div className="h-12 border-b bg-background/50 backdrop-blur-md flex items-center justify-center shrink-0 z-10">
                    <Tabs defaultValue="design">
                      <TabsList className="h-8.5 bg-muted/80 p-1 rounded-lg">
                        <TabsTrigger value="design" className="text-xs px-4 sm:px-5 font-bold tracking-tight">Diseño</TabsTrigger>
                        <TabsTrigger value="logic" className="text-xs px-4 sm:px-5 font-bold tracking-tight">Lógica</TabsTrigger>
                        <TabsTrigger value="code" className="text-xs px-4 sm:px-5 font-bold tracking-tight">Código</TabsTrigger>
                      </TabsList>
                    </Tabs>
                 </div>

                 <ScrollArea className="flex-1" onClick={() => setSelectedElementId(null)}>
                   <div className="p-4 sm:p-8 lg:p-12 flex items-center justify-center min-h-full">
                      <div
                        className={cn(
                          "bg-slate-950 shadow-[0_0_100px_-20px_rgba(0,0,0,0.4)] border-slate-900 overflow-hidden relative flex flex-col transition-all duration-500 ring-1 ring-white/10",
                          activePlatform === 'web' ? "w-full max-w-5xl h-[500px] sm:h-[600px] rounded-xl border-4" :
                          activePlatform === 'android' ? "w-[320px] sm:w-[400px] h-[640px] sm:h-[800px] rounded-[48px] border-[10px] sm:border-[12px]" :
                          "w-[300px] sm:w-[380px] h-[600px] sm:h-[780px] rounded-[48px] sm:rounded-[64px] border-[10px] sm:border-[12px]"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                          {activePlatform !== 'web' && (
                            <div className="h-6 sm:h-7 w-full bg-slate-900 flex justify-center items-end pb-1 absolute top-0 z-20">
                              <div className="w-16 sm:w-24 h-4 sm:h-5 bg-slate-950 rounded-b-2xl" />
                            </div>
                          )}

                          <div className={cn("bg-background flex-1 flex flex-col", activePlatform !== 'web' && "pt-8 sm:pt-10")}>
                            <header className="px-4 sm:px-6 py-4 flex justify-between items-center border-b">
                              <h2 className="font-black text-base sm:text-xl truncate">Dashboard</h2>
                              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                            </header>

                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
                              <div
                                className={cn(
                                  "h-32 sm:h-36 w-full bg-gradient-to-br from-primary to-blue-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white flex flex-col shadow-xl cursor-pointer transition-all",
                                  selectedElementId === 'hero_card' && "ring-4 ring-primary ring-offset-2"
                                )}
                                onClick={() => setSelectedElementId('hero_card')}
                              >
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Ventas</span>
                                <span className="text-3xl sm:text-4xl font-black mt-2 leading-none">$12,450</span>
                              </div>

                              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div
                                  className={cn(
                                    "h-28 sm:h-32 bg-card rounded-2xl sm:rounded-3xl border p-3 sm:p-4 shadow-sm cursor-pointer transition-all",
                                    selectedElementId === 'stats_1' && "ring-4 ring-primary"
                                  )}
                                  onClick={() => setSelectedElementId('stats_1')}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center mb-2">
                                    <Table className="w-4 h-4" />
                                  </div>
                                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Facturas</span>
                                  <div className="text-xl font-black mt-1">14</div>
                                </div>
                                <div
                                  className={cn(
                                    "h-28 sm:h-32 bg-card rounded-2xl sm:rounded-3xl border p-3 sm:p-4 shadow-sm cursor-pointer transition-all",
                                    selectedElementId === 'stats_2' && "ring-4 ring-primary"
                                  )}
                                  onClick={() => setSelectedElementId('stats_2')}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center mb-2">
                                    <Zap className="w-4 h-4" />
                                  </div>
                                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Actividad</span>
                                  <div className="text-xl font-black mt-1">89%</div>
                                </div>
                              </div>

                              <Button
                                className={cn(
                                  "w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black shadow-xl transition-all",
                                  selectedElementId === 'main_btn' && "ring-4 ring-primary ring-offset-2"
                                )}
                                onClick={() => setSelectedElementId('main_btn')}
                              >
                                Nueva Orden
                              </Button>
                            </div>
                          </div>

                          {activePlatform !== 'web' && (
                            <div className="h-1 w-24 sm:w-32 bg-slate-800 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2" />
                          )}
                      </div>
                   </div>
                 </ScrollArea>
              </main>

              {/* 5. Mobile Views */}
              {mobileView === 'structure' && (
                <div className="flex-1 bg-background md:hidden flex flex-col animate-in slide-in-from-left duration-200">
                  <div className="h-14 border-b flex items-center px-4 justify-between">
                    <span className="font-black text-xs uppercase tracking-widest">Estructura</span>
                    <Button variant="ghost" size="icon" onClick={() => setMobileView('canvas')}><X className="w-5 h-5"/></Button>
                  </div>
                  <ScrollArea className="flex-1 p-4">
                     <div className="space-y-2">
                        {['Inicio', 'Listado', 'Detalle'].map(s => (
                          <Button key={s} variant="outline" className="w-full justify-start h-12 gap-3">
                            <Layers className="w-4 h-4 text-primary" /> {s}
                          </Button>
                        ))}
                     </div>
                  </ScrollArea>
                </div>
              )}

              {mobileView === 'inspector' && (
                <div className="flex-1 bg-background md:hidden flex flex-col animate-in slide-in-from-right duration-200">
                  <div className="h-14 border-b flex items-center px-4 justify-between">
                    <span className="font-black text-xs uppercase tracking-widest">Inspector</span>
                    <Button variant="ghost" size="icon" onClick={() => setMobileView('canvas')}><X className="w-5 h-5"/></Button>
                  </div>
                  <PropertyInspector selectedElement={selectedElementId || 'main_btn'} />
                </div>
              )}

              {/* 6. Property Inspector - Desktop */}
              <aside className="w-80 border-l flex flex-col bg-background shrink-0 hidden xl:flex">
                <PropertyInspector selectedElement={selectedElementId} />
              </aside>

            </div>

            {/* 7. Statusbar */}
            <footer className="h-8 border-t bg-background flex items-center justify-between px-4 shrink-0 select-none hidden sm:flex">
              <div className="flex items-center gap-4 text-foreground/70">
                <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Sincronizado
                </div>
              </div>
              <div className="flex items-center gap-6 text-[9px] font-black text-muted-foreground/40 uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3" /> ESPAÑOL
                </div>
                <Separator orientation="vertical" className="h-3" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> SECURE_MODE_ON
                </div>
                <Separator orientation="vertical" className="h-3" />
                <span>v0.8.2-FINAL</span>
              </div>
            </footer>

            {/* 8. Mobile Bottom Navigation */}
            <nav className="h-16 border-t bg-background flex items-center justify-around shrink-0 md:hidden z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
               <button
                className={cn("flex flex-col items-center gap-1 transition-all duration-300", mobileView === 'structure' ? "text-primary scale-110" : "text-muted-foreground opacity-60")}
                onClick={() => setMobileView('structure')}
               >
                 <Layers className="w-5 h-5" />
                 <span className="text-[9px] font-black uppercase tracking-tighter">Estructura</span>
               </button>
               <button
                className={cn("flex flex-col items-center gap-1 transition-all duration-300", mobileView === 'canvas' ? "text-primary scale-110" : "text-muted-foreground opacity-60")}
                onClick={() => setMobileView('canvas')}
               >
                 <Layout className="w-5 h-5" />
                 <span className="text-[9px] font-black uppercase tracking-tighter">Canvas</span>
               </button>
               <button
                className={cn("flex flex-col items-center gap-1 transition-all duration-300", mobileView === 'inspector' ? "text-primary scale-110" : "text-muted-foreground opacity-60")}
                onClick={() => setMobileView('inspector')}
               >
                 <Settings2 className="w-5 h-5" />
                 <span className="text-[9px] font-black uppercase tracking-tighter">Inspector</span>
               </button>
               <SheetTrigger asChild>
                 <button className="flex flex-col items-center gap-1 text-muted-foreground opacity-60">
                   <Settings className="w-5 h-5" />
                   <span className="text-[9px] font-black uppercase tracking-tighter">Ajustes</span>
                 </button>
               </SheetTrigger>
            </nav>

          </div>

          <SettingsPanel />
        </div>
      </Sheet>
    </TooltipProvider>
  );
};
