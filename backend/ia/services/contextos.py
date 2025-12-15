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
