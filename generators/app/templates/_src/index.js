import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const Module = require('./App');

let settings = {
  sitesUrl: 'http://localhost:3001',
};

if (window.location.hostname === 'localhost') {
  settings = {
    sitesUrl: 'http://localhost:3001',
  };
}

ReactDOM.render(
  <Module.App settings={settings} />
  , document.querySelector('[component="app"]')
);
