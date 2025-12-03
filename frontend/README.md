🌐 AGRO_BIIO – Frontend

Interfaz web del sistema AGRO_BIIO desarrollada con Next.js + TypeScript + Tailwind CSS, encargada de consumir la API del backend y presentar la información al usuario de forma moderna, rápida y escalable.

🚀 Tecnologías Utilizadas

✅ Next.js (App Router)

✅ TypeScript

✅ Tailwind CSS

✅ ESLint

✅ Consumo de API REST con fetch / axios

✅ Arquitectura por módulos (features)

🏗 Estructura del Proyecto
frontend/
├── app/              → Rutas principales, layouts y páginas
├── components/       → Componentes reutilizables
├── features/         → Módulos por funcionalidad (auth, usuarios, etc.)
├── lib/              → Funciones auxiliares, API, auth, helpers
├── public/           → Imágenes y assets
├── styles/           → Estilos globales
├── .env.example      → Variables de entorno de ejemplo
├── package.json      → Dependencias y scripts
└── README.md         → Documentación del frontend

⚙️ Instalación del Frontend
1️⃣ Entrar a la carpeta
cd frontend

2️⃣ Instalar dependencias
npm install


⚠️ Esto crea automáticamente la carpeta node_modules,
nunca se sube al repositorio.

3️⃣ Configurar variables de entorno

Crear archivo:

.env.local


Basado en:

.env.example


Ejemplo:

NEXT_PUBLIC_API_URL=http://localhost:8000/api

4️⃣ Ejecutar en desarrollo
npm run dev


Aplicación disponible en:

http://localhost:3000

📜 Scripts Disponibles
npm run dev     # Servidor de desarrollo
npm run build   # Compilar para producción
npm run start   # Servir versión compilada
npm run lint    # Analizar errores de código

🔗 Comunicación con el Backend

El frontend consume la API REST del backend, que debe estar ejecutándose en:

http://localhost:8000


Variables clave:

NEXT_PUBLIC_API_URL

🌿 Flujo de Trabajo con Git (Frontend)
Ramas

main → versión estable

dev → integración

feature/nombre-funcionalidad → desarrollo por módulo

Flujo correcto
feature/* → Pull Request → dev → Pull Request → main


❌ Push directo a main prohibido

❌ Archivos Prohibidos en el Repositorio

Nunca subir:

node_modules/

.next/

.env.local

.env.production

archivos temporales

Todo esto debe estar correctamente en el .gitignore.

✅ Buenas Prácticas

✅ Código tipado con TypeScript

✅ Componentes reutilizables

✅ Separación por módulos (features)

✅ ESLint sin errores

✅ Commits claros y descriptivos

✅ Pull Requests obligatorios

📌 Estado del Frontend

🟡 En desarrollo
✅ Estructura base creada
✅ Tailwind configurado
✅ TypeScript activo
✅ ESLint funcionando
🟡 En construcción: módulos de autenticación y dashboard