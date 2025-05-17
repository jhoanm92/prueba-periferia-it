# Usa la imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Construir la aplicación Vite
RUN npm run build

# Instalar un servidor estático para servir los archivos construidos
RUN npm install -g serve

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "dist", "-l", "5000"]