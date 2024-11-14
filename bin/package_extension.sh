#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

VERSION=${VERSION:-0.0.0}
cat <<< $(cat src/manifest.json | jq --arg version "$VERSION" '.version = $version') \
    > src/manifest.json

docker compose build
docker run \
    --rm -ti \
    -v $(pwd):/app:delegated \
    -v /app/node_modules \
    sce_webpack:latest \
    /bin/bash -c "npx webpack --config webpack.prod.js"

git restore src/manifest.json

(cd dist && zip -r ../screenly-chrome-extension-$VERSION.zip *)
