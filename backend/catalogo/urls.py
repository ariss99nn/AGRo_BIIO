from django.urls import path
from .views import (
    ProductoListCreateView, ProductoDetailView,
    InsumoListCreateView, InsumoDetailView, InsumoStockBajoView,
    TasaConsumoListCreateView, TasaConsumoDetailView,
    ConsumoListCreateView, ConsumoDetailView,
    ConsumoInsumoListView, ConsumoInsumoDetailView
)


urlpatterns = [
    # Productos
    path('productos/', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
    
    # Insumos
    path('insumos/', InsumoListCreateView.as_view(), name='insumo-list-create'),
    path('insumos/<int:pk>/', InsumoDetailView.as_view(), name='insumo-detail'),
    path('insumos/stock-bajo/', InsumoStockBajoView.as_view(), name='insumo-stock-bajo'),
    
    # Tasas de Consumo
    path('tasas-consumo/', TasaConsumoListCreateView.as_view(), name='tasa-consumo-list-create'),
    path('tasas-consumo/<int:pk>/', TasaConsumoDetailView.as_view(), name='tasa-consumo-detail'),
    
    # Consumos
    path('consumos/', ConsumoListCreateView.as_view(), name='consumo-list-create'),
    path('consumos/<int:pk>/', ConsumoDetailView.as_view(), name='consumo-detail'),
    
    # Consumo_insumo (relación muchos a muchos)
    path('consumos/<int:consumo_id>/insumos/', ConsumoInsumoListView.as_view(), name='consumo-insumos-list'),
    path('consumos/<int:consumo_id>/insumos/<int:insumo_id>/', ConsumoInsumoDetailView.as_view(), name='consumo-insumo-detail'),
]