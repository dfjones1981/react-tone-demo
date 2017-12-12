import React, { Component } from 'react';

class SineWave extends Component {

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        if (!this.props.draw) return;
        var axes = {};
        axes.x0 = 0.5 + 0.5 * this.props.width;
        axes.y0 = 0.5 + 0.5 * this.props.height;
        var Tmax = 3;
        var Vmax = 1;
        var N = this.props.width;
        var x = [], y = [];
        var dt, tstart, tstop;
        
        tstart = -Tmax;
        tstop = Tmax;
        dt = (tstop - tstart) / (N - 1);
        axes.xscale = (this.props.width) / (2 * Tmax);
        axes.yscale = (this.props.height) / (2 * Vmax);
        axes.N = N;
        
        for (var i = 0; i < N; i++) {
            x[i] = tstart + i * dt;
            y[i] = this.props.amplitude * Math.sin(2 * 3.1415 * this.props.frequency * x[i] + 0 * 3.1415 / 180);
        }
    
        this.GraphArray(ctx, axes, x, y, "rgb(0,0,0)", 3);
        
    }

    GraphArray(ctx, axes, x, y, color, thick) {
        var i, x0, y0, xscale, yscale, xp, yp;
         
        x0 = axes.x0; y0 = axes.y0;
        xscale = axes.xscale; yscale = axes.yscale;
       
        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;
       
        for (i = 0; i < axes.N; i++) {
            xp = x0 + x[i] * xscale;
            yp = y0 - y[i] * yscale;
            if (i === 0) ctx.moveTo(xp, yp);
            else ctx.lineTo(xp, yp);
        }
        
        ctx.stroke();
    }

    showAxes(ctx, axes) {
        var x0 = axes.x0, w = ctx.canvas.width;
        var y0 = axes.y0, h = ctx.canvas.height;
        
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)";
        ctx.moveTo(0, y0); ctx.lineTo(w, y0);
        ctx.moveTo(x0, 0); ctx.lineTo(x0, h); 
        ctx.stroke();
    }
    
    render() {
        const { width, height} = this.props;
        return (
            <canvas
                class="sine"
                ref="canvas"
                width={width}
                height={height}>
            </canvas>
        );
   }
}

export default SineWave;