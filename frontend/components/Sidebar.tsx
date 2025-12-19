/**
 * Componente Sidebar – AGRo_BIIO
 * 
 * Navegación lateral con enlaces a los módulos.
 * En móvil se muestra como overlay, en desktop está fijo.
 * 
 * Props:
 * - isOpen: controla visibilidad en móvil
 * - onClose: cierra el sidebar en móvil
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/* Definición de enlaces de navegación */
const navLinks = [
  { href: '/', label: 'Inicio', icon: '🏠' },
  { href: '/status', label: 'Estado', icon: '📊' },
  { href: '/catalogo', label: 'Catálogo', icon: '📦' },
  { href: '/cultivos', label: 'Cultivos', icon: '🌾' },
  { href: '/operaciones', label: 'Operaciones', icon: '⚙️' },
  { href: '/maquinaria', label: 'Maquinaria', icon: '🚜' },
  { href: '/personal', label: 'Personal', icon: '👷' },
  { href: '/usuarios', label: 'Usuarios', icon: '👤' },
  { href: '/alertas', label: 'Alertas', icon: '🔔' },
  { href: '/ia', label: 'IA', icon: '🤖' },
  { href: '/reportes', label: 'Reportes', icon: '📈' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  /* Hook para saber la ruta actual y marcar enlace activo */
  const pathname = usePathname();

  return (
    <>
      {/* Overlay oscuro en móvil cuando sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 md:top-16 left-0
          z-50 md:z-0
          h-screen md:h-[calc(100vh-4rem)]
          w-64 
          bg-[var(--color-bg-card)]
          border-r border-[var(--color-bg-muted)]
          transform transition-transform duration-[var(--transition-normal)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Cabecera del sidebar (solo móvil) */}
        <div className="flex items-center justify-between p-[var(--space-md)] md:hidden">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            Menú
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-muted)]"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Lista de navegación */}
        <nav className="p-[var(--space-sm)]">
          <ul className="space-y-[var(--space-xs)]">
            {navLinks.map((link) => {
              /* Verificar si es la ruta activa */
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-[var(--space-sm)]
                      px-[var(--space-md)] py-[var(--space-sm)]
                      rounded-[var(--radius-md)]
                      text-sm font-medium
                      transition-colors duration-[var(--transition-fast)]
                      ${isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]'
                      }
                    `}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
