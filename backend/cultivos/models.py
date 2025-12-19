from django.db import models
from django.utils import timezone


class Cultivo(models.Model):
    """
    Modelo que representa un cultivo agrícola
    """
    TIPO_CHOICES = [
        ('CEREAL', 'Cereal'),
        ('HORTALIZA', 'Hortaliza'),
        ('FRUTA', 'Fruta'),
        ('LEGUMBRE', 'Legumbre'),
        ('TUBERCULO', 'Tubérculo'),
        ('OTRO', 'Otro'),
    ]
    
    ESTADO_CHOICES = [
        ('PLANIFICADO', 'Planificado'),
        ('SEMBRADO', 'Sembrado'),
        ('CRECIMIENTO', 'En Crecimiento'),
        ('MADURO', 'Maduro'),
        ('COSECHADO', 'Cosechado'),
        ('FINALIZADO', 'Finalizado'),
    ]
    
    nombre = models.CharField(max_length=200, verbose_name='Nombre del Cultivo')
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='OTRO')
    descripcion = models.TextField(blank=True, null=True, verbose_name='Descripción')
    fecha_siembra = models.DateField(verbose_name='Fecha de Siembra', null=True, blank=True)
    fecha_cosecha_estimada = models.DateField(verbose_name='Fecha Estimada de Cosecha', null=True, blank=True)
    area_sembrada = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, 
                                        verbose_name='Área Sembrada (m²)')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='PLANIFICADO')
    notas = models.TextField(blank=True, null=True, verbose_name='Notas Adicionales')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última Actualización')
    
    class Meta:
        verbose_name = 'Cultivo'
        verbose_name_plural = 'Cultivos'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.nombre} ({self.get_tipo_display()})"
