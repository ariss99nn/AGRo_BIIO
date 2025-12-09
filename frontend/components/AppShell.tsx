/**
 * Componente AppShell – AGRo_BIIO
 * 
 * Estructura principal de la aplicación:
 * - Header fijo arriba
 * - Sidebar a la izquierda
 * - Contenido principal en el centro
 * 
 * Maneja el estado del sidebar en móvil.
 */

'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  /* Estado para controlar sidebar en móvil */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header fijo en la parte superior */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Contenedor principal: sidebar + contenido */}
      <div className="flex">
        {/* Sidebar de navegación */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Área de contenido principal */}
        <main
          className="
            flex-1
            min-h-[calc(100vh-4rem)]
            p-[var(--space-md)] md:p-[var(--space-lg)]
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
