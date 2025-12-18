from rest_framework import serializers 
from .models import Consumo, ConsumoInsumo, Monitoreo 
from catalogo.models import Insumo 
from django.db import transaction

 
class ConsumoInsumoSerializer(serializers.ModelSerializer): 
    insumo_nombre = serializers.CharField(source="insumo.nombre", read_only=True) 
    class Meta: 
        model = ConsumoInsumo 
        fields = ["id", "insumo", "insumo_nombre", "cantidad"] 
 
class ConsumoSerializer(serializers.ModelSerializer):
    insumos = ConsumoInsumoSerializer(
        source="insumos_detalle",
        many=True,
        required=False
    )

    responsable_nombre = serializers.CharField(
        source="responsable.nombre",
        read_only=True
    )
    cultivo_nombre = serializers.CharField(
        source="cultivo.nombre",
        read_only=True
    )
    producto_nombre = serializers.CharField(
        source="producto.nombre",
        read_only=True
    )

    class Meta:
        model = Consumo
        fields = [
            "id",
            "cultivo",
            "cultivo_nombre",
            "producto",
            "producto_nombre",
            "area_m2",
            "fecha_planificada",
            "fecha_ejecutada",
            "estado",
            "responsable",
            "responsable_nombre",
            "insumos",
        ]
    def create(self, validated_data): 
        insumos_data = validated_data.pop("insumos_detalle", []) 
        with transaction.atomic():
            consumo = Consumo.objects.create(**validated_data)
            for item in insumos_data:
                ConsumoInsumo.objects.create(consumo=consumo, **item)

        return consumo
 
    def update(self, instance, validated_data): 
        insumos_data = validated_data.pop("insumos_detalle", None) 
        for attr, val in validated_data.items(): 
            setattr(instance, attr, val) 
        instance.save() 
        if insumos_data is not None: 
            instance.insumos_detalle.all().delete() 
            for item in insumos_data: 
                ConsumoInsumo.objects.create(consumo=instance, **item) 
        return instance 
 
class MonitoreoSerializer(serializers.ModelSerializer):
    cultivo_nombre = serializers.CharField(
        source="cultivo.nombre",
        read_only=True
    )
    personal_nombre = serializers.CharField(
        source="personal.nombre",
        read_only=True
    )
    maquinaria_nombre = serializers.CharField(
        source="maquinaria.nombre",
        read_only=True
    )

    class Meta:
        model = Monitoreo
        fields = [
            "id",
            "cultivo",
            "cultivo_nombre",
            "personal",
            "personal_nombre",
            "tipo_actividad",
            "descripcion",
            "fecha_hora",
            "evidencia",
            "maquinaria",
            "maquinaria_nombre",
            "consumo",
        ]