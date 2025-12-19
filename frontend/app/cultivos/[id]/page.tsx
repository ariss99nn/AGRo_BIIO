'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, Button, Tag } from '@/components/ui';
import Link from 'next/link';

const API_URL = 'http://localhost:8000/api/cultivos';

export default function CultivoDetallePage() {
  const { id } = useParams();
  const [cultivo, setCultivo] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(setCultivo);
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
        <p><strong>Tipo:</strong> {cultivo.tipo}</p>
        <p><strong>Área sembrada:</strong> {cultivo.area_sembrada}</p>
        <p><strong>Fecha siembra:</strong> {cultivo.fecha_siembra}</p>
        <p><strong>Fecha cosecha estimada:</strong> {cultivo.fecha_cosecha_estimada}</p>
        <p><strong>Notas:</strong> {cultivo.notas}</p>
      </Card>
    </div>
  );
}
