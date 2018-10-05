#deploy smart contract to ETHEREUM Network
docker-compose exec last_truffle bash -c 'truffle compile && truffle migrate --reset --network compose'