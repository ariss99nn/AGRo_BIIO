"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cultivoOpen, setCultivoOpen] = useState(false);
  const [consumoOpen, setConsumoOpen] = useState(false);

  // Aquí controlarás la sesión real más adelante
  const isLoggedIn = false;

  return (
    <nav className="bg-green-700 text-stone-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <img className=" w-15" src="/logo.png" alt="Logo" width={120} height={40} />
        <h1 className="text-2xl font-bold"></h1>
        
        {/* Botón móvil */}
        <button 
          onClick={() => setOpen(!open)}
          className="md:hidden text-stone-50 focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* NAV DESKTOP */}
        <div className="hidden md:flex space-x-8">

          {isLoggedIn ? (
            <>
              {/* Cultivo */}
              <div 
                className="relative group" 
                onMouseEnter={() => setCultivoOpen(true)}
                onMouseLeave={() => setCultivoOpen(false)}
              >
                <button className="hover:text-amber-300">Cultivo</button>
                {cultivoOpen && (
                  <div className="absolute bg-stone-50 text-slate-800 shadow rounded mt-2 w-40">
                    <Link href="/cultivos/nuevo" className="block px-4 py-2 hover:bg-green-200">Lista de Cultivo</Link>
                    <Link href="app/cultivo/nuevo" className="block px-4 py-2 hover:bg-green-200">Registrar Cultivo</Link>
                  </div>
                )}
              </div>

              {/* Consumos */}
              <div 
                className="relative group"
                onMouseEnter={() => setConsumoOpen(true)}
                onMouseLeave={() => setConsumoOpen(false)}
              >
                <button className="hover:text-amber-300">Consumos</button>
                {consumoOpen && (
                  <div className="absolute bg-stone-50 text-slate-800 shadow rounded mt-2 w-40">
                    <Link href="/consumos/lista" className="block px-4 py-2 hover:bg-green-200">Lista de Consumos</Link>
                    <Link href="/consumos/registrar" className="block px-4 py-2 hover:bg-green-200">Registrar Consumo</Link>
                  </div>
                )}
              </div>

              <Link href="/productos" className="hover:text-amber-300">Productos</Link>
            </>
          ) : (
            <>
              <Link href="/about" className="hover:text-amber-300">About Us</Link>
              <Link href="/auth/login" className="hover:text-amber-300">Iniciar Sesión</Link>
              <Link href="/auth/register" className="hover:text-amber-300">Registrarse</Link>
            </>
          )}
        </div>
      </div>

      {/* NAV MÓVIL */}
      {open && (
        <div className="md:hidden bg-green-700 px-4 pb-4 space-y-3">

          {isLoggedIn ? (
            <>
              {/* Cultivo */}
              <div>
                <button 
                  onClick={() => setCultivoOpen(!cultivoOpen)}
                  className="w-full flex justify-between items-center py-2"
                >
                  Cultivo
                  <span>{cultivoOpen ? "▲" : "▼"}</span>
                </button>
                {cultivoOpen && (
                  <div className="pl-4 space-y-2">
                    <Link href="/cultivo/lista" className="block hover:text-amber-300">Lista de Cultivo</Link>
                    <Link href="/cultivo/registrar" className="block hover:text-amber-300">Registrar Cultivo</Link>
                  </div>
                )}
              </div>

              {/* Consumos */}
              <div>
                <button 
                  onClick={() => setConsumoOpen(!consumoOpen)}
                  className="w-full flex justify-between items-center py-2"
                >
                  Consumos
                  <span>{consumoOpen ? "▲" : "▼"}</span>
                </button>
                {consumoOpen && (
                  <div className="pl-4 space-y-2">
                    <Link href="/consumos/lista" className="block hover:text-amber-300">Lista de Consumos</Link>
                    <Link href="/consumos/registrar" className="block hover:text-amber-300">Registrar Consumo</Link>
                  </div>
                )}
              </div>

              <Link href="/productos" className="block py-2 hover:text-amber-300">
                Productos
              </Link>
            </>
          ) : (
            <>
              <Link href="/about" className="block py-2 hover:text-amber-300">About Us</Link>
              <Link href="/login" className="block py-2 hover:text-amber-300">Iniciar Sesión</Link>
              <Link href="/register" className="block py-2 hover:text-amber-300">Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
