# serializers.py
from rest_framework import serializers
from django.db import models
from .models import Producto, Insumo, TasaConsumo, Consumo, Consumo_insumo
from decimal import Decimal

class ProductoSerializer(serializers.ModelSerializer):
    estado_stock = serializers.SerializerMethodField()
    
    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ['id']
    
    def get_estado_stock(self, obj):
        """Calcula información del stock relacionado a este producto"""
        # Este método puede ser implementado para calcular
        # el stock total de insumos relacionados
        return "Disponible"

class InsumoSerializer(serializers.ModelSerializer):
    estado_stock = serializers.SerializerMethodField()
    necesita_reposicion = serializers.SerializerMethodField()
    valor_total = serializers.SerializerMethodField()
    
    class Meta:
        model = Insumo
        fields = '__all__'
        read_only_fields = ['id']
        extra_kwargs = {
            'imagen': {'required': False, 'allow_null': True}
        }
    
    def get_estado_stock(self, obj):
        """Determina el estado del stock"""
        if obj.stock == 0:
            return "Agotado"
        elif obj.stock <= obj.stock_minimo:
            return "Bajo Stock"
        else:
            return "Disponible"
    
    def get_necesita_reposicion(self, obj):
        """Indica si necesita reposición"""
        return obj.stock <= obj.stock_minimo
    
    def get_valor_total(self, obj):
        """Calcula el valor total del inventario (si tuviera precio)"""
        # Este es un ejemplo - necesitarías agregar precio_unitario al modelo
        return f"{obj.stock} {obj.unidad}"
    
    def validate_stock(self, value):
        """Valida que el stock no sea negativo"""
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo")
        return value
    
    def validate_stock_minimo(self, value):
        """Valida que el stock mínimo no sea negativo"""
        if value < 0:
            raise serializers.ValidationError("El stock mínimo no puede ser negativo")
        return value

class TasaConsumoSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    insumo_nombre = serializers.CharField(source='insumo.nombre', read_only=True)
    insumo_unidad = serializers.CharField(source='insumo.unidad', read_only=True)
    total_por_area = serializers.SerializerMethodField()
    total_por_planta = serializers.SerializerMethodField()
    
    class Meta:
        model = TasaConsumo
        fields = '__all__'
        read_only_fields = ['id']
    
    def get_total_por_area(self, obj):
        """Calcula el consumo total para un área específica"""
        area = self.context.get('area', 1)  # Área en m²
        return float(obj.cantidad_por_m2 * Decimal(area))
    
    def get_total_por_planta(self, obj):
        """Calcula el consumo total para un número de plantas"""
        plantas = self.context.get('plantas', 1)
        return float(obj.cantidad_por_planta * Decimal(plantas))
    
    def validate(self, data):
        """Validaciones personalizadas"""
        if 'cantidad_por_m2' in data and data['cantidad_por_m2'] < 0:
            raise serializers.ValidationError({
                'cantidad_por_m2': 'La cantidad por m² no puede ser negativa'
            })
        
        if 'cantidad_por_planta' in data and data['cantidad_por_planta'] < 0:
            raise serializers.ValidationError({
                'cantidad_por_planta': 'La cantidad por planta no puede ser negativa'
            })
        
        return data

# ================ SERIALIZADORES CON RELACIONES ANIDADAS ================

class ConsumoInsumoSerializer(serializers.ModelSerializer):
    """Serializer para Consumo_insumo con información del insumo"""
    insumo_nombre = serializers.CharField(source='insumo.nombre', read_only=True)
    insumo_unidad = serializers.CharField(source='insumo.unidad', read_only=True)
    subtotal = serializers.SerializerMethodField()
    
    class Meta:
        model = Consumo_insumo
        fields = '__all__'
        read_only_fields = ['id', 'subtotal']
    
    def get_subtotal(self, obj):
        """Calcula el subtotal (cantidad * precio)"""
        if obj.cantidad and obj.precio_unitario:
            return float(obj.cantidad * obj.precio_unitario)
        return 0.0
    
    def validate(self, data):
        """Validaciones para ConsumoInsumo"""
        if 'cantidad' in data and data['cantidad'] <= 0:
            raise serializers.ValidationError({
                'cantidad': 'La cantidad debe ser mayor a 0'
            })
        
        if 'precio_unitario' in data and data['precio_unitario'] < 0:
            raise serializers.ValidationError({
                'precio_unitario': 'El precio unitario no puede ser negativo'
            })
        
        return data

