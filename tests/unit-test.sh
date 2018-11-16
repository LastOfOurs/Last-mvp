#!/bin/bash
# RUN UNIT TESTS IN ALL APPS
# TEST CONTRACTS
printf '======= running unit test for smart contracts \n'
cd Last-contract && npm run coverage
cd ..
# TEST SERVER
printf '======= running unit test for server \n'
cd Last-core && npm run test
# TODO: TEST MINTER