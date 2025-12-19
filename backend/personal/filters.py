import django_filters
from django.db import models
from .models import Personal

class PersonalFilter(django_filters.FilterSet):

    # Buscar por nombre, apellido o cédula
    search = django_filters.CharFilter(method="filter_search")

    # Filtros directos
    cargo = django_filters.CharFilter(lookup_expr='iexact')
    estado = django_filters.BooleanFilter()
    fecha_ingreso_desde = django_filters.DateFilter(field_name="fecha_ingreso", lookup_expr="gte")
    fecha_ingreso_hasta = django_filters.DateFilter(field_name="fecha_ingreso", lookup_expr="lte")

    class Meta:
        model = Personal
        fields = ["cargo", "estado"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(nombres__icontains=value) |
            models.Q(apellidos__icontains=value) |
            models.Q(cedula__icontains=value)
        )
