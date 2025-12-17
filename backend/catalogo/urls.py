from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Crear router
router = DefaultRouter()
router.register(r'productos', views.ProductoViewSet)
router.register(r'insumos', views.InsumoViewSet)
router.register(r'tasas-consumo', views.TasaConsumoViewSet)
router.register(r'consumos', views.ConsumoViewSet)
router.register(r'consumo-insumos', views.ConsumoInsumoViewSet)

urlpatterns = [
    # Las rutas del router van bajo /api/
    path('api/', include(router.urls)),
    
    # Otras rutas específicas
    path('api/crear-consumo/', views.CrearConsumoCompleto.as_view(), name='crear_consumo'),
    path('api/insumos-bajo-stock/', views.InsumosBajoStock.as_view(), name='insumos_bajo_stock'),
    
    # API auth - habilita login/logout en la interfaz de DRF
    path('api-auth/', include('rest_framework.urls')),
]
