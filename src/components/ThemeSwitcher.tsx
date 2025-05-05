
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Check, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = [
  { id: 'default', name: 'Default', color: 'bg-wealth-teal' },
  { id: 'dark', name: 'Dark', color: 'bg-slate-800' },
  { id: 'ocean', name: 'Ocean', color: 'bg-blue-500' },
  { id: 'sunset', name: 'Sunset', color: 'bg-orange-500' }
];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-9 h-9 border-wealth-teal/20">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setTheme(t.id as any)}
          >
            <div className="flex items-center gap-2">
              <div className={`${t.color} w-4 h-4 rounded-full`} />
              <span>{t.name}</span>
            </div>
            {theme === t.id && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
