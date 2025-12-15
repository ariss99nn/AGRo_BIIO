from rest_framework import serializers
from .models import Maquinaria


class MaquinariaSerializer(serializers.ModelSerializer):
    responsable_nombre = serializers.CharField(
        source="responsable_actual.nombre",
        read_only=True
    )

    class Meta:
        model = Maquinaria
        fields = [
            "id",
            "nombre",
            "tipo",
            "marca",
            "modelo",
            "ficha_tecnica",
            "estado",
            "horas_uso",
            "fecha_adquisicion",
            "ultima_revision",
            "imagen",
            "responsable_actual",
            "responsable_nombre",
        ]
