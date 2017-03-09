import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { browserHistory } from 'react-router';

import Routes from "./routes.jsx";

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
