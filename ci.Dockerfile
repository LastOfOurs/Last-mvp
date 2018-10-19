FROM docker:latest

RUN apk add --no-cache py-pip
RUN pip install docker-compose
RUN apk add --update wget bash && rm -rf /var/cache/apk/*
RUN apk add --update nodejs nodejs-npm 
RUN apk update && apk upgrade && \
    apk add --no-cache git openssh g++ make

RUN mkdir -p /src/app
VOLUME /src/app
WORKDIR /src/app
