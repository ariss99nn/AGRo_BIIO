from django.db import models 
 
class AlertRule(models.Model): 
    TIPO_CHOICES = [ 
        ("STOCK_LOW", "Stock bajo"), 
        ("PERIODIC", "Periódico"), 
        ("CUSTOM", "Personalizado / IA"), 
    ] 
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES) 
    target_type = models.CharField(max_length=30)  # INSUMO / CULTIVO / AREA etc 
    target_id = models.IntegerField(null=True, blank=True) 
    parametros = models.JSONField(default=dict, blank=True) 
    mensaje_template = models.TextField(blank=True) 
    activo = models.BooleanField(default=True) 
    last_triggered = models.DateTimeField(null=True, blank=True) 

    def __str__(self):
        return f"{self.tipo} -> {self.target_type}"
 
class AlertInstance(models.Model): 
    rule = models.ForeignKey(AlertRule, on_delete=models.CASCADE, related_name="instances") 
    created_at = models.DateTimeField(auto_now_add=True) 
    leida = models.BooleanField(default=False) 
    referencia = models.CharField(max_length=255, blank=True) 
 
    def __str__(self): 
        return f"Alerta {self.id} - {self.rule.tipo}" 
    
    
