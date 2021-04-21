import React, { useState, useEffect } from 'react';
import "./Content.css";
import Header from './Header';
import { useStateValue} from "./StateProvider";
import Player from "./Player";
import Songs from "./Songs.js";


function Content({spotify}){
const [{token, discover_weekly }] = useStateValue();
const [songs, setSongs] = useState([]);
const [playingTrack, setPlayingTrack] = useState();


 function chooseTrack(track) {
   setPlayingTrack(track)

 }

    useEffect(() =>{
       setSongs(discover_weekly.tracks.items.map(track =>{
          const smallestAlbumImage = track.track.album.images.reduce((smallest, image) =>{
            if (image.height < smallest.height) return image
                return smallest
   },       track.track.album.images[0])

        return{
            artist: track.track.artists.map((artist) => artist.name),
            title: track.track.name,
            uri: track.track.uri,
            albumCover: smallestAlbumImage.url
   }
}))
    },[setPlayingTrack])

    return(
        <div className="content-container">
        <Header spotify={spotify} />

        <div className="banner-top">
        <img className="Image" src={discover_weekly?.images[0].url} alt="" />

        <div className="banner-bottom">

        <h2>{discover_weekly?.name}</h2>
         <p>{discover_weekly?.description}</p>

        </div>
        </div>
        <div className="songs">
        <div className="song-buttons">

        </div>
        <Player token={token} trackUri={playingTrack?.uri} />
        {discover_weekly?.tracks.items.map((track) => (
          <Songs spotify={spotify} track={track.track} key={track.uri} chooseTrack={chooseTrack}/>
        ))}
        </div>

        </div>
    )
}

export default Content;