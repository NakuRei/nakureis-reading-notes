'use client';
import React from 'react';

import { ThemeProvider } from 'next-themes';

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider defaultTheme="night" themes={['cupcake', 'night']}>
        {children}
      </ThemeProvider>
    </>
  );
}
