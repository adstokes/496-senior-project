import React, { useState, useEffect } from 'react';
import "./Header.css";
import { useStateValue } from "./StateProvider";
import TrackSearchList from "./TrackSearchList";
import Player from "./Player";
import "./SideBar.css";
import "./SearchPage.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import SideBarOptions from './SideBarOptions';


function SearchPage(){

const [{ token, playlists, spotify } ] = useStateValue();

const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);
console.log(searchResults);


const [playingTrack, setPlayingTrack] = useState()

 function chooseTrack(track) {
   setPlayingTrack(track)
   setSearch("")
 }



   useEffect(() => {
        if(!search) return setSearchResults([])

       let cancel = false;
        spotify.searchTracks(search).then(result =>{
       if(cancel) return
           setSearchResults(result.tracks.items.map(track =>{

        const smallestAlbumImage = track.album.images.reduce((smallest, image) =>{
            if (image.height < smallest.height) return image
                return smallest
   },       track.album.images[0])

        return{
            artist: track.artists.map((artist) => artist.name),
            title: track.name,
            uri: track.uri,
            albumCover: smallestAlbumImage.url
   }
}))
        })
            return () => cancel = true;

   },[search,spotify])


    return(
        <div className="search-container">
               <div className="sidebar-container">

                    <Link to="/SearchPage"><SideBarOptions option = "Search" /></Link>
                    <Link to="/ListenPage">< SideBarOptions option = "Library" /></Link>
                    <strong className="playlist-sb">Playlists</strong>
            <hr />
                    {playlists?.items?.map((playlist) => (
                    <SideBarOptions option={playlist.name} />
        ))}
        </div>
                <div className="content-container">
                    <Header spotify={spotify} />
                    <h1>Search</h1>
                    <input className="searchbar" placeholder="Type a song name" type="search" value={search} onChange={e => setSearch(e.target.value)}/>
                    <Player token={token} trackUri={playingTrack?.uri} />

                     {searchResults.map(track => (
                     <TrackSearchList track={track} key={track.uri} chooseTrack={chooseTrack} />
       ))}

        </div>
        </div>
    )
}

export default SearchPage;
