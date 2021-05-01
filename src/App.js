import React, { Component } from 'react'
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    })
  }

  calculateFaceLocations = data => {
    return data.outputs.[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputimage')
      const width =  Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
    });
  }

  displayFaceBox = boxes => {
    this.setState({ boxes });
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onButtonSubmit = (e) => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://smart-brain-api-cdh.herokuapp.com/imageurl',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        input: this.state.input,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://smart-brain-api-cdh.herokuapp.com/image',
          {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(res => res.json())
          .then(count => this.setState({ user: {
            ...this.state.user,
            entries: count,
          }}))
          .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = route => {
    if (route === 'signin') {
      this.setState(initialState);
    } else if ( route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  }

  render() {
    const { imageUrl, boxes, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                imageUrl={imageUrl}
                boxes={boxes}
              />
            </div>
          : (
            route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
        }
      </div>
    );
  }
}

export default App;
