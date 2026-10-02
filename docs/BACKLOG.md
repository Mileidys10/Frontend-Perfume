# Backlog — Perfume Store Frontend

**Proyecto:** Frontend-Perfume  
**Metodología:** Scrum  
**Sprints:** 4 sprints de 2 semanas  

---

## Leyenda de estados

| Estado | Descripción |
|---|---|
| Completado | Funcionalidad implementada y funcionando |
| En progreso | Parcialmente implementado |
| Pendiente | No iniciado, listo para desarrollo |
| Bloqueado | Depende de cambios en el backend |

## Leyenda de puntos de esfuerzo (Story Points)

| Puntos | Esfuerzo |
|---|---|
| 1 | Cambio trivial (menos de 1 hora) |
| 2 | Tarea pequeña (medio día) |
| 3 | Tarea mediana (1 día) |
| 5 | Tarea compleja (2-3 días) |
| 8 | Épica o componente de alto riesgo (4-5 días) |

---

## EJE 1: AUTENTICACION Y GESTION DE SESION

### US-01 — Inicio de sesión con JWT

**Como** usuario registrado, **quiero** ingresar con mi email y contraseña para acceder a mi cuenta personalizada.

| Campo | Valor |
|---|---|
| ID | US-01 |
| Puntos | 3 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-01 |

**Criterios de aceptación:**
- El formulario valida email con formato correcto y contraseña de mínimo 6 caracteres antes de enviar.
- En caso de error 401, muestra el mensaje "Credenciales inválidas" debajo del formulario.
- Tras login exitoso, redirige a `/home` para CLIENTE, `/seller` para VENDEDOR y `/admin` para ADMIN.
- El token JWT se guarda en `localStorage['authToken']` y los datos del usuario en `localStorage['userData']`.

---

### US-02 — Registro de nueva cuenta

**Como** visitante, **quiero** crear una cuenta indicando nombre, apellido, email y contraseña para comprar en la tienda.

| Campo | Valor |
|---|---|
| ID | US-02 |
| Puntos | 3 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-02 |

**Criterios de aceptación:**
- El formulario valida todos los campos antes de enviar (no debe haber campos vacíos).
- Tras el registro exitoso, muestra un aviso de verificación de correo electrónico.
- Si el email ya existe, muestra "El email ya está registrado" (HTTP 409).
- El rol seleccionado en el registro es enviado como `CLIENTE` o `VENDEDOR` en mayúsculas.

---

### US-03 — Verificación de cuenta por email

**Como** usuario recién registrado, **quiero** verificar mi cuenta haciendo clic en el enlace enviado a mi correo.

| Campo | Valor |
|---|---|
| ID | US-03 |
| Puntos | 2 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-02 |

**Criterios de aceptación:**
- La URL de verificación `/verify?token=<token>` llama a `GET /api/auth/verify`.
- En caso de token expirado, muestra opción de reenviar el correo de verificación.
- Tras verificación exitosa, redirige al login con mensaje de confirmación.

---

### US-04 — Cierre de sesión seguro

**Como** usuario autenticado, **quiero** cerrar sesión para que mis datos personales queden protegidos.

| Campo | Valor |
|---|---|
| ID | US-04 |
| Puntos | 1 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-13 |

**Criterios de aceptación:**
- Al hacer logout se eliminan `authToken` y `userData` de `localStorage`.
- Se llama `POST /api/auth/logout` para invalidar el refresh token.
- El usuario es redirigido a `/login`.

---

### US-05 — Guards de rutas por rol

**Como** desarrollador, **quiero** que las rutas protegidas redirijan a login si el token es inválido o el rol no tiene permiso.

| Campo | Valor |
|---|---|
| ID | US-05 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Pendiente |
| RF relacionado | RF-14 |

**Criterios de aceptación:**
- Implementar `AuthGuard` que verifica la presencia de `authToken` en `localStorage`.
- Implementar `RoleGuard` que compara el rol del usuario con el requerido en la ruta.
- Las rutas `/seller/*` deben ser accesibles únicamente con rol `VENDEDOR`.
- Las rutas `/admin/*` deben ser accesibles únicamente con rol `ADMIN`.
- Rutas como `/cart` y `/checkout` requieren cualquier usuario autenticado.
- Si el token está expirado, el guard redirige a `/login` y limpia `localStorage`.

---

## EJE 2: CATALOGO Y BUSQUEDA

### US-06 — Exploración del catálogo de perfumes

**Como** visitante o cliente, **quiero** ver el listado de perfumes con imagen, nombre y precio para elegir qué comprar.

