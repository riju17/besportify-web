'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { THEME_STORAGE_KEY } from './theme-bootstrap';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  rememberTheme: boolean;
  setRememberTheme: (remember: boolean) => void;
  storageError: string | null;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function getSystemTheme(): ThemeMode {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : null;
  } catch {
    return null;
  }
}

function getInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme;
    if (isThemeMode(attr)) {
      return attr;
    }
  }

  return getStoredTheme() ?? getSystemTheme();
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Keep the first server and client render identical; the bootstrap script
  // already applies the persisted theme before hydration begins.
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [rememberTheme, setRememberThemeState] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    startTransition(() => {
      setThemeState(initial);
      setRememberThemeState(getStoredTheme() !== null);
    });
  }, []);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) {
        return;
      }

      const next = isThemeMode(event.newValue)
        ? event.newValue
        : getSystemTheme();
      setThemeState(next);
      applyTheme(next);
      setRememberThemeState(isThemeMode(event.newValue));
    }

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    function savePreference(next: ThemeMode, remember: boolean) {
      try {
        if (remember) window.localStorage.setItem(THEME_STORAGE_KEY, next);
        else window.localStorage.removeItem(THEME_STORAGE_KEY);
        setRememberThemeState(remember);
        setStorageError(null);
      } catch {
        setStorageError(
          'Browser storage is unavailable. Clear this site’s data in your browser settings to remove a previously saved theme.',
        );
      }
    }
    function setTheme(next: ThemeMode) {
      setThemeState(next);
      applyTheme(next);
      if (rememberTheme) savePreference(next, true);
    }
    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
      rememberTheme,
      setRememberTheme: (remember: boolean) => savePreference(theme, remember),
      storageError,
    };
  }, [theme, rememberTheme, storageError]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }

  return context;
}
