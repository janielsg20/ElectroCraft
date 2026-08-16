import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircleHelp, Info, ExternalLink } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Badge,
  Separator
} from '@electrocraft/design-system';
import { helpRegistry } from './registry';

interface HelpTriggerProps {
  helpId: string;
  variant?: 'icon' | 'button';
}

export const HelpTrigger = ({ helpId, variant = 'icon' }: HelpTriggerProps) => {
  const { t } = useTranslation(['help']);
  const descriptor = helpRegistry.get(helpId);

  if (!descriptor) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {variant === 'icon' ? (
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground/60 hover:text-primary hover:bg-primary/5" aria-label="Más información">
            <CircleHelp className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2 text-[10px] uppercase font-bold h-7">
            <Info className="w-3 h-3" /> {t('help:what_can_i_do')}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-80 p-0 overflow-hidden border-2 shadow-xl animate-in zoom-in-95 duration-200">
        <header className="p-4 bg-primary/5 border-b flex items-center justify-between">
           <span className="text-xs font-black uppercase tracking-widest text-primary">Ayuda Contextual</span>
           <Badge variant="outline" className="text-[9px] opacity-60">ID: {helpId}</Badge>
        </header>
        <div className="p-5 space-y-4">
           <div className="space-y-1.5">
              <h4 className="text-sm font-black tracking-tight">{t(descriptor.titleKey)}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                {t(descriptor.shortKey)}
              </p>
           </div>

           {descriptor.longKey && (
             <div className="p-3 rounded-lg bg-muted/20 border border-muted-foreground/10">
                <p className="text-[11px] text-foreground/80 leading-relaxed italic">
                  {t(descriptor.longKey)}
                </p>
             </div>
           )}

           <Button variant="link" className="text-primary text-[10px] h-auto p-0 font-black uppercase tracking-tighter gap-1 hover:no-underline">
              {t('help:more_info')} <ExternalLink className="w-3 h-3" />
           </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
