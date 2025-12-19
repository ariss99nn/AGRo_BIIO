"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { Button, Card } from "@/components/ui";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    username: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:8000/api/usuarios/registro/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    console.log("REGISTRO:", data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg-app)]">
      <Card className="w-full max-w-lg p-[var(--space-lg)] space-y-[var(--space-md)]">
        <h1 className="text-2xl font-semibold text-center text-[var(--color-primary)]">
          Crear cuenta
        </h1>

        <Input
          label="Nombre"
          placeholder="Ej: Juan Pablo"
          value={form.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />

        <Input
          label="Usuario"
          placeholder="Ej: juanpablo23"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <Input
          label="Correo"
          type="email"
          placeholder="correo@ejemplo.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          label="Teléfono"
          placeholder="Ej: +57 300 123 4567"
          value={form.telefono}
          onChange={(e) => handleChange("telefono", e.target.value)}
        />

        <Input
          label="Dirección"
          placeholder="Ej: Vereda El Porvenir, Finca San José"
          value={form.direccion}
          onChange={(e) => handleChange("direccion", e.target.value)}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Button variant="primary" className="w-full">
          Registrarse
        </Button>
      </Card>
    </main>
  );
}
