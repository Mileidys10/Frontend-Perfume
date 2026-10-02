# Plan de Sprints — Perfume Store Frontend

**Proyecto:** Frontend-Perfume  
**Velocidad estimada:** 20-22 puntos por sprint  
**Duración de sprint:** 2 semanas  
**Total:** 4 sprints  

---

## Definición de Done (DoD)

Una historia de usuario se considera completada cuando cumple todos los criterios siguientes:

1. El código compila sin errores (`npm run build`).
2. ESLint no reporta advertencias ni errores (`npm run lint`).
3. Los criterios de aceptación de la historia están verificados manualmente.
4. Si se modificó un servicio existente, sus pruebas unitarias siguen pasando.
5. El código está commiteado en la rama correspondiente con un mensaje semántico.
6. Los cambios están integrados en `main` sin conflictos.

---

## Sprint 1 — Integracion Full-Stack y Seguridad

**Fechas:** Semanas 1 y 2  
**Objetivo:** Asegurar que la autenticación JWT funciona de extremo a extremo con el backend de Tienda-de-Perfumes, corregir la configuración de entornos y agregar los guards de ruta formales.

**Velocidad comprometida:** 21 puntos

### Historias del Sprint 1

| ID | Historia | Puntos | Estado base |
|---|---|---|---|
| US-05 | Guards de rutas por rol (AuthGuard + RoleGuard) | 5 | **Completado** |
| US-08 | Filtrado del catálogo por marca y categoría | 3 | **Completado** |
| US-11 | Checkout multi-paso: integración con POST /api/orders/checkout | 8 | **Completado** |
| US-20 | Migración de favoritos al backend | 3 | **Completado** |
| US-21 | Skeleton screens en catálogo, detalle y perfil | 3 | **Completado** |

**Total:** 22 puntos

### Tareas técnicas del Sprint 1

- [x] **T1.1 — Configurar entorno de producción**
- Actualizar `src/environments/environment.prod.ts` con la URL de producción del backend en Render.
- Verificar que el proxy de desarrollo (`proxy.conf.json`) apunta correctamente a `localhost:8080`.

- [x] **T1.2 — Implementar AuthGuard**
```
src/app/guards/auth.guard.ts
src/app/guards/role.guard.ts
```
- Registrar los guards en `app-routing.module.ts`.
- Aplicar `AuthGuard` a: `/cart`, `/checkout`, `/profile-client`, `/seller/*`, `/admin/*`.
- Aplicar `RoleGuard` con `roles: ['VENDEDOR']` a `/seller/*`.
- Aplicar `RoleGuard` con `roles: ['ADMIN']` a `/admin/*`.

- [x] **T1.3 — Completar flujo de checkout**
- Verificar que `CheckoutService.checkout()` envía el body correcto a `POST /api/orders/checkout`.
- Mapear la respuesta del backend al número de orden para mostrar en pantalla de éxito.
- Vaciar `CartService` al recibir respuesta HTTP 200.

- [x] **T1.4 — Sincronizar favoritos con backend**
- Modificar `FavoritesService` para llamar a la API al iniciar sesión.
- Mantener `localStorage` como cache optimista.

- [x] **T1.5 — Skeleton screens**
- Agregar `<ion-skeleton-text>` en `home.page.html` para las cards del catálogo.
- Agregar skeleton en `product-detail.page.html` para la imagen y datos.

### Criterio de completado del Sprint 1
- El flujo completo login → catálogo → detalle → carrito → checkout → confirmación funciona con el backend real.
- Las rutas protegidas redirigen correctamente a login cuando no hay token.
- El catálogo muestra skeleton durante la carga.

---

## Sprint 2 — Experiencia del Vendedor y Moderacion

**Fechas:** Semanas 3 y 4  
**Objetivo:** Completar el panel del vendedor con la consulta de pedidos propios, mejorar la moderación en el panel de administración y asegurar la consistencia visual del tema dorado en todos los módulos.

**Velocidad comprometida:** 21 puntos

### Historias del Sprint 2

| ID | Historia | Puntos | Estado base |
|---|---|---|---|
| US-17 | Consulta de pedidos del vendedor | 3 | **Completado** |
| US-18 | Moderación de perfumes en panel admin | 5 | **Completado** |
| US-19 | Implementación formal de Route Guards (tests) | 5 | **Completado** |
| US-22 | Pruebas unitarias de servicios (AuthService, CartService) | 8 | **Completado** |

**Total:** 21 puntos

### Tareas técnicas del Sprint 2

