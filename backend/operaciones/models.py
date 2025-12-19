from django.db import models 
from cultivos.models import Cultivo 
from catalogo.models import Producto, Insumo 
from personal.models import Personal 
from maquinaria.models import Maquinaria 
 
class Consumo(models.Model): 
    ESTADO_CHOICES = [ 
        ("P", "Planificado"), 
        ("E", "Ejecutado"), 
        ("C", "Cancelado"), 
    ] 
    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name="consumos") 
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name="consumos") 
    area_m2 = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True) 
    fecha_planificada = models.DateTimeField() 
    fecha_ejecutada = models.DateTimeField(null=True, blank=True) 
    estado = models.CharField(max_length=1, choices=ESTADO_CHOICES, default="P") 
    responsable = models.ForeignKey(Personal, on_delete=models.SET_NULL, null=True, blank=True, related_name="consumos") 
 
    def __str__(self): 
        return f"Consumo {self.id} - {self.cultivo}" 
 
class ConsumoInsumo(models.Model): 
    consumo = models.ForeignKey(Consumo, on_delete=models.CASCADE, related_name="insumos_detalle") 
    insumo = models.ForeignKey(Insumo, on_delete=models.PROTECT, related_name="consumo_detalle") 
    cantidad = models.DecimalField(max_digits=12, decimal_places=4) 
 
    def __str__(self): 
        return f"{self.cantidad} {self.insumo.unidad} de {self.insumo.nombre}" 
 
class Monitoreo(models.Model): 
    cultivo = models.ForeignKey(Cultivo, on_delete=models.CASCADE, related_name="monitoreos") 
    personal = models.ForeignKey(Personal, on_delete=models.SET_NULL, null=True, blank=True, related_name="monitoreos") 
    TIPO_CHOICES = [ 
        ("FUM", "Fumigación"), 
        ("RIE", "Riego"), 
        ("ABO", "Abonado"), 
        ("POD", "Poda"), 
        ("OTR", "Otro"), 
    ] 
    tipo_actividad = models.CharField(max_length=3, choices=TIPO_CHOICES) 
    descripcion = models.TextField(blank=True) 
    fecha_hora = models.DateTimeField() 
    evidencia = models.ImageField(upload_to="monitoreo/evidencias/", null=True, blank=True) 
    maquinaria = models.ForeignKey(Maquinaria, on_delete=models.SET_NULL, null=True, blank=True, related_name="usos") 
    consumo = models.ForeignKey(Consumo, on_delete=models.SET_NULL, null=True, blank=True, related_name="monitoreos") 
 
    def __str__(self): 
        return f"{self.get_tipo_actividad_display()} - {self.cultivo}" 
 