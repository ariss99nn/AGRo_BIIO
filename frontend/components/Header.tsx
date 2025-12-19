import React from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-50
        flex items-center justify-between
        h-16 px-[var(--space-md)] md:px-[var(--space-lg)]
        bg-[var(--color-bg-card)]
        border-b border-[var(--color-bg-muted)]
        shadow-[var(--shadow-sm)]
      "
    >
      {/* Lado izquierdo: menú móvil + logo */}
      <div className="flex items-center gap-[var(--space-md)]">
        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={onMenuClick}
          className="
            md:hidden p-2 rounded-[var(--radius-md)]
            text-[var(--color-text-muted)]
            hover:bg-[var(--color-bg-muted)]
            transition-colors duration-[var(--transition-fast)]
          "
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo y nombre */}
        <a href="/" className="flex items-center gap-[var(--space-sm)]">
  <img
    src="/favicon.png"
    alt="AGRo_BIIO logo"
    className="w-14 h-14"
  />
  <span className="text-lg font-bold text-[var(--color-primary)]">
    AGRo_BIIO
  </span>
</a>

      </div>

      {/* Lado derecho: avatar usuario + botón login */}
      <div className="flex items-center gap-[var(--space-sm)]">
        {/* Indicador de estado */}
        <span className="hidden sm:block text-sm text-[var(--color-text-muted)]">
          Sistema activo
        </span>

        {/* Avatar placeholder */}
        <button
          className="
            w-10 h-10 rounded-[var(--radius-full)]
            bg-[var(--color-primary)]
            text-white font-medium
            flex items-center justify-center
            hover:bg-[var(--color-primary-light)]
            transition-colors duration-[var(--transition-fast)]
          "
          aria-label="Menú de usuario"
        >
          U
        </button>

        {/* Nuevo botón: Ir a login */}
        <a
          href="/usuarios/login"
          className="
            ml-2 px-4 py-2
            bg-[var(--color-secondary)]
            text-white font-medium
            rounded-[var(--radius-md)]
            hover:bg-[var(--color-secondary-light)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Iniciar sesión
        </a>
      </div>
    </header>
  );
}
