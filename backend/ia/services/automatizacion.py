from ia.models import ReglaAutomatizacion, EjecucionAutomatizacion
from maquinaria.models import Maquinaria
from ia.services.acciones import ejecutar_accion


def ejecutar_reglas(contexto: dict) -> list:
    """
    Evalúa reglas activas según un contexto.
    """
    ejecuciones = []

    reglas = ReglaAutomatizacion.objects.filter(activa=True)

    for regla in reglas:
        try:
            if eval(regla.condicion, {}, contexto):
                resultado = ejecutar_accion(regla.accion, contexto)

                ejecuciones.append(
                    EjecucionAutomatizacion.objects.create(
                        regla=regla,
                        resultado=resultado
                    )
                )

        except Exception as e:
            ejecuciones.append(
                EjecucionAutomatizacion.objects.create(
                    regla=regla,
                    resultado=f"Error: {str(e)}"
                )
            )

    return ejecuciones
