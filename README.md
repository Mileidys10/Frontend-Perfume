# 💎 Aeterna Perfumes — Frontend Web & Móvil (Angular 20 + Ionic 8)

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20.0-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 20" />
  <img src="https://img.shields.io/badge/Ionic-8.0-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic 8" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Nginx-Alpine-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/Estética-Quiet_Luxury-D4AF37?style=for-the-badge" alt="Quiet Luxury" />
  <img src="https://img.shields.io/badge/Licencia-MIT-F59E0B?style=for-the-badge" alt="MIT License" />
</p>

> **Plataforma E-Commerce Empresarial y Aplicación Móvil Progresiva (PWA)** de alto rendimiento para la comercialización de fragancias exclusivas y perfumería de diseñador. Conectada al backend empresarial desacoplado en Spring Boot 3 y PostgreSQL.

* **Desarrolladora**: [Mileidys Agámez Ospino](https://github.com/Mileidys10) — Ingeniera de Software & Especialista Frontend/Móvil.
* **Backend REST API Asociado**: [Tienda-de-Perfumes](https://github.com/Mileidys10/Tienda-de-Perfumes) (Java 21 + Spring Boot 3 + Spring Security + JWT + PostgreSQL).

---

## ✨ Características Principales & Funcionalidad

1. **Catálogo de Lujo Reactivo & Pirámide Olfativa SVG**:
   - Visualización interactiva de notas de salida, corazón y fondo renderizadas en SVG dinámico.
   - Búsqueda en tiempo real, filtrado por acordes (amaderados, florales, cítricos, orientales) y marcas.
   - **Skeleton Screens**: Marcadores de posición animados con paleta Luxury Gold durante operaciones asíncronas para eliminar saltos de maquetación (CLS = 0).

2. **Sommelier Virtual IA & Discovery Box**:
   - Asistente inteligente para recomendación personalizada de fragancias según ocasión, clima y preferencias olfativas.
   - Constructor de kits de descubrimiento (Discovery Box) con selección interactiva de muestras.

3. **Layering Studio & Grabado Láser Personalizado**:
   - Simulador interactivo de superposición de fragancias (Layering) para crear acordes únicos.
   - Previsualizador en tiempo real de tipografía y acabado para grabado láser en el frasco.

4. **Arquitectura de Seguridad Multi-Rol (RBAC + JWT)**:
   - Protección reactiva de rutas mediante `AuthGuard` y `RoleGuard`.
   - Soporte para tres perfiles de usuario: `CLIENTE`, `VENDEDOR` y `ADMIN`.

5. **Panel de Gestión de Pedidos del Vendedor & Moderación**:
   - Dashboard en tiempo real con transiciones de estado de órdenes (`PENDIENTE`, `EN PREPARACIÓN`, `ENVIADO`, `ENTREGADO`).
   - Módulo de moderación administrativa para aprobar o rechazar fragancias antes de su publicación.

6. **Checkout Multi-Paso & Carrito Persistente**:
   - Sincronización reactiva con `CartService`, cálculo dinámico de subtotales, impuestos y pasarela de pago simulada.

---

## 🐳 Despliegue con Docker (Nginx Alpine)

El frontend está empaquetado como imagen multi-stage optimizada sobre Nginx Alpine:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Mileidys10/Frontend-Perfume.git
cd Frontend-Perfume

# 2. Levantar el contenedor
docker compose up -d --build
```

* Acceso en navegador: `http://localhost:4200` (o el puerto configurado en Docker Compose).

---

## 💻 Ejecución Local en Desarrollo

### Requisitos:
* **Node.js**: Versión 20 LTS o superior.
* **NPM**: 10+.

### Pasos:
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
# O con Angular CLI:
ng serve --open
```

---

## 📁 Estructura del Código (`src/app/`)

```text
src/app/
├── components/         # Componentes visuales y pantallas (Home, Detail, Checkout, Seller, Admin)
├── guards/             # AuthGuard, RoleGuard para control de acceso RBAC
├── interceptors/       # AuthInterceptor (JWT injection) y ErrorInterceptor
├── models/             # Interfaces de dominio TypeScript (Perfume, Order, User, Cart)
├── services/           # Lógica de negocio cliente (Auth, Perfume, Cart, Order, Notification)
└── shared/             # Componentes reutilizables, skeletons y layouts
```

---

## 📄 Licencia y Autoría

* **Autora**: Mileidys Agámez Ospino
* **GitHub**: [@Mileidys10](https://github.com/Mileidys10)
* **Licencia**: MIT
