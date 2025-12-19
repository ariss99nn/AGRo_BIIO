from rest_framework import serializers
from .models import PrediccionCultivo


class PrediccionCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrediccionCultivo
        fields = "__all__"
