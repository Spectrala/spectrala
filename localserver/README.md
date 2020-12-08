# Local Server

## Building

Requires Python3.8 or greater

Setup:

```sh
cd localserver
python3.8 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Development:

```sh
python main.py
```

Building Pyinstaller:

```sh
cd $ROOT
python build.py
# check the ./dist folder
```
