"use client";

/*
  Componente Input reutilizable:
  - Permite pasar label, placeholder, type, name, value y onChange
  - No define colores para permitir adaptar estilos según el contexto
  - Controla el tamaño y el layout responsive mediante Tailwind
  - Incluye borde, spacing y tipografía básica sin imposición de colores
*/

import React from "react";

interface InputProps {
  label: string;                    // Texto visible arriba del input
  name: string;                     // Atributo name del campo
  placeholder?: string;             // Placeholder opcional
  type?: string;                    // Tipo: text, number, email, etc.
  value?: string | number;          // Valor controlado
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string;               // Permite agregar estilos externos (colores, estados, etc.)
}

export default function Input({
  label,
  name,
  placeholder = "",
  type = "text",
  value,
  onChange,
  className = "",
}: InputProps) {
  return (
    <div className="flex flex-col w-full max-w-full space-y-1">
      
      {/* Etiqueta del input */}
      <label 
        htmlFor={name}
        className="text-sm font-medium"
      >
        {label}
      </label>

      {/* Campo de entrada */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`
          w-full 
          px-3 py-2
          rounded-lg
          border
          outline-none
          focus:ring-2
          transition
          text-sm
          ${className}      /* Colores y estilos externos vendrán aquí */
        `}
      />
    </div>
  );
}
