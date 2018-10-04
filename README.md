## Project Outline
The Project Consists of Multiple Apps and Services
- LAST-client: contains client side code
- LAST-contract: contains smart contracts
- LAST-server: contains server side code

### LAST-server
### LAST-client
### LAST-contract

Please refer to LAST-contract's README to run the Smart Contract

# Installing
Make sure you have docker and docker-compose installed on your machine

# Starting 
1. npm install LAST-server, contract, minter
2. run docker-compose up --build 
3. generate 3 sets of dummy animal data, run ` bash scripts/last-seed.sh `
4. deploy LAST smart contract, run ` bash scripts/last-deploy.sh `
5. mint 3 sets of animals data to ERC721 tokens, run ` bash scripts/last-mint.sh `

after you are done developing and wants to delete the animal data, simply run ` bash scripts/last-clear.sh `
