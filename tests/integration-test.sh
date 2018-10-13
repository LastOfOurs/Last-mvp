#!/bin/bash
# RUN END_TO_END TEST
printf "======= RUNNING END TO END TEST \n"
source ./scripts/last-deploy.sh
source ./tests/integrations/checkLastContract.sh
source ./scripts/last-seed.sh
source ./scripts/last-mint.sh
source ./tests/integrations/checkLastMinted.sh
source ./tests/integrations/checkIpfs.sh
source ./scripts/last-clear.sh
# TODO verify that there's no more animal data in server && LAST JSON data is gone
printf "\n ======= SUCCESSFULLY END TO END TEST \n"

