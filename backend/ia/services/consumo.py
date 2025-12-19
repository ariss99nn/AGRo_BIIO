from ia.services.contextos import contexto_consumo
from ia.services.alertas import disparar_alerta_custom
from ia.services.automatizacion import ejecutar_reglas
from catalogo.models import TasaConsumo


def analizar_consumo(consumo):
    """
    Analiza un consumo ejecutado y dispara IA.
    Compara el consumo real con las tasas recomendadas.
    """

    if consumo.estado != "E":
        return None  # solo ejecutados

    contexto = contexto_consumo(consumo)

    # 🔹 Análisis avanzado: comparar con tasas recomendadas
    for consumo_insumo in consumo.consumo_insumo_set.all():
        # Buscar tasa recomendada para este producto e insumo
        tasa = TasaConsumo.objects.filter(
            producto=consumo.producto,
            insumo=consumo_insumo.insumo
        ).first()
        
        if tasa and contexto["area_m2"] > 0:
            # Calcular consumo real vs esperado
            consumo_real = float(consumo_insumo.cantidad)
            consumo_esperado = float(tasa.cantidad_por_m2 * contexto["area_m2"])
            
            # Alerta si supera 20% lo recomendado
            if consumo_real > consumo_esperado * 1.2:
                desviacion = ((consumo_real - consumo_esperado) / consumo_esperado) * 100
                
                disparar_alerta_custom(
                    target_type="CONSUMO",
                    referencia=f"Sobreconsumo de {consumo_insumo.insumo.nombre} en {consumo.producto.nombre}: +{desviacion:.1f}% sobre lo recomendado",
                    severidad="ALTA" if desviacion > 50 else "MEDIA",
                    contexto_extra={
                        **contexto,
                        "insumo_nombre": consumo_insumo.insumo.nombre,
                        "consumo_real": consumo_real,
                        "consumo_esperado": consumo_esperado,
                        "desviacion_porcentaje": round(desviacion, 2)
                    }
                )
    
    # 🔹 Análisis simple (backup si no hay tasas definidas)
    if contexto["area_m2"] > 0:
        ratio = contexto["total_insumos"] / contexto["area_m2"]
        contexto["ratio_insumo_area"] = ratio
        
        # Solo activar si no se disparó ninguna alerta específica arriba
        if ratio > 0.15 and not consumo.consumo_insumo_set.exists():
            disparar_alerta_custom(
                target_type="CONSUMO",
                referencia=f"Ratio de consumo elevado en {consumo.producto.nombre}",
                severidad="MEDIA",
                contexto_extra=contexto
            )

    return contexto