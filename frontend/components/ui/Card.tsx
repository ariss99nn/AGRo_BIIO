/**
 * Componente Card – AGRo_BIIO
 * 
 * Tarjeta contenedora para agrupar información.
 * Usa los tokens de diseño: fondo, sombra, radio.
 * 
 * Props:
 * - children: contenido de la tarjeta
 * - className: clases adicionales
 * - padding: 'sm' | 'md' | 'lg' (default: md)
 */

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  padding = 'md',
}: CardProps) {
  /* Mapeo de padding a tokens */
  const paddingStyles = {
    sm: 'p-[var(--space-sm)]',
    md: 'p-[var(--space-md)]',
    lg: 'p-[var(--space-lg)]',
  };

  return (
    <div
      className={`
        bg-[var(--color-bg-card)]
        rounded-[var(--radius-lg)]
        shadow-[var(--shadow-md)]
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
