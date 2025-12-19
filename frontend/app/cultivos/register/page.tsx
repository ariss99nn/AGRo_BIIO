"use client";

/**
 * Registro de Cultivos – AGRo_BIIO
 *
 * Permite crear un nuevo cultivo agrícola.
 * Conectado al backend Django.
 */

import { useState } from "react";
import { Card, Button, Input } from "@/components/ui";

export default function NuevoCultivoPage() {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "OTRO",
    descripcion: "",
    fecha_siembra: "",
    fecha_cosecha_estimada: "",
    area_sembrada: "",
    estado: "PLANIFICADO",
    notas: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/cultivos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 🔐 luego agregas Authorization
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("CULTIVO REGISTRADO:", data);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-app)] p-[var(--space-lg)]">
      <Card className="max-w-2xl mx-auto p-[var(--space-lg)] space-y-[var(--space-md)]">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          🌱 Registrar nuevo cultivo
        </h1>

        {/* Nombre */}
        <Input
          label="Nombre del cultivo"
          placeholder="Ej: Maíz amarillo"
          value={form.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />

        {/* Tipo */}
        <div className="flex flex-col gap-[var(--space-xs)]">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Tipo de cultivo
          </label>
          <select
            value={form.tipo}
            onChange={(e) => handleChange("tipo", e.target.value)}
            className="
              px-[var(--space-md)] py-[var(--space-sm)]
              border-2 rounded-[var(--radius-md)]
              bg-[var(--color-bg-card)]
              border-[var(--color-bg-muted)]
              focus:border-[var(--color-primary)]
              focus:outline-none
            "
          >
            <option value="CEREAL">Cereal</option>
            <option value="HORTALIZA">Hortaliza</option>
            <option value="FRUTA">Fruta</option>
            <option value="LEGUMBRE">Legumbre</option>
            <option value="TUBERCULO">Tubérculo</option>
            <option value="OTRO">Otro</option>
          </select>
        </div>

        {/* Fechas */}
        <div className="grid md:grid-cols-2 gap-[var(--space-md)]">
          <Input
            label="Fecha de siembra"
            type="date"
            value={form.fecha_siembra}
            onChange={(e) =>
              handleChange("fecha_siembra", e.target.value)
            }
          />

          <Input
            label="Fecha estimada de cosecha"
            type="date"
            value={form.fecha_cosecha_estimada}
            onChange={(e) =>
              handleChange("fecha_cosecha_estimada", e.target.value)
            }
          />
        </div>

        {/* Área */}
        <Input
          label="Área sembrada (m²)"
          placeholder="Ej: 2500"
          value={form.area_sembrada}
          onChange={(e) =>
            handleChange("area_sembrada", e.target.value)
          }
        />

        {/* Estado */}
        <div className="flex flex-col gap-[var(--space-xs)]">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Estado del cultivo
          </label>
          <select
            value={form.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
            className="
              px-[var(--space-md)] py-[var(--space-sm)]
              border-2 rounded-[var(--radius-md)]
              bg-[var(--color-bg-card)]
              border-[var(--color-bg-muted)]
              focus:border-[var(--color-primary)]
              focus:outline-none
            "
          >
            <option value="PLANIFICADO">Planificado</option>
            <option value="SEMBRADO">Sembrado</option>
            <option value="CRECIMIENTO">En crecimiento</option>
            <option value="MADURO">Maduro</option>
            <option value="COSECHADO">Cosechado</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </div>

        {/* Descripción */}
        <Input
          label="Descripción"
          placeholder="Detalles generales del cultivo"
          value={form.descripcion}
          onChange={(e) =>
            handleChange("descripcion", e.target.value)
          }
        />

        {/* Notas */}
        <Input
          label="Notas adicionales"
          placeholder="Observaciones importantes"
          value={form.notas}
          onChange={(e) => handleChange("notas", e.target.value)}
        />

        {/* Acción */}
        <Button variant="primary" className="w-full">
          Registrar cultivo
        </Button>
      </Card>
    </main>
  );
}
