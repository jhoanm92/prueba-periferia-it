# Social Posts App

Una aplicación web construida con React y TypeScript que permite a los usuarios compartir y interactuar con posts.

## 🚀 Características

- **Autenticación de Usuarios**
  - Inicio de sesión seguro
  - Manejo de sesiones con JWT
  - Protección de rutas privadas

- **Sistema de Posts**
  - Creación de posts
  - Visualización de feed de posts
  - Sistema de likes en posts
  - Información del autor en cada post

- **Interfaz de Usuario**
  - Diseño moderno y responsive con Tailwind CSS
  - Feedback visual para interacciones
  - Navegación intuitiva
  - Modo de carga y estados de error

## 🛠️ Tecnologías Utilizadas

- **Frontend**
  - React 18
  - TypeScript
  - Vite (como bundler)
  - TailwindCSS (para estilos)
  - React Router v6 (para navegación)
  - Axios (para peticiones HTTP)

- **Herramientas de Desarrollo**
  - ESLint (linting)
  - TypeScript strict mode
  - HMR (Hot Module Replacement)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza la build de producción

## 🌐 Endpoints de la API

### Posts
- `GET /posts` - Obtiene todos los posts
- `POST /posts` - Crea un nuevo post
- `POST /posts/:id/like` - Da like a un post

### Autenticación
- `POST /login` - Inicia sesión
- `GET /profile` - Obtiene el perfil del usuario

## 👥 Autenticación

La aplicación utiliza JWT (JSON Web Tokens) para la autenticación. El token se almacena en localStorage y se incluye automáticamente en las cabeceras de las peticiones HTTP.

## 🎨 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── contexts/      # Contextos de React (AuthContext)
├── layouts/       # Layouts de la aplicación
├── pages/         # Componentes de página
├── services/      # Servicios de API
└── types/         # Definiciones de tipos TypeScript
```

## 🔐 Variables de Entorno

- `VITE_API_BASE_URL`: URL base de la API (requerida)

## 🐳 Docker

### Desarrollo con Docker

Para ejecutar la aplicación en modo desarrollo usando Docker:

```bash
docker-compose build
```

```bash
docker-compose up -d
```

La aplicación estará disponible en `http://localhost:5000`
