/**
 * Componente Input – AGRo_BIIO
 * 
 * Campo de entrada de texto reutilizable.
 * Soporta label, placeholder, error y estados disabled.
 * 
 * Props:
 * - label: texto de la etiqueta (opcional)
 * - placeholder: texto de ayuda
 * - error: mensaje de error (muestra borde rojo)
 * - disabled: deshabilita el input
 * - value, onChange: control del valor
 * - type: tipo de input (text, email, password, etc.)
 */

import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  error,
  disabled = false,
  value,
  onChange,
  type = 'text',
  name,
  className = '',
}: InputProps) {
  /* ID único para conectar label con input */
  const inputId = name || `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={`flex flex-col gap-[var(--space-xs)] ${className}`}>
      {/* Label del campo */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {label}
        </label>
      )}

      {/* Campo de entrada */}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`
          w-full px-[var(--space-md)] py-[var(--space-sm)]
          bg-[var(--color-bg-card)]
          border-2 rounded-[var(--radius-md)]
          text-[var(--color-text)]
          placeholder:text-[var(--color-text-light)]
          transition-all duration-[var(--transition-fast)]
          focus:outline-none focus:border-[var(--color-primary)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-[var(--color-error)]' 
            : 'border-[var(--color-bg-muted)]'
          }
        `}
      />

      {/* Mensaje de error */}
      {error && (
        <span className="text-sm text-[var(--color-error)]">
          {error}
        </span>
      )}
    </div>
  );
}
