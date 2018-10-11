# LAST-MVP (Zion edition)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Description

⚠ FOR INTERNAL DEVELOPMENT, TESTING USE ONLY- NOT SAFE FOR PRODUCTION USAGE ⚠

For more information about Zion and underlying architecture/design/rationale of the application services please refer to Technical Documentation:
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
Make sure you have `node.js`, `npm`, `docker`, `docker-compose` installed on your machine

## Getting Started for Development Mode
The Applications are built as independent services, however you want to run them together for Development:

1. install all the dependencies by running `npm install` inside LAST-server, LAST-contract, LAST-minting-services directories
2. Running `docker-compose up --build --force-recreate` inside the root directory
3. generate 3 sets of dummy animal data, run ` bash scripts/last-seed.sh `
4. deploy LAST smart contract, run ` bash scripts/last-deploy.sh `
5. mint 3 sets of animals data to ERC721 tokens, run ` bash scripts/last-mint.sh `

After you are done developing and wants to delete the animal data, simply run ` bash scripts/last-clear.sh `, and `docker-compose down`

## API
Exposed API for client is as follows:
1. http://localhost:8090/explorer/ - Swagger , Loopback Server API explorer
2. http://localhost:8546/ - Ganache , Test Ethereum Blockchain RPC port
3. http://localhost:5001/ - IPFS , API Gateway port to IPFS

## License
GNU Lesser General Public License