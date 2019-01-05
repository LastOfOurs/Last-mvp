# Minter Service
NOTE: MVP Stage only, not tested with load
NOTE: Minter
### Installation
Run `npm install`

### Configuration

1. Make sure you have IPFS, Ganache-cli, Last-core endpoints running and configured inside `config.js` in root
2. Make sure you have Animal Data with the appropriate ID number 
(Ensure that you have created the animal first inside the `Last-core`)
3. Deployed `Last.sol` by running `truffle migrate --reset --network development`

Once you have all the configuration done- you can get started

### Getting Started

1. Starting the server
```
npm run start
```
The server should start watching on a port 3001

2. Simulating Event 
currently event listener is not implemented (mocked with REST API endpoint for now)
So to test the Minter, go to Postman/any API tester tool and send a POST request to the following endpoint:
```
localhost:3000/api/v1/mint
```
the payload should look like the following
```
{  "animal_id": "1", "recipient":"0x066ec5590625785b38b740311fc0273660ea3997"}
```

Once you have sent the event, essentially Minter will automatically spawn a process `minterProcess` that will do the following under the hood:

1. UPDATE API endpoint and set Animal (using the `animal_id` in the payload) `minted` attribute to `true`
2. Get the data of the animal within `ipfsData` field and create a `.JSON` file under `Last-IPFS/export` directory.
3. Adding the `.JSON` file to the IPFS daemon, returning the IPFS hash
4. Finally use the `animal_id`, `ipfsHash`, `recipient` to mint the token to the recipient

Not yet implemented:
- [ ] test under load (perf test)
- [ ] implement event, event bus, or message queue instead of REST API
- [ ] propper error handling
- [ ] unit tests
- [ ] end to end test for large amount of animals 