export default function Forbidden() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-6xl font-bold text-red-700">403</h1>
      <p className="text-lg text-red-900 mt-4">
        Acceso denegado. No tienes permisos suficientes.
      </p>

      <a
        href="/"
        className="mt-6 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}
