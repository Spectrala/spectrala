import os
import sys
from pathlib import Path

_ENV = os.environ.get("ENV")
# Set dev mode if mark_dev is present. This marker file isn't packaged by pyinstaller.
if not _ENV and (Path(__file__).parent / "mark_dev").exists():
    _ENV = "dev"


def is_dev():
    return _ENV == "dev"


def is_prod():
    return not is_dev()


def is_pyinst_bundled():
    return getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS")


BIND_ADDR = "0.0.0.0"  # Listen on local network as well as loopback
BIND_PORT = 9559
LOCAL_BASE_URL = "http://" + "127.0.0.1" + ":" + str(BIND_PORT)

if is_dev():
    CHERRYPY_ENVIRONMENT = None  # Debug
else:
    if is_pyinst_bundled():
        CHERRYPY_ENVIRONMENT = "embedded"
    else:
        CHERRYPY_ENVIRONMENT = "production"

if is_dev():
    BROWSER_NEW_BEHAVIOR = 2  # new tab
else:
    BROWSER_NEW_BEHAVIOR = 1  # new window

if is_pyinst_bundled():
    RESOURCE_DIR = Path(sys._MEIPASS)
else:
    RESOURCE_DIR = Path(sys.argv[0]).parent
