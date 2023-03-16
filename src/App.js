import React, {Component} from 'react';
import {Router ,Route} from "react-router-dom";
import HomeScreen from "./view/Home";

class App extends Component {
  render() {
    return (
        <HomeScreen />
    );
  }
}

export default App;
