import React, { useState, useEffect } from 'react';
import "./CreatePage.css";
import { Button } from './Button';




function CreatePage (){

const [button, setButton] = useState(true);


    return(
        <>
        <div className="Create-Container">
           <label for="fname"><b>First Name</b></label>
            <input type="text" placeholder="Enter Firstname" name="fname" required/><br/>
             <label for="lname"><b>Last Name</b></label>
            <input type="text" placeholder="Enter Lastname" name="lname" required/><br/>
             <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Create a Username" name="uname" required/><br/>
             <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter a Valid Email" name="email" required/><br/>
             <label for="pword1"><b>Password</b></label>
            <input type="text" placeholder="Create a Password" name="pword1" required/><br/>
            <label for="pword2"><b>Re-enter Password</b></label>
            <input type="text" placeholder="Re-enter Password" name="pword2" required/><br/>
            {button && <Button type="submit" buttonStyle='btn--outline'>Create Account</Button>}
        </div>
        </>
    )
}

export default CreatePage;