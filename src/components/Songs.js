import React from 'react';
import "./Songs.css";

function Songs ({ track, chooseTrack }){
  function handlePlay() {
    chooseTrack(track)
  }

  return (
      <div className="" onClick={handlePlay}
    >
  <div className="song-list">
    <img className="song-cover" src={track.album.images[0].url} alt=""/>
    <div className="song-info">
        <h1>{track.name}</h1>
        <p>
        {track.artists.map((artist) => artist.name).join(", ")} -{" "}
        {track.album.name}
        </p>
    </div>
  </div>
  </div>

  );
}

export default Songs;
