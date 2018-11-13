FROM node:8.11.3
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY . /usr/src/app
RUN npm install
EXPOSE 3001
