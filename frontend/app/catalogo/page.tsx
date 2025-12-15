/**
 * Página de Catálogo – AGRo_BIIO
 * 
 * Listado de productos/insumos del catálogo agrícola.
 * Incluye: búsqueda, filtros por categoría, tarjetas con estado.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Tag, Empty } from '@/components/ui';
import Link from 'next/link';

/* Datos de ejemplo para el catálogo */
const catalogoData = [
  { id: 1, nombre: 'Fertilizante NPK', categoria: 'Fertilizantes', stock: 150, unidad: 'kg', estado: 'disponible' },
  { id: 2, nombre: 'Semilla de Maíz Híbrido', categoria: 'Semillas', stock: 500, unidad: 'kg', estado: 'disponible' },
  { id: 3, nombre: 'Herbicida Glifosato', categoria: 'Agroquímicos', stock: 25, unidad: 'L', estado: 'bajo' },
  { id: 4, nombre: 'Insecticida Orgánico', categoria: 'Agroquímicos', stock: 0, unidad: 'L', estado: 'agotado' },
  { id: 5, nombre: 'Semilla de Soja', categoria: 'Semillas', stock: 300, unidad: 'kg', estado: 'disponible' },
  { id: 6, nombre: 'Abono Orgánico', categoria: 'Fertilizantes', stock: 80, unidad: 'kg', estado: 'disponible' },
];

/* Categorías disponibles para filtrar */
const categorias = ['Todas', 'Fertilizantes', 'Semillas', 'Agroquímicos'];

export default function CatalogoPage() {
  /* Estado para búsqueda y filtro */
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  /* Filtrar productos según búsqueda y categoría */
  const productosFiltrados = catalogoData.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === 'Todas' || producto.categoria === categoriaActiva;
    return coincideBusqueda && coincideCategoria;
  });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant = {
    disponible: 'success' as const,
    bajo: 'warning' as const,
    agotado: 'error' as const,
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          📦 Catálogo de Insumos
        </h1>
        <Button variant="primary">+ Agregar producto</Button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-[var(--space-md)]">
          {/* Input de búsqueda */}
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${categoriaActiva === cat
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Listado de productos */}
      {productosFiltrados.length === 0 ? (
        <Empty
          icon="📦"
          title="Sin productos"
          message="No se encontraron productos con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setCategoriaActiva('Todas'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <Link key={producto.id} href={`/catalogo/${producto.id}`}>
              <Card className="h-full hover:shadow-[var(--shadow-lg)] transition-shadow duration-[var(--transition-normal)] cursor-pointer">
                {/* Cabecera con categoría y estado */}
                <div className="flex items-center justify-between mb-[var(--space-sm)]">
                  <Tag variant="neutral">{producto.categoria}</Tag>
                  <Tag variant={estadoVariant[producto.estado as keyof typeof estadoVariant]}>
                    {producto.estado}
                  </Tag>
                </div>

                {/* Nombre del producto */}
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-[var(--space-sm)]">
                  {producto.nombre}
                </h3>

                {/* Stock */}
                <p className="text-sm text-[var(--color-text-muted)]">
                  Stock: <span className="font-medium text-[var(--color-text)]">{producto.stock} {producto.unidad}</span>
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Contador de resultados */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {productosFiltrados.length} de {catalogoData.length} productos
      </p>
    </div>
  );
}
