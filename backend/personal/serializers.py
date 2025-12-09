from rest_framework import serializers
from .models import ModelPersona    

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelPersona
        fields = '__all__'
        autenticated = True