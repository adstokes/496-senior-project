import React from "react"



export default function Playlist({ playlists, choosePlaylist }) {
//when a playlist is selected return the playlist id
  function handlePlaylist() {
    choosePlaylist(playlists.id)
    console.log(playlists.id)
  }

  return (
  //when a playlist is clicked call handle playlist
    <div onClick={handlePlaylist}>
        <p>{playlists.id}</p>
    </div>
  )
}