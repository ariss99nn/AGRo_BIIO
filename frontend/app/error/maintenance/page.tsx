/**
 * Página de Mantenimiento – AGRo_BIIO
 *
 * Se muestra cuando la aplicación está en mantenimiento.
 */

export default function Maintenance() {
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
      {/* Título */}
      <h1 className="text-5xl font-bold text-[var(--color-primary)]">
        🛠 Mantenimiento
      </h1>

      {/* Mensaje principal */}
      <p className="text-lg text-[var(--color-text-muted)] mt-[var(--space-md)]">
        Estamos trabajando para mejorar tu experiencia.
      </p>

      {/* Mensaje secundario */}
      <p className="text-sm text-[var(--color-text-light)] mt-[var(--space-sm)]">
        Vuelve a intentarlo más tarde.
      </p>
    </main>
  );
}
