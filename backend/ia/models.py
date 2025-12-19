from django.db import models
from cultivos.models import Cultivo
from maquinaria.models import Maquinaria


class PrediccionCultivo(models.Model):
    RIESGO_CHOICES = [
        ('BAJO', 'Bajo'),
        ('MEDIO', 'Medio'),
        ('ALTO', 'Alto'),
    ]

    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name="predicciones")
    humedad = models.FloatField()
    temperatura = models.FloatField()
    ph_suelo = models.FloatField()
    riesgo = models.CharField(max_length=10, choices=RIESGO_CHOICES)
    resultado = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Predicción {self.riesgo} - {self.cultivo}"


class PrediccionMaquinaria(models.Model):
    maquinaria = models.ForeignKey(Maquinaria, on_delete=models.CASCADE, related_name="predicciones")
    nivel_desgaste = models.FloatField()
    horas_uso = models.IntegerField()
    vibracion = models.FloatField()
    temperatura_motor = models.FloatField()
    probabilidad_fallo = models.FloatField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fallo {self.probabilidad_fallo}% - {self.maquinaria}"


class ReglaAutomatizacion(models.Model):
    nombre = models.CharField(max_length=100)
    condicion = models.TextField()  
    accion = models.TextField()     
    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class EjecucionAutomatizacion(models.Model):
    regla = models.ForeignKey(ReglaAutomatizacion, on_delete=models.CASCADE)
    resultado = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ejecución {self.regla.nombre} - {self.fecha}"
