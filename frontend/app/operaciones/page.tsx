/**
 * Página de Operaciones – AGRo_BIIO
 * 
 * Tablero de operaciones agrícolas con KPIs, tabla interactiva
 * y gestión de tareas/actividades programadas.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

/* Datos de ejemplo para operaciones */
const operacionesData = [
  { id: 1, titulo: 'Fumigación Lote Norte', tipo: 'Fumigación', cultivo: 'Maíz', fecha: '2024-12-10', estado: 'pendiente', prioridad: 'alta', asignado: 'Juan Pérez' },
  { id: 2, titulo: 'Riego Lote Sur', tipo: 'Riego', cultivo: 'Soja', fecha: '2024-12-09', estado: 'en_progreso', prioridad: 'media', asignado: 'María García' },
  { id: 3, titulo: 'Cosecha Lote Este', tipo: 'Cosecha', cultivo: 'Trigo', fecha: '2024-12-15', estado: 'pendiente', prioridad: 'alta', asignado: 'Carlos López' },
  { id: 4, titulo: 'Fertilización Lote Central', tipo: 'Fertilización', cultivo: 'Maíz', fecha: '2024-12-08', estado: 'completada', prioridad: 'baja', asignado: 'Ana Martínez' },
  { id: 5, titulo: 'Control de plagas', tipo: 'Fumigación', cultivo: 'Girasol', fecha: '2024-12-11', estado: 'pendiente', prioridad: 'media', asignado: 'Juan Pérez' },
  { id: 6, titulo: 'Siembra Lote Oeste', tipo: 'Siembra', cultivo: 'Girasol', fecha: '2024-12-07', estado: 'completada', prioridad: 'alta', asignado: 'María García' },
];

/* KPIs calculados */
const kpis = {
  total: operacionesData.length,
  pendientes: operacionesData.filter(o => o.estado === 'pendiente').length,
  enProgreso: operacionesData.filter(o => o.estado === 'en_progreso').length,
  completadas: operacionesData.filter(o => o.estado === 'completada').length,
};

/* Estados disponibles para filtrar */
const estados = ['Todos', 'pendiente', 'en_progreso', 'completada'];
const estadoLabels: Record<string, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En Progreso',
  completada: 'Completada',
};

export default function OperacionesPage() {
  /* Estado para filtros y ordenamiento */
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos');
  const [ordenarPor, setOrdenarPor] = useState<'fecha' | 'prioridad'>('fecha');

  /* Filtrar operaciones */
  const operacionesFiltradas = operacionesData
    .filter((op) => {
      const coincideBusqueda = op.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                                op.cultivo.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = estadoFiltro === 'Todos' || op.estado === estadoFiltro;
      return coincideBusqueda && coincideEstado;
    })
    .sort((a, b) => {
      if (ordenarPor === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      }
      const prioridadOrden = { alta: 3, media: 2, baja: 1 };
      return prioridadOrden[b.prioridad as keyof typeof prioridadOrden] - prioridadOrden[a.prioridad as keyof typeof prioridadOrden];
    });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'warning' | 'info'> = {
    pendiente: 'warning',
    en_progreso: 'info',
    completada: 'success',
  };

  /* Mapeo de prioridad a variante */
  const prioridadVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
    alta: 'error',
    media: 'warning',
    baja: 'neutral',
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          ⚙️ Operaciones
        </h1>
        <Button variant="primary">+ Nueva operación</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{kpis.total}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total operaciones</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-warning)]">{kpis.pendientes}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Pendientes</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-info)]">{kpis.enProgreso}</p>
          <p className="text-sm text-[var(--color-text-muted)]">En progreso</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-success)]">{kpis.completadas}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Completadas</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-[var(--space-md)]">
          <div className="flex-1">
            <Input
              placeholder="Buscar operación o cultivo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          {/* Filtro por estado */}
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {estados.map((est) => (
              <button
                key={est}
                onClick={() => setEstadoFiltro(est)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${estadoFiltro === est
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                  }
                `}
              >
                {est === 'Todos' ? 'Todos' : estadoLabels[est]}
              </button>
            ))}
          </div>

          {/* Ordenar */}
          <select
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value as 'fecha' | 'prioridad')}
            className="px-3 py-2 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-[var(--color-bg-muted)] text-sm"
          >
            <option value="fecha">Ordenar por fecha</option>
            <option value="prioridad">Ordenar por prioridad</option>
          </select>
        </div>
      </Card>

      {/* Tabla de operaciones */}
      {operacionesFiltradas.length === 0 ? (
        <Empty
          icon="⚙️"
          title="Sin operaciones"
          message="No se encontraron operaciones con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setEstadoFiltro('Todos'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-bg-muted)]">
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Operación</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Tipo</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Cultivo</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Fecha</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Prioridad</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Estado</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Asignado</th>
                  <th className="text-right p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {operacionesFiltradas.map((op) => (
                  <tr key={op.id} className="border-b border-[var(--color-bg-muted)] hover:bg-[var(--color-bg-muted)] transition-colors">
                    <td className="p-[var(--space-md)]">
                      <p className="font-medium text-[var(--color-text)]">{op.titulo}</p>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-text-muted)]">{op.tipo}</span>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-text)]">{op.cultivo}</span>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-text-muted)]">{op.fecha}</span>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <Tag variant={prioridadVariant[op.prioridad]}>{op.prioridad}</Tag>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <Tag variant={estadoVariant[op.estado]}>{estadoLabels[op.estado]}</Tag>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-text)]">{op.asignado}</span>
                    </td>
                    <td className="p-[var(--space-md)] text-right">
                      <Button variant="outline" size="sm">Ver</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Contador */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {operacionesFiltradas.length} de {operacionesData.length} operaciones
      </p>
    </div>
  );
}
