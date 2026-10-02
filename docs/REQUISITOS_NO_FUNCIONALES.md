# Requisitos No Funcionales — Perfume Store Frontend

**Proyecto:** Frontend-Perfume  
**Versión:** 1.0  
**Fecha:** Octubre 2026  

---

## RNF-01 — Rendimiento

| Atributo | Valor |
|---|---|
| ID | RNF-01 |
| Categoría | Rendimiento |
| Prioridad | Alta |

**Criterios de aceptación:**

- El tiempo de carga inicial de la aplicación en condiciones de red 4G no debe superar los 3 segundos (medido con Lighthouse en modo móvil).
- El Time to Interactive (TTI) debe ser inferior a 5 segundos en hardware de gama media.
- La paginación del catálogo debe retornar resultados visibles en menos de 1 segundo desde la solicitud.
- El build de producción (`npm run build`) debe generar un bundle principal inferior a 2 MB sin compresión.

**Estrategias de implementación:**
- Lazy loading de módulos: cada página se carga bajo demanda via `loadChildren`.
- Paginación del catálogo con `page` y `size` en el servidor (no client-side).
- Imágenes servidas desde Supabase CDN con formato optimizado.

---

## RNF-02 — Seguridad

| Atributo | Valor |
|---|---|
| ID | RNF-02 |
| Categoría | Seguridad |
| Prioridad | Alta |

**Criterios de aceptación:**

- El token JWT nunca debe exponerse en URLs, parámetros de query ni en la consola del navegador en ambiente de producción.
- Todas las peticiones a rutas protegidas del backend deben incluir el encabezado `Authorization: Bearer <token>` inyectado por `AuthInterceptor`.
- Las rutas protegidas deben implementar Angular Route Guards que redirijan a `/login` si el token está ausente o expirado.
- Los formularios de login y registro deben implementar validación reactiva con mensajes de error claros antes de enviar peticiones al servidor.
- El proyecto no debe incluir credenciales, API keys ni tokens hardcodeados en el código fuente.
- Las variables sensibles de producción (URL del backend, claves Supabase) deben gestionarse exclusivamente mediante archivos de entorno ignorados por `.gitignore`.

---

## RNF-03 — Usabilidad

| Atributo | Valor |
|---|---|
| ID | RNF-03 |
| Categoría | Usabilidad |
| Prioridad | Alta |

**Criterios de aceptación:**

- La interfaz debe seguir la paleta de colores oscuros con acentos en dorado (`#D4AF37`, `#B8860B`) de forma consistente en todos los módulos.
- El diseño debe ser completamente responsivo, funcional en pantallas desde 320px (mobile) hasta 1440px (desktop).
- Los estados de carga deben indicarse mediante Ionic skeleton screens o spinners en cada petición asíncrona.
- Los mensajes de error de red o API deben mostrarse de forma comprensible al usuario (no códigos técnicos).
- El flujo de checkout no debe requerir más de 3 interacciones para completar una compra desde el carrito.
- Los ítems del carrito deben persistir entre sesiones del navegador mediante `localStorage`.

---

## RNF-04 — Mantenibilidad

| Atributo | Valor |
|---|---|
| ID | RNF-04 |
| Categoría | Mantenibilidad |
| Prioridad | Alta |

**Criterios de aceptación:**

- El código TypeScript debe pasar sin errores ni advertencias el análisis de ESLint con la configuración `@angular-eslint` del proyecto.
- Cada servicio debe tener una responsabilidad única: `AuthService` maneja únicamente autenticación, `ProductService` únicamente catálogo y búsqueda, etc.
- Los componentes compartidos (`Button`, `Card`, `Header`, `Footer`, `Stepper`, `Searchbar`) deben reutilizarse en toda la aplicación sin duplicación.
- Las interfaces TypeScript (`Perfume`, `Brand`, `Category`, `User`, `Order`) deben estar centralizadas en los servicios correspondientes y no redefinirse por componente.
- Toda función pública de servicio debe incluir comentario de bloque JSDoc con descripción, parámetros y retorno.

---

## RNF-05 — Compatibilidad

| Atributo | Valor |
|---|---|
| ID | RNF-05 |
| Categoría | Compatibilidad |
| Prioridad | Media |

**Criterios de aceptación:**

- La aplicación web debe funcionar correctamente en las últimas dos versiones de Chrome, Firefox, Safari y Edge.
- Cuando se compile como aplicación nativa con Capacitor, debe ejecutarse sin errores en Android 10+ e iOS 14+.
- El backend se comunica exclusivamente a través de HTTP REST con JSON, sin dependencias propietarias de plataforma en el contrato de la API.

---

## RNF-06 — Accesibilidad

| Atributo | Valor |
|---|---|
| ID | RNF-06 |
| Categoría | Accesibilidad |
| Prioridad | Media |

**Criterios de aceptación:**

