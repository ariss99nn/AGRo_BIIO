from django.utils import timezone
from alertas.models import AlertRule, AlertInstance

# imports de dominios
from maquinaria.models import Maquinaria
from insumos.models import Insumo  # si existe


def evaluar_reglas():
    """
    Evalúa todas las reglas activas y dispara alertas si corresponde.
    """
    reglas = AlertRule.objects.filter(activo=True)

    for regla in reglas:
        if regla.tipo == "STOCK_LOW":
            _evaluar_stock_bajo(regla)

        elif regla.tipo == "PERIODIC":
            _evaluar_periodica(regla)

        elif regla.tipo == "CUSTOM":
            _evaluar_custom(regla)


# -------------------------------
# REGLAS ESPECÍFICAS
# -------------------------------

def _evaluar_stock_bajo(regla: AlertRule):
    """
    Dispara alerta si el stock de un insumo es bajo.
    """
    umbral = regla.parametros.get("umbral", 10)

    insumos = Insumo.objects.filter(stock__lte=umbral)

    for insumo in insumos:
        _crear_alerta(
            regla=regla,
            referencia=f"Insumo: {insumo.nombre} (stock={insumo.stock})"
        )


def _evaluar_periodica(regla: AlertRule):
    """
    Alertas periódicas (ej: mantenimiento maquinaria).
    """
    dias = regla.parametros.get("dias", 30)

    ultima = regla.last_triggered
    ahora = timezone.now()

    if not ultima or (ahora - ultima).days >= dias:
        _crear_alerta(
            regla=regla,
            referencia="Alerta periódica programada"
        )
        regla.last_triggered = ahora
        regla.save(update_fields=["last_triggered"])


def _evaluar_custom(regla: AlertRule):
    """
    Placeholder para reglas avanzadas / IA.
    """
    # Aquí luego entra tu IA
    pass


# -------------------------------
# UTILIDAD CENTRAL
# -------------------------------

def _crear_alerta(regla: AlertRule, referencia: str):
    """
    Crea una instancia de alerta si no existe una reciente.
    """
    AlertInstance.objects.create(
        rule=regla,
        referencia=referencia
    )