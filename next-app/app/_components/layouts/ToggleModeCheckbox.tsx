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

  return (
    <label className="btn btn-circle btn-ghost swap swap-rotate">
      <input
        type="checkbox"
        id="themeToggle"
        name="themeToggle"
        onChange={toggleTheme}
        checked={theme === 'night'}
      />
      <Sun className="swap-off" size={32} />
      <Moon className="swap-on" size={32} />
    </label>
  );
}
