import sys
import logging
import webbrowser
from pathlib import Path

import tkinter as tk
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


def open_in_browser(*args, **kwargs):
    preferred_browser().open(
        config.LOCAL_BASE_URL, new=config.BROWSER_NEW_BEHAVIOR, autoraise=True
    )


RUNNING_MESSAGE = """\
Spectrala is running locally.
You can open it in your browser at the URL

\t{}

Alternatively, press the button below.
Google Chrome or a Chromium derivative is preferred.
Keep this window open while you are using Spectrala.\
""".format(
    config.LOCAL_BASE_URL
)


class Application(tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.master = master
        self.pack()
        self.create_widgets()
        self.grid(padx=20)

    def create_widgets(self):
        self.text = tk.Text(
            self,
            width=max(map(len, RUNNING_MESSAGE.splitlines())),
            height=RUNNING_MESSAGE.count("\n") + 1,
        )
        self.text.insert("1.0", RUNNING_MESSAGE)
        self.text.tag_configure("big", font=("Verdana", 24, "bold"))
        self.text.grid(row=0, column=0, pady=10)

        self.open_btn = tk.Button(self)
        self.open_btn["text"] = "Open in Browser"
        self.open_btn["command"] = open_in_browser
        self.open_btn.grid(row=1, column=0, pady=10)


def block_on_gui():
    root = tk.Tk()
    root.title("Spectrala")
    app = Application(master=root)
    app.mainloop()


class ServerRoot:
    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect("/index.html")


def main(args, dir_root=None):
    static_dir = config.RESOURCE_DIR / "static"

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
    # cherrypy.engine.block()  # We block on the GUI thread below, so we exit when the window exits.
    block_on_gui()
    cherrypy.engine.stop()  # Exit webserver cleanly
    cherrypy.engine.exit()  # Required for clean exit when running as a pyinst bundle
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[0:]))
