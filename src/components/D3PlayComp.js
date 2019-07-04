import React, { Component } from "react";
import "./D3Play.css";
import SideNavComp from './SideNavComp';
import D3Play from "./D3Play";

/**
 * This is the component of the D3Play D3 object. See the 
 * documentation in D3Play.js.
 */

class D3PlayComp extends Component {

    constructor() {
        super();
        this.d3Play = new D3Play();
        this.options = [
            { label: "Simple Select", value: this.d3Play.simpleSelect},
            { label: "Simple Data Select", value: this.d3Play.simpleDataSelect},
            { label: "Simple SVG", value: this.d3Play.simpleSVG},
            { label: "Simple SVG with Data", value: this.d3Play.simpleDataSVG},
        ];
        this.options.title = "From D3PlayComp";
        this.options.callback = this.doCallback;

    }

    doCallBack = (m) => {
        console.log('D3PlayComp.setDisplay: ', m);
    }

    render() {
        return (
            <div>
                <div id="myStuff">
                    <h1> This is the start of D3 Selection Playing</h1>
                    <SideNavComp options={this.options} />
                    <h3>Heading 3 - Line 1 Some Stuff</h3>
                    <h3>Heading 3 - Line 2 Some Stuff</h3>
                </div>
                <h3>Heading 3 outside of the range of changes</h3>
                <div id="playgraph"></div>
            </div>
        );
    }
}

export default D3PlayComp;
