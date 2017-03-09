import React, { Component } from 'react';



// import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Flickr Rainbow</h1>
          <p>Search for a term and we will give you a beautiful rainbow</p>
        </div>
      </div>
    );
  }
}

export default App;
