import os

from spotifyclient import SpotifyClient



def main():
    """main class for backend"""
    """set spotify credentials"""
    spotify_client = SpotifyClient(os.getenv("SPOTIFY_AUTHORIZATION_TOKEN"),
                                   os.getenv("SPOTIFY_USER_ID"))

    """List of moods"""
    moods = ['Happy', 'Sad', 'Relaxed', 'Energetic','Party','Emotional','Sleepy','Focused','Fitness','Motivation']
    print("\n".join(moods))
    """Prompt user to enter mood"""
    user_mood = input("Enter a mood from the above list: ")

    """Prompt user to search for artist, search until user types quit, return artists selected"""
    u_i = input("Search for an artist: ")
    while u_i != 'quit':
        artists = spotify_client.search_spotify(q=u_i)
        for i, artist in enumerate(artists):
            print(f"{i + 1}- {artist}")
        indexes = input("\nEnter a list of up to 5 artists you'd like to use as seeds. Enter the number of the artist followed by a space: ")
        indexes = indexes.split()
        seed_artist = [artists[int(index) - 1] for index in indexes]
        u_i = input("Search for an artist: ")

    """set list of genres"""
    genres = spotify_client.get_genres()
    for i, genre in enumerate(genres):
        print(f"{i+1}- {genre}")

    """promt user to enter genres"""
    indexes = input("\nEnter a list of up to 5 genres you'd like to use as seeds. Enter the number of the genre followed by a space: ")
    indexes = indexes.split()
    """return the genres selected"""
    seed_genres = [genres[int(index)-1] for index in indexes]

    """Takes user input(mood, artists, genres) and creates playlist"""
    recommended_genres = spotify_client.get_track_recommendations2(seed_genres, seed_artist, user_mood)
    print(f"\nHere are the recommended tracks which will be included in your new playlist based on your mood ({user_mood}), selected genres({seed_genres}),"
          f"and you're selected artists({seed_artist}):")
    """list songs"""
    for index, track in enumerate(recommended_genres):
        print(f"{index+1}- {track}")

    """Prompts user to name playlist"""
    playlist_name = input("\nWhat's the playlist name? ")
    playlist = spotify_client.create_playlist(playlist_name)
    print(f"\nPlaylist '{playlist.name}' was created successfully.")

    """Creates playlist"""
    spotify_client.populate_playlist(playlist, recommended_genres)
    print(f"\n Your Tuneder generated playlist... ENJOY!!  '{playlist.name}'.")

    """gets last 15 traks user listened to on spotify"""
    num_tracks_to_visualise = 15;
    last_played_tracks = spotify_client.get_last_played_tracks(num_tracks_to_visualise)

    """prints the last 15 songs"""
    print(f"\nHere are the last {num_tracks_to_visualise} tracks you listened to on Spotify:")
    for index, track in enumerate(last_played_tracks):
        print(f"{index+1}- {track}")

    """Promts user to enter 5 songs from the list as seeds"""
    indexes = input("\nEnter a list of up to 5 tracks you'd like to use as seeds. Enter the number of the track followed by a space: ")
    indexes = indexes.split()
    seed_tracks = [last_played_tracks[int(index)-1] for index in indexes]

    """gets list of recommended tracks and prints to user"""
    recommended_tracks = spotify_client.get_track_recommendations(seed_tracks)
    print("\nHere are the recommended tracks which will be included in your new playlist:")
    for index, track in enumerate(recommended_tracks):
        print(f"{index+1}- {track}")

    """Promts user for playlist name"""
    playlist_name = input("\nWhat's the playlist name? ")
    playlist = spotify_client.create_playlist(playlist_name)
    print(f"\nPlaylist '{playlist.name}' was created successfully.")

    """create playlist"""
    spotify_client.populate_playlist(playlist, recommended_tracks)
    print(f"\n Your Tuneder generated playlist... ENJOY!!  '{playlist.name}'.")


if __name__ == "__main__":
    main()