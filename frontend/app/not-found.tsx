/**
 * Página 404 – AGRo_BIIO
 *
 * Se muestra cuando el usuario navega a una ruta inexistente.
 * Mantiene coherencia visual con el sistema de diseño.
 */

export default function NotFound() {
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
      {/* Código de error */}
      <h1 className="text-7xl font-bold text-[var(--color-primary)]">
        404
      </h1>

      {/* Mensaje */}
      <p className="text-xl text-[var(--color-text-muted)] mt-[var(--space-md)]">
        La página que buscas no existe.
      </p>

      {/* Acción */}
      <a
        href="/"
        className="
          mt-[var(--space-lg)]
          inline-flex items-center justify-center
          bg-[var(--color-primary)]
          text-white
          px-[var(--space-lg)] py-[var(--space-sm)]
          rounded-[var(--radius-md)]
          hover:bg-[var(--color-primary-light)]
          transition-colors duration-[var(--transition-fast)]
        "
      >
        Volver al inicio
      </a>
    </main>
  );
}
