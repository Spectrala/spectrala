import sys
import logging
import webbrowser
from pathlib import Path

import wx
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


def open_in_browser():
    preferred_browser().open(
        config.LOCAL_BASE_URL, new=config.BROWSER_NEW_BEHAVIOR, autoraise=True
    )


RUNNING_MESSAGE = """\
Spectrala is running locally.
You can open it in your browser at
'{}'
or press the button below.
Google Chrome or a Chromium derivative is preferred.
Keep this window open while you are using Spectrala.\
""".format(
    config.LOCAL_BASE_URL
)


class MainFrame(wx.Frame):
    def __init__(self, parent, title):
        wx.Frame.__init__(self, parent, title=title)

        self.CreateStatusBar()

        # Now create the Panel to put the other controls on.
        panel = wx.Panel(self)

        # and a few controls
        text = wx.StaticText(panel, label=RUNNING_MESSAGE)
        browser_btn = wx.Button(panel, label="Open in Browser")

        # bind the button events to handlers
        self.Bind(wx.EVT_BUTTON, self.OpenInBrowser, browser_btn)

        # Use a sizer to layout the controls, stacked vertically and with
        # a 10 pixel border around each
        sizer = wx.BoxSizer(wx.VERTICAL)
        sizer.Add(text, 0, wx.ALL, 10)
        sizer.Add(browser_btn, 0, wx.ALL, 10)
        panel.SetSizer(sizer)
        panel.Layout()

    def OpenInBrowser(self, evt):
        open_in_browser()


class MainApp(wx.App):
    def OnInit(self):
        frame = MainFrame(None, "Spectrala")
        self.SetTopWindow(frame)
        frame.Show(True)
        return True


class ServerRoot:
    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect("/index.html")


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
    # cherrypy.engine.block()  # We block on the GUI thread below, so we exit when the window exits.
    app = MainApp(redirect=False)
    app.MainLoop()
    cherrypy.engine.stop()  # Exit webserver cleanly
    cherrypy.engine.exit()  # Required for clean exit when running as a pyinst bundle
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[0:], Path(sys.argv[0]).parent))
