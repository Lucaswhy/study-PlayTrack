import React from 'react';
import ReactDOM from 'react-dom';
import LeftMenu from './components/LeftMenu';
import Player from './components/Player';
import reportWebVitals from './reportWebVitals';
import './assets/css/App.css'

ReactDOM.render(
  <React.StrictMode>
    <LeftMenu />
    <Player />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
