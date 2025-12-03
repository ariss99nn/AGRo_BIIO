from django.db import models

from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True)
    foto = models.ImageField(upload_to="usuarios/fotos/", null=True, blank=True)
    es_empleado = models.BooleanField(default=False)

    def __str__(self):
        return self.username