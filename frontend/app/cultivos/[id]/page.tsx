'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, Tag } from '@/components/ui';
import Link from 'next/link';

const API_URL = '/api/cultivos.json';

export default function CultivoDetallePage() {
  const { id } = useParams();
  const [cultivo, setCultivo] = useState<any>(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find((c: any) => c.id === Number(id));
        setCultivo(encontrado);
      });
  }, [id]);

  if (!cultivo) {
    return (
      <Card className="text-center p-8">
        <h2>Cultivo no encontrado</h2>
        <Link href="/cultivos">
          <Button className="mt-4">Volver</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{cultivo.nombre}</h1>
      <Tag>{cultivo.estado}</Tag>

      <Card>
        <p><strong>Variedad:</strong> {cultivo.variedad}</p>
        <p><strong>Área:</strong> {cultivo.area} {cultivo.unidad}</p>
        <p><strong>Progreso:</strong> {cultivo.progreso}%</p>
        <p><strong>Fecha siembra:</strong> {cultivo.fechaSiembra}</p>
      </Card>
    </div>
  );
}
