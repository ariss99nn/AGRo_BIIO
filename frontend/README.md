# AGRO_BIO - Frontend

Frontend del sistema AGRO_BIO desarrollado con:

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

## Estructura del Proyecto

- `app/` → Rutas principales y layouts
- `components/` → Componentes reutilizables
- `features/` → Módulos por área del sistema
- `lib/` → Funciones de API, auth y helpers
- `styles/` → Estilos globales
- `public/` → Imágenes y assets
- `.env.example` → Variables de entorno de ejemplo

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint



# 🌱 AGRo_BIIO

## Visión General

**AGRo_BIIO** es una plataforma integral de **Business Intelligence e Inteligencia Artificial aplicada a la gestión agrícola**. Centraliza datos operativos, productivos y administrativos para **mejorar la toma de decisiones**, **reducir costos** y **optimizar la productividad** de explotaciones agrícolas de cualquier escala.

El sistema combina **tableros operativos**, **gestión de recursos**, **alertas inteligentes**, **reportes avanzados** y un **motor de recomendaciones con IA**.

---

## 🎯 Problema que resuelve

La gestión agrícola suele estar fragmentada en múltiples herramientas (Excel, papel, sistemas aislados), lo que genera:

* Falta de visibilidad en tiempo real
* Decisiones reactivas en lugar de preventivas
* Pérdidas por mala planificación, fallas de maquinaria o eventos climáticos
* Poco aprovechamiento de los datos históricos

**AGRo_BIIO** unifica toda la información crítica en un solo sistema inteligente.

---

## 💡 Propuesta de Valor

* 📊 **Control total de la operación agrícola** en un solo panel
* 🤖 **IA aplicada** para recomendaciones accionables
* 🔔 **Alertas tempranas** por riesgos operativos
* 🚜 **Optimización del uso de maquinaria y recursos**
* 📈 **Reportes claros para decisiones estratégicas**

---

## 🧠 Módulos del Sistema

### 🔔 Centro de Alertas

* Alertas por cultivo, clima, maquinaria, inventario y personal
* Priorización (crítica, alta, media, baja)
* KPIs rápidos (alertas totales, críticas, no leídas)
* Filtros por tipo, prioridad y estado

### 📦 Catálogo de Insumos

* Gestión de inventario agrícola
* Estados: disponible, bajo stock, agotado
* Búsqueda y filtros por categoría
* Preparado para integración con compras y proveedores

### 🤖 Inteligencia Artificial

* Recomendaciones basadas en datos históricos y contexto
* Categorías: riego, cosecha, plagas, planificación, maquinaria
* Nivel de impacto y confianza del modelo
* Estimación de ahorro o beneficio

### 🚜 Maquinaria

* Inventario completo de equipos
* Estados: disponible, en uso, mantenimiento
* Control de horas de uso y mantenimientos
* KPIs operativos de disponibilidad

### ⚙️ Operaciones

* Gestión de tareas agrícolas (siembra, riego, fumigación, cosecha)
* Asignación de responsables
* Priorización y estados
* Tabla interactiva con ordenamiento

### 👷 Personal

* Gestión de recursos humanos
* Roles y estados laborales
* Asignaciones operativas
* Información de contacto

### 📈 Reportes

* Reportes por producción, maquinaria, inventario y operaciones
* Filtros por período
* Presets guardados
* Exportación (PDF / Excel)

### 👤 Usuarios y Permisos

* Gestión de usuarios del sistema
* Roles: admin, gerente, supervisor, técnico, operador
* Permisos por rol

### 📊 Estado del Sistema

* Estado del backend
* Entorno activo
* Control de versión

---

## 🏗️ Arquitectura Técnica

### Frontend

* **Next.js (App Router)**
* **React + TypeScript**
* Arquitectura basada en componentes
* UI reutilizable (`Card`, `Button`, `Tag`, `Input`, `Empty`)
* Tailwind CSS + Design Tokens

### Backend (previsto)

* API REST / GraphQL
* Autenticación y roles
* Persistencia de datos (PostgreSQL / MySQL)
* Integración con servicios externos (clima, sensores, IoT)

### Inteligencia Artificial

* Modelos predictivos y de recomendación
* Análisis de series temporales
* Reglas + ML híbrido
* Motor explicable (confianza, impacto)

---

## 📊 Modelo de Negocio

### 🎯 Clientes Objetivo

* Productores agrícolas medianos y grandes
* Empresas agroindustriales
* Cooperativas agrícolas
* Administradores de campos y fincas

### 💰 Monetización

* **SaaS por suscripción**

  * Plan Básico: gestión operativa
  * Plan Pro: reportes avanzados
  * Plan IA: recomendaciones inteligentes
* Licencias empresariales
* Servicios de implementación y consultoría

### 🚀 Escalabilidad

* Multi-finca / multi-región
* Integración con sensores IoT
* White-label para empresas
* Marketplace de módulos

---

## 🔐 Seguridad

* Control de accesos por rol
* Auditoría de acciones
* Preparado para cumplimiento normativo

---

## 📌 Estado del Proyecto

* Versión: **0.1.0**
* Estado: **MVP funcional (Frontend)**
* Backend: **en integración**

---

## 🌱 Visión a Futuro

* Predicción de rendimientos
* Simulación de escenarios
* IA climática avanzada
* Integración con drones y sensores
* App móvil

---

## ✨ Conclusión

**AGRo_BIIO** no es solo un sistema de gestión: es una **plataforma inteligente para la agricultura moderna**, diseñada para transformar datos en decisiones y decisiones en rentabilidad.
