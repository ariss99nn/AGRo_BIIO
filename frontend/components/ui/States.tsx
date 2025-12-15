/**
 * Componentes de Estado – AGRo_BIIO
 * 
 * Wrappers reutilizables para estados comunes:
 * - Loading: spinner de carga
 * - Empty: mensaje cuando no hay datos
 * - Error: mensaje de error con opción de reintentar
 * - Skeleton: placeholder animado para contenido
 */

import React from 'react';

/* ============================================
   LOADING - Spinner de carga
   ============================================ */
interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ message = 'Cargando...', size = 'md' }: LoadingProps) {
  /* Tamaños del spinner */
  const sizeStyles = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[var(--space-md)] p-[var(--space-xl)]">
      {/* Spinner animado */}
      <div
        className={`
          ${sizeStyles[size]}
          border-[var(--color-bg-muted)]
          border-t-[var(--color-primary)]
          rounded-full
          animate-spin
        `}
      />
      <p className="text-sm text-[var(--color-text-muted)]">{message}</p>
    </div>
  );
}

/* ============================================
   EMPTY - Sin datos
   ============================================ */
interface EmptyProps {
  icon?: string;
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export function Empty({
  icon = '📭',
  title = 'Sin datos',
  message = 'No hay información para mostrar.',
  action,
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[var(--space-md)] p-[var(--space-2xl)] text-center">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm">{message}</p>
      {action && <div className="mt-[var(--space-md)]">{action}</div>}
    </div>
  );
}

/* ============================================
   ERROR - Mensaje de error
   ============================================ */
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Algo salió mal',
  message = 'No pudimos completar la operación. Intenta de nuevo.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[var(--space-md)] p-[var(--space-2xl)] text-center">
      <span className="text-5xl">⚠️</span>
      <h3 className="text-lg font-semibold text-[var(--color-error)]">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-[var(--space-md)]
            px-4 py-2
            bg-[var(--color-primary)] text-white
            rounded-[var(--radius-md)]
            font-medium
            hover:bg-[var(--color-primary-light)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

/* ============================================
   SKELETON - Placeholder animado
   ============================================ */
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  /* Estilos base según variante */
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circle: 'rounded-full',
    rect: 'rounded-[var(--radius-md)]',
  };

  return (
    <div
      className={`
        bg-[var(--color-bg-muted)]
        animate-pulse
        ${variantStyles[variant]}
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

/* ============================================
   SKELETON CARD - Tarjeta placeholder
   ============================================ */
export function SkeletonCard() {
  return (
    <div className="p-[var(--space-md)] bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]">
      <Skeleton variant="rect" height="120px" className="mb-[var(--space-md)]" />
      <Skeleton className="mb-[var(--space-sm)]" />
      <Skeleton width="60%" />
    </div>
  );
}
