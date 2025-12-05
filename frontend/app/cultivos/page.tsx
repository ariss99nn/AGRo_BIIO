"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CultivosPage() {
  // Estado donde se guardará la lista de cultivos
  const [cultivos, setCultivos] = useState([]);

  useEffect(() => {
    // Obtener listado desde API
    fetch("/api/cultivos")
      .then((res) => res.json())
      .then((data) => setCultivos(data));
  }, []);

  return (
    <div className="p-6 min-h-screen" >
      
      {/* Título y acción */}
      <div className="flex justify-evenly items-center mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: "#3A4750" }}>
          Cultivos
        </h1>

        {/* Botón crear */}
        <Link
          href="/cultivos/nuevo"
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: "#00A86B" }}
        >
          Nuevo
        </Link>
      </div>

      {/* Listado */}
      <div className="space-y-3">
        {cultivos.map((c) => (
          <Link
            key={c.id}
            href={`/cultivos/${c.id}`}
            className="block p-4 rounded border hover:shadow transition"
            style={{
              backgroundColor: "white",
              borderColor: "#3A475055",
              color: "#3A4750"
            }}
          >
            <div className="text-lg font-medium">{c.nombre}</div>
            <div className="text-sm">Área: {c.area}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
