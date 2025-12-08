from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cultivo
from .serializers import CultivoSerializer
from .config import CULTIVOS_API_KEY, CULTIVOS_DEBUG

class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer

    @action(detail=False, methods=['get'])
    def config_info(self, request):
        """
        Endpoint de ejemplo que muestra cómo usar las variables de entorno.
        Accede a: /api/cultivos/config_info/
        """
        return Response({
            'debug_mode': CULTIVOS_DEBUG,
            'api_key_configured': bool(CULTIVOS_API_KEY),
            'message': 'Variables de entorno cargadas desde cultivos/.env'
        })