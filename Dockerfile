FROM node:16.15.1

ENV PORT=3000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD [ "nodemon", "index.js" ]