import React, { Component } from 'react';


// import logo from './logo.svg';
import './style.css';

import PhotoColumn from "../PhotoColumn";



class App extends Component {
  constructor(props) {
    super(props);
    this.colors=["red","black","white", "orange", "yellow", "green", "blue","indigo", "violet" ];

    this.colors.forEach((c) => {
      this.setState({[c]:[]});
    })


    // this.colors=["red", "yellow", "blue"];
  }
  getPhotos(query, callback) {
    console.log("flickr query" + query);
    fetch('/flickr/' + query)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(data) {
      console.log("Gotit!");
      callback(data.photos);
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  getPhotoByColor(query, color) {
    console.log("get photos by color");
    this.getPhotos(color+  "," + query, (photos) => {
      console.log(photos);
      this.setState({[color]:photos.photo})
    });
  }

  componentDidMount() {
    return this.colors.forEach((c) => {
      this.getPhotoByColor("", c);
    });
  }

  onSearch(event) {
    if (event.key !== 'Enter') {
      return;
    }
    console.log(event.target.value);
    this.colors.forEach((c) => {
      this.getPhotoByColor(event.target.value, c)
    });
  }

  renderPhotoColumns() {
    return this.colors.map((c) => {
      return this.state && this.state[c] ?
        <PhotoColumn
          key={c}
          photos={this.state[c].slice(0,10)}
        ></PhotoColumn>
      : "";
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Flickr Rainbow</h1>
          <div>
          <div className="row">
            <div className="col-md-8 col-xs-12">
              <div className="instructions">
                <p>Search for a term and we will give you a beautiful rainbow</p>
              </div>
            </div>

            <div className="col-md-4 col-xs-6">
              <div className="pull-right">By <a href="http://johnguerra.co">John Alexis Guerra Gómez</a></div>
            </div>
          </div>

          </div>
          <br/>

          <div className="row">
            <div className="col-md-6">
              <input id="searchQuery" className="form-control" placeholder="Enter a concept and press enter" type="text" onKeyPress={this.onSearch.bind(this)}/>
            </div>
          </div>


          <br/>
          <div>
            {this.renderPhotoColumns()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
