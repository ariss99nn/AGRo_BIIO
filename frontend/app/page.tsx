/**
 * Página principal – AGRo_BIIO
 * 
 * Muestra una demo de los componentes de la Fase 0 y 1.
 * Sirve como playground para verificar tokens y estilos.
 */

import { Button, Card, Input, Tag, Loading, Empty, Skeleton } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="space-y-[var(--space-xl)]">
      {/* Título principal */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-[var(--space-sm)]">
          🌱 Bienvenido a AGRo_BIIO
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Sistema de gestión agrícola inteligente – Componentes UI
        </p>
      </div>

      {/* Grid de demos */}
      <div className="grid gap-[var(--space-lg)] lg:grid-cols-2">
        
        {/* Tarjeta con botones */}
        <Card>
          <h2 className="text-xl font-semibold mb-[var(--space-md)]">Botones</h2>
          <div className="flex flex-wrap gap-[var(--space-md)]">
            <Button variant="primary">Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" size="sm">Pequeño</Button>
            <Button variant="primary" disabled>Deshabilitado</Button>
          </div>
        </Card>

        {/* Tarjeta con inputs */}
        <Card>
          <h2 className="text-xl font-semibold mb-[var(--space-md)]">Inputs</h2>
          <div className="grid gap-[var(--space-md)]">
            <Input label="Nombre del cultivo" placeholder="Ej: Maíz amarillo" />
            <Input label="Con error" error="Este campo es requerido" />
          </div>
        </Card>

        {/* Tarjeta con tags */}
        <Card>
          <h2 className="text-xl font-semibold mb-[var(--space-md)]">Tags de estado</h2>
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            <Tag variant="success">Activo</Tag>
            <Tag variant="warning">Pendiente</Tag>
            <Tag variant="error">Crítico</Tag>
            <Tag variant="info">En proceso</Tag>
            <Tag variant="neutral">Archivado</Tag>
          </div>
        </Card>

        {/* Tarjeta con estados de carga */}
        <Card>
          <h2 className="text-xl font-semibold mb-[var(--space-md)]">Estados</h2>
          <div className="grid gap-[var(--space-md)]">
            <div className="p-[var(--space-sm)] border border-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
              <Loading size="sm" message="Cargando datos..." />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">Skeletons:</p>
              <div className="space-y-2">
                <Skeleton />
                <Skeleton width="75%" />
                <Skeleton width="50%" />
              </div>
            </div>
          </div>
        </Card>

        {/* Estado vacío */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-[var(--space-md)]">Estado vacío</h2>
          <Empty
            icon="🌱"
            title="Sin cultivos registrados"
            message="Comienza agregando tu primer cultivo al sistema."
            action={<Button variant="primary">Agregar cultivo</Button>}
          />
        </Card>

      </div>
    </div>
  );
}
