## LAST-services

Minting Engine Distributed Applications consists of:
1. Watcher(s) : watch for an outside events happening to a smart contract
 and send message to the queue (ie. Token Transfer) 
2. Minter : take new event from queue and mint

For MVP: we will only have Watcher and Minter service for now