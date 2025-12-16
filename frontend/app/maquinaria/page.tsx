/**
 * Página de Maquinaria – AGRo_BIIO
 * 
 * Gestión del inventario de maquinaria agrícola.
 * Incluye: estado de equipos, mantenimientos, asignaciones.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

/* Datos de ejemplo para maquinaria */
const maquinariaData = [
  { id: 1, nombre: 'Tractor John Deere 6M', tipo: 'Tractor', modelo: 'JD-6120M', año: 2022, estado: 'disponible', horasUso: 1250, proximoMantenimiento: '2024-12-20', ubicacion: 'Galpón 1' },
  { id: 2, nombre: 'Cosechadora Case IH', tipo: 'Cosechadora', modelo: 'AF-8250', año: 2021, estado: 'en_uso', horasUso: 890, proximoMantenimiento: '2024-12-15', ubicacion: 'Lote Este' },
  { id: 3, nombre: 'Pulverizadora Jacto', tipo: 'Pulverizadora', modelo: 'Uniport 3030', año: 2023, estado: 'disponible', horasUso: 320, proximoMantenimiento: '2025-01-10', ubicacion: 'Galpón 2' },
  { id: 4, nombre: 'Sembradora Agrometal', tipo: 'Sembradora', modelo: 'TX Mega 16', año: 2020, estado: 'mantenimiento', horasUso: 1850, proximoMantenimiento: '2024-12-10', ubicacion: 'Taller' },
  { id: 5, nombre: 'Tractor New Holland', tipo: 'Tractor', modelo: 'T7.245', año: 2023, estado: 'disponible', horasUso: 450, proximoMantenimiento: '2025-02-01', ubicacion: 'Galpón 1' },
  { id: 6, nombre: 'Mixer Mainero', tipo: 'Mixer', modelo: '2921', año: 2019, estado: 'en_uso', horasUso: 2100, proximoMantenimiento: '2024-12-18', ubicacion: 'Sector Ganadero' },
];

/* Estados disponibles */
const estados = ['Todos', 'disponible', 'en_uso', 'mantenimiento'];
const estadoLabels: Record<string, string> = {
  disponible: 'Disponible',
  en_uso: 'En Uso',
  mantenimiento: 'Mantenimiento',
};

export default function MaquinariaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos');

  /* Filtrar maquinaria */
  const maquinariaFiltrada = maquinariaData.filter((maq) => {
    const coincideBusqueda = maq.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              maq.tipo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = estadoFiltro === 'Todos' || maq.estado === estadoFiltro;
    return coincideBusqueda && coincideEstado;
  });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'warning' | 'info'> = {
    disponible: 'success',
    en_uso: 'info',
    mantenimiento: 'warning',
  };

  /* KPIs */
  const kpis = {
    total: maquinariaData.length,
    disponibles: maquinariaData.filter(m => m.estado === 'disponible').length,
    enUso: maquinariaData.filter(m => m.estado === 'en_uso').length,
    mantenimiento: maquinariaData.filter(m => m.estado === 'mantenimiento').length,
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          🚜 Maquinaria
        </h1>
        <Button variant="primary">+ Agregar equipo</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{kpis.total}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total equipos</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-success)]">{kpis.disponibles}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Disponibles</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-info)]">{kpis.enUso}</p>
          <p className="text-sm text-[var(--color-text-muted)]">En uso</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-warning)]">{kpis.mantenimiento}</p>
          <p className="text-sm text-[var(--color-text-muted)]">En mantenimiento</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-[var(--space-md)]">
          <div className="flex-1">
            <Input
              placeholder="Buscar equipo o tipo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
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
        </div>
      </Card>

      {/* Grid de maquinaria */}
      {maquinariaFiltrada.length === 0 ? (
        <Empty
          icon="🚜"
          title="Sin equipos"
          message="No se encontraron equipos con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setEstadoFiltro('Todos'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
          {maquinariaFiltrada.map((maq) => (
            <Card key={maq.id} className="hover:shadow-[var(--shadow-lg)] transition-shadow">
              {/* Cabecera */}
              <div className="flex items-center justify-between mb-[var(--space-sm)]">
                <Tag variant="neutral">{maq.tipo}</Tag>
                <Tag variant={estadoVariant[maq.estado]}>{estadoLabels[maq.estado]}</Tag>
              </div>

              {/* Nombre */}
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-xs)]">
                {maq.nombre}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-[var(--space-md)]">
                {maq.modelo} • {maq.año}
              </p>

              {/* Detalles */}
              <div className="space-y-[var(--space-xs)] text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Horas de uso:</span>
                  <span className="font-medium text-[var(--color-text)]">{maq.horasUso} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Ubicación:</span>
                  <span className="font-medium text-[var(--color-text)]">{maq.ubicacion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Próx. mantenimiento:</span>
                  <span className="font-medium text-[var(--color-text)]">{maq.proximoMantenimiento}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-[var(--space-sm)] mt-[var(--space-md)]">
                <Button variant="outline" size="sm" className="flex-1">Ver detalle</Button>
                <Button variant="primary" size="sm" className="flex-1">Asignar</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {maquinariaFiltrada.length} de {maquinariaData.length} equipos
      </p>
    </div>
  );
}
