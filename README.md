# LAST-MVP (Zion edition)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Description



For more information about Zion and underlying architecture/design of the application please refer to Technical doc:
https://docs.google.com/document/d/1bT8tXOCoHplJq63HBT4i-ExM19-70l_aUVWt4nmpseg/edit?usp=sharing

## Project Outline

The Project consists of multiple microservices

- __LAST-contract__: contains Ethereum smart contract
- __LAST-IPFS__: IPFS node and Data
- __LAST-minting-services__: minting microservices
- __LAST-proxy__: NGINX proxy server for Data Oracle
- __LAST-server__: contains all the server side code for the Data Oracle including Mongi Database
- __LAST-wallet__: contains all the client side code and wallet implementation


## Installation
Make sure you have docker and docker-compose installed on your machine

## Getting Started in Development Mode
1. install all the dependencies by running `npm install` inside LAST-server, LAST-contract, LAST-minting-services directories
2. Running `docker-compose up --build ` inside the root directory
3. generate 3 sets of dummy animal data, run ` bash scripts/last-seed.sh `
4. deploy LAST smart contract, run ` bash scripts/last-deploy.sh `
5. mint 3 sets of animals data to ERC721 tokens, run ` bash scripts/last-mint.sh `

After you are done developing and wants to delete the animal data, simply run ` bash scripts/last-clear.sh `
