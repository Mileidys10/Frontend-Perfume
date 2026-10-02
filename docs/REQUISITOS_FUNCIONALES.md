# Requisitos Funcionales — Perfume Store Frontend

**Proyecto:** Frontend-Perfume  
**Repositorio backend:** [Mileidys10/Tienda-de-Perfumes](https://github.com/Mileidys10/Tienda-de-Perfumes)  
**Versión:** 1.0  
**Fecha:** Octubre 2026  

---

## RF-01 — Autenticación de usuarios

| Atributo | Detalle |
|---|---|
| ID | RF-01 |
| Nombre | Autenticación JWT |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** El sistema permite a los usuarios iniciar sesión con email y contraseña. El backend emite un token JWT que el frontend almacena en `localStorage` bajo la clave `authToken`. El interceptor HTTP inyecta automáticamente el token en cada petición protegida mediante el encabezado `Authorization: Bearer <token>`.

**Precondiciones:** El usuario tiene una cuenta activa y verificada por correo electrónico.

**Flujo principal:**
1. El usuario ingresa email y contraseña en la página `/login`.
2. El frontend llama `POST /api/auth/login` con las credenciales.
3. El backend valida y retorna `{ token, usuario }`.
4. El frontend persiste token y datos del usuario; redirige según el rol (`CLIENTE`, `VENDEDOR`, `ADMIN`).

**Excepciones:**
- Credenciales incorrectas: HTTP 401, mensaje "Credenciales inválidas".
- Cuenta no verificada: HTTP 403, mensaje de activación pendiente.

---

## RF-02 — Registro de nuevos usuarios

| Atributo | Detalle |
|---|---|
| ID | RF-02 |
| Nombre | Registro de cuenta |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** El sistema permite crear una cuenta indicando nombre, apellido, email y contraseña. El rol puede ser `CLIENTE` o `VENDEDOR`. Tras el registro, el backend envía un email de verificación. La cuenta solo puede iniciar sesión después de confirmar el correo.

**Flujo principal:**
1. El usuario completa el formulario en `/register`.
2. El frontend llama `POST /api/auth/register`.
3. El backend crea el usuario con estado inactivo y envía email.
4. El usuario hace clic en el enlace del email; el frontend llama `GET /api/auth/verify?token=<token>`.
5. La cuenta queda activa y el usuario es redirigido al login.

---

## RF-03 — Recuperación de contraseña

| Atributo | Detalle |
|---|---|
| ID | RF-03 |
| Nombre | Olvidé mi contraseña |
| Prioridad | Media |
| Estado | Implementado (parcial — UI completa, integración backend pendiente) |

**Descripción:** El sistema permite solicitar un email de recuperación desde `/forgot-password`. El backend genera un token temporal y lo envía al correo registrado.

---

## RF-04 — Catálogo de perfumes

| Atributo | Detalle |
|---|---|
| ID | RF-04 |
| Nombre | Exploración del catálogo |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** Los usuarios no autenticados y autenticados pueden explorar el catálogo completo de perfumes con soporte de paginación, búsqueda por texto libre y filtros por marca, categoría y género.

**Endpoints consumidos:**
- `GET /api/perfumes?page=0&size=20&filtro=<query>` — Lista paginada.
- `GET /api/perfumes/public/<id>` — Detalle del perfume.
- `GET /api/brands/public` — Listado de marcas.
- `GET /api/categories/public` — Listado de categorías.

---

## RF-05 — Detalle de producto

| Atributo | Detalle |
|---|---|
| ID | RF-05 |
| Nombre | Vista de detalle de perfume |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** El usuario puede ver imagen, nombre, descripción, precio, talla en ml, marca, categoría y género del perfume. Desde esta vista puede agregar al carrito o a favoritos.

---

## RF-06 — Carrito de compras

| Atributo | Detalle |
|---|---|
| ID | RF-06 |
| Nombre | Gestión del carrito |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** El carrito persiste en `localStorage`. El cliente puede agregar, eliminar y modificar cantidades de productos. El subtotal se recalcula en tiempo real. El estado del carrito se sincroniza con `CartService` que expone observables reactivos.

**Requisito de integración:** La acción de checkout debe conectarse con `POST /api/orders/checkout` pasando los ítems del carrito y la información de pago.

---

## RF-07 — Proceso de pago (Checkout)

| Atributo | Detalle |
|---|---|
| ID | RF-07 |
| Nombre | Flujo de checkout multi-paso |
| Prioridad | Alta |
| Estado | Implementado (integración pago pendiente) |

**Descripción:** El flujo de pago se divide en pasos mediante el componente `StepperComponent`:
1. Dirección de entrega.
2. Método de pago (mock implementado en el backend).
3. Confirmación del pedido.
4. Pantalla de éxito con número de orden.

**Endpoint de producción:** `POST /api/orders/checkout` (ver `CheckoutRequestDTO` en backend).

---

## RF-08 — Favoritos

| Atributo | Detalle |
|---|---|
| ID | RF-08 |
| Nombre | Lista de deseos / Favoritos |
| Prioridad | Media |
| Estado | Implementado (persistencia local) |

**Descripción:** El cliente puede marcar perfumes como favoritos. El estado se almacena en `localStorage` mediante `FavoritesService`. Pendiente sincronizar con el backend:
- `POST /api/favorites` — Agregar.
- `DELETE /api/favorites/<productId>` — Eliminar.
- `GET /api/favorites` — Recuperar lista del servidor.

---

## RF-09 — Perfil del cliente

| Atributo | Detalle |
|---|---|
| ID | RF-09 |
| Nombre | Gestión del perfil de usuario |
| Prioridad | Media |
| Estado | Implementado |

**Descripción:** El cliente puede ver y editar sus datos personales (nombre, apellido, email, teléfono, dirección) y consultar el historial de pedidos con sus estados.

**Endpoints consumidos:**
- `GET /api/users/<id>` — Obtener perfil.
- `PUT /api/users/<id>` — Actualizar datos.
- `GET /api/users/<id>/orders` — Historial de pedidos.

---

## RF-10 — Panel del vendedor

| Atributo | Detalle |
|---|---|
| ID | RF-10 |
| Nombre | Dashboard de gestión para vendedores |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** El vendedor accede a un panel con pestañas para gestionar perfumes, marcas y categorías. Puede crear, editar, eliminar y subir imágenes a Supabase Storage. Los perfumes pasan por un proceso de moderación automática antes de publicarse.

**Secciones del dashboard:**
- Resumen: métricas de perfumes activos, pendientes y rechazados.
- Perfumes: CRUD completo con upload de imagen y filtros de estado de moderación.
- Marcas: CRUD con gestión de imagen de marca.
- Categorías: CRUD con gestión de imagen de categoría.
- Pedidos: consulta de órdenes relacionadas con sus productos.

---

## RF-11 — Moderación de contenido (Admin)

| Atributo | Detalle |
|---|---|
| ID | RF-11 |
| Nombre | Panel de administración y moderación |
| Prioridad | Alta |
| Estado | Implementado (parcial) |

**Descripción:** El administrador puede aprobar, rechazar o poner en revisión los perfumes publicados por vendedores. También puede gestionar notificaciones y visualizar el estado global de usuarios.

---

## RF-12 — Notificaciones

| Atributo | Detalle |
|---|---|
| ID | RF-12 |
| Nombre | Centro de notificaciones |
| Prioridad | Baja |
| Estado | Implementado |

**Descripción:** Los usuarios reciben notificaciones sobre cambios de estado en pedidos, resultados de moderación y alertas de cuenta. El `NotificationService` consume `GET /api/notifications` y permite marcar como leídas.

---

## RF-13 — Cierre de sesión

| Atributo | Detalle |
|---|---|
| ID | RF-13 |
| Nombre | Logout seguro |
| Prioridad | Alta |
| Estado | Implementado |

**Descripción:** Al cerrar sesión, el sistema elimina el token JWT y los datos del usuario de `localStorage`. Se llama `POST /api/auth/logout` para invalidar el refresh token en el servidor. El usuario es redirigido a `/login`.

---

## RF-14 — Redirección basada en roles

| Atributo | Detalle |
|---|---|
| ID | RF-14 |
| Nombre | Guards de navegación por rol |
| Prioridad | Alta |
| Estado | Pendiente de implementación formal |

**Descripción:** Deben implementarse Angular Route Guards para proteger las rutas según el rol del usuario autenticado:
- `/seller/*` — Solo `VENDEDOR`.
- `/admin/*` — Solo `ADMIN`.
- `/cart`, `/checkout` — Solo usuarios autenticados.
- `GET /home` — Público.


---

## RF-15 - Pirámide Olfativa Interactiva SVG

| Atributo | Detalle |
|---|---|
| ID | RF-15 |
| Nombre | Pirámide Olfativa Interactiva Vectorial |
| Prioridad | Alta |
| Estado | Implementado y Verificado |

**Descripción:** En la vista de detalle de perfume (`product-detail`), se despliega una pirámide olfativa interactiva desarrollada en SVG vectorial que desglosa visualmente las tres fases de evaporación de la fragancia:
- **Notas de Salida (Top Notes, 0 a 15 min):** Cítricos chispeantes, pimienta rosa, bergamota de Calabria.
- **Notas de Corazón (Heart Notes, 2 a 4 hrs):** Rosa de mayo, jazmín Sambac, lirio de los valles, iris florentino.
- **Notas de Fondo (Base Notes, 6 a 12 hrs):** Oud real, sándalo de Mysore, ámbar gris, haba tonka, vainilla Bourbon.

Al interactuar (hover o tap) con cada estrato de la pirámide, se produce un halo dorado (*golden aura glow*), se revelan las moléculas y acordes botánicos con su duración de fijación estimada, y se activa una animación sutil de partículas olfativas flotantes.

---

## RF-16 - Sommelier Olfativo IA (Fragrance Finder & Sensory Quiz)

| Atributo | Detalle |
|---|---|
| ID | RF-16 |
| Nombre | Sommelier Olfativo IA y Quiz Sensorial |
| Prioridad | Alta |
| Estado | Implementado y Verificado |

**Descripción:** Módulo consultivo interactivo de 4 pasos guiado por un sommelier digital que acompaña al usuario para identificar su fragancia firma:
1. **Ocasión & Atmósfera:** Gala nocturna, alta ejecutiva, romance íntimo, escapada de verano.
2. **Estela & Presencia:** Sutil íntimo (*Skin Scent*), estela moderada elegante, o proyección opulenta.
3. **Familia Olfativa Predilecta:** Oriental amaderada, floral gourmand, chipre aromático, cítrica acuática.
4. **Estado de Ánimo & Temporada:** Misterioso, magnético, clásico atemporal, vanguardista.

El algoritmo calcula un índice de afinidad porcentual ("98% Match con tu esencia") y genera una tarjeta de revelación con efecto dorado metalizado (*Gold Shimmer*), acompañada de una reseña sensorial personalizada y botones para compra directa o solicitud de muestra de 2ml.

---

## RF-17 - Atelier de Grabado Láser Personalizado en Frasco

| Atributo | Detalle |
|---|---|
| ID | RF-17 |
| Nombre | Grabado Láser Personalizado en Frasco |
| Prioridad | Alta |
| Estado | Implementado y Verificado |

**Descripción:** Estudio de personalización en tiempo real en la ficha de producto que permite al cliente inmortalizar sus iniciales, nombre o una fecha conmemorativa (hasta 15 caracteres) sobre el cristal del frasco de perfume.
- **Tipografías de Lujo:** Selección entre *Serif Imperial*, *Script Royal* y *Sans Minimalist*.
- **Previsualización en Cristal:** Renderizado interactivo sobre la silueta del frasco con textura de pan de oro brillante reflectante.
- **Propagación al Pedido:** El texto y fuente se asocian al ítem del carrito (`CartItem.engravingText`, `CartItem.engravingFont`) y viajan en el payload del pedido hacia el backend para la preparación artesanal en taller con sello de cera.

---

## RF-18 - Fragrance Layering Studio (Laboratorio de Combinación de Acordes)

| Atributo | Detalle |
|---|---|
| ID | RF-18 |
| Nombre | Simulador de Mezcla y Layering de Fragancias |
| Prioridad | Media |
| Estado | Implementado y Verificado |

**Descripción:** Simulador de arte olfativo que permite a los usuarios seleccionar dos fragancias del catálogo y experimentar con su combinación (*layering*).
- **Radar de Compatibilidad:** Analiza la complementariedad de notas entre ambos perfumes (ejemplo: fondo de oud amaderado denso combinado con salida floral cítrica chispeante).
- **Receta de Aplicación:** Sugiere la proporción exacta de atomizaciones y puntos de pulso recomendados (ej. 2 pulsaciones del perfume base en muñecas y cuello + 3 pulsaciones del perfume ligero en el aura superior).
- **Bundle con Descuento:** Opción de añadir ambas fragancias al carrito con un 15% de descuento especial por compra en dúo de acordes.

---

## RF-19 - Timeline Boutique de Rastreo y Sello de Autenticidad

| Atributo | Detalle |
|---|---|
| ID | RF-19 |
| Nombre | Rastreo de Guante Blanco y Sello de Lacre |
| Prioridad | Alta |
| Estado | Implementado y Verificado |

**Descripción:** En el detalle de cada orden, el cliente accede a una línea de tiempo boutique con estética de joyería de alta gama que ilustra el proceso artesanal de preparación en 5 etapas:
1. **Sello de Lacre & Selección:** Extracción desde cámara climatizada y aplicación de sello de cera roja lacrada.
2. **Atelier & Envoltura de Seda:** Grabado láser de precisión en cristal y empaque en papel de seda ébano con lazo de oro.
3. **Custodia & Despacho Blindado:** Asignación de lote cifrado y entrega al servicio de transporte boutique express.
4. **Tránsito Satelital en Tiempo Real:** Visualización de ruta y estimación precisa de llegada.
5. **Entrega de Guante Blanco en Mano:** Entrega personalizada con tarjeta caligráfica y firma de recepción.
Incluye visualización del *Batch Code* del perfumista verificado y descarga del Certificado de Autenticidad en PDF.

---

## RF-20 - Selector de Experiencia Estética Dual (Midnight Obsidian / Ivory Alabaster)

| Atributo | Detalle |
|---|---|
| ID | RF-20 |
| Nombre | Conmutador de Temas de Ultralujo |
| Prioridad | Media |
| Estado | Implementado y Verificado |

**Descripción:** Selector estético de alta costura accesible desde el encabezado que permite alternar la interfaz entre dos identidades visuales:
- **Midnight Obsidian:** Fondo ébano profundo (`#0A0A0A`), acentos en oro cepillado de 24K (`#D4AF37`), cristales ahumados y micro-partículas doradas.
- **Ivory Alabaster:** Fondo blanco mármol alabastro (`#FDFBF7`), acentos en oro rosa champán (`#B76E79` / `#C5A059`) y tipografía clásica editorial.
El tema seleccionado se almacena en `localStorage` y respeta la configuración nativa de accesibilidad y modo oscuro del dispositivo del usuario.