class ConsumoSerializer(serializers.ModelSerializer):
    """Serializer para Consumo con sus insumos"""
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    insumos = ConsumoInsumoSerializer(many=True, read_only=True, source='consumo_insumo_set')
    total_consumo = serializers.SerializerMethodField()
    dias_restantes = serializers.SerializerMethodField()
    
    class Meta:
        model = Consumo
        fields = '__all__'
        read_only_fields = ['id']
    
    def get_total_consumo(self, obj):
        """Calcula el total del consumo sumando todos los subtotales"""
        consumo_insumos = obj.consumo_insumo_set.all()
        total = sum(
            float(ci.cantidad * ci.precio_unitario) 
            for ci in consumo_insumos 
            if ci.cantidad and ci.precio_unitario
        )
        return total
    
    def get_dias_restantes(self, obj):
        """Calcula días restantes/hasta la fecha planificada"""
        from datetime import date
        
        if obj.fecha_planificada:
            hoy = date.today()
            diferencia = (obj.fecha_planificada - hoy).days
            
            if diferencia > 0:
                return f"{diferencia} días restantes"
            elif diferencia == 0:
                return "Hoy"
            else:
                return f"Hace {abs(diferencia)} días"
        return None
    
    def validate_area_m2(self, value):
        """Valida que el área sea positiva"""
        if value <= 0:
            raise serializers.ValidationError("El área debe ser mayor a 0")
        return value
    
    def validate(self, data):
        """Validaciones para Consumo"""
        # Validar que fecha_ejecutada no sea anterior a fecha_planificada
        if ('fecha_ejecutada' in data and 'fecha_planificada' in data and 
            data['fecha_ejecutada'] and data['fecha_planificada'] and 
            data['fecha_ejecutada'] < data['fecha_planificada']):
            raise serializers.ValidationError({
                'fecha_ejecutada': 'La fecha ejecutada no puede ser anterior a la fecha planificada'
            })
        
        return data

# ================ SERIALIZADORES PARA VISTAS ESPECÍFICAS ================

class ProductoDetalladoSerializer(serializers.ModelSerializer):
    """Producto con sus tasas de consumo"""
    tasas_consumo = TasaConsumoSerializer(many=True, read_only=True, source='tasaconsumo_set')
    total_insumos = serializers.SerializerMethodField()
    
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'unidad_por_defecto', 
                'tasas_consumo', 'total_insumos']
    
    def get_total_insumos(self, obj):
        """Cuenta cuántos insumos diferentes tiene asociados"""
        return obj.tasaconsumo_set.count()

class InsumoDetalladoSerializer(serializers.ModelSerializer):
    """Insumo con información de consumo y tasas"""
    tasas_consumo = TasaConsumoSerializer(many=True, read_only=True, source='tasaconsumo_set')
    consumos_recientes = serializers.SerializerMethodField()
    stock_disponible = serializers.SerializerMethodField()
    
    class Meta:
        model = Insumo
        fields = ['id', 'nombre', 'tipo', 'stock', 'stock_minimo', 'unidad', 
                'imagen', 'tasas_consumo', 'consumos_recientes', 'stock_disponible']
    
    def get_consumos_recientes(self, obj):
        """Obtiene los consumos recientes de este insumo"""
        from .models import Consumo_insumo
        consumos = Consumo_insumo.objects.filter(
            insumo=obj
        ).select_related('consumo').order_by('-consumo__fecha_planificada')[:5]
        
        return [
            {
                'consumo_id': ci.consumo.id,
                'fecha': ci.consumo.fecha_planificada,
                'cantidad': float(ci.cantidad),
                'producto': ci.consumo.producto.nombre
            }
            for ci in consumos
        ]
    
    def get_stock_disponible(self, obj):
        """Calcula stock disponible considerando consumos planificados"""
        from .models import Consumo_insumo
        
        # Suma de cantidades en consumos pendientes
        consumos_pendientes = Consumo_insumo.objects.filter(
            consumo__estado='pendiente',
            insumo=obj
        ).aggregate(total=models.Sum('cantidad'))['total'] or 0
        
        stock_disponible = obj.stock - float(consumos_pendientes)
        return max(0, stock_disponible)

