"use client";

/**
 * Error global – AGRo_BIIO
 *
 * Se renderiza cuando ocurre un error no controlado en la app.
 * Permite reintentar la renderización mediante `reset()`.
 */

export default function GlobalError({ error, reset }: any) {
  return (
    <html>
      <body
        className="
          min-h-screen
          flex flex-col items-center justify-center
          bg-[var(--color-bg-app)]
          text-center
          p-[var(--space-lg)]
        "
      >
        {/* Título */}
        <h1 className="text-5xl font-bold text-[var(--color-error)]">
          Algo salió mal
        </h1>

        {/* Mensaje de error */}
        <p className="mt-[var(--space-md)] text-[var(--color-text-muted)]">
          {error?.message || "Error inesperado en la aplicación."}
        </p>

        {/* Acción */}
        <button
          onClick={() => reset()}
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
      </body>
    </html>
  );
}
