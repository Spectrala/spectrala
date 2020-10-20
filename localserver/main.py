import sys
import logging
import webbrowser
from pathlib import Path

import cherrypy
from cherrypy._cpnative_server import CPHTTPServer

import config

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def preferred_browser():
    # Use the default browser if its a chromium
    default = webbrowser.get()
    if isinstance(default, webbrowser.Chrome) or isinstance(
        default, webbrowser.Chromium
    ):
        return default
    # otherwise look for a chromium
    for browser in ["google-chrome", "chrome", "chromium", "chromium-browser"]:
        try:
            return webbrowser.get(browser)
        except webbrowser.Error:
            pass
    # otherwise use the default browser
    return default


class ServerRoot:
    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect("/test.html")


def main(args, dir_root=None):
    if not dir_root:
        dir_root = Path(__file__).parent
    dir_root = dir_root.resolve(strict=True)
    static_dir = dir_root / "static"

    logger.info("Using static asset directory", static_dir)

    # TODO configure logging
    cherrypy.config.update(
        {
            "server.socket_host": config.BIND_ADDR,
            "server.socket_port": config.BIND_PORT,
            "environment": config.CHERRYPY_ENVIRONMENT,
        }
    )
    cherrypy.server.httpserver = CPHTTPServer(cherrypy.server)  # Disable WSGI support
    cherrypy.tree.mount(
        ServerRoot(),
        "/",
        {"/": {"tools.staticdir.on": True, "tools.staticdir.dir": str(static_dir),}},
    )
    cherrypy.engine.start()
    preferred_browser().open(
        config.LOCAL_BASE_URL, new=config.BROWSER_NEW_BEHAVIOR, autoraise=True
    )
    cherrypy.engine.block()  # This will be blocking on a small GUI thread in the future.
    # cherrypy.engine.stop() # Exit webserver cleanly
    # cherrypy.engine.exit() # Required for clean exit when running as a pyinst bundle


if __name__ == "__main__":
    main(sys.argv[0:], Path(sys.argv[0]).parent)
