# node image
FROM node:8.11.3
# Maintainer
MAINTAINER Pong Cheecharern <k.cheecharern@gmail.com>
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]