| Campo | Valor |
|---|---|
| ID | US-06 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-04 |

**Criterios de aceptación:**
- El catálogo muestra cards con imagen, nombre, marca y precio.
- La carga inicial trae 20 perfumes (paginación del servidor).
- Se muestra un skeleton mientras cargan los datos.
- Si el servidor retorna error, se muestra mensaje de error con botón de reintento.

---

### US-07 — Búsqueda por texto

**Como** cliente, **quiero** buscar perfumes por nombre o descripción para encontrar lo que busco rápidamente.

| Campo | Valor |
|---|---|
| ID | US-07 |
| Puntos | 3 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-04 |

**Criterios de aceptación:**
- El campo de búsqueda llama a `GET /api/perfumes?filtro=<query>` con debounce de 300ms.
- Los resultados se actualizan sin recarga completa de la página.
- Si no hay resultados, se muestra "Sin resultados para tu búsqueda".

---

### US-08 — Filtrado por marca y categoría

**Como** cliente, **quiero** filtrar el catálogo por marca y categoría para encontrar perfumes de mi preferencia.

| Campo | Valor |
|---|---|
| ID | US-08 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Pendiente |
| RF relacionado | RF-04 |

**Criterios de aceptación:**
- Los filtros cargan las marcas desde `GET /api/brands/public` y categorías desde `GET /api/categories/public`.
- Al aplicar un filtro, la búsqueda se combina con el término de texto libre si existe.
- Los filtros activos se muestran visualmente como chips eliminables.

---

### US-09 — Vista de detalle del perfume

**Como** cliente, **quiero** ver toda la información de un perfume antes de comprarlo.

| Campo | Valor |
|---|---|
| ID | US-09 |
| Puntos | 2 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-05 |

**Criterios de aceptación:**
- Muestra imagen en alta resolución, nombre, descripción, precio, talla en ml, marca, categoría y género.
- Botón "Agregar al carrito" visible y funcional.
- Botón "Agregar a favoritos" con estado visual (corazón relleno si ya está en favoritos).

---

## EJE 3: CARRITO Y CHECKOUT

### US-10 — Gestión del carrito

**Como** cliente, **quiero** agregar, modificar y eliminar productos del carrito antes de pagar.

| Campo | Valor |
|---|---|
| ID | US-10 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-06 |

**Criterios de aceptación:**
- Los ítems del carrito persisten en `localStorage` entre sesiones.
- Al modificar la cantidad, el subtotal se actualiza en tiempo real.
- Al eliminar un ítem, desaparece del carrito con animación.
- El contador de ítems en el icono del carrito se actualiza reactivamente.
- El carrito muestra el total general con suma de todos los ítems.

---

### US-11 — Proceso de checkout multi-paso

**Como** cliente, **quiero** completar mi compra en un flujo guiado de pasos para no perder información.

| Campo | Valor |
|---|---|
| ID | US-11 |
| Puntos | 8 |
| Prioridad | Alta |
| Estado | En progreso |
| RF relacionado | RF-07 |

**Criterios de aceptación:**
- Paso 1: Formulario de dirección de entrega con validación.
- Paso 2: Selección de método de pago (tarjeta simulada).
- Paso 3: Resumen del pedido con todos los ítems y totales.
- Paso 4: Confirmación exitosa con número de orden.
- La navegación entre pasos no pierde los datos ingresados.
- Al completar el pago, el carrito se vacía automáticamente.
- La solicitud se envía a `POST /api/orders/checkout` con el body `CheckoutRequestDTO`.

---

## EJE 4: FAVORITOS Y PERFIL DEL CLIENTE

### US-12 — Lista de favoritos

**Como** cliente, **quiero** guardar los perfumes que me gustan para revisarlos o comprarlos después.

| Campo | Valor |
|---|---|
| ID | US-12 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | En progreso |
| RF relacionado | RF-08 |

**Criterios de aceptación:**
- El ícono de corazón en cada producto alterna el estado favorito.
- El estado actual se muestra correctamente al recargar la página.
- Pendiente: sincronizar con `POST /api/favorites` y `DELETE /api/favorites/<id>`.

---

### US-13 — Perfil y datos personales

**Como** cliente, **quiero** ver y editar mis datos para que mis pedidos lleguen a la dirección correcta.

| Campo | Valor |
|---|---|
| ID | US-13 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Completado |
| RF relacionado | RF-09 |

