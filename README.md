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

On Windows, equivalent steps must be carried out such that you have a Python3.8 install at `python` with dependencies satisfied, and `pyinstaller` in the `PATH`.

Build the redistributable app:

```sh
cd $ROOT
python build.py
```

The redistributable app is now at `dist/spectrala`. It should be runnable as normal on your platform.

## Copyright

Copyright all rights reserved.
