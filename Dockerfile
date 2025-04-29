# Usar la imagen base de Node.js 20.12.0
FROM node:20.12.0

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install 

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]