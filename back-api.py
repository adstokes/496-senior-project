import time
from flask import Flask
from spotifyclient import SpotifyClient

"""sets routes from port 3000"""
"""create flask api"""
app = Flask(__name__)


@app.route('/follow')
def get_current_time():
    return {'time': time.time()}


@app.route('/moods')
def get_moods():
    return


