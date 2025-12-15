/**
 * Componente Button – AGRo_BIIO
 * 
 * Botón reutilizable con variantes de estilo.
 * Soporta: primary (acción principal), secondary (acento), outline (borde).
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'outline' (default: primary)
 * - size: 'sm' | 'md' | 'lg' (default: md)
 * - disabled: boolean
 * - children: contenido del botón
 * - onClick: función al hacer clic
 */

import React from 'react';

/* Tipos de props del botón */
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  /* 
   * Clases base: flexbox centrado, transición suave, radio redondeado
   * Se aplican en todos los botones
   */
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-[var(--radius-md)]
    transition-all duration-[var(--transition-fast)]
    focus-visible:outline-2 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  /* Estilos según variante */
  const variantStyles = {
    primary: `
      bg-[var(--color-primary)] text-white
      hover:bg-[var(--color-primary-light)]
      active:bg-[var(--color-primary-dark)]
      focus-visible:outline-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-white
      hover:bg-[var(--color-secondary-light)]
      focus-visible:outline-[var(--color-secondary)]
    `,
    outline: `
      border-2 border-[var(--color-primary)] text-[var(--color-primary)]
      bg-transparent
      hover:bg-[var(--color-primary)] hover:text-white
      focus-visible:outline-[var(--color-primary)]
    `,
  };

  /* Tamaños: padding y font-size */
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
