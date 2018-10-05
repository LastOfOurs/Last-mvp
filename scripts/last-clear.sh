#nuke all animals

curl -X DELETE http://localhost:8090/api/animals/1 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 
curl -X DELETE http://localhost:8090/api/animals/2 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 
curl -X DELETE http://localhost:8090/api/animals/3 -H 'Cache-Control: no-cache' -H 'Content-Type: application/json' 

#nuke your IPFS data store

rm ./LAST-IPFS/export/*