FROM node:14

WORKDIR . /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node ace build

EXPOSE 3333

CMD ["npm","run","dev"]

