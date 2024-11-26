<h1 align="center">
    Google Chrome Extension for Screenly
</h1>

<p align="center">
    <a href="https://github.com/Screenly/Chrome-Extension/actions/workflows/build.yaml?query=branch%3Amaster">
        <img alt="GitHub Actions Workflow Status"
            src="https://img.shields.io/github/actions/workflow/status/Screenly/Chrome-Extension/build.yaml?label=Build%20Screenly%20Chrome%20Extension&branch=master&style=for-the-badge">
    </a>
    <a href="https://github.com/Screenly/Chrome-Extension/actions/workflows/lint.yaml?query=branch%3Amaster">
        <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/Screenly/Chrome-Extension/lint.yaml?branch=master&style=for-the-badge&label=ESLint">
    </a>
    <a href="https://app.sbomify.com/component/NwxGnn8u8K">
        <img src="https://img.shields.io/badge/_-sbomified-8A2BE2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU3IiBoZWlnaHQ9IjI1NyIgdmlld0JveD0iMCAwIDI1NyAyNTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEyOC41IiBjeT0iMTI4LjUiIHI9IjEyOC41IiBmaWxsPSIjMTQxMDM1Ii8+CjxwYXRoIGQ9Ik02My45Mzc5IDgwLjAwMDlDNTcuNTM3NCA3OS45MTMyIDU3LjUyNDkgODkuOTk4OSA2My45Mzc5IDg5LjkxMTJIOTcuNzI4NUMxMDQuMTU0IDkwLjAyNCAxMDQuMTY3IDc5Ljg4ODIgOTcuNzI4NSA4MC4wMDA5SDYzLjkzNzlaTTExMy43OCA4MC4wMDA5QzEwNy40MDQgNzkuOTEzMiAxMDcuMzY3IDg5Ljk5ODkgMTEzLjc4IDg5LjkxMTJIMTk0LjA3NUMxOTYuOCA4OS45MTEyIDE5OSA4Ny42OTM2IDE5OSA4NC45NzQ5QzE5OSA4Mi4yMzExIDE5Ni44IDgwLjAxMzUgMTk0LjA3NSA4MC4wMTM1SDExMy43OFY4MC4wMDA5Wk02My45Mzc5IDk3LjE0MDRDNTcuNTQ5OSA5Ny4wNTI3IDU3LjUxMjQgMTA3LjE1MSA2My45Mzc5IDEwNy4wNTFIMTE5LjM1NUMxMjIuMDgxIDEwNy4wNTEgMTI0LjI4MSAxMDQuODMzIDEyNC4yODEgMTAyLjEwMkMxMjQuMjkzIDk5LjM3MDUgMTIyLjA4MSA5Ny4xNDA0IDExOS4zNTUgOTcuMTQwNEg2My45Mzc5Wk02My45Mzc5IDExNC4zMDVDNTcuNTYyNCAxMTQuMjE3IDU3LjUxMjQgMTI0LjI3OCA2My45Mzc5IDEyNC4xOUgxNDQuNjdDMTQ3LjM5NSAxMjQuMTkgMTQ5LjU5NiAxMjEuOTcyIDE0OS41OTYgMTE5LjI1NEMxNDkuNTk2IDExNi41MjIgMTQ3LjM4MyAxMTQuMzE3IDE0NC42NyAxMTQuMzE3SDYzLjkzNzlWMTE0LjMwNVpNMTk0LjA3NSAxNzYuOTk5QzIwMC40NzUgMTc3LjA4NyAyMDAuNDg4IDE2Ny4wMDEgMTk0LjA3NSAxNjcuMDg5SDE2MC4yODRDMTUzLjg1OCAxNjYuOTc2IDE1My44NDYgMTc3LjExMiAxNjAuMjg0IDE3Ni45OTlIMTk0LjA3NVpNMTQ0LjIyIDE3Ni45OTlDMTUwLjU5NiAxNzcuMDg3IDE1MC42MzMgMTY3LjAwMSAxNDQuMjIgMTY3LjA4OUg2My45MjU0QzYxLjIxMjcgMTY3LjEwMSA1OSAxNjkuMzA2IDU5IDE3Mi4wMzhDNTkgMTc0Ljc4MSA2MS4yMDAyIDE3Ni45OTkgNjMuOTI1NCAxNzYuOTk5SDE0NC4yMlpNMTk0LjA3NSAxNTkuODZDMjAwLjQ2MyAxNTkuOTQ3IDIwMC41IDE0OS44NDkgMTk0LjA3NSAxNDkuOTQ5SDEzOC42NTdDMTM1LjkzMiAxNDkuOTQ5IDEzMy43MzIgMTUyLjE2NyAxMzMuNzMyIDE1NC44OThDMTMzLjcxOSAxNTcuNjMgMTM1LjkzMiAxNTkuODYgMTM4LjY1NyAxNTkuODZIMTk0LjA3NVpNMTk0LjA3NSAxNDIuNjk1QzIwMC40NSAxNDIuNzgzIDIwMC41IDEzMi43MjIgMTk0LjA3NSAxMzIuODFIMTEzLjM0MkMxMTAuNjE3IDEzMi44MSAxMDguNDE3IDEzNS4wMjggMTA4LjQxNyAxMzcuNzQ2QzEwOC40MTcgMTQwLjQ3OCAxMTAuNjMgMTQyLjY4MyAxMTMuMzQyIDE0Mi42ODNIMTk0LjA3NVYxNDIuNjk1WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzM5Nl8yOTcpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzk2XzI5NyIgeDE9IjU5IiB5MT0iMTI4LjUiIHgyPSIyMDIuMjMzIiB5Mj0iMTQxLjU2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMDYiIHN0b3AtY29sb3I9IiM0MDU5RDAiLz4KPHN0b3Agb2Zmc2V0PSIwLjU1NSIgc3RvcC1jb2xvcj0iI0NDNThCQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGNEI1N0YiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K">
    </a>
