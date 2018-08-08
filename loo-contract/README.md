### Running the Smart Contract

First, make sure you have Docker Installed
by running following Docker container command

```
$ docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -h 0.0.0.0
```
Have all the packages and dependencies installed, by running

```
$ npm install
```

Run the following Docker command to pull in the image
then eventually run the Container + SSH into it
```
$ docker built . -t last-truffle:latest
$ docker run -it -v /<path>/<to>/<folder>/loo/loo-contract:/usr/src/app last-truffle:latest /bin/sh
```

To check if it works, test should all pass. Run Truffle Test inside the container
```
$ truffle test
```


Compile and Migrate Smart Contract:
```
$ truffle compile
$ truffle migrate 
```

Log into Console, Mint new Tokens and Get TokenMetadata:
```
$ truffle console
> Loo.deployed().then((inst)=>{loocontract = inst})
> loocontract.mint("<Your-Account-Address>", "<unique_id>", "<url>")
> loocontract.tokenURI("<unique_id>")
```