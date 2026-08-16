import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Settings,
  Monitor,
  Database,
  User,
  Github,
  Info,
  Palette,
  Globe,
  ChevronRight
} from 'lucide-react';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Separator,
  ScrollArea,
  Button
} from '@electrocraft/design-system';

import { StudioAppearanceSettings } from './StudioAppearanceSettings';

export const SettingsPanel = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'main' | 'appearance'>('main');

  if (view === 'appearance') {
    return (
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <StudioAppearanceSettings />
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-4 h-8 px-2 gap-1 text-muted-foreground z-10"
          onClick={() => setView('main')}
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Volver
        </Button>
      </SheetContent>
    );
  }

  return (
    <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
      <SheetHeader className="p-6 border-b bg-muted/20">
        <SheetTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          {t('shell.items.settings')}
        </SheetTitle>
        <SheetDescription>
          Administra las preferencias del espacio de trabajo y del proyecto actual.
        </SheetDescription>
      </SheetHeader>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Workspace Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5" /> Espacio de Trabajo
            </h3>
            <div className="space-y-2">
               <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold">Idioma de la Interfaz</span>
                    <span className="text-[11px] text-muted-foreground">Cambia el idioma del Studio.</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-3.5 h-3.5" /> Español
                  </Button>
               </div>

               <div
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors group"
                  onClick={() => setView('appearance')}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold">Apariencia del Studio</span>
                    <span className="text-[11px] text-muted-foreground">Colores, temas y densidad del editor.</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
               </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* Project Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Database className="w-3.5 h-3.5" /> Proyecto
            </h3>
            <div className="space-y-2">
               <div className="p-4 rounded-lg border border-dashed bg-muted/5 space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">Nombre del Proyecto</span>
                    <input className="w-full p-2 bg-background border rounded-md text-sm" defaultValue="Mi App de Gestión" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">Descripción</span>
                    <textarea className="w-full p-2 bg-background border rounded-md text-sm h-20 resize-none" defaultValue="Una aplicación moderna para gestionar facturas y clientes." />
                  </div>
               </div>
            </div>
          </section>

          <Separator className="opacity-50" />

          {/* Account Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Cuenta
            </h3>
            <div className="p-4 rounded-lg border bg-primary/5 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-inner">
                 J
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold">JANSG20</span>
                 <span className="text-xs text-muted-foreground">Usuario Profesional</span>
               </div>
               <Button variant="ghost" size="sm" className="ml-auto text-primary font-bold">Cerrar sesión</Button>
            </div>
          </section>

          {/* About Section */}
          <section className="pt-4 flex flex-col items-center text-center gap-4">
             <div className="flex items-center gap-1.5 text-muted-foreground">
                <Github className="w-4 h-4" />
                <span className="text-xs">ElectroCraft v0.8.2-final</span>
             </div>
             <div className="flex items-center gap-4">
                <Button variant="link" className="text-[11px] h-auto p-0">Términos</Button>
                <Button variant="link" className="text-[11px] h-auto p-0">Privacidad</Button>
                <Button variant="link" className="text-[11px] h-auto p-0">Soporte</Button>
             </div>
          </section>
        </div>
      </ScrollArea>
    </SheetContent>
  );
};
