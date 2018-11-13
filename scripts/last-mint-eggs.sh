#!/bin/bash
# Minting a certain amount of eggs
printf "======= Minting Lots of Eggs ...\n"
docker-compose exec last_truffle bash -c 'truffle exec --network compose ./scripts/mintEggs.js'