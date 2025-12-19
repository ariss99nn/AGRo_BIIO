/**
 * Página de Personal – AGRo_BIIO
 * 
 * Gestión del personal de la empresa agrícola.
 * Incluye: listado, creación, edición y eliminación.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Input, Empty } from '@/components/ui';

interface Personal {
  id: number;
  usuario_id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  cargo: string;
  fecha_ingreso: string;
  estado: boolean;
  telefono: string;
  email: string;
  username: string;
  foto: string | null;
}

export default function PersonalPage() {
  /* =========================
     STATE
     ========================= */
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Personal | null>(null);

  const [form, setForm] = useState<Omit<Personal, 'id' | 'usuario_id' | 'foto'>>({
    nombres: '',
    apellidos: '',
    cedula: '',
    cargo: '',
    fecha_ingreso: '',
    estado: true,
    telefono: '',
    email: '',
    username: '',
  });

  /* =========================
     API
     ========================= */
  const API_URL = 'http://localhost:8000/api/personal';


  const cargarPersonal = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPersonal(data);
    } catch (error) {
      console.error('Error cargando personal', error);
    }
  };

  useEffect(() => {
    cargarPersonal();
  }, []);

  /* =========================
     POST / PUT
     ========================= */
  const guardarPersonal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        editando ? `${API_URL}/${editando.id}` : API_URL,
        {
          method: editando ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      alert(editando ? 'Personal actualizado correctamente' : 'Personal creado correctamente');

      setForm({
        nombres: '',
        apellidos: '',
        cedula: '',
        cargo: '',
        fecha_ingreso: '',
        estado: true,
        telefono: '',
        email: '',
        username: '',
      });

      setEditando(null);
      setMostrarForm(false);
      cargarPersonal();
    } catch {
      alert('Error al guardar el personal');
    }
  };

  /* =========================
     DELETE
     ========================= */
  const eliminarPersonal = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();

      alert('Personal eliminado correctamente');
      cargarPersonal();
    } catch {
      alert('Error al eliminar el personal');
    }
  };

  /* =========================
     FILTRO
     ========================= */
  const personalFiltrado = personal.filter((p) => {
    const texto = `${p.nombres} ${p.apellidos} ${p.cargo}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  /* =========================
     KPIs
     ========================= */
  const kpis = {
    total: personal.length,
    activos: personal.filter(p => p.estado).length,
    inactivos: personal.filter(p => !p.estado).length,
  };

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="space-y-[var(--space-lg)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          👷 Personal
        </h1>
        <Button variant="primary" onClick={() => setMostrarForm(!mostrarForm)}>
          + Agregar personal
        </Button>
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
          <p className="text-3xl font-bold text-[var(--color-warning)]">{kpis.inactivos}</p>
          <p className="text-sm text-[var(--color-text-muted)]">Inactivos</p>
        </Card>
      </div>

      {/* Filtro */}
      <Card padding="md">
        <Input
          placeholder="Buscar por nombre o cargo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Card>

      {/* Grid */}
      {personalFiltrado.length === 0 ? (
        <Empty
          icon="👷"
          title="Sin personal"
          message="No se encontró personal."
        />
      ) : (
        <div className="grid gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
          {personalFiltrado.map((persona) => (
            <Card key={persona.id} className="hover:shadow-[var(--shadow-lg)] transition-shadow">
              {/* Avatar */}
              <div className="flex items-center gap-[var(--space-md)] mb-[var(--space-md)]">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                  {persona.nombres[0]}{persona.apellidos[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">
                    {persona.nombres} {persona.apellidos}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {persona.cargo}
                  </p>
                </div>
              </div>

              <Tag variant={persona.estado ? 'success' : 'neutral'}>
                {persona.estado ? 'Activo' : 'Inactivo'}
              </Tag>

              {/* Contacto */}
              <div className="space-y-[var(--space-xs)] text-sm border-t border-[var(--color-bg-muted)] pt-[var(--space-md)] mt-[var(--space-md)]">
                <div>📞 {persona.telefono}</div>
                <div>✉️ {persona.email}</div>
                <div>📅 Ingreso: {persona.fecha_ingreso}</div>
              </div>

              {/* Acciones */}
              <div className="flex gap-[var(--space-sm)] mt-[var(--space-md)]">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditando(persona);
                    setForm({
                      nombres: persona.nombres,
                      apellidos: persona.apellidos,
                      cedula: persona.cedula,
                      cargo: persona.cargo,
                      fecha_ingreso: persona.fecha_ingreso,
                      estado: persona.estado,
                      telefono: persona.telefono,
                      email: persona.email,
                      username: persona.username,
                    });
                    setMostrarForm(true);
                  }}
                >
                  Editar
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => eliminarPersonal(persona.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* FORM */}
      {mostrarForm && (
        <Card padding="md">
          <form onSubmit={guardarPersonal} className="grid gap-[var(--space-md)]">
            <Input label="Nombres" value={form.nombres} onChange={e => setForm({ ...form, nombres: e.target.value })} />
            <Input label="Apellidos" value={form.apellidos} onChange={e => setForm({ ...form, apellidos: e.target.value })} />
            <Input label="Cédula" value={form.cedula} onChange={e => setForm({ ...form, cedula: e.target.value })} />
            <Input label="Cargo" value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })} />
            <Input label="Fecha de ingreso" type="date" value={form.fecha_ingreso} onChange={e => setForm({ ...form, fecha_ingreso: e.target.value })} />
            <Input label="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Input label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />

            <Button type="submit" variant="primary">
              {editando ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
