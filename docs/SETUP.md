# Guía de Instalación y Despliegue - Luxury Perfumes Store

> Instrucciones detalladas para clonar, configurar, ejecutar y desplegar la solución completa (Frontend + Backend + Base de Datos).

---

## 1. Requisitos Previos

| Herramienta | Versión Recomendada | Propósito |
|---|---|---|
| **Node.js** | 20.x o superior | Runtime de desarrollo frontend |
| **npm** | 10.x o superior | Gestor de paquetes frontend |
| **Docker & Docker Compose** | 24.x+ / Compose v2 | Contenerización y orquestación unificada |
| **Java JDK** | 21 o 17 LTS | Compilación y ejecución de Spring Boot |
| **Git** | 2.40+ | Control de versiones |

---

## 2. Opción A: Despliegue con Docker Compose (Recomendado)

Esta opción levanta toda la solución (PostgreSQL 17, Spring Boot 3.5 y Frontend Nginx) con un único comando:

### Paso 1: Clonar los Repositorios
Asegúrate de clonar ambos repositorios en el mismo directorio padre:
```bash
git clone https://github.com/Mileidys10/Tienda-de-Perfumes.git
git clone https://github.com/Mileidys10/Frontend-Perfume.git
```

### Paso 2: Levantar el Stack Completo
Desde la carpeta de `Frontend-Perfume`:
```bash
cd Frontend-Perfume
docker compose -f docker-compose.fullstack.yml up -d --build
```

### Paso 3: Verificar los Servicios
Los servicios estarán disponibles en:
- **Frontend Web**: [http://localhost](http://localhost)
- **Backend API REST**: [http://localhost:8080/api](http://localhost:8080/api)
- **Documentación Swagger / OpenAPI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Base de Datos PostgreSQL**: `localhost:5432` (Base de datos: `perfumes`, Usuario: `admin`, Password: `admin123`)

Para detener los contenedores:
```bash
docker compose -f docker-compose.fullstack.yml down
```

---

## 3. Opción B: Ejecución Local para Desarrollo

### 3.1 Base de Datos (PostgreSQL en Docker)
Desde la carpeta de `Tienda-de-Perfumes`:
```bash
docker compose up -d postgres
```

### 3.2 Iniciar el Backend (Spring Boot)
```bash
cd ../Tienda-de-Perfumes
./mvnw spring-boot:run
```
El backend iniciará en el puerto `8080`.

### 3.3 Iniciar el Frontend (Angular / Ionic)
```bash
cd ../Frontend-Perfume
npm install --legacy-peer-deps
npm start
```
La aplicación abrirá en [http://localhost:8100](http://localhost:8100) con Hot Module Replacement (HMR).

---

## 4. Credenciales de Prueba (Demo Accounts)

| Perfil | Email | Contraseña | Rol en el Sistema |
|---|---|---|---|
| **Administrador** | `admin@perfumes.com` | `Admin123*` | Gestión global, auditoría y moderación de fragancias |
| **Vendedor** | `vendedor@perfumes.com` | `Vendedor123*` | Creación de catálogo, marcas y gestión de órdenes |
| **Cliente** | `cliente@perfumes.com` | `Cliente123*` | Exploración, favoritos, carrito y compra |

---

## 5. Pruebas Automatizadas y Calidad

### Compilación de Producción
```bash
npm run build
```
Genera el paquete optimizado en la carpeta `www/`.

### Verificación de Sintaxis y Linting
```bash
npm run lint
```

### Pruebas Unitarias (Guards y Servicios)
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```
Ejecuta las suites de pruebas de `AuthGuard`, `RoleGuard`, `AuthService`, `CartService` y `ProductService`.

---

## 6. Despliegue en la Nube

### Frontend en Vercel
1. Conectar el repositorio `Mileidys10/Frontend-Perfume` en el panel de Vercel.
2. Build Command: `npm run build`
3. Output Directory: `www`
4. El archivo `vercel.json` incluido redirige automáticamente todas las rutas a `/index.html`.

### Backend en Render
1. Conectar el repositorio `Mileidys10/Tienda-de-Perfumes` en Render.
2. Build Command: `./mvnw clean package -DskipTests`
3. Start Command: `java -Dserver.port=$PORT -jar target/*.jar`
