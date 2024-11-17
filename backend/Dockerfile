FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "deploy"]
