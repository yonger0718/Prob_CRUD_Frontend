FROM node:16-alpine AS build

WORKDIR /usr/app

# copy所需的package list
COPY package*.json ./
# dependencies installation
RUN npm install

COPY . .

# build up app
RUN npm run build --prod

FROM nginx:alpine

# angular.json的project可以找到名稱
COPY --from=build /usr/app/dist/cathay-prob-frontend /usr/share/nginx/html

# nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
