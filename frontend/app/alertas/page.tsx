/**
 * Página de Alertas – AGRo_BIIO
 * 
 * Centro de alertas del sistema con prioridades,
 * filtros rápidos y acciones contextuales.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Empty } from '@/components/ui';

/* Datos de ejemplo para alertas */
const alertasData = [
  { id: 1, titulo: 'Nivel crítico de humedad en Lote Norte', tipo: 'cultivo', prioridad: 'critica', fecha: '2024-12-09 14:30', leida: false, descripcion: 'La humedad del suelo ha bajado al 15%. Se recomienda riego inmediato.' },
  { id: 2, titulo: 'Mantenimiento programado: Tractor JD-6120M', tipo: 'maquinaria', prioridad: 'media', fecha: '2024-12-09 10:00', leida: false, descripcion: 'El tractor requiere mantenimiento preventivo. Fecha límite: 20/12/2024.' },
  { id: 3, titulo: 'Stock bajo: Fertilizante NPK', tipo: 'inventario', prioridad: 'alta', fecha: '2024-12-08 16:45', leida: true, descripcion: 'El stock de fertilizante NPK está por debajo del mínimo. Quedan 50kg.' },
  { id: 4, titulo: 'Pronóstico de heladas para mañana', tipo: 'clima', prioridad: 'critica', fecha: '2024-12-09 08:00', leida: false, descripcion: 'Se pronostican heladas para mañana a las 5:00 AM. Temperatura mínima: -2°C.' },
  { id: 5, titulo: 'Plaga detectada en cultivo de soja', tipo: 'cultivo', prioridad: 'alta', fecha: '2024-12-07 11:30', leida: true, descripcion: 'Se detectó presencia de chinche en el Lote Sur. Revisar y aplicar tratamiento.' },
  { id: 6, titulo: 'Licencia de operador próxima a vencer', tipo: 'personal', prioridad: 'baja', fecha: '2024-12-06 09:00', leida: true, descripcion: 'La licencia de Juan Pérez vence en 30 días. Programar renovación.' },
  { id: 7, titulo: 'Cosecha lista en Lote Este', tipo: 'cultivo', prioridad: 'media', fecha: '2024-12-09 07:00', leida: false, descripcion: 'El trigo en Lote Este ha alcanzado madurez óptima para cosecha.' },
];

/* Tipos de alerta */
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
  const [tipoFiltro, setTipoFiltro] = useState('Todas');
  const [prioridadFiltro, setPrioridadFiltro] = useState('Todas');
  const [soloNoLeidas, setSoloNoLeidas] = useState(false);

  /* Filtrar alertas */
  const alertasFiltradas = alertasData.filter((alerta) => {
    const coincideTipo = tipoFiltro === 'Todas' || alerta.tipo === tipoFiltro;
    const coincidePrioridad = prioridadFiltro === 'Todas' || alerta.prioridad === prioridadFiltro;
    const coincideLeida = !soloNoLeidas || !alerta.leida;
    return coincideTipo && coincidePrioridad && coincideLeida;
  });

  /* Mapeo de prioridad a variante de Tag */
  const prioridadVariant: Record<string, 'error' | 'warning' | 'info' | 'neutral'> = {
    critica: 'error',
    alta: 'warning',
    media: 'info',
    baja: 'neutral',
  };

  /* KPIs */
  const kpis = {
    total: alertasData.length,
    noLeidas: alertasData.filter(a => !a.leida).length,
    criticas: alertasData.filter(a => a.prioridad === 'critica').length,
    hoy: alertasData.filter(a => a.fecha.startsWith('2024-12-09')).length,
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          🔔 Centro de Alertas
        </h1>
        <Button variant="outline">Marcar todas como leídas</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{kpis.total}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total alertas</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-info)]">{kpis.noLeidas}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Sin leer</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-error)]">{kpis.criticas}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Críticas</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-secondary)]">{kpis.hoy}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Hoy</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col lg:flex-row gap-[var(--space-md)]">
          {/* Filtro por tipo */}
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoFiltro(tipo)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${tipoFiltro === tipo
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                  }
                `}
              >
                {tipo === 'Todas' ? 'Todas' : `${tipoIconos[tipo]} ${tipoLabels[tipo]}`}
              </button>
            ))}
          </div>

          {/* Filtro por prioridad */}
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {prioridades.map((prio) => (
              <button
                key={prio}
                onClick={() => setPrioridadFiltro(prio)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${prioridadFiltro === prio
                    ? 'bg-[var(--color-secondary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-secondary-light)] hover:text-white'
                  }
                `}
              >
                {prio === 'Todas' ? 'Prioridad' : prioridadLabels[prio]}
              </button>
            ))}
          </div>

          {/* Toggle solo no leídas */}
          <label className="flex items-center gap-[var(--space-sm)] cursor-pointer">
            <input
              type="checkbox"
              checked={soloNoLeidas}
              onChange={(e) => setSoloNoLeidas(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-bg-muted)]"
            />
            <span className="text-sm text-[var(--color-text-muted)]">Solo no leídas</span>
          </label>
        </div>
      </Card>

      {/* Lista de alertas */}
      {alertasFiltradas.length === 0 ? (
        <Empty
          icon="🔔"
          title="Sin alertas"
          message="No hay alertas con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setTipoFiltro('Todas'); setPrioridadFiltro('Todas'); setSoloNoLeidas(false); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="space-y-[var(--space-md)]">
          {alertasFiltradas.map((alerta) => (
            <Card
              key={alerta.id}
              className={`
                transition-all duration-[var(--transition-fast)]
                ${!alerta.leida ? 'border-l-4 border-l-[var(--color-primary)]' : ''}
                hover:shadow-[var(--shadow-lg)]
              `}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[var(--space-md)]">
                <div className="flex-1">
                  {/* Cabecera de alerta */}
                  <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
                    <span className="text-xl">{tipoIconos[alerta.tipo]}</span>
                    <Tag variant={prioridadVariant[alerta.prioridad]}>{prioridadLabels[alerta.prioridad]}</Tag>
                    <Tag variant="neutral">{tipoLabels[alerta.tipo]}</Tag>
                    {!alerta.leida && (
                      <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                    )}
                  </div>

                  {/* Título y descripción */}
                  <h3 className={`text-lg font-semibold mb-[var(--space-xs)] ${!alerta.leida ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
                    {alerta.titulo}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{alerta.descripcion}</p>

                  {/* Fecha */}
                  <p className="text-xs text-[var(--color-text-light)] mt-[var(--space-sm)]">
                    {alerta.fecha}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex gap-[var(--space-sm)]">
                  <Button variant="outline" size="sm">
                    {alerta.leida ? 'Marcar no leída' : 'Marcar leída'}
                  </Button>
                  <Button variant="primary" size="sm">Ver detalle</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {alertasFiltradas.length} de {alertasData.length} alertas
      </p>
    </div>
  );
}
