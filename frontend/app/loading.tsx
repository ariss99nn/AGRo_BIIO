/**
 * Estado de carga global – AGRo_BIIO
 *
 * Se muestra mientras la aplicación carga datos o páginas.
 */

export default function Loading() {
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
      {/* Spinner */}
      <div
        className="
          animate-spin
          rounded-full
          h-16 w-16
          border-4
          border-[var(--color-primary)]
          border-t-transparent
        "
      />

      {/* Texto */}
      <p className="mt-[var(--space-md)] text-[var(--color-text-muted)]">
        Cargando...
      </p>
    </main>
  );
}
