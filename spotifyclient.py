import json

import requests
from Category import Category
from track import Track
from playlist import Playlist
from artist import Artist



class SpotifyClient:
    """Responsible for spotify requests"""

    """sets user id and token"""
    def __init__(self, authorization_token, user_id):
        self._authorization_token = authorization_token
        self._user_id = user_id

    """Get request for genres and json breakdown"""
    def get_genres(self):
        url = f"https://api.spotify.com/v1/recommendations/available-genre-seeds"
        response = self._place_get_api_request(url)
        response_json = response.json()
        itemlist = [response_json["genres"]]
        firstItem = itemlist[0]
        genres = []
        for i in firstItem:
            genres.append(i)
        return genres

    """Get request to search and json breakdown"""
    def search_spotify(self, q):
        url = f"https://api.spotify.com/v1/search?q={q}&type=artist"
        response = self._place_get_api_request(url)
        response_json = response.json()
        itemslist = [response_json["artists"]["items"]]
        firstItem = itemslist[0]
        artist = []
        for i in firstItem:
            artist.append(Artist(i["name"], i["id"], i["type"]))
        return artist

    """Get request for last played tracks and json breakdown"""
    def get_last_played_tracks(self, limit=10):
        url = f"https://api.spotify.com/v1/me/player/recently-played?limit={limit}"
        response = self._place_get_api_request(url)
        response_json = response.json()
        tracks = [Track(track["track"]["name"], track["track"]["id"], track["track"]["artists"][0]["name"]) for
                 track in response_json["items"]]
        return tracks

    """Get request for track recommendations based on mood, artist, genre and json breakdown"""
    def get_track_recommendations2(self, genres, artists, mood, limit=40):
        genre_url = ""
        for genre in genres:
            genre_url += genre + ","
        genre_url = genre_url[:-1]

        artist_url = ""
        for artist in artists:
            artist_url += artist.id + ","
        artist_url = artist_url[:-1]
        """set audio features for tracks based on mood"""
        if mood == "Happy":
            target_tempo = 150
            target_acousticness = .75
            target_danceability = .81
            target_energy = .90
            target_valence = .82
            target_speechiness = .60
            target_instrumentalness = .72
            print("mood is happy \n")
        elif mood == "Sad":
            target_tempo = 90
            target_acousticness = .45
            target_danceability = .21
            target_energy = .32
            target_valence = .22
            target_speechiness = .47
            target_instrumentalness = .42
            print("Mood is Sad")
        elif mood == "Relaxed":
            target_tempo = 70
            target_acousticness = .35
            target_danceability = .15
            target_energy = .22
            target_valence = .20
            target_speechiness = .29
            target_instrumentalness = .62
            print("mood is relaxes")
        elif mood == "Energetic":
            target_tempo = 160
            target_acousticness = .65
            target_danceability = .85
            target_energy = .87
            target_valence = .81
            target_speechiness = .59
            target_instrumentalness = .72
            print("mood is Energetic")
        elif mood == "Party":
            target_tempo = 146
            target_acousticness = .67
            target_danceability = .81
            target_energy = .79
            target_valence = .823
            target_speechiness = .76
            target_instrumentalness = .82
            print("mood is Party")
        elif mood == "Emotional":
            target_tempo = 82
            target_acousticness = .47
            target_danceability = .33
            target_energy = .29
            target_valence = .17
            target_speechiness = .47
            target_instrumentalness = .52
            print("mood is Emotional")
        elif mood == "Sleepy":
            target_tempo = 70
            target_acousticness = .21
            target_danceability = .15
            target_energy = .22
            target_valence = .17
            target_speechiness = .09
            target_instrumentalness = .43
            print("mood is Sleepy")
        elif mood == "Focused":
            target_tempo = 76
            target_acousticness = .31
            target_danceability = .19
            target_energy = .22
            target_valence = .21
            target_speechiness = .16
            target_instrumentalness = .52
            print("mood is Focused")
        elif mood == "Fitness":
            target_tempo = 130
            target_acousticness = .64
            target_danceability = .76
            target_energy = .83
            target_valence = .753
            target_speechiness = .69
            target_instrumentalness = .82
            print("Mood is Fitness")
        elif mood == "Motivation":
            target_tempo = 130
            target_acousticness = .64
            target_danceability = .76
            target_energy = .83
            target_valence = .753
            target_speechiness = .79
            target_instrumentalness = .82
            print("mood is motivation")
        url = f"https://api.spotify.com/v1/recommendations?seed_genres={genre_url}&seed_artists={artist_url}&limit={limit}&target_tempo={target_tempo}" \
              f"&target_acousticness={target_acousticness}&target_danceability={target_danceability}&target_energy={target_energy}&target_valence={target_valence}&" \
              f"target_speechiness={target_speechiness}&target_instrumentalness={target_instrumentalness}"
        response = self._place_get_api_request(url)
        response_json = response.json()
        tracks = [Track(track["name"], track["id"], track["artists"][0]["name"]) for
                  track in response_json["tracks"]]
        return tracks

    """Get request for track recommendations for last played tracks and json breakdown"""
    def get_track_recommendations(self, seed_tracks, limit=40):
        seed_tracks_url = ""
        for seed_track in seed_tracks:
            seed_tracks_url += seed_track.id + ","
        seed_tracks_url = seed_tracks_url[:-1]
        url = f"https://api.spotify.com/v1/recommendations?seed_tracks={seed_tracks_url}&limit={limit}"
        response = self._place_get_api_request(url)
        response_json = response.json()
        tracks = [Track(track["name"], track["id"], track["artists"][0]["name"]) for
                  track in response_json["tracks"]]
        return tracks
    """creates playlist in spotify"""
    def create_playlist(self, name):
        data = json.dumps({
            "name": name,
            "description": "Your Tuneder recommend playlist... Enjoy!",
            "public": True
        })
        url = f"https://api.spotify.com/v1/users/{self._user_id}/playlists"
        response = self._place_post_api_request(url, data)
        response_json = response.json()

        # create playlist
        playlist_id = response_json["id"]
        playlist = Playlist(name, playlist_id)
        return playlist

    """populate playlists in spotify"""
    def populate_playlist(self, playlist, tracks):
        track_uris = [track.create_spotify_uri() for track in tracks]
        data = json.dumps(track_uris)
        url = f"https://api.spotify.com/v1/playlists/{playlist.id}/tracks"
        response = self._place_post_api_request(url, data)
        response_json = response.json()
        return response_json
    """api request"""
    def _place_get_api_request(self, url):
        response = requests.get(
            url,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self._authorization_token}"
            }
        )
        return response
    """api post"""
    def _place_post_api_request(self, url, data):
        response = requests.post(
            url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self._authorization_token}"
            }
        )
        return response



