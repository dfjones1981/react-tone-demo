import React, { Component } from 'react';
import './App.css';
import Oscillator from './oscillator';

import SineWave from './other/SineWave';

class Tone extends Component {

  oscillator = new Oscillator();

  componentDidUpdate() {
    this.doImperativeStuff();
  }

  componentDidMount() {
    this.doImperativeStuff();
  }

  doImperativeStuff() {
    if (this.props.isPlaying) {
    this.oscillator.play();
    } else {
    this.oscillator.stop();
    }
    this.oscillator.setPitchBend(this.props.pitch);
    this.oscillator.setVolume(this.props.volume);
  }

  render () {
    return null;
  }
}

class App extends Component {

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
        onMouseMove={this.changeTone}>
       
        <Tone isPlaying={this.state.isPlaying} pitch={this.state.pitch} volume={this.state.volume} />
        <Tone isPlaying={this.state.isPlaying} pitch={this.state.pitch * 2} volume={this.state.volume * 2} />
        <Tone isPlaying={this.state.isPlaying} pitch={this.state.pitch / 2} volume={this.state.volume /2} />
        <SineWave width="400"
        height="400"
        frequency={this.state.pitch}
        amplitude={this.state.volume}
        draw={this.state.isPlaying} />
      </div>
     
      <div className="label volume">◀ volume ▶</div>
      <div className="label pitch">◀ pitch ▶</div>
    </div>;
        
    
  }
}

export default App;
