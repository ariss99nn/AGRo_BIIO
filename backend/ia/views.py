from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PrediccionCultivo
from .serializers import PrediccionCultivoSerializer
from .services import predecir_riesgo_cultivo
from cultivos.models import Cultivo


class PrediccionCultivoAPIView(APIView):

    def post(self, request):
        cultivo_id = request.data.get("cultivo")
        humedad = request.data.get("humedad")
        temperatura = request.data.get("temperatura")
        ph_suelo = request.data.get("ph_suelo")

        if not all([cultivo_id, humedad, temperatura, ph_suelo]):
            return Response(
                {"error": "Faltan datos obligatorios"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            cultivo = Cultivo.objects.get(id=cultivo_id)
        except Cultivo.DoesNotExist:
            return Response(
                {"error": "Cultivo no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        prediccion = predecir_riesgo_cultivo(
            cultivo,
            float(humedad),
            float(temperatura),
            float(ph_suelo)
        )

        serializer = PrediccionCultivoSerializer(prediccion)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
