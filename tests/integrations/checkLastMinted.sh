#!/bin/bash
# Check if Last contract has been deployed
printf "======= Checking if Last Tokens are minted to correct owner ...\n"
docker-compose exec last_truffle bash -c 'truffle exec --network compose ./scripts/checkMinted.js'