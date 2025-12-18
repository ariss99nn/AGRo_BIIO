from django.urls import path
from operaciones.views import (
    ConsumoListCreateAPIView,
    ConsumoDetailAPIView,
    EjecutarConsumoAPIView,
    MonitoreoListCreateAPIView,
)

urlpatterns = [
    path("consumos/", ConsumoListCreateAPIView.as_view()),
    path("consumos/<int:pk>/", ConsumoDetailAPIView.as_view()),
    path("consumos/<int:pk>/ejecutar/", EjecutarConsumoAPIView.as_view()),
    path("monitoreos/", MonitoreoListCreateAPIView.as_view()),
]