**Criterios de aceptación:**
- Se muestra nombre, apellido, email y teléfono con opción de editar.
- El formulario de edición envía `PUT /api/users/<id>`.
- Los cambios se reflejan inmediatamente en la vista sin recarga.

---

### US-14 — Historial de pedidos

**Como** cliente, **quiero** ver mis pedidos anteriores y su estado para hacer seguimiento de mis compras.

| Campo | Valor |
|---|---|
| ID | US-14 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Completado |
| RF relacionado | RF-09 |

**Criterios de aceptación:**
- Lista de pedidos ordenada por fecha descendente.
- Cada pedido muestra número de orden, fecha, total y estado (`PENDIENTE`, `PROCESANDO`, `ENVIADO`, `ENTREGADO`).
- Al expandir un pedido se muestran los ítems individuales con nombre y precio.

---

## EJE 5: PANEL DEL VENDEDOR

### US-15 — CRUD de perfumes del vendedor

**Como** vendedor, **quiero** crear, editar y eliminar mis perfumes para gestionar mi catálogo.

| Campo | Valor |
|---|---|
| ID | US-15 |
| Puntos | 8 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-10 |

**Criterios de aceptación:**
- Formulario de creación con campos: nombre, descripción, precio, stock, talla en ml, género, marca y categoría.
- Soporte de upload de imagen al backend (Supabase Storage).
- Al crear un perfume, su estado inicial es `PENDING_REVIEW` hasta que el admin lo apruebe.
- El listado del dashboard muestra el estado de moderación con colores diferenciados.

---

### US-16 — Gestión de marcas y categorías

**Como** vendedor, **quiero** gestionar las marcas y categorías asociadas a mis perfumes.

| Campo | Valor |
|---|---|
| ID | US-16 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Completado |
| RF relacionado | RF-10 |

**Criterios de aceptación:**
- CRUD completo de marcas con nombre, descripción, país de origen e imagen.
- CRUD completo de categorías con nombre, descripción e imagen.
- Los cambios de imagen se suben directamente desde el cliente al backend.

---

### US-17 — Consulta de pedidos del vendedor

**Como** vendedor, **quiero** ver los pedidos que contienen mis productos para gestionarlos.

| Campo | Valor |
|---|---|
| ID | US-17 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Pendiente |
| RF relacionado | RF-10 |

**Criterios de aceptación:**
- Listado de pedidos filtrado por los perfumes del vendedor logueado.
- Cada pedido muestra estado, fecha, cliente y lista de ítems del vendedor.
- Consume `GET /api/seller/orders` (endpoint del backend `SellerOrderController`).

---

## EJE 6: ADMINISTRACION

### US-18 — Moderación de perfumes

**Como** administrador, **quiero** aprobar o rechazar los perfumes publicados por los vendedores.

| Campo | Valor |
|---|---|
| ID | US-18 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | En progreso |
| RF relacionado | RF-11 |

**Criterios de aceptación:**
- El panel de admin muestra todos los perfumes en estado `PENDING_REVIEW`.
- Los botones de Aprobar y Rechazar envían `PUT /api/admin/products/<id>/moderation`.
- Al aprobar, el perfume pasa a estado `APPROVED` y aparece en el catálogo público.
- Al rechazar, el vendedor recibe una notificación con el motivo.

---

## EJE 7: CALIDAD TECNICA

### US-19 — Implementación de Route Guards

**Como** desarrollador, **quiero** que las rutas protegidas tengan guards formales para evitar accesos no autorizados.

| Campo | Valor |
|---|---|
| ID | US-19 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Pendiente |
| RF relacionado | RF-14, RNF-02 |

**Criterios de aceptación:**
- Crear `AuthGuard` implementando `CanActivate`.
- Crear `RoleGuard` con acceso por arreglo de roles permitidos.
- Aplicar los guards en `app-routing.module.ts`.
- Tests unitarios para cada guard con Jasmine.

---

### US-20 — Migración de favoritos a backend

**Como** desarrollador, **quiero** que los favoritos se sincronicen con el servidor para persistir entre dispositivos.

| Campo | Valor |
|---|---|
| ID | US-20 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Pendiente |
| RF relacionado | RF-08 |

**Criterios de aceptación:**
- Al iniciar sesión, cargar favoritos desde `GET /api/favorites`.
- Al agregar favorito, llamar `POST /api/favorites`.
- Al eliminar, llamar `DELETE /api/favorites/<productId>`.
- Mantener `localStorage` como cache local para uso offline.

---

### US-21 — Skeleton screens y estados de carga

