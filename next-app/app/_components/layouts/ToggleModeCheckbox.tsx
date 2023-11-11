'use client';
import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';
import { Moon, Sun } from '@phosphor-icons/react';

export default function ToggleModeCheckbox() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    setTheme(theme === 'night' ? 'cupcake' : 'night');
  }

  const isNightMode = theme === 'night';
  const labelDescription = isNightMode
    ? 'ダークモードをオフにする'
    : 'ダークモードをオンにする';

  return (
    <label
      className="swap swap-rotate"
      htmlFor="themeToggle"
      aria-label={labelDescription}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          toggleTheme();
        }
      }}
    >
      <span className="sr-only">{labelDescription}</span>
      <input
        type="checkbox"
        id="themeToggle"
        name="themeToggle"
        onChange={toggleTheme}
        checked={isNightMode}
        role="checkbox"
        aria-checked={isNightMode}
      />
      <Sun className="swap-off" size={32} />
      <Moon className="swap-on" size={32} />
    </label>
  );
}
