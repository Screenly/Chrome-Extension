#!/usr/bin/env bash

set -euo pipefail

docker compose build
docker run \
    --rm -ti \
    -v $(pwd):/app:delegated \
    -v /app/node_modules \
    sce_webpack:latest \
    /bin/bash -c "npx webpack --config webpack.dev.js && npm test"

