import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  Zap,
  RotateCcw,
  Save,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  Button,
  Separator,
  ScrollArea,
  Badge,
  Slider,
  Switch,
  cn
} from '@electrocraft/design-system';

export const StudioAppearanceSettings = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable');

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <header className="p-6 border-b space-y-1">
        <h2 className="text-lg font-black flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Apariencia del Studio
        </h2>
        <p className="text-xs text-muted-foreground font-medium">
          Personaliza tu entorno de trabajo. Estos cambios no afectan a tu App final.
        </p>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-10">

          {/* Theme Mode */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Esquema de Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light', icon: Sun, label: 'Claro' },
                { id: 'dark', icon: Moon, label: 'Oscuro' },
                { id: 'system', icon: Monitor, label: 'Sistema' }
              ].map(m => (
                <Button
                  key={m.id}
                  variant="outline"
                  className={cn(
                    "flex-col h-20 gap-2 border-2 transition-all",
                    mode === m.id ? "border-primary bg-primary/5 shadow-md" : "opacity-60"
                  )}
                  onClick={() => setMode(m.id as any)}
                >
                  <m.icon className={cn("w-5 h-5", mode === m.id ? "text-primary" : "")} />
                  <span className="text-[10px] font-bold uppercase">{m.label}</span>
                </Button>
              ))}
            </div>
          </section>

          {/* Interface Density */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Densidad de la Interfaz</h3>
            <div className="flex items-center p-1 bg-muted rounded-xl gap-1">
              <Button
                variant={density === 'compact' ? 'default' : 'ghost'}
                className="flex-1 h-9 rounded-lg text-xs gap-2"
                onClick={() => setDensity('compact')}
              >
                <Minimize2 className="w-3.5 h-3.5" /> Compacto
              </Button>
              <Button
                variant={density === 'comfortable' ? 'default' : 'ghost'}
                className="flex-1 h-9 rounded-lg text-xs gap-2"
                onClick={() => setDensity('comfortable')}
              >
                <Maximize2 className="w-3.5 h-3.5" /> Cómodo
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground px-1 italic">
              El modo compacto reduce paddings y tamaños de fuente para maximizar la información en pantalla.
            </p>
          </section>

          {/* Accent Color */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Color de Acento</h3>
              <Badge variant="outline" className="text-[9px] opacity-60">PRO</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              {['#007BFF', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'].map(c => (
                <div
                  key={c}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
                    c === '#007BFF' ? "border-foreground ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-transparent"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </section>

          {/* Motion */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Efectos y Movimiento</h3>
            <div className="space-y-4 p-4 rounded-2xl border bg-muted/5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold">Animaciones fluidas</label>
                <Switch defaultChecked />
              </div>
              <Separator className="opacity-30" />
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold">Efectos de vidrio (Blur)</label>
                <Switch defaultChecked />
              </div>
            </div>
          </section>

        </div>
      </ScrollArea>

      <footer className="p-6 border-t bg-muted/20 flex gap-3">
        <Button variant="outline" className="flex-1 gap-2 rounded-full font-bold text-xs uppercase tracking-wider h-11">
          <RotateCcw className="w-4 h-4" /> Revertir
        </Button>
        <Button className="flex-1 gap-2 rounded-full font-bold text-xs uppercase tracking-wider h-11 shadow-lg shadow-primary/20">
          <Save className="w-4 h-4" /> Aplicar
        </Button>
      </footer>
    </div>
  );
};
