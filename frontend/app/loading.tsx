export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-700 border-t-transparent"></div>
      <p className="mt-4 text-green-900">Cargando...</p>
    </main>
  );
}
