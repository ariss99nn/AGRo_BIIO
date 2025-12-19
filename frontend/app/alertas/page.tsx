/**
 * Página de Alertas – AGRo_BIIO
 * 
 * Centro de alertas del sistema con prioridades,
 * filtros rápidos y acciones contextuales.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Empty, Input } from '@/components/ui';

interface Alerta {
  id: number;
  tipo: string;
  prioridad: 'critica' | 'alta' | 'media' | 'baja';
  leida: boolean;
  fecha: string;
  titulo: string;
  descripcion: string;
}

/* Tipos de alerta (UI) */
const tipos = ['Todas', 'cultivo', 'maquinaria', 'inventario', 'clima', 'personal'];
const tipoLabels: Record<string, string> = {
  cultivo: 'Cultivo',
  maquinaria: 'Maquinaria',
  inventario: 'Inventario',
  clima: 'Clima',
  personal: 'Personal',
};
const tipoIconos: Record<string, string> = {
  cultivo: '🌾',
  maquinaria: '🚜',
  inventario: '📦',
  clima: '🌤️',
  personal: '👷',
};

/* Prioridades */
const prioridades = ['Todas', 'critica', 'alta', 'media', 'baja'];
const prioridadLabels: Record<string, string> = {
  critica: 'Crítica',
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
};

export default function AlertasPage() {
  /* =========================
     STATE
     ========================= */
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [tipoFiltro, setTipoFiltro] = useState('Todas');
  const [prioridadFiltro, setPrioridadFiltro] = useState('Todas');
  const [soloNoLeidas, setSoloNoLeidas] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  /* Form POST según body real */
  const [form, setForm] = useState({
    tipo: 'STOCK_LOW',
    target_type: 'INSUMO',
    target_id: '',
    min_stock: '',
    mensaje_template: '',
    activo: true,
  });

  const API_URL = 'http://localhost:8000/api/alertas';

  /* =========================
     GET ALERTAS
     ========================= */
  const cargarAlertas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAlertas(data);
    } catch (error) {
      console.error('Error cargando alertas', error);
    }
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  /* =========================
     POST ALERTA
     ========================= */
  const crearAlerta = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      tipo: form.tipo,
      target_type: form.target_type,
      target_id: Number(form.target_id),
      parametros: {
        min_stock: Number(form.min_stock),
      },
      mensaje_template: form.mensaje_template,
      activo: form.activo,
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      alert('Alerta creada correctamente');
      setMostrarForm(false);
      cargarAlertas();
    } catch {
      alert('Error al crear la alerta');
    }
  };

  /* =========================
     FILTROS
     ========================= */
  const alertasFiltradas = alertas.filter((alerta) => {
    const coincideTipo = tipoFiltro === 'Todas' || alerta.tipo === tipoFiltro;
    const coincidePrioridad = prioridadFiltro === 'Todas' || alerta.prioridad === prioridadFiltro;
    const coincideLeida = !soloNoLeidas || !alerta.leida;
    return coincideTipo && coincidePrioridad && coincideLeida;
  });

  /* =========================
     KPIs
     ========================= */
  const kpis = {
    total: alertas.length,
    noLeidas: alertas.filter(a => !a.leida).length,
    criticas: alertas.filter(a => a.prioridad === 'critica').length,
    hoy: alertas.filter(a => a.fecha?.startsWith(new Date().toISOString().slice(0, 10))).length,
  };

  const prioridadVariant: Record<'critica' | 'alta' | 'media' | 'baja', 'error' | 'warning' | 'info' | 'neutral'> = {
    critica: 'error',
    alta: 'warning',
    media: 'info',
    baja: 'neutral',
  };

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">🔔 Centro de Alertas</h1>
        <Button variant="primary" onClick={() => setMostrarForm(!mostrarForm)}>
          + Crear alerta
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-3xl font-bold">{kpis.total}</p>
          <p>Total alertas</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold">{kpis.noLeidas}</p>
          <p>Sin leer</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold">{kpis.criticas}</p>
          <p>Críticas</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold">{kpis.hoy}</p>
          <p>Hoy</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-[var(--space-md)]">
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoFiltro(tipo)}
                className={`px-3 py-1.5 rounded-full text-sm
                  ${tipoFiltro === tipo ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-muted)]'}
                `}
              >
                {tipo === 'Todas' ? 'Todas' : `${tipoIconos[tipo]} ${tipoLabels[tipo]}`}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Lista */}
      {alertasFiltradas.length === 0 ? (
        <Empty icon="🔔" title="Sin alertas" />
      ) : (
        <div className="space-y-[var(--space-md)]">
          {alertasFiltradas.map((alerta) => (
            <Card key={alerta.id} className={!alerta.leida ? 'border-l-4 border-l-[var(--color-primary)]' : ''}>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-2 mb-1">
                    <Tag variant={prioridadVariant[alerta.prioridad]}>
                      {prioridadLabels[alerta.prioridad]}
                    </Tag>
                    <Tag variant="neutral">{alerta.tipo}</Tag>
                  </div>
                  <h3 className="font-semibold">{alerta.titulo}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{alerta.descripcion}</p>
                  <p className="text-xs mt-1">{alerta.fecha}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FORM POST */}
      {mostrarForm && (
        <Card padding="md">
          <form onSubmit={crearAlerta} className="grid gap-[var(--space-md)]">
            <Input label="Target ID" value={form.target_id}
              onChange={e => setForm({ ...form, target_id: e.target.value })} />

            <Input label="Stock mínimo" value={form.min_stock}
              onChange={e => setForm({ ...form, min_stock: e.target.value })} />

            <Input label="Mensaje template"
              value={form.mensaje_template}
              onChange={e => setForm({ ...form, mensaje_template: e.target.value })} />

            <Button type="submit">Crear alerta</Button>
          </form>
        </Card>
      )}
    </div>
  );
}
