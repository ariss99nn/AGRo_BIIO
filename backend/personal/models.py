from django.db import models

class Personal(models.Model):
    usuario_id = models.OneToOneField(
        "usuarios.Usuario",
        on_delete=models.CASCADE,
        related_name="personal",
        db_column="usuario_id"
    )

    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    
    cedula = models.CharField(max_length=20, unique=True)

    cargo = models.CharField(
        max_length=100,
        choices=[
            ("ADMINISTRATIVO", "Administrativo"),
            ("OPERATIVO", "Operativo"),
            ("SUPERVISOR", "Supervisor"),
            ("GERENCIA", "Gerencia"),
        ],
        default="OPERATIVO"
    )

    fecha_ingreso = models.DateField()
    estado = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
