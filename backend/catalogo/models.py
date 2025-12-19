from django.db import models
from django.contrib.auth.models import AbstractUser

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)
    unidad_por_defecto = models.CharField(max_length=50, blank=True, null=True)
    
    class Meta:
        db_table = 'producto'

class Insumo(models.Model):
    nombre = models.CharField(max_length=200)
    tipo = models.CharField(max_length=100, blank=True, null=True)
    stock = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=0)
    unidad = models.CharField(max_length=50, blank=True, null=True)
    imagen = models.ImageField(upload_to='insumos/', blank=True, null=True)
    
    class Meta:
        db_table = 'insumo'
        indexes = [
            models.Index(fields=['stock']),
        ]
class TasaConsumo(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cantidad_por_m2 = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_por_planta= models.DecimalField(max_digits=10, decimal_places=2)
    notas = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tasa_consumo'
        unique_together = ('producto', 'insumo')
    
class Consumo (models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    area_m2	= models.DecimalField(max_digits=10, decimal_places=2)
    fecha_planificada	= models.DateField()
    fecha_ejecutada	= models.DateField(blank=True, null=True)
    estado = models.CharField(max_length=50)

    class Meta:
        db_table = 'consumo'
        

class Consumo_insumo(models.Model):
    consumo = models.ForeignKey(Consumo, on_delete=models.CASCADE)
    insumo = models.ForeignKey(Insumo, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = 'consumo_insumo'
        unique_together = ('consumo', 'insumo')
        