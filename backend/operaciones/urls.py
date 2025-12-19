from django.urls import path
from operaciones.views import (
    ConsumoListCreateAPIView,
    ConsumoDetailAPIView,
    EjecutarConsumoAPIView,
    MonitoreoListCreateAPIView,
)

urlpatterns = [
    path("operacion/consumos/", ConsumoListCreateAPIView.as_view()),
    path("operacion/consumos/<int:pk>/", ConsumoDetailAPIView.as_view()),
    path("operacion/consumos/<int:pk>/ejecutar/", EjecutarConsumoAPIView.as_view()),
    path("operacion/monitoreos/", MonitoreoListCreateAPIView.as_view()),
]
