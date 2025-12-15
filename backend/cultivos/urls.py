from django.urls import path
from .views import (
    CultivoListCreateAPIView,
    CultivoDetailAPIView,
    CultivoConfigAPIView
)

urlpatterns = [
    path('cultivos/', CultivoListCreateAPIView.as_view(), name='cultivo-list-create'),
    path('cultivos/<int:pk>/', CultivoDetailAPIView.as_view(), name='cultivo-detail'),
    path('cultivos/config_info/', CultivoConfigAPIView.as_view(), name='cultivo-config'),
]
