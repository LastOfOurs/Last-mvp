### Setting Environments

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
$ docker build . -t last-truffle:latest
$ docker run -it -v ${PWD}:/usr/src/app last-truffle:latest /bin/sh
```

### Running Tests

To check if it works, test should all pass. Run Truffle Test inside the container
```
$ truffle test
```

### Compile and Migrate

Compile and Migrate Smart Contract:
```
$ truffle compile
$ truffle migrate 
```

Log into Console, Play around with Minting new Tokens and Trying to Get TokenMetadata:
```
$ truffle console
> Last.deployed().then((inst)=>{Lastcontract = inst})
> Lastcontract.mint("<Your-Account-Address>", "<unique_id>", "<url>")
> Lastcontract.tokenURI("<unique_id>")
```