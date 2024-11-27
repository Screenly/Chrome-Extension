#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

VERSION=${VERSION:-0.0.0}
PLATFORM=${PLATFORM:-chrome}

if [[ ! $PLATFORM =~ ^(chrome|firefox)$ ]]; then
    echo "Invalid platform: $PLATFORM"
    echo "Platform should be either chrome or firefox"
    exit 1
fi

cat src/manifest-$PLATFORM.json \
    | jq --arg version "$VERSION" '.version = $version' \
    > src/manifest.json

docker compose down -v
docker compose up --build
