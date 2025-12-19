/**
 * Página de Usuarios – AGRo_BIIO
 * 
 * Gestión de usuarios del sistema con roles y permisos.
 * Incluye: listado, roles, estado de cuenta, acciones.
 */

'use client';

import React, { useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

/* Datos de ejemplo para usuarios */
const usuariosData = [
  { id: 1, nombre: 'Admin Principal', email: 'admin@agrobio.com', rol: 'admin', estado: 'activo', ultimoAcceso: '2024-12-09 14:30' },
  { id: 2, nombre: 'Juan Pérez', email: 'juan.perez@agrobio.com', rol: 'operador', estado: 'activo', ultimoAcceso: '2024-12-09 10:15' },
  { id: 3, nombre: 'María García', email: 'maria.garcia@agrobio.com', rol: 'supervisor', estado: 'activo', ultimoAcceso: '2024-12-08 18:45' },
  { id: 4, nombre: 'Carlos López', email: 'carlos.lopez@agrobio.com', rol: 'tecnico', estado: 'activo', ultimoAcceso: '2024-12-09 09:00' },
  { id: 5, nombre: 'Ana Martínez', email: 'ana.martinez@agrobio.com', rol: 'operador', estado: 'inactivo', ultimoAcceso: '2024-11-20 16:30' },
  { id: 6, nombre: 'Roberto Sánchez', email: 'roberto.sanchez@agrobio.com', rol: 'gerente', estado: 'activo', ultimoAcceso: '2024-12-09 08:00' },
];

/* Roles disponibles */
const roles = ['Todos', 'admin', 'gerente', 'supervisor', 'tecnico', 'operador'];
const rolLabels: Record<string, string> = {
  admin: 'Administrador',
  gerente: 'Gerente',
  supervisor: 'Supervisor',
  tecnico: 'Técnico',
  operador: 'Operador',
};

/* Permisos por rol */
const permisosPorRol: Record<string, string[]> = {
  admin: ['Todo el sistema', 'Gestión de usuarios', 'Configuración'],
  gerente: ['Reportes', 'Operaciones', 'Personal', 'Maquinaria'],
  supervisor: ['Operaciones', 'Cultivos', 'Personal asignado'],
  tecnico: ['Cultivos', 'Alertas', 'IA'],
  operador: ['Operaciones asignadas', 'Maquinaria asignada'],
};

export default function UsuariosPage() {
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltro, setRolFiltro] = useState('Todos');

  /* Filtrar usuarios */
  const usuariosFiltrados = usuariosData.filter((u) => {
    const coincideBusqueda = u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                              u.email.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = rolFiltro === 'Todos' || u.rol === rolFiltro;
    return coincideBusqueda && coincideRol;
  });

  /* Mapeo de estado a variante de Tag */
  const estadoVariant: Record<string, 'success' | 'neutral'> = {
    activo: 'success',
    inactivo: 'neutral',
  };

  /* Mapeo de rol a colores */
  const rolVariant: Record<string, 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
    admin: 'error',
    gerente: 'warning',
    supervisor: 'info',
    tecnico: 'success',
    operador: 'neutral',
  };

  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-md)]">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          👤 Usuarios del Sistema
        </h1>
        <Button variant="primary">+ Invitar usuario</Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-[var(--space-md)] grid-cols-2 lg:grid-cols-4">
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-primary)]">{usuariosData.length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Total usuarios</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-success)]">{usuariosData.filter(u => u.estado === 'activo').length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Activos</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-error)]">{usuariosData.filter(u => u.rol === 'admin').length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Administradores</p>
        </Card>
        <Card padding="sm">
          <p className="text-3xl font-bold text-[var(--color-info)]">{usuariosData.filter(u => u.rol === 'operador').length}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Operadores</p>
        </Card>
      </div>

      {/* Filtros */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-[var(--space-md)]">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre o email..."
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

      {/* Tabla de usuarios */}
      {usuariosFiltrados.length === 0 ? (
        <Empty
          icon="👤"
          title="Sin usuarios"
          message="No se encontraron usuarios con los filtros seleccionados."
          action={<Button variant="outline" onClick={() => { setBusqueda(''); setRolFiltro('Todos'); }}>Limpiar filtros</Button>}
        />
      ) : (
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-bg-muted)]">
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Usuario</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Rol</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Permisos</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Estado</th>
                  <th className="text-left p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Último acceso</th>
                  <th className="text-right p-[var(--space-md)] text-sm font-semibold text-[var(--color-text-muted)]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-[var(--color-bg-muted)] hover:bg-[var(--color-bg-muted)] transition-colors">
                    <td className="p-[var(--space-md)]">
                      <div className="flex items-center gap-[var(--space-sm)]">
                        <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--color-primary)] flex items-center justify-center text-white font-medium">
                          {usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">{usuario.nombre}</p>
                          <p className="text-sm text-[var(--color-text-muted)]">{usuario.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <Tag variant={rolVariant[usuario.rol]}>{rolLabels[usuario.rol]}</Tag>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <p className="text-sm text-[var(--color-text-muted)] max-w-xs truncate">
                        {permisosPorRol[usuario.rol]?.join(', ')}
                      </p>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <Tag variant={estadoVariant[usuario.estado]}>
                        {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Tag>
                    </td>
                    <td className="p-[var(--space-md)]">
                      <span className="text-sm text-[var(--color-text-muted)]">{usuario.ultimoAcceso}</span>
                    </td>
                    <td className="p-[var(--space-md)] text-right">
                      <div className="flex gap-[var(--space-xs)] justify-end">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm">Permisos</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Contador */}
      <p className="text-sm text-[var(--color-text-muted)] text-center">
        Mostrando {usuariosFiltrados.length} de {usuariosData.length} usuarios
      </p>
    </div>
  );
}
