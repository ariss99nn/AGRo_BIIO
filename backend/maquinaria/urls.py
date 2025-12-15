from django.urls import path
from .views import (
    MaquinariaListCreateAPIView,
    MaquinariaDetailAPIView
)

urlpatterns = [
    path("maquinarias/", MaquinariaListCreateAPIView.as_view(), name="maquinaria-list-create"),
    path("maquinarias/<int:pk>/", MaquinariaDetailAPIView.as_view(), name="maquinaria-detail"),
]
