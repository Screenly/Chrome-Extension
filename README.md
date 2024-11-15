[![Build Screenly Chrome Extension](https://github.com/Screenly/Chrome-Extension/actions/workflows/build.yaml/badge.svg)](https://github.com/Screenly/Chrome-Extension/actions/workflows/build.yaml)
[![sbomified](https://sbomify.com/assets/images/logo/badge.svg)](https://app.sbomify.com/component/NwxGnn8u8K)

# Develop

The extension is built using [webpack](https://webpack.js.org/).

```bash
$ docker compose up --build
```

Now load the content of the `dist/` folder as an unpacked extension in Chrome. As you make changes to the code, dist is automatically rebuilt.

# Distribute

```bash
$ VERSION=<EXTENSION_VERSION> ./bin/package_extension.sh
```

# Unit testing

```bash
$ docker compose build
$ docker run \
    --rm -ti \
    -v $(pwd):/app:delegated \
    -v /app/node_modules \
    sce_webpack:latest \
    /bin/bash -c "npx webpack --config webpack.dev.js && npm test"

```

1. Build the extension in dev mode.
2. Load the extension as an unpacked extension from the `dist` folder.
3. Find the extension URL and then open `chrome-extension://extension-id/test/tests.html` in Chrome.
