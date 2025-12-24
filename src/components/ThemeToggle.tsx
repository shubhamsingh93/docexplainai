import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark' | 'system';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) || 'system';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
  
  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    const currentEffective = theme === 'system' ? getSystemTheme() : theme;
    const newTheme: Theme = currentEffective === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-xl relative overflow-hidden"
      onClick={toggleTheme}
      aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${effectiveTheme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${effectiveTheme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
    </Button>
  );
}
