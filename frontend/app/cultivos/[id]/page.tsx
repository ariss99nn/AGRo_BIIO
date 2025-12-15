/**
 * Página de Detalle de Cultivo – AGRo_BIIO
 * 
 * Muestra información detallada de un cultivo.
 * Incluye: pestañas (info, actividades, notas), progreso visual.
 */

'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, Tag } from '@/components/ui';
import Link from 'next/link';

/* Datos de ejemplo (en producción vendrían del API) */
const cultivosDB: Record<string, {
  id: number;
  nombre: string;
  variedad: string;
  area: number;
  unidad: string;
  estado: string;
  progreso: number;
  fechaSiembra: string;
  fechaEstimadaCosecha: string;
  lote: string;
  responsable: string;
  actividades: { fecha: string; tipo: string; descripcion: string }[];
  notas: string[];
}> = {
  '1': {
    id: 1,
    nombre: 'Maíz - Lote Norte',
    variedad: 'Híbrido DK-7500',
    area: 25,
    unidad: 'ha',
    estado: 'crecimiento',
    progreso: 65,
    fechaSiembra: '2024-09-15',
    fechaEstimadaCosecha: '2025-02-15',
    lote: 'Lote Norte - Sector A',
    responsable: 'Juan Pérez',
    actividades: [
      { fecha: '2024-11-20', tipo: 'Fertilización', descripcion: 'Aplicación de NPK 15-15-15' },
      { fecha: '2024-11-10', tipo: 'Riego', descripcion: 'Riego por aspersión - 25mm' },
      { fecha: '2024-10-25', tipo: 'Control', descripcion: 'Monitoreo de plagas - Sin hallazgos' },
    ],
    notas: ['Cultivo en buen estado', 'Revisar humedad del suelo semanalmente'],
  },
  '2': {
    id: 2,
    nombre: 'Soja - Lote Sur',
    variedad: 'Don Mario 4670',
    area: 40,
    unidad: 'ha',
    estado: 'floracion',
    progreso: 45,
    fechaSiembra: '2024-10-01',
    fechaEstimadaCosecha: '2025-03-01',
    lote: 'Lote Sur - Sector B',
    responsable: 'María García',
    actividades: [
      { fecha: '2024-11-18', tipo: 'Herbicida', descripcion: 'Control de malezas' },
      { fecha: '2024-11-05', tipo: 'Fertilización', descripcion: 'Fertilizante foliar' },
    ],
    notas: ['Inicio de floración', 'Programar fumigación preventiva'],
  },
};

/* Pestañas disponibles */
const tabs = ['Información', 'Actividades', 'Notas'];

/* Etiquetas de estado */
const estadoLabels: Record<string, string> = {
  siembra: 'Siembra',
  crecimiento: 'Crecimiento',
  floracion: 'Floración',
  cosecha: 'Cosecha',
};

export default function CultivoDetallePage() {
  const params = useParams();
  const id = params.id as string;

  /* Estado de la pestaña activa */
  const [tabActiva, setTabActiva] = useState('Información');

  /* Buscar cultivo por ID */
  const cultivo = cultivosDB[id];

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
    siembra: 'info',
    crecimiento: 'success',
    floracion: 'warning',
    cosecha: 'neutral',
  };

  /* Color de la barra de progreso */
  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'bg-[var(--color-success)]';
    if (progreso >= 40) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-info)]';
  };

  /* Si no existe el cultivo */
  if (!cultivo) {
    return (
      <div className="space-y-[var(--space-lg)]">
        <Card>
          <div className="text-center py-[var(--space-xl)]">
            <span className="text-5xl mb-4 block">❓</span>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Cultivo no encontrado</h2>
            <p className="text-[var(--color-text-muted)] mt-2">El cultivo con ID {id} no existe.</p>
            <Link href="/cultivos">
              <Button variant="primary" className="mt-4">Volver a cultivos</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Breadcrumb y acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <div className="flex items-center gap-[var(--space-sm)] text-sm">
          <Link href="/cultivos" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            Cultivos
          </Link>
          <span className="text-[var(--color-text-light)]">/</span>
          <span className="text-[var(--color-text)]">{cultivo.nombre}</span>
        </div>
        <div className="flex gap-[var(--space-sm)]">
          <Button variant="outline">Editar</Button>
          <Button variant="primary">+ Registrar actividad</Button>
        </div>
      </div>

      {/* Cabecera del cultivo */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-[var(--space-lg)]">
          <div className="flex-1">
            <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
              <Tag variant={estadoVariant[cultivo.estado]}>
                {estadoLabels[cultivo.estado]}
              </Tag>
              <span className="text-sm text-[var(--color-text-muted)]">{cultivo.area} {cultivo.unidad}</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{cultivo.nombre}</h1>
            <p className="text-[var(--color-text-muted)] mt-1">{cultivo.variedad}</p>
          </div>

          {/* Progreso grande */}
          <div className="lg:w-64">
            <div className="text-center mb-[var(--space-sm)]">
              <p className="text-4xl font-bold text-[var(--color-primary)]">{cultivo.progreso}%</p>
              <p className="text-sm text-[var(--color-text-muted)]">Progreso del ciclo</p>
            </div>
            <div className="h-3 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgresoColor(cultivo.progreso)} transition-all duration-300`}
                style={{ width: `${cultivo.progreso}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Pestañas */}
      <div className="border-b border-[var(--color-bg-muted)]">
        <div className="flex gap-[var(--space-md)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setTabActiva(tab)}
              className={`
                py-[var(--space-sm)] px-[var(--space-md)]
                text-sm font-medium
                border-b-2 transition-colors duration-[var(--transition-fast)]
                ${tabActiva === tab
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de pestañas */}
      <Card>
        {tabActiva === 'Información' && (
          <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Variedad</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.variedad}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Lote</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.lote}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Responsable</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.responsable}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Fecha de siembra</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.fechaSiembra}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Cosecha estimada</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.fechaEstimadaCosecha}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Área</p>
              <p className="font-medium text-[var(--color-text)]">{cultivo.area} {cultivo.unidad}</p>
            </div>
          </div>
        )}

        {tabActiva === 'Actividades' && (
          <div className="space-y-[var(--space-md)]">
            {cultivo.actividades.map((act, idx) => (
              <div key={idx} className="flex items-start gap-[var(--space-md)] p-[var(--space-md)] bg-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
                <div className="w-3 h-3 mt-1.5 rounded-full bg-[var(--color-primary)]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[var(--color-text)]">{act.tipo}</p>
                    <span className="text-sm text-[var(--color-text-muted)]">{act.fecha}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{act.descripcion}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm">Ver historial completo</Button>
          </div>
        )}

        {tabActiva === 'Notas' && (
          <div className="space-y-[var(--space-sm)]">
            {cultivo.notas.map((nota, idx) => (
              <div key={idx} className="flex items-start gap-[var(--space-sm)] p-[var(--space-sm)] bg-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
                <span>📝</span>
                <p className="text-sm text-[var(--color-text)]">{nota}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="mt-[var(--space-md)]">+ Agregar nota</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
