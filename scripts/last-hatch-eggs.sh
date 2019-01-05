#!/bin/bash
# hatch 3 EGGS
printf "======= Hatching 3 Eggs ...\n"
docker-compose exec last_truffle bash -c 'truffle exec --network compose ./scripts/hatchEggs.js'