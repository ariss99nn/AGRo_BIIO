'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Tag, Empty } from '@/components/ui';
import Link from 'next/link';

/* ==============================
   ENDPOINT REAL
================================ */
const API_URL = 'http://localhost:8000/api/cultivos';

/* ==============================
   TIPOS
================================ */
interface Cultivo {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  fecha_siembra: string;
  fecha_cosecha_estimada: string;
  area_sembrada: string;
  estado: string;
  notas: string;
}

/* Estados */
const estados = ['Todos', 'SEMBRADO', 'CRECIMIENTO', 'FLORACION', 'COSECHA'];

const estadoLabels: Record<string, string> = {
  SEMBRADO: 'Sembrado',
  CRECIMIENTO: 'Crecimiento',
  FLORACION: 'Floración',
  COSECHA: 'Cosecha',
};

export default function CultivosPage() {
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [estadoActivo, setEstadoActivo] = useState('Todos');

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Cultivo | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    fecha_siembra: '',
    fecha_cosecha_estimada: '',
    area_sembrada: '',
    estado: 'SEMBRADO',
    notas: '',
  });

  /* ==============================
     GET
  ================================ */
  const obtenerCultivos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCultivos(data);
  };

  useEffect(() => {
    obtenerCultivos();
  }, []);

  /* ==============================
     POST / PUT
  ================================ */
  const guardarCultivo = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${editando.id}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert('Error al guardar cultivo');
      return;
    }

    alert(editando ? 'Cultivo actualizado' : 'Cultivo creado');
    setMostrarForm(false);
    setEditando(null);
    obtenerCultivos();
  };

  /* ==============================
     DELETE
  ================================ */
  const eliminarCultivo = async (id: number) => {
    if (!confirm('¿Eliminar este cultivo?')) return;

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      alert('Error al eliminar cultivo');
      return;
    }

    alert('Cultivo eliminado');
    obtenerCultivos();
  };

  /* ==============================
     FILTROS
  ================================ */
  const cultivosFiltrados = cultivos.filter(c => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.tipo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      estadoActivo === 'Todos' || c.estado === estadoActivo;

    return coincideBusqueda && coincideEstado;
  });

  const estadoVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
    SEMBRADO: 'info',
    CRECIMIENTO: 'success',
    FLORACION: 'warning',
    COSECHA: 'neutral',
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌾 Cultivos</h1>
        <Button onClick={() => { setMostrarForm(true); setEditando(null); }}>
          + Nuevo cultivo
        </Button>
      </div>

      {/* FORMULARIO */}
      {mostrarForm && (
        <Card>
          <h3 className="font-semibold mb-4">
            {editando ? 'Editar cultivo' : 'Nuevo cultivo'}
          </h3>

          <form onSubmit={guardarCultivo} className="grid gap-4 sm:grid-cols-2">
            {Object.entries(form).map(([key, value]) => (
              <Input
                key={key}
                label={key.replaceAll('_', ' ')}
                value={value}
                onChange={e =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}

            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit">Guardar</Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setMostrarForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* FILTROS */}
      <Card>
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Buscar cultivo..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />

          {estados.map(est => (
            <button
              key={est}
              onClick={() => setEstadoActivo(est)}
              className={`px-3 py-1 rounded-full text-sm ${
                estadoActivo === est
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-muted)]'
              }`}
            >
              {est === 'Todos' ? 'Todos' : estadoLabels[est]}
            </button>
          ))}
        </div>
      </Card>

      {/* LISTA */}
      {cultivosFiltrados.length === 0 ? (
        <Empty title="Sin cultivos" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cultivosFiltrados.map(c => (
            <Card key={c.id} className="hover:shadow-lg">
              <div className="flex justify-between mb-2">
                <Tag variant={estadoVariant[c.estado]}>
                  {estadoLabels[c.estado]}
                </Tag>
                <span>{c.area_sembrada} m²</span>
              </div>

              <h3 className="font-semibold">{c.nombre}</h3>
              <p className="text-sm text-muted">{c.tipo}</p>

              <div className="flex gap-2 mt-4">
                <Link href={`/cultivos/${c.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    Ver detalle
                  </Button>
                </Link>

                <Button
                  size="sm"
                  onClick={() => {
                    setEditando(c);
                    setForm(c as any);
                    setMostrarForm(true);
                  }}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => eliminarCultivo(c.id)}
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
