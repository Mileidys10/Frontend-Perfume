# Arquitectura del Sistema - E-Commerce Luxury Perfumes

> **Proyecto:** Frontend-Perfume & Tienda-de-Perfumes  
> **Estándar:** Google Cloud OKF v0.2 Knowledge Bundle  
> **Patrón Arquitectónico:** SPA Reactiva + API REST Hexagonal / Capas + Contenerización Multi-Stage

---

## 1. Visión General del Sistema (C4 Nivel 1: Contexto)

La plataforma Luxury Perfumes es un ecosistema de comercio electrónico multi-rol enfocado en perfumería fina y fragancias exclusivas.

```mermaid
graph TD
    Client[Cliente / Comprador] -->|HTTPS / UI Web & Móvil| Frontend[Frontend Perfume Store<br/>Angular 20 + Ionic 8]
    Seller[Vendedor / Marca] -->|HTTPS / Dashboard & Órdenes| Frontend
    Admin[Administrador] -->|HTTPS / Moderación & Auditoría| Frontend

    Frontend -->|REST API / JWT Auth| Backend[Backend Empresarial<br/>Spring Boot 3.5 / Java 21]
    
    Backend -->|JDBC / Transacciones| DB[(PostgreSQL 17 Relacional)]
    Backend -->|SMTP / TLS| Mailer[Servicio de Correo<br/>Thymeleaf + SMTP]
    Backend -->|Almacenamiento CDN| Supabase[Supabase Storage / CDN de Imágenes]
```

---

## 2. Diagrama de Contenedores y Redes (C4 Nivel 2)

El despliegue local y de producción se orquesta mediante contenedores Docker conectados a través de una red puente aislada (`perfumes-net`).

```mermaid
flowchart LR
    subgraph Browser ["Navegador Cliente"]
        UI["SPA Angular 20 / Ionic 8<br/>Runtime TypeScript 5.8"]
    end

    subgraph DockerHost ["Docker Compose Host"]
        subgraph FrontendContainer ["Contenedor: perfume_frontend (Port 80)"]
            Nginx["Nginx Alpine<br/>Gzip + Security Headers + SPA Fallback"]
            StaticFiles["Archivos Estáticos (/app/www)"]
            Nginx --> StaticFiles
        end

        subgraph BackendContainer ["Contenedor: perfumes_backend (Port 8080)"]
            SpringBoot["Spring Boot 3.5 (Java 21 JRE Jammy)<br/>Spring Security 6 + JWT"]
            OpenAPI["SpringDoc OpenAPI / Swagger UI"]
            Services["PerfumeService, OrderService, BrandService"]
        end

        subgraph DBContainer ["Contenedor: perfumes_db (Port 5432)"]
            Postgres["PostgreSQL 17 Alpine<br/>Volumen: postgres_data"]
        end
    end

    UI -->|HTTP Port 80| Nginx
    UI -->|API Requests Port 8080 / Proxy| SpringBoot
    SpringBoot -->|Port 5432| Postgres
```

---

## 3. Flujo de Autenticación y Route Guards

La seguridad está gobernada por JSON Web Tokens (JWT) con roles de usuario (`CLIENTE`, `VENDEDOR`, `ADMIN`).

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Guard as AuthGuard / RoleGuard
    participant AuthService as AuthService (Angular)
    participant Backend as AuthController (Spring Boot)
    participant LocalStorage as LocalStorage ('authToken')

    Usuario->>Guard: Intenta navegar a ruta protegida (/cart, /seller, /admin)
    Guard->>AuthService: isAuthenticated() / getCurrentUser()
    alt Token ausente o expirado
        AuthService-->>Guard: false
        Guard-->>Usuario: Redirección inmediata a /login
    else Token válido
        AuthService-->>Guard: true + Rol verificado
        Guard-->>Usuario: Acceso concedido al módulo
    end

    opt Login
        Usuario->>AuthService: login(email, password)
        AuthService->>Backend: POST /api/auth/login
        Backend-->>AuthService: { token, user: { id, email, role } }
        AuthService->>LocalStorage: Guardar 'authToken' y 'currentUser'
        AuthService-->>Usuario: Redirección según rol (Home / Seller / Admin)
    end
```

---

## 4. Flujo de Compra y Ciclo de Vida del Pedido

```mermaid
stateDiagram-v2
    [*] --> Carrito: Agregar productos (CartService)
    Carrito --> Checkout: Iniciar proceso de compra
    Checkout --> PENDING: POST /api/orders/checkout
    PENDING --> PROCESSING: Vendedor acepta y prepara pedido
    PROCESSING --> SHIPPED: Vendedor genera despacho
    SHIPPED --> DELIVERED: Confirmación de entrega
    PENDING --> CANCELLED: Cliente o Vendedor cancela
    DELIVERED --> [*]
    CANCELLED --> [*]
```

---

## 5. Matriz de Componentes del Frontend

| Módulo / Página | Ruta | Guards | Responsabilidad |
|---|---|---|---|
| `HomePage` | `/home` | `AuthGuard` | Catálogo de perfumes con skeleton screens, filtros por nota y precio |
| `ProductDetailPage` | `/product-detail/:id` | `AuthGuard` | Ficha técnica, selector de volumen (ml), favoritos y añadir al carrito |
| `CartPage` | `/cart` | `AuthGuard` | Resumen de productos, cálculo reactivo de subtotales y cupón |
| `CheckoutPage` | `/checkout` | `AuthGuard` | Selección de dirección, pasarela simulada y emisión de orden |
| `SellerPage` | `/seller` | `AuthGuard`, `RoleGuard ('VENDEDOR')` | Dashboard de vendedor: gestión de perfumes, marcas, categorías y **pedidos** |
| `AdminPage` | `/admin` | `AuthGuard`, `RoleGuard ('ADMIN')` | Métricas generales, gestión de usuarios, tiendas y **moderación de fragancias** |
| `NotFoundPage` | `**` | Ninguno | Pantalla 404 personalizada con paleta Luxury Gold |

---

## 6. Principios de Diseño y Calidad
1. **Paleta Luxury Gold**: Negro Obsidiana (`#121212`), Oro Imperial (`#D4AF37`), Oro Oscuro (`#B8860B`) y Blanco Nieve (`#FFFFFF`).
2. **Skeleton Screens**: Feedback visual instantáneo durante operaciones asíncronas para mejorar el First Contentful Paint (FCP).
3. **Resiliencia ante Fallos**: Interceptor global de errores (`GlobalErrorInterceptor`) para captura controlada de errores 401, 403 y 500.
4. **Contenerización Reproducible**: Multi-stage builds con cero secretos en imagen y configuraciones auditadas.
