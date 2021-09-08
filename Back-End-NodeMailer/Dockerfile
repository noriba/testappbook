# Stage 3
FROM node:alpine

RUN mkdir -p /Back-End-NodeMailer
WORKDIR /Back-End-NodeMailer
COPY package*.json /Back-End-NodeMailer
RUN npm install
COPY . /Back-End-NodeMailer

EXPOSE 3000

CMD ["npm", "start"]

