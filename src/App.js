import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ListenPage from "./ListenPage";
import CreateAccount from "./components/CreateAccount";
import SignIn from "./components/SignIn";
import './App.css';
import Login from "./Login";
import {getTokenFromResponse} from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./components/StateProvider";
import SearchPage from "./components/SearchPage";
import Content from "./components/Content";



const spotify = new SpotifyWebApi();

function App()  {

const [{ token }, dispatch] = useStateValue();


useEffect(() => {
    const hash = getTokenFromResponse();
     window.location.hash = "";
     let _token = hash.access_token;

    if (_token) {
   spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      spotify.searchTracks().then((search) => {

        dispatch({
            type: "SEARCH_SPOTIFY",
            search: search,
        });
      });

       spotify.getPlaylist("37i9dQZEVXcDi6dCC3p2to").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

}


}, [token, dispatch]);
  return (


<div>
{!token &&<Login />}
{token && <BrowserRouter>
      <Navbar />
   <Switch>

      <Route path='/' exact component={Homepage} />
      <Route path='/ListenPage'ListenPage component={ListenPage} spotify={spotify}/>
      <Route path='/CreateAccount' exact component={CreateAccount} />
      <Route path='/SignIn' component={SignIn} />
      <Route path='/SearchPage' component={SearchPage}/>
      <Route path='/Content' spotify={spotify} component={Content} />
      <Route path='/SearchPage' spotify={spotify} component={SearchPage} />





  </Switch>
</BrowserRouter>}
 </div>


  );
}

export default App;
