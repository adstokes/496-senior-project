class Genre:
    """Sets values for genre in json resonse"""
    def __init__(self, genres):
        self.genres = genres


    def create_spotify_uri(self):
        return f"spotify:{self.genres}"

    def __str__(self):
        return self.genres