# ================ SERIALIZADORES PARA CREACIÓN MASIVA ================

class ConsumoCompletoSerializer(serializers.Serializer):
    """Serializer para crear un Consumo completo con sus insumos"""
    producto_id = serializers.IntegerField()
    area_m2 = serializers.DecimalField(max_digits=10, decimal_places=2)
    fecha_planificada = serializers.DateField()
    estado = serializers.CharField(max_length=50, default='pendiente')
    insumos = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
    
    def validate_producto_id(self, value):
        """Valida que el producto exista"""
        from .models import Producto
        if not Producto.objects.filter(id=value).exists():
            raise serializers.ValidationError("El producto no existe")
        return value
    
    def validate(self, data):
        """Validaciones generales"""
        # Validar cada insumo
        for insumo in data.get('insumos', []):
            if 'insumo_id' not in insumo:
                raise serializers.ValidationError("Cada insumo debe tener un insumo_id")
            
            if 'cantidad' not in insumo:
                raise serializers.ValidationError("Cada insumo debe tener una cantidad")
            
            try:
                cantidad = Decimal(insumo['cantidad'])
                if cantidad <= 0:
                    raise serializers.ValidationError("La cantidad debe ser mayor a 0")
            except (ValueError, TypeError):
                raise serializers.ValidationError("Cantidad inválida")
        
        return data
    
    def create(self, validated_data):
        """Crea el Consumo y sus Consumo_insumo relacionados"""
        from .models import Consumo, Consumo_insumo, Producto, Insumo
        
        # Crear el consumo
        producto = Producto.objects.get(id=validated_data['producto_id'])
        consumo = Consumo.objects.create(
            producto=producto,
            area_m2=validated_data['area_m2'],
            fecha_planificada=validated_data['fecha_planificada'],
            estado=validated_data.get('estado', 'pendiente')
        )
        
        # Crear los consumo_insumo
        for insumo_data in validated_data['insumos']:
            insumo = Insumo.objects.get(id=insumo_data['insumo_id'])
            Consumo_insumo.objects.create(
                consumo=consumo,
                insumo=insumo,
                cantidad=insumo_data['cantidad'],
                precio_unitario=insumo_data.get('precio_unitario', 0)
            )
        
        return consumo

# ================ SERIALIZADORES PARA REPORTES ================

class ReporteStockSerializer(serializers.Serializer):
    """Serializer para reporte de stock"""
    insumo_id = serializers.IntegerField()
    nombre = serializers.CharField()
    tipo = serializers.CharField()
    stock_actual = serializers.IntegerField()
    stock_minimo = serializers.IntegerField()
    diferencia = serializers.IntegerField()
    porcentaje = serializers.FloatField()
    estado = serializers.CharField()

class ReporteConsumoSerializer(serializers.Serializer):
    """Serializer para reporte de consumo"""
    producto_nombre = serializers.CharField()
    total_consumos = serializers.IntegerField()
    total_area = serializers.DecimalField(max_digits=12, decimal_places=2)
    insumos_utilizados = serializers.IntegerField()
    fecha_inicio = serializers.DateField()
    fecha_fin = serializers.DateField()

# ================ MIXINS Y UTILIDADES ================

class ValidacionImagenMixin:
    """Mixin para validar imágenes"""
    
    def validate_imagen(self, value):
        """Valida el tamaño y tipo de imagen"""
        if value:
            # Validar tamaño máximo (5MB)
            max_size = 5 * 1024 * 1024  # 5MB
            if value.size > max_size:
                raise serializers.ValidationError(
                    f"La imagen no debe exceder los {max_size // (1024*1024)}MB"
                )
            
            # Validar tipo de archivo
            valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
            import os
            ext = os.path.splitext(value.name)[1].lower()
            if ext not in valid_extensions:
                raise serializers.ValidationError(
                    f"Extensiones válidas: {', '.join(valid_extensions)}"
                )
        
        return value

# Aplicar el mixin a InsumoSerializer si es necesario
class InsumoConImagenSerializer(ValidacionImagenMixin, InsumoSerializer):
    """InsumoSerializer con validación de imagen"""
    pass