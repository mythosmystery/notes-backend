FROM node:18.0-bullseye-slim

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD [ "npm", "start" ]