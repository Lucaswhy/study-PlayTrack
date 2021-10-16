import React from 'react';
import ReactDOM from 'react-dom';
import Template from './components/template';
import Player from './components/Player';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/App.css'

ReactDOM.render(
  <React.StrictMode>
    <Template/>
    <Player/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
