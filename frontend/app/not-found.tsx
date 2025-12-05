export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <h1 className="text-7xl font-bold text-green-700">404</h1>
      <p className="text-xl text-green-900 mt-4">La página que buscas no existe.</p>

      <a
        href="/"
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}
