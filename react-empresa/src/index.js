import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import ComprobantePrincipal from './App'

import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//<App />
reportWebVitals();
