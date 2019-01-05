#!/bin/bash
# RUN END_TO_END TEST
printf "======= RUNNING INTEGRATION TEST \n"
source ./scripts/last-clear.sh
source ./tests/integrations/checkLastContract.sh
source ./scripts/last-seed.sh
source ./scripts/last-mint-eggs.sh
source ./scripts/last-hatch-eggs.sh
sleep 8
source ./tests/integrations/checkIpfs.sh
source ./tests/integrations/checkLastMinted.sh
source ./scripts/last-clear.sh
printf "\n ======= TEST COMPLETED \n"

