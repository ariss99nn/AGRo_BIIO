from django.db import models
from personal.models import Personal


class Maquinaria(models.Model):

    TIPOS = [
        ("TRACTOR", "Tractor"),
        ("COSECHADORA", "Cosechadora"),
        ("PULVERIZADORA", "Pulverizadora"),
        ("OTRO", "Otro"),
    ]

    ESTADOS = [
        ("OPERATIVA", "Operativa"),
        ("MANTENIMIENTO", "En mantenimiento"),
        ("FUERA_SERVICIO", "Fuera de servicio"),
    ]

    # Identificación
    nombre = models.CharField(max_length=150)
    tipo = models.CharField(max_length=100, choices=TIPOS)

    # Detalles técnicos
    marca = models.CharField(max_length=100, blank=True)
    modelo = models.CharField(max_length=100, blank=True)
    ficha_tecnica = models.TextField(blank=True)

    # Estado y control
    estado = models.CharField(
        max_length=50,
        choices=ESTADOS,
        default="OPERATIVA"
    )
    horas_uso = models.PositiveIntegerField(default=0)
    fecha_adquisicion = models.DateField(null=True, blank=True)
    ultima_revision = models.DateField(null=True, blank=True)

    # Relaciones
    responsable_actual = models.ForeignKey(
        Personal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="maquinarias"
    )

    # Multimedia
    imagen = models.ImageField(
        upload_to="maquinaria/",
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.nombre} ({self.tipo})"

