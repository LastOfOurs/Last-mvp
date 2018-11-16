#!/bin/bash
# RUN END_TO_END TEST
printf "======= RUNNING INTEGRATION TEST \n"
source ./tests/integrations/checkLastContract.sh
source ./scripts/last-seed.sh
source ./scripts/last-mint-eggs.sh
source ./scripts/last-hatch-eggs.sh
source ./tests/integrations/checkLastMinted.sh
source ./tests/integrations/checkIpfs.sh
source ./scripts/last-clear.sh
# TODO verify that there's no more animal data in server && LAST JSON data is gone
printf "\n ======= TEST COMPLETED \n"

