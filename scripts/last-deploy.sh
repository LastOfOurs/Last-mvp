#!/bin/bash
#deploy smart contract to ETHEREUM Network
printf "======= deploying smart contracts ...\n"
docker-compose exec last_truffle bash -c 'truffle compile && truffle migrate --reset --network compose'