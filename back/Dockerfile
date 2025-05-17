FROM node:18

# Crear y posicionarse en el directorio de trabajo
WORKDIR /app

# Copiar solo archivos de dependencias
COPY package*.json tsconfig.json ./

# Instalar todas las dependencias (incluyendo dev)
RUN npm install

# Instalar nodemon globalmente (opcional)
RUN npm install -g nodemon

# Copiar el resto del código fuente
COPY . .

# Comando por defecto
CMD ["npm", "run", "dev"]
