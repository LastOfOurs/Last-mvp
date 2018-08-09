# node image
FROM node:8.11.3-alpine
# Maintainer
MAINTAINER Pong Cheecharern <k.cheecharern@gmail.com>
RUN mkdir -p /usr/src/app
# Create Working Directory
WORKDIR /usr/src/app
# Install Truffle Globally
RUN npm install -g truffle@4.1.13
# Install Ganache for use in CI
RUN npm install -g ganache-cli@6.1.6


