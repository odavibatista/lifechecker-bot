FROM node:20

WORKDIR /home/node/app/lifechecking-bot

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8800

ENV WAIT_VERSION 2.9.0

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait

RUN chmod +x /wait

CMD ["npm", "run", "dev"]