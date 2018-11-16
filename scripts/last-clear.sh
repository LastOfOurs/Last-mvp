#!/bin/bash
#nuke all animals
printf "======= removing animals and IPFS data \n"

curl -X DELETE http://0.0.0.0:3000/api/animals/1 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 
curl -X DELETE http://0.0.0.0:3000/api/animals/2 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 
curl -X DELETE http://0.0.0.0:3000/api/animals/3 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 

#nuke your IPFS data store

rm ./Last-IPFS/export/*