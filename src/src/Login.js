import React, { useState, useEffect } from 'react';
import "./Login.css";
import {loginUrl} from './components/spotify';



function Login(){
const [currentTime, setCurrentTime] = useState(1);
useEffect(() =>{
    fetch('/follow').then(response => response.json()).then(data => {
    console.log(data)
        setCurrentTime(data.time);
    });
}, []);
    return(
        <div className="login-container">
        <h2>Login in with spotify</h2>
        <a href={loginUrl}><h3>Login</h3></a>
        <p>time{currentTime}</p>
        </div>
    )
}

export default Login;