# Last-MVP (Zion edition)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Description

⚠ FOR DEVELOPMENT and POC use only, the production monorepo has been moved ⚠

This codebase is a POC of LAST ecosystem architecture to develop:
1. Egg as ERC20-compliant token to facilitate minting/hatching of the actual NFT
2. Keeping local ledger inside `Last-core`, utilizing DB as a source of truth before tokens are minted onchain
3. Developing React Native reference implementation of a Wallet application
4. Using IPFS for immutable storage of NFT data
5. Automating the process of Egg minting, hatching and programmatic minting of Last NFTs.

## Project Outline

The Project consists of multiple microservices

- __Last-contracts__: contains Ethereum smart contract
- __Last-IPFS__: IPFS node and Data
- __Last-services__: minting microservices
- __Last-core__: contains all the server side code for the Data Oracle including Mongo Database
- __Last-clients__: contains all the client side code and wallet implementation


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

```
bash scripts/last-seed.sh 
bash scripts/last-mint-eggs.sh 
bash scripts/last-hatch-eggs.sh 
```

Running development scripts, this will:
  - generate 3 set of dummy animal data
  - mint egg tokens
  - hatch 3 egg tokens
    - After 3 egg tokens are hatched, event will be transferred to message queue by the Watcher. Minter will mint this animal event data to ERC721 tokens and immutable meta data files stored on disk via IPFS

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

## TROUBLESHOOT
- *[contract] has not been deployed to the network* 
  Try checking your config for the correct ethereum node, or restart docker container
- *error connecting to rabbit mq* 
  Try checking your config for the correct rabbitmq node, or restart docker container
- 

## License
GNU Lesser General Public License
