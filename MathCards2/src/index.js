import React from 'react';
import ReactDOM from 'react-dom';
import Cards from './Cards';
import './index.css';

ReactDOM.render(
  <Cards horizTable="true"/>,
  // <Cards twooverone="true" multiplicationOnly="true" />,
  // <Cards />,
  document.getElementById('root')
);