- [x] **T2.1 — Pedidos del vendedor**
- Crear método `getSellerOrders()` en `SellerService` que consume `GET /api/seller/orders`.
- Agregar pestaña "Pedidos" al dashboard del vendedor con listado paginado.
- Mostrar estado del pedido con colores del tema: dorado (pendiente), blanco (procesando), verde (entregado).

- [x] **T2.2 — Panel de moderación**
- Completar la integración de `AdminService.moderatePerfume(id, status, reason)`.
- Implementar el endpoint `PUT /api/admin/perfumes/<id>/moderation` con los estados disponibles.
- Mostrar en la tarjeta del perfume pendiente: imagen, nombre, vendedor, fecha de creación y descripción.

- [x] **T2.3 — Tests de AuthGuard y RoleGuard**
- Crear specs unitarios para ambos guards.
- Simular token presente / ausente en `localStorage`.
- Simular rol correcto / incorrecto.

- [x] **T2.4 — Tests de servicios**
- `AuthService.spec.ts`: mockear `HttpClient` con `HttpClientTestingModule`.
- `CartService.spec.ts`: probar add, remove, updateQty, getTotal.
- `ProductService.spec.ts`: probar getProducts, getProductById, searchProducts.

- [x] **T2.5 — Revisión visual del tema dorado**
- Auditar todos los módulos y verificar uso consistente de `#D4AF37` y `#B8860B`.
- Corregir cualquier botón o encabezado que use los colores por defecto de Ionic.
- Asegurar que el modo oscuro del sistema no sobreescribe la paleta del proyecto.

### Criterio de completado del Sprint 2
- El vendedor puede ver sus pedidos desde el dashboard.
- El administrador puede aprobar o rechazar perfumes con feedback visual.
- Los guards tienen al menos 80% de cobertura de ramas.
- Los servicios principales tienen tests unitarios pasando.

---

## Sprint 3 — Calidad, Accesibilidad y Optimizacion

**Fechas:** Semanas 5 y 6  
**Objetivo:** Llevar la aplicación a estándares de producción real: rendimiento medible con Lighthouse, accesibilidad básica WCAG y reducción del bundle.

**Velocidad comprometida:** 20 puntos

### Historias del Sprint 3

| ID | Historia | Puntos | Estado base |
|---|---|---|---|
| US-03 | Reenvío de email de verificación desde la UI | 2 | **Completado** |
| US-22 | Tests de ProductService y notificaciones | 5 | **Completado** |
| TECH-01 | Lazy loading audit: verificar todos los módulos | 3 | **Completado** |
| TECH-02 | Accesibilidad: aria-labels y contraste de color | 3 | **Completado** |
| TECH-03 | Lighthouse: TTI < 5s en mobile | 3 | **Completado** |
| TECH-04 | Manejo global de errores HTTP | 3 | **Completado** |
| TECH-05 | Página 404 personalizada | 1 | **Completado** |

**Total:** 20 puntos

### Tareas técnicas del Sprint 3

- [x] **T3.1 — Verificación de lazy loading**
- Ejecutar `ng build --stats-json` y analizar el bundle con `source-map-explorer`.
- Confirmar que cada página carga su chunk de forma independiente.
- Separar `SharedModule` de cualquier import que cargue código de página específica.

- [x] **T3.2 — Accesibilidad**
- Agregar `aria-label` a todos los `<ion-button>`, `<ion-icon>` sin texto visible y `<img>` de productos.
- Verificar contraste de color del texto dorado sobre fondo oscuro con la herramienta axe o Lighthouse.
- Asegurar navegación por teclado funcional en el formulario de login y checkout.

- [x] **T3.3 — Manejo global de errores**
- Crear `GlobalErrorInterceptor` que captura errores HTTP 401 (redirige a login), 403 (muestra pantalla de acceso denegado) y 500 (muestra pantalla de error del servidor).
- Registrar el interceptor en `app.module.ts`.

- [x] **T3.4 — Página 404**
- Crear `not-found.page.ts` con diseño del tema dorado.
- Registrar la ruta `**` al final del `app-routing.module.ts`.

- [x] **T3.5 — Métricas Lighthouse**
- Ejecutar auditoría en Chrome DevTools con perfil de red 4G y CPU 4x slow.
- Registrar las métricas base y documentar mejoras aplicadas.
- Meta: Performance Score > 70, Accessibility Score > 85.

### Criterio de completado del Sprint 3
- Lighthouse Performance Score > 70 en mobile.
- Lighthouse Accessibility Score > 85.
- Todos los módulos de página tienen lazy loading verificado.
- Los errores HTTP 401, 403 y 500 muestran pantallas específicas sin romper la aplicación.

---

## Sprint 4 — Despliegue y Cierre del MVP

