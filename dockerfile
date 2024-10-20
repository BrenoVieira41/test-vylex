# Usando uma imagem base do Node.js
FROM node:20

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando o package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# Rodando o build da aplicação
RUN npm run build

# Expondo a porta em que a aplicação irá rodar
EXPOSE 7777

# Comando para iniciar a aplicação
CMD [ "node", "dist/server.js" ]
