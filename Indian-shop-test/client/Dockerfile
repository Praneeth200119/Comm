#WORKDIR /app
#COPY package*.json ./
#RUN npm install --legacy-peer-deps
#COPY . .
#EXPOSE 3000
#CMD ["npm", "start"]

FROM node:16.17.0 as builder
WORKDIR /app
COPY ./package.json .
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