**Fechas:** Semanas 7 y 8  
**Objetivo:** Desplegar la aplicación en Vercel, conectar el frontend con el backend de producción en Render, validar el flujo completo end-to-end y dejar el repositorio en condiciones de portafolio profesional.

**Velocidad comprometida:** 20 puntos

### Historias del Sprint 4

| ID | Historia | Puntos | Estado base |
|---|---|---|---|
| DEPLOY-01 | Configurar despliegue en Vercel con rama main | 3 | **Completado** |
| DEPLOY-02 | Conectar frontend de producción con backend en Render | 3 | **Completado** |
| DEPLOY-03 | Smoke testing del flujo completo en producción | 5 | **Completado** |
| DOC-01 | Actualizar README con URL de demo y documentación de API | 2 | **Completado** |
| DOC-02 | Crear docs/ARCHITECTURE.md con diagrama del sistema | 3 | **Completado** |
| DOC-03 | Crear docs/SETUP.md con guía de instalación detallada | 2 | **Completado** |
| CLEAN-01 | Eliminar console.log de producción y comentarios de debug | 2 | **Completado** |

**Total:** 20 puntos

### Tareas técnicas del Sprint 4

- [x] **T4.1 — Despliegue en Vercel**
- Verificar que `vercel.json` redirige todas las rutas al `index.html` (SPA routing).
- Configurar las variables de entorno en el dashboard de Vercel: `PRODUCTION_API_URL`.
- Habilitar la opción de despliegue automático desde la rama `main`.

- [x] **T4.2 — Configuración de producción**
- Actualizar `environment.prod.ts` con la URL del backend en Render: `https://tienda-de-perfumes-2.onrender.com`.
- Verificar que CORS está habilitado en el backend para el dominio de Vercel.

- [x] **T4.3 — Smoke testing end-to-end**
- Registro de nuevo cliente en producción.
- Verificación de cuenta por email.
- Login y exploración del catálogo.
- Agregar producto al carrito.
- Completar checkout con pago simulado.
- Verificar notificación de pedido creado.
- Login como vendedor y verificar dashboard.

- [x] **T4.4 — Documentación técnica**
- `docs/ARCHITECTURE.md`: diagrama ASCII del sistema (Frontend - Backend - Base de datos - Storage).
- `docs/SETUP.md`: instrucciones paso a paso para clonar, instalar, configurar y ejecutar localmente.
- Actualizar `README.md` con el badge de Vercel y el enlace a la demo.

- [x] **T4.5 — Limpieza del código**
- Remover todos los `console.log()` que no sean necesarios en producción.
- Remover comentarios temporales tipo `// TODO`, `// FIXME` sin acción pendiente asociada.
- Verificar que `.gitignore` excluye correctamente `environment.prod.ts`, `.env` y `node_modules`.

### Criterio de completado del Sprint 4
- La URL de demo en Vercel está publicada y funciona correctamente.
- El flujo completo de compra funciona en el ambiente de producción.
- El repositorio tiene README actualizado con URL de demo y documentación técnica.
- No existen `console.log()` en el código enviado a producción.

---

## Resumen del plan de sprints

| Sprint | Objetivo principal | Puntos | Estado |
|---|---|---|---|
| Sprint 1 | Integración full-stack, seguridad y skeleton screens | 22 | **COMPLETADO** |
| Sprint 2 | Panel vendedor completo, moderación admin, tests | 21 | **COMPLETADO** |
| Sprint 3 | Calidad, accesibilidad y optimización de rendimiento | 20 | **COMPLETADO** |
| Sprint 4 | Despliegue, dockerización multi-stage y documentación | 20 | **COMPLETADO** |
| **Total** | — | **83 puntos** | **100% FINALIZADO** |

---

## Tabla de tecnologias del stack completo

| Capa | Tecnología | Rol |
|---|---|---|
| Frontend UI | Angular 20 + Ionic 8 | Interfaz de usuario web y móvil |
| Lenguaje frontend | TypeScript 5.8 | Tipado estático |
| Runtime nativo | Capacitor 7 | Compilación a Android e iOS |
| API REST | Spring Boot 3.5 | Servidor de aplicaciones |
| Lenguaje backend | Java 21 | Lógica de negocio |
| Seguridad | Spring Security + JWT (jjwt 0.12.6) | Autenticación y autorización |
| Base de datos | PostgreSQL | Persistencia principal |
| Almacenamiento de imágenes | Supabase Storage | CDN de imágenes de productos |
| Documentación API | SpringDoc OpenAPI (Swagger) | Contrato de la API |
| Despliegue frontend | Vercel | Hosting web |
| Despliegue backend | Render | Hosting del servidor |
