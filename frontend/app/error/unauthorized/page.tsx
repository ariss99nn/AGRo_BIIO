/**
 * Página 401 – AGRo_BIIO
 *
 * Se muestra cuando el usuario no tiene permisos para acceder a la ruta.
 */

export default function Unauthorized() {
  return (
    <main
      className="
        min-h-screen
        flex flex-col items-center justify-center
        bg-[var(--color-bg-app)]
        text-center
        p-[var(--space-lg)]
      "
    >
      {/* Código */}
      <h1 className="text-6xl font-bold text-[var(--color-warning)]">
        401
      </h1>

      {/* Mensaje */}
      <p className="text-lg text-[var(--color-text-muted)] mt-[var(--space-md)]">
        No tienes autorización para ver esta página.
      </p>

      {/* Acción */}
      <a
        href="/auth/login"
        className="
          mt-[var(--space-lg)]
          bg-[var(--color-warning)]
          text-white
          px-[var(--space-lg)] py-[var(--space-sm)]
          rounded-[var(--radius-md)]
          hover:bg-[var(--color-warning-light)]
          transition-colors duration-[var(--transition-fast)]
        "
      >
        Iniciar sesión
      </a>
    </main>
  );
}
