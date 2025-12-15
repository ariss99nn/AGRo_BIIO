from django.urls import path
from .views import PrediccionCultivoAPIView

urlpatterns = [
    path("prediccion-cultivo/", PrediccionCultivoAPIView.as_view()),
]
