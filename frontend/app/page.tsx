"use client";

/**
 * Dashboard – AGRo_BIIO
 *
 * - Si el usuario está autenticado → muestra dashboard completo
 * - Si NO está autenticado → muestra vista pública con CTA
 *
 * ⚠️ isAuthenticated es temporal.
 * Luego se reemplaza por token / sesión real.
 */

import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Tag,
  Loading,
  Empty,
  Skeleton,
} from "@/components/ui";

export default function DashboardPage() {
  /**
   * 🔐 ESTADO DE AUTENTICACIÓN
   * ------------------------
   * Cambiar esto luego por:
   * - cookie
   * - token JWT
   * - contexto global
   */
  const isAuthenticated = false;

  return (
    <main className="p-[var(--space-lg)]">
      {/* ======================================================
          🔐 DASHBOARD PARA USUARIO AUTENTICADO
         ====================================================== */}
      { /*isAuthenticated && */ (
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
            {/* Botones */}
            <Card>
              <h2 className="text-xl font-semibold mb-[var(--space-md)]">
                Botones
              </h2>
              <div className="flex flex-wrap gap-[var(--space-md)]">
                <Button variant="primary">Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="primary" size="sm">
                  Pequeño
                </Button>
                <Button variant="primary" disabled>
                  Deshabilitado
                </Button>
              </div>
            </Card>

            {/* Inputs */}
            <Card>
              <h2 className="text-xl font-semibold mb-[var(--space-md)]">
                Inputs
              </h2>
              <div className="grid gap-[var(--space-md)]">
                <Input
                  label="Nombre del cultivo"
                  placeholder="Ej: Maíz amarillo"
                />
                <Input
                  label="Con error"
                  error="Este campo es requerido"
                />
              </div>
            </Card>

            {/* Tags */}
            <Card>
              <h2 className="text-xl font-semibold mb-[var(--space-md)]">
                Tags de estado
              </h2>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Tag variant="success">Activo</Tag>
                <Tag variant="warning">Pendiente</Tag>
                <Tag variant="error">Crítico</Tag>
                <Tag variant="info">En proceso</Tag>
                <Tag variant="neutral">Archivado</Tag>
              </div>
            </Card>

            {/* Estados */}
            <Card>
              <h2 className="text-xl font-semibold mb-[var(--space-md)]">
                Estados
              </h2>
              <div className="grid gap-[var(--space-md)]">
                <div className="p-[var(--space-sm)] border border-[var(--color-bg-muted)] rounded-[var(--radius-md)]">
                  <Loading size="sm" message="Cargando datos..." />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">
                    Skeletons:
                  </p>
                  <div className="space-y-2">
                    <Skeleton />
                    <Skeleton width="75%" />
                    <Skeleton width="50%" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Empty */}
            <Card className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-[var(--space-md)]">
                Estado vacío
              </h2>
              <Empty
                icon="🌱"
                title="Sin cultivos registrados"
                message="Comienza agregando tu primer cultivo al sistema."
                action={<Button variant="primary">Agregar cultivo</Button>}
              />
            </Card>
          </div>
        </div>
      )}

      {/* ======================================================
          🚪 DASHBOARD PARA USUARIO NO AUTENTICADO
         ====================================================== */}
      {/* {!isAuthenticated && (
        <div className="min-h-[70vh] flex items-center justify-center">
          <Card className="max-w-xl text-center space-y-[var(--space-md)] p-[var(--space-xl)]">
            <h1 className="text-3xl font-bold text-[var(--color-primary)]">
              🌱 AGRo_BIIO
            </h1>

            <p className="text-lg text-[var(--color-text-muted)]">
              Lleva el registro de tus cultivos y toma decisiones
              inteligentes basadas en datos reales.
            </p>

            <p className="text-sm text-[var(--color-text-light)]">
              Centraliza información, mejora tu productividad y controla
              tu operación agrícola desde un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-[var(--space-md)] justify-center">
              <Link href="/auth/login">
                <Button variant="primary">Iniciar sesión</Button>
              </Link>

              <Link href="/auth/register">
                <Button variant="outline">Crear cuenta</Button>
              </Link>
            </div>
          </Card>
        </div>
      )} */}
    </main>
  );
}