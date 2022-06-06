FROM node:16.15.0-alpine3.15

RUN mkdir -p /usr/src/backend-app

WORKDIR /usr/src/backend-app

COPY package.json /usr/src/backend-app

RUN npm install

COPY . /usr/src/backend-app

EXPOSE 3001

CMD [ "npm", "start" ]
