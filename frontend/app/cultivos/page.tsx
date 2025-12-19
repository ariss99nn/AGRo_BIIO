'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Tag, Empty } from '@/components/ui';
import Link from 'next/link';


/* ==============================
   ENDPOINT
================================ */
const API_URL = '/api/cultivos.json';
// luego:
// const API_URL = 'http://localhost:8000/api/cultivos';

interface Cultivo {
  id: number;
  nombre: string;
  variedad: string;
  area: number;
  unidad: string;
  estado: 'siembra' | 'crecimiento' | 'floracion' | 'cosecha';
  progreso: number;
  fechaSiembra: string;
}

/* Estados */
const estados = ['Todos', 'siembra', 'crecimiento', 'floracion', 'cosecha'];

const estadoLabels: Record<string, string> = {
  siembra: 'Siembra',
  crecimiento: 'Crecimiento',
  floracion: 'Floración',
  cosecha: 'Cosecha',
};

export default function CultivosPage() {
  const [cultivos, setCultivos] = useState<Cultivo[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [estadoActivo, setEstadoActivo] = useState('Todos');

  /* FORM */
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    variedad: '',
    area: '',
    estado: 'siembra',
    fechaSiembra: '',
  });

  /* ==============================
     FETCH (GET)
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
     POST (SIMULADO)
  ================================ */
  const crearCultivo = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoCultivo: Cultivo = {
      id: Date.now(),
      nombre: form.nombre,
      variedad: form.variedad,
      area: Number(form.area),
      unidad: 'ha',
      estado: form.estado as Cultivo['estado'],
      progreso: 0,
      fechaSiembra: form.fechaSiembra,
    };

    setCultivos(prev => [...prev, nuevoCultivo]);
    setMostrarForm(false);

    setForm({
      nombre: '',
      variedad: '',
      area: '',
      estado: 'siembra',
      fechaSiembra: '',
    });

    alert('Cultivo creado (simulado)');
  };

  /* ==============================
     FILTROS
  ================================ */
  const cultivosFiltrados = cultivos.filter(c => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.variedad.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      estadoActivo === 'Todos' || c.estado === estadoActivo;

    return coincideBusqueda && coincideEstado;
  });

  const estadoVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
    siembra: 'info',
    crecimiento: 'success',
    floracion: 'warning',
    cosecha: 'neutral',
  };

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'bg-[var(--color-success)]';
    if (progreso >= 40) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-info)]';
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌾 Cultivos Activos</h1>
        <Button onClick={() => setMostrarForm(!mostrarForm)}>
          + Nuevo cultivo
        </Button>
      </div>

      {/* FORMULARIO */}
      {mostrarForm && (
        <Card>
          <h3 className="font-semibold mb-4">Nuevo cultivo</h3>

          <form onSubmit={crearCultivo} className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Nombre"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />

            <Input
              placeholder="Variedad"
              value={form.variedad}
              onChange={e => setForm({ ...form, variedad: e.target.value })}
            />

            <Input
              placeholder="Área (ha)"
              type="number"
              value={form.area}
              onChange={e => setForm({ ...form, area: e.target.value })}
            />

            <Input
              type="date"
              value={form.fechaSiembra}
              onChange={e => setForm({ ...form, fechaSiembra: e.target.value })}
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

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><p className="text-2xl">{cultivos.length}</p>Cultivos</Card>
        <Card><p className="text-2xl">{cultivos.reduce((a, c) => a + c.area, 0)} ha</p>Área</Card>
        <Card><p className="text-2xl">{cultivos.filter(c => c.estado === 'cosecha').length}</p>Cosecha</Card>
        <Card><p className="text-2xl">{cultivos.filter(c => c.estado === 'siembra').length}</p>Siembra</Card>
      </div>

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
            <Link key={c.id} href={`/cultivos/${c.id}`}>
              <Card className="cursor-pointer hover:shadow-lg">
                <div className="flex justify-between mb-2">
                  <Tag variant={estadoVariant[c.estado]}>
                    {estadoLabels[c.estado]}
                  </Tag>
                  <span>{c.area} {c.unidad}</span>
                </div>

                <h3 className="font-semibold">{c.nombre}</h3>
                <p className="text-sm text-muted">{c.variedad}</p>

                <div className="mt-3">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{c.progreso}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className={`${getProgresoColor(c.progreso)} h-full`}
                      style={{ width: `${c.progreso}%` }}
                    />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
