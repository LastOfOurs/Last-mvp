## LAST-services

Minting Engine Distributed Applications consists of:
1. Event-Watcher(s) : watch for an outside event and send message (ie. Token Transfer) 
2. Minting-Logic : subscribe for message and processing logic for minting new token, call POST API on Minter when done 
3. Minter : spawns new process that a) update Last-Server, add new JSON file to IPFS, 
3. Kafka: messaging queues for all services, writing logs to a db

For Yellowstone: we will only have Minter service for now