**Como** usuario, **quiero** ver indicadores de carga mientras la aplicación obtiene datos del servidor.

| Campo | Valor |
|---|---|
| ID | US-21 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Pendiente |
| RNF relacionado | RNF-03 |

**Criterios de aceptación:**
- El catálogo muestra 8 skeleton cards mientras carga la primera página.
- El detalle del producto muestra skeleton de imagen y texto mientras carga.
- El perfil del usuario muestra skeleton de datos mientras carga.

---

### US-22 — Pruebas unitarias de servicios

**Como** desarrollador, **quiero** cobertura de pruebas unitarias en los servicios principales para detectar regresiones.

| Campo | Valor |
|---|---|
| ID | US-22 |
| Puntos | 8 |
| Prioridad | Media |
| Estado | Pendiente |
| RNF relacionado | RNF-04 |

**Criterios de aceptación:**
- Tests de `AuthService`: login exitoso, login fallido, logout, validación de token.
- Tests de `CartService`: agregar, eliminar, actualizar cantidad, calcular total.
- Tests de `ProductService`: obtener productos, obtener por ID, búsqueda.
- Cobertura mínima del 70% de ramas en los servicios testeados.

---



---

## EJE 8: EXPERIENCIA SENSORIAL Y ALTA PERFUMERÍA

---

### US-23 - Explorador Interactivo de Pirámide Olfativa

**Como** cliente sibarita, **quiero** explorar interactivamente la pirámide de notas de salida, corazón y fondo en la ficha del perfume, **para** entender la evolución aromática antes de comprar.

| Campo | Valor |
|---|---|
| ID | US-23 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Planificado (Sprint 5) |
| RF / RNF relacionado | RF-15, RNF-09, RNF-11 |

**Criterios de aceptación:**
- En `/product-detail/:id`, se renderiza una pirámide facetada dividida en Salida, Corazón y Fondo.
- Al interactuar con cada nivel, se resalta con brillo dorado y se muestran los acordes botánicos con tiempo estimado de fijación.
- Soporte táctil optimizado para dispositivos móviles con gestos táctiles.

---

### US-24 - Quiz Sommelier Olfativo IA de Recomendación

**Como** comprador indeciso, **quiero** completar un breve quiz sensorial de 4 preguntas guiado por un sommelier inteligente, **para** descubrir mi fragancia firma personalizada con su porcentaje de afinidad.

| Campo | Valor |
|---|---|
| ID | US-24 |
| Puntos | 8 |
| Prioridad | Alta |
| Estado | Planificado (Sprint 5) |
| RF / RNF relacionado | RF-16, RNF-09 |

**Criterios de aceptación:**
- Flujo interactivo en 4 pasos (Ocasión, Estela, Familia aromática, Temporada/Aura).
- Pantalla de revelación tipo "Gold Card" con porcentaje de afinidad ("98% Match con tu esencia"), descripción sensorial personalizada y botón de compra directa.
- Opción de reiniciar el quiz o compartir la recomendación.

---

### US-25 - Laboratorio de Fragrance Layering (Combinación de Acordes)

**Como** amante de la perfumería de autor, **quiero** combinar dos fragancias en un lienzo interactivo y ver su radar de compatibilidad aromática, **para** crear una estela olfativa irrepetible.

| Campo | Valor |
|---|---|
| ID | US-25 |
| Puntos | 5 |
| Prioridad | Media |
| Estado | Planificado (Sprint 6) |
| RF / RNF relacionado | RF-18, RNF-09 |

**Criterios de aceptación:**
- Selector visual de 2 productos del catálogo con gráfico de radar de acordes aromáticos.
- Algoritmo de sinergia olfativa que calcula balance y emite recomendaciones de atomización.
- Botón "Adquirir Dúo con Descuento de Layering" que agrega ambos frascos al carrito con un 15% bonificado.

---

### US-26 - Selector de Tema Dual Midnight Obsidian vs Ivory Alabaster

**Como** usuario exigente, **quiero** alternar entre una atmósfera oscura misteriosa (Midnight Obsidian) y una luminosa opulenta (Ivory Alabaster), **para** adaptar la tienda a mi preferencia estética.

| Campo | Valor |
|---|---|
| ID | US-26 |
| Puntos | 3 |
| Prioridad | Media |
| Estado | Planificado (Sprint 5) |
| RF / RNF relacionado | RF-20, RNF-11 |

**Criterios de aceptación:**
- Conmutador elegante en el navbar con iconos dorados de sol y luna de alta estética.
- Transición fluida de paleta mediante variables CSS globales (`--luxury-bg`, `--luxury-gold`).
- Persistencia automática de la preferencia en `localStorage`.

