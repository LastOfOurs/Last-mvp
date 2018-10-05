# LAST-MVP (Zion edition)

## Project Outline

The Project consists of multiple microservices

- __LAST-contract__: contains Ethereum smart contract
- __LAST-IPFS__: IPFS node and Data
- __LAST-minting-services__: minting microservices
- __LAST-proxy__: NGINX proxy server for Data Oracle
- __LAST-server__: contains all the server side code for the Data Oracle including Mongi Database
- __LAST-wallet__: contains all the client side code and wallet implementation


## Installing
Make sure you have docker and docker-compose installed on your machine

## Getting Starting 
1. install all the dependencies by running `npm install` inside LAST-server, LAST-contract, LAST-minting-services directories
2. Running `docker-compose up --build ` inside the root directory
3. generate 3 sets of dummy animal data, run ` bash scripts/last-seed.sh `
4. deploy LAST smart contract, run ` bash scripts/last-deploy.sh `
5. mint 3 sets of animals data to ERC721 tokens, run ` bash scripts/last-mint.sh `

After you are done developing and wants to delete the animal data, simply run ` bash scripts/last-clear.sh `
