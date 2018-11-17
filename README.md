# Last-MVP (Zion edition)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Description

⚠ FOR INTERNAL DEVELOPMENT, TESTING USE ONLY- NOT SAFE FOR PRODUCTION USAGE ⚠

For more information about Zion and underlying architecture/design/rationale of the application services please refer to Technical Documentation:
https://docs.google.com/document/d/1bT8tXOCoHplJq63HBT4i-ExM19-70l_aUVWt4nmpseg/edit?usp=sharing

## Project Outline

The Project consists of multiple microservices

- __Last-contracts__: contains Ethereum smart contract
- __Last-IPFS__: IPFS node and Data
- __Last-services__: minting microservices
- __Last-core__: contains all the server side code for the Data Oracle including Mongo Database
- __Last-wallet__: contains all the client side code and wallet implementation


## Installation
Make sure you have `node.js >= v8.11.3`, `npm >= 6.3.0`, `docker >= 18.03.1` , `docker-compose >= 1.21.1` installed on your local machine

The Applications are built as independent services, however you want to run them altogether for Development:

1. install all the dependencies by running `npm install` inside Last-core, Last-contracts, Last-services directories
2. Running `docker-compose up --build --force-recreate` inside the root directory

## Run Test

Check if things work properly

```
bash tests/unit-test.sh
bash tests/integration-test.sh
```

## Getting Started in Development Mode

Running development scripts, this will:
  - generate 3 sets of dummy animal data
  - deploy Last smart contract
  - mint 3 sets of animals data to ERC721 tokens and immutable meta data files stored on disk via IPFS

```
bash scripts/last-seed.sh 
bash scripts/last-deploy.sh 
bash scripts/last-mint.sh 
```
After you are done developing and wants to delete the animal data, simply run 

``` 
bash scripts/last-clear.sh
docker-compose down 
```

## API
Exposed API for client is as follows:
1. http://localhost:3000/explorer/ - Swagger , Loopback Server API explorer
2. http://localhost:8546/ - Ganache , Test Ethereum Blockchain RPC port
3. http://localhost:5001/ - IPFS , API Gateway port to IPFS

## License
GNU Lesser General Public License