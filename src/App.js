import React, { Component } from 'react';
// import React from 'react';
import ReactLogoComp from './components/ReactLogoComp';
import Part1Comp from './components/Part1Comp';
import D3HistogramComp from './components/D3HistogramComp';
import D3BarGraph from './components/D3BarGraph';
import D3RadarChartComp from './components/D3RadarChartComp';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.title = "My Name is Larry and I am in control of this app";
    this.state = {display: 'hist'};
  }

  onPushed = (event) => {
    console.log("You Pushed Me",event.target, event.target.name);
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
    } else if (this.state.display === 'radar') {
      display = <D3RadarChartComp/>
    } else {
      display = 
      <div>
        <h1>I am in control of this application and my name is Larry</h1>
        <h1>{this.title}</h1>
        <Part1Comp/>
        <button onClick={this.onPushed}>Push Me</button>
      </div>
    }
    return (
      <div className="App" >
        <div className="div-flex-center" onClick={this.onPushed}>
          <button name="react" className="button-space">React</button>
          <button name="hist" className="button-space">Histogram</button>
          <button name="histv2" className="button-space">Histogram V2</button>
          <button name="radar" className="button-space">Radar Chart</button>
          <button name="bar" className="button-space">Bar Graph</button>
          <button name="rest" className="button-space">Rest</button>
        </div>
        {display}
      </div>
    );
  }
}

export default App;
