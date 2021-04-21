import React from 'react';
import "./Header.css";
import { useStateValue } from "./StateProvider";
import Avatar from 'react-avatar';

function Header(){

const [{user}] = useStateValue();



  return (
  <div>
  <div className="header-container">
  <div className="head-left">
  </div>
  <div className="head-right">
         <Avatar src={user?.images[0].url} size="80" style={{marginRight: '15px'}}  round={true}/>
        <h4>{user?.display_name}</h4>
  </div>
  </div>


</div>
  );
}

export default Header;