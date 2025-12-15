/**
 * Página de Estado del Sistema – AGRo_BIIO
 * 
 * Muestra el estado de conexión con el backend y variables de entorno.
 */

import { Card, Tag } from '@/components/ui';

export default function StatusPage() {
  return (
    <div className="space-y-[var(--space-lg)]">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        📊 Estado del Sistema
      </h1>

      <Card>
        <div className="space-y-[var(--space-md)]">
          {/* Estado de la API */}
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="font-medium">API Backend:</span>
            <Tag variant="warning">Pendiente de validación</Tag>
          </div>

          {/* Entorno */}
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="font-medium">Entorno:</span>
            <Tag variant="info">{process.env.NEXT_PUBLIC_ENV || 'desarrollo'}</Tag>
          </div>

          {/* Versión */}
          <div className="flex items-center gap-[var(--space-sm)]">
            <span className="font-medium">Versión:</span>
            <Tag variant="neutral">0.1.0</Tag>
          </div>
        </div>
      </Card>
    </div>
  );
}
