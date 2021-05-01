import React, { useState } from 'react';
import "./SignIn.css";
import { Link } from 'react-router-dom';


function SignIn (){

    return(
        <>
      <div className="SignIn-Container">

            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/><br/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/><br/>

            <button type="button">SignIn</button>
                                      <Link to='/'>
                CreateAccount
              </Link>


         </div>
        </>
    )
}

export default SignIn;