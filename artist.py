class Artist:
    """"sets values returns for artists in json"""
    def __init__(self, name, id, type):

        self.name = name
        self.id = id
        self.type = type

    def create_spotify_uri(self):
        return f"spotify:artist:items:{self.id}"

    def __str__(self):
        return self.name