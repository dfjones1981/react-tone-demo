import React, { Component } from 'react';
import './App.css';
import Oscillator from './oscillator';

// import SineWave from './other/SineWave';

class App extends Component {

  oscillator = new Oscillator();

  state = {
    isPlaying: false,
    pitch: 0.5,
    volume: 0.25
  }

  play = () => {
    this.setState({ isPlaying: true});
  }

  stop = () => {
    this.setState({ isPlaying: false})
  }

  changeTone = (event) => {
    const { clientX, clientY } = event;
    const { top, right, bottom, left } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    
    this.setState({ pitch, volume});
  }

  render() {
    return <div className="App">
      <div className="theremin"
        onMouseEnter={this.play}
        onMouseLeave={this.stop}
        onMouseMove={this.changeTone} />
     
      <div className="label volume">◀ volume ▶</div>
      <div className="label pitch">◀ pitch ▶</div>
    </div>;
        
    
  }
}

export default App;
