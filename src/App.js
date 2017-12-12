import React, { Component } from 'react';
import './App.css';
import Oscillator from './oscillator';

// import SineWave from './other/SineWave';

class App extends Component {

  oscillator = new Oscillator();

  play = () => {
    this.oscillator.play();
   
  }

  stop = () => {
   this.oscillator.stop();
    
  }

  changeTone = (event) => {
    const { clientX, clientY } = event;
    const { top, right, bottom, left } = event.target.getBoundingClientRect();
    const pitch = (clientX - left) / (right - left);
    const volume = 1 - (clientY - top) / (bottom - top);
    
   this.oscillator.setPitchBend(pitch);
   this.oscillator.setVolume(volume);
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
