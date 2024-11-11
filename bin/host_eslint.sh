#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

docker compose build

# -v mount under same path as on host to make the paths used by arc lint work.
docker run \
    --rm \
    -v $(pwd):$(pwd):delegated \
    sce_webpack:latest \
    /app/node_modules/.bin/eslint $@
