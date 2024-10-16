FROM node:18-alpine

WORKDIR /app/rest-api

COPY package*.json ./

RUN npm install

COPY ../../.. .

EXPOSE ${APP_PORT}

ENV NODE_ENV=${NODE_ENV}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'dev' ]; then npm run start:dev; else npm start; fi"]