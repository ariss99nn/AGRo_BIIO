from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cultivo
from .serializers import CultivoSerializer

try:
    from .config import CULTIVOS_API_KEY, CULTIVOS_DEBUG
except ImportError:
    # Valores por defecto si no existe el archivo config
    CULTIVOS_API_KEY = None
    CULTIVOS_DEBUG = False


class CultivoListCreateAPIView(APIView):
    """
    Vista para listar todos los cultivos y crear uno nuevo
    GET: Lista todos los cultivos
    POST: Crea un nuevo cultivo
    """
    def get(self, request):
        cultivos = Cultivo.objects.all()
        serializer = CultivoSerializer(cultivos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CultivoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CultivoDetailAPIView(APIView):
    """
    Vista para obtener, actualizar o eliminar un cultivo específico
    GET: Obtiene un cultivo por ID
    PUT: Actualiza un cultivo por ID
    DELETE: Elimina un cultivo por ID
    """
    def get(self, request, pk):
        cultivo = get_object_or_404(Cultivo, pk=pk)
        serializer = CultivoSerializer(cultivo)
        return Response(serializer.data)

    def put(self, request, pk):
        cultivo = get_object_or_404(Cultivo, pk=pk)
        serializer = CultivoSerializer(cultivo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cultivo = get_object_or_404(Cultivo, pk=pk)
        cultivo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CultivoConfigAPIView(APIView):
    """
    Vista para verificar la configuración del módulo
    GET: Muestra información sobre las variables de entorno configuradas
    """
    def get(self, request):
        return Response({
            'debug_mode': CULTIVOS_DEBUG,
            'api_key_configured': bool(CULTIVOS_API_KEY),
            'message': 'Variables de entorno cargadas desde cultivos/.env' if CULTIVOS_API_KEY else 'Usando valores por defecto'
        })