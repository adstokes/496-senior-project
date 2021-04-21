import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import {StateProvider} from './components/StateProvider';
import reducer, {initialState} from "./reducer";


import App from './App';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
<BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
