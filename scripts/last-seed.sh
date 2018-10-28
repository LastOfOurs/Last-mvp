#!/bin/bash
# Add 3 new Animals to Server

printf "======= generating 3 Animals ...\n"

curl -X POST \
  http://0.0.0.0:3000/api/animals \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "name": "Leopard",
  "meta": [
    {
      "someMeta": "meta",
      "someMoreMeta": "someMoreMeta"
    }
  ],
  "category": "CE",
  "habitat": [
    "savannah"
  ],
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg/1200px-African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg",
  "minted": false,
  "ipfsData": {
    "Name": "Joe",
    "favoriteActivity": "Parkour",
    "description": "idk lol"
  }
}'

curl -X POST \
  http://0.0.0.0:3000/api/animals \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "name": "Leopard",
  "meta": [
    {
      "someMeta": "meta",
      "someMoreMeta": "someMoreMeta"
    }
  ],
  "category": "CE",
  "habitat": [
    "savannah"
  ],
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg/1200px-African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg",
  "minted": false,
  "ipfsData": {
    "Name": "Bob",
    "favoriteActivity": "Parkour",
    "description": "idk lol"
  }
}'

curl -X POST \
  http://0.0.0.0:3000/api/animals \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 3,
  "name": "Leopard",
  "meta": [
    {
      "someMeta": "meta",
      "someMoreMeta": "someMoreMeta"
    }
  ],
  "category": "CE",
  "habitat": [
    "savannah"
  ],
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg/1200px-African_leopard%2C_Panthera_pardus_pardus%2C_near_Lake_Panic%2C_Kruger_National_Park%2C_South_Africa_%2819448654130%29.jpg",
  "minted": false,
  "ipfsData": {
    "Name": "Alice",
    "favoriteActivity": "Parkour",
    "description": "idk lol"
  }
}'
