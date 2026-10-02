# Perfume Store - Frontend

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular)
![Ionic](https://img.shields.io/badge/Ionic-8-3880FF?style=flat-square&logo=ionic)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=flat-square&logo=capacitor)

Aplicacion movil y web progresiva (PWA) para una tienda de perfumeria de lujo. Construida con Angular 20 e Ionic 8, consume la API REST del backend [Tienda-de-Perfumes](https://github.com/Mileidys10/Tienda-de-Perfumes) desarrollado en Spring Boot 3 con Java 21 y PostgreSQL.

## Arquitectura

El sistema implementa tres roles diferenciados con rutas y vistas separadas:

| Rol | Modulos principales |
|---|---|
| CLIENTE | home, product-detail, cart, checkout, profile-client |
| VENDEDOR | seller, seller-profile |
| ADMIN | admin, notifications |

## Stack tecnico

| Capa | Tecnologia | Version |
|---|---|---|
| Framework UI | Angular | 20 |
| Componentes moviles | Ionic Framework | 8 |
| Lenguaje | TypeScript | 5.8 |
| Runtime nativo | Capacitor | 7 |
| Estado reactivo | RxJS | 7.8 |
| Testing | Karma + Jasmine | 6.4 |

## Instalacion local

Requisitos: Node.js 18+, npm 9+, backend en ejecucion en localhost:8080.

`ash
git clone https://github.com/Mileidys10/Frontend-Perfume.git
cd Frontend-Perfume
npm install
npm start
`

La aplicacion estara disponible en http://localhost:4200.

## Configuracion del entorno

`	ypescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
`

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| npm start | Servidor de desarrollo en localhost:4200 |
| npm run build | Build de produccion en dist/ |
| npm test | Pruebas unitarias con Karma |
| npm run lint | Analisis de codigo con ESLint |

## Backend relacionado

[github.com/Mileidys10/Tienda-de-Perfumes](https://github.com/Mileidys10/Tienda-de-Perfumes)

Stack: Java 21, Spring Boot 3.5, Spring Security + JWT, PostgreSQL, Supabase Storage, OpenAPI.

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| Gold primary | #D4AF37 | Titulos, botones primarios, bordes activos |
| Gold dark | #B8860B | Gradiente secundario de botones |
| Surface dark | #0A0A0A | Fondo principal |
| Surface card | #1A1A1A | Tarjetas y modales |
