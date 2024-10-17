FROM node:18-alpine

# Install Git
RUN apk update && apk add --no-cache git

WORKDIR /app/rest-api

# Set up Git to use the PAT for GitHub
ARG GITHUB_PAT
ENV GITHUB_PAT=${GITHUB_PAT}
RUN git config --global url."https://${GITHUB_PAT}:@github.com/".insteadOf "https://github.com/"

WORKDIR /app/rest-api

COPY package*.json ./

RUN npm install

COPY . .

ARG APP_PORT
ARG NODE_ENV

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'dev' ]; then npm run start:dev; else npm start; fi"]