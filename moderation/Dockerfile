FROM node:18-alpine

RUN apt update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["nmp", "start"]