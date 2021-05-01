import React from 'react';
import "./components/ListenPage.css";
import SideBar from "./components/SideBar";
import Content from "./components/Content";


function ListenPage({spotify}){

  return (
  <div className="listen">
  <div className='listen-container'>
    <SideBar />
    <Content />
</div>
</div>

  );
}

export default ListenPage;
