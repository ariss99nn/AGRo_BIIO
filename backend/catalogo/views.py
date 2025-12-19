from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import F
from .models import Producto, Insumo, TasaConsumo, Consumo, Consumo_insumo
from .serializers import (
    ProductoSerializer, InsumoSerializer, TasaConsumoSerializer,
    ConsumoSerializer, ConsumoInsumoSerializer
)


class ProductoListCreateView(APIView):
    """
    GET: Lista todos los productos
    POST: Crea un nuevo producto
    """
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductoDetailView(APIView):
    """
    GET: Obtiene un producto específico
    PUT: Actualiza un producto
    DELETE: Elimina un producto
    """
    def get(self, request, pk):
        producto = get_object_or_404(Producto, pk=pk)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)
    
    def put(self, request, pk):
        producto = get_object_or_404(Producto, pk=pk)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        producto = get_object_or_404(Producto, pk=pk)
        serializer = ProductoSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        producto = get_object_or_404(Producto, pk=pk)
        producto.delete()
        return Response(
            {"message": "Producto eliminado exitosamente"}, 
            status=status.HTTP_204_NO_CONTENT
        )


class InsumoListCreateView(APIView):
    """
    GET: Lista todos los insumos con filtros opcionales
    Filtros: ?stock_bajo=true, ?tipo=semilla
    POST: Crea un nuevo insumo
    """
    def get(self, request):
        insumos = Insumo.objects.all()
        
        # Filtros opcionales
        stock_bajo = request.query_params.get('stock_bajo', None)
        tipo = request.query_params.get('tipo', None)
        
        if stock_bajo and stock_bajo.lower() == 'true':
            insumos = insumos.filter(stock__lte=F('stock_minimo'))
        if tipo:
            insumos = insumos.filter(tipo__icontains=tipo)
        
        serializer = InsumoSerializer(insumos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = InsumoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InsumoDetailView(APIView):
    """
    GET: Obtiene un insumo específico
    PUT: Actualiza un insumo
    PATCH: Actualiza parcialmente un insumo
    DELETE: Elimina un insumo
    """
    def get(self, request, pk):
        insumo = get_object_or_404(Insumo, pk=pk)
        serializer = InsumoSerializer(insumo)
        return Response(serializer.data)
    
    def put(self, request, pk):
        insumo = get_object_or_404(Insumo, pk=pk)
        serializer = InsumoSerializer(insumo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        insumo = get_object_or_404(Insumo, pk=pk)
        serializer = InsumoSerializer(insumo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        insumo = get_object_or_404(Insumo, pk=pk)
        insumo.delete()
        return Response(
            {"message": "Insumo eliminado exitosamente"}, 
            status=status.HTTP_204_NO_CONTENT
        )


class TasaConsumoListCreateView(APIView):
    """
    GET: Lista todas las tasas de consumo
    Filtros: ?producto=1
    POST: Crea una nueva tasa de consumo
    """
    def get(self, request):
        tasas = TasaConsumo.objects.select_related('producto', 'insumo').all()
        
        # Filtro por producto
        producto_id = request.query_params.get('producto', None)
        if producto_id:
            tasas = tasas.filter(producto_id=producto_id)
        
        serializer = TasaConsumoSerializer(tasas, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TasaConsumoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TasaConsumoDetailView(APIView):
    """
    GET: Obtiene una tasa de consumo específica
    PUT: Actualiza una tasa de consumo
    PATCH: Actualiza parcialmente una tasa de consumo
    DELETE: Elimina una tasa de consumo
    """
    def get(self, request, pk):
        tasa = get_object_or_404(
            TasaConsumo.objects.select_related('producto', 'insumo'), 
            pk=pk
        )
        serializer = TasaConsumoSerializer(tasa)
        return Response(serializer.data)
    
    def put(self, request, pk):
        tasa = get_object_or_404(TasaConsumo, pk=pk)
        serializer = TasaConsumoSerializer(tasa, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        tasa = get_object_or_404(TasaConsumo, pk=pk)
        serializer = TasaConsumoSerializer(tasa, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        tasa = get_object_or_404(TasaConsumo, pk=pk)
        tasa.delete()
        return Response(
            {"message": "Tasa de consumo eliminada exitosamente"}, 
            status=status.HTTP_204_NO_CONTENT
        )


class ConsumoListCreateView(APIView):
    """
    GET: Lista todos los consumos con filtros opcionales
    Filtros: ?estado=planificado, ?fecha_desde=2024-01-01, ?fecha_hasta=2024-12-31
    POST: Crea un nuevo consumo con sus insumos
    """
    def get(self, request):
        consumos = Consumo.objects.select_related('producto').prefetch_related(
            'consumo_insumo_set__insumo'
        ).all()
        
        # Filtros opcionales
        estado = request.query_params.get('estado', None)
        fecha_desde = request.query_params.get('fecha_desde', None)
        fecha_hasta = request.query_params.get('fecha_hasta', None)
        producto_id = request.query_params.get('producto', None)
        
        if estado:
            consumos = consumos.filter(estado__icontains=estado)
        if fecha_desde:
            consumos = consumos.filter(fecha_planificada__gte=fecha_desde)
        if fecha_hasta:
            consumos = consumos.filter(fecha_planificada__lte=fecha_hasta)
        if producto_id:
            consumos = consumos.filter(producto_id=producto_id)
        
        serializer = ConsumoSerializer(consumos, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ConsumoCreateSerializer(data=request.data)
        if serializer.is_valid():
            consumo = serializer.save()
            response_serializer = ConsumoSerializer(consumo)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConsumoDetailView(APIView):
    """
    GET: Obtiene un consumo específico con todos sus insumos
    PUT: Actualiza un consumo
    PATCH: Actualiza parcialmente un consumo
    DELETE: Elimina un consumo
    """
    def get(self, request, pk):
        consumo = get_object_or_404(
            Consumo.objects.select_related('producto').prefetch_related(
                'consumo_insumo_set__insumo'
            ), 
            pk=pk
        )
        serializer = ConsumoSerializer(consumo)
        return Response(serializer.data)
    
    def put(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        serializer = ConsumoSerializer(consumo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        serializer = ConsumoSerializer(consumo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        consumo = get_object_or_404(Consumo, pk=pk)
        consumo.delete()
        return Response(
            {"message": "Consumo eliminado exitosamente"}, 
            status=status.HTTP_204_NO_CONTENT
        )


class ConsumoInsumoListView(APIView):
    """
    GET: Lista todos los insumos asociados a un consumo específico
    """
    def get(self, request, consumo_id):
        # Verificar que el consumo existe
        get_object_or_404(Consumo, pk=consumo_id)
        
        consumo_insumos = Consumo_insumo.objects.filter(
            consumo_id=consumo_id
        ).select_related('insumo', 'consumo')
        
        serializer = ConsumoInsumoSerializer(consumo_insumos, many=True)
        return Response(serializer.data)


class ConsumoInsumoDetailView(APIView):
    """
    PUT: Actualiza la cantidad o precio de un insumo en un consumo
    DELETE: Elimina un insumo de un consumo
    """
    def put(self, request, consumo_id, insumo_id):
        consumo_insumo = get_object_or_404(
            Consumo_insumo, 
            consumo_id=consumo_id, 
            insumo_id=insumo_id
        )
        serializer = ConsumoInsumoSerializer(consumo_insumo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, consumo_id, insumo_id):
        consumo_insumo = get_object_or_404(
            Consumo_insumo, 
            consumo_id=consumo_id, 
            insumo_id=insumo_id
        )
        consumo_insumo.delete()
        return Response(
            {"message": "Insumo eliminado del consumo exitosamente"}, 
            status=status.HTTP_204_NO_CONTENT
        )


class InsumoStockBajoView(APIView):
    """
    GET: Obtiene todos los insumos con stock bajo (stock <= stock_minimo)
    """
    def get(self, request):
        insumos = Insumo.objects.filter(stock__lte=F('stock_minimo'))
        serializer = InsumoSerializer(insumos, many=True)
        return Response({
            "count": insumos.count(),
            "insumos": serializer.data
        })