from subprocess import run
from pathlib import Path
import os
import shutil
import sys
import platform


root = Path(__file__).parent
spectrala = root / "spectrala"
localserver = root / "localserver"

if "clean" in sys.argv[1:]:
    shutil.rmtree(root / "dist")
    shutil.rmtree(spectrala / "build")
    shutil.rmtree(localserver / "dist")
    shutil.rmtree(localserver / "build")
    shutil.rmtree(localserver / "static")
    for spec in localserver.glob("*.spec"):
        os.remove(spec)
    sys.exit(0)

# build production webapp
run(["yarn", "build"], cwd=spectrala, shell=True).check_returncode()

# copy production assets to build location
if (localserver / "static").exists():
    shutil.rmtree(localserver / "static")
shutil.copytree(spectrala / "build", localserver / "static")


# need colon, not semicolon on MacOS/Windows for add-data call. Is this universal?
if platform.system() == "Windows":
    icon_ext = "ico"
    add_data_separator = ":"
elif platform.system() == "Darwin":
    icon_ext = "icns"  # only MacOS uses, other platforms will ignore
    add_data_separator = ":"
else:
    icon_ext = "icns" # Assuming this works for Linux.
    add_data_separator = ";"

# build app

run(
    [
        "pyinstaller",
        "--noconfirm",
        "--onefile",
        "--windowed",
        "--name=spectrala",
        "--add-data=static" + add_data_separator + "static",
        "--icon=static/favicon." + icon_ext,
        "--osx-bundle-identifier=com.joshhejna.spectrala",
        "main.py",
    ],
    cwd=localserver,
).check_returncode()

# copy results to root
if (root / "dist").exists():
    if (root / "dist").is_file():
        os.remove(root / "dist")
    else:
        shutil.rmtree(root / "dist")
(root / "dist").mkdir(exist_ok=True)

target = localserver / "dist" / "spectrala"
if target.is_file():
    shutil.copy2(target, root / "dist")
elif target.is_dir():
    shutil.copytree(target, root / "dist")
else:
    raise ValueError()
