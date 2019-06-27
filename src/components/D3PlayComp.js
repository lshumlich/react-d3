import React, { Component } from "react";
// import * as d3 from 'd3'
import "./D3Play.css";
import SideNavComp from './SideNavCompV2';
import D3Play from "./D3Play";

/**
 * Add a nifty side menue...
 */

class D3PlayComp extends Component {

    constructor() {
        super();
        this.d3Play = new D3Play();
        this.options = [
            { label: "Play 1", value: 'play 1' },
            { label: "Play 2", value: 'play 2' },
          ];
          this.options.title = "From D3PlayComp";
          this.options.callback = this.setDisplay;
      
    }

    componentDidMount = () => {
        //
        // This should fetch data from an API and then graph away...
        //
        this.play();
    }

    setDisplay = (m) => {
        console.log('D3PlayComp.setDisplay: ', m);
    }

    play = () => {
        this.d3Play.play();
    }

    refresh = () => {
        console.log("Refresh");
    }

    render() {
        return (
            <div>
                <SideNavComp options={this.options}/>
                <div id="myStuff">
                    <p onClick={this.refresh} className="pacifico">Refresh the data.</p>
                    <h1> This is the start of D3 Selection Playing</h1>
                    <h3>Heading 3 - Line 1 Some Stuff</h3>
                    <h3>Heading 3 - Line 2 Some Stuff</h3>
                </div>
                <h3>This should be outside of changes</h3>
                <div id="playgraph"></div>
            </div>
        );
    }
}

export default D3PlayComp;
