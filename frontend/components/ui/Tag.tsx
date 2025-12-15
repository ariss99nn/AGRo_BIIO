/**
 * Componente Tag – AGRo_BIIO
 * 
 * Etiqueta pequeña para mostrar estados o categorías.
 * Variantes por color: success, warning, error, info, neutral.
 * 
 * Props:
 * - variant: tipo de estado/color
 * - children: texto de la etiqueta
 * - size: 'sm' | 'md' (default: sm)
 */

import React from 'react';

interface TagProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Tag({
  variant = 'neutral',
  children,
  size = 'sm',
  className = '',
}: TagProps) {
  /* Colores según variante (fondo suave + texto) */
  const variantStyles = {
    success: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
    info: 'bg-[var(--color-info)]/15 text-[var(--color-info)]',
    neutral: 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]',
  };

  /* Tamaños */
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center
        font-medium
        rounded-[var(--radius-full)]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
