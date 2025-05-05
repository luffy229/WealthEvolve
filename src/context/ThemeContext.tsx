
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'default' | 'dark' | 'ocean' | 'sunset';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('app-theme');
    return (savedTheme as Theme) || 'default';
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('app-theme', theme);
    
    // Remove all previous theme classes
    document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-ocean', 'theme-sunset');
    
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
