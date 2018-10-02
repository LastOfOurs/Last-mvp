FROM node:8.11.3
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /LAST-minting-services/Minter
COPY package.json /LAST-minting-services/Minter
RUN npm install
EXPOSE 3001
