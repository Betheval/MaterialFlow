#Usar imagen de node
FROM node:16
#Crear directorio de trabajo
WORKDIR /app
#Copiar el package.json y package-lock.json
COPY package*.json ./
#Instalar dependencias
RUN npm install
#Copiar el resto de los archivos
COPY . .
#Exponer el puerto 4004 del contenedor
EXPOSE 4004
#Ejecutar el comando npm start
CMD ["npm", "start"]
