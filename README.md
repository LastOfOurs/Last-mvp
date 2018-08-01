## Install Dependencies
Make sure you have installed on your machine:
- Ganache-cli
- Truffle
- IPFS
- json-db

## Deploying LOO Contracts & Mint LOO token

Manual Token minting process on Development

1. Start the testrpc via ganache
 ```
 $ ganache-cli
 ```
2. compile all smart contract 
```
$ truffle Compile
```
3. migrate to blockchain
```
 $ truffle Migrate 
 ```
4. start IPFS node   
```
$ ipfs init
$ ipfs daemon
```
5. add file IPFSsnowleopard.json to IPFS 
```
 $ ipfs add IPFSsnowleopard.json 
 ```
6. start up console
```
 $ trufle console 
 ```
7. link instance of deployed contract
```
 > Loo.deployed().then((inst)=> {loo = inst })
 ```
8. finally mint token
```
 > loo.mint("your-ganache-address","your-token-id","your-ipfs-hash")
 ```


## Fetch metadata of token

1.  Start the simple JSON server run
```
 $ json-server --watch db.json 
 ```
2. start the console
```
$ truffle console
```
3. fetch URI of specific tokenID
```
 $ loo.tokenURI("your-token-id")
 ```
4. click on the url to IPFS hash


