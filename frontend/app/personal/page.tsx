/**
 * Página de Personal – AGRo_BIIO
 * 
 * Gestión del personal de la empresa agrícola.
 * Incluye: listado, roles, estado, asignaciones.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

/* Datos de ejemplo para personal */
const personalData = [
  { id: 1, nombre: 'Juan Pérez', cargo: 'Operador de maquinaria', rol: 'operador', estado: 'activo', telefono: '+54 9 11 1234-5678', email: 'juan.perez@agrobio.com', ingreso: '2020-03-15' },
  { id: 2, nombre: 'María García', cargo: 'Supervisora de campo', rol: 'supervisor', estado: 'activo', telefono: '+54 9 11 2345-6789', email: 'maria.garcia@agrobio.com', ingreso: '2019-08-20' },
  { id: 3, nombre: 'Carlos López', cargo: 'Técnico agrónomo', rol: 'tecnico', estado: 'activo', telefono: '+54 9 11 3456-7890', email: 'carlos.lopez@agrobio.com', ingreso: '2021-01-10' },
  { id: 4, nombre: 'Ana Martínez', cargo: 'Operadora de maquinaria', rol: 'operador', estado: 'licencia', telefono: '+54 9 11 4567-8901', email: 'ana.martinez@agrobio.com', ingreso: '2022-05-01' },
  { id: 5, nombre: 'Roberto Sánchez', cargo: 'Jefe de operaciones', rol: 'jefe', estado: 'activo', telefono: '+54 9 11 5678-9012', email: 'roberto.sanchez@agrobio.com', ingreso: '2018-02-28' },
  { id: 6, nombre: 'Laura Fernández', cargo: 'Asistente administrativa', rol: 'admin', estado: 'activo', telefono: '+54 9 11 6789-0123', email: 'laura.fernandez@agrobio.com', ingreso: '2023-03-15' },
];

/* Roles disponibles */
const roles = ['Todos', 'operador', 'supervisor', 'tecnico', 'jefe', 'admin'];
const rolLabels: Record<string, string> = {
  operador: 'Operador',
  supervisor: 'Supervisor',
  tecnico: 'Técnico',
  jefe: 'Jefe',
  admin: 'Administrativo',
};

/* Estados */
const estadoLabels: Record<string, string> = {
  activo: 'Activo',
  licencia: 'En licencia',
  inactivo: 'Inactivo',
};

export default function PersonalPage() {
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltro, setRolFiltro] = useState('Todos');

  /* Filtrar personal */
  const personalFiltrado = personalData.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              p.cargo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = rolFiltro === 'Todos' || p.rol === rolFiltro;
    return coincideBusqueda && coincideRol;
  });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
    activo: 'success',
    licencia: 'warning',
    inactivo: 'neutral',
  };

  /* Mapeo de rol a colores */
  const rolVariant: Record<string, 'info' | 'warning' | 'success' | 'error' | 'neutral'> = {
    operador: 'info',
    supervisor: 'warning',
    tecnico: 'success',
    jefe: 'error',
    admin: 'neutral',
  };

  /* KPIs */
  const kpis = {
    total: personalData.length,
    activos: personalData.filter(p => p.estado === 'activo').length,
    licencia: personalData.filter(p => p.estado === 'licencia').length,
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          👷 Personal
        </h1>
        <Button variant="primary">+ Agregar personal</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-3">
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{kpis.total}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total personal</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-success)]">{kpis.activos}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Activos</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-warning)]">{kpis.licencia}</p>
          <p className="text-sm text-[var(--color-text-muted)]">En licencia</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-[var(--space-md)]">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre o cargo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-[var(--space-sm)]">
            {roles.map((rol) => (
              <button
                key={rol}
                onClick={() => setRolFiltro(rol)}
                className={`
                  px-3 py-1.5 rounded-[var(--radius-full)] text-sm font-medium
                  transition-colors duration-[var(--transition-fast)]
                  ${rolFiltro === rol
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-white'
                  }
                `}
              >
                {rol === 'Todos' ? 'Todos' : rolLabels[rol]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid de personal */}
      {personalFiltrado.length === 0 ? (
        <Empty
          icon="👷"
          title="Sin personal"
          message="No se encontró personal con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setRolFiltro('Todos'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
          {personalFiltrado.map((persona) => (
            <Card key={persona.id} className="hover:shadow-[var(--shadow-lg)] transition-shadow">
              {/* Avatar y estado */}
              <div className="flex items-start justify-between mb-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-md)]">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-[var(--radius-full)] bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg">
                    {persona.nombre.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">{persona.nombre}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{persona.cargo}</p>
                  </div>
                </div>
                <Tag variant={estadoVariant[persona.estado]}>{estadoLabels[persona.estado]}</Tag>
              </div>

              {/* Tags de rol */}
              <div className="mb-[var(--space-md)]">
                <Tag variant={rolVariant[persona.rol]} size="md">{rolLabels[persona.rol]}</Tag>
              </div>

              {/* Información de contacto */}
              <div className="space-y-[var(--space-xs)] text-sm border-t border-[var(--color-bg-muted)] pt-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <span>📞</span>
                  <span className="text-[var(--color-text-muted)]">{persona.telefono}</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <span>✉️</span>
                  <span className="text-[var(--color-text-muted)] truncate">{persona.email}</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <span>📅</span>
                  <span className="text-[var(--color-text-muted)]">Ingreso: {persona.ingreso}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-[var(--space-sm)] mt-[var(--space-md)]">
                <Button variant="outline" size="sm" className="flex-1">Ver perfil</Button>
                <Button variant="primary" size="sm" className="flex-1">Editar</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {personalFiltrado.length} de {personalData.length} personas
      </p>
    </div>
  );
}
