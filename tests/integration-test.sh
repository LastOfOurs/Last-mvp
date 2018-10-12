#!/bin/bash
# RUN END_TO_END TEST
printf "======= RUNNING END TO END TEST \n"
source ./scripts/last-deploy.sh
# TODO verify that last contract has been deployed
source ./scripts/last-seed.sh
# TODO verify that 3 animals have been generated
source ./scripts/last-mint.sh
# TODO verify that 3 animal tokens have been minted to user wallet && LAST JSON data exists
source ./scripts/last-clear.sh
# TODO verify that there's no more animal data in server && LAST JSON data is gone
printf "======= FINISHED END TO END TEST \n"

