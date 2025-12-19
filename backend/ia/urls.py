from django.urls import path
from ia.views import (
    PrediccionCultivoAPIView,
    PrediccionMaquinariaAPIView,
)

urlpatterns = [
    path("prediccion/cultivo/", PrediccionCultivoAPIView.as_view()),
    path("prediccion/maquinaria/", PrediccionMaquinariaAPIView.as_view()),
]
