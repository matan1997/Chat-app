# FROM nginx
# COPY ./ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
 FROM node:alpine
 WORKDIR /app
 COPY ["package.json", "package-lock.json*", "./"]
 COPY ./ ./
 EXPOSE 443
 RUN npm i
 CMD ["node", "simpleBackend.js"]



