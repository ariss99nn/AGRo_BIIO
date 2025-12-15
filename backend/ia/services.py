from .models import PrediccionCultivo
from alertas.models import Alerta


def predecir_riesgo_cultivo(cultivo, humedad, temperatura, ph_suelo):
    # Lógica experta (IA basada en reglas)
    if humedad < 30 and temperatura > 35:
        riesgo = "ALTO"
        resultado = "Estrés hídrico severo. Activar riego inmediato."
    elif humedad < 45:
        riesgo = "MEDIO"
        resultado = "Déficit hídrico moderado. Supervisar."
    else:
        riesgo = "BAJO"
        resultado = "Condiciones óptimas."

    # Guardar predicción
    prediccion = PrediccionCultivo.objects.create(
        cultivo=cultivo,
        humedad=humedad,
        temperatura=temperatura,
        ph_suelo=ph_suelo,
        riesgo=riesgo,
        resultado=resultado
    )

    # Generar alerta automática si es riesgo alto
    if riesgo == "ALTO":
        Alerta.objects.create(
            tipo="RIESGO_CULTIVO",
            mensaje=f"Riesgo alto detectado en el cultivo {cultivo.id}",
            nivel="ALTO"
        )

    return prediccion
