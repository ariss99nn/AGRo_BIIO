export default function Unauthorized() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center p-6">
      <h1 className="text-6xl font-bold text-yellow-700">401</h1>
      <p className="text-lg text-yellow-900 mt-4">
        No tienes autorización para ver esta página.
      </p>

      <a
        href="/auth/login"
        className="mt-6 bg-yellow-700 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition"
      >
        Iniciar sesión
      </a>
    </main>
  );
}
