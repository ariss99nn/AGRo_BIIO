'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Empty } from '@/components/ui';
import Link from 'next/link';

/* ==============================
   ENDPOINT
================================ */
const API_URL = 'http://localhost/api/v1/productos';
// luego:
// const API_URL = 'http://localhost:8000/api/catalogo';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  unidad_por_defecto: string;
}

export default function CatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState('');

  /* FORM */
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    unidad_por_defecto: '',
  });

  /* ==============================
     GET
  ================================ */
  const obtenerProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  /* ==============================
     POST (simulado)
  ================================ */
  const crearProducto = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: form.nombre,
      descripcion: form.descripcion,
      unidad_por_defecto: form.unidad_por_defecto,
    };

    setProductos(prev => [...prev, nuevoProducto]);
    setMostrarForm(false);
    setForm({ nombre: '', descripcion: '', unidad_por_defecto: '' });

    alert('Producto creado (simulado)');
  };

  /* ==============================
     DELETE (simulado)
  ================================ */
  const eliminarProducto = (id: number) => {
    if (!confirm('¿Eliminar producto?')) return;
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  /* ==============================
     FILTRO
  ================================ */
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Catálogo</h1>
        <Button onClick={() => setMostrarForm(!mostrarForm)}>
          + Nuevo producto
        </Button>
      </div>

      {/* FORM */}
      {mostrarForm && (
        <Card>
          <h3 className="font-semibold mb-4">Nuevo producto</h3>

          <form onSubmit={crearProducto} className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Nombre"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />

            <Input
              placeholder="Unidad por defecto (kg, L, un)"
              value={form.unidad_por_defecto}
              onChange={e => setForm({ ...form, unidad_por_defecto: e.target.value })}
            />

            <Input
              placeholder="Descripción"
              className="sm:col-span-2"
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />

            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit">Guardar</Button>
              <Button variant="outline" onClick={() => setMostrarForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* BUSCADOR */}
      <Card>
        <Input
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </Card>

      {/* LISTA */}
      {productosFiltrados.length === 0 ? (
        <Empty title="Sin productos" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productosFiltrados.map(p => (
            <Card key={p.id}>
              <h3 className="font-semibold">{p.nombre}</h3>
              <p className="text-sm text-muted">{p.descripcion}</p>
              <p className="text-sm mt-1">
                Unidad: <strong>{p.unidad_por_defecto}</strong>
              </p>

              <div className="flex gap-2 mt-4">
                <Link href={`/catalogo/${p.id}`}>
                  <Button size="sm" variant="outline">Ver</Button>
                </Link>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
