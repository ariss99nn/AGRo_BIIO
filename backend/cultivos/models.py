from django.db import models

class Area(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Cultivo(models.Model):
    id = models.AutoField(primary_key=True)
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE)
    producto_id = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha_siembra = models.DateField()
    fecha_estimada_cosecha = models.DateField()
    estado = models.CharField(max_length=50)
    cantidad_plantas = models.IntegerField()
    imagen = models.ImageField(upload_to='cultivos/', null=True, blank=True)
    
    def __str__(self):
        return f"Cultivo {self.id}"
