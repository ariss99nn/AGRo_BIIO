🌱 AGRO_BIIO
Sistema Inteligente de Gestión Agrícola con Análisis y Predicción

AGRO_BIIO es una plataforma web para la gestión integral de procesos agrícolas, enfocada en el control de cultivos, insumos, personal, maquinaria, consumos, monitoreo y reportes, integrando posteriormente inteligencia artificial para análisis y predicción.

Proyecto desarrollado bajo una arquitectura desacoplada Backend + Frontend, aplicando buenas prácticas de desarrollo, control de versiones profesional y flujo de trabajo colaborativo con GitHub.

🧠 Módulos del Sistema

✅ Gestión de Usuarios (autenticación con JWT)

✅ Personal (empleados)

✅ Productos

✅ Insumos

✅ Cultivos

✅ Consumos

✅ Maquinaria

✅ Monitoreo de actividades

✅ Sistema de alertas

✅ Reportes administrativos

🟡 Módulo de Inteligencia Artificial (en desarrollo)

🏗 Arquitectura del Proyecto
AGRO_BIIO/
├── backend/    → API desarrollada con Django REST Framework
├── frontend/   → Interfaz web con Next.js + TypeScript + Tailwind
└── README.md   → Documentación general del sistema


El sistema funciona mediante una API REST centralizada, consumida por el frontend.

🚀 Tecnologías Utilizadas
🔹 Backend

Python 3.10+

Django 4+

Django REST Framework

JWT Authentication

PostgreSQL / SQLite (desarrollo)

Variables de entorno con .env

🔹 Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

ESLint

Consumo de API REST

⚙️ Instalación y Ejecución del Proyecto
▶ 1. Clonar el repositorio
git clone https://github.com/ariss99nn/AGRO_BIIO.git
cd AGRO_BIIO

▶ 2. Backend (Django)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


Servidor corriendo en:

http://localhost:8000

▶ 3. Frontend (Next.js)
cd frontend
npm install
npm run dev


Aplicación disponible en:

http://localhost:3000


👉 node_modules se genera automáticamente en cada equipo con npm install y nunca se sube al repositorio.

🌿 Flujo de Trabajo con Git
Ramas Oficiales

main → Código final estable (producción)

dev → Integración de nuevas funcionalidades

feature/nombre-funcionalidad → Desarrollo por módulo

Flujo correcto de trabajo
feature/* → Pull Request → dev → Pull Request → main


❌ No se permite push directo a main.

🔐 Seguridad

Autenticación mediante JWT.

Variables sensibles protegidas con .env.

Acceso a endpoints mediante permisos.

Rama main protegida.

Uso de Pull Requests obligatorios.

📄 Documentación por Módulo

Backend: backend/README.md

Frontend: frontend/README.md

Cada uno contiene:

Instalación específica

Estructura interna

Scripts

Variables de entorno

⚠️ Normas del Proyecto

❌ No subir .env
❌ No subir node_modules
❌ No subir .next
❌ No subir bases de datos locales
❌ No hacer push directo a main
✅ Todo cambio entra por Pull Request
✅ El código debe probarse antes de subirse
✅ Seguir buenas prácticas de desarrollo

👥 Equipo de Desarrollo

Proyecto desarrollado por un equipo de 8 integrantes, utilizando metodología Scrum.

Roles:

Scrum Master

Backend Developers

Frontend Developers

Encargado de Inteligencia Artificial

QA / Testing

📌 Estado del Proyecto

🟡 En desarrollo activo
Actualmente en construcción de módulos principales y autenticación.