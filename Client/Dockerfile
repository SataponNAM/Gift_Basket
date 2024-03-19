FROM node:20-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

CMD [ "npm", "run", "dev"]