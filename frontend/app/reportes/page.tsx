/**
 * Página de Reportes – AGRo_BIIO
 * 
 * Generación de reportes con filtros, métricas
 * y opciones de exportación.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input } from '@/components/ui';

/* Tipos de reportes disponibles */
const tiposReporte = [
  { id: 'produccion', nombre: 'Producción', icono: '🌾', descripcion: 'Rendimiento y volúmenes de cosecha' },
  { id: 'operaciones', nombre: 'Operaciones', icono: '⚙️', descripcion: 'Actividades y tareas realizadas' },
  { id: 'maquinaria', nombre: 'Maquinaria', icono: '🚜', descripcion: 'Uso y mantenimiento de equipos' },
  { id: 'inventario', nombre: 'Inventario', icono: '📦', descripcion: 'Stock y movimientos de insumos' },
  { id: 'personal', nombre: 'Personal', icono: '👷', descripcion: 'Horas trabajadas y asignaciones' },
  { id: 'financiero', nombre: 'Financiero', icono: '💰', descripcion: 'Costos, ingresos y rentabilidad' },
];

/* Presets guardados */
const presetsGuardados = [
  { id: 1, nombre: 'Reporte mensual de producción', tipo: 'produccion', periodo: 'Último mes' },
  { id: 2, nombre: 'Uso de maquinaria semanal', tipo: 'maquinaria', periodo: 'Última semana' },
  { id: 3, nombre: 'Inventario actual', tipo: 'inventario', periodo: 'Hoy' },
];

/* Métricas de ejemplo */
const metricas = [
  { titulo: 'Producción total', valor: '2,450', unidad: 'toneladas', cambio: '+12%', positivo: true },
  { titulo: 'Área cultivada', valor: '130', unidad: 'hectáreas', cambio: '+5%', positivo: true },
  { titulo: 'Horas máquina', valor: '1,240', unidad: 'horas', cambio: '-3%', positivo: false },
  { titulo: 'Costo por hectárea', valor: '$850', unidad: 'USD', cambio: '-8%', positivo: true },
];

export default function ReportesPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null);
  const [fechaInicio, setFechaInicio] = useState('2024-11-01');
  const [fechaFin, setFechaFin] = useState('2024-12-09');
  const [generando, setGenerando] = useState(false);

  /* Simular generación de reporte */
  const generarReporte = () => {
    setGenerando(true);
    setTimeout(() => setGenerando(false), 2000);
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            📈 Reportes
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Genera reportes personalizados de tu operación
          </p>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        {metricas.map((metrica, idx) => (
          <Card key={idx} padding="md">
            <p className="text-sm text-[var(--color-text-muted)] mb-1">{metrica.titulo}</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-[var(--color-text)]">{metrica.valor}</span>
                <span className="text-sm text-[var(--color-text-muted)] ml-1">{metrica.unidad}</span>
              </div>
              <span className={`text-sm font-medium ${metrica.positivo ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {metrica.cambio}
              </span>
            </div>
            {/* Mini barra visual */}
            <div className="h-1 mt-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
              <div 
                className={`h-full ${metrica.positivo ? 'bg-[var(--color-success)]' : 'bg-[var(--color-error)]'}`}
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-[var(--space-lg)] lg:grid-cols-3">
        {/* Panel de configuración */}
        <div className="lg:col-span-2 space-y-[var(--space-lg)]">
          {/* Selección de tipo de reporte */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-md)]">
              Tipo de reporte
            </h2>
            <div className="grid gap-[var(--space-sm)] sm:grid-cols-2 lg:grid-cols-3">
              {tiposReporte.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setTipoSeleccionado(tipo.id)}
                  className={`
                    p-[var(--space-md)] rounded-[var(--radius-md)] text-left
                    border-2 transition-all duration-[var(--transition-fast)]
                    ${tipoSeleccionado === tipo.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-bg-muted)] hover:border-[var(--color-primary-light)]'
                    }
                  `}
                >
                  <span className="text-2xl">{tipo.icono}</span>
                  <p className="font-medium text-[var(--color-text)] mt-2">{tipo.nombre}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{tipo.descripcion}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Filtros de fecha */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-md)]">
              Período
            </h2>
            <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
              <Input
                label="Fecha inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <Input
                label="Fecha fin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>

            {/* Atajos de período */}
            <div className="flex flex-wrap gap-[var(--space-sm)] mt-[var(--space-md)]">
              {['Hoy', 'Última semana', 'Último mes', 'Último trimestre', 'Este año'].map((periodo) => (
                <button
                  key={periodo}
                  className="px-3 py-1 rounded-[var(--radius-full)] text-sm bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  {periodo}
                </button>
              ))}
            </div>
          </Card>

          {/* Botones de acción */}
          <Card>
            <div className="flex flex-col sm:flex-row gap-[var(--space-md)]">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={generarReporte}
                disabled={!tipoSeleccionado || generando}
              >
                {generando ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generando...
                  </>
                ) : (
                  '📊 Generar reporte'
                )}
              </Button>
              <Button variant="outline" className="flex-1" disabled={!tipoSeleccionado}>
                📥 Exportar PDF
              </Button>
              <Button variant="outline" className="flex-1" disabled={!tipoSeleccionado}>
                📊 Exportar Excel
              </Button>
            </div>

            {/* Barra de progreso cuando genera */}
            {generando && (
              <div className="mt-[var(--space-md)]">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--color-text-muted)]">Generando reporte...</span>
                  <span className="text-[var(--color-primary)]">45%</span>
                </div>
                <div className="h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] animate-pulse" style={{ width: '45%' }} />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Panel lateral: Presets y historial */}
        <div className="space-y-[var(--space-lg)]">
          {/* Presets guardados */}
          <Card>
            <div className="flex items-center justify-between mb-[var(--space-md)]">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                ⭐ Presets guardados
              </h2>
              <Button variant="outline" size="sm">+ Guardar</Button>
            </div>
            <div className="space-y-[var(--space-sm)]">
              {presetsGuardados.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setTipoSeleccionado(preset.tipo)}
                  className="w-full p-[var(--space-sm)] rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] hover:bg-[var(--color-primary)]/10 text-left transition-colors"
                >
                  <p className="font-medium text-[var(--color-text)] text-sm">{preset.nombre}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{preset.periodo}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Historial de reportes */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-md)]">
              📋 Historial reciente
            </h2>
            <div className="space-y-[var(--space-sm)]">
              {[
                { nombre: 'Producción Nov 2024', fecha: '2024-12-01', formato: 'PDF' },
                { nombre: 'Inventario Q3', fecha: '2024-10-15', formato: 'Excel' },
                { nombre: 'Maquinaria Anual', fecha: '2024-09-30', formato: 'PDF' },
              ].map((reporte, idx) => (
                <div key={idx} className="flex items-center justify-between p-[var(--space-sm)] rounded-[var(--radius-md)] bg-[var(--color-bg-muted)]">
                  <div>
                    <p className="font-medium text-[var(--color-text)] text-sm">{reporte.nombre}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{reporte.fecha}</p>
                  </div>
                  <Tag variant="neutral">{reporte.formato}</Tag>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-[var(--space-md)]">
              Ver todo el historial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
