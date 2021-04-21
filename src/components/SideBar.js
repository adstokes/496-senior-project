import React from 'react';
import "./SideBar.css";
import SideBarOptions from './SideBarOptions';
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";


function SideBar(){
  const [{ playlists }, ] = useStateValue();
  console.log(playlists);

    return(
        <div className="sidebar-container">

            <Link to="/SearchPage"><SideBarOptions option = "Search" /></Link>
            <Link to="/ListenPage">< SideBarOptions option = "Library" /></Link>

            <strong className="playlist-sb">Playlists</strong>
            <hr />


        {playlists?.items?.map((playlist) => (
        <SideBarOptions option={playlist.name} />
        ))}

        </div>
    )
}

export default SideBar;