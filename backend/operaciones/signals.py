from django.db.models.signals import post_save
from django.dispatch import receiver
from operaciones.models import Consumo
from ia.services.consumo import analizar_consumo


@receiver(post_save, sender=Consumo)
def consumo_ejecutado_ia(sender, instance, created, **kwargs):
    if instance.estado == "E":
        analizar_consumo(instance)
