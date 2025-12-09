from rest_framework import serializers
from .models import Personal
from usuarios.models import Usuario

class PersonalSerializer(serializers.ModelSerializer):
    usuario_id = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    # Campos del usuario (solo lectura)
    foto = serializers.ImageField(source='usuario_id.foto', read_only=True)
    telefono = serializers.CharField(source='usuario_id.telefono', read_only=True)
    email = serializers.EmailField(source='usuario_id.email', read_only=True)
    username = serializers.CharField(source='usuario_id.username', read_only=True)

    class Meta:
        model = Personal
        fields = [
            'id',
            'usuario_id',
            'nombres',
            'apellidos',
            'cedula',
            'cargo',
            'fecha_ingreso',
            'estado',
            'telefono',
            'email',
            'username',
            'foto',
        ]

    # -------- VALIDACIONES --------
    def validate(self, data):
        usuario = data.get("usuario_id")

        # Crear
        if self.instance is None:
            if Personal.objects.filter(usuario_id=usuario).exists():
                raise serializers.ValidationError({
                    "usuario_id": "Este usuario ya tiene un empleado asignado."
                })

        # Editar
        else:
            if Personal.objects.filter(usuario_id=usuario).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError({
                    "usuario_id": "Este usuario ya está asociado a otro empleado."
                })

        return data

    def validate_cedula(self, value):
        if self.instance:
            if Personal.objects.filter(cedula=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("La cédula ya está registrada en otro empleado.")
        else:
            if Personal.objects.filter(cedula=value).exists():
                raise serializers.ValidationError("La cédula ya está registrada.")
        return value
