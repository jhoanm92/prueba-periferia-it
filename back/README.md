
# 🧠 Red Social API - Backend

Este proyecto es una API REST para una red social, construida con **Node.js**, **TypeScript**, **Express**, **Sequelize** y **PostgreSQL**, y orquestada con **Docker**.

---

## 🚀 Características

- Autenticación con JWT
- CRUD de publicaciones (Posts)
- Sistema de "Me gusta" (Likes)
- Asociación entre usuarios, publicaciones y likes
- Migraciones y seeders con Sequelize
- Soporte para múltiples entornos usando Docker

---

## 📦 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js (opcional, si corres fuera de contenedor)](https://nodejs.org/)

---

## 🐳 Despliegue con Docker

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/red-social-api.git
cd red-social-api
```

2. Levanta los contenedores:

```bash
docker-compose up --build
```

3. Ejecuta las migraciones:

```bash
docker-compose exec app npx sequelize-cli db:migrate
```

4. Carga los datos iniciales (usuarios, posts, likes):

```bash
docker-compose exec app npx sequelize-cli db:seed:all
```

---

## 📁 Estructura del proyecto

```
src/
├── config/           # Configuraciones de Sequelize y entorno
├── controllers/      # Lógica de negocio y controladores de rutas
├── models/           # Definiciones de modelos Sequelize
├── routes/           # Definición de rutas Express
├── services/         # Servicios auxiliares (auth, lógica)
├── migrations/       # Migraciones de base de datos
├── seeders/          # Datos iniciales para poblar la DB
└── index.ts          # Punto de entrada principal
```

---

## 🔐 Endpoints principales

### 🔑 Login

**POST** `/login`

```json
{
  "email": "user2@example.com",
  "password": "password"
}
```

Devuelve un token JWT si las credenciales son válidas.

---

### 👤 Obtener perfil de usuario

**GET** `/profile`

🔒 Requiere token JWT en el header:

```
Authorization: Bearer <token>
```

Ejemplo de respuesta:

```json
{
  "id": 2,
  "username": "user2",
  "email": "user2@example.com",
  "Posts": [
    {
      "id": 2,
      "title": "First Post",
      "content": "Post from user2",
      "userId": 2
    }
  ]
}
```

---

### 📚 Obtener todas las publicaciones

**GET** `/posts`

Respuesta:

```json
[
  {
    "id": 1,
    "title": "First Post",
    "content": "Post from user1",
    "userId": 1,
    "User": {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com"
    },
    "Likes": [
      {
        "id": 1,
        "userId": 2,
        "postId": 1
      }
    ]
  },
  ...
]
```

---

### 📝 Crear publicación

**POST** `/posts`

🔒 Requiere token JWT

```json
{
  "title": "Mi primer post",
  "content": "Este es el contenido del primer post de Alice."
}
```

---

### ❤️ Dar like a un post

**POST** `/posts/:id/like`

🔒 Requiere token JWT

No requiere body. Solo la URL con el ID del post.

---

## ⚙️ Scripts útiles

```bash
# Ejecutar el servidor en desarrollo
npm run dev

# Ejecutar todas las migraciones
npx sequelize-cli db:migrate

# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# Revertir todas las migraciones
npx sequelize-cli db:migrate:undo:all
```

---

## 🧪 Tecnologías utilizadas

- Node.js + Express
- TypeScript
- PostgreSQL
- Sequelize ORM
- JWT
- Docker + Docker Compose
- Nodemon + ts-node

---

## 📝 Variables de entorno `.env`

Puedes definir estas variables manualmente o usar `docker-compose.yml` que ya las incluye:

```env
DB_HOST=db
DB_USER=user_red
DB_PASSWORD=pass123456
DB_NAME=db_red_social
JWT_SECRET=secret_jwt
```
