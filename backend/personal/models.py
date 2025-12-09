from django.db import models


# Create your models here.

class ModelPersona(models.Model):
    usuario_id = models.ForeignKey('usuarios.ModelUsuario', on_delete=models.CASCADE)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    cedula = models.IntegerField(unique=True)   
    telefono = models.IntegerField()
    cargo = models.CharField(max_length=100)
    fecha_ingreso = models.DateField()
    foto = models.ImageField(upload_to='fotos_personas/')
    
    def __str__(self):
        return f"{self.nombres} {self.apellidos}"