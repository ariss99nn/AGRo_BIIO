from django.utils import timezone
from alertas.models import AlertRule, AlertInstance
from ia.services.automatizacion import ejecutar_reglas


def disparar_alerta_custom(
    target_type: str,
    referencia: str,
    severidad: str = "MEDIA",
    contexto_extra: dict | None = None
):
    """
    Dispara una alerta CUSTOM y ejecuta automatizaciones.
    """

    regla = AlertRule.objects.filter(
        tipo="CUSTOM",
        activo=True,
        target_type=target_type
    ).first()

    if not regla:
        return None

    alerta = AlertInstance.objects.create(
        rule=regla,
        referencia=f"[{severidad}] {referencia}"
    )

    # Contexto base
    contexto = {
        "target_type": target_type,
        "severidad": severidad,
        "referencia": referencia,
    }

    # 🔑 Contexto IA / dominio
    if contexto_extra:
        contexto.update(contexto_extra)

    ejecutar_reglas(contexto)

    regla.last_triggered = timezone.now()
    regla.save(update_fields=["last_triggered"])

    return alerta
