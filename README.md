# Luxury Perfumes Store - Frontend & Fullstack E-Commerce

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20.0-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 20" />
  <img src="https://img.shields.io/badge/Ionic-8.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic 8" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Nginx-Alpine-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

> Plataforma e-commerce empresarial y aplicación móvil progresiva (PWA) de alto rendimiento para comercialización de fragancias exclusivas y perfumería de diseñador. Conectada al backend empresarial de Spring Boot 3.5 y base de datos relacional PostgreSQL.

---

## 💎 Características Principales y Funcionalidad

1. **Catálogo de Lujo Reactivo**:
   - Búsqueda en tiempo real, filtrado por notas olfativas, acordes (amaderados, florales, cítricos) y marcas.
   - **Skeleton Screens**: Marcadores de posición animados con paleta Luxury Gold durante operaciones asíncronas para una experiencia de usuario fluida y sin saltos visuales.
2. **Arquitectura de Seguridad Multi-Rol (RBAC + JWT)**:
   - Protección de rutas mediante `AuthGuard` y `RoleGuard`.
   - Soporte para tres perfiles de usuario: `CLIENTE`, `VENDEDOR` y `ADMIN`.
3. **Panel de Gestión de Pedidos del Vendedor (Sprint 2)**:
   - Pestaña de pedidos con estados en tiempo real (`PENDIENTE`, `EN PREPARACIÓN`, `ENVIADO`, `ENTREGADO`).
   - Transiciones de estado con un clic y badges tematizados en oro (`#D4AF37`) y esmeralda (`#2DD36F`).
4. **Módulo de Moderación para Administradores (Sprint 2)**:
   - Panel de control administrativo para autorizar o rechazar fragancias subidas por vendedores antes de su publicación en el catálogo general.
5. **Checkout Multi-Paso & Carrito Persistente**:
   - Sincronización reactiva con `CartService`, cálculo dinámico de subtotales y pasarela de pago simulada.
6. **Manejo Global de Errores & Página 404 Personalizada**:
   - Captura interceptada de códigos HTTP 401, 403 y 500 con redirección segura y pantalla 404 con estética oscura y dorada.
7. **Contenerización Multi-Stage con Docker Compose**:
   - Empaquetado en Nginx Alpine con compresión Gzip, cabeceras de seguridad y fallback SPA.

---

## 🚀 Despliegue Rápido con Docker (Recomendado)

Levanta la solución completa (PostgreSQL 17, Spring Boot 3.5 y Frontend Nginx) con un único comando:

```bash
docker compose -f docker-compose.fullstack.yml up -d --build
```

- **Frontend Web**: [http://localhost](http://localhost) (Puerto 80)
- **Backend API REST**: [http://localhost:8080/api](http://localhost:8080/api)
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 🛠️ Tecnologías y Herramientas

| Componente | Tecnología | Rol |
|---|---|---|
| **Frontend SPA** | Angular 20 + Ionic 8 | Interfaz reactiva web y móvil |
| **Lenguaje** | TypeScript 5.8 | Tipado estático estricto |
| **Runtime Móvil** | Capacitor 7 | Compilación nativa iOS / Android |
| **Servidor Web Producción** | Nginx Alpine | Servidor web con Gzip y caché |
| **Contenerización** | Docker Multi-Stage | Empaquetado reproducible |
| **Backend REST** | Spring Boot 3.5 (Java 21) | Lógica de negocio y persistencia |
| **Base de Datos** | PostgreSQL 17 | Almacenamiento relacional |
| **Hosting Cloud** | Vercel (Front) + Render (Back) | Despliegue en la nube |

---

## 👥 Cuentas y Credenciales Demo

| Rol | Correo Electrónico | Contraseña | Permisos |
|---|---|---|---|
| **Administrador** | `admin@perfumes.com` | `Admin123*` | Métricas, auditoría de usuarios y moderación de fragancias |
| **Vendedor** | `vendedor@perfumes.com` | `Vendedor123*` | Gestión de inventario, catálogo, marcas y órdenes de despacho |
| **Cliente** | `cliente@perfumes.com` | `Cliente123*` | Exploración, lista de deseos, carrito y compras |

---

## 📋 Documentación de Ingeniería

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) &mdash; Diagramas C4, flujo de autenticación JWT y ciclo de vida de órdenes.
- [docs/SETUP.md](docs/SETUP.md) &mdash; Guía paso a paso de instalación, configuración local y variables de entorno.
- [docs/SPRINTS.md](docs/SPRINTS.md) &mdash; Registro detallado del Product Backlog y cumplimiento de los 4 Sprints (83/83 pts).
- [docs/REQUISITOS_FUNCIONALES.md](docs/REQUISITOS_FUNCIONALES.md) &mdash; Especificación formal de Requerimientos Funcionales (RF).
- [docs/REQUISITOS_NO_FUNCIONALES.md](docs/REQUISITOS_NO_FUNCIONALES.md) &mdash; Criterios de calidad, seguridad y rendimiento (RNF).

---

## 🧪 Pruebas Automatizadas y Calidad de Código

```bash
# Compilar producción (0 errores, 0 advertencias)
npm run build

# Ejecutar suite de pruebas unitarias
npm test -- --watch=false --browsers=ChromeHeadless
```

Suites de pruebas cubiertas:
- `AuthGuard` & `RoleGuard` (Control de acceso por rol y redirección)
- `AuthService` (Autenticación JWT y persistencia)
- `CartService` (Operaciones de carrito reactivo y totales)
- `ProductService` (Consumo de catálogo, marcas y categorías)

---

## 🎨 Sistema de Diseño (Luxury Gold Palette)

| Nombre del Token | Código Hexadecimal | Propósito Visual |
|---|---|---|
| **Gold Primary** | `#D4AF37` | Títulos, botones de acción principal, bordes activos |
| **Gold Dark** | `#B8860B` | Gradientes secundarios y acentos profundos |
| **Dark Onyx** | `#0A0A0A` | Fondo principal de la aplicación |
| **Surface Card** | `#181818` | Tarjetas de perfumes, modales y navegación |
| **Pure White** | `#FFFFFF` | Textos de alto contraste |
| **Emerald Green** | `#2DD36F` | Estado de pedido entregado y operaciones exitosas |

---

## 🔗 Repositorios Relacionados

- **Backend Empresarial:** [Mileidys10/Tienda-de-Perfumes](https://github.com/Mileidys10/Tienda-de-Perfumes)
- **Frontend SPA:** [Mileidys10/Frontend-Perfume](https://github.com/Mileidys10/Frontend-Perfume)
