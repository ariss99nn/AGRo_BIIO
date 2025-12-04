"use client";

import { useState } from "react";
import Input from "@/components/Inputs";

/*
  Página: Registrar nuevo cultivo
  - Basada en diseño limpio, utilizando el componente Input reutilizable
  - Colores aplicados desde esta página (el input NO contiene colores internos)
  - Preparada para conectar al POST del backend más adelante
*/

export default function NuevoCultivo() {

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    fechaInicio: "",
    area: "",
  });

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo del envío del formulario (POST al backend luego)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Datos enviados:", form);

    // Aquí conectarás al backend:
    // fetch("/api/cultivos", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6">

      {/* Título principal */}
      <h1 className="text-2xl text-center font-bold mb-6 text-green-500">
        Registrar Nuevo Cultivo
      </h1>

      {/* FORMULARIO */}
      <form 
        onSubmit={handleSubmit}
        className=" bg-[#374151] shadow-lg rounded-xl p-6 space-y-6 border border-neutral-200"
      >

        {/* Nombre del cultivo */}
        <Input
          label="Nombre del cultivo"
          name="nombre"
          placeholder="Ej: Maíz amarillo"
          value={form.nombre}
          onChange={handleChange}
          className="border-neutral-300 focus:ring-green-700"
        />

        {/* Tipo de cultivo */}
        <Input
          label="Tipo"
          name="tipo"
          placeholder="Ej: Cereales, Hortaliza..."
          value={form.tipo}
          onChange={handleChange}
          className="border-neutral-300 focus:ring-green-700"
        />

        {/* Fecha de inicio */}
        <Input
          label="Fecha de inicio"
          name="fechaInicio"
          type="date"
          value={form.fechaInicio}
          onChange={handleChange}
          className="border-neutral-300 focus:ring-green-700"
        />

        {/* Área de cultivo */}
        <Input
          label="Área (m²)"
          name="area"
          type="number"
          placeholder="Ej: 500"
          value={form.area}
          onChange={handleChange}
          className="border-neutral-300 focus:ring-green-700"
        />

        {/* Botón de guardar */}
        <button
          type="submit"
          className="
            w-full py-3 font-semibold rounded-lg 
            bg-green-700 text-white
            hover:bg-green-800 transition
          "
        >
          Guardar Cultivo
        </button>
      </form>
    </div>
  );
}
