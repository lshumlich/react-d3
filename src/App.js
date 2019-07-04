import React, { Component } from 'react';
import SideNavComp from './components/SideNavCompV2';
import WelcomeComp from './components/WelcomeComp';
import ReactLogoComp from './components/ReactLogoComp';
import D3PlayComp from './components/D3PlayComp';
import D3BarGraphV2Comp from './components/D3BarGraphV2Comp';
import D3HistogramComp from './components/D3HistogramComp';
import D3RadarChartComp from './components/D3RadarChartComp';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {display: WelcomeComp};
    this.options = [
      { label: "Welcome", value: WelcomeComp },
      { label: "React", value: ReactLogoComp },
      { label: "Play", value: D3PlayComp },
      { label: "Bar Graph V2", value: D3BarGraphV2Comp},
      { label: "Histogram", value: D3HistogramComp},
      { label: "Radar Chart", value: D3RadarChartComp},
    ];
    this.options.title = "From App";
    this.options.callback = this.setDisplay;
  }

  setDisplay = (option) => {
    // console.log("setDisplay",option);
    this.setState({
      display: option,
    })
  }

  // onPushed = (event) => {
  //   // console.log("You Pushed Me",event.target, event.target.name);
  //   this.setState({
  //     display: event.target.name,
  //   })
  // }

  render () {
    const TagName = this.state.display;
    return (
      <div className="App" >
        <SideNavComp options={this.options}/>
        <TagName />
      </div>
    )
  }
}

export default App;
