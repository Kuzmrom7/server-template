FROM node:10    

WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./server/package-lock.json ./

RUN npm ci

COPY ./server .

CMD [ "npm",  "start"]
