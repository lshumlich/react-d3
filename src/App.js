import React, { Component } from 'react';
import ReactLogoComp from './components/ReactLogoComp';
import D3HistogramComp from './components/D3HistogramComp';
import D3BarGraph from './components/D3BarGraph';
import D3BarGraphV2Comp from './components/D3BarGraphV2Comp';
import D3RadarChartComp from './components/D3RadarChartComp';
import D3PlayComp from './components/D3PlayComp';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.title = "My Name is Larry and I am in control of this app";
    this.state = {display: 'play'};
  }

  onPushed = (event) => {
    // console.log("You Pushed Me",event.target, event.target.name);
    this.setState({
      display: event.target.name,
    })
  }

  render () {
    
    let display;
    if (this.state.display === 'react') {
      display = <ReactLogoComp/>
    } else if (this.state.display === 'hist') {
      display = <D3HistogramComp/>
    } else if (this.state.display === 'bar') {
      display = <D3BarGraph/>
    } else if (this.state.display === 'barv2') {
      display = <D3BarGraphV2Comp/>
    } else if (this.state.display === 'radar') {
      display = <D3RadarChartComp/>
    } else if (this.state.display === 'play') {
      display = <D3PlayComp/>
    } else {
      display = 
      <div>
        <h1>I am in control of this application and my name is Larry</h1>
        <h1>{this.title}</h1>
        <button onClick={this.onPushed}>Push Me</button>
      </div>
    }
    return (
      <div className="App" >
        <div className="div-flex-center" onClick={this.onPushed}>
          <button name="react" className="button-space">React</button>
          <button name="hist" className="button-space">Histogram</button>
          <button name="radar" className="button-space">Radar Chart</button>
          <button name="bar" className="button-space">Bar Graph</button>
          <button name="barv2" className="button-space">Bar Graph V2</button>
          <button name="play" className="button-space">Play</button>
          <button name="rest" className="button-space">Rest</button>
        </div>
        {display}
      </div>
    );
  }
}

export default App;
