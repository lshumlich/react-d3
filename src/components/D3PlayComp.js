import React, { Component } from "react";
// import * as d3 from 'd3'
import "./D3Play.css";
import D3Play from "./D3Play";

/**
 * Add a nifty side menue...
 */

class D3PlayComp extends Component {

    constructor() {
        super();
        this.d3Play = new D3Play();
    }

    componentDidMount = () => {
        //
        // This should fetch data from an API and then graph away...
        //
        this.play();
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
