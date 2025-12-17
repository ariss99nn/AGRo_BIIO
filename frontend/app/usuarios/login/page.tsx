"use client";

/**
 * Página de Login – AGRo_BIIO
 *
 * Permite al usuario autenticarse en el sistema.
 * Usa componentes UI y tokens del sistema de diseño.
 */

import { useState } from "react";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("RESPUESTA LOGIN:", data);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        bg-[var(--color-bg-app)]
        p-[var(--space-lg)]
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-[var(--color-bg-card)]
          p-[var(--space-lg)]
          rounded-[var(--radius-lg)]
          shadow-[var(--shadow-md)]
          space-y-[var(--space-md)]
        "
      >
        {/* Título */}
        <h1 className="text-2xl font-semibold text-center text-[var(--color-primary)]">
          Iniciar sesión
        </h1>

        {/* Email */}
        <Input
          label="Correo"
          type="email"
          placeholder="tucorreo@correo.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* Password */}
        <Input
          label="Contraseña"
          type="password"
          placeholder="********"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* Acción */}
        <button
          type="submit"
          className="
            w-full
            bg-[var(--color-primary)]
            text-white
            py-[var(--space-sm)]
            rounded-[var(--radius-md)]
            font-medium
            hover:bg-[var(--color-primary-light)]
            transition-colors duration-[var(--transition-fast)]
          "
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}