# AgroBio Backend – Django REST Framework

Backend del sistema AgroBio para gestión de cultivos, insumos, personal, maquinaria, monitoreo, alertas e inteligencia artificial.

## 🛠 Tecnologías
- Python 3.10+
- Django 4+
- Django REST Framework
- PostgreSQL / SQLite (dev)
- JWT Authentication
- Git + GitHub

---

## 🚀 Instalación del Proyecto

### 1️⃣ Clonar repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd agrobio-backend
```

### 2️⃣ Crear entorno virtual
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```
### 3️⃣ Instalar dependencias
```bash
pip install -r requirements.txt
```
### 4️⃣ Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```SECRET_KEY=tu_clave_secreta
DEBUG=True
DB_NAME=nombre_base_datos
DB_USER=usuario_base_datos
DB_PASSWORD=contraseña_base_datos
DB_HOST=localhost
DB_PORT=5432
```
### 5️⃣ Migrar base de datos
```bash
python manage.py makemigrations
python manage.py migrate
```
### 6️⃣ Crear superusuario
```bash
python manage.py createsuperuser
``` 
### 7️⃣ Ejecutar servidor de desarrollo
```bash
python manage.py runserver
```

### Prohibido
- Subir archivos de entorno (.env) con información sensible.
- Subir archivos de base de datos locales.
- Subir archivos compilados o temporales.   
- Subir codigo a rama main
- Subir codigo sin probar
- Subir codigo sin comentarios
- Subir codigo sin seguir las buenas practicas de desarrollo



### Ramas Oficiales
- `main`: Rama principal con código estable listo para producción.
- `develop`: Rama de desarrollo donde se integran nuevas funcionalidades.
- `feature/nombre-funcionalidad`: Ramas para desarrollo de nuevas funcionalidades. 

### Ejemplo
```bash
git checkout -b feature/nueva-funcionalidad
```
### Flujo correcto
```bash
feature/nueva-funcionalidad -> Pull Request -> develop -> Pull Request -> main
```
### Normas de Commit
- Usar mensajes claros y descriptivos.
### Formato sugerido
```
feat: agregar nueva funcionalidad X
fix: corregir error en la funcionalidad Y
docs: actualizar documentación
style: mejorar formato de código
refactor: refactorizar módulo Z
test: agregar pruebas para la funcionalidad W
chore: tareas de mantenimiento
```

# Ignorar archivos de entorno
.env

