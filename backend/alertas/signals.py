from django.db.models.signals import post_migrate
from django.dispatch import receiver
from alertas.models import AlertRule


@receiver(post_migrate)
def crear_reglas_post_migrate(sender, **kwargs):
    """
    Crea reglas estándar para que evaluar_reglas() funcione.
    """

    AlertRule.objects.get_or_create(
        tipo="STOCK_LOW",
        target_type="INSUMO",
        defaults={
            "parametros": {"umbral": 10},
            "mensaje_template": "Stock bajo del insumo",
            "activo": True,
        },
    )

    AlertRule.objects.get_or_create(
        tipo="PERIODIC",
        target_type="MAQUINARIA",
        defaults={
            "parametros": {"dias": 30},
            "mensaje_template": "Mantenimiento periódico de maquinaria",
            "activo": True,
        },
    )

    AlertRule.objects.get_or_create(
        tipo="CUSTOM",
        target_type="GLOBAL",
        defaults={
            "parametros": {},
            "mensaje_template": "Regla personalizada",
            "activo": False,
        },
    )
