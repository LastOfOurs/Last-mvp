# RUN UNIT TESTS IN ALL APPS
# TEST CONTRACTS
echo 'running unit test for smart contracts'
cd LAST-contract && npm run coverage
cd ..
# TEST SERVER
echo 'running unit test for server'
cd LAST-server && npm run test
# TODO: TEST MINTER