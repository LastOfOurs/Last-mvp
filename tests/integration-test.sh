#!/bin/bash
# RUN END_TO_END TEST
printf "======= RUNNING INTEGRATION TEST \n"
source ./scripts/last-deploy.sh
source ./tests/integrations/checkLastContract.sh
source ./scripts/last-seed.sh
source ./scripts/last-mint-eggs.sh
source ./scripts/last-hatch-eggs.sh
sleep 5
source ./tests/integrations/checkIpfs.sh
source ./tests/integrations/checkLastMinted.sh
source ./scripts/last-clear.sh
# TODO verify that there's no more animal data in server && Last JSON data is gone
printf "\n ======= TEST COMPLETED \n"

