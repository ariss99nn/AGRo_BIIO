from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import Consumo, Monitoreo
from .serializers import ConsumoSerializer, MonitoreoSerializer
from catalogo.models import Insumo
from personal.models import Personal

class ConsumoListCreateAPIView(APIView):

    def get(self, request):
        consumos = Consumo.objects.all().order_by("-fecha_planificada")
        serializer = ConsumoSerializer(consumos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ConsumoSerializer(data=request.data)
        if serializer.is_valid():
            consumo = serializer.save()
            return Response(
                ConsumoSerializer(consumo).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConsumoDetailAPIView(APIView):

    def get(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        serializer = ConsumoSerializer(consumo)
        return Response(serializer.data)
    
    def put(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        serializer = ConsumoSerializer(consumo, data=request.data, partial=True)
        if serializer.is_valid():
            consumo = serializer.save()
            return Response(ConsumoSerializer(consumo).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        consumo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EjecutarConsumoAPIView(APIView):

    def post(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)

        if consumo.estado == "E":
            return Response(
                {"detail": "El consumo ya fue ejecutado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        fecha_ejecutada = request.data.get("fecha_ejecutada")
        maquinaria_id = request.data.get("maquinaria")
        responsable_id = request.data.get("responsable")

        with transaction.atomic():
            for detalle in consumo.insumos_detalle.select_for_update():
                insumo = detalle.insumo
                if insumo.stock < detalle.cantidad:
                    return Response(
                        {"detail": f"Stock insuficiente para {insumo.nombre}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                insumo.stock -= detalle.cantidad
                insumo.save()

            consumo.estado = "E"

            if fecha_ejecutada:
                consumo.fecha_ejecutada = fecha_ejecutada

            if responsable_id:
                consumo.responsable_id = responsable_id

            consumo.save()

            Monitoreo.objects.create(
                cultivo=consumo.cultivo,
                personal=consumo.responsable,
                tipo_actividad="OTR",
                descripcion=f"Ejecutado consumo {consumo.id}",
                fecha_hora=consumo.fecha_ejecutada or consumo.fecha_planificada,
                consumo=consumo,
                maquinaria_id=maquinaria_id
            )

        # 🔥 Aquí luego entra IA / alertas sin tocar esta vista
        return Response(
            {"detail": "Consumo ejecutado correctamente"},
            status=status.HTTP_200_OK
        )

class MonitoreoListCreateAPIView(APIView):

    def get(self, request):
        monitoreos = Monitoreo.objects.all().order_by("-fecha_hora")
        serializer = MonitoreoSerializer(monitoreos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MonitoreoSerializer(data=request.data)
        if serializer.is_valid():
            monitoreo = serializer.save()
            return Response(
                MonitoreoSerializer(monitoreo).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
