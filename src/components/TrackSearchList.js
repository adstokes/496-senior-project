import React from "react"
import "./TrackSearchList.css";


export default function TrackSearchList({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className="list-container" onClick={handlePlay}>
        <img src={track.albumCover} alt="no"/>

      <div className="list-info">
        <h1>{track.title}</h1>
        <p>{track.artist}</p>
      </div>
    </div>
  )
}