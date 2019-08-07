import React from 'react';
import apiKey from './config.js';
import {Route, Redirect, Switch} from 'react-router-dom';
import Nav from './Nav';

class App extends React.Component {

  state = {
    buttonA: [],
    buttonB: [],
    buttonC: [],
    search: [],
    loading: true
  }
}

export default App;