---

## EJE 9: PERSONALIZACIÓN EXCLUSIVA Y POST-VENTA DE GUANTE BLANCO

---

### US-27 - Atelier de Grabado Láser Personalizado en Frasco

**Como** cliente que busca un obsequio inolvidable, **quiero** previsualizar en tiempo real el grabado de un nombre o fecha sobre el cristal del frasco, **para** encargar una pieza irrepetible.

| Campo | Valor |
|---|---|
| ID | US-27 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Planificado (Sprint 6) |
| RF / RNF relacionado | RF-17, RNF-09, RNF-10 |

**Criterios de aceptación:**
- Campo de texto con límite de 15 caracteres y selector de 3 fuentes exclusivas (Serif Imperial, Script Royal, Sans Minimalist).
- Previsualización en tiempo real sobre la silueta del frasco con textura metálica dorada reflectante.
- Inclusión del servicio de personalización en el subtotal del ítem.

---

### US-28 - Propagación de Personalización a Carrito, Checkout y Pedidos

**Como** vendedor y maestro artesano, **quiero** recibir el texto y tipografía de grabado en el detalle de la orden de compra, **para** que el taller aplique el grabado con exactitud.

| Campo | Valor |
|---|---|
| ID | US-28 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Planificado (Sprint 6) |
| RF / RNF relacionado | RF-17, RNF-10 |

**Criterios de aceptación:**
- `CartItem` almacena `engravingText` y `engravingFont`.
- El endpoint `POST /api/orders` recibe el payload con metadatos de personalización.
- La vista de pedidos del vendedor (`/seller/orders`) despliega la insignia "Frasco Personalizado" con los datos exactos de grabado.

---

### US-29 - Timeline Boutique de Seguimiento con Sello de Autenticidad

**Como** cliente de alta gama, **quiero** monitorear el proceso artesanal y de despacho de mi pedido en una línea de tiempo boutique, **para** disfrutar de una experiencia de compra transparente y exclusiva.

| Campo | Valor |
|---|---|
| ID | US-29 |
| Puntos | 5 |
| Prioridad | Alta |
| Estado | Planificado (Sprint 6) |
| RF / RNF relacionado | RF-19, RNF-09, RNF-12 |

**Criterios de aceptación:**
- Vista de orden con 5 hitos con animaciones de lujo e insignias doradas.
- Indicador de *Batch Code* del perfumista verificado con sello de cera lacrada animado.
- Botón para descargar o imprimir el Certificado de Autenticidad en PDF.

---

### US-30 - Configurador de Cofre Discovery Box (Set de 5 Muestras)

**Como** nuevo explorador de la perfumería de lujo, **quiero** armar un cofre personalizado con 5 muestras de 2ml a mi elección, **para** probar los acordes en mi piel antes de adquirir el frasco de 100ml.

| Campo | Valor |
|---|---|
| ID | US-30 |
| Puntos | 6 |
| Prioridad | Media |
| Estado | Planificado (Sprint 5) |
| RF / RNF relacionado | RF-16, RNF-10 |

**Criterios de aceptación:**
- Selector interactivo tipo carrusel para elegir exactamente 5 muestras de 2ml del catálogo.
- Estuche virtual 3D que muestra los viales seleccionados con sus etiquetas.
- Generación de un cupón de reintegro de $30 USD válido por 30 días para la compra del frasco de 100ml.

---

## Resumen del backlog actualizado (V1 + V2 Haute Parfumerie)

| Eje | Historias | Puntos totales | Estado |
|---|---|---|---|
| Autenticación y sesión | US-01 a US-05 | 14 | Completado |
| Catálogo y búsqueda | US-06 a US-09 | 13 | Completado |
| Carrito y checkout | US-10 a US-11 | 13 | Completado |
| Favoritos y perfil | US-12 a US-14 | 9 | Completado |
| Panel del vendedor | US-15 a US-17 | 16 | Completado |
| Administración | US-18 | 5 | Completado |
| Calidad técnica V1 | US-19 a US-22 | 19 | Completado |
| Experiencia Sensorial y Sommelier IA | US-23 a US-26 | 21 | Planificado (Sprint 5) |
| Personalización Exclusiva y Post-Venta | US-27 a US-30 | 21 | Planificado (Sprint 6) |
| **TOTAL GENERAL** | **30 historias** | **131 puntos** | **89 pts listos / 42 pts evolución V2** |
