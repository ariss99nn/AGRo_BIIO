from ia.models import PrediccionCultivo, PrediccionMaquinaria
from ia.services.alertas import disparar_alerta_custom


def predecir_riesgo_cultivo(cultivo, humedad, temperatura, ph_suelo):
    riesgo = "BAJO"
    resultado = "Condiciones normales."

    if humedad > 80 and temperatura > 28:
        riesgo = "ALTO"
        resultado = "Alto riesgo de plagas."
    elif humedad > 65 or ph_suelo < 5.5:
        riesgo = "MEDIO"
        resultado = "Condiciones moderadas."

    prediccion = PrediccionCultivo.objects.create(
        cultivo=cultivo,
        humedad=humedad,
        temperatura=temperatura,
        ph_suelo=ph_suelo,
        riesgo=riesgo,
        resultado=resultado
    )

    if riesgo == "ALTO":
        disparar_alerta_custom(
            target_type="CULTIVO",
            referencia=(
                f"Cultivo {cultivo.nombre} "
                f"con riesgo ALTO: {resultado}"
            ),
            severidad="ALTA"
        )

    return prediccion


def predecir_fallo_maquinaria(maquinaria, nivel_desgaste, vibracion, temperatura_motor):
    probabilidad = 0

    if maquinaria.horas_uso > 500:
        probabilidad += 30
    if nivel_desgaste > 0.7:
        probabilidad += 25
    if vibracion > 2.5:
        probabilidad += 20
    if temperatura_motor > 85:
        probabilidad += 25

    probabilidad = min(probabilidad, 100)

    prediccion = PrediccionMaquinaria.objects.create(
        maquinaria=maquinaria,
        nivel_desgaste=nivel_desgaste,
        horas_uso=maquinaria.horas_uso,
        vibracion=vibracion,
        temperatura_motor=temperatura_motor,
        probabilidad_fallo=probabilidad
    )

    if probabilidad >= 70:
        disparar_alerta_custom(
            target_type="MAQUINARIA",
            referencia=(
                f"Maquinaria {maquinaria.nombre} "
                f"con probabilidad de fallo {probabilidad}%"
            ),
            severidad="ALTA"
        )

    return prediccion
