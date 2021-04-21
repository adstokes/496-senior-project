import React, { useState } from 'react';
import "./SignIn.css";
import { Button } from './Button';

function SignIn (){

const [button, setButton] = useState(true);
    return(
        <>
      <div className="SignIn-Container">

            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/><br/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/><br/>

             {button && <Button type="submit" buttonStyle='btn--outline'>Sign In</Button>}

         </div>
        </>
    )
}

export default SignIn;