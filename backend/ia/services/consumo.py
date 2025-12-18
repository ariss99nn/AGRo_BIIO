from ia.services.contextos import contexto_consumo
from ia.services.alertas import disparar_alerta_custom
from ia.services.automatizacion import ejecutar_reglas


def analizar_consumo(consumo):
    """
    Analiza un consumo ejecutado y dispara IA.
    """

    if consumo.estado != "E":
        return None  # solo ejecutados

    contexto = contexto_consumo(consumo)

    # 🔹 reglas simples (IA básica)
    if contexto["area_m2"] > 0:
        ratio = contexto["total_insumos"] / contexto["area_m2"]
        contexto["ratio_insumo_area"] = ratio

        # heurística inicial
        if ratio > 0.15:
            disparar_alerta_custom(
                target_type="CONSUMO",
                referencia=f"Sobreconsumo detectado en cultivo {consumo.cultivo}",
                severidad="MEDIA",
                contexto=contexto
            )

    return contexto
