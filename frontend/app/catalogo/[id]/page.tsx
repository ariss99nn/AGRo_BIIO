/**
 * Página de Detalle de Producto – AGRo_BIIO
 * 
 * Muestra información detallada de un producto del catálogo.
 * Incluye: pestañas (info, trazabilidad, notas), acciones.
 */

'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, Tag } from '@/components/ui';
import Link from 'next/link';

/* Datos de ejemplo (en producción vendrían del API) */
const productosDB: Record<string, {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  unidad: string;
  estado: string;
  descripcion: string;
  proveedor: string;
  lote: string;
  fechaIngreso: string;
  notas: string[];
}> = {
  '1': {
    id: 1,
    nombre: 'Fertilizante NPK',
    categoria: 'Fertilizantes',
    stock: 150,
    unidad: 'kg',
    estado: 'disponible',
    descripcion: 'Fertilizante balanceado NPK 15-15-15 para uso general en cultivos.',
    proveedor: 'AgroQuímica S.A.',
    lote: 'LOT-2024-001',
    fechaIngreso: '2024-11-15',
    notas: ['Almacenar en lugar seco', 'Revisar fecha de vencimiento'],
  },
  '2': {
    id: 2,
    nombre: 'Semilla de Maíz Híbrido',
    categoria: 'Semillas',
    stock: 500,
    unidad: 'kg',
    estado: 'disponible',
    descripcion: 'Semilla certificada de maíz híbrido de alto rendimiento.',
    proveedor: 'Semillas del Campo',
    lote: 'LOT-2024-002',
    fechaIngreso: '2024-10-20',
    notas: ['Mantener refrigerado', 'Usar antes de 6 meses'],
  },
};

/* Pestañas disponibles */
const tabs = ['Información', 'Trazabilidad', 'Notas'];

export default function CatalogoDetallePage() {
  const params = useParams();
  const id = params.id as string;

  /* Estado de la pestaña activa */
  const [tabActiva, setTabActiva] = useState('Información');

  /* Buscar producto por ID */
  const producto = productosDB[id];

  /* Mapeo de estado a variante de Tag */
  const estadoVariant = {
    disponible: 'success' as const,
    bajo: 'warning' as const,
    agotado: 'error' as const,
  };

  /* Si no existe el producto */
  if (!producto) {
    return (
      <div className="space-y-[var(--space-lg)]">
        <Card>
          <div className="text-center py-[var(--space-xl)]">
            <span className="text-5xl mb-4 block">❓</span>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Producto no encontrado</h2>
            <p className="text-[var(--color-text-muted)] mt-2">El producto con ID {id} no existe.</p>
            <Link href="/catalogo">
              <Button variant="primary" className="mt-4">Volver al catálogo</Button>
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
          <Link href="/catalogo" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            Catálogo
          </Link>
          <span className="text-[var(--color-text-light)]">/</span>
          <span className="text-[var(--color-text)]">{producto.nombre}</span>
        </div>
        <div className="flex gap-[var(--space-sm)]">
          <Button variant="outline">Editar</Button>
          <Button variant="primary">Registrar movimiento</Button>
        </div>
      </div>

      {/* Cabecera del producto */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-[var(--space-md)]">
          <div>
            <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
              <Tag variant="neutral">{producto.categoria}</Tag>
              <Tag variant={estadoVariant[producto.estado as keyof typeof estadoVariant]}>
                {producto.estado}
              </Tag>
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{producto.nombre}</h1>
            <p className="text-[var(--color-text-muted)] mt-1">{producto.descripcion}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[var(--color-primary)]">{producto.stock}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{producto.unidad} en stock</p>
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
          <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Categoría</p>
              <p className="font-medium text-[var(--color-text)]">{producto.categoria}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Proveedor</p>
              <p className="font-medium text-[var(--color-text)]">{producto.proveedor}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Stock actual</p>
              <p className="font-medium text-[var(--color-text)]">{producto.stock} {producto.unidad}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">Estado</p>
              <Tag variant={estadoVariant[producto.estado as keyof typeof estadoVariant]}>
                {producto.estado}
              </Tag>
            </div>
          </div>
        )}

        {tabActiva === 'Trazabilidad' && (
          <div className="space-y-[var(--space-md)]">
            <div className="flex items-center gap-[var(--space-md)] p-[var(--space-md)] bg-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
              <div className="w-3 h-3 rounded-full bg-[var(--color-success)]" />
              <div>
                <p className="font-medium text-[var(--color-text)]">Ingreso al almacén</p>
                <p className="text-sm text-[var(--color-text-muted)]">{producto.fechaIngreso} – Lote: {producto.lote}</p>
              </div>
            </div>
            <div className="flex items-center gap-[var(--space-md)] p-[var(--space-md)] bg-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
              <div className="w-3 h-3 rounded-full bg-[var(--color-info)]" />
              <div>
                <p className="font-medium text-[var(--color-text)]">Proveedor: {producto.proveedor}</p>
                <p className="text-sm text-[var(--color-text-muted)]">Origen verificado</p>
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'Notas' && (
          <div className="space-y-[var(--space-sm)]">
            {producto.notas.map((nota, idx) => (
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
