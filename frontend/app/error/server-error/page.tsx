export default function ServerError() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-orange-50 text-center p-6">
      <h1 className="text-6xl font-bold text-orange-700">500</h1>
      <p className="text-lg text-orange-900 mt-4">
        Ocurrió un error inesperado en el servidor.
      </p>

      <button
        onClick={() => location.reload()}
        className="mt-6 bg-orange-700 text-white px-6 py-3 rounded-lg hover:bg-orange-800 transition"
      >
        Reintentar
      </button>
    </main>
  );
}
