from django.contrib import admin
from .models import Cultivo


@admin.register(Cultivo)
class CultivoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'estado', 'fecha_siembra', 'area_sembrada', 'created_at')
    list_filter = ('tipo', 'estado', 'fecha_siembra')
    search_fields = ('nombre', 'descripcion', 'notas')
    date_hierarchy = 'fecha_siembra'
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'tipo', 'descripcion')
        }),
        ('Fechas', {
            'fields': ('fecha_siembra', 'fecha_cosecha_estimada')
        }),
        ('Detalles', {
            'fields': ('area_sembrada', 'estado', 'notas')
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
