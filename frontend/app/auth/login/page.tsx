"use client";

import { useState } from "react";
import Input from "@/components/Inputs";

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
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#3A4750] p-6 rounded-xl shadow-md space-y-4"
            >
                <h1 className="text-2xl text-amber-500 font-semibold text-center">Iniciar Sesión</h1>

                <Input
                    label="Correo"
                    placeholder="tucorreo@correo.com"
                    value={form.email}
                    onChange={(e: any) => handleChange("email", e.target.value)}
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="********"
                    value={form.password}
                    onChange={(e: any) => handleChange("password", e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}
