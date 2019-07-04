import React, { Component } from "react";
import * as d3 from 'd3'

import "./D3Histogram.css";
import D3Histogram from "./D3Histogram";

class D3HistogramComp extends Component {

    constructor() {
        super();
        this.histogram = new D3Histogram();
    }

    componentDidMount = () => {
        //
        // This should fetch data from an API and then graph away...
        //
        this.drawHistogram();
    }

    drawHistogram = () => {
        // Generate a 1000 data points using normal distribution with mean=20, deviation=5
        const values = d3.range(1000).map(d3.randomNormal(20, 5));
        // const values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
        // const values = [1,2,3,4,5,6,7,8,9,9,9,9,9,9,10,11,12,13,14,15,16,17,18,19];
        // const values = [1,,6,7,8,9,9,9,9,9,9,10,11,12,12,12,13,14,15,16,17,18,19];
        const options = {
            ticks: 20,
            color: "steelblue",
            format: ",.0f",
            width: 700,
            height: 250,
            // min:0,
            // max: 30,
        }

        this.histogram.drawHistogram('.histogram', values, options);
    }

    refresh = () => { 
        // Generate a 1000 data points using normal distribution with mean=20, deviation=5
        var values = d3.range(1000).map(d3.randomNormal(20, 5));
        this.histogram.refresh(values);
    }

    render() {
        return (
            <div>
                <h3>D3HistogramComp</h3>
                <p onClick={this.refresh} className="pacifico">Refresh the data.</p>

                <div className="histogram"></div>

            </div>
        );
    }
}

export default D3HistogramComp;
