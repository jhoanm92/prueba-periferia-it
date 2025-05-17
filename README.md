# Prueba Periferia IT

Este proyecto es una aplicación web fullstack que consta de un backend en Node.js y un frontend en React.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

### Backend (`/back`)
- Desarrollado con Node.js y TypeScript
- Utiliza Docker para la contenerización
- Incluye configuración de Sequelize para la base de datos
- Sistema de tipos personalizado en el directorio `/types`

### Frontend (`/front`)
- Desarrollado con React y TypeScript
- Utiliza Vite como bundler
- Implementa Tailwind CSS para los estilos
- Configurado con ESLint para el linting
- Dockerizado para fácil despliegue

## Requisitos Previos

- Node.js
- Docker y Docker Compose
- npm o yarn


## Tecnologías Principales

### Backend
- Node.js
- TypeScript
- Sequelize
- Docker

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Estructura de Directorios

```
.
├── back/                 # Backend del proyecto
│   ├── src/             # Código fuente del backend
│   ├── types/           # Definiciones de tipos
│   └── ...
│
└── front/               # Frontend del proyecto
    ├── src/             # Código fuente del frontend
    ├── public/          # Archivos públicos
    └── ...
```