from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from cultivos.models import Cultivo
from maquinaria.models import Maquinaria

from ia.services.prediccion import (
    predecir_riesgo_cultivo,
    predecir_fallo_maquinaria
)

class PrediccionCultivoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            cultivo_id = int(request.data.get("cultivo_id"))
            humedad = float(request.data.get("humedad"))
            temperatura = float(request.data.get("temperatura"))
            ph_suelo = float(request.data.get("ph_suelo"))
        except (TypeError, ValueError):
            return Response(
                {"error": "Datos inválidos"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            cultivo = Cultivo.objects.get(id=cultivo_id)
        except Cultivo.DoesNotExist:
            return Response(
                {"error": "Cultivo no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        prediccion = predecir_riesgo_cultivo(
            cultivo=cultivo,
            humedad=humedad,
            temperatura=temperatura,
            ph_suelo=ph_suelo
        )

        return Response(
            {
                "cultivo": cultivo.nombre,
                "riesgo": prediccion.riesgo,
                "resultado": prediccion.resultado,
                "fecha": prediccion.fecha
            },
            status=status.HTTP_201_CREATED
        )

class PrediccionMaquinariaAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            maquinaria_id = int(request.data.get("maquinaria_id"))
            nivel_desgaste = float(request.data.get("nivel_desgaste"))
            vibracion = float(request.data.get("vibracion"))
            temperatura_motor = float(request.data.get("temperatura_motor"))
        except (TypeError, ValueError):
            return Response(
                {"error": "Datos inválidos"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            maquinaria = Maquinaria.objects.get(id=maquinaria_id)
        except Maquinaria.DoesNotExist:
            return Response(
                {"error": "Maquinaria no encontrada"},
                status=status.HTTP_404_NOT_FOUND
            )

        prediccion = predecir_fallo_maquinaria(
            maquinaria=maquinaria,
            nivel_desgaste=nivel_desgaste,
            vibracion=vibracion,
            temperatura_motor=temperatura_motor
        )

        return Response(
            {
                "maquinaria": maquinaria.nombre,
                "probabilidad_fallo": prediccion.probabilidad_fallo,
                "horas_uso": prediccion.horas_uso,
                "fecha": prediccion.fecha
            },
            status=status.HTTP_201_CREATED
        )