- Todos los elementos interactivos deben contar con atributos `aria-label` descriptivos.
- El contraste de color entre texto y fondo debe cumplir con la relación mínima de 4.5:1 para texto normal según WCAG 2.1 nivel AA.
- La navegación completa de la aplicación debe ser posible utilizando únicamente el teclado.
- Las imágenes de productos deben incluir atributo `alt` con la descripción del perfume.

---

## RNF-07 — Escalabilidad

| Atributo | Valor |
|---|---|
| ID | RNF-07 |
| Categoría | Escalabilidad |
| Prioridad | Media |

**Criterios de aceptación:**

- La arquitectura de módulos lazy-loaded permite incorporar nuevas páginas sin aumentar el bundle inicial.
- Los servicios Angular deben usar RxJS `Observable` en lugar de `Promise` para permitir la cancelación de peticiones y soporte de operadores reactivos.
- La paginación del servidor debe mantenerse como única fuente de verdad para el catálogo: no se debe cargar la totalidad del inventario en memoria del cliente.

---

## RNF-08 — Despliegue y entrega continua

| Atributo | Valor |
|---|---|
| ID | RNF-08 |
| Categoría | DevOps |
| Prioridad | Media |

**Criterios de aceptación:**

- El repositorio debe contener un archivo `vercel.json` válido que configure el enrutamiento SPA para producción.
- El build de producción (`ng build --configuration=production`) debe completarse sin errores antes de cada push a `main`.
- Deben existir al menos dos entornos de variables: `environment.ts` (desarrollo local) y `environment.prod.ts` (producción).
- Los archivos `.env`, tokens de terceros y claves de API deben estar incluidos en `.gitignore`.


---

## RNF-09 - Fluidez Visual a 60 FPS y Optimización de Renderizado Vectorial

| Atributo | Valor |
|---|---|
| ID | RNF-09 |
| Categoría | Rendimiento y Animaciones UX |
| Prioridad | Alta |

**Criterios de aceptación:**
- Las animaciones interactivas de la Pirámide Olfativa SVG, simulación de grabado láser y partículas flotantes deben renderizarse a un mínimo sostenido de 60 cuadros por segundo (FPS).
- Se debe utilizar aceleración gráfica por hardware mediante propiedades CSS optimizadas (`will-change: transform`, `transform: translate3d`) evitando recálculos de layout (*reflows*).
- El bundle adicional para gráficos interactivos no debe superar 45 KB gzipped.

---

## RNF-10 - Persistencia e Integridad de Metadatos de Personalización

| Atributo | Valor |
|---|---|
| ID | RNF-10 |
| Categoría | Integridad de Datos y Contratos de API |
| Prioridad | Alta |

**Criterios de aceptación:**
- Los campos de personalización (`engravingText`, `engravingFont`, `customGiftNote`) deben someterse a sanitización estricta contra inyección XSS tanto en el frontend como en el backend.
- En la base de datos PostgreSQL, los detalles de personalización se conservan en la columna JSONB `order_items.customization_data` garantizando compatibilidad con órdenes estándar sin personalización.
- La persistencia en `localStorage` del carrito debe serializar correctamente estos atributos sin pérdida de datos ante recargas de página.

---

## RNF-11 - Accesibilidad y Alto Contraste en Temas de Ultralujo (WCAG 2.1 AA)

| Atributo | Valor |
|---|---|
| ID | RNF-11 |
| Categoría | Accesibilidad e Inclusión |
| Prioridad | Alta |

**Criterios de aceptación:**
- Tanto el tema *Midnight Obsidian* como *Ivory Alabaster* deben garantizar un ratio de contraste mínimo de 4.5:1 para textos estándar y 3.0:1 para elementos de control gráfico según WCAG 2.1 nivel AA.
- Los componentes interactivos (Pirámide Olfativa y Radar de Layering) deben contar con atributos `aria-label`, soporte completo de navegación por teclado y alternativa tabular legible para lectores de pantalla.
- Se debe respetar la preferencia del sistema operativo del usuario `prefers-reduced-motion`, desactivando partículas flotantes y reduciendo transiciones complejas.

---

## RNF-12 - Micro-interacciones Sensoriales y Feedback Háptico en PWA

| Atributo | Valor |
|---|---|
| ID | RNF-12 |
| Categoría | Experiencia Sensorial y Móvil |
| Prioridad | Media |

**Criterios de aceptación:**
- En entornos móviles gobernados por Capacitor o navegadores compatibles con la Web Vibration API (`navigator.vibrate`), acciones clave (atomización virtual, grabado completado, agregado a bolsa) emitirán micro-pulsos hápticos sutiles (15 a 30 ms).
- Las curvas de animación CSS deben implementar funciones bezier cúbicas personalizadas (`cubic-bezier(0.25, 1, 0.5, 1)`) que emulen la inercia del cristal pesado de alta perfumería.
