#!/bin/bash
# RUN UNIT TESTS IN ALL APPS
# TEST CONTRACTS
printf '======= running unit test for smart contracts \n'
cd LAST-contract && npm run coverage
cd ..
# TEST SERVER
printf '======= running unit test for server \n'
cd LAST-server && npm run test
# TODO: TEST MINTER