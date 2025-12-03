export default function StatusPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Estado del Sistema</h1>
      <p>API: Pendiente de validación</p>
      <p>Entorno: {process.env.NEXT_PUBLIC_ENV}</p>
    </div>
  );
}
