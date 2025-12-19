/**
 * Página 500 – AGRo_BIIO
 *
 * Se muestra cuando ocurre un error interno del servidor.
 */

export default function ServerError() {
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
        500
      </h1>

      {/* Mensaje */}
      <p className="text-lg text-[var(--color-text-muted)] mt-[var(--space-md)]">
        Ocurrió un error inesperado en el servidor.
      </p>

      {/* Acción */}
      <button
        onClick={() => location.reload()}
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
        Reintentar
      </button>
    </main>
  );
}
