from django.apps import AppConfig


class OperacionesConfig(AppConfig):
    name = "operaciones"

    def ready(self):
        import operaciones.signals