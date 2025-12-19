'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

/* ==============================
   ENDPOINT REAL
================================ */
const API_URL = 'http://localhost:8000/api/maquinaria';

/* ==============================
   TIPOS
================================ */
interface Maquinaria {
  id: number;
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  ficha_tecnica: string;
  estado: string;
  horas_uso: number;
  fecha_adquisicion: string;
  ultima_revision: string;
  responsable_actual: number;
}

/* ==============================
   ESTADOS
================================ */
const estados = ['Todos', 'OPERATIVA', 'MANTENIMIENTO', 'FUERA_DE_SERVICIO'];

const estadoLabels: Record<string, string> = {
  OPERATIVA: 'Operativa',
  MANTENIMIENTO: 'Mantenimiento',
  FUERA_DE_SERVICIO: 'Fuera de servicio',
};

export default function MaquinariaPage() {
  const [maquinaria, setMaquinaria] = useState<Maquinaria[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos');

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Maquinaria | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    marca: '',
    modelo: '',
    ficha_tecnica: '',
    estado: 'OPERATIVA',
    horas_uso: 0,
    fecha_adquisicion: '',
    ultima_revision: '',
    responsable_actual: 1,
  });

  /* ==============================
     GET
  ================================ */
  const cargarMaquinaria = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMaquinaria(data);
  };

  useEffect(() => {
    cargarMaquinaria();
  }, []);

  /* ==============================
     POST / PUT
  ================================ */
  const guardarMaquinaria = async () => {
    const method = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${editando.id}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert('Error al guardar maquinaria');
      return;
    }

    alert(editando ? 'Equipo actualizado' : 'Equipo creado');
    setMostrarForm(false);
    setEditando(null);
    cargarMaquinaria();
  };

  /* ==============================
     DELETE
  ================================ */
  const eliminarMaquinaria = async (id: number) => {
    if (!confirm('¿Eliminar este equipo?')) return;

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      alert('Error al eliminar');
      return;
    }

    alert('Equipo eliminado');
    cargarMaquinaria();
  };

  /* ==============================
     FILTROS
  ================================ */
  const maquinariaFiltrada = maquinaria.filter((m) => {
    const coincideBusqueda =
      m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.tipo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      estadoFiltro === 'Todos' || m.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🚜 Maquinaria</h1>
        <Button onClick={() => { setMostrarForm(true); setEditando(null); }}>
          + Agregar equipo
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {estados.map((est) => (
            <button
              key={est}
              onClick={() => setEstadoFiltro(est)}
              className={`px-3 py-1 rounded-full text-sm ${
                estadoFiltro === est
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-muted)]'
              }`}
            >
              {est === 'Todos' ? 'Todos' : estadoLabels[est]}
            </button>
          ))}
        </div>
      </Card>

      {/* GRID */}
      {maquinariaFiltrada.length === 0 ? (
        <Empty title="Sin maquinaria" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {maquinariaFiltrada.map((m) => (
            <Card key={m.id}>
              <div className="flex justify-between mb-2">
                <Tag>{m.tipo}</Tag>
                <Tag>{estadoLabels[m.estado]}</Tag>
              </div>

              <h3 className="font-semibold">{m.nombre}</h3>
              <p className="text-sm text-muted">{m.marca} • {m.modelo}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditando(m);
                    setForm(m);
                    setMostrarForm(true);
                  }}
                >
                  Editar
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => eliminarMaquinaria(m.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FORMULARIO */}
      {mostrarForm && (
        <Card>
          <h2 className="text-xl font-bold mb-4">
            {editando ? 'Editar equipo' : 'Nuevo equipo'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(form).map(([key, value]) => (
              <Input
                key={key}
                label={key.replaceAll('_', ' ')}
                value={String(value)}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={guardarMaquinaria}>Guardar</Button>
            <Button variant="outline" onClick={() => setMostrarForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
