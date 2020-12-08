#!/usr/bin/env sh

# The CLI interface to pyinstaller is more stable and cross platform
# than spec files, while being adequate for our purposes.

exec pyinstaller \
    --noconfirm \
    --onefile \
    --windowed \
    --name=spectrala \
    --add-data=static:static \
    --icon=static/favicon.icns \
    main.py
