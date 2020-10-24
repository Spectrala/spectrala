# Spectrala

## Development

Right now, most development can be done as one would a normal react app in the `spectrala` directory. Our distributable is basically a user-friendly python webserver.

## Building the full app

Pyinstaller requires that builds be done on the same platform, i.e. Linux builds be done on Linux, MacOS on MacOS, and Windows on Windows.

We use Python 3.8. Ensure that you have an installation that includes venv and pip.

Install dependencies:

```sh
python3.8 -m venv .venv
source .venv/bin/activate
python -m pip install -r localserver/requirements.txt

cd spectrala
yarn install
```

Build the redistributable app:

```sh
make
```

The redistributable folder is now at `dist/spectrala`. It should be runnable as `./dist/spectrala/spectrala`.

## Copyright

Copyright all rights reserved.
