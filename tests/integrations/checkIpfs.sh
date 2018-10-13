#!/bin/bash
printf "======= testing if IPFS files are created ...\n"
if [ -e "./LAST-IPFS/export/LAST_ANIMAL_1.json" ] && [ -e "./LAST-IPFS/export/LAST_ANIMAL_2.json" ] && [ -e "./LAST-IPFS/export/LAST_ANIMAL_3.json" ]; then
  printf "\n 3 Last Animal's JSON files exist \n"
else 
  printf "\n Last Animal's JSON files Dont exist \n"
  exit 1
fi
