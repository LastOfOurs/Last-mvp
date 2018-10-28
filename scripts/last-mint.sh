#!/bin/bash
#Mint 3 New Animals to the Smart Contract
printf "======= minting 3 Animal Tokens...\n"
curl -X POST \
  http://0.0.0.0:3001/api/v1/mint \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{  "animal_id": "1", "recipient":"0x066ec5590625785b38b740311fc0273660ea3997"}'

  curl -X POST \
  http://0.0.0.0:3001/api/v1/mint \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{  "animal_id": "2", "recipient":"0x066ec5590625785b38b740311fc0273660ea3997"}'

  curl -X POST \
  http://0.0.0.0:3001/api/v1/mint \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{  "animal_id": "3", "recipient":"0x066ec5590625785b38b740311fc0273660ea3997"}'
  
  printf "======= animal data seeded ...\n"