// IMPORTING FROM REACT AND OTHER FILES

import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import NotFound from './NotFound';
import Gallery from './photos/Gallery';
import apiKey from '../config.js';
import '../index.css';

class App extends React.Component {
 
  // INITIALLY SETTING STATES TO EMPTY ARRAY
  state = {
    button1: [],
    button2: [],
    button3: [],
    search: [],
    loading: true
  }

  // ORIGINAL 3 BUTTONS DISPLAYING 3 DIFFERENT SEARCH OPTIONS
  defaultButtons = ["Dogs", "Sunsets", "Roller Coasters"];

   // CREATING URL FOR EACH PHOTO FETCHED
  handlePhotoResponse(searchName, imageData) {
    const photoArray = imageData.photos.photo.map((photo) => {
        return ({
            id: photo.id,
            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
          })
    });

    this.setState({
      [searchName]: photoArray,
      loading: false
    })
  }

   // MAKING 3 API CALLS FOR DEFAULT BUTTONS AND SAVING THE STATE OF PICTURES RETURNED
  defaultSearch = () => {
    let queries = [];
    const apiRequests = [];

    // LOADING PAGE SHOWS WHILE PHOTOS ARE BEING FETCHED
    this.setState({ loading: true }); 
    queries = this.defaultButtons.map(term => encodeURIComponent(term));

    for (let i = 0; i < queries.length; i++) {
      apiRequests[i] = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${queries[i]}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json());
    }

    Promise.all([apiRequests[0], apiRequests[1], apiRequests[2]])
      .then(responseData => {
        for (let i = 0; i < queries.length; i++) {
          this.handlePhotoResponse(('button' + (i + 1)), responseData[i]);
        }
      })
      .catch((error) => {
        console.log("Error retrieving photos from Flickr:", error);
      });
  }

   // MAKING API CALL FOR THE SEARCH INPUT AND SAVING STATE OF PICTURES RETURNED
  searchFormSearch = (query) => {
    // LOADING PAGE SHOWS WHILE PHOTOS ARE BEING FETCHED
    this.setState({ loading: true }); 

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${encodeURIComponent(query)}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.handlePhotoResponse('search', responseData);
    })
    .catch((error) => {
      console.log("Error retrieving photos from Flickr:", error);
    });
  }

  performSearch = (query = 'initial setup') => {
    if (query === 'initial setup') {
      this.defaultSearch();
    } else {
      this.searchFormSearch(query);
      if (this.state.button1.length < 1) {
        this.defaultSearch();
      }
    }
  }



  // INITIAL SEARCH WHEN SITE LOADS
  componentDidMount() {
    const thisPath = this.props.location.pathname;
    const query = (thisPath.indexOf('/search/') > -1) ? thisPath.replace('/search/', '') : 'initial setup';
    this.performSearch(query);
  }

  // NEW API REQUESTI IF BACK OR FORWARD BUTTON PRESSED
  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;
    const thisPath = this.props.location.pathname;
    
    if (thisPath.indexOf('/search/') > -1) {
      if (thisPath !== prevPath) {
        const query = thisPath.replace('/search/', '')
        this.performSearch(query);
      }
    }
  }
  // RENDERING HEADER WITH BUTTONS AND SEARCH
  render () {
    return (
      <div className="container">
        <Route
          render={ (props) => <Header {...props} 
                    buttonText={this.initialSearchTerms} 
                    search={this.performSearch} 
        />} />
        <Route
          render={ () => <Nav buttonText={this.initialSearchTerms} />} />
        <Route exact path='/' 
          render={ () => <Redirect to="/button1" />} />
        <Switch>  
          <Route path="/button1" 
              render={ () => <Gallery gallery={this.state.button1} loading={this.state.loading} /> } />
          <Route path="/button2" 
              render={ () => <Gallery gallery={this.state.button2} loading={this.state.loading} /> } />
          <Route path="/button3" 
              render={ () => <Gallery gallery={this.state.button3} loading={this.state.loading} /> } />
          <Route path="/search/:searchTerm"
              render={ () => <Gallery gallery={this.state.search} loading={this.state.loading} /> } />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }

}

export default App;
