'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, Input } from '@/components/ui';
import Link from 'next/link';

const API_URL = 'http://localhost/api/v1/productos';

export default function CatalogoDetallePage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<any>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    unidad_por_defecto: '',
  });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find((p: any) => p.id === Number(id));
        setProducto(encontrado);
        setForm(encontrado);
      });
  }, [id]);

  /* PUT simulado */
  const actualizarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    setProducto(form);
    setEditando(false);
    alert('Producto actualizado (simulado)');
  };

  if (!producto) {
    return (
      <Card className="p-8 text-center">
        <p>Producto no encontrado</p>
        <Link href="/catalogo">
          <Button className="mt-4">Volver</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{producto.nombre}</h1>
        <Button variant="outline" onClick={() => setEditando(!editando)}>
          {editando ? 'Cancelar' : 'Editar'}
        </Button>
      </div>

      <Card>
        {editando ? (
          <form onSubmit={actualizarProducto} className="grid gap-4">
            <Input
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
            <Input
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />
            <Input
              value={form.unidad_por_defecto}
              onChange={e => setForm({ ...form, unidad_por_defecto: e.target.value })}
            />
            <Button type="submit">Guardar cambios</Button>
          </form>
        ) : (
          <>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Unidad por defecto:</strong> {producto.unidad_por_defecto}</p>
          </>
        )}
      </Card>
    </div>
  );
}
