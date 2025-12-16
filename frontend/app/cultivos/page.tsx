/**
 * Página de Cultivos – AGRo_BIIO
 * 
 * Listado de cultivos activos con estado, área y progreso.
 * Incluye: búsqueda, filtros, tarjetas visuales.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Tag, Empty } from '@/components/ui';
import Link from 'next/link';
import cultivos from '@/api/cultivos.json';

/* Datos de ejemplo para cultivos */

const cultivosData = cultivos;


/* Estados disponibles para filtrar */
const estados = ['Todos', 'siembra', 'crecimiento', 'floracion', 'cosecha'];

/* Etiquetas de estado más amigables */
const estadoLabels: Record<string, string> = {
  siembra: 'Siembra',
  crecimiento: 'Crecimiento',
  floracion: 'Floración',
  cosecha: 'Cosecha',
};

export default function CultivosPage() {
  /* Estado para búsqueda y filtro */
  const [busqueda, setBusqueda] = useState('');
  const [estadoActivo, setEstadoActivo] = useState('Todos');

  /* Filtrar cultivos según búsqueda y estado */
  const cultivosFiltrados = cultivosData.filter((cultivo) => {
    const coincideBusqueda = cultivo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              cultivo.variedad.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = estadoActivo === 'Todos' || cultivo.estado === estadoActivo;
    return coincideBusqueda && coincideEstado;
  });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
    siembra: 'info',
    crecimiento: 'success',
    floracion: 'warning',
    cosecha: 'neutral',
  };

  /* Color de la barra de progreso según porcentaje */
  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'bg-[var(--color-success)]';
    if (progreso >= 40) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-info)]';
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          🌾 Cultivos Activos
        </h1>
        <Button variant="primary">+ Nuevo cultivo</Button>
      </div>

      {/* Resumen rápido */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-2xl font-bold text-[var(--color-primary)]">{cultivosData.length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Cultivos activos</p>
        </Card>
        <Card padding="sm">
          <p className="text-2xl font-bold text-[var(--color-secondary)]">
            {cultivosData.reduce((acc, c) => acc + c.area, 0)} ha
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">Área total</p>
        </Card>
        <Card padding="sm">
          <p className="text-2xl font-bold text-[var(--color-success)]">
            {cultivosData.filter(c => c.estado === 'cosecha').length}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">Listos para cosecha</p>
        </Card>
        <Card padding="sm">
          <p className="text-2xl font-bold text-[var(--color-info)]">
            {cultivosData.filter(c => c.estado === 'siembra').length}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">En siembra</p>
        </Card>
      </div>

      {/* Barra de búsqueda y filtros */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-[var(--space-md)]">
          {/* Input de búsqueda */}
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre o variedad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Filtros por estado */}
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {estados.map((est) => (
              <button
                key={est}
                onClick={() => setEstadoActivo(est)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${estadoActivo === est
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                  }
                `}
              >
                {est === 'Todos' ? 'Todos' : estadoLabels[est]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Listado de cultivos */}
      {cultivosFiltrados.length === 0 ? (
        <Empty
          icon="🌱"
          title="Sin cultivos"
          message="No se encontraron cultivos con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setEstadoActivo('Todos'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
          {cultivosFiltrados.map((cultivo) => (
            <Link key={cultivo.id} href={`/cultivos/${cultivo.id}`}>
              <Card className="h-full hover:shadow-[var(--shadow-lg)] transition-shadow duration-[var(--transition-normal)] cursor-pointer">
                {/* Cabecera con estado */}
                <div className="flex items-center justify-between mb-[var(--space-sm)]">
                  <Tag variant={estadoVariant[cultivo.estado]}>
                    {estadoLabels[cultivo.estado]}
                  </Tag>
                  <span className="text-sm text-[var(--color-text-muted)]">{cultivo.area} {cultivo.unidad}</span>
                </div>

                {/* Nombre y variedad */}
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-xs)]">
                  {cultivo.nombre}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-[var(--space-md)]">
                  {cultivo.variedad}
                </p>

                {/* Barra de progreso */}
                <div className="space-y-[var(--space-xs)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-muted)]">Progreso</span>
                    <span className="font-medium text-[var(--color-text)]">{cultivo.progreso}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgresoColor(cultivo.progreso)} transition-all duration-300`}
                      style={{ width: `${cultivo.progreso}%` }}
                    />
                  </div>
                </div>

                {/* Fecha de siembra */}
                <p className="text-xs text-[var(--color-text-light)] mt-[var(--space-sm)]">
                  Siembra: {cultivo.fechaSiembra}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Contador de resultados */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {cultivosFiltrados.length} de {cultivosData.length} cultivos
      </p>
    </div>
  );
}
