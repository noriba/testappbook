# Stage 1

FROM node:latest as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json  /app
COPY package-lock.json  /app

RUN npm install

COPY . /app

RUN npm run build --prod



# Stage 2

FROM nginx:latest

COPY --from=build /app/dist/vrpManager /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80


