def contexto_prediccion_maquinaria(prediccion):
    return {
        "maquinaria": prediccion.maquinaria,
        "probabilidad_fallo": prediccion.probabilidad_fallo,
        "horas_uso": prediccion.horas_uso,
        "nivel_desgaste": prediccion.nivel_desgaste,
    }


def contexto_prediccion_cultivo(prediccion):
    return {
        "cultivo": prediccion.cultivo,
        "riesgo": prediccion.riesgo,
        "humedad": prediccion.humedad,
        "temperatura": prediccion.temperatura,
    }

def contexto_consumo(consumo):
    total_insumos = sum(
        item.cantidad for item in consumo.insumos_detalle.all()
    )

    return {
        "consumo": consumo,
        "cultivo": consumo.cultivo,
        "producto": consumo.producto,
        "area_m2": consumo.area_m2 or 0,
        "total_insumos": float(total_insumos),
        "estado": consumo.estado,
    }
