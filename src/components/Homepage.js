import React from 'react';
import '../App.css';
import {Button} from './Button';
import './Homepage.css';



function Homepage(){
    return(
        <div className='home-container' >
        <h1>Welcome To Tuneder</h1>

        <div className="home-btns">
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                Start Listening
            </Button>
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                Create Account
            </Button>
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                Sign In
            </Button>
        </div>
        </div>
    )
}

export default Homepage;