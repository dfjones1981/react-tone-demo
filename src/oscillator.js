class Oscillator {

    constructor() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.oscillator = this.audioCtx.createOscillator();
        var gainNode = this.audioCtx.createGain();
        gainNode.connect(this.audioCtx.destination);
        this.oscillator.start();
        this.connected = false;
    }

    play = () => {
        this.oscillator.connect(this.audioCtx.destination);
        this.connected = true;
    }

    stop = () => {
        if (this.connected) {
            this.oscillator.disconnect(this.audioCtx.destination);
            this.connected = false;
        }    
    }

    setPitchBend = (value) => {
        this.oscillator.frequency.value = value * 880;
    }

    setVolume = (value) => {
        this.oscillator.detune.value = value * 2000;
    }

}

export default Oscillator;