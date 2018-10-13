#!/bin/bash
# Check if Last contract has been deployed
printf "======= Testing if Last Contracts are deployed ...\n"
docker-compose exec last_truffle bash -c 'truffle exec --network compose ./scripts/checkContracts.js'