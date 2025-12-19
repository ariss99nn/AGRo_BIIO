/**
 * Página 403 – AGRo_BIIO
 *
 * Se muestra cuando el usuario intenta acceder a una ruta sin los permisos suficientes.
 */

export default function Forbidden() {
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
      <h1 className="text-6xl font-bold text-[var(--color-error)]">
        403
      </h1>

      {/* Mensaje */}
      <p className="text-lg text-[var(--color-text-muted)] mt-[var(--space-md)]">
        Acceso denegado. No tienes permisos suficientes.
      </p>

      {/* Acción */}
      <a
        href="/"
        className="
          mt-[var(--space-lg)]
          bg-[var(--color-error)]
          text-white
          px-[var(--space-lg)] py-[var(--space-sm)]
          rounded-[var(--radius-md)]
          hover:bg-[var(--color-error-light)]
          transition-colors duration-[var(--transition-fast)]
        "
      >
        Volver al inicio
      </a>
    </main>
  );
}