</p>

<p align="center">
    <strong>Easily add content to your Screenly digital signage displays in a few clicks. :sparkles:</strong>
</p>

## :seedling: Install

* Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/save-to-screenly/kcoehkngnbhlmdcgcadliaadlmbjmcln).

## :computer: Develop

The extension is built using [webpack](https://webpack.js.org/).

```bash
$ docker compose up --build
```

Now load the content of the `dist/` folder as an unpacked extension in Chrome. As you make changes to the code, the extension is automatically rebuilt.

### Distribute

```bash
$ VERSION=<EXTENSION_VERSION> ./bin/package_extension.sh
```

## :test_tube: Run Unit Tests

```bash
$ ./bin/run_tests.sh
```

* Build the extension in dev mode.
* Load the extension as an unpacked extension from the `dist` folder.
* Find the extension URL and then open `chrome-extension://extension-id/test/tests.html` in Chrome.

## :rocket: Release

* Generate a new release tag in `git`:

```bash
$ git pull
$ git checkout master
$ git tag
[...]
$ git tag -a vX.Y.Z -m "tl;dr changelog."
$ git push origin vX.Y.Z
```
* Navigate to the [GitHub releases](https://github.com/Screenly/Chrome-Extension/releases) and click 'Draft a new release'.
* Select the tag you just created above and provide a release title and description.
  * You can use `git diff v0.2.0..v0.3.0` to diff between the current and previous release to help you with the changelog.
* Go to the [CI Job](https://github.com/Screenly/Chrome-Extension/actions/workflows/build.yaml) and pull down the release `.zip` file for the release you created.
  * You can verify the `.zip` file you downloaded with the GitHub CLI by running `gh attestation verify path/to/release.zip --owner Screenly`.
* Navigate to [Chrome Web Store Developer Dashboard](https://chrome.google.com/u/1/webstore/devconsole/).
* Select the right publisher account and upload the `.zip` file you downloaded before.

