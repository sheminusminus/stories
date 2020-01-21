import React from 'react';
import { Provider } from 'react-redux';

import Router from './Router';

import './Main.css';

const Main = ({ store }) => (
  <Provider store={store}>
    <div className="app">
      <Router />
    </div>
  </Provider>
);

export default Main;
