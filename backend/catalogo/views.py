from rest_framework import viewsets, generics
from .models import Producto, Insumo, TasaConsumo, Consumo, Consumo_insumo
from .serializers import (
    ProductoSerializer, InsumoSerializer, TasaConsumoSerializer,
    ConsumoSerializer, ConsumoInsumoSerializer,
)

# Viewsets básicos (CRUD completo)
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class InsumoViewSet(viewsets.ModelViewSet):
    queryset = Insumo.objects.all()
    serializer_class = InsumoSerializer

class TasaConsumoViewSet(viewsets.ModelViewSet):
    queryset = TasaConsumo.objects.all()
    serializer_class = TasaConsumoSerializer

class ConsumoViewSet(viewsets.ModelViewSet):
    queryset = Consumo.objects.all()
    serializer_class = ConsumoSerializer

class ConsumoInsumoViewSet(viewsets.ModelViewSet):
    queryset = Consumo_insumo.objects.all()
    serializer_class = ConsumoInsumoSerializer

# Vista para crear consumo con insumos
class CrearConsumoCompleto(generics.CreateAPIView):
    serializer_class = ConsumoCompletoSerializer

# Vista para insumos con bajo stock
class InsumosBajoStock(generics.ListAPIView):
    serializer_class = InsumoSerializer
    
    def get_queryset(self):
        return Insumo.objects.filter(stock__lte=models.F('stock_minimo'))
