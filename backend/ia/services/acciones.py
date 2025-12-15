from maquinaria.models import Maquinaria


def ejecutar_accion(accion: str, contexto: dict) -> str:
    """
    Ejecuta una acción definida en texto.
    """

    if accion.startswith("CAMBIAR_ESTADO_MAQUINARIA:"):
        nuevo_estado = accion.split(":")[1]
        maquinaria: Maquinaria = contexto.get("maquinaria")

        if maquinaria:
            maquinaria.estado = nuevo_estado
            maquinaria.save()
            return f"Estado cambiado a {nuevo_estado}"

        return "Maquinaria no encontrada en contexto"

    if accion == "NOTIFICAR_ADMIN":
        return "Notificación enviada al administrador"

    return "Acción no reconocida"
