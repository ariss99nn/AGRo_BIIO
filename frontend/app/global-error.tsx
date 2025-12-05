"use client";

export default function GlobalError({ error, reset }: any) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-center p-6">
        <h1 className="text-5xl font-bold text-red-700">Algo salió mal</h1>

        <p className="text-red-900 mt-4">
          {error?.message || "Error inesperado en la aplicación."}
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
