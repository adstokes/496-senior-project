import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";




function App()  {


  return (


<div>
 <BrowserRouter>

   <Switch>

      <Route path='/' exact component={CreateAccount} />
      <Route path='/SignIn' component={SignIn} />





  </Switch>
</BrowserRouter>
 </div>


  );
}

export default App;

