/**
 * Página de IA – AGRo_BIIO
 * 
 * Panel de inteligencia artificial con recomendaciones,
 * insights y predicciones para la gestión agrícola.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag } from '@/components/ui';

/* Datos de ejemplo para insights IA */
const insightsData = [
  {
    id: 1,
    titulo: 'Optimizar riego en Lote Norte',
    categoria: 'riego',
    confianza: 92,
    impacto: 'alto',
    descripcion: 'Basado en datos de humedad y pronóstico, se recomienda reducir el riego un 20% esta semana.',
    ahorro: 'Ahorro estimado: 15,000 L de agua',
    accion: 'Aplicar recomendación',
  },
  {
    id: 2,
    titulo: 'Adelantar cosecha de trigo',
    categoria: 'cosecha',
    confianza: 87,
    impacto: 'alto',
    descripcion: 'Las condiciones climáticas de la próxima semana son óptimas. Retrasar podría reducir calidad.',
    ahorro: 'Mejora de calidad: +5% rendimiento',
    accion: 'Programar cosecha',
  },
  {
    id: 3,
    titulo: 'Tratamiento preventivo recomendado',
    categoria: 'plagas',
    confianza: 78,
    impacto: 'medio',
    descripcion: 'Patrón de humedad y temperatura favorece aparición de roya. Aplicar fungicida preventivo.',
    ahorro: 'Prevención de pérdida: 8% de la producción',
    accion: 'Ver tratamiento',
  },
  {
    id: 4,
    titulo: 'Rotación de cultivos sugerida',
    categoria: 'planificacion',
    confianza: 85,
    impacto: 'medio',
    descripcion: 'Para el próximo ciclo, rotar soja por maíz en Lote Sur mejorará la salud del suelo.',
    ahorro: 'Mejora de nutrientes: +12%',
    accion: 'Ver plan',
  },
  {
    id: 5,
    titulo: 'Mantenimiento predictivo: Cosechadora',
    categoria: 'maquinaria',
    confianza: 94,
    impacto: 'alto',
    descripcion: 'Análisis de datos indica desgaste en componentes. Programar revisión antes de cosecha.',
    ahorro: 'Evitar parada: 48 horas de operación',
    accion: 'Agendar mantenimiento',
  },
];

/* Categorías */
const categorias = ['Todas', 'riego', 'cosecha', 'plagas', 'planificacion', 'maquinaria'];
const categoriaLabels: Record<string, string> = {
  riego: 'Riego',
  cosecha: 'Cosecha',
  plagas: 'Plagas',
  planificacion: 'Planificación',
  maquinaria: 'Maquinaria',
};
const categoriaIconos: Record<string, string> = {
  riego: '💧',
  cosecha: '🌾',
  plagas: '🐛',
  planificacion: '📋',
  maquinaria: '🚜',
};

export default function IAPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  /* Filtrar insights */
  const insightsFiltrados = insightsData.filter((insight) => {
    return categoriaFiltro === 'Todas' || insight.categoria === categoriaFiltro;
  });

  /* Mapeo de impacto a variante */
  const impactoVariant: Record<string, 'success' | 'warning' | 'info'> = {
    alto: 'success',
    medio: 'warning',
    bajo: 'info',
  };

  /* Color de barra de confianza */
  const getConfianzaColor = (confianza: number) => {
    if (confianza >= 90) return 'bg-[var(--color-success)]';
    if (confianza >= 75) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-info)]';
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            🤖 Inteligencia Artificial
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Recomendaciones y predicciones basadas en datos
          </p>
        </div>
        <Button variant="primary">Generar nuevo análisis</Button>
      </div>

      {/* Resumen de IA */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm" className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <p className="text-3xl font-bold">{insightsData.length}</p>
          <p className="text-sm opacity-80">Insights activos</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-success)]">
            {insightsData.filter(i => i.impacto === 'alto').length}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">Alto impacto</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-info)]">
            {Math.round(insightsData.reduce((acc, i) => acc + i.confianza, 0) / insightsData.length)}%
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">Confianza promedio</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-secondary)]">3</p>
          <p className="text-sm text-[var(--color-text-muted)]">Aplicadas esta semana</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-wrap gap-[var(--space-sm)]">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`
                px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium
                transition-colors duration-[var(--transition-fast)]
                ${categoriaFiltro === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                }
              `}
            >
              {cat === 'Todas' ? '🔮 Todas' : `${categoriaIconos[cat]} ${categoriaLabels[cat]}`}
            </button>
          ))}
        </div>
      </Card>

      {/* Grid de insights */}
      <div className="grid gap-[var(--space-md)] lg:grid-cols-2">
        {insightsFiltrados.map((insight) => (
          <Card key={insight.id} className="hover:shadow-[var(--shadow-lg)] transition-shadow">
            {/* Cabecera */}
            <div className="flex items-start justify-between mb-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <span className="text-2xl">{categoriaIconos[insight.categoria]}</span>
                <Tag variant="neutral">{categoriaLabels[insight.categoria]}</Tag>
                <Tag variant={impactoVariant[insight.impacto]}>Impacto {insight.impacto}</Tag>
              </div>
            </div>

            {/* Título y descripción */}
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-sm)]">
              {insight.titulo}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-[var(--space-md)]">
              {insight.descripcion}
            </p>

            {/* Barra de confianza */}
            <div className="mb-[var(--space-md)]">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--color-text-muted)]">Confianza del modelo</span>
                <span className="font-medium text-[var(--color-text)]">{insight.confianza}%</span>
              </div>
              <div className="h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getConfianzaColor(insight.confianza)} transition-all`}
                  style={{ width: `${insight.confianza}%` }}
                />
              </div>
            </div>

            {/* Ahorro/beneficio estimado */}
            <div className="p-[var(--space-sm)] bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] mb-[var(--space-md)]">
              <p className="text-sm font-medium text-[var(--color-success)]">
                💰 {insight.ahorro}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-[var(--space-sm)]">
              <Button variant="primary" className="flex-1">{insight.accion}</Button>
              <Button variant="outline">Descartar</Button>
              <Button variant="outline">Más info</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info adicional */}
      <Card className="bg-[var(--color-bg-muted)]">
        <div className="flex items-center gap-[var(--space-md)]">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="font-semibold text-[var(--color-text)]">¿Cómo funciona?</h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Nuestro sistema de IA analiza datos históricos, condiciones climáticas, estado de cultivos y maquinaria
              para generar recomendaciones personalizadas que optimizan la producción y reducen costos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
